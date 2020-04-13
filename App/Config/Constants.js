import { getHeights } from 'Tools/index'

export const GENERAL_DATE_FORMAT = 'YYYY-MM-DD'
export const USER_DATE_FORMAT = 'MM / DD / YYYY'
export const MIN_ACCEPTED_AGE = 18
export const MAX_ACCEPTED_AGE = 88
export const SEX_TYPE = { MALE: 'male', FEMALE: 'female' }
export const GENDER = { MAN: 'man', WOMAN: 'woman', TRANSGENDERED: 'transgendered' }
export const AGE_RANGE = [18, 88]
export const HEIGHT_RANGE = getHeights()
export const HEIGHT_SEARCH_RANGE = [48, 84] // INCHES

export const MATCHED_USERS_STEP = 30
export const DIALOGS_STEP = 30

export const INSTAGRAM_CLIENT_ID = 'a7607ac131404007b91832cb0cc029bf'
export const INSTAGRAM_REDIRECT_URI = 'http://www.bepicke.com'

export const ADMOB_UNIT_ID = 'ca-app-pub-9957207390097932/9801400806'

export const MAX_IMAGE_SIZE = 720
export const IMAGE_PICKER_CONFIG = {
  compressImageMaxWidth: 720,
  compressImageQuality: 0.71,
  width: 720,
  height: 1024,
  compressImageMaxHeight: 1024,
  cropping: true,
  cropperToolbarTitle: ''
}

export const SEARCH_LOAD_ATTEMPTS = 1
export const MESSAGE_SEND_ATTEMPTS = 1

export const PURCHASE_PRODUCTS = [
  'pickenew1.iap.plus',
  '3picke.iap.special',
  '6picke.iap.special'
]

export const DEFAULT_LOCATION = { lat: 40.7516, lon: -74.0031 }
