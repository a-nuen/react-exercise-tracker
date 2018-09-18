import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import AppBar from '../components/AppBar'
import Spinner from '../components/Spinner'
import { signup, clearError } from '../store/actions/index'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '90vw',
    maxWidth: 600
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 50
  },
  textField: {
    marginRight: 'auto'
  },
  button: {
    marginTop: 20
  },
  bg: {
    backgroundColor: theme.palette.background.default,
    height: '100vh'
  }
})

class SignupPage extends React.Component {
  state = {
    first: '',
    last: '',
    username: '',
    email: '',
    password: ''
  }

  componentWillUnmount() {
    this.props.clearError()
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.signup(this.state)
    this.setState({
      first: '',
      last: '',
      username: '',
      email: '',
      password: ''
    })
  }

  render() {
    const { classes } = this.props
    if (this.props.auth) this.props.history.goBack()
    return (
      <div className={classes.bg}>
        <AppBar>Signup Page</AppBar>
        <form
          className={classes.container}
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          {this.props.loading ? (
            <Spinner>Signing up...</Spinner>
          ) : (
            <Paper className={classes.root} elevation={3}>
              <h3>Signup</h3>
              {this.props.error && (
                <div style={{ color: 'red' }}>{this.props.error}</div>
              )}
              <TextField
                style={{ width: '49%', marginRight: '2%' }}
                id="first-name"
                label="First Name"
                className={classes.textField}
                type="text"
                name="first"
                onChange={this.handleChange}
                value={this.state.first}
                required
              />
              <TextField
                style={{ width: '49%' }}
                id="last-name"
                label="Last Name"
                className={classes.textField}
                type="text"
                name="last"
                onChange={this.handleChange}
                value={this.state.last}
                required
              />
              <TextField
                id="username-input"
                label="Username"
                className={classes.textField}
                type="text"
                autoComplete="username"
                name="username"
                fullWidth
                onChange={this.handleChange}
                value={this.state.username}
                required
              />
              <TextField
                id="email-input"
                label="Email"
                className={classes.textField}
                type="email"
                autoComplete="current-email"
                name="email"
                fullWidth
                onChange={this.handleChange}
                value={this.state.email}
                required
              />
              <br />
              <TextField
                id="password-input"
                label="Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                name="password"
                fullWidth
                onChange={this.handleChange}
                value={this.state.password}
                required
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
              >
                Signup
              </Button>
            </Paper>
          )}
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    auth: state.auth.uid,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signup: data => dispatch(signup(data)),
    clearError: () => dispatch(clearError())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignupPage))
