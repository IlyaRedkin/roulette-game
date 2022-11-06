import React, { useContext } from 'react'
import styled from 'styled-components'
import { IBet, IBoardItem } from '../_types'
import { BLACK_LIST, RED_LIST } from '../board-config'
import { BoardContext } from '../BoardContext'

interface BoardItemProps extends IBoardItem, React.HTMLAttributes<HTMLDivElement> {
  onBetSelect: (bet: IBet) => void
}

function BoardItem ({ name, label, onBetSelect, includes, multiplier, ...props }: BoardItemProps): React.ReactElement {
  const { betAmount, bank, bet } = useContext(BoardContext)
  const canMakeBet = bank > 0
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
  return (
    <StyledBoardItem
      red={RED_LIST.includes(Number(name))}
      black={BLACK_LIST.includes(Number(name))}
      key={name}
      onClick={onClick} {...props}
      disabled={!canClick}
    >
      {label}
    </StyledBoardItem>
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
  border: 3px solid white;
  margin: -3px;
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
