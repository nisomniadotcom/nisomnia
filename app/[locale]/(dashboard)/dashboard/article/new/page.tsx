import * as React from "react"
import type { Metadata } from "next"
import dynamicFn from "next/dynamic"

import env from "@/env"
import { getCurrentSession } from "@/lib/auth/session"
import type { LanguageType } from "@/lib/validation/language"

const CreateArticleForm = dynamicFn(async () => {
  const CreateArticleForm = await import("./form")
  return CreateArticleForm
})

export async function generateMetadata(props: {
  params: Promise<{ locale: LanguageType }>
}): Promise<Metadata> {
  const params = await props.params
  const { locale } = params

  return {
    title: "Create Article Dashboard",
    description: "Create Article Dashboard",
    alternates: {
      canonical: `${env.NEXT_PUBLIC_SITE_URL}/dashboard/article/new`,
    },
    openGraph: {
      title: "Create Article Dashboard",
      description: "Create Article Dashboard",
      url: `${env.NEXT_PUBLIC_SITE_URL}/dashboard/article/new`,
      locale: locale,
    },
  }
}

export default async function CreateArticlesDashboard() {
  const { user } = await getCurrentSession()

  return <CreateArticleForm user={user!} />
}
