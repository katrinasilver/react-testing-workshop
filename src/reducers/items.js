import { ADD_ITEM, FETCH_ITEMS } from 'actions/types'

const INITIAL_STATE = []
const DEFAULT_ACTION = { type: null, payload: null}

const items = (state = INITIAL_STATE, action = DEFAULT_ACTION) => {
  switch(action.type){
    case ADD_ITEM: return [ ...state, action.payload ]
    case FETCH_ITEMS: return action.payload
    default: return state
  }
}

export default items