import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  container: {
    marginLeft: '0.7rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  matchedUsersList: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  userItem: {
    marginRight: '0.42rem'
  },
  avatar: {
    borderRadius: '0.6rem',
    height: '5rem',
    width: '3.7rem'
  },
  nameText: {
    marginTop: '0.2rem',
    fontFamily: Fonts.type.neue,
    color: '#8e8e8e',
    fontSize: '0.7rem'
  },
  indicator: {
    position: 'absolute',
    top: '0.5rem',
    right: '-0.3rem',
    width: '0.6rem',
    height: '0.6rem',
    backgroundColor: Colors.purplePink,
    borderWidth: 1.5,
    borderColor: '#fff',
    borderRadius: '1rem'
  },
  loader: {
    width: '4.5rem',
    alignItems: 'center',
    justifyContent: 'center',
    height: '5rem'
  },
  emptyPlaceholderText: {
    textAlign: 'center',
    fontFamily: Fonts.type.neue,
    fontSize: '0.95rem',
    color: '#888'
  },
  emptyPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  }
})
