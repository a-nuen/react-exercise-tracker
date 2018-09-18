import * as actionTypes from './actionTypes'

import firebase from '../../firebase'

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

export const signupInit = () => {
  return {
    type: actionTypes.SIGNUP_INIT
  }
}

export const signupSuccess = payload => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    payload: payload
  }
}

export const signupFail = error => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    error: error
  }
}

export const signup = data => {
  return dispatch => {
    dispatch(signupInit())
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(response => {
        const payload = {
          uid: response.user.uid,
          first: data.first,
          last: data.last,
          username: data.username
        }
        dispatch(signupSuccess(payload))
        db.collection('users')
          .doc(response.user.uid)
          .set(payload)
      })
      .catch(function(error) {
        var errorCode = error.code
        var errorMessage = error.message
        console.log(errorCode)
        console.log(errorMessage)
        dispatch(signupFail(errorMessage))
      })
  }
}
