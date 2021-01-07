$(document).ready(() => {
  //identify DOM elements
  const $homeTeamSelect = $(".home-team-select");
  const $awayTeamSelect = $(".away-team-select");
  const $scoreboard = $(".scoreboard");

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
  const printStatsTable = (game) => {
    //set headers
    $("#home-stats-name").text(game.homeTeam.name);
    $("#away-stats-name").text(game.awayTeam.name);
    //empty the old stats data id any
    $("#home-stats-body").empty();
    $("#away-stats-body").empty();

    //function to print a row of stats for a player
    const printStatsRow = (player, table) => {
      //create and append a new row of stats
      const $newRow = $("<tr>");
      table.append($newRow);
      //append data to appropriate data cells
      $newRow.append(`<th class='player-stats-name'>${player.name}</th>`);
      $newRow.append(`<td>${player.gameStats.points}</td>`);
      $newRow.append(`<td>${player.gameStats.assists}</td>`);
      $newRow.append(`<td>${player.gameStats.rebounds}</td>`);
      $newRow.append(`<td>${player.gameStats.steals}</td>`);
      $newRow.append(`<td>${player.gameStats.blocks}</td>`);
    };
    //run above function for each player on home team
    const sortedHomeScores = game.homeTeam.players.sort(
      (a, b) => b.gameStats.points - a.gameStats.points
    );
    sortedHomeScores.forEach((player) => {
      //print points to each player card
      const $playerCard = $("#home-player-list").find(
        `[data-playerId="${player.id}"]`
      );
      $playerCard
        .find(".player-points")
        .text(`Points: ${player.gameStats.points}`);
      //print stats table row
      printStatsRow(player, $("#home-stats-body"));
    });

    //run again for each player on away team
    const sortedAwayScores = game.awayTeam.players.sort(
      (a, b) => b.gameStats.points - a.gameStats.points
    );
    sortedAwayScores.forEach((player) => {
      //print points to each player card
      const $playerCard = $("#away-player-list").find(
        `[data-playerId="${player.id}"]`
      );
      $playerCard
        .find(".player-points")
        .text(`Pts: ${player.gameStats.points}`);
      //print stats table row
      printStatsRow(player, $("#away-stats-body"));
    });
  };

  const printGameLog = (game) => {
    //set headers
    $("#home-log-name").text(game.homeTeam.name);
    $("#away-log-name").text(game.awayTeam.name);
    //empty the old log data id any
    $("#stats-log-body").empty();

    //function to print a row of the game log
    const printGameLogRow = (pos) => {
      //create and append a new row
      const $newRow = $("<tr>");
      $("#stats-log-body").append($newRow);
      //if the item in the array is a string, append a merged column
      if (typeof pos === "string") {
        $newRow.append(`<th class="table-secondary" colspan="5">${pos}</th>`);
        //otherwise...
      } else {
        //append the current scores
        $newRow.append(`<td>${pos.homeScore}</td>`);
        $newRow.append(`<td>${pos.awayScore}</td>`);
        //append a data cell for each item in the possession log
        pos.possession.forEach((obj) => {
          $newRow.append(`<td>${obj.type}: ${obj.player}</td>`);
        });
        //fill out any empty columns
        while ($newRow.children().length < 5) {
          $newRow.append("<td>");
        }
      }
    };

    //run the above function for each item in the log
    game.log.forEach((pos) => {
      printGameLogRow(pos);
    });
  };

  //function to update scoreboard in game
  const updateScoreboard = (game) => {
    //show the scoreboard and hid the stats
    $scoreboard.removeClass("d-none");
    $("#stats-link").hide();
    //print team names to the scoreboard
    $("#home-score-name").text(game.homeTeam.name);
    $("#away-score-name").text(game.awayTeam.name);
    //get the speed at which the game will run
    let gameSpeed;
    const gameSpeedSelection = $("#game-speed").val();
    switch (gameSpeedSelection) {
      case "1":
        gameSpeed = 5;
        break;
      case "2":
        gameSpeed = 20;
        break;
      case "3":
        gameSpeed = 30;
        break;
      case "4":
        gameSpeed = 75;
        break;
      case "5":
        gameSpeed = 100;
        break;
      default:
        gameSpeed = 30;
        break;
    }
    const clearUpdate = () => clearInterval(updateScore);
    //start the interval
    let possession = 0;
    const updateScore = setInterval(() => {
      //if the log item is an object print the current score
      if (typeof game.log[possession] === "object") {
        $("#home-score-final").text(game.log[possession].homeScore);
        $("#away-score-final").text(game.log[possession].awayScore);
        if (game.log[possession].homeScore >= game.log[possession].awayScore) {
          $("#home-score-final").addClass('winning')
          $("#away-score-final").removeClass("winning");
        } else {
          $("#away-score-final").addClass("winning");
          $("#home-score-final").removeClass("winning");
        }
      //if the log item is a string update the header
      } else {
        $("#score-message").text(game.log[possession]);
      }
      //once you reach the end of the log
      if (possession > game.log.length - 3) {
        //stop the interval
        clearUpdate();
        //decide the message
        if (game.homeTeam.score > game.awayTeam.score) {
          $("#score-message").text(`${game.homeTeam.name} Win!`);
        } else {
          $("#score-message").text(`${game.awayTeam.name} Win!`);
        }
        //output the final scores
        $("#home-score-final").text(game.homeTeam.score);
        $("#away-score-final").text(game.awayTeam.score);
        $("#stats-link").show();
        //print full stats table
        printStatsTable(game);
        printGameLog(game);
      }
      possession++;
    }, gameSpeed);
  };

  //function to call api to get a game class
  const getGame = async () => {
    //get home team and away team ids
    const homeTeamId = $("#homeTeamMenuButton").attr("data-teamid");
    const awayTeamId = $("#awayTeamMenuButton").attr("data-teamid");
    //create url for api call
    const apiUrl = `/api/game?homeId=${homeTeamId}&awayId=${awayTeamId}`;
    //make api call to retrieve a completed game
    const game = await $.get(apiUrl);
    //run the udpdate score function
    updateScoreboard(game);
  };

  //add event listener to run game
  $("#runGame").on("click", getGame);

  //initialize function
  const init = () => {
    addHomeTeamLinks();
    addAwayTeamLinks();
  };

  init();
});
