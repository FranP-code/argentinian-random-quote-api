const express = require("express");
const app = express();
const port = process.env.PORT || 8081;

//Allow Express respond with JSON files
app.use(express.json());

//Set master route for API V1
const masterRoute = express.Router();
app.use("/api/v1", masterRoute);

//Define endopoints
const APIv1Router = require("./routes/APIv1/APIv1Router.js");
masterRoute.use("/", APIv1Router);

//Initialize server
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
