import * as actionTypes from './actionTypes'
import firebase from '../../firebase'

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

const outOfPosts = () => {
  return {
    type: actionTypes.OUT_OF_POSTS
  }
}

const fetchPostsInit = () => {
  return {
    type: actionTypes.FETCH_POSTS_INIT
  }
}

const fetchPostsSuccess = payload => {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    payload
  }
}

const fetchPostsFail = () => {
  return {
    type: actionTypes.FETCH_POSTS_FAIL
  }
}

export const fetchPosts = board => {
  return dispatch => {
    dispatch(fetchPostsInit())
    db.collection('posts')
      .doc(board)
      .collection('posts')
      .orderBy('date', 'desc')
      .limit(10)
      .get()
      .then(querySnapshot => {
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
        const data = []
        querySnapshot.forEach(doc => {
          data.push({ ...doc.data(), id: doc.id })
        })
        dispatch(fetchPostsSuccess(data))
      })
      .catch(error => {
        dispatch(fetchPostsFail())
        console.log(error)
      })
  }
}

let lastVisible = ''
export const fetchNextPosts = board => {
  return dispatch => {
    dispatch(fetchNextPostsInit())
    db.collection('posts')
      .doc(board)
      .collection('posts')
      .orderBy('date', 'desc')
      .startAfter(lastVisible)
      .limit(10)
      .get()
      .then(documentSnapshots => {
        if (documentSnapshots.docs.length < 1) return dispatch(outOfPosts())
        const data = []
        documentSnapshots.forEach(doc => {
          data.push({ ...doc.data(), id: doc.id })
        })
        lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
        dispatch(fetchNextPostsSuccess(data))
      })
      .catch(error => {
        dispatch(fetchNextPostsFail())
        console.log(error)
      })
  }
}

const fetchNextPostsInit = () => {
  return {
    type: actionTypes.FETCH_NEXT_POSTS_INIT
  }
}

const fetchNextPostsSuccess = payload => {
  return {
    type: actionTypes.FETCH_NEXT_POSTS_SUCCESS,
    payload
  }
}

const fetchNextPostsFail = () => {
  return {
    type: actionTypes.FETCH_NEXT_POSTS_FAIL
  }
}
