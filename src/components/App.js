import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateItem from 'components/CreateItem'
import ListItems from 'components/ListItems'
import { bindActionCreators } from 'redux';

import { fetchItems } from 'actions/items'

export class App extends Component {
  componentDidMount = () => {
    this.props.fetchItems()
  }

  render(){
    return (
      <div>
        <CreateItem />
        <ListItems />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchItems
  }, dispatch)

export default connect(null, mapDispatchToProps)(App)
