
const path = require("path");
const PORT = process.env.PORT || 8080;
const express = require("express");

const app = express();

// HOW DATA IS HANDLED: Server will use this to interpret data it handles
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// ROUTES: The map the router will follow
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// LISTENER: Displays in the console when program starts
app.listen(PORT, function () {
    console.log("Friend finder is active on PORT: " + PORT);
});