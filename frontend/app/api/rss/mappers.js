export const rssItemMapper = rssItem => ({
  title: rssItem.title,
  source: rssItem.source,
  sourceUrl: rssItem.sourceUrl,
  link: rssItem.link,
  publishDate: new Date(rssItem.publishDate),
  description: rssItem.description,
});

export const getRssItemsMapper = res => res.map(rssItemMapper);

// Title       string    `json:"title"`
// Source      string    `json:"source"`
// SourceURL   string    `json:"sourceUrl"`
// Link        string    `json:"link"`
// PublishDate time.Time `json:"publishDate"`
// Description string    `json:"description"`
