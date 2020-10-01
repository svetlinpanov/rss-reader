package models

// ItemSource contains the url and the value of source tag
type ItemSource struct {
	URL   string `xml:"url,attr"`
	Title string `xml:",chardata"`
}
