$(document).ready(() => {
  //identify DOM elements
  const $homeTeamSelect = $(".home-team-select");
  const $awayTeamSelect = $(".away-team-select");

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
  //add links
  addHomeTeamLinks();
  addAwayTeamLinks();

  //function to call api to get a game class
  const getGame = async () => {
      //get home team and away team ids
      const homeTeamId = $('#homeTeamMenuButton').attr('data-teamid');
      const awayTeamId = $("#awayTeamMenuButton").attr("data-teamid");
      //create url for api call
      const apiUrl = `/api/game?homeId=${homeTeamId}&awayId=${awayTeamId}`
      //make api call to retrieve game class
      const game = await $.get(apiUrl);
      console.log(game);
  }

  //add event listener
  $('#runGame').on('click', getGame)





})
