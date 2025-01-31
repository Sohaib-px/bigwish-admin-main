import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  //{ key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'customers', title: 'Users', href: paths.dashboard.users, icon: 'users' },
  { key: 'task', title: 'Tasks', href: paths.dashboard.tasks, icon: 'plugs-connected' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  //{ key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  //{ key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
