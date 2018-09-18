import React from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

import MessageBoard from '../components/MessageBoard'
import CreatePost from '../components/CreatePost'
import LoginAlert from '../components/LoginAlert'
import NavBar from './NavBar'

import { addPost, fetchPosts, fetchNextPosts } from '../store/actions/index'

class HomePage extends React.Component {
  state = {
    createPost: false,
    loginAlert: false,
    board: ''
  }

  componentWillMount() {
    window.addEventListener('scroll', this.handleOnScroll)
    const currentPath = this.props.match.path
    this.setState({
      board: currentPath === '/' ? 'general' : currentPath.slice(1)
    })
  }

  componentDidMount() {
    this.props.fetchPosts(this.state.board)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll)
  }

  handleOnScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight

    if (scrolledToBottom && !this.props.loading && !this.props.outOfPosts) {
      this.props.fetchNextPosts(this.state.board)
    }
  }

  handleOpen = () => {
    this.props.auth
      ? this.setState({ createPost: true })
      : this.setState({ loginAlert: true })
  }

  handleClose = () => {
    this.setState({ createPost: false })
    this.setState({ loginAlert: false })
  }

  handleSubmit = (e, post) => {
    e.preventDefault()

    const newPost = {
      ...post,
      date: Date.now(),
      uid: this.props.auth,
      username: this.props.username
    }

    this.props.addPost(this.state.board, newPost)
  }

  render() {
    const boardComponent = (
      <React.Fragment>
        <MessageBoard
          posts={this.props.posts}
          username={this.props.username}
          handlePostClick={this.handlePostClick}
          board={this.props.match.path}
          heading={this.state.board}
        />
        <CreatePost
          open={this.state.createPost}
          handleClose={this.handleClose}
          handleSubmit={this.handleSubmit}
        />
        <Button
          style={{ position: 'fixed', bottom: 20, right: 24 }}
          onClick={this.handleOpen}
          color="primary"
          variant="fab"
        >
          <AddIcon />
        </Button>
      </React.Fragment>
    )

    return (
      <NavBar>
        <LoginAlert
          open={this.state.loginAlert}
          handleClose={this.handleClose}
        />
        {boardComponent}
        {this.props.loading && (
          <div style={{ textAlign: 'center' }}>Loading...</div>
        )}
        {this.props.outOfPosts && (
          <div style={{ textAlign: 'center' }}>No more posts to load.</div>
        )}
      </NavBar>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.uid,
    posts: state.post.posts,
    username: state.auth.username,
    loading: state.post.loading,
    outOfPosts: state.post.outOfPosts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPost: (board, post) => dispatch(addPost(board, post)),
    fetchPosts: board => dispatch(fetchPosts(board)),
    fetchNextPosts: board => dispatch(fetchNextPosts(board))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
