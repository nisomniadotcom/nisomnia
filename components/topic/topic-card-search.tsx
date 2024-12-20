import * as React from "react"
import NextLink from "next/link"

import Image from "@/components/image"
import { Icon } from "@/components/ui/icon"
import type { SelectTopic } from "@/lib/db/schema"

type TopicDataProps = Pick<
  SelectTopic,
  "id" | "title" | "slug" | "featuredImage"
>

interface TopicCardSearchProps {
  topic: TopicDataProps
  isDashboard?: boolean
  onClick?: () => void
}

const TopicCardSearch: React.FC<TopicCardSearchProps> = (props) => {
  const { topic, isDashboard, onClick } = props

  const { id, title, slug, featuredImage } = topic

  return (
    <NextLink
      aria-label={title}
      href={isDashboard ? `/dashboard/topic/edit/${id}` : `/topic/${slug}`}
      className="mb-2 w-full"
      onClick={onClick}
    >
      <div className="flex flex-row rounded-xl p-1 hover:bg-accent">
        <div className="relative aspect-[1/1] h-[50px] w-auto max-w-[unset] overflow-hidden p-3">
          {featuredImage ? (
            <Image
              src={featuredImage}
              className="rounded-xl object-cover"
              alt={title}
            />
          ) : (
            <Icon.Topic className="size-4" />
          )}
        </div>
        <div className="ml-1 w-3/4">
          <h3 className="mt-2 text-sm font-medium lg:text-lg">{title}</h3>
        </div>
      </div>
    </NextLink>
  )
}

export default TopicCardSearch
