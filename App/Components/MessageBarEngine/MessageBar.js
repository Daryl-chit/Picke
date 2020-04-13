import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image
} from 'react-native'

// import * as Ani from 'react-native-animatable'
import Color from 'color'

import { Colors, Fonts, rem, calcRem, width, height } from 'Themes'

class MessageBar extends Component {
  constructor (props) {
    super(props)

    this.animatedValue = new Animated.Value(0)
    this.notifyAlertHiddenCallback = null
    this.alertShown = false
    this.timeoutHide = null

    this.state = this.getStateByProps(props)
    this.defaultState = this.getStateByProps(props)
  }

  componentDidMount () {
    this._changeOffsetByPosition(this.state.position)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps && Object.keys(nextProps).length > 0) {
      this.setNewState(nextProps)
    }
  }

  setNewState (state) {
    this.setState(this.getStateByProps(state))

    this._applyAlertStylesheet(state.alertType)

    this._changeOffsetByPosition(state.position)
  }

  getStateByProps (props) {
    const def = this.defaultState || {}
    return {
      backgroundColor: Colors.purplePink,
      strokeColor: Color(Colors.purplePink).darken(0.1),
      titleColor: '#ffffff',
      messageColor: '#ffffff',
      animationTypeTransform: 'SlideFromTop',
      title: props.title,
      message: props.message,
      avatar: props.avatar,
      alertType: props.alertType || 'info',
      duration: props.duration || def.duration || 4500,

      /* Hide setters */
      get shouldHideAfterDelay () {
        if (props.shouldHideAfterDelay != undefined) { return props.shouldHideAfterDelay }
        if (def.shouldHideAfterDelay != undefined) { return def.shouldHideAfterDelay }
        return true
      },
      shouldHideOnTap: props.shouldHideOnTap == undefined &&
        def.shouldHideOnTap == undefined
          ? true
          : props.shouldHideOnTap || def.shouldHideOnTap,

      /* Callbacks method on Alert Tapped, on Alert Show, on Alert Hide */
      onTapped: props.onTapped || def.onTapped,
      onShow: props.onShow || def.onShow,
      onHide: props.onHide || def.onHide,

      /* Stylesheets */
      stylesheetInfo: props.stylesheetInfo ||
      def.stylesheetInfo || {
        backgroundColor: Colors.purplePink,
        strokeColor: Color(Colors.purplePink).darken(0.1),
        titleColor: '#ffffff',
        messageColor: '#ffffff'
      }, // Default are blue colors
      stylesheetSuccess: props.stylesheetSuccess ||
      def.stylesheetSuccess || {
        backgroundColor: Colors.brightGreen,
        strokeColor: Color(Colors.brightGreen).darken(0.1),
        titleColor: '#ffffff',
        messageColor: '#ffffff'
      }, // Default are Green colors
      stylesheetWarning: props.stylesheetWarning ||
      def.stylesheetWarning || {
        backgroundColor: Colors.yellow,
        strokeColor: Color(Colors.yellow).darken(0.1),
        titleColor: '#ffffff',
        messageColor: '#ffffff'
      }, // Default are orange colors
      stylesheetError: props.stylesheetError ||
      def.stylesheetError || {
        backgroundColor: Colors.pinkRed,
        strokeColor: Color(Colors.pinkRed).darken(0.1),
        titleColor: '#ffffff',
        messageColor: '#ffffff'
      }, // Default are red colors
      stylesheetExtra: props.stylesheetExtra ||
      def.stylesheetExtra || {
        backgroundColor: Colors.purplePink,
        strokeColor: Color(Colors.purplePink).darken(0.1),
        titleColor: '#ffffff',
        messageColor: '#ffffff'
      }, // Default are blue colors, same as info

      /* Duration of the animation */
      durationToShow: props.durationToShow || def.durationToShow || 350,
      durationToHide: props.durationToHide || def.durationToHide || 350,

      /* Offset of the View, useful if you have a navigation bar or if you want the alert be shown below another component instead of the top of the screen */
      viewTopOffset: props.viewTopOffset || def.viewTopOffset || 0,
      viewBottomOffset: props.viewBottomOffset || def.viewBottomOffset || 0,
      viewLeftOffset: props.viewLeftOffset || def.viewLeftOffset || 0,
      viewRightOffset: props.viewRightOffset || def.viewRightOffset || 0,

      /* Inset of the view, useful if you want to apply a padding at your alert content */
      viewTopInset: props.viewTopInset || def.viewTopInset || 0,
      viewBottomInset: props.viewBottomInset || def.viewBottomInset || 0,
      viewLeftInset: props.viewLeftInset || def.viewLeftInset || 0,
      viewRightInset: props.viewRightInset || def.viewRightInset || 0,

      /* Padding around the content, useful if you want a tiny message bar */
      messageBarPadding: props.messageBarPadding || def.messageBarPadding || 10,

      /* Number of Lines for Title and Message */
      titleNumberOfLines:
        props.titleNumberOfLines == undefined &&
        def.titleNumberOfLines == undefined
          ? 1
          : props.titleNumberOfLines || def.titleNumberOfLines,
      messageNumberOfLines:
        props.messageNumberOfLines == undefined &&
        def.titleNumberOfLines == undefined
          ? 2
          : props.messageNumberOfLines || def.messageNumberOfLines,

      /* Style for the text elements and the avatar */
      titleStyle: props.titleStyle || def.titleStyle || {
        fontSize: 18,
        fontWeight: 'bold'
      },
      messageStyle: props.messageStyle || def.messageStyle || {
        fontSize: 16
      },
      avatarStyle: props.avatarStyle || def.avatarStyle || {
        height: 40,
        width: 40,
        borderRadius: 20
      },

      /* Position of the alert and Animation Type the alert is shown */
      position: props.position || def.position || 'top',
      animationType: props.animationType || def.animationType
    }
  }

  showMessageBarAlert () {
    // If an alert is already shonw or doesn't have a title or a message, do nothing
    if (
      this.alertShown ||
      (this.state.title == null && this.state.message == null)
    ) {
      return
    }

    // Set the data of the alert in the state
    this.alertShown = true

    // Display the alert by animating it from the top of the screen
    // Auto-Hide it after a delay set in the state
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: this.state.durationToShow,
      useNativeDriver: true
    }).start(this._showMessageBarAlertComplete())
  }

  _showMessageBarAlertComplete () {
    // Execute onShow callback if any
    this._onShow()

    // If the duration is null, do not hide the
    if (this.state.shouldHideAfterDelay) {
      this.timeoutHide = setTimeout(() => {
        this.hideMessageBarAlert()
      }, this.state.duration)
    }
  }

  /*
  * Return true if the MessageBar is currently displayed, otherwise false
  */
  isMessageBarShown () {
    return this.alertShown
  }

  hideMessageBarAlert () {
    // Hide the alert after a delay set in the state only if the alert is still visible
    if (!this.alertShown) {
      return
    }

    clearTimeout(this.timeoutHide)

    // Animate the alert to hide it to the top of the screen
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: this.state.durationToHide,
      useNativeDriver: true
    }).start(this._hideMessageBarAlertComplete())
  }

  _hideMessageBarAlertComplete () {
    // The alert is not shown anymore
    this.alertShown = false

    this._notifyAlertHidden()

    // Execute onHide callback if any
    this._onHide()
  }

  _notifyAlertHidden () {
    if (this.notifyAlertHiddenCallback) {
      this.notifyAlertHiddenCallback()
    }
  }

  _alertTapped () {
    // Hide the alert
    if (this.state.shouldHideOnTap) {
      this.hideMessageBarAlert()
    }

    // Execute the callback passed in parameter
    if (this.state.onTapped) {
      this.state.onTapped()
    }
  }

  _onShow () {
    if (this.state.onShow) {
      this.state.onShow()
    }
  }

  _onHide () {
    if (this.state.onHide) {
      this.state.onHide()
    }
  }

  _applyAlertStylesheet (alertType) {
    let backgroundColor
    let strokeColor
    let titleColor
    let messageColor

    switch (alertType) {
      case 'success':
        backgroundColor = this.state.stylesheetSuccess.backgroundColor
        strokeColor = this.state.stylesheetSuccess.strokeColor
        titleColor = this.state.stylesheetSuccess.titleColor
        messageColor = this.state.stylesheetSuccess.messageColor
        break
      case 'error':
        backgroundColor = this.state.stylesheetError.backgroundColor
        strokeColor = this.state.stylesheetError.strokeColor
        titleColor = this.state.stylesheetError.titleColor
        messageColor = this.state.stylesheetError.messageColor
        break
      case 'warning':
        backgroundColor = this.state.stylesheetWarning.backgroundColor
        strokeColor = this.state.stylesheetWarning.strokeColor
        titleColor = this.state.stylesheetWarning.titleColor
        messageColor = this.state.stylesheetWarning.messageColor
        break
      case 'info':
        backgroundColor = this.state.stylesheetInfo.backgroundColor
        strokeColor = this.state.stylesheetInfo.strokeColor
        titleColor = this.state.stylesheetInfo.titleColor
        messageColor = this.state.stylesheetInfo.messageColor
        break
      default:
        backgroundColor = this.state.stylesheetExtra.backgroundColor
        strokeColor = this.state.stylesheetExtra.strokeColor
        titleColor = this.state.stylesheetExtra.titleColor
        messageColor = this.state.stylesheetExtra.messageColor
        break
    }

    this.setState({
      backgroundColor: backgroundColor,
      strokeColor: strokeColor,
      titleColor: titleColor,
      messageColor: messageColor
    })
  }

  /*
  * Change view<Position>Offset property depending on the state position
  */
  _changeOffsetByPosition (position) {
    switch (position) {
      case 'top':
        this.setState({
          viewBottomOffset: null
        })
        break
      case 'bottom':
        this.setState({
          viewTopOffset: null
        })
        break
      default:
        this.setState({
          viewBottomOffset: null
        })
        break
    }
  }

  /*
  * Set the animation transformation depending on the chosen animationType, or depending on the state's position if animationType is not overridden
  */
  _applyAnimationTypeTransformation () {
    let position = this.state.position
    let animationType = this.state.animationType

    if (animationType === undefined) {
      if (position === 'bottom') {
        animationType = 'SlideFromBottom'
      } else {
        // Top by default
        animationType = 'SlideFromTop'
      }
    }

    switch (animationType) {
      case 'SlideFromTop':
        var animationY = this.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-height, 0]
        })
        this.animationTypeTransform = [{ translateY: animationY }]
        break
      case 'SlideFromBottom':
        var animationY = this.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [height, 0]
        })
        this.animationTypeTransform = [{ translateY: animationY }]
        break
      case 'SlideFromLeft':
        var animationX = this.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-width, 0]
        })
        this.animationTypeTransform = [{ translateX: animationX }]
        break
      case 'SlideFromRight':
        var animationX = this.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [width, 0]
        })
        this.animationTypeTransform = [{ translateX: animationX }]
        break
      default:
        var animationY = this.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-height, 0]
        })
        this.animationTypeTransform = [{ translateY: animationY }]
        break
    }
  }

  /*
  * Alert Rendering Methods
  */

  render () {
    // Set the animation transformation depending on the chosen animationType, or depending on the state's position if animationType is not overridden
    this._applyAnimationTypeTransformation()

    return (
      <Animated.View
        style={{
          transform: this.animationTypeTransform,
          backgroundColor: this.state.backgroundColor,
          borderColor: this.state.strokeColor,
          borderBottomWidth: 1,
          position: 'absolute',
          top: this.state.viewTopOffset,
          bottom: this.state.viewBottomOffset,
          left: this.state.viewLeftOffset,
          right: this.state.viewRightOffset,
          paddingTop: this.state.viewTopInset,
          paddingBottom: this.state.viewBottomInset,
          paddingLeft: this.state.viewLeftInset,
          paddingRight: this.state.viewRightInset
        }}>
        <TouchableOpacity
          onPress={() => {
            this._alertTapped()
          }}
          style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-end',
              padding: this.state.messageBarPadding
            }}>
            {this.renderImage()}
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignSelf: 'stretch',
                justifyContent: 'center',
                marginLeft: 10
              }}>
              {this.renderTitle()}
              {this.renderMessage()}
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  renderImage () {
    if (this.state.avatar != null) {
      var imageSource
      var avatar = this.state.avatar

      if (typeof avatar === 'string') {
        if (avatar.match(/^https?:/)) {
          // this is a network file
          imageSource = { uri: avatar }
        } else {
          // this is a local file : require('<path/to/my/local/image.extension>')
          imageSource = avatar
        }

        return <Image source={imageSource} style={this.state.avatarStyle} />
      } else if (React.isValidElement(avatar)) {
        // this is a react component
        return avatar
      }
    }
  }

  renderTitle () {
    if (this.state.title != null) {
      return (
        <Text
          numberOfLines={this.state.titleNumberOfLines}
          style={[this.state.titleStyle, {color: this.state.titleColor}]}>
          {this.state.title}
        </Text>
      )
    }
  }

  renderMessage () {
    if (this.state.message != null) {
      return (
        <Text
          numberOfLines={this.state.messageNumberOfLines}
          style={[this.state.messageStyle, {color: this.state.messageColor}]}>
          {this.state.message}
        </Text>
      )
    }
  }
}

module.exports = MessageBar
