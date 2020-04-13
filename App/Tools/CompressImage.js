import ImageResizer from 'react-native-image-resizer'
import { IMAGE_PICKER_CONFIG, MAX_IMAGE_SIZE } from 'Config/Constants'

const IMAGE_RESIZE_STEP = 5
const COMPRESS_FORMAT = 'JPEG'

const sizeFits = (size) => (size / 100) < MAX_IMAGE_SIZE

const compressImage = (path, callback, error, q) => {
  const { compressImageMaxWidth: maxWidth, compressImageMaxHeight: maxHeight, compressImageQuality } = IMAGE_PICKER_CONFIG
  const quality = q || (compressImageQuality * 100)

  ImageResizer.createResizedImage(path, maxWidth, maxHeight, COMPRESS_FORMAT, quality).then((response) => {
    const { uri } = response
    if (!sizeFits(response.size)) {
      // console.log('compression auto-regress to quality: ', quality - IMAGE_RESIZE_STEP)
      return compressImage(path, callback, error, quality - IMAGE_RESIZE_STEP)
    }
    // console.log('compress image', { uri, response })
    if (callback) return callback(uri, response)
  }).catch((err) => {
    // console.log('compress err', err)
    if (error) return error(err)
  })
}

export default compressImage
