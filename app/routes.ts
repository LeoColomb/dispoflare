import { type RouteConfig, route, index } from '@react-router/dev/routes'

export default [
  index('./routes/_index.tsx'),
  route('manage', './routes/manage.tsx'),
  route('settings', './routes/settings.tsx'),
] satisfies RouteConfig
