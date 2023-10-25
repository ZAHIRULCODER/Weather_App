import axios from "axios";

const units = "metric";
const defaultCity = "kolkata";

export const handleWeatherApi = async (req, res) => {
	let { city } = req.query;

	if (!city) {
		city = defaultCity;
	}

	try {
		const response = await axios.get(
			`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=${units}`
		);
		const weatherData = response.data;

		// Extract relevant data for rendering the template
		const cityName = weatherData.name;
		const country = weatherData.sys.country;
		const temperature = Math.ceil(weatherData.main.temp);
		const icon = weatherData.weather[0].icon;
		const weatherDescription = weatherData.weather[0].description;
		const feelsLike = Math.ceil(weatherData.main.feels_like);
		const humidity = weatherData.main.humidity;
		const windSpeed = weatherData.wind.speed;

		// Get current date and time
		const currentDate = new Date();
		const currentDay = currentDate.toLocaleDateString("en-US", {
			weekday: "long",
		});
		const currentFullDate = currentDate.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		const currentDateAmPm = currentDate.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
		});

		res.render("index", {
			city: cityName,
			country,
			temperature,
			icon,
			weatherDescription,
			feelsLike,
			humidity,
			windSpeed,
			currentDay,
			currentFullDate,
			currentDateAmPm,
		});
	} catch (error) {
		res.render("index", {
			error:
				"Please type city or country name. An error occurred while fetching data.",
		});
	}
};
