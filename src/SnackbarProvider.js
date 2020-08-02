/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import actions from './actions'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

class SnackbarProvider extends PureComponent {
  state = {
    open: false,
    close: false,
    message: null,
    variant: 'default',
    action: null,
    direction: {
      vertical: 'bottom',
      horizontal: 'right'
    }
  }

  getChildContext() {
    return {
      snackbar: {
        show: this.props.show
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.snackbar !== prevProps.snackbar) {
      if (this.props.snackbar) {
        if (this.state.open) {
          this.setState({ open: false })
        } else {
          this.processQueue()
        }
      }
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    this.setState({ open: false, handleAction: null })
  }

  handleExited = () => {
    this.processQueue()
  }

  handleActionClick = () => {
    this.handleClose()
    this.state.handleAction()
  }

  processQueue = () => {
    if (this.props.snackbar) {
      const { message, action, handleAction, close, variant, direction } = this.props.snackbar.options
      if (variant) {
        this.setState({ variant })
      }
      this.setState({ open: true, message, action, close, direction, handleAction })
      this.props.dismiss(this.props.snackbar.id)
    }
  }

  render() {
    const { children, SnackbarProps = {}, direction } = this.props
    const { message, open, variant } = this.state

    return (
      <React.Fragment>
        {children}
        <Snackbar {...SnackbarProps}
          open={open}
          anchorOrigin={direction}
          onClose={this.handleClose}
          onExited={this.handleExited}
        >
          <Alert onClose={() => this.handleClose()} severity={variant}>
            {message || ''}
          </Alert>
        </Snackbar>
      </React.Fragment>
    )
  }
}

SnackbarProvider.childContextTypes = {
  snackbar: PropTypes.object
}

SnackbarProvider.propTypes = {
  children: PropTypes.node,
  SnackbarProps: PropTypes.object
}

export default connect(
  state => ({
    snackbar: state.snackbar.queue[0] || null
  }),
  dispatch => ({
    show: (options) => dispatch(actions.show({ options })),
    dismiss: (id) => dispatch(actions.dismiss({ id }))
  })
)(SnackbarProvider)
