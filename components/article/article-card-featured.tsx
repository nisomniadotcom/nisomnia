// TODO: add falback image

import * as React from "react"
import NextLink from "next/link"

import Image from "@/components/image"
import type { SelectArticle } from "@/lib/db/schema"
import { cn } from "@/lib/utils"

export interface ArticleCardFeaturedProps
  extends React.HTMLAttributes<HTMLDivElement> {
  article: Pick<SelectArticle, "title" | "featuredImage" | "slug">
}

const ArticleCardFeatured: React.FC<ArticleCardFeaturedProps> = (props) => {
  const { article, className } = props

  const { title, featuredImage, slug } = article

  return (
    <>
      <article
        className={cn(
          "whitspace-normal lg:min-h-fullll relative flex h-auto min-h-[280px] w-full flex-col items-center justify-end overflow-hidden rounded-xl",
          className,
        )}
      >
        <div className="h-full">
          <NextLink
            aria-label={title}
            className="after:absolute after:left-0 after:top-0 after:size-full after:rounded-xl after:bg-gradient-to-t after:from-[#282828] after:to-transparent after:transition-all"
            href={`/article/${slug}`}
          >
            <Image
              src={featuredImage}
              sizes="(max-width: 768px) 100px, (max-width: 1200px) 200px, 300px"
              className="aspect-video object-cover"
              alt={title}
              priority={true}
            />
          </NextLink>
        </div>
        <div className="absolute bottom-0 left-0 z-20 w-full p-5 md:px-4 md:py-5 min-[992px]:p-[25px]">
          <NextLink aria-label={title} href={`/article/${slug}`}>
            <h3
              className={`line-clamp-4 text-xl font-bold leading-[1.3] text-white`}
            >
              {title}
            </h3>
          </NextLink>
        </div>
      </article>
    </>
  )
}

export default ArticleCardFeatured
