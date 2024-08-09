#!/usr/bin/node
const request = require('request');
const filmID = process.argv[2];

function printCharacters(characters, index = 0) {
  if (index >= characters.length) return;

  request(characters[index], (err, res, body) => {
    if (!err && res.statusCode === 200) {
      console.log(JSON.parse(body).name);
      printCharacters(characters, index + 1);
    } else {
      console.error('Error fetching character:', err);
    }
  });
}

const endpoint = `https://swapi-api.hbtn.io/api/films/${filmID}`;

request(endpoint, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    const filmData = JSON.parse(body);
    const characters = filmData.characters;

    // Print characters in order
    printCharacters(characters);
  } else {
    console.error('Error fetching film:', error);
  }
});