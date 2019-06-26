import React from 'react';
import { Provider } from 'react-redux'
import { mount } from 'enzyme'

import App from 'components/App';

import createStore from 'store'

// Integration test wil try to use the application like a user would
// They should not inspect internal state, or trigger functions directly
// It should only read from the DOM, and trigger events

describe('App Full operations', () => {
  const value = 'qwerty12345'
  let wrapper

  beforeEach(() => {
    const store = createStore()

    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>)
  })

  // when `mount`ing a component, it should be unmounted after each use
  // https://airbnb.io/enzyme/docs/api/mount.html
  afterEach(() => wrapper.unmount())

  it('should add an create a list item after submiting form', () => {

    // type in the text box
    wrapper.find('textarea').simulate('change', { target: { value } })

    // submit form
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })

    // inspect to see if list items have been added
    const li = wrapper.find('li')
    expect(li).toHaveLength(1)
    expect(li.text()).toBe(value)

    // make sure that the text are has been cleaned up
    expect(wrapper.find('textarea').prop('value')).toBe('')
  })
})