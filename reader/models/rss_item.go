package models

import (
	"time"
)

type RssItem struct {  
	Title        string  
	Source       string  
	SourceURL    string  
	Link         string  
	PublishDate  time.Time  
	Description  string
}