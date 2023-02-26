type IntlDateProps = {
  date: Date
  timeZone?: string
}

export const IntlDate = ({ date, timeZone }: IntlDateProps) => {
  const isoString = date.toISOString()
  const formattedDate = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone,
  }).format(date)

  return <time dateTime={isoString}>{formattedDate}</time>
}
