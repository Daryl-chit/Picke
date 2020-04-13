import { range, filter, map } from 'ramda'
import { filterWithIndex } from 'Utils/Data'
import { getHeightByFeet } from 'Tools'
import { SCREEN_SECTIONS } from './Constants'

export function getStepIndicatorParams({ current, total }) {
  return range(0, total).map(e => (e <= current))
}

export function withGenderFilter(gender, items) {
  return filter((item) => item.gender === gender, items)
}

export const userDetailsTransformer = {
  height: (value, field) => getHeightByFeet(value),
  bodyType: (value, field, ...args) => {
    if (value) {
      const filtered = filter((item) => value.indexOf(item.type) !== -1 && item.gender === args[1], args[0])
      return map((i) => i.id, filtered)
    } else {
      return null
    }
  },
  occupation: (value, field, ...args) => {
    if (value) {
      const filtered = filter((item) => value.indexOf(item.occupation) !== -1, args[0])
      return map((i) => i.occupation, filtered)
    } else {
      return null
    }
  },
  ethnicity: (value, field, ...args) => {
    if (value) {
      const filtered = filter((item) => value.indexOf(item.ethnicity) !== -1, args[0])
      return map((i) => i.id, filtered)
    } else {
      return null
    }
  },
  religion: (value, field, ...args) => {
    if (value) {
      const filtered = filter((item) => value.indexOf(item.religion) !== -1, args[0])
      return map((i) => i.id, filtered)[0]
    } else {
      return null
    }
  }
}
