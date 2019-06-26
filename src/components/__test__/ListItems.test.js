import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'

import ConnectedListItems, { ListItems } from 'components/ListItems'
import ListItem from 'components/ListItem'

import createStore from 'store'

const data = ['a','b','c','d']

// 'ListItems' is tested separately from the connected component
// This is to separate internal logic vs. props provided by redux
describe('ListItems', () => {
  let wrapper
  beforeEach(() => {
    // the component is created with static data
    // this will eventually be replaced with redux
    wrapper = shallow(<ListItems items={data}/>)
  })
  
  // checks structure of of component
  it('should contain an unordered list', () => {
    expect(wrapper.find('ul')).toHaveLength(1)
  })

  it('should have as many ListItem as data passed it', () => {
    expect(wrapper.find(ListItem)).toHaveLength(data.length)
  })

  // makes sure that each `ListItem` has the correct prop passed in
  // and the data of in that prop matches the original data set
  it('pass props to ListItem', () => {
    wrapper.find(ListItem).forEach((e, i) => {
      expect(e.prop('item')).toBe(data[i])
    })
  })
})

// testing redux connection
describe('ConnectedListItems', () => {
  let wrapper;
  let store;
  
  beforeEach(() => {
    const initialState = { items: data }
    // this is the important part
    // `createStore` can take an initial state for the whole store (an object)
    // in this case, the state for `items` has an array of data stored
    // this is used so that dispatched action are not needed to modify the store
    // we are making the assumption that the way the store is manually setup here
    // just works, setting up the store to match it is tested else where
    store = createStore(initialState)

    wrapper = mount(
      <Provider store={store}>
        <ConnectedListItems/>
      </Provider>)
  })

  afterEach(() => wrapper.unmount())

  it('should pass `items` props to component', () => {
    const props = wrapper.find(ListItems).props()
    
    // makes sure that the correct props are added
    // to `ListItems` from redux connect
    expect(props).toHaveProperty('items')
    expect(Array.isArray(props.items))
  })
})
