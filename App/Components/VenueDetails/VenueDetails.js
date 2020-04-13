import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  ScrollView
} from 'react-native'

import * as Ani from 'react-native-animatable'

import moment from 'moment'

import MapView from 'react-native-maps'

import { openUrl } from 'Utils'
import { EaseScale, SpringOpacity } from 'Animations/LayoutAnimation'
import { ImageSlider, FastImage as Image, ImageViewer } from 'Components'
import { calcWidth, calcRem, Colors, Images, rem, width, height } from 'Themes'

import { distance, isX } from 'Tools'

import styles from './VenueDetails.style'

const LAT = 40.726003
const LON = -73.995312
const LATITUDE_DELTA = 0.032
const ASPECT_RATIO = width / height
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const images = [
  { id: '1', image: Images.venue.food },
  { id: '2', image: Images.venue.activity },
  { id: '3', image: Images.venue.drinks },
  { id: '4', image: Images.venue.entertainment }
]

export default class VenueDetails extends Component {
  constructor (props) {
    super(props)
    const { venue } = props

    this.state = {
      initialRegion: {
        latitude: venue ? parseFloat(venue.lat) : null,
        longitude: venue ? parseFloat(venue.lon) : null,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      showText: !!isX,
      showMap: false,
      showImages: false,
      initialIndex: 0
    }
  }

  calcDistance () {
    const { venue } = this.props
    const dist = distance(LAT, LON, venue.lat, venue.lon)
    return dist.toFixed(1)
  }

  openText = () => {
    LayoutAnimation.configureNext(SpringOpacity)
    this.setState({ showText: true })
  }

  closeText = () => {
    if (!isX) {
      LayoutAnimation.configureNext(SpringOpacity)
      this.setState({ showText: false })
    }
  }

  openMap = () => {
    // LayoutAnimation.configureNext(LayoutMixed)
    this.setBusy()
    this.setState({ showMap: true, showText: false })
  }

  closeMap = () => {
    LayoutAnimation.configureNext(EaseScale)
    this.setFree()
    this.setState({ showMap: false })
  }

  setBusy = () => {
    const { onBusy } = this.props
    if (onBusy) onBusy()
  }

  setFree = () => {
    const { onFree } = this.props
    if (onFree) onFree()
  }

  zoomImage = index => {
    const { onImagesShow, venue } = this.props
    if (onImagesShow) onImagesShow(venue.photos)
    // this.setBusy()
    this.setState({ showImages: true, initialIndex: index })
  }

  closeImage = () => {
    this.setFree()
    this.setState({ showImages: false })
  }

  openSafari = url => {
    openUrl(url)
  }

  renderTypes () {
    const { venue } = this.props
    const { types } = venue
    return (
      <View style={styles.types}>
        {types.map((typeId, key) => {
          const image = images.find(f => f.id === typeId).image
          return <Image key={key} source={image} style={styles.typeImage} />
        })}
      </View>
    )
  }

  renderFavButton () {
    const {
      venueId,
      isActive,
      removeFavourite,
      addFavourite,
      venue
    } = this.props
    return (
      <TouchableOpacity
        onPress={() =>
          (isActive ? removeFavourite(venueId) : addFavourite(venue))}
        style={styles.favButton}
      >
        {!isActive
          ? <Image style={styles.favIcon} source={Images.star} />
          : <Image style={styles.favIcon} source={Images.starActive} />}
      </TouchableOpacity>
    )
  }

  renderContacts = () => {
    const { venue } = this.props
    return (
      <View style={styles.contacts}>
        <View style={styles.phone}>
          <Image source={Images.phone} style={styles.phoneIcon} />
          <Text style={styles.phoneText}>{venue.phone}</Text>
        </View>
        {venue.website
          ? <TouchableOpacity onPress={() => this.openSafari(venue.website)}>
            <Text style={styles.website}>{venue.website}</Text>
          </TouchableOpacity>
          : null}
      </View>
    )
  }

  renderMapContainer = () => {
    const { showMap } = this.state
    return (
      <View style={[styles.mapContainer, showMap ? styles.showMap : {}]}>
        {this.renderMapImage()}
        {this.renderMapCloseIcon()}
        {this.renderMapView()}
      </View>
    )
  }

  renderMapView () {
    const { venue } = this.props
    const { showMap, initialRegion } = this.state
    if (showMap) {
      return (
        <MapView
          zoomEnabled
          zoomControlEnabled
          rotateEnabled
          scrollEnabled
          toolbarEnabled
          loadingIndicatorColor={Colors.purplePink}
          loadingBackgroundColor={Colors.backgroundColor}
          loadingEnabled
          style={styles.map}
          initialRegion={initialRegion}
        >
          <MapView.Marker
            coordinate={{
              latitude: parseFloat(venue.lat),
              longitude: parseFloat(venue.lon)
            }}
          />
        </MapView>
      )
    }
  }

  renderMapCloseIcon () {
    const { noFav } = this.props
    const { showMap } = this.state
    if (showMap) {
      return (
        <TouchableOpacity
          onPress={this.closeMap}
          style={[styles.closeButton, noFav ? styles.closeButtonLeft : {}]}
        >
          <Image source={Images.close} style={styles.closeIcon} />
        </TouchableOpacity>
      )
    }
  }

  renderMapImage () {
    const { showMap } = this.state
    if (!showMap) {
      return (
        <TouchableOpacity onPress={this.openMap}>
          <Image
            source={Images.newYorkMap}
            style={{ height: '100%', width: '100%' }}
            resizeMode='cover'
          />
        </TouchableOpacity>
      )
    }
  }

  renderImageSlider = () => {
    const { venue } = this.props
    const { showText } = this.state
    return (
      <ImageSlider
        style={[
          styles.imageSlider,
          showText && !isX ? { height: calcRem(11) } : {}
        ]}
        barBottomOffset={-calcRem(0.65)}
        onCenterPress={this.zoomImage}
        slideWidth={calcWidth(0.95)}
        inactiveBarColor={Colors.greyish}
        images={venue.photos}
      />
    )
  }

  renderVenueInfo = () => {
    const { venue } = this.props
    const { showText } = this.state
    return (
      <View style={styles.venueInfo}>
        <View style={styles.header}>
          <Text style={styles.nameText}>
            {venue.title}
          </Text>
        </View>
        <View style={styles.venueParams}>
          <Text style={styles.milesAwayText}>
            {venue.distance} miles away
          </Text>
          {this.renderTypes()}
          {/* <Row>
            <Col sm={6}>
              <Text style={styles.milesAwayText}>
                {venue.distance} miles away
              </Text>
            </Col>
            <Col sm={6}>
              {this.renderTypes()}
            </Col>
          </Row> */}
        </View>
        <ScrollView
          style={[styles.scrollView, showText ? styles.scrollViewExpanded : {}]}
        >
          <View style={[styles.desc, showText ? { maxHeight: null } : {}]}>
            {!showText
              ? <TouchableOpacity
                onPress={this.openText}
                style={styles.toggleTextButton}
                >
                <Ani.View delay={1000} duration={700} animation='fadeIn'>
                  <Image
                    style={styles.whiteGradient}
                    source={Images.whiteGradient}
                    />
                </Ani.View>
              </TouchableOpacity>
              : null}
            <TouchableOpacity onPress={this.closeText}>
              <Text style={styles.descText}>{venue.desc}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }

  renderImageViewer = () => {
    const { venue } = this.props
    const { initialIndex } = this.state
    return <ImageViewer onClose={this.closeImage} images={venue.photos} initialIndex={initialIndex} />
  }

  renderDate = () => {
    const { venue: { date } } = this.props
    return (
      <View style={styles.dateContainer}>
        <Text style={styles.date}>
          {moment(date).format('MMM DD, YYYY').toUpperCase()}
        </Text>
      </View>
    )
  }

  render () {
    const { venue, style, noFav } = this.props
    const { showMap, showImages } = this.state

    if (venue) {
      return (
        <View style={[styles.venueDetails, style || {}]}>
          {showImages ? this.renderImageViewer() : null}
          {!showMap && !noFav ? this.renderFavButton() : null}
          {!showMap ? this.renderDate() : null}
          {/* {!showMap ? this.renderFavButton() : null} */}
          {!showMap ? this.renderImageSlider() : null}
          {!showMap ? this.renderVenueInfo() : null}
          {this.renderMapContainer()}
          {!showMap ? this.renderContacts() : null}
        </View>
      )
    } else {
      return <View />
    }
  }
}
