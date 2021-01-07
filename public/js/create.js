//globals
const logoImg =
  "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/logoman.png";
const currentPlayers = [];

//check if a team can be viably created
const checkTeam = () => {
    const currentPlayers = $("#current-players").children().length;
    const teamName = $('#team-name').val().trim();
    if (currentPlayers === 5 && teamName) {
        $('#create-team').attr('disabled', false)
    } else {
        $("#create-team").attr('disabled', true);
    }
}

//Project a players details onto the card
const projectPlayer = async (e) => {
  //show player panel and add button
  $('#player-panel').show();
  $("#add-player").show();
  //get player data
  const playerData = $(e.currentTarget).data();
  //check the current player count
  const currentPlayers = $('#current-players').children().length
  const includesPlayer = $('#current-players').find(`[data-playerId=${playerData.id}]`).length
  if (currentPlayers >= 5 || includesPlayer > 0) {
      $('#add-player').hide();
  }
  //set image to display player and store data
  const img_source = playerData.img_url || "/img/logoman.jpg";
  $("#player-image").attr("src", img_source).data(playerData);
  //set stats table
  $("#player-gp").text(playerData.gp);
  $("#player-pts").text(playerData.pts_total);
  const ppg = playerData.pts.toFixed(1);
  $("#player-ppg").text(ppg);
  const apg = playerData.ast.toFixed(1);
  $("#player-apg").text(apg);
  const rpg = playerData.reb.toFixed(1);
  $("#player-rpg").text(rpg);
  const fgp = (playerData.fgpct * 100).toFixed(1);
  $("#player-fgp").text(fgp);
  $("#player-name").text(playerData.player_name);
};

//Get players based on input name
const searchPlayers = async () => {
  //clear the current list
  $("#players-list").empty();
  //build and run api call
  const name = $("#search-name").val().trim().replace(/\s/, "%20");
  const apiUrl = `/api/players/name?search=${name}`;
  const players = await $.get(apiUrl);
  //create a list item for each player
  players.forEach((player) => {
    const newPlayer = $("<button>")
      .attr("type", "button")
      .attr("data-playerId", player.id)
      .data(player)
      .addClass("list-group-item list-group-item-action search-card")
      .text(player.player_name)
      .on("click", projectPlayer);
    $("#players-list").append(newPlayer);
  });
};

//add player to team
const addPlayer = (playerData) => {
  //create new elements
  const newCard = $("<div>")
    .attr("data-playerId", playerData.id)
    .addClass("on-team-card animate fadeIn");
  const newRemove = $("<span>x</span>")
    .attr("type", "button")
    .addClass("remove-player")
    .on('click', removePlayer);
  const newName = $("<h5>")
    .addClass("on-team-name")
    .text(playerData.player_name);
  //assemble elements
  newCard.append(newRemove, newName);
  $("#current-players").append(newCard);
  //hide the add button
  $("#add-player").hide();
  //check if team is ready to create
  checkTeam();
};

//remove a player from a team
const removePlayer = e => {
    const thisPlayer = $(e.currentTarget).parent();
    thisPlayer.remove();
    $("#add-player").show();
}

//create a team
const createTeam = async () => {
  //get team name
  const teamName = $('#team-name').val().trim();
  //get playerIds
  const playerIds = [];
  const currentPlayers = $("#current-players").children();
  for (let key of currentPlayers) {
      playerIds.push(parseInt(key.dataset.playerid))
  }
  const body = {
      name: teamName,
      playerIds
  }
  const newTeam = await $.post('/api/teams', body);
  if (newTeam) alert("New Team Created!")
}

//event listeners
$("#search-players").on("click", searchPlayers);
$("#add-player").on("click", () => {
  const playerData = $("#player-image").data();
  addPlayer(playerData);
});
$('#team-name').on("keyup", checkTeam);
$('#create-team').on("click", createTeam);