import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const styles = {
  form: {
    margin: 20,
    width: 'auto'
  }
}

class TemporaryDrawer extends React.Component {
  state = {
    input: ''
  }

  handleChange = e => {
    this.setState({ input: e.target.value })
  }

  handleSubmit = e => {
    this.props.handleSubmit(e, this.state)
    this.setState({ input: '' })
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <Drawer
          anchor="bottom"
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <TextField
              id="reply"
              label="Add your reply"
              multiline
              rows="4"
              className={classes.textField}
              value={this.state.input}
              onChange={this.handleChange}
              margin="normal"
              autoFocus
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add reply
            </Button>
          </form>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(TemporaryDrawer)
