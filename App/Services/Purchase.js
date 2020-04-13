import { NativeModules } from 'react-native'
const { InAppUtils } = NativeModules

const products = [
  'picke.iap.plus',
  '3picke.iap.special',
  '6picke.iap.special'
]

// console.tron.log({ product }, true)

InAppUtils.loadProducts(product, (error, products) => {
  // console.tron.log({ error, products }, true)
})

InAppUtils.canMakePayments((enabled) => {
  if(enabled) {
    // console.tron.log('IAP enabled')
  } else {
    // console.tron.log('IAP disabled')
  }
})
