import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
})

function CircularIndeterminate(props) {
  const { classes } = props
  return (
    <div style={{ textAlign: 'center', height: '100vh' }}>
      <CircularProgress className={classes.progress} size={props.size || 200} />
      <Typography variant="display1">{props.children}</Typography>
    </div>
  )
}

export default withStyles(styles)(CircularIndeterminate)
