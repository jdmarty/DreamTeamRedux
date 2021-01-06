//project
const projectPlayer = async (e) => {
  const playerId = $(e.currentTarget).attr("data-playerId");
  const apiUrl = `/api/players/player/${playerId}`;
  const playerData = await $.get(apiUrl);
  console.log(playerData)
  console.log(playerData.img_url)
  $('#player-image').attr('src', playerData.img_url).data(playerData);
};

//Get players based on input name
const searchPlayers = async () => {
    const name = $('#player-name').val().trim();
    const apiUrl = `/api/players/name?search=${name}`;
    const players = await $.get(apiUrl);
    players.forEach(player => {
        const newPlayer = $('<li>')
            .attr('data-playerId', player.id)
            .text(player.player_name)
            .on('click', projectPlayer);
        $('#players-list').append(newPlayer)
    });
}

//add player to team
const addPlayer = (playerData) => {
    const newCol = $(`<div class="col">${playerData.player_name}</div>`)
    $('#players-current').append(newCol)
}

$('#search-players').on('click', searchPlayers);
$('#add-player').on('click', () => {
    const playerData = $('#player-image').data()
    addPlayer(playerData)
});