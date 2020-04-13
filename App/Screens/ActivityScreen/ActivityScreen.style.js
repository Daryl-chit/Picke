import { Metrics, ApplicationStyles, Fonts, Colors, calcHeight, rem, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'
import { isX } from 'Tools'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  screen: {
    backgroundColor: Colors.backgroundColor,
    flex: 1
  },
  container: {
    paddingHorizontal: '0.5rem',
    paddingTop: isX ? '1rem' : 0,
    flex: 1
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '1rem'
  },
  bannerLayout: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  bannerButtonLayout: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    width: '100%',
    height: 80,
    flexDirection: 'row'
  },
  bannerLeft: {
    width: width * 0.9,
  },
  bannerRight: {
    width: width * 0.1
  },
  tabs: {
    backgroundColor: Colors.backgroundColor,
    borderBottomWidth: 1,
    borderBottomColor: Colors.purplePink,
    zIndex: 3
  },
  tabText: {
    fontFamily: Fonts.type.base,
    color: '#979797',
    fontSize: '1rem',
    textAlign: 'center',
    fontWeight: '500'
  },
  tabTextActive: {
    color: '#111'
  },
  itemCell: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.7rem'
  },
  tabContainer: {
    alignItems: 'center',
    backgroundColor: Colors.backgroundColor
  },
  tabContent: {
    paddingTop: '1rem'
  },
  scrollView: {
    height: '100%'
  },
  spinner: {
    marginTop: '0rem'
  },
  spinnerContainer: {
    flex: 1,
    borderWidth: 2
  },
  content: {
    flex: 1
  },
  usersItem: {
    width: width * 0.3195,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rem * 0.5
  },
  modal: {
    padding: '1.8rem',
    paddingBottom: '5rem',
    backgroundColor: Colors.white,
    borderRadius: '1rem'
  },
  modalButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.pinkishGray
  },
  modalHeaderText: {
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    color: Colors.black,
    fontSize: '1.3rem',
    marginBottom: '0.7rem'
  },
  modalText: {
    textAlign: 'center',
    fontFamily: Fonts.type.neue,
    color: Colors.text,
    fontSize: '0.9rem',
    lineHeight: '1.45rem'
  },
  modalButtonText: {
    color: Colors.purplePink,
    fontFamily: Fonts.type.base,
    fontSize: '1rem'
  }
})
