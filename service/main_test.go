package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/svetlinpanov/rss-reader/reader"
)

var a app

func TestMain(m *testing.M) {
	a = app{}
	a.InitializeAPI()
	code := m.Run()
	os.Exit(code)
}
func TestGet(t *testing.T) {
	req, _ := http.NewRequest("GET", "/api/v1/rss", nil)
	response := executeRequest(req)
	// assert.Nil(t, err)
	assert.Equal(t, http.StatusOK, response.Code)
}
func TestPost(t *testing.T) {
	urls := []byte(`[
		"http://feeds.bbci.co.uk/news/world/rss.xml",
		"https://www.aljazeera.com/xml/rss/all.xml",
		"https://news.yahoo.com/rss/",
		"https://thewest.com.au/rss"
	]`)
	req, _ := http.NewRequest("POST", "/api/v1/rss", bytes.NewBuffer(urls))
	response := executeRequest(req)
	// assert.Nil(t, err)
	assert.Equal(t, http.StatusOK, response.Code)
}

func TestGetUrls(t *testing.T) {
	req, _ := http.NewRequest("GET", "/api/v1/rssUrls", nil)
	response := executeRequest(req)
	// assert.Nil(t, err)
	assert.Equal(t, http.StatusOK, response.Code)
}

func TestGetUrlsWithResults(t *testing.T) {
	a.urls = []string{
		"https://news.yahoo.com/rss/",
		"https://thewest.com.au/rss"}

	reqGet, _ := http.NewRequest("GET", "/api/v1/rssUrls", nil)
	responseGet := executeRequest(reqGet)

	body, _ := ioutil.ReadAll(responseGet.Body)
	data := []string{}
	err := json.Unmarshal(body, &data)
	assert.Nil(t, err)
	assert.NotNil(t, data)
	assert.Equal(t, http.StatusOK, responseGet.Code)
	assert.Equal(t, 2, len(data))
}

func TestGetFeeds(t *testing.T) {
	a.urls = []string{
		"https://news.yahoo.com/rss/",
		"https://thewest.com.au/rss"}

	reqGet, _ := http.NewRequest("GET", "/api/v1/rss", nil)
	responseGet := executeRequest(reqGet)

	body, _ := ioutil.ReadAll(responseGet.Body)
	data := []reader.RssItem{}
	err := json.Unmarshal(body, &data)
	assert.Nil(t, err)
	assert.NotNil(t, data)
}

func TestNotFound(t *testing.T) {
	req, _ := http.NewRequest("GET", "/", nil)
	response := executeRequest(req)
	assert.Equal(t, http.StatusNotFound, response.Code)
}

func executeRequest(req *http.Request) *httptest.ResponseRecorder {
	rr := httptest.NewRecorder()
	a.Router.ServeHTTP(rr, req)

	return rr
}

func checkResponseCode(t *testing.T, expected, actual int) {
	if expected != actual {
		t.Errorf("Expected response code %d. Got %d\n", expected, actual)
	}
}
