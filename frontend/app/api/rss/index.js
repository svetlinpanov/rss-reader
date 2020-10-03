import { getRssItemsMapper } from './mappers';
export { RssAPIFake } from './fake';

const apiUrl = 'http://localhost:8080/api/v1';

export class RssAPI {
  postRssUrls = async urls => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(urls),
    };
    const response = await fetch(`${apiUrl}/rss`, requestOptions);
    const data = await response.json();
    return data;
  };

  getRssUrls = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`${apiUrl}/rssUrls`, requestOptions);
    const data = await response.json();
    return data;
  };

  getRssItems = async () => {
    const requestOptions = {
      method: 'GET',
      // headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`${apiUrl}/rss`, requestOptions);
    const data = await response.json();
    const rssItems = getRssItemsMapper(data);
    const sortedItems = rssItems.sort((a, b) => b.publishDate - a.publishDate);
    return sortedItems;
  };
}
