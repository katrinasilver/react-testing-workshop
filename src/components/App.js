import React, { Component } from 'react'
import CreateItem from 'components/CreateItem'
import ListItems from 'components/ListItems'


class App extends Component {
  // constructor(props){
  //   super(props)

  //   this.state = {
  //     items: []
  //   }
  // }
  
  // add = item => {
  //   this.setState({
  //     items : [...this.state.items, item]
  //   })
  // }
  
  render(){
    return (
      <div>
        <CreateItem />
        <ListItems />
      </div>
    );
  }
}

export default App;
