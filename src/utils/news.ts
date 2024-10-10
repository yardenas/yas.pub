import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { News } from '~/types';

const getNormalizedNews = async (news: CollectionEntry<'news'>): Promise<News> => {
  const { data } = news;
  const { publishDate: rawPublishDate = new Date(), title } = data;
  const publishDate = new Date(rawPublishDate);
  return {
    publishDate: publishDate,
    title: title,
  };
};

const load = async function (): Promise<Array<News>> {
  const news = await getCollection('news');
  const normalizedNews = news.map(async (news) => await getNormalizedNews(news));
  const results = (await Promise.all(normalizedNews)).sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf());
  return results;
};

let _news: Array<News>;

export const fetchNews = async (): Promise<Array<News>> => {
  if (!_news) {
    _news = await load();
  }
  return _news;
};

export const getNews = async () => {
  return await fetchNews();
};
