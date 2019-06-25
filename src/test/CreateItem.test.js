import React from 'react'
import { shallow } from 'enzyme'
import { fake } from 'sinon'

import CreateItem from '../components/CreateItem'

let wrapper

beforeEach(() => {
  wrapper = shallow(<CreateItem add={()=>{}}/>)
})

it('should have a textarea', () => {
  expect(wrapper.find('textarea')).toHaveLength(1)
})


it('should have a button', () => {
  expect(wrapper.find('button')).toHaveLength(1)
})

it('should update value of text area everytime an onchange triggers', () => {
  const value = 'qwerty12345'
  wrapper.find('textarea')
         .simulate('change', { target: { value } })

  wrapper.update()
 
  // .find needs to be called everytime to get changed data
  expect(wrapper.find('textarea').prop('value')).toBe(value)
})

it('should clear text area after form is submitted', () => {
  const value = 'qwerty12345'

  wrapper.update()
  wrapper.find('textarea')
         .simulate('change', { target: { value } })

  wrapper.update()
  wrapper.find('form')
         .simulate('submit', { preventDefault: () => {} })

  wrapper.update()
  expect(wrapper.find('textarea').prop('value')).toBe('')
})

// it should prevent default on submit

it('should prevent default on form submission', () => {
  const preventDefault = fake()

  wrapper.find('form')
         .simulate('submit', { preventDefault })

    expect(preventDefault.calledOnce).toBe(true)
})

it('should invoke passed function when form is submitted', () => {
  const value = 'qwerty12345'
  const add = fake()

  const wrapper = shallow(<CreateItem add={add}/>)
  wrapper.find('textarea')
         .simulate('change', { target: { value } })

  wrapper.find('form')
         .simulate('submit', { preventDefault: () => {} })

  expect(add.calledOnce).toBe(true)
  expect(add.calledWith(value)).toBe(true)
})