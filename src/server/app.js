// Load-in env variables
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

// Setup empty JS object to act as endpoint for all routes
let travelPlannerData = {};

// Express to run server and routes
const express = require("express");

// Module to enable request via hyper text transfer protocol
const http = require("http");

// Type1: In-memory only datastore (no need to load the database)
var dataStore = require("nedb");

// Start up an instance of app
const app = express();

// External module to use fetch in Node js
const fetch = require("node-fetch");

/* Dependencies & Middleware */
const bodyParser = require("body-parser");
const cors = require("cors");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance for proxy server
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

//Create new database object and load database
const database = new dataStore({
  filename: "src/server/traveldatabase.db",
  autoload: true,
});
database.loadDatabase();

// Initialize all route with a callback function
app.get("/apiData", sendData);

// Callback function to complete GET '/all'
function sendData(req, res) {
  res.send(projectData);
}
