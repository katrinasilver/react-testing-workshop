import { ADD_ITEM } from 'actions/types'
import items from 'reducers/items'

// a reducer is just a function, in these tests,
// we are checking the input and output of a pure function


it('should have an inital value of an empty array', () => {
  const newState = items()

  expect(Array.isArray(newState))
})

it('should add payload to the end of array for action type ADD_ITEM', () => {
  const payload = 'qwerty12345'
  const action = {
    type: ADD_ITEM,
    payload
  }
  const newState  = items([], action)

  expect(newState).toEqual([ payload ])
})

it('should not change state of payload if action is not recognised', () => {
  const action = {
    type: 'UNRECOGNIZED_ACTION',
    payload: 'qwerty12345'
  }
  
  const state = ['1', '2']
  const newState  = items(state, action)

  // toBe does a shallow check
  // `newState` is the same array as `state`
  expect(newState).toBe(state)
  // deep equals is .toEqual()
})