import React, { useContext } from 'react'
import styled from 'styled-components'
import { IBoardItem } from '../_types'
import { BLACK_LIST, CORNER_SPLIT_CONFIG, RED_LIST, RIGHT_SPLIT_CONFIG, TOP_SPLIT_CONFIG } from '../board-config'
import { BoardContext } from '../BoardContext'
import WithClickAround from '../../../HOCs/withClickAround'
import { getBetKey } from './utils'
import { useSplitHandler } from '../useSplitHandler'
import { useCanIDoBet } from '../useCanIDoBet'
import SelectedBetIcon from './SelectedBetIcon'

export interface BoardItemProps extends IBoardItem, React.HTMLAttributes<HTMLDivElement> {}

function BoardItem (boardItemProps: BoardItemProps): React.ReactElement {
  const { name, label, includes, multiplier, type, ...props } = boardItemProps
  const { betAmount, updateBet } = useContext(BoardContext)
  const betKey = getBetKey(boardItemProps)
  const { canMakeBet, canDeleteBet } = useCanIDoBet(boardItemProps)

  const onClick = (): void => {
    if (!canMakeBet && !canDeleteBet) {
      return
    }
    updateBet({
      [betKey]: {
        amount: betAmount,
        includes,
        multiplier,
        type
      }
    })
  }
  const onTopHandler = useSplitHandler({ config: TOP_SPLIT_CONFIG, name })
  const onRightHandler = useSplitHandler({ config: RIGHT_SPLIT_CONFIG, name })
  const onTopRightHandler = useSplitHandler({ config: CORNER_SPLIT_CONFIG, name })

  return (
    <div style={{ position: 'relative' }}>
      <WithClickAround
        onTop={onTopHandler}
        onRight={onRightHandler}
        onTopRight={onTopRightHandler}
      >
        <SelectedBetIcon name={name} />
        <StyledBoardItem
          red={RED_LIST.includes(Number(name))}
          black={BLACK_LIST.includes(Number(name))}
          key={name}
          onClick={onClick}
          disabled={!canMakeBet && !canDeleteBet}
          {...props}
        >
          {label}
        </StyledBoardItem>
      </WithClickAround>
    </div>
  )
}

export default BoardItem

interface IStyledBoardItem {
  red: boolean
  black: boolean
  disabled: boolean
}
const StyledBoardItem = styled.div<IStyledBoardItem>`
  box-sizing: border-box;
  padding-top: 25px;
  padding-bottom: 25px;
  text-align: center;
  min-width: 50px;
  font-size: 30px;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  ${(props) => props.red && 'background-color: red;'}
  ${(props) => props.black && 'background-color: black;'}
  ${(props) => props.disabled && 'cursor: not-allowed;'}
`
