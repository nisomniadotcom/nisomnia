import * as React from "react"
import type { Metadata } from "next"
import dynamicFn from "next/dynamic"

import env from "@/env"
import type { LanguageType } from "@/lib/validation/language"

const DashboardTopicContent = dynamicFn(async () => {
  const DashboardTopicContent = await import("./content")
  return DashboardTopicContent
})

export async function generateMetadata(props: {
  params: Promise<{ locale: LanguageType }>
}): Promise<Metadata> {
  const params = await props.params
  const { locale } = params

  return {
    title: "Topic Dashboard",
    description: "Topic Dashboard",
    alternates: {
      canonical: `${env.NEXT_PUBLIC_SITE_URL}/dashboard/topic`,
    },
    openGraph: {
      title: "Topic Dashboard",
      description: "Topic Dashboard",
      url: `${env.NEXT_PUBLIC_SITE_URL}/dashboard/topic`,
      locale: locale,
    },
  }
}

export default function DashboardTopicPage() {
  return <DashboardTopicContent />
}
