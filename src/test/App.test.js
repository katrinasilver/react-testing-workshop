import React from 'react';
import App from '../components/App';
import { shallow, mount } from 'enzyme'

import CreateItem from '../components/CreateItem'
import ListItems from '../components/ListItems'

let wrapper

beforeEach(() => {
  wrapper = shallow(<App/>)
})
it('should have CreateItem', () => {
  expect(wrapper.find(CreateItem)).toHaveLength(1)
})

it('should pass add function to CreateItem', () => {
  const instance = wrapper.instance()

  expect(wrapper.find(CreateItem).prop('add')).toBe(instance.add)
})

it('should have ListItems', () => {
  expect(wrapper.find(ListItems)).toHaveLength(1)
})

it('should pass data to ListItems', () => {
  const instance = wrapper.instance()

  expect(wrapper.find(ListItems).prop('items')).toBe(instance.state.items)
})


if('should update state when this.add is invoked', () => {
  const value = 'qwerty123456'

  const instance = wrapper.instance()

  instance.add(value)

  const items = instance.state().items
  
  expect(items).toHaveLength(1)
  expect(items).toEqual([ value ])
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
    
    expect(li).toHaveLength(1)
    expect(li.text()).toBe(value)
  })
})