// Select the form element from the DOM
const movieForm = document.querySelector("form");
// Select the input field where the user types the movie title
const search = document.querySelector("input");
// Select the container where movie results will be displayed
const result = document.querySelector(".result");
// Select the first message display element
const messageOne = document.querySelector("#message-1");
// Select the second message display element
const messageTwo = document.querySelector("#message-2");

// Add an event listener to the form for handling submissions
movieForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Get the trimmed value of the movie title input
  const title = search.value.trim();

  // If the title is empty, display an error message and exit
  if (!title) {
    messageOne.textContent = "Please enter a movie title!";
    return;
  }

  // Display a loading message while fetching movie data
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  // Fetch movie data from the server
  fetch(`/movie?title=${title}`)
    .then((response) => {
      // Check if the network response is successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
      console.log(data); // Log the data for debugging

      // Assume the server returns a list of movies
      const movieList = data.results;

      // Clear the previous results from the result container
      result.innerHTML = "";
      // Loop through the movie list and append each movie to the results
      movieList.forEach((movie) => {
        result.innerHTML += `
        <p>${movie.title}</p>
        `;
      });
    })
    .catch((error) => {
      // Handle and log errors that occur during the fetch or parsing process
      console.error("Error fetching movie data:", error);
      messageOne.textContent = "An error occurred. Please try again.";
    });
});
