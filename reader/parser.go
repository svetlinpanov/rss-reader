package reader

import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/svetlinpanov/rss-reader/reader/models"
)

func parseRss(resp *http.Response) ([]RssItem, error) {
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	data := models.Rss{}
	err := xml.Unmarshal(body, &data) // Parse the XML into the structure
	if err != nil {
		return nil, err
	}
	return convertToRssItems(&data.Channel)
}

func convertToRssItems(channel *models.Channel) ([]RssItem, error) {
	items := []RssItem{}
	for _, item := range channel.Items {
		rssItem := RssItem{Title: item.Title, Source: item.Source.Title, SourceURL: item.Source.URL, Link: item.Link, Description: item.Description}

		// Most of the feeds use either RFC1123 or RFC1123Z
		// After the parsing everything is converted to UTC so we can sort them
		t1123Z, err := time.Parse(time.RFC1123Z, item.PubDate)
		if err != nil {
			t1123, err := time.Parse(time.RFC1123, item.PubDate)
			if err != nil {
				fmt.Println(err)
			} else {
				rssItem.PublishDate = t1123.UTC()
			}
		} else {
			rssItem.PublishDate = t1123Z.UTC()
		}
		items = append(items, rssItem)
	}
	return items, nil
}

// RssItem type for all feeds
type RssItem struct {
	// Title of the article
	Title       string    `json:"title"`
	Source      string    `json:"source"`
	SourceURL   string    `json:"sourceUrl"`
	Link        string    `json:"link"`
	PublishDate time.Time `json:"publishDate"`
	Description string    `json:"description"`
}
