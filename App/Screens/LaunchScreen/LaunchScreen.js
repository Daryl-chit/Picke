import React, { Component } from 'react'
import { Platform, View, Image, Text, TouchableOpacity, Linking } from 'react-native'
import Modal from 'react-native-modal'
import { LoginManager, GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk'

import RNAccountKit, {
  Color,
  StatusBarStyle
} from 'react-native-facebook-account-kit'

import 'Config/AccountKit'

import { Images, IS_IOS } from 'Themes'
import { RoundButton, FacebookButton, LoaderOverlay } from 'Components'

import Locales from 'Locales'
import styles from './LaunchScreen.styles'

export default class LaunchScreen extends Component {
  state = {
    isInfoVisible: false,
    isUpdateVisible: this.props.update_required || false
  }
  phoneAuth = () => {
    RNAccountKit.loginWithPhone()
    .then((response) => {
      if (!response) {
        console.log('Login cancelled')
      } else {
        const { code } = response
        this.props.smsLoginRequest(code)
      }
    })
  }
  emailAuth = () => {
    RNAccountKit.loginWithEmail()
    .then((response) => {
      const { token } = response
      if (!token) {
        // console.log('Login cancelled')
      } else {
        this.props.loginRequest(token)
        // console.log(`Logged with phone. Token: ${token}`)
      }
    })
  }
  facebookAuth = async () => {
    let result;
    if (IS_IOS) {
      try {
        LoginManager.setLoginBehavior('native')
        result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      } catch (error) {
        LoginManager.setLoginBehavior('web')
        result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      }
    } else {
      try {
        LoginManager.setLoginBehavior('native_only')
        result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      } catch (error) {
        LoginManager.setLoginBehavior('web_only')
        result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      }
    }

    if (result.isCancelled) {
      console.log('LaunchScreen cancelled')
    } else {
      const data = await AccessToken.getCurrentAccessToken()
      try {
        const { accessToken } = data
        if (accessToken) {
          this.props.loginRequest(accessToken, 'fb')
        }
      } catch (error) {
        console.log('LaunchScreen', error)
      }
      const infoRequest = new GraphRequest('/me', {
        parameters: {
          'fields': {
            'string': 'email,first_name,last_name,picture'
          }
        }
      }, (err, res) => {
        console.log('GraphRequest', err, res)
      })
      new GraphRequestManager().addRequest(infoRequest).start()
    }
  }
  termsLink = () => {
    const url = 'http://bepicke.com/terms-of-service/';
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }
    }).catch(err => {
      console.error('An error occurred', err);
    });
  }
  openStore = () => {
    if (Platform.OS == 'ios') {
      const url = 'https://itunes.apple.com/us/app/picke/id994287335?mt=8'
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          return Linking.openURL(url);
        }
      }).catch(err => {
        console.error('An error occurred', err);
      });
    }
    this.setState({ isUpdateVisible: false })
  }
  closeInfo = () => this.setState({ isInfoVisible: !this.state.isInfoVisible })
  render () {
    const { isInfoVisible, isUpdateVisible } = this.state
    const { loading } = this.props

    return (
      <View style={styles.mainContainer}>
        {loading ? <LoaderOverlay /> : null}
        <Image
          source={Images.logo}
          style={styles.logo} />
        <View style={styles.agree}>
          <TouchableOpacity
            style={styles.agreeLink}
            onPress={this.termsLink}>
            <Image
              source={Images.loginTerms}
              style={styles.loginTerms} />
          </TouchableOpacity>
        </View>
        {/* <BackgroundVideo source={require('../../Videos/login.mp4')} /> */}
        <TouchableOpacity
          onPress={() => this.setState({ isInfoVisible: true })}
          style={styles.questionContainer}>
          <Image
            source={Images.question}
            style={styles.question} />
        </TouchableOpacity>
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            onPress={this.facebookAuth}
            style={styles.buttonStyle}>
            <Image
              source={Images.loginFacebook}
              style={styles.loginButton} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.phoneAuth}
            style={styles.buttonStyle}>
            <Image
              source={Images.loginPhoneNumber}
              style={styles.loginButton} />
          </TouchableOpacity>
        </View>
        <View style={styles.loginDescriptionContainer}>
          <Image
            source={Images.loginDescription}
            style={styles.loginDescription} />
        </View>
        <Modal
          useNativeDriver
          animationIn={'slideInRight'}
          animationOut={'slideOutRight'}
          onBackdropPress={this.closeInfo}
          animationInTiming={500}
          animationOutTiming={400}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={400}
          isVisible={isInfoVisible}>
          <View style={styles.modal}>
            <Text style={styles.modalHeaderText}>
              {Locales.t('whyFacebookHeader').toUpperCase()}
            </Text>
            <Text style={styles.modalText}>
              {Locales.t('whyFacebookText')}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={this.closeInfo}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          useNativeDriver
          animationIn={'slideInRight'}
          animationOut={'slideOutRight'}
          animationInTiming={500}
          animationOutTiming={400}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={400}
          isVisible={isUpdateVisible && IS_IOS}>
          <View style={styles.modal}>
            <Text style={styles.modalHeaderText}>
              {Locales.t('updateTitle').toUpperCase()}
            </Text>
            <Text style={styles.modalText}>
              {Locales.t('updateDescription')}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={this.openStore}>
              <Text style={styles.modalButtonText}>{Locales.t('updateButton').toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    )
  }
}
