import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 'auto'
  },
  textField: {
    marginLeft: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 5
  },
  button: {
    marginLeft: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 5
  }
})

class TextFields extends React.Component {
  state = {
    title: '',
    body: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = e => {
    this.props.handleSubmit(e, this.state)
    this.setState({ title: '', body: '' })
    this.props.handleClose()
  }

  render() {
    const { classes } = this.props

    return (
      <form
        className={classes.container}
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <TextField
          id="title"
          label="Title"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handleChange('title')}
          margin="normal"
          autoFocus
          fullWidth
          required
        />

        <TextField
          id="body"
          label="Body"
          multiline
          rows="14"
          className={classes.textField}
          value={this.state.body}
          onChange={this.handleChange('body')}
          margin="normal"
          fullWidth
          required
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.button}
          fullWidth
        >
          Create Post
        </Button>
      </form>
    )
  }
}

export default withStyles(styles)(TextFields)
