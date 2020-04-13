import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Modal
} from 'react-native'

import { FastImage } from 'Components'
import { Images, width, height } from 'Themes'
import styles from './UserActions.style'

const ActionType = {
  report: {
    title: 'REPORTED',
    icon: Images.report,
    description: 'Thanks for letting us know, we will review this profile. Your feedback helps us improve the quality of Picke!'},
  unmatch: {
    title: 'UNMATCHED',
    icon: Images.unmatch,
    description: 'You have successfully unmatched. All messages history will be deleted and this user will be removed from your list.'},
  block: {
    title: 'BLOCKED',
    icon: Images.block,
    description: 'This user will be deleted from your present and future matches and will not be able to message you anymore.'}
}

class UserActions extends Component {
  constructor (props) {
    super(props)
    this.translateY = height
    this.state = {
      visible: false,
      sheetAnim: new Animated.Value(this.translateY)
    }
    this._cancel = this._cancel.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.translateY = height
  }

  show = (type) => {
    this.setState({ visible: true, type: type })
    this._showSheet()
  }

  _cancel = () => {
    this._hideSheet(() => {
      this.setState({visible: false})
    })
  }

  _confirm = () => {
    const { onConfirm, user } = this.props
    const { type } = this.state
    this._hideSheet(() => {
      this.setState({ visible: false })
      if (onConfirm) {
        onConfirm(type, user.id)
      }
    })
  }

  _showSheet = () => {
    Animated.timing(this.state.sheetAnim, {
      toValue: 0,
      duration: 250
    }).start()
  }

  _hideSheet = (callback) => {
    Animated.timing(this.state.sheetAnim, {
      toValue: this.translateY,
      duration: 150
    }).start(callback || function () {})
  }

  render () {
    const { user } = this.props
    const { type, visible, sheetAnim } = this.state
    if (type && user) {
      const item = ActionType[`${type}`]
      const { photos } = user
      const image = photos && photos.length > 0 ? photos[0].path : null

      return (
        <Modal
          visible={visible}
          transparent
          animationType='none'
          onRequestClose={this._cancel}>
          <View style={styles.wraper}>
            <Animated.View
              style={[styles.overlay, {height: this.translateY, transform: [{translateY: sheetAnim}]}]}>
              <View style={styles.container}>
                <Text style={styles.title}>{item['title']}</Text>
                <View style={styles.photoContainer}>
                  <FastImage style={styles.photo} resizeMode={'cover'} source={{ uri: image }} />
                  <FastImage style={styles.icon} source={item['icon']} />
                </View>
                <Text style={styles.description}>{item['description']}</Text>
                <Text style={styles.confirmText}>PLEASE CONFIRM:</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.leftButton} onPress={this._confirm}>
                  <Text style={styles.buttonText}>
                    Confirm
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rightButton} onPress={this._cancel}>
                  <Text style={styles.buttonText}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </Modal>
      )
    } else {
      return (null)
    }
  }

}

export default UserActions
