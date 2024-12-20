import type { Metadata } from "next"
import NextLink from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import env from "@/env"
import { logout } from "@/lib/auth/logout"
import { getCurrentSession } from "@/lib/auth/session"
import { getI18n, getScopedI18n } from "@/lib/locales/server"
import type { LanguageType } from "@/lib/validation/language"

export async function generateMetadata(props: {
  params: Promise<{ adId: string; locale: LanguageType }>
}): Promise<Metadata> {
  const params = await props.params
  const { locale } = params

  return {
    title: "Profile",
    description: "Profile",
    alternates: {
      canonical: `${env.NEXT_PUBLIC_SITE_URL}/user/profile`,
    },
    openGraph: {
      title: "Profile",
      description: "Profile",
      url: `${env.NEXT_PUBLIC_SITE_URL}/user/profile`,
      locale: locale,
    },
  }
}

export default async function UserProfilePage() {
  const { session, user } = await getCurrentSession()

  const t = await getI18n()
  const ts = await getScopedI18n("user")

  if (!session) {
    return notFound()
  }

  return (
    <main className="min-h-screen pb-10">
      <div className="container mt-4 md:mt-10">
        <section>
          <h2 className="mb-[14px] text-base font-bold md:mb-6 md:text-2xl">
            {t("account")}
          </h2>
          <div className="mb-[14px] flex flex-wrap text-sm md:mb-6 md:text-base">
            <div className="w-[130px]">{ts("name")}</div>
            <div className="w-[calc(100%-130px)]">{user?.name}</div>
            <div className="mt-2 w-[130px]">{ts("email")}</div>
            <div className="mt-2 w-[calc(100%-130px)]">{user?.email}</div>
          </div>
          <div className="flex justify-start space-x-2">
            {user?.role.includes("author") ||
              (user?.role.includes("admin") && (
                <Button asChild variant="cool" className="rounded-full">
                  <NextLink href="/dashboard">{t("dashboard")}</NextLink>
                </Button>
              ))}
            <form action={logout}>
              <Button variant="danger" className="rounded-full">
                {t("logout")}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}
