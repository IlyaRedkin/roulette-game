import React, { useContext } from 'react'
import styled from 'styled-components'
import { IBet, IBoardItem } from '../_types'
import { BLACK_LIST, CORNER_SPLIT_CONFIG, RED_LIST, RIGHT_SPLIT_CONFIG, TOP_SPLIT_CONFIG } from '../board-config'
import { BoardContext } from '../BoardContext'
import { ReactComponent as ChipImage } from 'assets/poker-chip.svg'
import WithClickAround from '../../../HOCs/withClickAround'

interface BoardItemProps extends IBoardItem, React.HTMLAttributes<HTMLDivElement> {
  onBetSelect: (bet: IBet) => void
}

function BoardItem ({ name, label, onBetSelect, includes, multiplier, ...props }: BoardItemProps): React.ReactElement {
  const { betAmount, bankAccount, bet } = useContext(BoardContext)
  const canMakeBet = bankAccount > 0
  const canDeleteBet = Boolean(bet[name])
  const canClick = canMakeBet || canDeleteBet

  const onClick = (): void => {
    if (!canClick) {
      return
    }
    onBetSelect({
      [name]: {
        amount: betAmount,
        includes,
        multiplier
      }
    })
  }
  const onTopHandler = (): void => {
    const item: IBoardItem = TOP_SPLIT_CONFIG[name]
    if (item) {
      onBetSelect({
        [item.name]: {
          amount: betAmount,
          includes: item.includes,
          multiplier: item.multiplier
        }
      })
    }
  }
  const onRightHandler = (): void => {
    const item: IBoardItem = RIGHT_SPLIT_CONFIG[name]
    if (item) {
      onBetSelect({
        [item.name]: {
          amount: betAmount,
          includes: item.includes,
          multiplier: item.multiplier
        }
      })
    }
  }
  const onTopRightHandler = (): void => {
    const item: IBoardItem = CORNER_SPLIT_CONFIG[name]
    if (item) {
      onBetSelect({
        [item.name]: {
          amount: betAmount,
          includes: item.includes,
          multiplier: item.multiplier
        }
      })
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <WithClickAround
        onTop={onTopHandler}
        onRight={onRightHandler}
        onTopRight={onTopRightHandler}
      >
        {canDeleteBet && <StyledChipImage />}
        <StyledBoardItem
          red={RED_LIST.includes(Number(name))}
          black={BLACK_LIST.includes(Number(name))}
          key={name}
          onClick={onClick} {...props}
          disabled={!canClick}
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
const StyledChipImage = styled(ChipImage)`
  position: absolute;
  height: 20px;
  fill: white;
  bottom: 0;
  left: 10px;
`
