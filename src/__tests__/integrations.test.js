import React from 'react';
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import moxios from 'moxios'

import App from 'components/App';

import createStore from 'store'

const data = [
  {id:1, title:'a'},
  {id:2, title:'b'},
  {id:3, title:'c'},
  {id:4, title:'d'}
]

// Integration test wil try to use the application like a user would
// They should not inspect internal state, or trigger functions directly
// It should only read from the DOM, and trigger events

describe('App Full operations', () => {
  const value = {id:1, title:'qwerty12345'}
  let wrapper

  beforeEach(() => {
    const store = createStore()
    moxios.install()
    moxios.stubRequest('https://my-json-server.typicode.com/rogerwschmidt/testing-example-api/items', {
      status: 200,
      response: data
    })

    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>)
  })

  // when `mount`ing a component, it should be unmounted after each use
  // https://airbnb.io/enzyme/docs/api/mount.html
  afterEach(() => {
    wrapper.unmount()
    moxios.uninstall()
  })

  it('should fetch data from a server', () => {
    moxios.wait(() => {
      // inspect to see if list items have been added
      const li = wrapper.find('li')
      expect(li).toHaveLength(data.length)
    })
  })

  it('should add an create a list item after submiting form', () => {
    // type in the text box
    // _SIMULATE_EVENTS_
    wrapper.find('textarea').simulate('change', { target: { value: value.title } })

    // submit form
    // _SIMULATE_EVENTS_
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })

    // _GET_PROPS_
    // make sure that the text are has been cleaned up
    expect(wrapper.find('textarea').prop('value')).toBe('')
    
    moxios.wait(() => {
      // inspect to see if list items have been added
      const li = wrapper.find('li')
      expect(li).toHaveLength(data.length + 1)
    })
  })
})