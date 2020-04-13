import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet'
import DeviceInfo from 'react-native-device-info'

import { openUrl } from 'Utils'
import { Colors, Fonts } from 'Themes'

export default class SettingsFooter extends Component {
  logout = () => {
    const { logout } = this.props
    Alert.alert(
      'Logout',
      'Are you sure?',
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {text: 'OK', onPress: () => logout()}
      ],
      { cancelable: true }
    )
  }

  openUrl = (url) => {
    openUrl(url)
  }

  render () {
    const { deleteAccount } = this.props
    const version = DeviceInfo.getVersion()
    return (
      <View style={s.footer}>
        <TouchableOpacity onPress={() => this.openUrl('http://bepicke.com/frequently-asked-questions/')} style={s.link}>
          <Text style={s.linkText}>Need Help?</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => {}} style={s.link}>
          <Text style={s.linkText}>Share Picke</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => this.openUrl('http://bepicke.com/privacy-policy/')} style={s.link}>
          <Text style={s.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.openUrl('http://bepicke.com/terms-of-service/')}
          style={s.link}>
          <Text style={s.linkText}>Terms of Service</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => {}} style={s.link}>
          <Text style={s.linkText}>Check for Updates</Text>
          <Text style={s.versionText}>Your version is {version}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={deleteAccount} style={[s.link, s.noBorder]}>
          <Text style={s.linkText}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.logout} style={s.logout}>
          <Text style={s.linkText}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const s = EStyleSheet.create({
  footer: {
    paddingTop: '1rem',
    paddingBottom: '3.5rem',
    paddingHorizontal: '1rem',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#3b3d3e',
    left: 0,
    right: 0,
    marginTop: '1rem'
  },
  noBorder: {
    borderBottomWidth: 0
  },
  link: {
    borderBottomColor: 'rgba(255,255,255,0.1)',
    borderBottomWidth: 1,
    paddingVertical: '0.65rem',
    paddingHorizontal: '1rem',
    width: '100%'
  },
  linkText: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.75)',
    fontSize: '1rem'
  },
  versionText: {
    fontFamily: Fonts.type.base,
    fontWeight: '300',
    color: Colors.white,
    fontSize: '0.7rem'
  },
  logout: {
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: '0.3rem',
    height: '3rem',
    width: '100%',
    marginTop: '0.5rem',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
