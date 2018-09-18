import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import AppBar from '../components/AppBar'
import Spinner from '../components/Spinner'
import { signin, clearError } from '../store/actions/index'

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
    margin: 'auto'
  },
  button: {
    marginTop: 20
  },
  bg: {
    backgroundColor: theme.palette.background.default,
    height: '100vh'
  }
})

class LoginPage extends React.Component {
  state = {
    email: '',
    password: ''
  }

  componentWillUnmount() {
    this.props.clearError()
  }

  handleChange = e => {
    this.setState({
      [e.target.type]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.signin(this.state)
    this.setState({ email: '', password: '' })
  }

  render() {
    const { classes } = this.props
    if (this.props.auth) this.props.history.goBack()
    return (
      <div className={classes.bg}>
        <AppBar>Login Page</AppBar>
        <form
          className={classes.container}
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          {this.props.loading ? (
            <Spinner>Logging in...</Spinner>
          ) : (
            <Paper className={classes.root} elevation={3}>
              <h3>Login</h3>
              {this.props.error && (
                <div style={{ color: 'red' }}>{this.props.error}</div>
              )}
              <TextField
                id="email-input"
                label="Email"
                className={classes.textField}
                type="email"
                autoComplete="current-email"
                value={this.state.email}
                onChange={this.handleChange}
                autoFocus
                required
                fullWidth
              />
              <br />
              <TextField
                id="password-input"
                label="Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.handleChange}
                required
                fullWidth
              />
              <div style={{ display: 'flex' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Login
                </Button>

                <Link
                  to="/signup"
                  style={{ marginLeft: 'auto', textDecoration: 'none' }}
                >
                  <Button
                    variant="contained"
                    color="inherit"
                    className={classes.button}
                  >
                    Signup
                  </Button>
                </Link>
              </div>
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
    signin: data => dispatch(signin(data)),
    clearError: () => dispatch(clearError())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LoginPage))
