import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  ScrollView
} from 'react-native'

import { Metrics, Fonts, Colors, Images } from 'Themes'

import { ExpandSpring, EaseScale } from 'Animations/LayoutAnimation'

import {
  Header,
  FastImage as Image,
  VenueModal
} from 'Components'

import styles from './SavedPlacesScreen.style'

const typeIcons = [
  { id: '1', image: Images.venue.food },
  { id: '2', image: Images.venue.activity },
  { id: '3', image: Images.venue.drinks },
  { id: '4', image: Images.venue.entertainment }
]

export default class SavedPlacesScreen extends Component {
  state = {
    open: null
  }
  renderTypes (venue) {
    const { types } = venue
    return (
      <View style={styles.types}>
        {types.map((typeId, key) => {
          const image = typeIcons.find(f => f.id === typeId).image
          return <Image
            key={key}
            source={image}
            style={styles.typeImage} />
        })}
      </View>
    )
  }

  renderRemoveIcon (venueId) {
    return (
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => this.removeFavourite(venueId)}>
        <Image
          style={styles.removeIcon}
          source={Images.closeSmall} />
      </TouchableOpacity>
    )
  }

  removeFavourite (venueId) {
    const { removeFavourite } = this.props
    removeFavourite(venueId)
  }

  renderPlace = (venue, key) => {
    const image = venue && venue.photos && venue.photos[0] ? venue.photos[0] : null
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => this.setState({ open: venue })}
        style={styles.place}
        key={key}>
        {this.renderRemoveIcon(venue.id)}
        {image ? <Image
          source={{ uri: venue.photos[0] }}
          style={styles.placeImage}
          resizeMode='cover' /> : null}
        <View style={styles.info}>
          <Text style={styles.titleText}>
            {venue.title}
          </Text>
          <View style={styles.infoFooter}>
            <Text style={styles.milesAwayText}>
              {venue.distance} miles away
            </Text>
            {this.renderTypes(venue)}
          </View>
        </View>
        <Image
          source={Images.venueGradient}
          style={styles.fadeGradient}
          resizeMode='stretch' />
      </TouchableOpacity>
    )
  }

  renderPlacesContainer = () => {
    const { favourites } = this.props
    const { open } = this.state
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={styles.content}>
            {favourites ? favourites.map(this.renderPlace) : null}
          </View>
        </ScrollView>
        <VenueModal
          onClose={this.closeModal}
          open={open !== null}
          venue={open} />
      </View>
    )
  }

  renderEmptyPlaces = () => {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center'}}>
        <Text style={styles.emptyTitle}>No saved places or activities.</Text>
      </View>
    )
  }

  closeModal = () => this.setState({ open: null })
  render () {
    const { favourites } = this.props
    return (
      <View style={styles.screen}>
        <Header title={'Saved Places'} noBorder />
        { favourites.length > 0 ? this.renderPlacesContainer() : this.renderEmptyPlaces() }
      </View>
    )
  }
}
