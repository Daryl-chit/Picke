import { Dimensions } from 'react-native'
import { ApplicationStyles, Fonts, Colors } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

import { isX } from 'Tools'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  footerText: {
    fontSize: 14,
    color: '#aaa'
  },
  messageText: {
    fontFamily: Fonts.type.neue,
    fontSize: '1rem',
    lineHeight: '1.25rem'
  },
  messageTextRight: {
    color: '#000'
  },
  messageTextLeft: {
    color: '#fff'
  },
  bubble: {
    borderRadius: '0.4rem',
    marginBottom: '0.4rem'
  },
  bubbleRight: {
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.35)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1,
    shadowOpacity: 1,
    borderTopRightRadius: 0
  },
  bubbleLeft: {
    backgroundColor: Colors.purplePink,
    borderTopLeftRadius: 0,
    shadowColor: 'rgba(0, 0, 0, 0.35)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1,
    shadowOpacity: 1
  },
  bubbleContainer: {

  },
  bubbleContainerRight: {
    marginRight: '0.3rem'
  },
  avatar: {
    height: '2.3rem',
    width: '1.9rem',
    borderRadius: '0.3rem'
  },
  corner: {
    position: 'absolute',
    top: 0,
    width: '1rem',
    height: '0.5rem'
  },
  cornerLeft: {
    left: '-0.6rem'
  },
  cornerRight: {
    right: '-0.6rem',
    zIndex: 5,
    shadowColor: 'rgba(0, 0, 0, 0.35)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1.5,
    shadowOpacity: 1,
    borderTopRightRadius: 0
  },
  sendErrorContainer: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  sendErrorIcon: {
    width: '1rem',
    height: '1rem'
  },
  sendIcon: {
    width: '1.8rem',
    height: '1.6rem'
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.6rem',
    marginRight: '0.8rem'
  },
  sending: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: '0.5rem',
    marginBottom: 0
  },
  sendingWrap: {
    paddingHorizontal: '1rem',
    paddingVertical: '0.5rem',
    marginRight: '0.8rem'
  },
  sendingText: {
    fontFamily: Fonts.type.neue,
    fontSize: '1rem',
    color: Colors.greyish
  }
})
