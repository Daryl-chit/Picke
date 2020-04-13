import React, { PureComponent } from 'react'
import { View, Text, Image, TouchableOpacity, Modal, Alert, NativeModules } from 'react-native'
import DeviceInfo from 'react-native-device-info'

import { ScalableImage } from 'Components'

import Swiper from 'react-native-swiper'
import { Images, calcHeight, calcWidth, rem } from 'Themes'
import styles from './SubscriptionModal.style'
import Locales from 'Locales'
import { PURCHASE_PRODUCTS } from 'Config/Constants'

import { openUrl } from 'Utils'

const { InAppUtils } = NativeModules

const plans = [
  {
    id: 1,
    months: 1,
    monthDesc: 'MONTH',
    price: '$9.99/mo',
    paymentOf: '$9.99',
    save: 'No savings'
  },
  {
    id: 2,
    months: 3,
    monthDesc: 'MONTHS',
    price: '$6.66/mo',
    paymentOf: '$19.99',
    save: 'Save 34%'
  },
  {
    id: 3,
    months: 6,
    monthDesc: 'MONTHS',
    price: '$4.99/mo',
    paymentOf: '$29.99',
    save: 'Save 50%'
  }
]

export default class SubscriptionModal extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      startIndex: this.props.startIndex ? this.props.startIndex : 0,
      selectedPlan: null,
      imageWidth: calcWidth(0.9),
      imageHeight: calcHeight(0.32),
      containerHeight: calcHeight(0.35),
      containerWidth: calcWidth(0.9),
      canMakePayments: null,
      products: [],
    }
  }

  open = index => {
    this.setState({ open: true })
  }

  close = () => {
    this.setState({ open: false })
  }

  componentDidMount () {
    InAppUtils.canMakePayments(canMakePayments => {
      this.setState({ canMakePayments })
    })
    InAppUtils.loadProducts(PURCHASE_PRODUCTS, (error, products) => {
      this.setState({ products })
    })
  }

  selectPlan = planId => {
    const { canMakePayments } = this.state

    if (canMakePayments) {
      if (planId === 1) {
        this.purchaseProduct('pickenew1.iap.plus')
      } else if (planId === 2) {
        this.purchaseProduct('3picke.iap.special')
      } else if (planId === 3) {
        this.purchaseProduct('6picke.iap.special')
      }
    } else {
      Alert.alert('Purchase is disabled', "Can't make payments")
    }
  }

  renderPlanButton = plan => {
    const { id, months, monthDesc, price, save, paymentOf } = plan
    const isActive = id === 2
    return (
      <TouchableOpacity key={id} onPress={() => this.selectPlan(id)}>
        <View
          style={[styles.buttonContainer, isActive ? styles.buttonActive : {}]}
        >
          <View style={styles.monthsContainer}>
            <View>
              <Text
                style={[styles.monthText, isActive ? styles.textActive : {}]}
              >
                {months}
              </Text>
              <Text
                style={[
                  styles.monthDescText,
                  isActive ? styles.textActive : {}
                ]}
              >
                {monthDesc}
              </Text>
            </View>
            {isActive ?
              <ScalableImage
                style={styles.mostPopular}
                source={Images.mostPopular}
                width={calcWidth(0.28)} />
            : <View style={styles.delimiter} />}
            <View>
              <Text
                style={[styles.priceText, isActive ? styles.textActive : {}]}
              >
                {paymentOf}
              </Text>
              <Text
                style={[styles.saveText, isActive ? styles.textActive : {}]}
              >
                {save}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderPlan = () => {
    return (
      <View style={styles.choosePlan}>
        {plans.map(this.renderPlanButton)}
      </View>
    )
  }

  restorePurchase = () => {
    const { subscriptionRequest } = this.props
    InAppUtils.restorePurchases((error, response) => {
      if (error) {
        // Alert.alert('iTunes Error')
        this.props.subscriptionLog({ title: 'restorePurchase - InAppUtils.restorePurchases', error, response })
      } else {
        InAppUtils.receiptData((error, receiptData) => {
          if (error) {
            // Alert.alert('iTunes Error')
            this.props.subscriptionLog({ title: 'restorePurchase - InAppUtils.receiptData', error, receiptData })
          } else {
            if (subscriptionRequest) {
              this.close()
              subscriptionRequest(receiptData)
            }
          }
        })
      }
    })
  }

  openUrl = (url) => {
    openUrl(url)
  }

  purchaseProduct = (productIdentifier) => {
    const { subscriptionRequest } = this.props
    const deviceModel = DeviceInfo.getDeviceId()
    InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
      if (response && response.productIdentifier) {
        InAppUtils.receiptData((error, receiptData) => {
          if (error) {
            // Alert.alert('iTunes Error')
            this.props.subscriptionLog({ title: 'purchaseProduct - InAppUtils.receiptData', error, receiptData, productIdentifier, deviceModel })
          } else {
            if (subscriptionRequest) {
              this.close()
              subscriptionRequest(receiptData)
            }
          }
        })
      }
      if (error) {
        // Alert.alert('iTunes error', error.message)
        this.props.subscriptionLog({ title: 'purchaseProduct - InAppUtils.purchaseProduct', error, response, productIdentifier, deviceModel })
      }
    })
  }

  render () {
    const { onClose } = this.props
    const {
      open,
      startIndex,
      imageWidth,
      imageHeight,
      containerWidth,
      containerHeight
    } = this.state
    return (
      <Modal
        useNativeDriver
        animationType='slide'
        onRequestClose={onClose}
        transparent
        visible={open}
      >
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={this.close}>
              <Image
                source={Images.modalWindow.closeModal}
                style={styles.closeModal}
              />
            </TouchableOpacity>
            <View style={styles.mainContainer}>
              <View style={styles.topContainer}>
                <View style={styles.activateContainer}>
                  <Text style={styles.activateText}>ACTIVATE</Text>
                  <Image
                    source={Images.modalWindow.plusButton}
                    style={styles.plusButton}
                  />
                  <Text style={styles.activateText}>FEATURES</Text>
                </View>
              </View>
              <View
                style={styles.swipeContainer}
              >
                <Swiper
                  removeClippedSubviews={false}
                  loop={false}
                  index={startIndex}
                  showsPagination
                  dot={<View style={styles.dotStyle} />}
                  activeDot={<View style={styles.activeDotStyle} />}
                  paginationStyle={{ bottom: -calcHeight(0.013) }}
                  width={imageWidth}
                >
                  <View
                    style={[
                      styles.contentContainer,
                      { width: containerWidth, height: containerHeight }
                    ]}
                  >
                    <Image
                      style={[
                        styles.imageView,
                        { width: imageWidth, height: imageHeight }
                      ]}
                      source={Images.modalWindow.filter}
                    />
                  </View>
                  <View
                    style={[
                      styles.contentContainer,
                      { width: containerWidth, height: containerHeight }
                    ]}
                  >
                    <Image
                      style={[
                        styles.imageView,
                        { width: imageWidth, height: imageHeight }
                      ]}
                      source={Images.modalWindow.matches}
                    />
                  </View>
                  <View
                    style={[
                      styles.contentContainer,
                      { width: containerWidth, height: containerHeight }
                    ]}
                  >
                    <Image
                      style={[
                        styles.imageView,
                        { width: imageWidth, height: imageHeight }
                      ]}
                      source={Images.modalWindow.likes}
                    />
                  </View>
                  <View
                    style={[
                      styles.contentContainer,
                      { width: containerWidth, height: containerHeight }
                    ]}
                  >
                    <Image
                      style={[
                        styles.imageView,
                        { width: imageWidth, height: imageHeight }
                      ]}
                      source={Images.modalWindow.messages}
                    />
                  </View>
                  <View
                    style={[
                      styles.contentContainer,
                      { width: containerWidth, height: containerHeight }
                    ]}
                  >
                    <Image
                      style={[
                        styles.imageView,
                        { width: imageWidth, height: imageHeight }
                      ]}
                      source={Images.modalWindow.unlimiteds}
                    />
                  </View>
                  <View
                    style={[
                      styles.contentContainer,
                      { width: containerWidth, height: containerHeight }
                    ]}
                  >
                    <Image
                      style={[
                        styles.imageView,
                        { width: imageWidth, height: imageHeight }
                      ]}
                      source={Images.modalWindow.turns}
                    />
                  </View>
                </Swiper>
                <View style={styles.tutorialContainer}>
                  <Text style={styles.textTutorial}>
                    {Locales.t('swipeLearnMore').toUpperCase()}
                  </Text>
                </View>
                <View style={styles.popularContainer}>
                  <Text style={[styles.popularTutorial, {color: '#000'}]}>
                    {Locales.t('renewableSubscription').toUpperCase()}
                  </Text>
                  <Text style={styles.popularTutorial}>
                    {Locales.t('specialPricing').toUpperCase()}
                  </Text>
                </View>
                {this.renderPlan()}
              </View>
              <TouchableOpacity onPress={this.restorePurchase}>
                <View style={styles.purchaseContainer}>
                  <Text style={styles.purchaseText}>
                    {Locales.t('restorePurchase').toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoTitleText}>Recurring billing, cancel anytime.</Text>
            <Text style={styles.infoText}>If you choose to purchase a subscription, payment will be charged to your iTunes account, and your account will be charged within 24-hours prior to the end of your current period. Auto-renewal may be turned off at anytime by going to your setting in the iTunes store after purchase.</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Text style={[styles.infoText, {paddingHorizontal: 3}]}>For more information, please visit our</Text>
              <TouchableOpacity onPress={() => this.openUrl('http://bepicke.com/terms-of-service/')}>
                <Text style={[styles.infoText, styles.link]}>Terms of Service</Text>
              </TouchableOpacity>
              <Text style={[styles.infoText, {paddingHorizontal: 3}]}>and</Text>
              <TouchableOpacity onPress={() => this.openUrl('http://bepicke.com/privacy-policy/')}>
                <Text style={[styles.infoText, styles.link]}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
