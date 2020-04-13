import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'
import { isX } from 'Tools'

import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: Colors.black75
  },
  closeModal: {
    width: '1.6rem',
    height: '1.6rem'
  },
  closeButton: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    right: '-1.2rem',
    top: '-1.2rem',
    width: '2.6rem',
    height: '2.6rem',
    zIndex: 12
  },
  modalContainer: {
    marginTop: isX ? '3.2rem' : '1.9rem',
    width: width * 0.9,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderColor: 'red',
    height: isX ? height * 0.8 : height * 0.82
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 10,
    height: '100%',
    width: '100%'
  },
  topContainer: {
    height: '3.5rem',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#e2e2e2'
  },
  activateContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activateText: {
    fontFamily: 'HelveticaNeue',
    fontSize: '0.835rem',
    fontWeight: 'bold',
    lineHeight: '2.2538rem',
    letterSpacing: 2.15,
    textAlign: 'center',
    color: Colors.black62
  },
  plusButton: {
    width: '4.828125rem',
    height: '2.640625rem'
  },
  swipeContainer: {
    flex: 1,
    width: width * 0.9
  },
  swiper: {
    flex: 1,
    width: width * 0.9
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    height: height * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9
  },
  imageView: {
    resizeMode: 'contain',
    height: height * 0.32,
    width: width * 0.9
  },
  tutorialContainer: {
    marginVertical: '0.8rem',
    height: '0.8125rem',
    backgroundColor: Colors.transparent
  },
  textTutorial: {
    fontFamily: 'HelveticaNeue',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    lineHeight: '2.08875rem',
    letterSpacing: 3.34,
    textAlign: 'center',
    color: '#c1c1c1'
  },
  popularContainer: {
    marginBottom: '1.5rem',
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  popularTutorial: {
    fontFamily: 'HelveticaNeue',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    lineHeight: 17.5,
    letterSpacing: 0.25,
    textAlign: 'center',
    color: Colors.purplePink
  },
  choosePlan: {
    marginTop: '-1rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    width: width * 0.28,
    height: width * 0.3,
    borderColor: Colors.pinkishGray,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 2,
    marginHorizontal: '0.13rem',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonActive: {
    backgroundColor: Colors.purplePink,
    borderColor: Colors.purplePink
  },
  textActive: {
    color: Colors.white
  },
  monthsContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.transparent,
    alignItems: 'center',
    justifyContent: 'center'
  },
  months: {
    marginLeft: '1.45rem',
    height: '1.6rem',
    width: '2.4rem'
  },
  delimiter: {
    marginHorizontal: '1.2rem',
    width: '3rem',
    height: 2,
    marginTop: '0.4rem',
    marginBottom: '0.5rem',
    borderStyle: 'solid',
    backgroundColor: Colors.pinkishGray
  },
  mostPopular: {
    marginVertical: '0.2rem'
  },
  monthText: {
    fontFamily: Fonts.type.neue,
    fontSize: '2rem',
    color: Colors.purplePink,
    textAlign: 'center'
  },
  monthDescText: {
    fontFamily: Fonts.type.neue,
    fontSize: '0.8rem',
    color: Colors.purplePink,
    textAlign: 'center'
  },
  priceText: {
    fontFamily: Fonts.type.neue,
    fontSize: '1.2rem',
    color: Colors.black,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  saveText: {
    fontFamily: Fonts.type.neue,
    fontSize: '0.7rem',
    color: '#999',
    textAlign: 'center'
  },
  delimiterActive: {
    backgroundColor: '#c53e9b'
  },
  purchaseContainer: {
    backgroundColor: '#e2e2e2',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginTop: '0.5rem',
    height: '3rem',
    width: '100%',
    justifyContent: 'center'
  },
  purchaseText: {
    fontFamily: 'HelveticaNeue',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    lineHeight: '1.8rem',
    letterSpacing: 0.91,
    textAlign: 'center',
    marginHorizontal: '1rem',
    color: Colors.black62
  },
  info: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    paddingBottom: '0.7rem',
    justifyContent: 'center'
  },
  infoTitleText: {
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: '0.25rem',
    fontSize: '0.6rem'
  },
  infoText: {
    fontSize: '0.55rem',
    color: Colors.white,
    textAlign: 'center',
    paddingHorizontal: '1.55rem'
  },
  dotStyle: {
    backgroundColor: Colors.pinkishGray,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  activeDotStyle: {
    backgroundColor: Colors.purplePink,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  link: {
    paddingHorizontal: 3,
    fontWeight: '700'
  }
})
