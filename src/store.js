import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import items from 'reducers/items'

const reducers = combineReducers({
  items
})

const middlewares = applyMiddleware(thunk)

export default (initialState) => createStore(reducers, initialState, middlewares)