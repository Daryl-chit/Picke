import { Metrics, ApplicationStyles, Fonts, Colors, calcWidth, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

import { isX } from 'Tools'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingTop: isX ? '1rem' : 0
  },
  container: {
    paddingBottom: '1.5rem'
  },
  section: {
    marginTop: '1rem',
    paddingHorizontal: '1rem'
  },
  photos: {
    height: '13rem',
    paddingHorizontal: '0.4rem'
  },
  sectionTitle: {
    fontFamily: Fonts.type.base,
    fontSize: '1.1rem',
    color: Colors.purplePink,
    fontWeight: '500'
  },
  sectionContent: {
    marginTop: '0.6rem',
    padding: '1rem',
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.35)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1,
    shadowOpacity: 1,
    borderRadius: '0.3rem'
  },
  field: {
    marginBottom: '1rem'
  },
  labelText: {
    fontFamily: Fonts.type.neue,
    fontSize: '0.74rem',
    marginBottom: '0.4rem',
    color: '#777'
  },
  fieldButton: {
    paddingVertical: '0.4rem',
    paddingHorizontal: '0.7rem',
    borderWidth: 2,
    borderColor: '#e6e6e6'
  },
  fieldInputText: {
    fontFamily: Fonts.type.neue
  },
  instagramRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  instagramIcon: {
    width: '1.3rem',
    height: '1.3rem',
    marginRight: '0.3rem'
  },
  instagramText: {
    fontFamily: Fonts.type.neue,
    fontSize: '1rem'
  },
  instagram: {
    alignItems: 'center'
  },
  sortPhotosText: {
    marginTop: '0.4rem',
    fontFamily: Fonts.type.neue,
    fontSize: '0.8rem',
    textAlign: 'center',
    flexWrap: 'wrap',
    flex: 1,
    color: 'rgb(109,109,114)'
  },
  sortPhotosExtra: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    padding: 8
  },
  addPhotoButton: {
    borderWidth: 0,
    backgroundColor: 'rgb(202, 37, 153)'
  },
  addPhotoButtonDisabled: {
    backgroundColor: 'rgb(194, 194, 194)'
  },
  addPhotoButtonText: {
    color: 'white'
  },
})
