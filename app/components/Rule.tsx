import { IntlDate } from '~/components/IntlDate'

export const Rule = ({ rule }: { rule: Rule }) => {
  return (
    <article className="text-blue-600 underline">
      <div className="grid">
        <h4>{rule.matchers[0].value}</h4>
        <IntlDate date={new Date(rule.data?.expire)} />
        <button type="button" className="secondary">
          🗑️
        </button>
      </div>
    </article>
  )
}
