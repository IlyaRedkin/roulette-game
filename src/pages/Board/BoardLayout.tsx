import React from 'react'
import styled from 'styled-components'
import { BOTTOM_BOARD_CONFIG, COLUMN_BOARD_CONFIG, DOZENS_BOARD_CONFIG, INTERNAL_BOARD_CONFIG } from './board-config'
import BoardItem from './components/BoardItem'
import { BetType } from './_types'

function BoardLayout (): React.ReactElement {
  return (
    <StyledContainer>
      <StyledBoard>
        <StyledInnerBoard>
          <StyledZeroItem name="0" label="0" includes={[0]} multiplier={35} type={BetType.SINGLE} />
          {INTERNAL_BOARD_CONFIG.map((internalBoardItem) =>
            <BoardItem
              key={internalBoardItem.name}
              {...internalBoardItem}
            />
          )}
          {COLUMN_BOARD_CONFIG.map((columnBoardItem) =>
            <StyledColumnItem
              key={columnBoardItem.name} {...columnBoardItem}
            />
          )}
        </StyledInnerBoard>
        <StyledBottomLines>
          <StyledBottomLine>
            {DOZENS_BOARD_CONFIG.map((columnBoardItem) =>
              <StyledDozenItem key={columnBoardItem.name} {...columnBoardItem} />
            )}
          </StyledBottomLine>
          <StyledBottomLine>
            {BOTTOM_BOARD_CONFIG.map((columnBoardItem) =>
              <StyledBottomItem key={columnBoardItem.name} {...columnBoardItem} />
            )}
          </StyledBottomLine>
        </StyledBottomLines>
      </StyledBoard>
    </StyledContainer>
  )
}

export default BoardLayout

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledBoard = styled.div`
  margin: 50px 200px 6px 200px;
`
const StyledInnerBoard = styled.div`
  display: flex;
  flex-flow: column-reverse wrap;
  height: 300px;
  width: 750px;
`
const StyledColumnItem = styled(BoardItem)`
  padding-top: 25px;
  padding-bottom: 25px;
`
const StyledBottomLines = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 54px;
`
const StyledBottomLine = styled.div`
  display: flex;
  background-color: green;
  align-content: flex-start;
  max-width: 750px;
`
const StyledDozenItem = styled(BoardItem)`
  padding-top: 25px;
  padding-bottom: 25px;
  min-width: 212px;
`
const StyledBottomItem = styled(BoardItem)`
  padding-top: 25px;
  padding-bottom: 25px;
  min-width: 103px;
`
const StyledZeroItem = styled(BoardItem)`
  padding-top: 114px;
  padding-bottom: 114px;
`
