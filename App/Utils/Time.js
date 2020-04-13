import moment from 'moment-timezone'

export const convertUTCtoLocalFormat = datetime => moment.utc(datetime).local().format('YYYY-MM-DD HH:mm:ss')
export const convertUTCtoLocal = datetime => moment.utc(datetime).local().format('YYYY-MM-DD HH:mm:ss')

export const sortByDateTime = (a, b) => {
  const aDate = new Date(a.created_at).getTime()
  const bDate = new Date(b.created_at).getTime()
  return aDate - bDate
}
