import { takeLatest, all } from 'redux-saga/effects'
import API from 'Services/Api'
import InstagramApi from 'Services/InstagramApi'

// import FixtureAPI from 'Services/FixtureApi'
// import DebugConfig from 'Config/DebugConfig'

import { StartupTypes } from 'Redux/StartupRedux'
import { LoginTypes } from 'Redux/LoginRedux'
import { DictTypes } from 'Redux/DictRedux'
import { VenuesTypes } from 'Redux/VenuesRedux'
import { VenueTypes } from 'Redux/VenueRedux'
import { UsersTypes } from 'Redux/UsersRedux'
import { UserTypes } from 'Redux/UserRedux'
import { PeopleTypes } from 'Redux/PeopleRedux'
import { PersonTypes } from 'Redux/PersonRedux'
import { LikeTypes } from 'Redux/LikeRedux'
import { MatchedUsersTypes } from 'Redux/MatchedUsersRedux'
import { DialogsTypes } from 'Redux/DialogsRedux'
import { MessagesTypes } from 'Redux/MessagesRedux'
import { SettingsTypes } from 'Redux/SettingsRedux'
import { PusherTypes } from 'Redux/PusherRedux'
import { InstagramTypes } from 'Redux/InstagramRedux'

import { startup } from './StartupSagas'
import { loginRequest, smsLoginRequest, logoutRequest, fetchStartup } from './LoginSagas'
import { dictRequest } from './DictSagas'
import { venuesRequest } from './VenuesSagas'
import { venueRequest } from './VenueSagas'
import { activeUsersRequest, newUsersRequest, filterUsersRequest } from './UsersSagas'
import { peopleRequest } from './PeopleSagas'
import { onSettingsChange } from './SettingsSagas'
import { personRequest, unmatchRequest, reportRequest, blockRequest } from './PersonSagas'
import { matchedUsersRequest } from './MatchedUsersSagas'
import { dialogsRequest, totalsRequest } from './DialogsSagas'
import {
  userChangeRequest,
  addPhotoRequest,
  getUserRequest,
  deletePhotoRequest,
  syncInstagramRequest,
  cleanInstagramRequest,
  hideRequest,
  deleteRequest,
  showRequest,
  subscriptionRequest,
  setLocationRequest,
  subscriptionLogRequest
} from './UserSagas'

import { messagesHistoryRequest, messageSendRequest, messageSendPlusRequest } from './MessagesSagas'
import { pusherCreate } from './PusherSagas'
import { getInstagramMediaRequest, getInstagramMediaArrayRequest } from './InstagramSagas'
import { like, dislike, getUsersWhoLiked, getTotalUsersWhoLiked } from './LikeSagas'
import { takeEvery } from 'redux-saga';

const api = API.create()
const instagramApi = InstagramApi.create()

export default function * root () {
  yield all([
    takeLatest(LoginTypes.LOGIN_REQUEST, loginRequest, api),
    takeLatest(LoginTypes.SMS_LOGIN_REQUEST, smsLoginRequest, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logoutRequest, api),
    takeLatest(LoginTypes.FETCH_STARTUP, fetchStartup, api),
    takeLatest(DictTypes.DICT_REQUEST, dictRequest, api),
    takeLatest(VenuesTypes.VENUES_REQUEST, venuesRequest, api),
    takeLatest(VenueTypes.VENUE_REQUEST, venueRequest, api),
    takeLatest(UsersTypes.ACTIVE_USERS_REQUEST, activeUsersRequest, api),
    takeLatest(UsersTypes.NEW_USERS_REQUEST, newUsersRequest, api),
    takeLatest(UsersTypes.FILTER_USERS_REQUEST, filterUsersRequest, api),
    takeLatest(UserTypes.SET_USER, userChangeRequest, api),
    takeLatest(UserTypes.ADD_PHOTO_REQUEST, addPhotoRequest, api),
    takeLatest(UserTypes.DELETE_PHOTO_REQUEST, deletePhotoRequest, api),
    takeLatest(UserTypes.SYNC_INSTAGRAM_REQUEST, syncInstagramRequest, api),
    takeLatest(UserTypes.GET_USER_REQUEST, getUserRequest, api),
    takeLatest(UserTypes.CLEAN_INSTAGRAM_REQUEST, cleanInstagramRequest, api),
    takeLatest(UserTypes.DELETE_REQUEST, deleteRequest, api),
    takeLatest(UserTypes.HIDE_REQUEST, hideRequest, api),
    takeLatest(UserTypes.SHOW_REQUEST, showRequest, api),
    takeLatest(UserTypes.SUBSCRIPTION_REQUEST, subscriptionRequest, api),
    takeLatest(UserTypes.SET_LOCATION, setLocationRequest, api),
    takeLatest(PeopleTypes.PEOPLE_REQUEST, peopleRequest, api),
    takeLatest(SettingsTypes.SET_SETTINGS, onSettingsChange, api),
    takeLatest(SettingsTypes.EDIT_SETTINGS, onSettingsChange, api),
    takeEvery(LikeTypes.LIKE_REQUEST, like, api),
    takeEvery(LikeTypes.DISLIKE_REQUEST, dislike, api),
    takeLatest(LikeTypes.LIKED_REQUEST, getUsersWhoLiked, api),
    takeLatest(LikeTypes.TOTAL_REQUEST, getTotalUsersWhoLiked, api),
    takeLatest(PersonTypes.PERSON_REQUEST, personRequest, api),
    takeLatest(PersonTypes.UNMATCH_REQUEST, unmatchRequest, api),
    takeLatest(PersonTypes.REPORT_REQUEST, reportRequest, api),
    takeLatest(PersonTypes.BLOCK_REQUEST, blockRequest, api),
    takeLatest(DialogsTypes.DIALOGS_REQUEST, dialogsRequest, api),
    takeLatest(DialogsTypes.TOTALS_REQUEST, totalsRequest, api),
    takeLatest(MessagesTypes.MESSAGES_HISTORY_REQUEST, messagesHistoryRequest, api),
    takeLatest(MessagesTypes.MESSAGE_SEND_REQUEST, messageSendRequest, api),
    takeLatest(MessagesTypes.MESSAGE_SEND_PLUS_REQUEST, messageSendPlusRequest, api),
    takeLatest(MatchedUsersTypes.MATCHED_USERS_REQUEST, matchedUsersRequest, api),
    takeLatest(PusherTypes.CREATE_PUSHER, pusherCreate, api),
    takeLatest(InstagramTypes.GET_INSTAGRAM_MEDIA_REQUEST, getInstagramMediaRequest, instagramApi),
    takeLatest(InstagramTypes.GET_INSTAGRAM_MEDIA_ARRAY_REQUEST, getInstagramMediaArrayRequest, instagramApi),
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest('SUBSRIPTION_LOG_REQUEST', subscriptionLogRequest, api)
  ])
}
