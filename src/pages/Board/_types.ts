export enum BetType {
  SINGLE = 'single',
  SPLIT = 'split',
  CORNER = 'corner',
  COLUMN = 'column',
  DOZEN = 'dozen',
  EXTERNAL = 'external',
}

export interface IBoardItem {
  name: string
  type: BetType
  label: string
  includes: number[]
  multiplier: number
}
export interface IBetInner extends Pick<IBoardItem, 'includes' | 'multiplier'> {
  amount: number
}
export interface IBet extends Record<string, IBetInner> {}
