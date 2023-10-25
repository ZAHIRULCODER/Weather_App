import express from "express";
import { handleWeatherApi } from "../controllers/controller.js";

const routes = express.Router();

routes.get("/", handleWeatherApi);

export default routes;


