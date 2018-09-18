import * as actionTypes from './actionTypes'

import firebase from '../../firebase'

export const signoutInit = () => {
  return {
    type: actionTypes.SIGNOUT_INIT
  }
}

export const signoutSuccess = payload => {
  return {
    type: actionTypes.SIGNOUT_SUCCESS,
    payload: payload
  }
}

export const signoutFail = () => {
  return {
    type: actionTypes.SIGNOUT_FAIL
  }
}

export const signout = () => {
  return dispatch => {
    dispatch(signoutInit())
    firebase
      .auth()
      .signOut()
      .then(() => {
        const payload = {
          uid: '',
          first: '',
          last: '',
          username: ''
        }
        dispatch(signoutSuccess(payload))
        console.log('Signed Out')
      })
      .catch(function(error) {
        var errorCode = error.code
        var errorMessage = error.message
        console.log(errorCode)
        console.log(errorMessage)
        dispatch(signoutFail())
      })
  }
}
