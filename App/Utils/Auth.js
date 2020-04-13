import { AsyncStorage } from 'react-native'

export const getToken = () => AsyncStorage.getItem('token').then(value => value)

export const getTokenType = () => AsyncStorage.getItem('token-type').then(value => value)

export const getDeviceToken = () => AsyncStorage.getItem('device-token').then(value => value)
