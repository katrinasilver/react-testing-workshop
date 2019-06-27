import React from 'react'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import ConnectedCreateItem, { CreateItem } from 'components/CreateItem'

import createStore from 'store'
import { ADD_ITEM } from 'actions/types';

// This tests `CreateItem` with out redux
// anything that redux needs will be faked
// and injected

// this is useful to test the internal consistency of 
// the component, specially because it is a stateful component
describe('CreateItem', () => {
  let wrapper
  // this creates a fake function
  // it can provide information about how it was used
  let addItem 
  
  beforeEach(() => {
    // _FAKE_FUNCTIONS_
    addItem = sinon.fake()
    // _SHALLOW_RENDER_
    wrapper = shallow(<CreateItem addItem={addItem}/>)
  })

  // checks structure of component
  it('should have a textarea', () => {
    expect(wrapper.find('textarea')).toHaveLength(1)
  })

  it('should have a button', () => {
    expect(wrapper.find('button')).toHaveLength(1)
  })

  // checks to see that if a change event is triggered in the `textarea`
  // those changes are show in the text area
  // this tests controlled components with out looking into the state
  // of the component
  it('should update value of text area everytime an onchange triggers', () => {
    const value = 'qwerty12345'
    // simulated events need to have the `event` created and passed in.
    // in this case, the only thing that is used in the change handler
    // is `target.value` therefore, it is the only thing provided.
    // this is helpful to dictate the data in the event, which makes
    // testing easier
    // _SIMULATE_EVENTS_
    wrapper
      .find('textarea')
      .simulate('change', { target: { value } })
    
    // _GET_PROPS_
    // .find needs to be called everytime to get changed data
    expect(wrapper.find('textarea').prop('value')).toBe(value)
  })

  
  it('should clear text area after form is submitted', () => {
    const value = 'qwerty12345'
  
    // _SIMULATE_EVENTS_
    wrapper
      .find('textarea')
      .simulate('change', { target: { value } })
  
    // because the we need to create our own event objects when simulating
    // events, the submit event needs to have the `preventDefault` created
    // it can be an empty function
    // _SIMULATE_EVENTS_
    wrapper
      .find('form')
      .simulate('submit', { preventDefault: () => {} })
  
    // _GET_PROPS_
    expect(wrapper.find('textarea').prop('value')).toBe('')
  })

  // checks to see of `preventDefault` was called
  it('should prevent default on form submission', () => {
    // _FAKE_FUNCTIONS_
    const preventDefault = sinon.fake()
    
    // _SIMULATE_EVENTS_
    wrapper
      .find('form')
      .simulate('submit', { preventDefault })

    // sinon is a libary that can create
    // fakes
    // spies
    // stubs
    // mocks
    // they all have difference purposes,
    // we are going to be used `fake` because
    // it combines helpful aspects of spies, stubs, mocks
    expect(preventDefault.calledOnce)
  })

  // the prop `addItem` is passed in when the component is shallowly render
  // in the beforeEach function above.
  // this props will be injected usinf redux in the final version
  // but we are making sure that it gets called 
  // in when an event is submitted, which is independent of where `addItem` comes from
  it('should invoke prop addItem with contents of text area on submission', () => {
    const value = 'qwerty12345'
    
    // _SIMULATE_EVENTS_
    wrapper
      .find('textarea')
      .simulate('change', { target: { value } })
  
    // _SIMULATE_EVENTS_
    wrapper
      .find('form')
      .simulate('submit', { preventDefault: () => {} })

    // sinon has a lot of useful helper methods
    // calledOnce will return true if the function is only called once
    expect(addItem.calledOnce).toBe(true)
    // calledWith will only return true if the argument matches what the function was invoked with
    // in this case, I'm asking the question
    // is addItem invoked with the same content that is in `text` area
    expect(addItem.calledWith(value)).toBe(true)
  })
})


// dealing with higher order components requires a bit more setup
// when using Redux, each component needs to be wrapped with a <Provider>
// and a store needs to be created for every test.
// Creating a store for every test makes sure that tests don't mess with each other
describe('connected CreateItem', () => {
  let wrapper
  let store
  
  beforeEach(() => {
    store = createStore()
    wrapper = mount(
      <Provider store={store}>
        <ConnectedCreateItem />
      </Provider>)
  })
  
  afterEach(() => wrapper.unmount())

  it('should dispatch an action when form is submitted', () => {
    const payload = {id: 100, title:'qwerty12345'}
    const action = {
      type: ADD_ITEM,
      payload
    }
    // this is the core of this test
    // `store` is an object that has a method `dispatch`
    // here, sinon is replacing that method with a fake
    // _FAKE_FUNCTIONS_
    const dispatch = sinon.fake()
    sinon.replace(store, 'dispatch', dispatch)
    // store.dispatch((action))
    
    // _SIMULATE_EVENTS_
    wrapper
      .find('textarea')
      .simulate('change', { target: { value: payload } })
  
    // _SIMULATE_EVENTS_
    wrapper
      .find('form')
      .simulate('submit', { preventDefault: () => {} })
  
    // when the form as submitted, did it dispatch an action?
    // expect(dispatch.calledOnce).toBe(true)
    // was the expecte action dispatch?
    // expect(dispatch.calledWith(action)).toBe(true)
  })
})

