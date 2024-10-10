import { z, defineCollection } from 'astro:content';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

const publicationCollection = defineCollection({
  schema: z.object({
    publishDate: z.date(),
    title: z.string(),
    link: z.string().url().optional(),
    code: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    authors: z.array(z.string()),
    venue: z.string().optional(),
  }),
});

const talkCollection = defineCollection({
  schema: z.object({
    publishDate: z.date(),
    title: z.string(),
    link: z.string().url().optional(),
    location: z.string().optional(),
  }),
});

const thoughtCollection = defineCollection({
  schema: z.object({
    publishDate: z.date(),
    title: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const newsCollection = defineCollection({
  schema: z.object({
    publishDate: z.date(),
    title: z.string(),
  }),
});

export const collections = {
  post: postCollection,
  publication: publicationCollection,
  thought: thoughtCollection,
  news: newsCollection,
  talks: talkCollection,
};
