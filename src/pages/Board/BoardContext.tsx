import React, { createContext, useState } from 'react'
import { IBet } from './_types'
import { EMPTY_ARRAY, EMPTY_OBJECT, noop } from '../../utils'

interface IBoardContext {
  bank: number
  bet: IBet
  updateBet: (newBet: IBet) => void
  betAmount: number
  setBetAmount: (betAmount: number) => void
  onCalcBets: () => void
  winNumberHistory: number[]
  setBankAccount: (amount: number) => void
}

export const BoardContext = createContext<IBoardContext>({
  bank: 1000,
  bet: EMPTY_OBJECT,
  updateBet: noop,
  betAmount: 100,
  setBetAmount: noop,
  onCalcBets: noop,
  winNumberHistory: EMPTY_ARRAY,
  setBankAccount: noop
})

interface IBoardProvider {
  children: React.ReactNode
}
export default function BoardProvider ({ children }: IBoardProvider): React.ReactElement {
  const [bankAccount, setBankAccount] = useState<number>(1000)
  const [winNumberHistory, setWinNumberHistory] = useState<number[]>([])
  const [bet, setBet] = useState<IBet>({})
  const [betAmount, setBetAmount] = useState<number>(100)

  const updateBet = (newBet: IBet): void => {
    const newBetKey: string = Object.keys(newBet)[0]
    const newBetAmount: number = Object.values(newBet)[0].amount
    if (Object.keys(bet).includes(newBetKey)) {
      setBankAccount((prev) => prev + bet[newBetKey].amount)
      setTimeout(() => {
        delete bet[newBetKey]
        setBet({ ...bet })
      }, 0)
      return
    }
    setBet((prevBet) => ({ ...prevBet, ...newBet }))
    setBankAccount((prev) => prev - newBetAmount)
  }

  const onCalcBets = (): void => {
    const randomNumber = Math.floor(Math.random() * 36)
    const winAmount = Object.values(bet).reduce((acc, { amount, includes: betNumbers, multiplier }) => {
      if (betNumbers.includes(randomNumber)) {
        return acc + (amount * multiplier)
      }
      return acc
    }, 0)
    setBankAccount((prevAmount) => prevAmount + winAmount)
    setBet({})
    setWinNumberHistory((prev: number[]) => [...prev, randomNumber])
  }

  return (
    <BoardContext.Provider
      value={{
        bet,
        updateBet,
        bank: bankAccount,
        betAmount,
        setBetAmount,
        onCalcBets,
        winNumberHistory,
        setBankAccount
      }}
    >{children}
    </BoardContext.Provider>
  )
}
