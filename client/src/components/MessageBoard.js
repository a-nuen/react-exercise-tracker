import React from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
})

function MessageBoard(props) {
  const { classes } = props
  const posts = props.posts.map(post => {
    const date = new Date(post.date).toUTCString()
    return (
      <div key={post.id}>
        <Link
          to={(props.board === '/' ? '' : props.board) + '/post/' + post.id}
          style={{
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <List
            className={classes.root}
            component="nav"
            disablePadding
            style={{ wordBreak: 'break-word' }}
          >
            <ListItem divider button>
              <ListItemText
                primary={post.title}
                secondary={`Posted by ${post.username} on ${date}`}
              />
            </ListItem>
          </List>
        </Link>
      </div>
    )
  })

  return <div style={{ minHeight: '100vh' }}>{posts}</div>
}

export default withStyles(styles)(MessageBoard)
