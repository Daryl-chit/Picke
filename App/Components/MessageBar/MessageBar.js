import React from 'react'
import { MessageBar, MessageBarManager } from 'Components/MessageBarEngine'
import EStyleSheet from 'react-native-extended-stylesheet'

import { Colors, Fonts, rem } from 'Themes'

export default class extends React.Component {
  componentDidMount () {
    MessageBarManager.registerMessageBar(this.refs.alert)
  }

  componentWillUnmount () {
    MessageBarManager.unregisterMessageBar()
  }

  render () {
    return <MessageBar
      ref='alert'
      titleStyle={s.title}
      messageStyle={s.message}
      duration={6000}
      viewTopOffset={0}
      viewTopInset={rem * 0.6}
      durationToShow={900}
      durationToHide={700}
      viewBottomInset={rem * 0.5}
    />
  }
}

const s = EStyleSheet.create({
  title: {
    fontFamily: Fonts.type.base,
    fontSize: '1.1rem',
    fontWeight: '500',
    marginBottom: '0.4rem'
  },
  message: {
    fontFamily: Fonts.type.base,
    fontSize: '1rem'
  }
})