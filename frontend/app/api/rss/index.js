import axios from 'axios';

import { getRssItemsMapper } from './mappers';
export { RssAPIFake } from './fake';

const apiUrl = '/api/v1';

export class RssAPI {
  postRssUrls = async urls => {
    const requestOptions = {
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await axios.post(
      `${apiUrl}/rss`,
      JSON.stringify(urls),
      requestOptions,
    );
    return response.data;
  };

  getRssUrls = async () => {
    const requestOptions = {
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await axios.get(`${apiUrl}/rssUrls`, requestOptions);
    return response.data;
  };

  getRssItems = async () => {
    const requestOptions = {
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await axios.get(`${apiUrl}/rss`, requestOptions);
    const rssItems = getRssItemsMapper(response.data);
    const sortedItems = rssItems.sort((a, b) => b.publishDate - a.publishDate);
    return sortedItems;
  };
}
