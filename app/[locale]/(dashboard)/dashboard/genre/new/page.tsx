import * as React from "react"
import type { Metadata } from "next"
import dynamicFn from "next/dynamic"

import env from "@/env"
import type { LanguageType } from "@/lib/validation/language"

const CreateGenreForm = dynamicFn(async () => {
  const CreateGenreForm = await import("./form")
  return CreateGenreForm
})

export async function generateMetadata(props: {
  params: Promise<{ locale: LanguageType }>
}): Promise<Metadata> {
  const params = await props.params
  const { locale } = params

  return {
    title: "Create Genre Dashboard",
    description: "Create Genre Dashboard",
    alternates: {
      canonical: `${env.NEXT_PUBLIC_SITE_URL}/dashboard/genre/new`,
    },
    openGraph: {
      title: "Create Genre Dashboard",
      description: "Create Genre Dashboard",
      url: `${env.NEXT_PUBLIC_SITE_URL}/dashboard/genre/new`,
      locale: locale,
    },
  }
}

export default function CreateGenreDashboard() {
  return (
    <div className="mb-[100px] mt-4 flex items-end justify-end">
      <div className="flex-1 space-y-4">
        <CreateGenreForm />
      </div>
    </div>
  )
}
