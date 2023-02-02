import { Form } from '@remix-run/react'
import { IntlDate } from '~/components/IntlDate'

export const Rule = ({ rule }: { rule: Rule }) => {
  return (
    <tr>
      <th scope="row">{rule.matchers[0].value}</th>
      <td>
        <kbd>
          {rule.enabled
            ? rule.actions[0].type === 'worker'
              ? 'Deprecated'
              : 'Active'
            : 'Expired'}
        </kbd>
      </td>
      <td>
        <IntlDate date={new Date(rule.data?.expire)} />
      </td>
      <td>
        {/* <Form method="delete">
          <input type="text" name="zone" hidden value={rule.zone.id} />
          <input type="text" name="rule" hidden value={rule.tag} />
          <button type="submit" role="button" className="secondary">
            🗑️
          </button>
        </Form> */}
      </td>
    </tr>
  )
}

// <article className="text-blue-600 underline">
//   <div className="grid">
//     <h4>{rule.matchers[0].value}</h4>
//     <IntlDate date={new Date(rule.data?.expire)} />
//     <button type="button" className="secondary">
//       🗑️
//     </button>
//   </div>
// </article>
