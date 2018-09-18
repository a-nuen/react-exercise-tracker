import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

import PostForm from './PostForm'

const styles = {
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class FullScreenDialog extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <Dialog
          fullScreen
          open={this.props.open}
          onClose={this.props.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.props.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Create New Post
              </Typography>
            </Toolbar>
          </AppBar>
          <PostForm
            handleSubmit={this.props.handleSubmit}
            handleClose={this.props.handleClose}
          />
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(FullScreenDialog)
