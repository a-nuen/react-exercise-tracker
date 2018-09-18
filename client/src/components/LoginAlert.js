import React from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class AlertDialog extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Add post?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please log in to make a post.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button onClick={this.props.handleClose} color="primary">
                Log in
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default AlertDialog
