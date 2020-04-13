import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  InteractionManager,
  LayoutAnimation,
  Linking
} from 'react-native'

import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import { ImageViewer, InstagramLogin, FastImage as Image } from 'Components'
import { Images, calcWidth, IS_IOS } from 'Themes'
import { openUrl } from 'Utils'
import { arrayChunk } from 'Tools'

import { INSTAGRAM_CLIENT_ID, INSTAGRAM_REDIRECT_URI } from 'Config/Constants'

import styles from './UserInstagram.style'

class UserInstagram extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pagination: 0,
      showImages: false
    }
  }

  getInstagramSubscribers = subscribersCount => {
    this.setState({ subscribersCount })
  }

  onScrollEnd = (e) => {
    let contentOffset = e.nativeEvent.contentOffset
    let viewSize = e.nativeEvent.layoutMeasurement

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width)

    this.setState({ pagination: pageNum })
  }

  openUserInstagram = () => {
    const { username } = this.props
    const url = `https://www.instagram.com/${username}/`
    if (IS_IOS) {
      openUrl(url)
    } else {
      Linking.canOpenURL(url).then( supported => {
        if (supported) {
          Linking.openURL(url)
        } else {
          console.log('openUserInstagram open failed', url)
        }
      })
    }
  }

  renderInstagramLink = () => {
    return (
      <View style={styles.gridItem}>
        <TouchableOpacity style={styles.instagramLink} onPress={this.openUserInstagram}>
          <Image resizeMode='cover' style={styles.instagramLinkIcon} source={Images.instagramUserMore} />
          <Text style={styles.instagramLinkText} textAlign='center'>VIEW MORE ON INSTAGRAM</Text>
        </TouchableOpacity>
      </View>
    )
  }

  openImageViewer = index => {
    this.setState({ showImagesIndex: index })
  }
  closeImageViewer = () => {
    this.setState({ showImagesIndex: false })
  }

  renderInstagramGridItem = (item, index, indexGrid) => {
    const { isPrivateInstagram } = this.props
    return (
      isPrivateInstagram
      ? <View key={index} style={styles.gridItem}>
        <TouchableOpacity style={styles.instagramLinkPrivate} onPress={this.openUserInstagram}>
          <Image resizeMode='cover' style={styles.instagramLinkIcon} source={Images.instagramUserMore} />
          <Text style={styles.instagramLinkText} textAlign='center'>VIEW MORE ON INSTAGRAM</Text>
        </TouchableOpacity>
      </View>
    : <View key={index} style={[styles.gridItem, index === 2 ? { marginRight: 0 } : { marginRight: '1.3333333%' }]}>
      <TouchableOpacity
        style={{width: '100%'}}
        onPress={() => this.openImageViewer(index + (indexGrid * 5))}>
        <Image
          style={styles.gridItemImage}
          source={{ uri: item.thumb }}
          resizeMode='cover'
        />
      </TouchableOpacity>
    </View>
    )
  }

  renderInstagramGrid = grid => {
    const { photos } = this.props
    const gridCount = arrayChunk(photos, 6).length - 1
    if (grid.index === gridCount && grid.item.length === 6) grid.item.splice(-1, 1)

    return (
      <View style={styles.instagramGrid}>
        {grid.item.map((item, index) => this.renderInstagramGridItem(item, index, grid.index))}
        { (grid.index === gridCount && grid.item.length === 6) || (grid.index === gridCount && grid.item.length < 6) ? this.renderInstagramLink() : null }
      </View>
    )
  }

  renderInstagramList = () => {
    const { photos } = this.props
    return (
      <View style={styles.sectionList}>
        <OptimizedFlatList
          data={arrayChunk(photos, 6)}
          onMomentumScrollEnd={this.onScrollEnd}
          renderItem={this.renderInstagramGrid}
          horizontal
          pagingEnabled
          removeClippedSubviews
          disableVirtualization
          extraData={photos}
        />
      </View>
    )
  }

  renderInstagramListPagination = () => {
    const { photos } = this.props
    return (
      <View style={[styles.pagination, { marginTop: 10 }]}>
        {arrayChunk(photos, 6).map((item, index) => {
          return <View
            key={index}
            style={[
              styles.paginationDot,
              this.state.pagination === index ? styles.paginationDotActive : null
            ]} />
        })}
      </View>
    )
  }

  renderInstagramStatus = () => {
    // const { subscribersCount } = this.props
    return (
      <View style={styles.instagramStatus}>
        {/*<Text style={styles.instagramPhotosCount}>{subscribersCount} followers</Text>*/}
        {this.renderInstagramListPagination()}
      </View>
    )
  }

  renderInstagramConnect = () => {
    return (
      <View style={styles.instagramConnect}>
        <Text style={styles.instagramConnectText}>Share your instagram photos too.</Text>
        <TouchableOpacity style={styles.instagramConnectButton} onPress={this.onButtonConnectPress}>
          <Image style={styles.instagramConnectButtonImage} source={Images.instagramConnect} />
        </TouchableOpacity>

        <InstagramLogin
          redirectUrl={INSTAGRAM_REDIRECT_URI}
          ref='instagramLogin'
          clientId={INSTAGRAM_CLIENT_ID}
          scopes={['public_content', 'follower_list']}
          onLoginSuccess={this.onLogin}
          onLoginFailure={this.onFailure} />
      </View>
    )
  }

  renderImageViewer = () => {
    const { showImagesIndex } = this.state
    const { photos } = this.props
    const images = photos && photos.length > 0 ? photos.map(e => e.full) : []
    return (
      <ImageViewer onClose={this.closeImageViewer} initialIndex={showImagesIndex} images={images} />
    )
  }

  onButtonConnectPress = () => {
    InteractionManager.runAfterInteractions(() => this.refs.instagramLogin.show())
  }

  onLogin = (token) => {
    this.props.syncInstagram(token)
  }

  onFailure = (data) => {
    // console.log('instagramLoginFailure', data)
  }

  render () {
    const { showImagesIndex } = this.state
    const { instagramUser, photos } = this.props

    if (photos.length > 0) {
      return (
        <View style={styles.component}>
          <Text style={styles.sectionTitleText}>Instagram</Text>
          { this.renderInstagramStatus() }
          { this.renderInstagramList() }
          { !instagramUser ? this.renderInstagramConnect() : null }
          {(showImagesIndex || showImagesIndex === 0) ? this.renderImageViewer() : null}
        </View>
      )
    } else {
      return null
    }
  }
}

export default UserInstagram
