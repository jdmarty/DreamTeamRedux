// check if a team can be viably created
const checkTeam = () => {
  const currentPlayers = $("#current-players").children().length;
  const teamName = $("#team-name").val().trim();
  if (currentPlayers === 5 && teamName) {
    $("#create-team").attr("disabled", false);
    $("#update-team").attr("disabled", false);
  } else {
    $("#create-team").attr("disabled", true);
    $("#update-team").attr("disabled", false);
  }
};

// Project a players details onto the card
const projectPlayer = async (e) => {
  // show player panel and add button
  $("#player-panel").show();
  $("#add-player").show();
  // get player data
  const playerData = $(e.currentTarget).data();
  // check the current player count
  const currentPlayers = $("#current-players").children().length;
  const includesPlayer = $("#current-players").find(`[data-playerId=${playerData.id}]`).length;
  // hide the add button if the team is full or has that player
  if (currentPlayers >= 5 || includesPlayer > 0) {
    $("#add-player").hide();
  }
  // set image to display player and store data
  const imgSource = playerData.img_url || "/img/logoman.jpg";
  $("#player-image").attr("src", imgSource).data(playerData);
  // set stats table
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

// Get players based on input name
const searchPlayers = async () => {
  // clear the current list
  $("#players-list").empty();
  // build and run api call
  const name = $("#search-name").val().trim().replace(/\s/, "%20");
  const apiUrl = `/api/players/name?search=${name}`;
  const players = await $.get(apiUrl);
  // create a list item for each player
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

// remove a player from a team
const removePlayer = (e) => {
  const thisPlayer = $(e.currentTarget).parent();
  thisPlayer.remove();
  $("#add-player").show();
};

// add player to team
const addPlayer = (playerData) => {
  // create new elements
  const newCard = $("<div>")
    .attr("data-playerId", playerData.id)
    .addClass("on-team-card animate fadeIn");
  const newRemove = $("<span>x</span>")
    .attr("type", "button")
    .addClass("remove-player")
    .on("click", removePlayer);
  const newName = $("<h5>")
    .addClass("on-team-name")
    .text(playerData.player_name);
  // assemble elements
  newCard.append(newRemove, newName);
  $("#current-players").append(newCard);
  // hide the add button
  $("#add-player").hide();
  // check if team is ready to create
  checkTeam();
};

// create a team
const createTeam = async () => {
  // get team name
  const teamName = $("#team-name").val().trim();
  // get playerIds
  const playerIds = [];
  const currentPlayers = $("#current-players").children();
  for (const key of currentPlayers) {
    playerIds.push(parseInt(key.dataset.playerid));
  }
  const body = {
    name: teamName,
    playerIds,
  };
  //make api call
  const { newTeam } = await $.post("/api/teams", body);
  //reset modal to display new team information
  $('#create-modal-title').text(newTeam.name + ' created!');
};

// update a team
const updateTeam = async () => {
  // get team name
  const teamName = $("#team-name").val().trim();
  // get team id
  const teamId = $("#team-name").attr("data-teamId");
  // get playerIds
  const playerIds = [];
  const currentPlayers = $("#current-players").children();
  for (const key of currentPlayers) {
    playerIds.push(parseInt(key.dataset.playerid));
  }
  const body = {
    name: teamName,
    playerIds,
  };
  //make API call
  await $.ajax({
    type: "PUT",
    url: "/api/teams/" + teamId,
    data: body,
  });
  //update modal
  $("#create-modal-title").text("Team updated!");
};

// delete a team
const deleteTeam = async () => {
  // get team id
  const teamId = $("#team-name").attr("data-teamId");
  console.log(teamId);
  // send delete request
  await $.ajax({
    type: "DELETE",
    url: "/api/teams/" + teamId,
  });
  // Redirect
  document.location.replace("/create-team");
};

// event listeners
$("#search-players").on("click", searchPlayers);
$("#add-player").on("click", () => {
  const playerData = $("#player-image").data();
  addPlayer(playerData);
});
$("#team-name").on("keyup", checkTeam);
$("#create-team").on("click", createTeam);
$("#update-team").on("click", updateTeam);
$("#delete-team-confirm").on("click", deleteTeam);
$(".remove-player").on("click", removePlayer);
