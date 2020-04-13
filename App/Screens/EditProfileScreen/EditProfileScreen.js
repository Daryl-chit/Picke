import React, { Component } from 'react'
import {
  View,
  TextInput,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Picker
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

import { Actions } from 'react-native-router-flux'
import { Header, SortPhotos, LoaderOverlay, ImageViewer } from 'Components'
import { Images } from 'Themes'
import { HEIGHT_RANGE, IMAGE_PICKER_CONFIG } from 'Config/Constants'
import compressImage from 'Tools/CompressImage'
import Locales from 'Locales'
import { getFeetsDisplayByFloat } from 'Tools'

import Field from './Components/Field'
import Section from './Components/Section'
import Instagram from './Components/Instagram'

import styles from './EditProfileScreen.style'
import RoundButton from '../../Components/RoundButton/RoundButton'

function capitalize (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const split = arr => {
  return arr && arr.length > 0 ? arr.join(', ') : ''
}

const genders = [
  'Male',
  'Female'
  // 'Transgendered'
]

export default class EditProfileScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      about: props.user.about,
      scroll: true,
      photosOrder: '',
      initialIndex: 0,
      showImages: false
    }
  }

  componentWillUnmount () {
    if (this.state.photosOrder) {
      this.props.setUser({
        option: 'photosJson',
        value: JSON.stringify(this.state.photosOrder)
      })
    }
    this.setState({
      photosOrder: ''
    })
  }

  goBack = () => {
    this.setAbout()
    setTimeout(() => {
      Actions.pop()
    }, 400)
  }

  setUserArray = (values, field, dictName) => {
    const { setUser } = this.props
    const types = {
      bodyTypes: 'type',
      occupations: 'occupation',
      religions: 'religion',
      ethnicities: 'ethnicity'
    }
    const dict = this.props.dict[dictName]
    const findIds = name => dict.find(f => f[types[dictName]] === name).id
    const output = values.map(findIds)
    const params = { option: field, value: output }
    setUser(params)
  }

  setUserBodyType = (value, field, dictName) => {
    const { setUser } = this.props
    const dict = this.props.dict[dictName]
    const bodyTypeId = dict.find(f => f.type === value.item).id
    setUser({ option: field, value: [bodyTypeId] })
  }

  setUserEthnicities = (values, field, dictName) => {
    const { setUser } = this.props
    const types = {
      bodyTypes: 'type',
      occupations: 'occupation',
      religions: 'religion',
      ethnicities: 'ethnicity'
    }
    const dict = this.props.dict[dictName]
    const findIds = name => dict.find(f => f[types[dictName]] === name).id
    const output = values.map(findIds)
    const params = { option: field, value: output }
    setUser(params)
  }

  setReligion = (value, field, dictName) => {
    const { setUser } = this.props
    const dict = this.props.dict[dictName]
    const religionId = dict.find(f => f.religion === value.item).id
    setUser({ option: field, value: religionId })
  }

  setGender = (value, field) => {
    const { setUser } = this.props
    const params = {
      option: 'gender',
      value: value.item.toString().toLowerCase()
    }
    setUser(params)
  }

  setHeight = (value, field) => {
    const { setUser } = this.props
    const params = {
      option: 'height',
      value: value.item.split("'").join('.').split('"').join('')
    }
    setUser(params)
  }

  setAbout = () => {
    const { about } = this.state
    const { setUser } = this.props
    setUser({ option: 'about', value: about })
  }

  onDragStart = () => {
    this.refs.scroll.scrollTo({ x: 0, y: 0, animated: false })
    setTimeout(() => this.setState({ scroll: false }), 100)
  }

  onDragEnd = itemOrder => {
    const { user: { photos } } = this.props
    const photosOrder = itemOrder.map((item, index) => {
      const result = { id: photos[item.key].id, num: 5 - index }
      return result
    })
    this.setState({ scroll: true, photosOrder })
  }

  instagramLogin = token => {
    const { syncInstagram } = this.props
    syncInstagram(token)
  }

  cleanInstagram = () => {
    const { cleanInstagram } = this.props
    setTimeout(() => cleanInstagram(), 400)
  }

  instagramLoginFailure = data => {
    // console.log('instagramLoginFailure', { data })
  }

  addPhoto = () => {
    // console.log('ADD')
    this.onImagePick('openPicker')
  }

  onImagePick = method => {
    const { addPhoto } = this.props
    ImagePicker[method](IMAGE_PICKER_CONFIG).then(photo => {
      compressImage(photo.path, photo => {
        addPhoto(photo)
      })
    })
  }

  zoomImage = (index) => {
    this.setState({ showImages: true, initialIndex: index })
  }

  closeImage = () => {
    this.setState({ showImages: false })
  }

  renderImageViewer = () => {
    const { initialIndex } = this.state
    const { user } = this.props
    const { photos } = user
    const sortPhotos = this.sortPhotos(photos)

    if (sortPhotos && sortPhotos.length > 0) {
      const images = sortPhotos.map(photo => {
        return photo.path
      })
      return <ImageViewer onClose={this.closeImage} images={images} initialIndex={initialIndex}/>
    } else {
      return null
    }
  }

  sortPhotos = (photos) => {
    const filterPhotos = photos.filter(item => item.source != 'instagram')
    let newPhotos = Object.assign([], filterPhotos)
    newPhotos.sort((a, b) => {
      return a.num < b.num
    })
    return newPhotos.slice(0, 5)
  }

  renderInstagram = () => {
    return (
      <Instagram
        onClean={this.cleanInstagram}
        user={this.props.user}
        onLogin={this.instagramLogin}
        onFailure={this.instagramLoginFailure}
      />
    )
  }

  renderAddPhotoButton = () => {
    return (
      <TouchableOpacity onPress={this.addPhoto} style={styles.addPhotoButton}>
        <Image
          resizeMode='contain'
          style={styles.addPhotoIcon}
          source={Images.cameraAdd}
        />
      </TouchableOpacity>
    )
  }

  renderLoader = () => {
    const { user } = this.props
    const { photoUpload, deletePhoto } = user
    const { loading } = photoUpload
    const { deleting } = deletePhoto
    return loading || deleting ? <LoaderOverlay /> : null
  }

  render () {
    const { user, dict } = this.props
    const { scroll, showImages, about } = this.state
    const {
      photos,
      gender,
      height,
      bodyTypes,
      occupations,
      religion,
      ethnicities
    } = user
    const sortPhotos = photos.filter(item => item.source !== 'instagram')
    return user && user.name
      ? <View style={styles.screen}>
        {this.renderLoader()}
        <Header title={'Edit Profile'} onBack={this.goBack} noBorder />
        <ScrollView ref='scroll' scrollEnabled={scroll}>
          <View style={styles.container}>
            <View style={styles.photos}>
              {sortPhotos && sortPhotos.length > 0
                  ? <SortPhotos
                    onAdd={this.addPhoto}
                    onStart={this.onDragStart}
                    onRelease={this.onDragEnd}
                    onPress={this.zoomImage}
                    />
                  : null}
            </View>
            <View style={styles.sortPhotosExtra}>
              <Text style={styles.sortPhotosText}>
                {Locales.t('screens.editProfile.sortPhotos')}
              </Text>
              <View>
                <RoundButton
                  onPress={sortPhotos.length <= 5 ? () => this.addPhoto() : null}
                  text={'ADD PHOTO'}
                  style={[
                    styles.addPhotoButton,
                    sortPhotos &&
                    sortPhotos.length >= 5 &&
                        styles.addPhotoButtonDisabled
                  ]}
                  textStyle={styles.addPhotoButtonText}
                  photos={sortPhotos}
                  />
              </View>
            </View>
            <Section title='About Me'>
              <TextInput
                style={styles.textArea}
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                defaultValue={about}
                onBlur={this.setAbout}
                onChangeText={text => this.setState({ about: text })}
                underlineColorAndroid='transparent'
                />
            </Section>
            <Section title='Details'>
              <Field
                label='Gender'
                list={genders}
                field='gender'
                onSelect={this.setGender}
                text={capitalize(gender)}
                />
              <Field
                onPress={() => {}}
                label='Height'
                onSelect={this.setHeight}
                list={HEIGHT_RANGE}
                text={height ? getFeetsDisplayByFloat(height) : null}
                />
              <Field
                onPress={() => {}}
                label='Body Type'
                field='bodyTypeIds'
                dict='bodyTypes'
                onSelect={this.setUserBodyType}
                list={dict.bodyTypes.filter(f => f.gender === gender).map(e => e.type)}
                text={split(bodyTypes)}
                />
              <Field
                onPress={() => {}}
                label='Occupation'
                field='occupations'
                dict='occupations'
                onSelect={this.setUserArray}
                list={dict.occupations.map(e => e.occupation)}
                multiselect
                text={split(occupations)}
                />
              <Field
                onSelect={this.setReligion}
                label='Religion'
                field='religionId'
                dict='religions'
                list={dict.religions.map(e => e.religion)}
                text={religion}
                />
              <Field
                onPress={() => {}}
                label='Ethnicities'
                field='ethnicityIds'
                dict='ethnicities'
                onSelect={this.setUserEthnicities}
                list={dict.ethnicities.map(e => e.ethnicity)}
                multiselect
                text={split(ethnicities)}
                />
            </Section>
            <Section title={'Show my Instagram Photos'}>
              {this.renderInstagram()}
            </Section>
          </View>
        </ScrollView>
        {showImages ? this.renderImageViewer() : null}
      </View>
      : <View />
  }
}
