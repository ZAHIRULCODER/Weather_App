const express = require("express");
const request = require("request");
const router = express.Router();

router.get("/", (req, res) => {
  let city = req.query.city || "kolkata";
  let error = null;
  request(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b5b11a99de4ddbfd60181db3aeded6da&units=metric`,
    (error, response, body) => {
      if (response.statusCode !== 200) {
        error = response.statusMessage;
      }
      if (error) {
        res.render("index", { error: error });
        return;
      }
      let data = JSON.parse(body);
      let cityName = data.name;
      let country = data.sys.country;
      let temperature = Math.round(data.main.temp);
      let humidity = data.main.humidity;
      let weatherDescription = data.weather[0].description;
      let windSpeed = data.wind.speed;
      let icon = data.weather[0].icon;
      let feelsLike = Math.round(data.main.feels_like);
      let currentDate = new Date();
      let currentDateAmPm = currentDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      let currentDay = currentDate.toLocaleString("en-US", { weekday: "long" });
      let currentFullDate = currentDate.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      res.render("index", {
        cityName: cityName,
        country: country,
        temperature: temperature,
        humidity: humidity,
        weatherDescription: weatherDescription,
        windSpeed: windSpeed,
        icon: icon,
        feelsLike: feelsLike,
        currentDay: currentDay,
        currentDateAmPm: currentDateAmPm,
        currentFullDate: currentFullDate,
        error: error,
      });
    }
  );
});

module.exports = router;
