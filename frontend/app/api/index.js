import { RssAPIFake, RssAPI } from './rss';

const apis = {
  rss: null,
};

// TODO: undo this
if (process.env.NODE_ENV !== 'production') {
  apis.rss = new RssAPI();
} else {
  apis.rss = new RssAPIFake();
}

export default apis;
