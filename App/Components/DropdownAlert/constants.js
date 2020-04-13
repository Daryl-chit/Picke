import { StatusBar, Platform, Dimensions } from 'react-native';

const StatusBarDefaultBarStyle = StatusBar._defaultProps ? StatusBar._defaultProps.barStyle.value : 'default';
const StatusBarDefaultBackgroundColor = StatusBar._defaultProps ? StatusBar._defaultProps.backgroundColor.value : 'black';
const DEFAULT_IMAGE_DIMENSIONS = 36;
const IS_IOS = Platform.OS == 'ios';
const IS_ANDROID = Platform.OS == 'android';
const WINDOW = Dimensions.get('window');
const HEIGHT = WINDOW.height;
const WIDTH = WINDOW.width;

module.exports = {
  StatusBarDefaultBarStyle,
  StatusBarDefaultBackgroundColor,
  DEFAULT_IMAGE_DIMENSIONS,
  WINDOW,
  HEIGHT,
  WIDTH,
  IS_IOS,
  IS_ANDROID,
};
