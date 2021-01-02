$(document).ready(() => {
  //identify DOM elements
  const $homeTeamSelect = $(".home-team-select");
  const $awayTeamSelect = $(".away-team-select");
  const $scoreboard = $('.scoreboard');

  //add correct links to homeTeam dropdown menu items
  const addHomeTeamLinks = () => {
    //pull out the current path and search string
    const url = document.location;
    const urlExtension = url.pathname + url.search;
    for (let i = 0; i < $homeTeamSelect.length; i++) {
      let newUrlExtension;
      //pull the team id out of the current list item
      const teamId = $homeTeamSelect[i].dataset.teamid;
      //if there is already a home query, replace it
      if (urlExtension.match(/home=\d+/)) {
        newUrlExtension = urlExtension.replace(/home=\d+/, `home=${teamId}`);
        //if there is an away query, add the home query
      } else if (urlExtension.match(/\?away=\d+/)) {
        newUrlExtension = urlExtension + `&home=${teamId}`;
        //otherwise, add the home query
      } else {
        newUrlExtension = urlExtension + `?home=${teamId}`;
      }
      //attach the new extension as href for that link
      $homeTeamSelect[i].href = newUrlExtension;
    }
  };

  //add correct links to awayTeam dropdown menu items
  const addAwayTeamLinks = () => {
    //pull out the current path and search string
    const url = document.location;
    const urlExtension = url.pathname + url.search;
    for (let i = 0; i < $awayTeamSelect.length; i++) {
      let newUrlExtension;
      //pull the team id out of the current list item
      const teamId = $awayTeamSelect[i].dataset.teamid;
      //if there is already an away query, replace it
      if (urlExtension.match(/away=\d+/)) {
        newUrlExtension = urlExtension.replace(/away=\d+/, `away=${teamId}`);
        //if there is a home query, add the away query
      } else if (urlExtension.match(/\?home=\d+/)) {
        newUrlExtension = urlExtension + `&away=${teamId}`;
        //otherwise, add the away query
      } else {
        newUrlExtension = urlExtension + `?away=${teamId}`;
      }
      //attach the new extension as href for that link
      $awayTeamSelect[i].href = newUrlExtension;
    }
  };

  //function to print stats to modal table
  const printStatsTable = game => {
    //set headers
    $('#home-stats-name').text(game.homeTeam.name);
    $("#away-stats-name").text(game.awayTeam.name);
    //empty the old stats data id any
    $('#home-stats-body').empty();
    $("#away-stats-body").empty();
    //function to print a row of stats for a player
    const printStatsRow = (player, table) => {
      //create and append a new row of stats
      const $newRow = $('<tr>');
      table.append($newRow)
      $newRow.append(`<th class='player-stats-name'>${player.name}</th>`);
      $newRow.append(`<td>${player.gameStats.points}</td>`);
      $newRow.append(`<td>${player.gameStats.assists}</td>`);
      $newRow.append(`<td>${player.gameStats.rebounds}</td>`);
      $newRow.append(`<td>${player.gameStats.steals}</td>`);
      $newRow.append(`<td>${player.gameStats.blocks}</td>`);
    }
    //run above function for each player on home team
    const sortedHomeScores = game.homeTeam.players.sort((a,b) => b.gameStats.points-a.gameStats.points)
    sortedHomeScores.forEach(player => {
      //print points to each player card
      const $playerCard = $("#home-player-list").find(`[data-playerId="${player.id}"]`);
      $playerCard.find(".player-points").text(`Points: ${player.gameStats.points}`)
      //print stats table row
      printStatsRow(player, $('#home-stats-body'))
    })
    //run again for each player on away team
    const sortedAwayScores = game.awayTeam.players.sort((a,b) => b.gameStats.points-a.gameStats.points)
    sortedAwayScores.forEach(player => {
      //print points to each player card
      const $playerCard = $("#away-player-list").find(`[data-playerId="${player.id}"]`);
      $playerCard.find(".player-points").text(`Pts: ${player.gameStats.points}`);
      //print stats table row
      printStatsRow(player, $("#away-stats-body"));
    })
  }

  //function to call api to get a game class
  const getGame = async () => {
      //get home team and away team ids
      const homeTeamId = $('#homeTeamMenuButton').attr('data-teamid');
      const awayTeamId = $("#awayTeamMenuButton").attr("data-teamid");
      //create url for api call
      const apiUrl = `/api/game?homeId=${homeTeamId}&awayId=${awayTeamId}`
      //make api call to retrieve a completed game
      const game = await $.get(apiUrl);
      //print final to scoreboard
      $("#home-score-name").text(game.homeTeam.name);
      $("#away-score-name").text(game.awayTeam.name);
      $("#home-score-final").text(game.homeTeam.score);
      $("#away-score-final").text(game.awayTeam.score);
      if (game.homeTeam.score > game.awayTeam.score) {
        $('#score-message').text(`${game.homeTeam.name} Win!`)
      } else {
        $("#score-message").text(`${game.awayTeam.name} Win!`);
      }
      //show the scoreboard
      $scoreboard.removeClass('d-none');
      //print full stats table
      printStatsTable(game);
      console.log(game);
  }

  //add event listener to run game
  $('#runGame').on('click', getGame)

  //initialize function
  const init = () => {
    addHomeTeamLinks();
    addAwayTeamLinks();
  }

  init();
})
