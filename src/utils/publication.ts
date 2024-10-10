import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Publication } from '~/types';

const getNormalizedPublication = (publication: CollectionEntry<'publication'>): Publication => {
  const { data } = publication;
  const {
    publishDate: rawPublishDate = new Date(),
    title,
    image,
    link,
    code,
    tags: rawTags = [],
    category: rawCategory,
    authors,
    venue,
  } = data;
  const publishDate = new Date(rawPublishDate);
  const category = rawCategory;
  const tags = rawTags;
  return {
    publishDate: publishDate,
    title: title,
    image: image,
    link: link,
    code: code,
    category: category,
    tags: tags,
    authors: authors,
    venue: venue,
  };
};

const load = async function (): Promise<Array<Publication>> {
  const publications = await getCollection('publication');
  const normalizedPublications = publications.map((publication) => getNormalizedPublication(publication));
  const results = normalizedPublications.sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf());
  return results;
};

let _publications: Array<Publication>;

export const fetchPublications = async (): Promise<Array<Publication>> => {
  if (!_publications) {
    _publications = await load();
  }
  return _publications;
};

export const getPublications = async () => {
  return await fetchPublications();
};
