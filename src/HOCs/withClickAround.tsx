import React, { MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'

interface IWithClickAround {
  children: React.ReactNode
  onTopLeft?: MouseEventHandler
  onTop?: MouseEventHandler
  onTopRight?: MouseEventHandler
  onLeft?: MouseEventHandler
  onRight?: MouseEventHandler
  onBottomLeft?: MouseEventHandler
  onBottom?: MouseEventHandler
  onBottomRight?: MouseEventHandler
}
function WithClickAround ({
  children, onTopLeft, onTop, onTopRight, onLeft, onRight, onBottomLeft, onBottom, onBottomRight
}: IWithClickAround): React.ReactElement {
  return (
    <StyledExternal>
      <TopLine>
        <LeftTop onClick={onTopLeft}/>
        <Top onClick={onTop}/>
        <RightTop onClick={onTopRight}/>
      </TopLine>
      <MiddleLine>
        <Left onClick={onLeft}/>
        <Middle>
          {children}
        </Middle>
        <Right onClick={onRight}/>
      </MiddleLine>
      <BottomLine>
        <BottomLeft onClick={onBottomLeft}/>
        <Bottom onClick={onBottom}/>
        <BottomRight onClick={onBottomRight}/>
      </BottomLine>
    </StyledExternal>
  )
}

export default WithClickAround

const BORDER_WIDTH = 2
const HOVERED_ITEM_Z_INDEX = 1

const StyledExternal = styled.div``
const Line = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: white;
  position: relative;
`
const TopLine = styled(Line)`
  height: ${BORDER_WIDTH}px;
  width: 100%;
`
const MiddleLine = styled(Line)`
  background-color: transparent;`
const BottomLine = styled(Line)`
  height: ${BORDER_WIDTH}px;
  width: 100%;
`

const Point = styled.div`
  height: ${BORDER_WIDTH * 10}px;
  width: ${BORDER_WIDTH * 10}px;
  position: absolute;
  background: transparent;
  ${(props) => props.onClick &&
    css`
      z-index: ${HOVERED_ITEM_Z_INDEX};
      &:hover {
        background-color: yellow;
      }
    `}
`
const LeftTop = styled(Point)`
  top: -10px;
  left: -10px;
`
const RightTop = styled(Point)`
  top: -10px;
  right: -10px;
`
const BottomLeft = styled(Point)`
  bottom: -10px;
  left: -10px;
`
const BottomRight = styled(Point)`
  bottom: -10px;
  right: -10px;
`

const Area = styled.div`
  display: flex;
  background-color: white;
`
const VerticalArea = css`
  &:hover {
    width: ${BORDER_WIDTH * 3}px;
    background-color: yellow;
    z-index: ${HOVERED_ITEM_Z_INDEX};
    position: absolute;
    height: 100%;
    right: 0;
  }
`
const HorizontalArea = css`
  &:hover {
    height: ${BORDER_WIDTH * 3}px;
    background-color: yellow;
    z-index: ${HOVERED_ITEM_Z_INDEX};
    position: absolute;
    width: 100%;
  }
`
const Top = styled(Area)`
  flex-grow: 1;
  ${(props) => props.onClick && HorizontalArea}
`
const Left = styled(Area)`
  ${(props) => props.onClick && VerticalArea}
  width: ${BORDER_WIDTH}px;
`
const Middle = styled(Area)`
  flex-grow: 1;
  background-color: transparent;
`
const Right = styled(Area)`
  ${(props) => props.onClick && VerticalArea}
  width: ${BORDER_WIDTH}px;
`
const Bottom = styled(Area)`
  flex-grow: 1;
  ${(props) => props.onClick && HorizontalArea}
`
