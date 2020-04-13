import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    width: width * 0.65,
    height: width * 0.65 * 0.435,
    marginTop: (height - width * 0.35 - 110) / 2,
    resizeMode: 'contain'
  },
  question: {
    width: 25,
    resizeMode: 'contain'
  },
  questionContainer: {
    position: 'absolute',
    bottom: 120,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginDescriptionContainer: {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    flex: 1
  },
  loginText: {
    fontFamily: Fonts.type.base,
    color: Colors.greyish,
    fontSize: '0.8rem',
    textAlign: 'center'
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 110,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    height: 100,
    width: width*0.8,
  },
  buttonStyle: {
    alignItems: 'center'
  },
  centered: {
    alignItems: 'center'
  },
  loginBackground: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: '-6%',
    width: width,
    height: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  agree: {
    position: 'absolute',
    width: width,
    top: '7%',
    backgroundColor: 'transparent'
  },
  agreeLink: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loginTerms: {
    width: width * 0.7,
    resizeMode: 'contain'
  },
  loginButton: {
    width: width * 0.7,
    resizeMode: 'contain'
  },
  loginDescription: {
    width: width * 0.6,
    resizeMode: 'contain'
  },
  modal: {
    padding: '1.8rem',
    paddingBottom: '5rem',
    backgroundColor: '#fff',
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
    color: '#000',
    fontSize: '1.5rem',
    marginBottom: '0.7rem'
  },
  modalText: {
    textAlign: 'center',
    fontFamily: Fonts.type.neue,
    color: Colors.text,
    fontSize: '1.05rem',
    lineHeight: '1.45rem'
  },
  modalButtonText: {
    color: Colors.purplePink,
    fontFamily: Fonts.type.base,
    fontSize: '1rem'
  }
})
