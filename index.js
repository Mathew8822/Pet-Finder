// import the pets array from data.js
const pets = require("./data");

// init express app
const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");

const home = path.join(__dirname, "public", "index.html");
// GET - / - returns homepage
app.get("/", (req, res) => {
  // serve up the public folder as static index.html file
  res.sendFile(home);
});

// hello world route
app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// get all pets from the database, if successfull should throw 200 status
app.get("/api/v1/pets", (req, res) => {
  const pets = [
    { id: 1, name: "Freya", owner: "Casey" },
    { id: 2, name: "Henry", owner: "Holly" },
    { id: 3, name: "Zoey", owner: "Carly" },
  ];
  res.status(200).json({ pets: pets });
  // send the pets array as a response
});

// get pet by owner with query string
app.get("/api/v1/pets/Casey", (req, res) => {
  const pets = [
    { id: 1, name: "Freya", owner: "Casey" },
    { id: 2, name: "Henry", owner: "Holly" },
    { id: 3, name: "Zoey", owner: "Carly" },
  ];
  // get the owner from the request

  // find the pet in the pets array
  const owner = req.params.owner;
  console.log("Owner", owner);
  const pet = pets.find((pet) => pet.owner === owner);
  console.log("Found Pet:", pet);
  if (!pet) {
    return res.status(404).json({ message: "Owner not found" });
  }
  res.json(pet);

  // send the pet as a response
});

// get pet by name
app.get("/api/v1/pets/:name", (req, res) => {
  // get the name from the request
  const pets = [
    { id: 1, name: "Freya", owner: "Casey" },
    { id: 2, name: "Henry", owner: "Holly" },
    { id: 3, name: "Zoey", owner: "Carly" },
  ];
  // find the pet in the pets array
  const name = req.params.name;
  console.log("name", name);
  const pet = pets.find((pet) => pet.name === name);
  console.log("pet", pet);
  res.json(name);
  // send the pet as a response
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

module.exports = app;