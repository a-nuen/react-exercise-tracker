import * as actionTypes from './actionTypes'
import firebase from '../../firebase'

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

const fetchRepliesInit = () => {
  return {
    type: actionTypes.FETCH_REPLIES_INIT
  }
}

const fetchRepliesSuccess = payload => {
  return {
    type: actionTypes.FETCH_REPLIES_SUCCESS,
    payload
  }
}

const fetchRepliesFail = () => {
  return {
    type: actionTypes.FETCH_REPLIES_FAIL
  }
}

export const fetchReplies = (board, id) => {
  return dispatch => {
    dispatch(fetchRepliesInit())
    db.collection('posts')
      .doc(board)
      .collection('posts')
      .doc(id)
      .collection('replies')
      .orderBy('date', 'asc')
      .get()
      .then(querySnapshot => {
        const data = []
        querySnapshot.forEach(doc => {
          data.push({ ...doc.data(), id: doc.id })
        })
        dispatch(fetchRepliesSuccess(data))
      })
      .catch(error => {
        dispatch(fetchRepliesFail())
        console.log(error)
      })
  }
}
