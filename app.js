// Import the express library for creating the web server
const express = require("express");
// Import the path module for working with file and directory paths
const path = require("path");
// Import the hbs library for rendering Handlebars templates
const hbs = require("hbs");
// Import the custom getMovieDetails function to fetch movie data
const getMovieDetails = require("./utils/movieApi");
// Import the `get` method from the request library (not used in this code, but included)
const { get } = require("request");

// Create an Express application
const app = express();

// Define paths for configuration
// Path to the public directory for serving static assets (CSS, JS, images)
const publicDirectoryPath = path.join(__dirname, "./public");
// Path to the views directory containing Handlebars templates
const viewsPath = path.join(__dirname, "./templates/views");
// Path to the partials directory for reusable Handlebars template fragments
const partialsPath = path.join(__dirname, "./templates/partials");

// Setup Handlebars as the view engine and configure template paths
app.set("view engine", "hbs"); // Set Handlebars as the view engine
app.set("views", viewsPath); // Set the location of the views folder
hbs.registerPartials(partialsPath); // Register the partials folder

// Setup static directory to serve static files like CSS and JS
app.use(express.static(publicDirectoryPath));

// Define routes
// Root route ("/") - Render the home page
app.get("", (req, res) => {
  res.render("index", {
    title: "Movie App", // Title to display on the page
    name: "Your Name", // Name to display on the page
  });
});

// Movie search route ("/movie") - Fetch and return movie details
app.get("/movie", async (req, res) => {
  // Check if the title query parameter is provided
  if (!req.query.title) {
    console.error("No title provided in query."); // Log an error if no title is provided
    return res.send({ error: "You must provide a movie title!" }); // Send an error response
  }

  try {
    console.log("Title received:", req.query.title); // Log the received title
    // Fetch movie details using the custom getMovieDetails function
    const data = await getMovieDetails(req.query.title, (data) => {
      res.send(data); // Send the fetched movie data as a response
    });
    // console.log("Movie data fetched:", data); // Debug log for fetched data (commented out)
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error("Error fetching movie details:", error.message);
    // Send an error response to the client
    res.send({ error: "Unable to fetch movie details" });
  }
});

// Start the server on the specified port (default is 3001)
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`); // Log a message indicating the server is running
});
