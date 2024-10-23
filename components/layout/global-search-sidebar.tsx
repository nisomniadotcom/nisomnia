"use client"

import * as React from "react"

import ArticleCardSearch from "@/components/article/article-card-search"
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icon } from "@/components/ui/icon"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useI18n, useScopedI18n } from "@/lib/locales/client"
import { api } from "@/lib/trpc/react"
import type { LanguageType } from "@/lib/validation/language"
import SidebarItem from "./sidebar-item"

interface GlobalSearchSidebarProps {
  locale: LanguageType
}

const GlobalSearchSidebar: React.FC<GlobalSearchSidebarProps> = (props) => {
  const { locale } = props

  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [searched, setSearched] = React.useState<boolean>(false)

  const inputRef = React.useRef<HTMLInputElement>(null)

  const t = useI18n()
  const ts = useScopedI18n("search")

  const { data: articles } = api.article.search.useQuery(
    {
      searchQuery,
      language: locale,
    },
    {
      enabled: !!searched,
    },
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e.target.value
    setSearchQuery(value)
    setSearched(value.length > 2)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarItem icon={<Icon.Search />}>{t("search")}</SidebarItem>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="min-h-full w-full min-w-full">
          <form
            onSubmit={(e) => e.preventDefault()}
            autoComplete="off"
            className="my-5"
          >
            <Input
              type="search"
              name="q"
              onChange={handleSearchChange}
              autoComplete="off"
              placeholder={ts("placeholder")}
              required
              ref={inputRef}
            />
          </form>
          {searched && searchQuery && (
            <div className="space-y-4 bg-background">
              <ScrollArea className="h-[80vh]">
                {articles && articles.length > 0 && (
                  <>
                    <h4>{t("article")}</h4>
                    <div className="flex flex-col">
                      {articles.map((article) => (
                        <ArticleCardSearch
                          key={article.slug}
                          article={article}
                        />
                      ))}
                    </div>
                  </>
                )}
                {(!articles || articles.length === 0) && (
                  <p className="text-lg font-semibold">{ts("not_found")}</p>
                )}
              </ScrollArea>
            </div>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default GlobalSearchSidebar