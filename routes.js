"use strict";
const express = require("express");
const routes = express.Router();

const movies = [
  { id: 1, title: "The Lion King", year: 1994, animated: true },
  { id: 2, title: "Finding Nemo", year: 2003, animated: true },
  { id: 3, title: "Black Panther", year: 2018, animated: false },
  { id: 4, title: "The Godfather", year: 1972, animated: false },
];
let nextId = 5;
//GET /movies - respond with a JSON array of movies
routes.get("/movies", (req, res) => {
  res.json(movies);
});

routes.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404);
    // it will just send the message and not in JSON format.
    res.send(`No movie with id ${id} exists.`);
  }
});

routes.post("/movies", (req, res) => {
  //data will come in the body of the  request.
  //to get access to  body and it will takes JSON body into request
  // and turn into javascript object
  const movie = req.body;
  movie.id = nextId++;
  movies.push(movie);
  res.status(201);
  res.json(movie);
});
routes.delete("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = movies.findIndex((movie) => movie.id === id);
  if (index !== -1) {
    movies.splice(index, 1);
  }
  res.status(204);
  res.send();
});

//export routes for use in server.js
module.exports = routes;
