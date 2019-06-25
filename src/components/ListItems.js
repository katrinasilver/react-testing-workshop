import React from 'react'

import ListItem from './ListItem'

const ListItems = props => (
  <ul>
    {
      props.items.map((e,i) => <ListItem key={i} item={e} />)
    }
  </ul>
)

export default ListItems