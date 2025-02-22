import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Talk } from '~/types';

const getNormalizedTalk = (talk: CollectionEntry<'talks'>) => {
  const { data } = talk;
  const { publishDate: rawPublishDate = new Date(), title, link, location } = data;
  const publishDate = new Date(rawPublishDate);
  return {
    publishDate,
    title,
    link,
    location,
  };
};

const load = async function (): Promise<Array<Talk>> {
  const talks = await getCollection('talks');
  const normalizedTalks = talks.map((talk) => getNormalizedTalk(talk));
  const groupedTalks: Record<string, Talk> = {};
  normalizedTalks.forEach((talk) => {
    if (!groupedTalks[talk.title]) {
      groupedTalks[talk.title] = {
        title: talk.title,
        instances: [{ publishDate: talk.publishDate, location: talk.location }],
      };
    } else {
      groupedTalks[talk.title].instances.push({
        publishDate: talk.publishDate,
        location: talk.location,
      });
    }
  });

  const results = Object.values(groupedTalks).sort(
    (a, b) => b.instances[0].publishDate.valueOf() - a.instances[0].publishDate.valueOf()
  );

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
