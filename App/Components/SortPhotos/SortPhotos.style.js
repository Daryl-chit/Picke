import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

import { isX } from 'Tools'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  component: {
    flex: 1
  },
  deletePhoto: {
    position: 'absolute',
    width: '1rem',
    height: '1rem',
    right: '-0.5rem',
    top: '-0.4rem',
    backgroundColor: Colors.purplePink,
    borderRadius: '2rem',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 6
  },
  x: {
    fontSize: '0.7rem',
    color: '#fff'
  },
  block: {
    margin: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    height: '5.5rem',
    width: '5rem',
    borderRadius: '0.7rem'
  },
  firstBlock: {
    height: '12.1rem',
    width: '10rem'
  },
  firstPhoto: {
    height: '12.1rem',
    width: '10rem',
    borderRadius: '1rem'
  },
  addPhotoButton: {
    height: '5.5rem',
    width: '4.8rem',
    borderRadius: '0.7rem',
    position: 'absolute',
    right: isX ? '4.4%' : '0.6rem',
    bottom: '0.53rem',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1,
    shadowOpacity: 0.3
  },
  addPhotoIcon: {
    width: '2.5rem'
  }
})
