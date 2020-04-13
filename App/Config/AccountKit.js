import RNAccountKit, {
  Color,
  StatusBarStyle
} from 'react-native-facebook-account-kit'

import { Colors } from 'Themes'

RNAccountKit.configure({
  responseType: 'code',
  // titleType: 'Picke login',
  // initialAuthState: '',
  // initialEmail: 'some.initial@email.com',
  initialPhoneCountryPrefix: '+1',
  // initialPhoneNumber: '123-456-7890',
  facebookNotificationsEnabled: true, // true by default
  readPhoneStateEnabled: true, // true by default,
  receiveSMS: true, // true by default,
  countryWhitelist: [], // [] by default
  // countryBlacklist: ['US'], // [] by default
  defaultCountry: 'US',
  theme: {
    backgroundColor: Color.rgba(0, 120, 0, 0.1),
    backgroundImage: 'background.png',
    // Button
    buttonBackgroundColor: Color.rgba(212, 71, 168, 1),
    buttonBorderColor: Color.rgba(212, 71, 168, 1),
    buttonTextColor: Color.rgba(255, 255, 255, 1),
    // Button disabled
    buttonDisabledBackgroundColor: Color.rgba(212, 71, 168, 0.5),
    buttonDisabledBorderColor: Color.rgba(212, 71, 168, 0.5),
    buttonDisabledTextColor: Color.rgba(255, 255, 255, 0.5),
    // Header
    headerBackgroundColor: Color.rgba(212, 71, 168, 1),
    headerButtonTextColor: Color.rgba(255, 255, 255, 1),
    headerTextColor: Color.rgba(255, 255, 255, 1),
    // Input
    inputBackgroundColor: Color.rgba(255, 255, 255, 1),
    inputBorderColor: Color.hex('#ccc'),
    inputTextColor: Color.hex('#fff'),
    // Others
    iconColor: Color.rgba(212, 71, 168, 1),
    textColor: Color.rgba(212, 71, 168, 1),
    titleColor: Color.rgba(212, 71, 168, 1),
    // Header
    statusBarStyle: StatusBarStyle.LightContent
  } // for iOS only, see the Theme section
})
