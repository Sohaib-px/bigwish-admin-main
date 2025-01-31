export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    account: '/dashboard/account',
    users: '/dashboard',
    tasks: '/dashboard/task',
    settings: '/dashboard/settings',
    taskCreate: '/dashboard/task-create',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
