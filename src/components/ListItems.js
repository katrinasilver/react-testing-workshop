import React from 'react'
import { connect } from 'react-redux'

import ListItem from 'components/ListItem'

export const ListItems = props => (
  <ul>
    {
      props.items.map((e,i) => <ListItem key={i} item={e} />)
    }
  </ul>
)

const mapStateToProps = state => ({ items: state.items})

export default connect(mapStateToProps)(ListItems)