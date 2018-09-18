import React from 'react'
import { connect } from 'react-redux'

import Spinner from '../components/Spinner'
import PostBoard from '../components/PostBoard'
import NavBar from './NavBar'

import { fetchReplies, fetchPosts, addReply } from '../store/actions/index'

class PostPage extends React.Component {
  state = {
    board: ''
  }

  componentWillMount() {
    const currentPath = this.props.location.pathname.split('/')[1]
    this.setState({
      board: currentPath === 'post' ? 'general' : currentPath
    })
  }

  componentDidMount() {
    this.props.fetchPosts(this.state.board)
    this.props.fetchReplies(this.state.board, this.props.match.params.id)
  }

  render() {
    const id = this.props.match.params.id
    const ogPost = this.props.posts.find(post => post.id === id)

    const postBoard =
      this.props.loading || !ogPost ? (
        <Spinner>Loading...</Spinner>
      ) : (
        <PostBoard
          title={ogPost.title}
          body={ogPost.body}
          ogPosterUsername={ogPost.username}
          date={ogPost.date}
          id={id}
          addReply={this.props.addReply}
          replies={this.props.replies}
          uid={this.props.uid}
          username={this.props.username}
          board={this.state.board}
        />
      )
    return <NavBar>{postBoard}</NavBar>
  }
}

const mapStateToProps = state => {
  return {
    posts: state.post.posts,
    loading: state.post.loading,
    replies: state.post.replies,
    uid: state.auth.uid,
    username: state.auth.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchReplies: (board, id) => dispatch(fetchReplies(board, id)),
    fetchPosts: board => dispatch(fetchPosts(board)),
    addReply: (board, id, post) => dispatch(addReply(board, id, post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage)
