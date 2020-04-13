import { MessageBarManager } from 'Components/MessageBarEngine'

const apiErrorHandler = (response, title) => {
  const { problem, status, data } = response
  // const { error } = data
  // TODO: show server messages (data.error array)
  // console.log('ApiErrorHandler', { title, response })
  if (status === 500) {
    MessageBarManager.showAlert({
      title,
      message: 'Server error. Try again later',
      alertType: 'error'
    })
  } else if (problem === 'NETWORK_ERROR') {
    MessageBarManager.showAlert({
      title,
      message: 'You\'re offline. Restore network connection and try again',
      alertType: 'error'
    })
  } else if (problem === 'TIMEOUT_ERROR'){
    MessageBarManager.showAlert({
      title,
      message: 'Server isn\'t responding. Check your network connection.',
      alertType: 'error'
    })
  } else if (status === 400) {
    MessageBarManager.showAlert({
      title,
      message: 'Something bad happened. Try again in a minute.',
      alertType: 'error'
    })
  } else {
    // let msg = null
    // if (error && error.length > 0) msg = error.join(', ')
    MessageBarManager.showAlert({
      title: title || 'Something bad happened.',
      message: 'Try again in a minute.',
      alertType: 'error'
    })
  }
}

export default apiErrorHandler
