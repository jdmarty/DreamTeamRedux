// require modules
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const compression = require("compression");

// require connection
const sequelize = require("./config/connection");

// Create a new sequelize store using the express-session package
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Basic App variables
const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create();

// Configure and link a session object with the sequelize store
const sess = {
  secret: "Super secret secret",
  cookie: {
    // expire session after 30 minutes
    maxAge: 1800000,
  },
  rolling: true,
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Compression middleware
app.use(compression({ filter: shouldCompress }));
function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }
  // fallback to standard filter function
  return compression.filter(req, res);
}

// Add express-session and store as Express.js middleware
app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// adding image path for server side image rendering
app.use(express.static("./public/img"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//seed Database
// require functions to create players database
const seedPlayers = require("./seeds/playerData");

// post route to seed database
app.post("/seeder", async (req, res) => {
  try {
    if (req.body.secret === process.env.secret) {
      await seedPlayers();
      res.status(200).json("database seeded");
    } else {
      res.status(400).json("failure");
    }
  } catch(err) {
    console.log(err);
    res.status(500).json(error);
  }
});

app.use(routes);

sequelize.sync({ force: false }).then(async () => {
  app.listen(PORT, () => console.log("Now listening"));
});
