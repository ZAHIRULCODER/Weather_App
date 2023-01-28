const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Serve the public folder as a static directory
app.use(express.static(path.resolve(__dirname, "public")));

// Set up EJS as the template engine
app.set("view engine", "ejs");

app.use("/", require("./server/routes/router"));


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
