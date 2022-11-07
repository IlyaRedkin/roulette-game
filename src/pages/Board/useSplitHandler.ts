import { IBoardItem } from './_types'
import { useContext } from 'react'
import { BoardContext } from './BoardContext'
import { getBetKey } from './components/utils'
import { useCanIDoBet } from './useCanIDoBet'

interface IUseSplitHandler {
  config: Record<string, IBoardItem>
  name: string
}
export const useSplitHandler = ({ config, name }: IUseSplitHandler): (() => void) | undefined => {
  const { betAmount, updateBet } = useContext(BoardContext)
  const splitItem: IBoardItem = config[name]
  const { canMakeBet, canDeleteBet } = useCanIDoBet(splitItem)

  const handler = (): void => {
    if (!canMakeBet && !canDeleteBet) {
      return
    }
    updateBet({
      [getBetKey(splitItem)]: {
        amount: betAmount,
        includes: splitItem.includes,
        multiplier: splitItem.multiplier
      }
    })
  }
  if (!canMakeBet && !canDeleteBet) {
    return
  }
  return splitItem && handler
}
