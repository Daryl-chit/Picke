import { filter, addIndex, map, reject, clone, indexOf, toUpper, tail, head, split, test, toLower } from 'ramda'
import { INCH_SIGN, FEET_SIGN } from 'Tools/index'

export const filterWithIndex = addIndex(filter)
export const mapWithIndex = addIndex(map)

export function pushOrRemoveIfExists(element, array) {
  let next = clone(array)
  if (indexOf(element, next) !== -1) {
    next = reject((el) => el === element, array)
  } else {
    next.push(element)
  }
  return next
}

export function capitalizeWords(str) {
  const fn = p => toUpper(head(p)) + tail(p)
  return map(fn, split(' ', toLower(str))).join(' ')
}

export function withPropFilter({ prop, value }, items) {
  return filter((item) => item[prop] === value, items)
}

export function heightToNumber(heightString) {
  return parseFloat(heightString.replace(FEET_SIGN, '.').replace(INCH_SIGN, ''))
}

export function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}