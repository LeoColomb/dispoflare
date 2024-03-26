import { Milestone } from './Milestone.js'

export const Rule = ({ rule }: { rule: Rule }) => {
  return (
    <details>
      <summary
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <header
          style={{
            display: 'flex',
            flexGrow: '1',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {rule.matchers[0].value}
          <code>
            {rule.enabled
              ? rule.actions[0].type === 'worker'
                ? '⏲️ Deprecated'
                : '📨 Active'
              : '🗃️ Expired'}
          </code>
        </header>
      </summary>

      <article className="grid">
        <Milestone name="📨 Activate" date={rule.data?.activate} />
        <Milestone name="🗃️ Expire" date={rule.data?.expire} />
        <Milestone name="⏲️ Deprecate" date={rule.data?.deprecate} />
        <Milestone name="🗑️ Remove" date={rule.data?.remove} />
      </article>
      {/* <Form method="delete">
        <input type="text" name="zone" hidden value={rule.zone.id} readOnly />
        <input type="text" name="rule" hidden value={rule.tag} readOnly />
        <button type="submit" role="button" className="secondary">
          🗑️
        </button>
      </Form> */}
    </details>
  )
}
