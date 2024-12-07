import { NavLink } from 'react-router'

export const Nav = () => {
  const activeStyle: React.CSSProperties = {
    '--background-color': 'var(--primary-focus)',
  }
  return (
    <nav className="container">
      <ul>
        <li>
          <strong>
            Dispo<em>flare</em>
          </strong>
        </li>
      </ul>
      <ul
        style={{
          gap: '1em',
        }}
      >
        <li>
          <NavLink
            to="/"
            end
            aria-label="Create"
            data-tooltip="Create"
            data-placement="bottom"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            ➕
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/manage"
            aria-label="Manage"
            data-tooltip="Manage"
            data-placement="bottom"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            📅
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/settings"
            aria-label="Settings"
            data-tooltip="Settings"
            data-placement="bottom"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            ⚙️
          </NavLink>
        </li> */}
      </ul>
    </nav>
  )
}
