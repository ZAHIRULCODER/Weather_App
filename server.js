import express from "express";
import dotenv from "dotenv";
import routes from "./src/routes/routes.js";

const app = express();

// Load environment variables
dotenv.config();

app.use(express.urlencoded({ extended: true }));

// Serve the public folder as a static directory
app.use(express.static("public"));

// Set up EJS as the template engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Middleware to parse JSON requests
app.use(express.json());

app.use("/", routes);


app.listen(process.env.PORT, () => {
	console.log(`Server started on http://localhost:${process.env.PORT}`);
});
