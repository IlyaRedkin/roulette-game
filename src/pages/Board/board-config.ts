import { BetType, IBoardItem } from './_types'

const MAX_INTERNAL_NUMBER = 36
export const COMMON_NUMBER_LIST = new Array(MAX_INTERNAL_NUMBER).fill(null).map((_, index) => index + 1)
export const INTERNAL_BOARD_CONFIG: IBoardItem[] = COMMON_NUMBER_LIST.map((value) => ({
  name: String(value),
  label: String(value),
  includes: [value],
  multiplier: 35,
  type: BetType.SINGLE
}))

function getEveryNth<T> (arr: T[], nth: number, delta: number): T[] {
  const result = []

  for (let i = delta; i < arr.length; i += nth) {
    result.push(arr[i])
  }

  return result
}

const COLUMN_1_34 = getEveryNth(COMMON_NUMBER_LIST, 3, 0)
const COLUMN_2_35 = getEveryNth(COMMON_NUMBER_LIST, 3, 1)
const COLUMN_3_36 = getEveryNth(COMMON_NUMBER_LIST, 3, 2)
export const COLUMN_BOARD_CONFIG: IBoardItem[] = [
  {
    name: '1-34',
    label: '2-1',
    includes: COLUMN_1_34,
    multiplier: 3,
    type: BetType.COLUMN
  },
  {
    name: '2-35',
    label: '2-1',
    includes: COLUMN_2_35,
    multiplier: 3,
    type: BetType.COLUMN
  },
  {
    name: '3-36',
    label: '2-1',
    includes: COLUMN_3_36,
    multiplier: 3,
    type: BetType.COLUMN
  }
]
export const DOZENS_BOARD_CONFIG: IBoardItem[] = [
  {
    name: '1-12',
    label: '1st 12',
    includes: COMMON_NUMBER_LIST.slice(0, 12),
    multiplier: 3,
    type: BetType.DOZEN
  },
  {
    name: '13-24',
    label: '2nd 12',
    includes: COMMON_NUMBER_LIST.slice(12, 24),
    multiplier: 3,
    type: BetType.DOZEN
  },
  {
    name: '25-36',
    label: '3rd 12',
    includes: COMMON_NUMBER_LIST.slice(24),
    multiplier: 3,
    type: BetType.DOZEN
  }
]
export const EVEN_LIST = COMMON_NUMBER_LIST.filter((number) => number % 2 === 0)
export const ODD_LIST = COMMON_NUMBER_LIST.filter((number) => number % 2 === 1)
export const BLACK_LIST = EVEN_LIST
export const RED_LIST = ODD_LIST
export const BOTTOM_BOARD_CONFIG: IBoardItem[] = [
  {
    name: '1-18',
    label: '1 to 18',
    includes: COMMON_NUMBER_LIST.slice(0, 18),
    multiplier: 2,
    type: BetType.EXTERNAL
  },
  {
    name: 'even',
    label: 'EVEN',
    includes: EVEN_LIST,
    multiplier: 2,
    type: BetType.EXTERNAL
  },
  {
    name: 'red',
    label: 'red',
    includes: RED_LIST,
    multiplier: 2,
    type: BetType.EXTERNAL
  },
  {
    name: 'black',
    label: 'black',
    includes: BLACK_LIST,
    multiplier: 2,
    type: BetType.EXTERNAL
  },
  {
    name: 'odd',
    label: 'odd2',
    includes: ODD_LIST,
    multiplier: 2,
    type: BetType.EXTERNAL
  },
  {
    name: '19-36',
    label: '19 to 36',
    includes: COMMON_NUMBER_LIST.slice(18),
    multiplier: 2,
    type: BetType.EXTERNAL
  }
]

const getTopSplitMap = (numberItem: number): IBoardItem => ({
  name: String(numberItem),
  label: '',
  includes: [numberItem, numberItem + 1],
  multiplier: 17,
  type: BetType.SPLIT
})
const getRightSplitMap = (numberItem: number): IBoardItem => ({
  name: String(numberItem),
  label: '',
  includes: [numberItem, numberItem + 3],
  multiplier: 17,
  type: BetType.SPLIT
})
const getCornerSplitMap = (numberItem: number): IBoardItem => ({
  name: String(numberItem),
  label: '',
  includes: [numberItem, numberItem + 1, numberItem + 3, numberItem + 4],
  multiplier: 8,
  type: BetType.CORNER
})

const numberToSplit = (mapFunc: (numberItem: number) => IBoardItem) =>
  (numbers: number[]): Record<string, IBoardItem> =>
    numbers.reduce((acc: Record<string, IBoardItem>, item: number) => {
      acc[String(item)] = mapFunc(item)
      return acc
    }, {})

const numberToTopSplit = numberToSplit(getTopSplitMap)
const numberToRightSplit = numberToSplit(getRightSplitMap)
const numberToCornerSplit = numberToSplit(getCornerSplitMap)

export const TOP_SPLIT_CONFIG: Record<string, IBoardItem> = {
  ...numberToTopSplit(COLUMN_1_34),
  ...numberToTopSplit(COLUMN_2_35)
}
export const RIGHT_SPLIT_CONFIG: Record<string, IBoardItem> = {
  ...numberToRightSplit(COMMON_NUMBER_LIST.slice(0, 33))
}
export const CORNER_SPLIT_CONFIG: Record<string, IBoardItem> = {
  ...numberToCornerSplit(COLUMN_1_34.slice(0, -1)),
  ...numberToCornerSplit(COLUMN_2_35.slice(0, -1))
}
