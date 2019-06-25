import React, { Component } from 'react'
import CreateItem from './CreateItem'
import ListItems from './ListItems'


class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      items: []
    }
  }
  
  add = item => {
    this.setState({
      items : [...this.state.items, item]
    })
  }
  
  render(){
    return (
      <div>
        <CreateItem add={this.add} />
        <ListItems items={this.state.items} />
      </div>
    );
  }
}

export default App;
