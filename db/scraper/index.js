//modules and raw database
const fetch = require("isomorphic-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
// const rawStats = require('./rawStats.json')
const generatePlayers = require('./statsParser')

//scraper function to return image from basketball reference
const findImgUrl = async (name) => {
  //first five letters of last name
  let lastName = name.split(" ")[1]
  lastName = lastName.replace(/[^a-z]/gi, "");
  const ln1 = lastName.split("")[0].toLowerCase()
  const ln5 = lastName.split("").slice(0, 5).join("").toLowerCase();
  //first two letters of first name
  const firstName = name.split(" ")[0].replace(/[^a-z]/gi, "");
  const fn2 = firstName.split("").slice(0, 2).join("").toLowerCase();
  //make fetch request
  let url = `https://www.basketball-reference.com/players/${ln1}/${ln5}${fn2}01.html`;
  let response = await fetch(url);
  let text = await response.text();
  let dom = await new JSDOM(text);
  let image = dom.window.document.querySelector(".media-item");
  if (image) return image.firstChild.src
  //run another search at other dom
  else {
    url = `https://www.basketball-reference.com/players/${ln1}/${ln5}${fn2}02.html`;
    response = await fetch(url);
    text = await response.text();
    dom = await new JSDOM(text);
    image = dom.window.document.querySelector(".media-item");
    if (image) return image.firstChild.src;
    else return null
  }
};

//Async functions to add image url to players object
const output = []

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const start = async () => {
  //get current leaderboard from api
  const players = await generatePlayers();
  await asyncForEach(players, async (player) => {
    const imgUrl = await findImgUrl(player.player_name);
    player.img_url = imgUrl;
    output.push(player);
    console.log("Added " + player.player_name);
  });
  //stringify the output array in JSON format
  const data = JSON.stringify(output, null, 2);
  //write the out put file
  fs.writeFile("nbaStats2.json", data, (err) => {
    if (err) throw err;
    console.log("File Generated");
  });
}

start()
