## Reader package 
Reader package used for parsing multiple rss feeds asynchronously

To install it in you project run:
go get github.com/svetlinpanov/rss-reader/reader/

It exports a function Parse(urls []string) which accepts array of urls and returns 

type RssItem struct {
	Title       string    `json:"title"`
	Source      string    `json:"source"`
	SourceURL   string    `json:"sourceUrl"`
	Link        string    `json:"link"`
	PublishDate time.Time `json:"publishDate"`
	Description string    `json:"description"`
}