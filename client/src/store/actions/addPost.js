import * as actionTypes from './actionTypes'
import firebase from '../../firebase'
import { fetchPosts } from './index'

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

const addPostInit = () => {
  return {
    type: actionTypes.ADD_POST_INIT
  }
}

const addPostSuccess = () => {
  return {
    type: actionTypes.ADD_POST_SUCCESS
  }
}

const addPostFail = () => {
  return {
    type: actionTypes.ADD_POST_FAIL
  }
}

export const addPost = (board, post) => {
  return dispatch => {
    dispatch(addPostInit())
    db.collection('posts')
      .doc(board)
      .collection('posts')
      .add(post)
      .then(docRef => {
        dispatch(addPostSuccess())
        console.log(docRef)
        dispatch(fetchPosts(board))
      })
      .catch(error => {
        dispatch(addPostFail())
        console.log(error)
      })
  }
}
