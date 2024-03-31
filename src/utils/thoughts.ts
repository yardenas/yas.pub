import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Thought } from '~/types';

const getNormalizedThought = async (thought: CollectionEntry<'thought'>): Promise<Thought> => {
  const { data } = thought;
  const { Content } = await thought.render();
  const { publishDate: rawPublishDate = new Date(), title, tags: rawTags = [] } = data;
  const publishDate = new Date(rawPublishDate);
  const tags = rawTags;
  return {
    publishDate: publishDate,
    title: title,
    tags: tags,
    Content: Content,
  };
};

const load = async function (): Promise<Array<Thought>> {
  const thoughts = await getCollection('thought');
  const normalizedThoughts = thoughts.map(async (thought) => await getNormalizedThought(thought));
  const results = (await Promise.all(normalizedThoughts)).sort(
    (a, b) => b.publishDate.valueOf() - a.publishDate.valueOf()
  );
  return results;
};

let _thoughts: Array<Thought>;

export const fetchThoughts = async (): Promise<Array<Thought>> => {
  if (!_thoughts) {
    _thoughts = await load();
  }
  return _thoughts;
};

export const getThoughts = async () => {
  return await fetchThoughts();
};
