package reader

import (
	"errors"
	"fmt"
	"net/http"
)

// Parse function which accepts array of urls and returns array of RssItem
func Parse(urls []string) ([]RssItem, error) {

	c := make(chan urlResponse)
	for _, url := range urls {
		go fetchURL(url, c)

	}
	result := make([]urlResponse, len(urls))
	items := []RssItem{}
	for i := range result {
		result[i] = <-c
		if result[i].status {
			rssItems, err := parseRss(result[i].response)
			if err != nil {
				fmt.Println(err, "error in parsing")
				return nil, err
			}
			fmt.Println(result[i].url, "is up.")
			items = append(items, rssItems...)
		} else {
			fmt.Println(result[i].url, "is down !!")
			return nil, errors.New("error in getting feeds")
		}
	}
	return items, nil
}

func fetchURL(url string, c chan urlResponse) {
	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	req.Header.Set("User-Agent", "Gofeed/1.0")
	resp, err := client.Do(req)

	if err != nil {
		// The website is down
		c <- urlResponse{url, resp, false}
	} else {
		// The website is up
		c <- urlResponse{url, resp, true}
	}
}

type urlResponse struct {
	url      string
	response *http.Response
	status   bool
}
