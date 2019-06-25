import React from 'react';
import App from '../components/App';
import { shallow, mount } from 'enzyme'

import CreateItem from '../components/CreateItem'
import ListItems from '../components/ListItems'

it('should have CreateItem', () => {
  const wrapper = shallow(<App/>)

  expect(wrapper.find(CreateItem).length).toBe(1)
})

it('should pass add function to CreateItem', () => {
  const wrapper = shallow(<App/>)

  const instance = wrapper.instance()

  expect(wrapper.find(CreateItem).prop('add')).toBe(instance.add)
})

it('should have ListItems', () => {
  const wrapper = shallow(<App/>)

  expect(wrapper.find(ListItems).length).toBe(1)
})

it('should pass data to ListItems', () => {
  const wrapper = shallow(<App/>)

  const instance = wrapper.instance()

  expect(wrapper.find(ListItems).prop('items')).toBe(instance.state.items)
})


describe('App Full operations', () => {
  let wrapper

  beforeEach(() => wrapper = mount(<App />))
  afterEach(() => wrapper.unmount())

  it('should add an create a list item after submiting form', () => {
    const value = 'qwerty12345'

    wrapper.find('textarea').simulate('change', { target: { value } })

    wrapper.find('form').simulate('submit', { preventDefault: () => {} })

    const li = wrapper.find('li')
    expect(li.length).toBe(1)
    expect(li.text()).toBe(value)

  })
})