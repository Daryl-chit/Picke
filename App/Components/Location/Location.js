import React, { Component } from 'react'
import {
  AsyncStorage,
  Alert,
  Linking
} from 'react-native'

export const openSettingsDialog = () => {
  Alert.alert(
    'WHERE ARE YOU?',
    'In order to suggest potential matches near you, Picke needs to know where you are.',
    [
      {
        text: 'OPEN SETTINGS',
        onPress: () => Linking.openURL('app-settings:1')
      }
    ],
    { cancelable: false }
  )
}

export default class Location extends Component {
  componentWillMount () {
    this.configureLocation()
  }

  configureLocation () {
    const { user } = this.props
    const { location } = user
    const isLocationSet = (location.lat !== null)
    const locationSuccess = position => {
      const params = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }
      AsyncStorage.setItem('location', JSON.stringify(params))
    }

    const locationWatchSuccess = position => {
      const params = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }
      AsyncStorage.setItem('location', JSON.stringify(params))
      this.props.setLocation(params)
    }

    const locationError = error => {
      AsyncStorage.removeItem('location')
      if (!isLocationSet) openSettingsDialog()
    }

    const navigatorOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 100000
    }

    const watchOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 100000,
      distanceFilter: 100
    }

    navigator.geolocation.getCurrentPosition(
      locationSuccess,
      locationError,
      navigatorOptions
    )

    navigator.geolocation.watchPosition(
      locationWatchSuccess,
      locationError,
      watchOptions
    )
  }
  render () {
    return null
  }
}
