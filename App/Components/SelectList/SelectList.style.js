import { Dimensions } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

import Color from 'color'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  listItem: {
    paddingVertical: '0.7rem',
    borderBottomWidth: 1,
    borderBottomColor: Color(Colors.pinkishGray).lighten(0.1),
    paddingHorizontal: '1rem',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingRight: '4rem'
  },
  itemText: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    fontSize: '1rem',
    color: Colors.text
  },
  selectList: {
    alignSelf: 'stretch'
  },
  check: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    paddingHorizontal: '1rem',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listHeader: {
    paddingHorizontal: '1rem',
    paddingBottom: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderBottomColor: Colors.pinkishGray,
    borderBottomWidth: 1
  },
  listItemText: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    fontSize: '1rem',
    color: Colors.text
  },
  listHeaderText: {
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    fontSize: '1.2rem',
    color: Colors.purplePink
  }
})
