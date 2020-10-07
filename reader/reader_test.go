package reader

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_Parse(t *testing.T) {
	urls := []string{"http://feeds.bbci.co.uk/news/world/rss.xml",
		"https://www.aljazeera.com/xml/rss/all.xml",
		"https://news.yahoo.com/rss/",
		"https://thewest.com.au/rss"}
	result, err := Parse(urls)
	assert.Nil(t, err)
	assert.NotNil(t, result)
}

func Test_ParseInvalidUrls(t *testing.T) {
	urls := []string{"https://zz.com",
		"https://zz2.com"}
	result, err := Parse(urls)
	assert.Nil(t, result)
	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "error in getting feeds")
}

func Test_fetchURLValidUrl(t *testing.T) {
	c := make(chan urlResponse)
	url := "https://news.yahoo.com/rss/"
	result := urlResponse{}
	go fetchURL(url, c)
	result = <-c
	assert.NotNil(t, result)
	assert.Equal(t, result.status, true)
}

func Test_fetchURLInvalidUrl(t *testing.T) {
	c := make(chan urlResponse)
	url := "https://zz.com"
	result := urlResponse{}
	go fetchURL(url, c)
	result = <-c
	assert.NotNil(t, result)
	assert.Equal(t, result.status, false)
}
