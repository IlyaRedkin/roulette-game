import React, { ChangeEvent, useContext, useMemo } from 'react'
import { BoardContext } from './BoardContext'
import styled from 'styled-components'
import { getNumberStats } from './win-numbers-utils'

export default function UserBank (): React.ReactElement {
  const { bet, betAmount, setBetAmount, onCalcBets, bank, winNumberHistory, setBankAccount } = useContext(BoardContext)

  const betAmountHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setBetAmount(Number(event.target.value))
  }

  const historyLength = winNumberHistory?.length
  const lastWinNumber = (historyLength !== 0) ? winNumberHistory[historyLength - 1] : ''

  const tryAgainButton = (
    <PlayButton onClick={() => setBankAccount(1000)}>
      Try again
    </PlayButton>
  )
  const playButton = (
    <PlayButton onClick={onCalcBets} disabled={Object.keys(bet).length === 0}>
      Play
    </PlayButton>
  )
  const { hotList, coldList } = useMemo(() => getNumberStats(winNumberHistory), [winNumberHistory])

  return (
    <div>
      <div>Win number: {lastWinNumber}</div>
      <div>Hot numbers: {hotList.slice(0, 5).join(', ')}</div>
      <div>Cold numbers: {coldList.slice(0, 5).join(', ')}</div>
      <div>My bank: {bank}</div>
      <div>
        <input type="number" onChange={betAmountHandler} defaultValue={betAmount}/>
      </div>
      <div>{Object.keys(bet).map((betName) =>
        <div key={betName}>
          <div>{betName}</div>
        </div>
      )}</div>
      {Object.keys(bet).length === 0 && bank === 0 ? tryAgainButton : playButton}
    </div>
  )
}

const PlayButton = styled.button``
