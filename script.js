const apiKey = "9f49b178444a62e2c69aeeed96d626b8";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const errorMsg = document.getElementById("errorMsg");
  const weatherInfo = document.getElementById("weatherInfo");

  // Clear previous results
  errorMsg.classList.add("hidden");
  weatherInfo.classList.add("hidden");

  if (!city) {
    errorMsg.textContent = "Please enter a city name!";
    errorMsg.classList.remove("hidden");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      errorMsg.textContent = "City not found. Please try again!";
      errorMsg.classList.remove("hidden");
      return;
    }

    // Display weather info
    document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `${data.main.temp}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} m/s`;

    weatherInfo.classList.remove("hidden");
  } catch (error) {
    errorMsg.textContent = "Failed to fetch weather data. Try again later!";
    errorMsg.classList.remove("hidden");
    console.error(error);
  }
}
