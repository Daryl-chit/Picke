import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

import { isX } from 'Tools'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  screen: {
    flex: 1,
    paddingTop: isX ? '1rem' : 0
  },
  content: {
    flex: 1,
    paddingHorizontal: '0.5rem'
  },
  place: {
    width: '100%',
    height: '12rem',
    borderRadius: '0.3rem',
    marginBottom: '0.3rem',
    overflow: 'hidden'
  },
  placeImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '12rem',
    zIndex: 1
  },
  info: {
    position: 'absolute',
    left: 0,
    bottom: '1rem',
    width: '100%',
    zIndex: 3
  },
  removeButton: {
    position: 'absolute',
    right: '0.5rem',
    top: '0.5rem',
    zIndex: 3
  },
  removeIcon: {
    width: '2rem',
    height: '2rem'
  },
  fadeGradient: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    height: '12rem',
    width: '100%',
    zIndex: 2
  },
  titleText: {
    fontFamily: Fonts.type.base,
    fontWeight: '600',
    color: '#fff',
    fontSize: '1.2srem',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  infoFooter: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  milesAwayText: {
    marginRight: '0.2rem',
    fontFamily: Fonts.type.neue,
    fontSize: '0.8rem',
    color: '#fff',
    backgroundColor: 'transparent'
  },
  types: {
    flexDirection: 'row'
  },
  typeImage: {
    width: '1.1rem',
    height: '1.1rem',
    marginLeft: '0.2rem'
  },
  emptyTitle: {
    fontFamily: Fonts.type.base,
    fontSize: '1.4rem',
    textAlign: 'center',
    marginBottom: '0.5rem'
  },
  emptyText: {
    fontFamily: Fonts.type.light,
    fontSize: '1rem',
    textAlign: 'center'
  }
})
