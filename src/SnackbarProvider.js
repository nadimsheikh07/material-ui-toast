import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import actions from './actions'

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
});

class SnackbarProvider extends PureComponent {
    state = {
        open: false,
        close: false,
        message: null,
        action: null
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
            const { message, action, close, handleAction } = this.props.snackbar
            this.setState({ open: true, message, action, close, handleAction })
            this.props.dismiss(this.props.snackbar.id)
        }
    }

    render() {
        console.log('this.state', this.state);
        const { children, SnackbarProps = {}, classes } = this.props
        const { action, message, open, close } = this.state

        return (
            <React.Fragment>
                {children}
                <Snackbar {...SnackbarProps}
                    open={open}
                    message={message || ''}
                    action={
                        <React.Fragment>
                            {action && (
                                <Button key="action" color="secondary" size="small" onClick={this.handleActionClick}>
                                    {action}
                                </Button>
                            )}

                            {close && <IconButton
                                key="close"
                                aria-label="close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>}

                        </React.Fragment>
                    }
                    onClose={this.handleClose}
                    onExited={this.handleExited}
                />
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
        show: (message, action, close, handleAction) => dispatch(actions.show({ message, action, close, handleAction })),
        dismiss: (id) => dispatch(actions.dismiss({ id }))
    })
)(withStyles(styles)(SnackbarProvider))