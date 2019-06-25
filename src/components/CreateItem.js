import React, { Component } from 'react'

class NewItem extends Component {
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

    this.props.add(this.state.newItem)
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

export default NewItem