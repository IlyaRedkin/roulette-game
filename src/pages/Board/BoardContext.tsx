import React, { createContext, useState } from 'react'
import { IBet } from './_types'

interface IBoardContext {
  bank: number
  bet: IBet
  updateBet: (newBet: IBet) => void
  betAmount: number
  setBetAmount: (betAmount: number) => void
  onCalcBets: () => void
  winNumberHistory: number[]
}

export const BoardContext = createContext<IBoardContext>({
  bank: 1000,
  bet: {},
  updateBet: (newBet: IBet) => {},
  betAmount: 100,
  setBetAmount: (betAmount: number) => {},
  onCalcBets: () => {},
  winNumberHistory: []
})

interface IBoardProvider {
  children: React.ReactNode
}
export default function BoardProvider ({ children }: IBoardProvider): React.ReactElement {
  const [bank, setBank] = useState<number>(1000)
  const [winNumberHistory, setWinNumberHistory] = useState<number[]>([])
  const [bet, setBet] = useState<IBet>({})
  const [betAmount, setBetAmount] = useState<number>(100)

  const updateBet = (newBet: IBet): void => {
    const newBetKey: string = Object.keys(newBet)[0]
    const newBetAmount: number = Object.values(newBet)[0].amount
    if (Object.keys(bet).includes(newBetKey)) {
      setBank((prev) => prev + bet[newBetKey].amount)
      setTimeout(() => {
        delete bet[newBetKey]
        setBet({ ...bet })
      }, 0)
      return
    }
    setBet((prevBet) => ({ ...prevBet, ...newBet }))
    setBank((prev) => prev - newBetAmount)
  }

  const onCalcBets = (): void => {
    const randomNumber = Math.floor(Math.random() * 36)
    const winAmount = Object.values(bet).reduce((acc, { amount, includes: betNumbers, multiplier }) => {
      if (betNumbers.includes(randomNumber)) {
        return acc + (amount * multiplier)
      }
      return acc
    }, 0)
    setBank((prevAmount) => prevAmount + winAmount)
    setBet({})
    setWinNumberHistory((prev: number[]) => [...prev, randomNumber])
  }

  return (
    <BoardContext.Provider
      value={{
        bet,
        updateBet,
        bank,
        betAmount,
        setBetAmount,
        onCalcBets,
        winNumberHistory
      }}
    >{children}
    </BoardContext.Provider>
  )
}
