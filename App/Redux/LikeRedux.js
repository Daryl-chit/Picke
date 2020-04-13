import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  likeRequest: ['userId'],
  likeSuccess: ['like', 'userId'],
  dislikeRequest: ['userId'],
  dislikeSuccess: ['dislike', 'userId'],
  likeFailure: ['problem'],
  likedRequest: ['lastLikeId'],
  likedSuccess: ['usersWhoLiked'],
  likedFailure: ['problem'],
  totalRequest: [],
  totalSuccess: ['totalWhoLiked'],
  totalFailure: ['problem'],
  likedClean: []
})

export const LikeTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  problem: null,
  like: null,
  dislike: null,
  likes: [],
  dislikes: [],
  usersWhoLiked: [],
  totalWhoLiked: null,
  clean: false
})

export const like = (state, action) => {
  let likedList = state.usersWhoLiked.asMutable()
  const likedIndex = likedList.findIndex(f => f.id === action.userId)
  const shouldRemove = (likedIndex > -1)
  if (shouldRemove) {
    likedList = likedList.filter(f => f.id !== action.userId)
  }
  return state.merge({
    fetching: false,
    error: false,
    likeError: null,
    like: null,
    usersWhoLiked: likedList,
    totalWhoLiked: shouldRemove ? state.totalWhoLiked - 1 : state.totalWhoLiked
  })
}

export const likedRequest = (state, action) => {
  return state.merge({ fetching: false, error: false, clean: action.lastLikeId ? false : true })
}

export const likeSuccess = (state, { like, userId }) => {
  const likes = state.likes.asMutable()
  likes.push(like)
  return state.merge({
    fetching: false,
    error: null,
    like,
    likes
  })
}

export const dislike = (state, action) => {
  let likedList = state.usersWhoLiked.asMutable()
  const likedIndex = likedList.findIndex(f => f.id === action.userId)
  const shouldRemove = (likedIndex > -1)
  if (shouldRemove) {
    likedList = likedList.filter(f => f.id !== action.userId)
  }
  return state.merge({
    fetching: false,
    error: false,
    dislike: null,
    usersWhoLiked: likedList,
    totalWhoLiked: shouldRemove ? state.totalWhoLiked - 1 : state.totalWhoLiked
  })
}

export const dislikeSuccess = (state, { dislike, userId }) => {
  const dislikes = state.dislikes.asMutable()
  dislikes.push(dislike)
  return state.merge({
    fetching: false,
    error: false,
    dislike,
    likeError: null,
    dislikes
  })
}

export const likeFailure = (state, action) => {
  return state.merge({ fetching: false, dislike: null, like: null, error: true, problem: action.problem })
}

export const likedFailure = (state, action) => {
  return state.merge({ fetching: false, dislike: null, like: null, error: true, problem: action.problem })
}

export const likedSuccess = (state, action) => {
  return state.merge({
    fetching: false,
    error: null,
    usersWhoLiked: [ ...state.usersWhoLiked, ...action.usersWhoLiked.users ],
    totalWhoLiked: action.usersWhoLiked.total,
    clean: false })
}

// state.usersWhoLiked.concat(action.usersWhoLiked.users)

export const totalRequest = (state, action) => {
  return state.merge({ fetching: false, error: false })
}

export const totalSuccess = (state, action) => {
  return state.merge({ fetching: false, error: null, totalWhoLiked: action.totalWhoLiked })
}

export const totalFailure = (state, action) => {
  return state.merge({ fetching: false, error: true, problem: action.problem })
}

export const clean = (state) => {
  return state.merge({ fetching: true, error: false, clean: true })
}

export const removeUserLocal = (state) => {
  return state.merge({ fetching: true, error: false, clean: true })
}
export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIKE_REQUEST]: like,
  [Types.DISLIKE_REQUEST]: dislike,
  [Types.LIKE_SUCCESS]: likeSuccess,
  [Types.DISLIKE_SUCCESS]: dislikeSuccess,
  [Types.LIKE_FAILURE]: likeFailure,
  [Types.LIKED_REQUEST]: likedRequest,
  [Types.LIKED_SUCCESS]: likedSuccess,
  [Types.LIKED_FAILURE]: likedFailure,
  [Types.TOTAL_REQUEST]: totalRequest,
  [Types.TOTAL_SUCCESS]: totalSuccess,
  [Types.TOTAL_FAILURE]: totalFailure,
  [Types.LIKED_CLEAN]: clean
})
