import { COMMON_NUMBER_LIST } from './board-config'

const KEY_VALUE_SEPARATOR = ':'
const getSplitKey = (value: string): number => Number(value.split(KEY_VALUE_SEPARATOR)[0])
const getSplitCount = (value: string): number => Number(value.split(KEY_VALUE_SEPARATOR)[1])

const getSortFunc = (order: 'asc' | 'desc') => (a: string, b: string) => {
  const aCount = getSplitCount(a)
  const bCount = getSplitCount(b)
  if (order === 'asc') {
    return bCount - aCount
  }
  return aCount - bCount
}
const ascSortFunc = getSortFunc('asc')
const descSortFunc = getSortFunc('desc')

const defaultMap = COMMON_NUMBER_LIST.reduce((acc: Record<number, number>, item: number) => {
  acc[item] = 0
  return acc
}, {})

export const getNumberStats = (winNumberHistory: number[]): { hotList: number[], coldList: number[] } => {
  const winNumberHistoryMap = winNumberHistory.reduce((acc: Record<number, number>, i: number) => {
    acc[i] = acc[i] ? acc[i] + 1 : 1
    return acc
  }, { ...defaultMap })
  const winNumberHistoryString = Object.entries(winNumberHistoryMap)
    .map(([key, value]) => `${key}${KEY_VALUE_SEPARATOR}${value}`)
  const hotOrdered = winNumberHistoryString.concat()
    .filter((item) => item.split(KEY_VALUE_SEPARATOR)[1] !== '0')
    .sort(ascSortFunc).map(getSplitKey)
  const coldOrdered = winNumberHistoryString.concat().sort(descSortFunc).map(getSplitKey)
  return {
    hotList: hotOrdered,
    coldList: coldOrdered
  }
}
