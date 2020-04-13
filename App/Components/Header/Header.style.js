  import { Metrics, ApplicationStyles, Fonts, Colors, width, height } from 'Themes'

  import EStyleSheet from 'react-native-extended-stylesheet'

  export default EStyleSheet.create({
    ...ApplicationStyles.screen,
    header: {
      marginTop: '1rem',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      backgroundColor: 'transparent',
      borderBottomColor: 'rgba(0,0,0,0.1)',
      zIndex: 6,
      height: '3rem'
    },
    titleText: {
      color: Colors.purplePink,
      fontFamily: Fonts.type.base,
      fontSize: '0.8rem',
      textAlign: 'center',
      fontWeight: '500'
    },
    wrap: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
    },
    title: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    alignLeft: {
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    alignRight: {
      alignItems: 'flex-end',
      justifyContent: 'center'
    },
    progress: {
      alignSelf: 'stretch',
      position: 'absolute',
      bottom: '-0.4rem',
      left: 0,
      right: 0
    },
    touchable: {
      paddingHorizontal: '0.7rem',
      paddingVertical: '0.3rem',
      alignItems: 'center',
      justifyContent: 'center'
    },
    rightText: {
      paddingHorizontal: '0.7rem',
      paddingVertical: '0.3rem',
      color: Colors.pinkishGray,
      fontFamily: Fonts.type.base,
      fontSize: '0.8rem',
      fontWeight: '300'
    }
  })
