import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import withRoot from 'material-ui-toast/example/src/withRoot'

import { withSnackbar } from 'material-ui-toast'


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(20)
  },
  button: {
    margin: theme.spacing(1),
  },

})

class App extends React.Component {

  handleClick = (variant) => {
    const { snackbar } = this.props
    const options = {
      message: variant,
      action: false,
      handleAction: () => {/* do something... */ },
      close: true,
      variant: variant
    }
    snackbar.show(options)
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>


        <Typography variant="h1" component="h1">
          Material-UI Toast Redux
        </Typography>

        <Typography variant="h4" component="h4">
          Toast component using Material-UI with Redux integration
        </Typography>

        <Button variant="contained" color="primary" className={classes.button} onClick={() => { this.handleClick('success') }}>
          Open Success Toast
        </Button>
        <Button variant="contained" color="secondary" className={classes.button} onClick={() => { this.handleClick('error') }}>
          Open Error Toast
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={() => { this.handleClick('warning') }}>
          Open Warning Toast
        </Button>
        <Button variant="contained" color="secondary" className={classes.button} onClick={() => { this.handleClick('info') }}>
          Open info Toast
        </Button>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withSnackbar()(withStyles(styles)(App)))
