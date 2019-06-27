import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { addItem } from 'actions/items'
export class CreateItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newItem: ''
    }
  }

  handleChange = event => {
    this.setState({
      newItem: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    this.props.addItem(this.state.newItem)
    this.setState({ newItem: '' }) 

  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <textarea value={this.state.newItem} onChange={this.handleChange}/>
        </div>
        <div>
          <button>Add</button>
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => 
  bindActionCreators({
    addItem
  }, dispatch)


export default connect(null, mapDispatchToProps)(CreateItem)