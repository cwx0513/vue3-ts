import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)


const DEFAULT_FORMAT='YYYY-MM-DD HH:MM'

export function formatUtcString(utcString:string,formatString:string=DEFAULT_FORMAT){
  return dayjs.utc(utcString).utcOffset(8).format(formatString)
}