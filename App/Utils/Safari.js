import SafariView from 'react-native-safari-view'

export const openUrl = (url) => {
  return SafariView.show({ url })
}
