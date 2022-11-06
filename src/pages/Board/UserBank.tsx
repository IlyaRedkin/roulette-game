import React, { ChangeEvent, useContext } from 'react'
import { BoardContext } from './BoardContext'
import styled from 'styled-components'

export default function UserBank (): React.ReactElement {
  const { bet, betAmount, setBetAmount, onCalcBets, bank, winNumberHistory } = useContext(BoardContext)

  const betAmountHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setBetAmount(Number(event.target.value))
  }

  const historyLength = winNumberHistory?.length
  const lastWinNumber = (historyLength !== 0) ? winNumberHistory[historyLength - 1] : ''

  return (
    <div>
      <div>Win number: {lastWinNumber}</div>
      <div>My bank: {bank}</div>
      <div>
        <input type="number" onChange={betAmountHandler} defaultValue={betAmount}/>
      </div>
      <div>{Object.keys(bet).map((betName) =>
        <div key={betName}>
          <div>{betName}</div>
        </div>
      )}</div>
      <PlayButton onClick={onCalcBets}>
        Play
      </PlayButton>
    </div>
  )
}

const PlayButton = styled.button``
