import { createStore, combineReducers } from 'redux'
import items from 'reducers/items'

const reducers = combineReducers({
  items
})


export default (initialState) => createStore(reducers, initialState)