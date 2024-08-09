#!/usr/bin/node
const request = require('request');
const filmID = process.argv[2];

function printCharacters(characters, index = 0) {
  if (index >= characters.length) return;

  request(characters[index], (err, res, body) => {
    if (!err) {
      console.log(JSON.parse(body).name);
      printCharacters(characters, index + 1);
    }
  });
}

const endpoint = `https://swapi-api.hbtn.io/api/films/${filmID}`;

request(endpoint, (error, response, body) => {
  if (!error) {
    const filmData = JSON.parse(body);
    const characters = filmData.characters;

    // Print characters in order
    printCharacters(characters);
  }
});