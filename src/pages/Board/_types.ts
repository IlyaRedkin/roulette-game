export interface IBoardItem {
  name: string
  label: string
  includes: number[]
  multiplier: number
}
export interface IBetInner extends Pick<IBoardItem, 'includes' | 'multiplier'> {
  amount: number
}
export interface IBet extends Record<string, IBetInner> {}
