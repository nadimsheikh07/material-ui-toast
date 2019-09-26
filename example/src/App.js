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
    paddingTop: theme.spacing.unit * 20
  }
})

class App extends React.Component {
  handleClick = () => {
    const { snackbar } = this.props
    snackbar.show('Archived', 'Undo', () => {/* do something... */ })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>

        <div>
          <Typography variant="display1" gutterBottom>
            Material-UI Toast Redux
        </Typography>
        </div>

        <div>
          <Typography variant="subheading" gutterBottom>
            Toast component using Material-UI v1 with Redux integration
        </Typography>
        </div>

        <Button variant="contained" color="secondary" onClick={this.handleClick}>
          Open Toast
        </Button>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withSnackbar()(withStyles(styles)(App)))
