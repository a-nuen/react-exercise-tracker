import React from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import LoginPage from './containers/LoginPage'
import MainPage from './containers/MainPage'
import SignupPage from './containers/SignupPage'
import PostPage from './containers/PostPage'

import firebase from './firebase'

import { autoSignin } from './store/actions/index'

class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log('Auto signing in user...')
        autoSign(user.uid)
      } else {
        // User is signed out.
        console.log('Auto sign in failed: User is signed out')
      }
    })
    const autoSign = id => this.props.autoSignin(id)
  }

  render() {
    return (
      <Switch>
        <Route path="/:board/post/:id" component={PostPage} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/anime" key={'uniqueKey2'} component={MainPage} />
        <Route path="/manga" key={'uniqueKey3'} component={MainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/" exact key={'uniqueKey1'} component={MainPage} />
        <Redirect to="/" />
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return {
    signedIn: state.auth.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoSignin: uid => dispatch(autoSignin(uid))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
