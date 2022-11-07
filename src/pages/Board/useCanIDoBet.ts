import { useContext } from 'react'
import { BoardContext } from './BoardContext'
import { IBoardItem } from './_types'
import { getBetKey } from './components/utils'

export const useCanIDoBet = (item: IBoardItem): {
  canMakeBet: boolean
  canDeleteBet: boolean
} => {
  const { bankAccount, bet, betAmount } = useContext(BoardContext)

  const canMakeBet = bankAccount > betAmount
  const betKey = getBetKey(item)
  const canDeleteBet = Boolean(bet[betKey])
  return {
    canMakeBet,
    canDeleteBet
  }
}
