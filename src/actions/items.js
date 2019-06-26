import { ADD_ITEM } from 'actions/types'

export const addItem = payload => {
  return {
    type: ADD_ITEM,
    payload
  }
}