import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import AUTH_EN from '@/features/auth/locales/en-US/auth.json'
import AUTH_VI from '@/features/auth/locales/vi-VN/auth.json'

import SHARED_EN from '@/features/shared/locales/en-US/shared.json'
import SHARED_VI from '@/features/shared/locales/vi-VN/shared.json'

import ACCOUNT_EN from '@/features/account/locales/en-US/account.json'
import ACCOUNT_VI from '@/features/account/locales/vi-VN/account.json'

import PRODUCT_EN from '@/features/product/locales/en-US/product.json'
import PRODUCT_VI from '@/features/product/locales/vi-VN/product.json'

import NOTIFICATION_EN from '@/features/notification/locales/en-US/notification.json'
import NOTIFICATION_VI from '@/features/notification/locales/vi-VN/notification.json'

export const locales = {
  'en-US': 'English',
  'vi-VN': 'Tiếng Việt'
} as const

export const resources = {
  'en-US': {
    auth: AUTH_EN,
    shared: SHARED_EN,
    account: ACCOUNT_EN,
    product: PRODUCT_EN,
    notification: NOTIFICATION_EN
  },
  'vi-VN': {
    auth: AUTH_VI,
    shared: SHARED_VI,
    account: ACCOUNT_VI,
    product: PRODUCT_VI,
    notification: NOTIFICATION_VI
  }
} as const

export const defaultNS = 'auth'

i18n.use(initReactI18next).init({
  resources,
  lng: 'en-US',
  ns: ['auth'],
  defaultNS,
  fallbackLng: 'vi-VN',
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})

export default i18n
