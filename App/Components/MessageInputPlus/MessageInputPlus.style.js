import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flexDirection: 'row',
    paddingTop: '0.3rem',
    paddingBottom: '0.1rem',
    paddingHorizontal: '0.3rem'
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  textInput: {
    fontFamily: Fonts.type.neue,
    fontSize: '1rem',
    color: Colors.black,
    flex: 1,
    width: '93%'
  },
  messageIcon: {
    height: '2.5rem',
    width: '3.1rem'
  },
  touchable: {
    height: '2.5rem',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0.5rem'
  },
  sendIcon: {
    height: '2rem',
    width: '2rem'
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  open: {
    width: '95%',
    borderRadius: '0.6rem',
    borderWidth: '0.1rem',
    borderColor: Colors.lightGray,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})
