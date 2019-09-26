# material-ui-toast

> Snackbar component using Material-UI with Redux integration

## Install

```
$ npm install material-ui-toast --save
```

## Setup

### Add the Reducer to Redux store

The first step is to add the reducer to your rootReducer when creating Redux's store.

```js
import { combineReducers } from 'redux'
import { snackbarReducer } from 'material-ui-toast'

const rootReducer = combineReducers({
  // other reducers...
  snackbar: snackbarReducer
})

export default rootReducer
```

### Add the SnackbarProvider component to the tree

The second step is to add the `SnackbarProvider` component somewhere in your app.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'material-ui-toast'
import App from './App' // your entry page
import reducer from './reducers' // root reduer

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 3500 }}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
)
```

#### SnackbarProvider Props

|Name            |Type        |Default     |Description
|----------------|------------|------------|--------------------------------
|children|`node`||The children that are wrapped by this provider.
|SnackbarProps|`object`||Properties applied to the `Snackbar` element.

## Usage

### Use withSnackbar HOC

You can display snackbar messages with the `withSnackbar` HOC and the injected `snackbar` prop in your components.

```js
import React from 'react'
import { withSnackbar } from 'material-ui-toast'
import Button from '@material-ui/core/Button'

class MyComponent extends React.Component {

  handleClick = (variant) => {
    const { snackbar } = this.props
    snackbar.show(variant, false, true, variant, () => {/* do something... */ })
  }

  render () {
    <div>
        <Button variant="contained" color="primary" onClick={() => { this.handleClick('success') }}>
            Open Success Toast
        </Button>
        <Button variant="contained" color="secondary" onClick={() => { this.handleClick('error') }}>
            Open Error Toast
        </Button>
        <Button variant="contained" color="primary" onClick={() => { this.handleClick('warning') }}>
          Open Warning Toast
        </Button>
        <Button variant="contained" color="secondary" onClick={() => { this.handleClick('info') }}>
          Open info Toast
        </Button>
    </div>
  }
}

export default withSnackbar()(MyComponent)
```

#### API

**`const options = {message:'Archived',action: false,handleAction: () => {},close: true,variant: 'info',direction: { vertical: 'bottom', horizontal: 'right' }}`**
**`snackbar.show(options)`**

* `message` (string) – message to display
* `action` (string, _optional_) – label for the action button
* `handler` (function, _optional_) – click handler for the action button
* `close` (string, _optional_) – handle close option
* `variant` (string) – handle variant option (info, success, error, warning)
* `direction` (object) – handle direction { vertical: 'bottom', horizontal: 'right' }


### Dispatch actions

You may use some libraries to handle asynchronous actions or side effects, like [redux-thunk](https://github.com/reduxjs/redux-thunk), [redux-saga](https://github.com/redux-saga/redux-saga) and [redux-observable](https://github.com/redux-observable/redux-observable). In this context, you can use `snackbarActions` action creator to dispath actions that show snackbars.


```js
import { snackbarActions as snackbar } from 'material-ui-toast'

dispatch(snackbar.show({
  message: 'Archived',
  action: 'Undo',
  handleAction: () => {/* do something... */}
  close: true,
  variant: 'info',
  direction: { vertical: 'bottom', horizontal: 'right' }
}))
```

## References

* [Snackbars - Material Design](https://material.io/design/components/snackbars.html)
* [Snackbar API - Material-UI](https://material-ui.com/api/snackbar/)

## License

[MIT](LICENSE)
