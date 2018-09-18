import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'

import DrawerContent from '../components/DrawerContent'

import { signout } from '../store/actions/index'

const drawerWidth = 220

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  content: {
    height: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  button: {
    color: 'white',
    border: '2px solid white'
  }
})

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  handleClick = () => {
    this.props.signout()
  }

  render() {
    const { classes } = this.props
    const { username } = this.props

    const loginButton = !this.props.auth ? (
      <Link to="/login" style={{ marginLeft: 15, textDecoration: 'none' }}>
        <Button variant="outlined" className={classes.button}>
          Login
        </Button>
      </Link>
    ) : (
      <Button
        style={{ marginLeft: 15, textDecoration: 'none' }}
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={this.handleClick}
      >
        Logout
      </Button>
    )

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Logo
            </Typography>
            <Typography
              style={{ marginLeft: 'auto' }}
              variant="subheading"
              color="inherit"
              noWrap
            >
              Welcome, {username ? username : 'Guest'}
            </Typography>
            {loginButton}
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <div className={classes.toolbar} />
            <DrawerContent />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.toolbar} />
            <DrawerContent />
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          {this.props.children}
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.uid,
    username: state.auth.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signout: () => dispatch(signout())
  }
}

const wrappedComponent = withStyles(styles, { withTheme: true })(
  ResponsiveDrawer
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrappedComponent)
