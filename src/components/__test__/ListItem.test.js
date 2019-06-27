import React from 'react'
import { shallow } from 'enzyme'

import ListItem from 'components/ListItem'

const item = {id: 1, title: 'abc'}

let wrapper

beforeEach(() => {
  // _SHALLOW_RENDER_
  wrapper = shallow(<ListItem item={item}/>)
})

// checking structure of component
it('should have a list item', () => {
  //_FIND_COMPONENTS_
  expect(wrapper.find('li')).toHaveLength(1)
})

// _SHALLOW_RENDER_
// check to see if prop is added to the component as text
it('should present passed data', () => {
  // _FIND_COMPONENTS_
  // _GET_TEXT_
  expect(wrapper.text()).toBe(item.title)
})