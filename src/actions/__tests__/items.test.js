import { addItem } from 'actions/items'
import { ADD_ITEM } from 'actions/types';

let value
let action

beforeEach(() => {
  value = 'qwerty12345'
  action = addItem(value)
})

// invokes action creator function and check to see
// if it returns an action

// this will need to change if `thunk` is added
// to deal with asynchronous action creators
it('should have correct type', () => {
  expect(action.type).toBe(ADD_ITEM)
})

it('should have the correct payload', () => {
  expect(action.payload).toBe(value)
})


