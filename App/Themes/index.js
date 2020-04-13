import { Dimensions, Platform } from 'react-native'

import Colors from './Colors'
import Fonts from './Fonts'
import Metrics from './Metrics'
import Images from './Images'
import Icons from './Icons'
import ApplicationStyles from './ApplicationStyles'
import rem from './Rem'
import calcRem from './CalcRem'

const IS_IOS = Platform.OS === 'ios'
const IS_Android = Platform.OS === 'android'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const calcHeight = (ratio) => height * ratio
const calcWidth = (ratio) => width * ratio

export { Colors, Fonts, Images, Icons, Metrics, ApplicationStyles, rem, calcRem, calcHeight, calcWidth, width, height, IS_IOS, IS_Android }
