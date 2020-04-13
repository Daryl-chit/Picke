import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

import Color from 'color'
// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    screen: {
      flex: 1,
      backgroundColor: '#fff'
    },
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: 'transparent'
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text
    },
    underline: {
      textDecorationLine: 'underline'
    },
    marginTop: {
      marginTop: '1.1rem'
    },
    marginBottom: {
      marginBottom: '1.1rem'
    },
    labelText: {
      fontSize: '1rem',
      fontFamily: Fonts.type.medium,
      lineHeight: '1.6rem',
      color: Colors.text,
      fontWeight: '500'
    },
    stretch: {
      alignSelf: 'stretch'
    },
    body: {
      paddingHorizontal: '1.8rem',
      alignSelf: 'stretch',
      alignItems: 'center'
    },
    roundInput: {
      fontSize: '1.35rem',
      fontFamily: Fonts.type.medium,
      color: Colors.text,
      fontWeight: '500',
      textAlign: 'center'
    },
    passwordInput: {
      alignSelf: 'stretch',
      width: '100%'
    },
    roundInputContainer: {
      borderRadius: '1.35rem',
      backgroundColor: Color('#e1e1e1').lighten(0.05),
      paddingVertical: '0.65rem',
      paddingHorizontal: '1.2rem',
      marginHorizontal: '0.3rem'
    },
    center: { alignItems: 'center', justifyContent: 'center' }
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  }
}

export default ApplicationStyles
