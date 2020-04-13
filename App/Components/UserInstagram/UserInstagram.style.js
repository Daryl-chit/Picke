import { Metrics, ApplicationStyles, Fonts, Colors, rem, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  component: {
    flex: 1,
    width: '100%',
    paddingVertical: '1rem',
    paddingHorizontal: '0.7rem',
    borderBottomWidth: 1,
    borderColor: '#f0f0f0'
  },
  sectionTitleText: {
    fontFamily: Fonts.type.base,
    fontSize: '1.45rem',
    marginBottom: '0.3rem',
    color: '#000'
  },
  sectionList: {
    flex: 1
  },
  gridItem: {
    aspectRatio: 1,
    flexWrap: 'wrap',

    // padding: '0.5rem',
    // marginRight: '1.33333333%',
    marginBottom: '1.33333333%',
    width: '32%'
    // height: '50%'
  },
  gridItemImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#cccccc',
    borderRadius: '0.15rem'
  },
  instagramGrid: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
    height: '14rem',
    width: width - (3 * rem)
  },
  instagramStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  instagramPhotosCount: {
    fontSize: '1rem',
    color: Colors.text
  },
  pagination: {
    flexDirection: 'row'
  },
  paginationDot: {
    width: '0.4rem',
    height: '0.4rem',
    borderRadius: '0.2rem',
    backgroundColor: Colors.steel,
    marginLeft: '0.2rem'
  },
  paginationDotActive: {
    backgroundColor: Colors.purplePink
  },
  instagramLink: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray1,
    borderRadius: '0.15rem'
  },
  instagramLinkPrivate: {
    width: '98%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray1,
    borderRadius: '0.15rem'
  },
  instagramLinkIcon: {
    marginBottom: '0.3rem',
    width: '2rem',
    height: '2rem'
  },
  instagramLinkText: {
    textAlign: 'center',
    fontFamily: Fonts.type.semiBold,
    fontSize: 10,
    color: Colors.brownGray
  },
  instagramConnect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1rem'
  },
  instagramConnectText: {
    flex: 1,
    fontSize: '1rem',
    color: Colors.text,
    paddingRight: 10
  },
  instagramConnectButton: {
    width: '9.5rem',
    height: '2.8rem'
  },
  instagramConnectButtonImage: {
    width: '100%',
    height: '100%'
  }
})
