import * as actionTypes from './actionTypes'

import firebase from '../../firebase'

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

const signinInit = () => {
  return {
    type: actionTypes.SIGNIN_INIT
  }
}

const signinSuccess = payload => {
  return {
    type: actionTypes.SIGNIN_SUCCESS,
    payload: payload
  }
}

const signinFail = error => {
  return {
    type: actionTypes.SIGNIN_FAIL,
    error: error
  }
}

export const signin = data => {
  return dispatch => {
    dispatch(signinInit())
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(response => {
        db.collection('users')
          .doc(response.user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              const payload = {
                uid: response.user.uid,
                first: doc.data().first,
                last: doc.data().last,
                username: doc.data().username
              }
              dispatch(signinSuccess(payload))
            } else {
              console.log('No such document exists')
              dispatch(signinFail('Error signing in'))
            }
          })
          .catch(err => {
            console.log('Error getting document', err)
            dispatch(signinFail('Error signing in'))
          })
      })
      .catch(function(error) {
        var errorCode = error.code
        var errorMessage = error.message
        console.log(errorCode)
        console.log(errorMessage)
        dispatch(signinFail(errorMessage))
      })
  }
}

export const autoSignin = uid => {
  return dispatch => {
    dispatch(signinInit())
    db.collection('users')
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          const payload = {
            uid: uid,
            first: doc.data().first,
            last: doc.data().last,
            username: doc.data().username
          }
          dispatch(signinSuccess(payload))
        } else {
          console.log('No such document exists')
          dispatch(signinFail('Error signing in, user does not exist'))
        }
      })
      .catch(err => {
        console.log('Error getting document', err)
        dispatch(signinFail(err))
      })
  }
}
