package models

// Based on RSS 2.0 specification: https://validator.w3.org/feed/docs/rss2.html
// Item struct for each Item in the Channel
type Item struct {
	Title       string          `xml:"title"`
	Link        string          `xml:"link"`
	Description string          `xml:"description"`
	Author      string          `xml:"author"`
	Category    []string        `xml:"category"`
	Comments    string          `xml:"comments"`
	Enclosure   []ItemEnclosure `xml:"enclosure"`
	GUID        string          `xml:"guid"`
	PubDate     string          `xml:"pubDate"`
	Source      ItemSource      `xml:"source"`
}
