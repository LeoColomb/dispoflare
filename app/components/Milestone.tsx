import { IntlDate } from '~/components/IntlDate.js'

export const Milestone = ({
  name,
  date,
}: {
  name: string
  date: Date | string | undefined
}) => {
  return (
    (date && (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <strong>
          <IntlDate date={new Date(date)} />
        </strong>
        <small
          style={{
            textTransform: 'uppercase',
          }}
        >
          {name}d
        </small>
      </div>
    )) || <></>
  )
}
