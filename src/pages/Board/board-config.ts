import { IBoardItem } from './_types'

const MAX_INTERNAL_NUMBER = 36
export const COMMON_NUMBER_LIST = new Array(MAX_INTERNAL_NUMBER).fill(null).map((_, index) => index + 1)
export const INTERNAL_BOARD_CONFIG: IBoardItem[] = COMMON_NUMBER_LIST.map((value) => ({
  name: String(value),
  label: String(value),
  includes: [value],
  multiplier: 35
}))

function getEveryNth<T> (arr: T[], nth: number, delta: number): T[] {
  const result = []

  for (let i = delta; i < arr.length; i += nth) {
    result.push(arr[i])
  }

  return result
}

export const COLUMN_BOARD_CONFIG: IBoardItem[] = [
  {
    name: '1-34',
    label: '2-1',
    includes: getEveryNth(COMMON_NUMBER_LIST, 3, 0),
    multiplier: 3
  },
  {
    name: '2-35',
    label: '2-1',
    includes: getEveryNth(COMMON_NUMBER_LIST, 3, 1),
    multiplier: 3
  },
  {
    name: '3-36',
    label: '2-1',
    includes: getEveryNth(COMMON_NUMBER_LIST, 3, 2),
    multiplier: 3
  }
]
export const DOZENS_BOARD_CONFIG: IBoardItem[] = [
  {
    name: '1-12',
    label: '1st 12',
    includes: COMMON_NUMBER_LIST.slice(0, 12),
    multiplier: 3
  },
  {
    name: '13-24',
    label: '2nd 12',
    includes: COMMON_NUMBER_LIST.slice(12, 24),
    multiplier: 3
  },
  {
    name: '25-36',
    label: '3rd 12',
    includes: COMMON_NUMBER_LIST.slice(24),
    multiplier: 3
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
    multiplier: 2
  },
  {
    name: 'even',
    label: 'EVEN',
    includes: EVEN_LIST,
    multiplier: 2
  },
  {
    name: 'red',
    label: 'red',
    includes: RED_LIST,
    multiplier: 2
  },
  {
    name: 'black',
    label: 'black',
    includes: BLACK_LIST,
    multiplier: 2
  },
  {
    name: 'odd',
    label: 'odd2',
    includes: ODD_LIST,
    multiplier: 2
  },
  {
    name: '19-36',
    label: '19 to 36',
    includes: COMMON_NUMBER_LIST.slice(18),
    multiplier: 2
  }
]

export const COMMON_BOARD_CONFIG = [
  ...INTERNAL_BOARD_CONFIG,
  ...COLUMN_BOARD_CONFIG,
  ...DOZENS_BOARD_CONFIG,
  ...BOTTOM_BOARD_CONFIG
]
export const BET_NAMES = COMMON_BOARD_CONFIG.map((configItem: IBoardItem) => configItem.name)
