import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'material-ui-toast'
import App from './App'
import configureStore from './store'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider SnackbarProps={{ autoHideDuration: 3000 }} direction={{ vertical: 'top', horizontal: 'left' }}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.querySelector('#root')
)
