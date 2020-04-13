import { Dimensions } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors, calcHeight } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  container: {
    height: calcHeight(0.68)
  },
  list: {
  },
  timeAgo: {
    position: 'absolute',
    right: '0.7rem',
    top: '0.65rem'
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  plusIcon: {
    width: '2rem',
    height: '1rem',
    marginLeft: '0.15rem',
    marginTop: '0rem'
  },
  timeAgoText: {
    fontFamily: Fonts.type.neue,
    color: '#8e8e8e',
    fontSize: '0.75rem',
    fontWeight: '300'
  },
  new: {
    position: 'absolute',
    right: '-0.7rem',
    top: '0.7rem',
    backgroundColor: Colors.purplePink,
    borderRadius: '0.8rem',
    paddingHorizontal: '0.15rem',
    paddingVertical: '0.1rem'
  },
  newText: {
    fontFamily: Fonts.type.neue,
    color: '#fff',
    fontSize: '0.5rem',
    fontWeight: '600'
  },
  dialogContent: {
    flex: 1,
    paddingLeft: '1.1rem',
    paddingRight: '1rem',
    paddingVertical: '0.6rem',
  },
  dialogItem: {
    // height: '5rem',
    marginBottom: '0.6rem',
    backgroundColor: '#fff',
    borderRadius: '0.6rem',
    borderTopRightRadius: '0.3rem',
    borderBottomRightRadius: '0.3rem',
    flexDirection: 'row',
    shadowColor: 'rgba(0, 0, 0, 0.35)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1.5,
    shadowOpacity: 1
  },
  avatar: {
    borderRadius: '0.6rem',
    height: '5rem',
    width: '3.7rem'
  },
  imageWrap: {
    width: '3.7rem'
  },
  nameText: {
    fontFamily: Fonts.type.neue,
    color: '#8e8e8e',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  messageText: {
    fontFamily: Fonts.type.neue,
    color: '#000',
    marginTop: '0.2rem',
    fontSize: '0.9rem',
    paddingRight: '2.5rem',
    lineHeight: '1.15rem'
  },
  messageWrap: {
    flexDirection: 'row'
  },
  arrowUpIcon: {
    width: '0.5rem',
    marginTop: '0.1rem',
    marginRight: '0.4rem',
    marginLeft: '0.2rem'
  }
})
