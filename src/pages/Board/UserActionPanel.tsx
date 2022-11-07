import React, { ChangeEvent, useContext, useMemo } from 'react'
import { BoardContext } from './BoardContext'
import styled from 'styled-components'
import { getNumberStats } from './win-numbers-utils'
import { IBetInner } from './_types'

export default function UserActionPanel (): React.ReactElement {
  const {
    bet, betAmount, setBetAmount, onCalcBets, bankAccount, winNumberHistory, setBankAccount, winBets
  } = useContext(BoardContext)

  const betAmountHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = Number(event.target.value)
    if (value > bankAccount) {
      setBetAmount(bankAccount)
    } else {
      setBetAmount(value)
    }
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
    <StyledContainer>
      <div>Win number: {lastWinNumber}</div>
      <div>Hot numbers: {hotList.slice(0, 5).join(', ')}</div>
      <div>Cold numbers: {coldList.slice(0, 5).join(', ')}</div>
      <div>Win bets: {winBets.map((bet: IBetInner) =>
        <div key={bet.includes.join('')}>{bet.type} {bet.amount * bet.multiplier} {
          bet.includes.length > 10
            ? `${bet.includes.slice(0, 3).join(', ')}...${bet.includes.slice(-3).join(', ')}`
            : `${bet.includes.join(', ')}`
        }</div>
      )}</div>
      <div>My bank: {bankAccount}</div>
      <div>
        <label htmlFor="betAmount">Bet Amount: </label>
        <input id="betAmount" type="number" onChange={betAmountHandler} defaultValue={betAmount} max={bankAccount}/>
      </div>
      <div>
        <div>Bet list: </div>
        <div>{Object.entries(bet).map(([betName, { amount }]) =>
          <div key={betName}>
            <div>{betName} - {amount}</div>
          </div>
        )}</div>
      </div>
      {Object.keys(bet).length === 0 && bankAccount === 0 ? tryAgainButton : playButton}
    </StyledContainer>
  )
}

const PlayButton = styled.button``
const StyledContainer = styled.div`
  & > div {
    margin: 8px;
  }
`
