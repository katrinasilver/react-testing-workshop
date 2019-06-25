import React from 'react'
import { shallow } from 'enzyme'

import ListItem from '../components/ListItem'

it('should have a list item', () => {
  const wrapper = shallow(<ListItem />)

  expect(wrapper.find('li').length).toBe(1)
})

it('should present passed data', () => {
  const text = 'abc'
  const wrapper = shallow(<ListItem item={text} />)

  expect(wrapper.text()).toBe(text)

})