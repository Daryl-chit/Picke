import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  InteractionManager
} from 'react-native'

import { Column as Col, Row } from 'react-native-flexbox-grid'
import { InstagramLogin, MaterialSwitch as Switch } from 'Components'
import { Colors, Images } from 'Themes'

import { INSTAGRAM_CLIENT_ID, INSTAGRAM_REDIRECT_URI } from 'Config/Constants'

import styles from '../EditProfileScreen.style'

const Instagram = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.user.instagram_user ? true : false
    }
  }

  onLogin = (token) => {
    const { onLogin } = this.props
    if (onLogin) onLogin(token)
  }

  onFailure = (data) => {
    const { onFailure } = this.props
    if (onFailure) onFailure(data)
  }

  onChange = (value) => {
    const { onClean } = this.props
    if (value) {
      InteractionManager.runAfterInteractions(() => this.refs.instagramLogin.show())
    } else {
      if (onClean) onClean()
    }
    this.setState({ value })
  }

  renderForm = () => {
    const { value } = this.state
    const { user } = this.props
    const name = user.instagram_user
    return (
      <View style={styles.instagram}>
        <Row>
          <Col sm={9.7} style={styles.label}>
            <View style={styles.instagramRow}>
              <Image
                style={styles.instagramIcon}
                source={Images.instagram}
                resizeMode='contain' />
              <Text style={styles.instagramText}>
                {name && value
                  ? `/ ${user.instagram_user}`
                  : `/ Login to instagram`}
              </Text>
            </View>
          </Col>
          <Col sm={2.3}>
            <Switch
              value={value}
              onValueChange={this.onChange} />
          </Col>
        </Row>
      </View>
    )
  }

  render () {
    return (
      <View>
        {this.renderForm()}
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
}

export default Instagram
