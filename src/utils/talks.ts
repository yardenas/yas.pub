import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Talk } from '~/types';

const getNormalizedTalk = (talk: CollectionEntry<'talks'>): Talk => {
  const { data } = talk;
  const { publishDate: rawPublishDate = new Date(), title, link } = data;
  const publishDate = new Date(rawPublishDate);
  return {
    publishDate: publishDate,
    title: title,
    link: link,
  };
};

const load = async function (): Promise<Array<Talk>> {
  const talks = await getCollection('talks');
  const normalizedTalks = talks.map((talk) => getNormalizedTalk(talk));
  const results = normalizedTalks.sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf());
  return results;
};

let _publications: Array<Talk>;

export const fetchTalks = async (): Promise<Array<Talk>> => {
  if (!_publications) {
    _publications = await load();
  }
  return _publications;
};

export const getTalks = async () => {
  return await fetchTalks();
};
