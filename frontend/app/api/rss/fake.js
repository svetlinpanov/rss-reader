export class RssAPIFake {
  constructor() {
    this.rssItems = [
      {
        title: 'Presidential debate: Rules to change after Trump-Biden spat',
        source: '',
        sourceUrl: '',
        link: 'https://www.bbc.co.uk/news/election-us-2020-54366618',
        publishDate: '2020-10-01T08:52:10Z',
        description:
          "Tuesday's ugly and ill-tempered first US presidential debate is being widely condemned.",
      },
      {
        title:
          'Armenia-Azerbaijan conflict: Russia offers to host Nagorno-Karabakh peace talks',
        source: '',
        sourceUrl: '',
        link: 'https://www.bbc.co.uk/news/world-europe-54366616',
        publishDate: '2020-10-01T06:27:05Z',
        description:
          'The offer comes as Azerbaijan vows to fight for full control of the disputed Armenian-majority area.',
      },
    ];
  }

  postRssUrls = async () => [
    'http://feeds.bbci.co.uk/news/world/rss.xml',
    'https://www.aljazeera.com/xml/rss/all.xml',
    'https://news.yahoo.com/rss/',
    'https://thewest.com.au/rss',
  ];

  getRssUrls = async () => [
    'http://feeds.bbci.co.uk/news/world/rss.xml',
    'https://www.aljazeera.com/xml/rss/all.xml',
    'https://news.yahoo.com/rss/',
    'https://thewest.com.au/rss',
  ];

  getRssItems = async () => this.rssItems;
}
