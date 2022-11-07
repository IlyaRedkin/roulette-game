import { IBoardItem } from './_types'
import { useContext } from 'react'
import { BoardContext } from './BoardContext'
import { getBetKey } from './components/utils'

interface IUseSplitHandler {
  config: any
  name: string
}
export const useSplitHandler = ({ config, name }: IUseSplitHandler): (() => void) | undefined => {
  const { betAmount, updateBet } = useContext(BoardContext)
  const topSplitItem: IBoardItem = config[name]
  const handler = (): void => {
    updateBet({
      [getBetKey(topSplitItem)]: {
        amount: betAmount,
        includes: topSplitItem.includes,
        multiplier: topSplitItem.multiplier
      }
    })
  }
  return topSplitItem && handler
}
