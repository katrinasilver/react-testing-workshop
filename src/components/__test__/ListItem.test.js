import React from 'react'
import { shallow } from 'enzyme'

import ListItem from 'components/ListItem'

// checking structure of component
it('should have a list item', () => {
  const wrapper = shallow(<ListItem />)

  expect(wrapper.find('li')).toHaveLength(1)
})

// check to see if prop is added to the component as text
it('should present passed data', () => {
  const text = 'abc'
  const wrapper = shallow(<ListItem item={text} />)

  expect(wrapper.text()).toBe(text)

})