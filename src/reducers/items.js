import { ADD_ITEM } from 'actions/types'

const INITIAL_STATE = []
const DEFAULT_ACTION = { type: null, payload: null}

const items = (state = INITIAL_STATE, action = DEFAULT_ACTION) => {
  switch(action.type){
    case ADD_ITEM: return [ ...state, action.payload ]
    default: return state
  }
}

export default items