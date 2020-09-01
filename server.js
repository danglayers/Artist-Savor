// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const bodyParser = require('body-parser');
// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");
//const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
//require("./routes/artist-api-routes.js")(app);
//require("./routes/transaction-api-routes.js")(app);
// Set Handlebars.
const exphbs = require("express-handlebars");
//handlebars required setup engine and default layout
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// When connecting Handlebars to the Express app...



// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
