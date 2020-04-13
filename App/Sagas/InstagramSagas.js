import { call, put, select, all } from 'redux-saga/effects'
import { apiErrorHandler } from 'Tools'
import InstagramActions from 'Redux/InstagramRedux'
import PeopleActions from 'Redux/PeopleRedux'

export const getInstagramToken = state => state.user.syncInstagram.token

export function * getInstagramMediaRequest (api, action) {
  const { username } = action
  const response = yield call(api.getInstagramMedia, { username })
  // console.log('getInstagramMedia', { username, response })
  if (response.ok) {
    const responseJson = response.data
    if (responseJson) {
      const data = responseJson.graphql.user.edge_owner_to_timeline_media.edges
      const photos = data.map(e => ({
        full: e.node.display_url,
        thumb: e.node.thumbnail_src
      }))
      const subscribersCount = responseJson.graphql.user.edge_followed_by.count
      // console.log('getInstagramMediaRequest', { photos, subscribersCount })
      yield put(InstagramActions.getInstagramMediaSuccess(photos, subscribersCount))
    } else {
      yield put(InstagramActions.getInstagramMediaSuccess([]))
    }
  } else {
    yield put(InstagramActions.getInstagramMediaFailure(response.problem))
    apiErrorHandler(response, 'Get instagram media failed')
  }
}

export function * getInstagramMediaArrayRequest (api, action) {
  const { instagramUsers } = action
  const responses = yield instagramUsers.map(username => call(api.getInstagramMedia, { username }))
  let instagrams = {}
  const failures = responses.filter(e => !e.ok)
  responses.filter(e => e.ok).map(e => {
    const user = e.data.graphql.user
    const { username } = user
    const photoData = user.edge_owner_to_timeline_media.edges
    if (photoData.length > 0) {
      const output = {
        username,
        subscribersCount: user.edge_followed_by.count,
        photos: photoData.map(el => ({
          full: el.node.display_url,
          thumb: el.node.thumbnail_src
        }))
      }
      instagrams[username] = output
    }
    return false
  })
  // console.log('getInstagramMediaArrayRequest', { instagrams, failures })
  yield put(PeopleActions.instagramSuccess(instagrams))
}
