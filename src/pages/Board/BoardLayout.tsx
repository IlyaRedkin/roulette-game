import React, { useContext } from 'react'
import styled from 'styled-components'
import { BOTTOM_BOARD_CONFIG, COLUMN_BOARD_CONFIG, DOZENS_BOARD_CONFIG, INTERNAL_BOARD_CONFIG } from './board-config'
import BoardItem from './components/BoardItem'
import { BoardContext } from './BoardContext'

function BoardLayout (): React.ReactElement {
  const { updateBet } = useContext(BoardContext)

  const commonProps = {
    onBetSelect: updateBet
  }
  return (
    <StyledContainer>
      <StyledBoard>
        <StyledInnerBoard>
          <StyledZeroItem name="0" label="0" includes={[0]} multiplier={35} {...commonProps} />
          {INTERNAL_BOARD_CONFIG.map((internalBoardItem) =>
            <BoardItem
              key={internalBoardItem.name}
              {...internalBoardItem}
              {...commonProps}
            />
          )}
          {COLUMN_BOARD_CONFIG.map((columnBoardItem) =>
            <StyledColumnItem
              key={columnBoardItem.name} {...columnBoardItem} {...commonProps}
            />
          )}
        </StyledInnerBoard>
        <StyledBottomLines>
          <StyledBottomLine>
            {DOZENS_BOARD_CONFIG.map((columnBoardItem) =>
              <StyledDozenItem key={columnBoardItem.name} {...columnBoardItem} {...commonProps} />
            )}
          </StyledBottomLine>
          <StyledBottomLine>
            {BOTTOM_BOARD_CONFIG.map((columnBoardItem) =>
              <StyledBottomItem key={columnBoardItem.name} {...columnBoardItem} {...commonProps} />
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
  min-width: 200px;
`
const StyledBottomItem = styled(BoardItem)`
  padding-top: 25px;
  padding-bottom: 25px;
  min-width: 100px;
`
const StyledZeroItem = styled(BoardItem)`
  padding-top: 110px;
  padding-bottom: 111px;
`
