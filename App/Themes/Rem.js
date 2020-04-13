import { Dimensions, Platform } from 'react-native'

const width = Dimensions.get('window').width

let rem = 14

if (width > 768) {
  rem = 28
} else if (width > 414) {
  rem = 26
} else if (width > 375) {
  if (Platform.OS !== 'ios') {
    rem = 16
  } else {
    rem = 17.3
  }
} else if (width > 320) {
  if (Platform.OS !== 'ios') {
    rem = 14
  } else {
    rem = 16
  }
}
export default rem
