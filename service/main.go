package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/svetlinpanov/rss-reader/reader"
)

type app struct {
	Router *mux.Router
	urls   []string
}

func (a *app) get(w http.ResponseWriter, r *http.Request) {
	items, err := reader.Parse(a.urls)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
	}
	respondWithJSON(w, http.StatusOK, items)
}

func (a *app) getUrls(w http.ResponseWriter, r *http.Request) {
	if a.urls != nil {
		respondWithJSON(w, http.StatusOK, a.urls)
	} else {
		respondWithJSON(w, http.StatusOK, "")
	}
}

func (a *app) post(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&a.urls); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	defer r.Body.Close()
	respondWithJSON(w, http.StatusOK, a.urls)
}

func notFound(w http.ResponseWriter, r *http.Request) {
	respondWithError(w, http.StatusNotFound, "not found")
}

// InitializeApi starts the rest API
func (a *app) InitializeAPI() {
	a.Router = mux.NewRouter()
	api := a.Router.PathPrefix("/api/v1").Subrouter()
	api.HandleFunc("/rss", a.get).Methods(http.MethodGet)
	api.HandleFunc("/rssUrls", a.getUrls).Methods(http.MethodGet)
	api.HandleFunc("/rss", a.post).Methods(http.MethodPost)
	api.HandleFunc("/", notFound)
}

func (a *app) Run(addr string) {
	log.Fatal(http.ListenAndServe(addr, a.Router))
}

func main() {
	a := app{}
	a.InitializeAPI()
	a.Run(":8080")
}

func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	if response != nil {
		w.Write(response)
	} else {
		w.Write([]byte(""))
	}
}
