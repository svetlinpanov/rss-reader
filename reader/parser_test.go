package reader

import (
	"encoding/xml"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/svetlinpanov/rss-reader/reader/models"
)

func createTestData() []byte {
	file, _ := os.Open(filepath.Join("testdata/", "all.xml"))

	resp := &http.Response{Body: file}
	body, _ := ioutil.ReadAll(resp.Body)

	return body
}
func Test_parseRss(t *testing.T) {
	data := models.Rss{}
	body := createTestData()
	err := xml.Unmarshal(body, &data)
	assert.Nil(t, err)
	assert.NotNil(t, data)
	result, resultErr := convertToRssItems(&data.Channel)
	assert.Nil(t, resultErr)
	assert.NotNil(t, result)
	assert.Equal(t, len(result), len(data.Channel.Items))
}

func Test_convertToRssItems(t *testing.T) {
	data := models.Rss{}
	body := createTestData()
	xml.Unmarshal(body, &data)
	result, resultErr := convertToRssItems(&data.Channel)
	assert.Nil(t, resultErr)
	assert.NotNil(t, result)
	assert.Equal(t, len(result), len(data.Channel.Items))
	assert.False(t, result[0].PublishDate.IsZero())
}
