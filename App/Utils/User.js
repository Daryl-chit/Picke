import { sort } from 'ramda'
import moment from 'moment'
import { GENERAL_DATE_FORMAT, USER_DATE_FORMAT } from 'Config/Constants'

const getLastPhoto = photos => {
  const filterPhotos = photos.filter(item => item.source != 'instagram')
  let newPhotos = Object.assign([], filterPhotos)
  newPhotos.sort((a, b) => {
    return a.num < b.num
  })
  return newPhotos[0]
}

export const buildUserAvatar = user => {
  return user.photo && user.photo.path
      ? user.photo.path
      : user.photos && user.photos.length > 0
          ? getLastPhoto(user.photos).path : ''
}

export const getUserAge = user => {
  const birth = moment(user.dob, GENERAL_DATE_FORMAT)
  return moment().diff(birth, 'years')
}
