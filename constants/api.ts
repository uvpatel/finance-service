// ─── API Constants ────────────────────────────────────────────────────────────

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'https://api.devangfinancial.com/api/v1';

export const API_TIMEOUT = 30_000; // 30 seconds

export const ENDPOINTS = {
  AUTH: {
    LOGIN:           '/auth/login',
    LOGOUT:          '/auth/logout',
    REFRESH:         '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    PROFILE:         '/auth/profile',
  },
  CUSTOMERS: {
    LIST:       '/customers',
    CREATE:     '/customers',
    UPDATE:     (id: number) => `/customers/${id}`,
    DELETE:     (id: number) => `/customers/${id}`,
    DETAIL:     (id: number) => `/customers/${id}`,
    FILES:      (id: number) => `/customers/${id}/files`,
    DOCUMENTS:  (id: number) => `/customers/${id}/documents`,
  },
  FILES: {
    LIST:   '/files',
    CREATE: '/files',
    UPDATE: (id: number) => `/files/${id}`,
    DELETE: (id: number) => `/files/${id}`,
  },
  DOCUMENTS: {
    LIST:   '/documents',
    UPLOAD: '/documents/upload',
    DELETE: (id: number) => `/documents/${id}`,
  },
  MASTER: {
    COMPANIES:        '/master/companies',
    DEALERS:          '/master/dealers',
    BROKERS:          '/master/brokers',
    FINANCE_COMPANIES:'/master/finance-companies',
    OWN_BANKS:        '/master/own-banks',
    INSURANCE:        '/master/insurance',
    EXPENSES:         '/master/expenses',
    AGENTS:           '/master/agents',
    RTO:              '/master/rto',
  },
  PAYMENT: {
    LIST:   '/payments',
    CREATE: '/payments',
    UPDATE: (id: number) => `/payments/${id}`,
  },
  COMMISSION: {
    LIST:   '/commissions',
    CREATE: '/commissions',
  },
  REPORTS: {
    RTO_PAYMENT:      '/reports/rto-payment',
    INSURANCE_PAYMENT:'/reports/insurance-payment',
    EXPENSE_OUT:      '/reports/expense-out',
    ADVANCE_DEALER:   '/reports/advance-dealer',
  },
  ADMIN: {
    USERS:       '/admin/users',
    CREATE_USER: '/admin/users',
    UPDATE_USER: (id: string) => `/admin/users/${id}`,
    DELETE_USER: (id: string) => `/admin/users/${id}`,
  },
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN:  'dfs_access_token',
  REFRESH_TOKEN: 'dfs_refresh_token',
  USER:          'dfs_user',
  REMEMBER_ME:   'dfs_remember_me',
} as const;
