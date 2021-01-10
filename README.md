# Dream Team
## NBA Fantasy Basketball Simulator

## Summary
Ever wondered if the 2015 Warriors could beat the '92 Dream Team in their prime? Wonder no more.

This application combines a database of the Top 1000+ scorers in NBA history and an internal API to simulate a full game of professional basketball between user created teams. Once a user has created an account, they can pick and choose players for their very own five man fantasy teams and pit these teams together in a javascript powered simulation engine to finally put those old locker room debates to rest, and determine which lineup reigns supreme.

Deployed Link: [https://dry-sierra-84720.herokuapp.com/](https://dry-sierra-84720.herokuapp.com/)

Repository: [https://github.com/jdmarty/DreamTeam](https://github.com/jdmarty/DreamTeam)

## Getting Started
New users must create an account to use this app. Enter your desired username, email address, and password in the Register panel on the landing page and click the Register button to create a new account

![Login Page](https://github.com/jdmarty/DreamTeam/blob/main/assets/login-screenshot.PNG)

Returning users can log in to their existing accounts using the Sign In panel

![Home Page](https://github.com/jdmarty/DreamTeam/blob/main/assets/home-screenshot.PNG)

## Creating and Updating Teams

To create a new team, click the Create Team button on the home page to be redirected to the team creator.
- Give your a team a name using the input bar at the top of the page. Note that the create/update team will be disabled until your team includes five players and a team name
- Search for a player that you would like to add in the Search Players input bar and click to submit to run a search.
- Click on a players name once the search completes to view their stats and be given the option to add them to a team
- If you would like to add this player to your team, click the Add To Team button at the bottom of their card. Players cannot be on a team more than once and a team cannot have more than five players.
- Click the "x" next to a players name on the current roster to remove them from the roster

![Update Team Page](https://github.com/jdmarty/DreamTeam/blob/main/assets/create-screenshot.PNG)

Update an existing team by selecting that team from the Update Team dropdown menu on the home page

## Running a Game

Once you are satisfied with your teams, click the Run Game button on the homepage or navigation bar to start simulating play.
- Select a Home and Away team from the dropdown menus at the top of the game page
- Once both teams are selected, a court will appear in the center of the page and you will be presented with the options to run a game or reset. There is also a dropdown menu to adjust the rate at which the simulation runs.

![Run Game Page](https://github.com/jdmarty/DreamTeam/blob/main/assets/game-screenshot.PNG)

- When you are ready to run a game at the selected speed, click Run Game to start a simulation. Scores will be printed as each possession resolves.
- Once the game is complete, click the See Full Stats link at the bottom of the scoreboard to view the complete box score and game log

-------------------------------------------------------

## Technologies
### Back End
- MySQL
- JawsDB
- Node.js
- Express
- Sequelize ORM

## Front End
- Bootstrap
- Handlebars
- jQuery

## Credits
This app was developed by a team of developers from the UCI Full Stack Flex Web Development program
- Andrew Novobilski
- Ben Shostak
- Ivan Flores
- Joshua Marty
- Lesley Worden

## License

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
This project uses the ISC license