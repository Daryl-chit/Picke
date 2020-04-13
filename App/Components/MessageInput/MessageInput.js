import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'

import { Actions, ActionConst } from 'react-native-router-flux'
import { Column as Col, Row } from 'react-native-flexbox-grid'

import { Images } from 'Themes'
import compressImage from 'Tools/CompressImage'
import ImagePick from 'Tools/ImagePicker'
import {
  FastImage as Image
} from 'Components'

import s from './MessageInput.style'

export default class MessageInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: '',
      imgFile: null
    }
  }
  handleChange (text) {
    this.setState({ message: text })
  }
  attachPhoto = () => {
    ImagePick(data => {
      compressImage(data.uri, (path, data) => {
        this.setState({ imgFile: data })
      })
    })
  }
  sendMessage = () => {
    const { message, imgFile } = this.state
    const { fromMatch, sendMessage, matchId, userId } = this.props
    if ((message || imgFile) && matchId) {
      sendMessage({ matchId, message, imgFile })

      Actions.chatScreen({
        type: fromMatch ? ActionConst.REPLACE : ActionConst.PUSH,
        userId,
        matchId
      })

      this.setState({ message: '', imgFile: null })
    }
  }
  render () {
    const { message, imgFile } = this.state
    return (
      <View style={s.container}>
        <View style={s.inputContainer}>
          <Row>
            <Col sm={2}>
              <TouchableOpacity
                style={s.touchable}
                onPress={this.attachPhoto}>
                <Image
                  source={imgFile ? { uri: imgFile.uri } : Images.addPhoto}
                  style={[s.icon, s.leftIcon]} />
              </TouchableOpacity>
            </Col>
            <Col sm={8}>
              <TextInput
                style={s.textArea}
                onChangeText={text => this.handleChange(text)}
                underlineColorAndroid='transparent'
                value={message}
                placeholderTextColor={'#8e8e8e'}
                placeholder={'Type your message...'} />
            </Col>
            <Col sm={2}>
              <TouchableOpacity
                style={s.touchable}
                onPress={this.sendMessage}>
                <Image
                  source={Images.plane}
                  style={[s.icon, s.rightIcon]} />
              </TouchableOpacity>
            </Col>
          </Row>
        </View>
      </View>
    )
  }
}
