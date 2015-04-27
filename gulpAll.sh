#!/bin/bash
echo "Getting Movies"
gulp getMovies
sleep 3
echo "Getting Actors"
gulp getMovieActors
sleep 3
echo "Getting Reviews"
gulp getMovieReviews
sleep 3
echo "Getting Actor Tweets"
gulp getMovieActorTweets
sleep 3
echo "Getting Movie Tweets"
gulp getMovieTweets
