import * as actionTypes from '../actions/actionTypes'

const initialState = {
  posts: [],
  replies: [],
  loading: false,
  outOfPosts: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_POST_INIT:
    case actionTypes.ADD_REPLY_INIT:
    case actionTypes.FETCH_POSTS_INIT:
    case actionTypes.FETCH_NEXT_POSTS_INIT:
    case actionTypes.FETCH_REPLIES_INIT:
      return {
        ...state,
        loading: true,
        outOfPosts: false
      }
    case actionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload
      }
    case actionTypes.FETCH_NEXT_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.payload]
      }
    case actionTypes.FETCH_REPLIES_SUCCESS:
      return {
        ...state,
        loading: false,
        replies: action.payload
      }
    case actionTypes.ADD_POST_SUCCESS:
    case actionTypes.ADD_REPLY_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case actionTypes.ADD_POST_FAIL:
    case actionTypes.ADD_REPLY_FAIL:
    case actionTypes.FETCH_REPLIES_FAIL:
    case actionTypes.FETCH_POSTS_FAIL:
    case actionTypes.FETCH_NEXT_POSTS_FAIL:
      return {
        ...state,
        loading: false
      }
    case actionTypes.OUT_OF_POSTS:
      return {
        ...state,
        loading: false,
        outOfPosts: true
      }
    default:
      return state
  }
}

export default reducer
