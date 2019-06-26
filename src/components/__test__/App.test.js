import React from 'react';
import { shallow } from 'enzyme'

import App from 'components/App';
import CreateItem from 'components/CreateItem'
import ListItems from 'components/ListItems'

let wrapper

beforeEach(() => {
  wrapper = shallow(<App/>)
})

// makes sure that the correct components are added to
// `App`
// There is no state management in App, everything is in redux
it('should have CreateItem', () => {
  expect(wrapper.find(CreateItem)).toHaveLength(1)
})

it('should have ListItems', () => {
  expect(wrapper.find(ListItems)).toHaveLength(1)
})


