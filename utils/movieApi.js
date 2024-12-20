// Import the axios library for making HTTP requests
const axios = require("axios");
// Import the json middleware from Express (not used in this file, but included here)
const { json } = require("express");
// Import the request library for making HTTP requests
const request = require("request");

// Function to fetch movie details from the TMDB API
const getMovieDetails = async (title, callback) => {
  // Construct the URL for the TMDB API endpoint using the movie title
  const url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;

  // Options for the HTTP request
  const options = {
    url, // The URL constructed above
    json: true, // Automatically parse the response body as JSON
    method: "GET", // HTTP method to use
    headers: {
      // HTTP headers to include in the request
      accept: "application/json", // Specify that we accept JSON responses
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDNjMzkxNjVhYTdhOTJmNjVjMTY2MzJlZmI3MWViNSIsIm5iZiI6MTczNDU1MzAyOS4xNDgsInN1YiI6IjY3NjMyZGM1NTVjZDJkZWM5OGZmZjc5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D5fEX9gMdxXYoyDXgdJ8BAq8obluChekv-CjzqSWP7c", // Bearer token for authentication
    },
  };

  // Log the request options for debugging
  console.log("Fetching data from TMDB API:", options);

  // Make the HTTP request using the `request` library
  request(options, (error, response) => {
    if (error) {
      // Log the error if there is an issue with the request
      console.log(error);
    } else if (response.statusCode !== 200) {
      // Log the error if the response status code is not 200 (OK)
      console.log(`Error: Received status code ${response.statusCode}`);
    } else {
      // If the request is successful, execute the callback function with the response body
      callback(response.body);
    }
  });
};

// Export the function to use it in other parts of the application
module.exports = getMovieDetails;
