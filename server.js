
const path = require("path");
const PORT = process.env.PORT || 8080;
const express = require("express");

const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// ROUTES
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);
app.listen(PORT, function () {
    console.log("Active on PORT: " + PORT);
});