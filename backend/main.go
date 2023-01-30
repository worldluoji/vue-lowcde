package main

import (
	"log"
	"net/http"
	"time"

	"backend/routers"

	"golang.org/x/sync/errgroup"
)

func main() {
	var eg errgroup.Group

	server := &http.Server{
		Addr:         ":8098",
		Handler:      routers.GetApiRouter(),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	eg.Go(func() error {
		err := server.ListenAndServe()
		if err != nil && err != http.ErrServerClosed {
			log.Fatal(err)
		}
		return err
	})

	if err := eg.Wait(); err != nil {
		log.Fatal(err)
	}
}
