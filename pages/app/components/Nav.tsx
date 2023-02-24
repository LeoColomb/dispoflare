import { NavLink } from '@remix-run/react'

export const Nav = () => {
  const activeStyle = {
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
      <ul>
        <li>
          <NavLink
            to="/"
            end
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            ➕ Create
          </NavLink>
        </li>
        <li>
          <NavLink
            to="manage"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            👌 Manage
          </NavLink>
        </li>
        <li>
          <NavLink
            to="settings"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            ⚙️ Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
