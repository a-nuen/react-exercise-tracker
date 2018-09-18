import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

import LoginAlert from './LoginAlert'
import PostDrawer from './PostDrawer'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
})

class PostBoard extends React.Component {
  state = {
    open: false,
    loginAlert: false
  }

  handleChange = e => {
    this.setState({ input: e.target.value })
  }

  handleOpen = () => {
    this.props.uid
      ? this.setState({ open: true })
      : this.setState({ loginAlert: true })
  }

  handleClose = () => {
    this.setState({ loginAlert: false, open: false })
  }

  handleSubmit = (e, post) => {
    e.preventDefault()
    if (this.props.uid) {
      const reply = {
        body: post.input,
        username: this.props.username,
        date: Date.now(),
        uid: this.props.uid
      }
      this.props.addReply(this.props.board, this.props.id, reply)
    } else {
      this.setState({ loginAlert: true })
    }
  }

  render() {
    const { classes, title, body, ogPosterUsername } = this.props
    const date = new Date(this.props.date).toUTCString()

    const replies = this.props.replies.map(reply => {
      const date = new Date(reply.date).toUTCString()
      return (
        <Paper
          style={{ wordBreak: 'break-word' }}
          key={reply.id}
          className={classes.root}
          elevation={1}
        >
          <Typography variant="body1">{reply.body}</Typography>
          <br />
          <Typography variant="caption" style={{ textAlign: 'right' }}>
            Posted by {reply.username} on {date}
          </Typography>
        </Paper>
      )
    })

    return (
      <div style={{ minHeight: '100vh' }}>
        <Paper
          style={{ wordBreak: 'break-word' }}
          className={classes.root}
          elevation={1}
        >
          <Typography variant="subheading">{title}</Typography>
          <br />
          <Typography variant="body1">{body}</Typography>
          <br />
          <Typography variant="caption" style={{ textAlign: 'right' }}>
            Posted by {ogPosterUsername} on {date}
          </Typography>
        </Paper>
        {replies}
        <Button
          style={{ position: 'fixed', bottom: 20, right: 24 }}
          onClick={this.handleOpen}
          color="primary"
          variant="fab"
        >
          <AddIcon />
        </Button>
        <PostDrawer
          open={this.state.open}
          handleClose={this.handleClose}
          handleSubmit={this.handleSubmit}
        />
        <LoginAlert
          open={this.state.loginAlert}
          handleClose={this.handleClose}
        />
      </div>
    )
  }
}

export default withStyles(styles)(PostBoard)
