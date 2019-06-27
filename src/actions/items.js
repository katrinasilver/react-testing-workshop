import axios from 'axios'
import { ADD_ITEM, FETCH_ITEMS } from 'actions/types'

export const addItem = title => {
  return {
    type: ADD_ITEM,
    payload: {id: 3, title }
  }
}

export const fetchItems = () =>
  async (dispatch, getStore) => {
    try{
      const response = await axios.get('https://my-json-server.typicode.com/rogerwschmidt/testing-example-api/items')

      return dispatch({ type: FETCH_ITEMS, payload: response.data })
    }
    catch(e){
      // console.log('something went wrong, should probably dispatch an action', e)
    }
  }