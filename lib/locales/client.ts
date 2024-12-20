"use client"

import { createI18nClient } from "@karyana-yandi/next-international/client"

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useChangeLocale,
  useCurrentLocale,
} = createI18nClient({
  id: () => import("./id"),
  en: () => import("./en"),
})
