## Reader package 
Reader package used for parsing multiple rss feeds asynchronously

To install it in you project run:
go get -v github.com/svetlinpanov/rss-reader/reader@0.2-alpha

It exports a function Parse(urls []string) which accepts array of urls and returns 

type RssItem struct {
	Title       string    `json:"title"`
	Source      string    `json:"source"`
	SourceURL   string    `json:"sourceUrl"`
	Link        string    `json:"link"`
	PublishDate time.Time `json:"publishDate"`
	Description string    `json:"description"`
}