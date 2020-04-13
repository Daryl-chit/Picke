import { Metrics, ApplicationStyles, Fonts, Colors, calcHeight, width, height, IS_IOS } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

import { isX } from 'Tools'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  venueDetails: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: '0.3rem',
    borderColor: '#999',
    overflow: 'hidden',
    height: IS_IOS ? isX ? calcHeight(0.85) : calcHeight(0.875) : calcHeight(0.865)
  },
  imageSlider: {
    width: '100%',
    height: '14rem'
  },
  venueParams: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  venueInfo: {
    flex: 1
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.3rem',
    paddingHorizontal: '2rem',
    marginTop: '2rem'
  },
  nameText: {
    fontFamily: Fonts.type.base,
    fontWeight: '600',
    color: '#000',
    fontSize: '1.4srem',
    textAlign: 'center'
  },
  types: {
    flexDirection: 'row'
  },
  typeImage: {
    width: '1.1rem',
    height: '1.1rem',
    marginLeft: '0.2rem'
  },
  milesAwayText: {
    marginRight: '0.2rem',
    textAlign: 'right',
    fontFamily: Fonts.type.neue,
    fontSize: '0.8rem',
    color: '#6d6d72'
  },
  desc: {
    paddingHorizontal: '1.5rem',
    overflow: 'hidden',
    maxHeight: '7rem'
  },
  scrollView: {
    marginBottom: '0.7rem',
    marginTop: '0.7rem'
  },
  scrollViewExpanded: {
    marginBottom: '0.7rem',
    marginTop: '0.4rem'
  },
  mapContainer: {
    height: isX ? '8rem' : '3.3rem'
    // position: 'absolute',
    // bottom: '0rem',
    // left: 0,
    // right: 0
  },
  showMap: {
    height: height * 0.9
  },
  toggleTextButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 2
  },
  map: {
    width: '100%',
    height: '100%'
  },
  descText: {
    color: '#000',
    textAlign: 'center',
    fontFamily: Fonts.type.neue,
    fontSize: '0.8rem',
    lineHeight: '1.2rem'
  },
  contacts: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '1rem'
  },
  phone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  phoneIcon: {
    height: '1rem',
    width: '1rem',
    marginRight: '0.3rem'
  },
  phoneText: {
    fontFamily: Fonts.type.base,
    fontWeight: '500',
    color: Colors.purplePink,
    fontSize: '1.2rem'
  },
  website: {
    fontSize: '0.8rem',
    color: '#6d6d72',
    marginTop: '0.3rem'
  },
  closeButton: {
    position: 'absolute',
    right: '0.7rem',
    top: '1.2rem',
    zIndex: 15
  },
  closeButtonLeft: {
    position: 'absolute',
    right: 'auto',
    left: '0.7rem',
    top: '1.2rem',
    zIndex: 15
  },
  closeIcon: {
    height: '3rem',
    width: '3rem'
  },
  favButton: {
    position: 'absolute',
    top: '0.75rem',
    right: '0.7rem',
    zIndex: 2
  },
  favIcon: {
    height: '3rem',
    width: '3rem'
  },
  dateContainer: {
    height: '1.7rem',
    position: 'absolute',
    borderRadius: 13,
    backgroundColor: 'rgba(0, 0, 0 , 0.58)',
    justifyContent: 'center',
    zIndex: 2,
    top: '1.6rem',
    alignSelf: 'center'
  },
  date: {
    color: '#ffffff',
    paddingHorizontal: 'rem',
    fontFamily: Fonts.type.base,
    fontSize: '0.85rem',
    letterSpacing: 0,
    textAlign: "center",
  }
})
