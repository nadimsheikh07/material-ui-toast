import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import actions from './actions'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Button from '@material-ui/core/Button'

import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { amber, green } from '@material-ui/core/colors';

import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
    default: InfoIcon,
};

const styles = theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    default: {
        backgroundColor: '#333',
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});


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
                this.setState({ variant });
            }
            this.setState({ open: true, message, action, close, direction, handleAction })
            this.props.dismiss(this.props.snackbar.id)
        }
    }

    render() {
        const { children, SnackbarProps = {}, classes } = this.props
        const { action, message, open, close, variant, direction } = this.state
        const Icon = variantIcon[variant];

        return (
            <React.Fragment>
                {children}
                <Snackbar {...SnackbarProps}
                    open={open}
                    anchorOrigin={direction}
                    onClose={this.handleClose}
                    onExited={this.handleExited}
                >
                    <SnackbarContent
                        className={clsx(classes[variant], '')}
                        aria-describedby="client-snackbar"
                        message={
                            <span id="client-snackbar" className={classes.message}>
                                <Icon className={clsx(classes.icon, classes.iconVariant)} />
                                {message || ''}
                            </span>
                        }
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
                    />

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

SnackbarProvider = withStyles(styles)(SnackbarProvider);

export default connect(
    state => ({
        snackbar: state.snackbar.queue[0] || null
    }),
    dispatch => ({
        show: (options) => dispatch(actions.show({ options })),
        dismiss: (id) => dispatch(actions.dismiss({ id }))
    })
)(SnackbarProvider)