import React from 'react'
import { shallow, render } from 'enzyme'

import ListItems from '../components/ListItems'
import ListItem from '../components/ListItem'

const data = ['a','b','c','d']
let wrapper;

beforeEach(() => {
  wrapper = shallow(<ListItems items={data}/>)
})

it('should contain an unordered list', () => {
  expect(wrapper.find('ul').length).toBe(1)
})


it('should have as many ListItems as data passed it', () => {
  expect(wrapper.find(ListItem).length).toBe(data.length)
})

it('pass props to ListItems', () => {
  wrapper.find(ListItem).forEach((e,i) => {
    expect(e.prop('item')).toBe(data[i])
  })
})