import React from 'react'
import { NavLink } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
})

function DrawerContent(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <Divider />
      <List>
        <ListItem
          exact
          component={NavLink}
          to="/"
          activeStyle={{
            color: '#2196f3'
          }}
          button
        >
          <div>General</div>
        </ListItem>

        <ListItem
          component={NavLink}
          to="/anime"
          activeStyle={{
            color: '#2196f3'
          }}
          button
        >
          <div>Anime</div>
        </ListItem>

        <ListItem
          component={NavLink}
          to="/manga"
          activeStyle={{
            color: '#2196f3'
          }}
          button
        >
          <div>Manga</div>
        </ListItem>
      </List>
    </div>
  )
}

export default withStyles(styles)(DrawerContent)
