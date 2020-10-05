# rss-reader
Rss reeader written in go  and react
go version 1.15
react 16.9

The rss reader was tested and is able to parse the following urls:
http://feeds.bbci.co.uk/news/world/rss.xml \
https://www.aljazeera.com/xml/rss/all.xml \
https://news.yahoo.com/rss/ \
https://thewest.com.au/rss 

# To run the project with containers
Prerequisites:
docker, docker-compose
To run the project with docker \
command: docker-compose up -d --build


# To run the project manually
Prerequisites: install node, npm, go \
change front-end proxy url: /frontend/server/middlewares/addDevMiddlewares.js
line 28 from target: 'http://api:8080', to target: 'http://localhost:8080'  \
command:  \
go run ./service/main.go \
cd frontend  \
npm run start 