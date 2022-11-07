import React, { useContext } from 'react'
import styled from 'styled-components'
import { BetType, IBetInner } from '../_types'
import { BoardContext } from '../BoardContext'
import { getBetKey, getBetNameByKey } from './utils'
import { ReactComponent as ChipImage } from 'assets/poker-chip.svg'

function SelectedBetIcon ({ name }: { name: string }): React.ReactElement {
  const { bet, updateBet } = useContext(BoardContext)
  const itemBets: IBetInner[] = Object.entries(bet).reduce((acc: IBetInner[], [betKey, betInner]) => {
    const betName = getBetNameByKey(betKey)
    if (betName === name) {
      acc.push(betInner)
    }
    return acc
  }, [])

  const onDeleteBet = (bet: IBetInner): void => {
    updateBet({
      [getBetKey({ ...bet, name, label: '' })]: bet
    })
  }

  return <>
    {itemBets.map((betInner: IBetInner) =>
      <StyledChipImage
        key={betInner.type}
        type={betInner.type}
        onClick={() => onDeleteBet(betInner)}
      />)}
  </>
}

export default SelectedBetIcon

interface IChipImage {
  type: BetType
}
const StyledChipImage = styled(ChipImage)<IChipImage>`
  position: absolute;
  height: 20px;
  fill: white;
  bottom: 18px;
  left: 16px;
  z-index: 1;
  cursor: pointer;
  ${(props) => props.type === BetType.SPLIT_VERTICAL && `
    bottom: initial;
    top: -12px;
  `}
  ${(props) => props.type === BetType.SPLIT_HORIZONTAL && `
    right: -10px;
    bottom: 32px;
    left: initial;
  `}
  ${(props) => props.type === BetType.CORNER && `
    bottom: initial;
    left: initial;
    top: -12px;
    right: -10px;
  `}
`
