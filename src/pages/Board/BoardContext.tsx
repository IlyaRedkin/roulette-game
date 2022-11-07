import React, { createContext, useState } from 'react'
import { IBet, IBetInner } from './_types'
import { EMPTY_ARRAY, EMPTY_OBJECT, noop } from '../../utils'

interface IBoardContext {
  bankAccount: number
  bet: IBet
  updateBet: (newBet: IBet) => void
  betAmount: number
  setBetAmount: (betAmount: number) => void
  onCalcBets: () => void
  winNumberHistory: number[]
  setBankAccount: (amount: number) => void
  winBets: IBetInner[]
}

export const BoardContext = createContext<IBoardContext>({
  bankAccount: 1000,
  bet: EMPTY_OBJECT,
  updateBet: noop,
  betAmount: 100,
  setBetAmount: noop,
  onCalcBets: noop,
  winNumberHistory: EMPTY_ARRAY,
  setBankAccount: noop,
  winBets: EMPTY_ARRAY
})

interface IBoardProvider {
  children: React.ReactNode
}
export default function BoardProvider ({ children }: IBoardProvider): React.ReactElement {
  const [bankAccount, setBankAccount] = useState<number>(1000)
  const [winNumberHistory, setWinNumberHistory] = useState<number[]>([])
  const [bet, setBet] = useState<IBet>({})
  const [winBets, setWinBets] = useState<IBetInner[]>([])
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
    const winAmount = Object.values(bet).reduce((acc: number, betInner: IBetInner) => {
      const { amount, includes: betNumbers, multiplier } = betInner
      if (betNumbers.includes(randomNumber)) {
        setWinBets((prev) => [...prev, betInner])
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
        bankAccount,
        betAmount,
        setBetAmount,
        onCalcBets,
        winNumberHistory,
        setBankAccount,
        winBets
      }}
    >{children}
    </BoardContext.Provider>
  )
}
