import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import AUTH_EN from '@/features/auth/locales/en-US/auth.json'
import AUTH_VI from '@/features/auth/locales/vi-VN/auth.json'

import SHARED_EN from '@/features/shared/locales/en-US/shared.json'
import SHARED_VI from '@/features/shared/locales/vi-VN/shared.json'

import USER_EN from '@/features/user/locales/en-US/user.json'
import USER_VI from '@/features/user/locales/vi-VN/user.json'

import PRODUCT_EN from '@/features/product/locales/en-US/product.json'
import PRODUCT_VI from '@/features/product/locales/vi-VN/product.json'

import NOTIFICATION_EN from '@/features/notification/locales/en-US/notification.json'
import NOTIFICATION_VI from '@/features/notification/locales/vi-VN/notification.json'

import DISCOUNT_EN from '@/features/discount/locales/en-US/discount.json'
import DISCOUNT_VI from '@/features/discount/locales/vi-VN/discount.json'

export const locales = {
  'en-US': 'English',
  'vi-VN': 'Tiếng Việt'
} as const

export const resources = {
  'en-US': {
    auth: AUTH_EN,
    shared: SHARED_EN,
    user: USER_EN,
    product: PRODUCT_EN,
    notification: NOTIFICATION_EN,
    discount: DISCOUNT_EN
  },
  'vi-VN': {
    auth: AUTH_VI,
    shared: SHARED_VI,
    user: USER_VI,
    product: PRODUCT_VI,
    notification: NOTIFICATION_VI,
    discount: DISCOUNT_VI
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
