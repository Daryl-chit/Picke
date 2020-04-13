import React from 'react'
import { View, Text } from 'react-native-animatable'
import EStyleSheet from 'react-native-extended-stylesheet'

import MapView from 'react-native-maps'

import { Images, calcRem, Fonts, Colors } from 'Themes'

const Marker = ({ lat, lon, title, types, desc, index }) => {
  const coords = {
    latitude: parseFloat(lat),
    longitude: parseFloat(lon)
  }
  return (
    <MapView.Marker
      coordinate={coords}
      title={title}
      description={desc}>
      <View style={s.wrapper}>
        <View style={s.icon} easing='ease-in-out-quint' duration={1200} delay={100 * index} animation='zoomIn' />
        <View style={s.marker} easing='ease-in-out-quint' duration={1150} delay={300 + (100 * index)} animation='fadeInRight'>
          <Text style={s.markerTitle}>{title}</Text>
          <Text numberOfLines={1} style={s.markerDesc}>{desc}</Text>
        </View>
      </View>
    </MapView.Marker>
  )
}

const s = EStyleSheet.create({
  marker: {
    maxWidth: '7.5rem',
    backgroundColor: '#fff',
    paddingVertical: '0.25rem',
    paddingHorizontal: '0.32rem',
    borderRadius: '0.2rem',
    shadowColor: '#111',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: '1.3rem',
    height: '1.3rem',
    borderRadius: '1rem',
    backgroundColor: Colors.purplePink,
    marginBottom: '0.3rem'
  },
  markerTitle: {
    color: Colors.purplePink,
    fontFamily: Fonts.type.base,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: '0.7rem',
    marginBottom: '0.05rem'
  },
  markerDesc: {
    color: '#777',
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    textAlign: 'center',
    fontSize: '0.5rem'
  }
})
export default Marker
