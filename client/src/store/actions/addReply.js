import * as actionTypes from './actionTypes'
import firebase from '../../firebase'
import { fetchReplies } from './index'

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

const addReplyInit = () => {
  return {
    type: actionTypes.ADD_REPLY_INIT
  }
}

const addReplySuccess = () => {
  return {
    type: actionTypes.ADD_REPLY_SUCCESS
  }
}

const addReplyFail = () => {
  return {
    type: actionTypes.ADD_REPLY_FAIL
  }
}

export const addReply = (board, id, post) => {
  return dispatch => {
    dispatch(addReplyInit())
    db.collection('posts')
      .doc(board)
      .collection('posts')
      .doc(id)
      .collection('replies')
      .add(post)
      .then(docRef => {
        dispatch(addReplySuccess())
        console.log(docRef)
        dispatch(fetchReplies(board, id))
      })
      .catch(error => {
        dispatch(addReplyFail())
        console.log(error)
      })
  }
}
