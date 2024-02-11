import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Publication } from '~/types';

const getNormalizedPublication = async (publication: CollectionEntry<'publication'>): Promise<Post> => {
  const { id, slug: rawSlug = '', data } = publication;
  const { Content, remarkPluginFrontmatter } = await publication.render();

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
    metadata = {},
  } = data;

  const slug = cleanSlug(rawSlug); // cleanSlug(rawSlug.split('/').pop());
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;
  const category = rawCategory ? cleanSlug(rawCategory) : undefined;
  const tags = rawTags.map((tag: string) => cleanSlug(tag));

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate, category }),

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,

    category: category,
    tags: tags,
    author: author,

    draft: draft,

    metadata,

    Content: Content,
    // or 'content' in case you consume from API

    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const load = async function (): Promise<Array<Publication>> {
  const posts = await getCollection('publication');
  const normalizedPosts = posts.map(async (publication) => await getNormalizedPublication(publication));

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((publication) => !publication.draft);

  return results;
};
let _publications: Array<Publication>;

export const fetchPosts = async (): Promise<Array<Publication>> => {
  if (!_publications) {
    _publications = await load();
  }

  return _publications;
};

export const getPublications = async () => {
  const rawPublications = await getCollection('publication');
};
