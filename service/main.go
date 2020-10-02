package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/svetlinpanov/rss-reader/reader"
)

var urls []string

func get(w http.ResponseWriter, r *http.Request) {
	items, err := reader.Parse(urls)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, err.Error())
	}
	respondWithJSON(w, http.StatusOK, items)
}

func getUrls(w http.ResponseWriter, r *http.Request) {
	if urls == nil {
		respondWithJSON(w, http.StatusOK, "")
	}
	respondWithJSON(w, http.StatusOK, urls)
}

func post(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&urls); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	defer r.Body.Close()
	respondWithJSON(w, http.StatusOK, urls)
}

func notFound(w http.ResponseWriter, r *http.Request) {
	respondWithError(w, http.StatusNotFound, "not found")
}

func main() {
	r := mux.NewRouter()

	api := r.PathPrefix("/api/v1").Subrouter()
	api.HandleFunc("/rss", get).Methods(http.MethodGet)
	api.HandleFunc("/rssUrls", getUrls).Methods(http.MethodGet)
	api.HandleFunc("/rss", post).Methods(http.MethodPost)
	api.HandleFunc("/", notFound)
	log.Fatal(http.ListenAndServe(":8080", r))
}

func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}
