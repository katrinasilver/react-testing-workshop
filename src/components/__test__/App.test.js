import React from 'react';
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'

import ConnectedApp, { App } from 'components/App';
import CreateItem from 'components/CreateItem'
import ListItems from 'components/ListItems'

import createStore from 'store'

describe('App Component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<App fetchItems={()=>{}}/>)
  })
  // makes sure that the correct components are added to
  // `App`
  // There is no state management in App, everything is in redux
  it('should have CreateItem', () => {
    // _FIND_COMPONENTS_
    expect(wrapper.find(CreateItem)).toHaveLength(1)
  })

  it('should have ListItems', () => {
    // _FIND_COMPONENTS_
    expect(wrapper.find(ListItems)).toHaveLength(1)
  })
})

describe('Connected App Component', () => {
  let wrapper
  beforeEach(() => {
    const store = createStore()

    wrapper = mount(
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    )
  })

  it('should pass fetchItems to App', () => {
    // _GET_PROPS_
    expect(wrapper.find(App).props()).toHaveProperty('fetchItems')
  })
})




