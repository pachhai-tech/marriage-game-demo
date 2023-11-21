import { NextPage } from 'next'

const DateFormatter: NextPage<{ dateStr: string; showFullDate?: boolean }> = ({
  dateStr,
  showFullDate = false
}) => {
  const date = new Date(dateStr)
  const currentDate = new Date()

  // Check if the date is today
  const isToday =
    date.getUTCFullYear() === currentDate.getUTCFullYear() &&
    date.getUTCMonth() === currentDate.getUTCMonth() &&
    date.getUTCDate() === currentDate.getUTCDate()

  // Function to format the time part
  const formatTime = (date: Date) => {
    let hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    const strTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} ${ampm} UTC`
    return strTime
  }

  const formattedDate = `${date.getUTCFullYear()}-${String(
    date.getUTCMonth() + 1
  ).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`

  // Determine what to display based on whether the date is today
  let display
  if (isToday) {
    display = formatTime(date)
  } else if (showFullDate) {
    display = `${formattedDate} ${formatTime(date)}`
  } else {
    display = formattedDate
  }

  return <span>{display}</span>
}

export default DateFormatter
