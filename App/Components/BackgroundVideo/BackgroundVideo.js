import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import Video from 'react-native-video'

export default class BackgroundVideo extends Component {
  render () {
    const { uri, source } = this.props

    return (
      <Video source={uri ? { uri } : source}
        ref={(ref) => {
          this.player = ref
        }}
        rate={1.0}
        volume={1.0}
        muted={false}
        paused={false}
        resizeMode='cover'
        repeat
        playInBackground={false}
        playWhenInactive={false}
        ignoreSilentSwitch={'ignore'}
        progressUpdateInterval={250.0}
        onLoadStart={loadStart => console.log('loadStart', loadStart)}
        onLoad={load => console.log('load', load)}
        onError={err => console.log('error', err)}
        style={styles.backgroundVideo} />
    )
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})
