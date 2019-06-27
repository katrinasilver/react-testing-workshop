import sinon from 'sinon'
import moxios from 'moxios'

import { addItem, fetchItems } from 'actions/items'
import { ADD_ITEM, FETCH_ITEMS } from 'actions/types';



describe('addItem action creator', () => {
  let value
  let action
  
  // 
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
    expect(action.payload).toHaveProperty('id')
    expect(action.payload).toHaveProperty('title')
    expect(action.payload.title).toBe(value)
  })
})

describe('fetchItems action creator', () => {
  const data = [
    {id:1, title:'a'},
    {id:2, title:'b'},
    {id:3, title:'c'},
    {id:4, title:'d'}
  ]

  let actionCreator

  beforeEach(() => {
    actionCreator = fetchItems(data)
    moxios.install()
    moxios.stubRequest('https://my-json-server.typicode.com/rogerwschmidt/testing-example-api/items', {
      status: 200,
      response: data
    })
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should dispatch action with FETCH_ITEMS action type', () => {
    // _FAKE_FUNCTIONS_
    const dispach = sinon.fake()
    
    actionCreator(dispach)
    
    moxios.wait(()=> {
      expect(dispach.calledWith({
        type: FETCH_ITEMS,
        payload: data
      })).toBe(true)
    })
  })
})


