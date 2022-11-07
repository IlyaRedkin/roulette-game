import { IBoardItem } from '../_types'

export const getBetKey = (item: IBoardItem): string => `${item?.name}_${item?.type}`
export const getBetNameByKey = (key: string): string => key.split('_')[0]
