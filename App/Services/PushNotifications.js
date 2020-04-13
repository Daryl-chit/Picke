import PushNotification from 'react-native-push-notification'
import { isNil } from 'lodash'

export default class PushService {
  static init () {
    PushService.onNotification = (notification) => {
      PushNotification.localNotification({
        title: notification.subject,
        message: notification.body
      })
    }
    PushService.onRegistration = null
    PushService.tab = null
  }

  static setCallbacks (onRegistration, onNotification) {
    PushService.onRegistration = onRegistration
    PushService.onNotification = onNotification
  }

  static configure () {
    PushNotification.configure({
      onRegister: (device) => {
        if (PushService.onRegistration) {
          PushService.onRegistration(device)
        }
      },
      onNotification: (notification) => {
        if (PushService.onNotification) {
          PushService.onNotification(notification)
        }
      },
      requestPermissions: true
    })
  }
}

PushService.init()
