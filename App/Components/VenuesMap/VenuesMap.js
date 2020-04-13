import React from 'react'
import { View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import MapView from 'react-native-maps'
import Marker from './Components/Marker'
import { width, height } from 'Themes'

const ASPECT_RATIO = width / height
const LATITUDE = 40.726003
const LONGITUDE = -73.995312
const LATITUDE_DELTA = 0.032
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class VenuesMap extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      initialRegion: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    }
  }

  renderMarkers = (venue, key) => <Marker {...venue} key={key} index={key} />

  render () {
    const { venues } = this.props
    const { initialRegion } = this.state
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onMarkerPress={m => {
            // console.log('onMarkerPress', m)
          }}
          initialRegion={initialRegion}>
          {venues && venues.length > 0
          ? venues.map(this.renderMarkers)
          : null}
        </MapView>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    height: height * 0.92,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
})
