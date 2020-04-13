import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'
import fs from 'react-native-fs'

const onNoImage = () => {
  throw new Error('no image')
}

const ImagePick = (callback) => {
  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  }

  ImagePicker.launchImageLibrary(options, (response) => {
    const { data, fileSize, isVertical, uri, origURL, width, height } = response

    let newWidth = 800
    let newHeight = 600

    if (isVertical) {
      [newWidth, newHeight] = [newHeight, newWidth]
    }

    const compressFormat = 'PNG'
    const quality = 65

    !uri && onNoImage()

    ImageResizer.createResizedImage(uri, newWidth, newHeight, compressFormat, quality).then((resized) => {
      !resized && onNoImage()

      const file = fs.readFile(resized.path, 'base64').then((contents) => {
        // log the file contents
        // console.log('____', contents)


        !contents && onNoImage()

        const base64Image = 'data:image/png;base64,' + contents
        if (callback) callback({ base64Image, resizedPath: resized.path, data, uri, origURL })
      })
      .catch((err) => {
        // console.log('file err:', err, err.code)
      })
      // response.uri is the URI of the new image that can now be displayed, uploaded...
      // response.path is the path of the new image
      // response.name is the name of the new image with the extension
      // response.size is the size of the new image
    }).catch((err) => {
      // console.log('err', err)
      // Oops, something went wrong. Check that the filename is correct and
      // inspect err to get more details.
    })
  })
}

export default ImagePick
