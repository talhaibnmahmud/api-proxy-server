const weatherDisplay = document.querySelector("#weather");
const weatherForm = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");

const fetchWeather = async (city) => {
  const url = `api?q=${city}`;

  const data = await (await fetch(url)).json();

  if (data.cod === "404") {
    return alert("City Not Found!");
  }
  if (data.cod === "401") {
    return alert("Invalid API KEY!");
  }

  const displayData = {
    city: data.name,
    temp: kelvinToFahrenheit(data.main.temp),
  };

  addWeatherToDOM(displayData);
};

const addWeatherToDOM = (data) => {
  const h1 = document.createElement("h1");
  h1.innerHTML = `Weather in ${data.city}`;
  h1.classList.add("text-3xl", "font-bold");

  const h2 = document.createElement("h2");
  h2.innerHTML = `${data.temp} &deg;F`;
  h2.classList.add("text-4xl", "font-bold");

  while (weatherDisplay.childElementCount) {
    weatherDisplay.removeChild(weatherDisplay.lastChild);
  }

  weatherDisplay.appendChild(h1);
  weatherDisplay.appendChild(h2);

  cityInput.value = "";
};

const kelvinToFahrenheit = (temp) => {
  return Math.ceil(((temp - 273.15) * 9) / 5 + 32);
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (cityInput.value === "") {
    return alert("Please enter a city");
  }

  fetchWeather(cityInput.value);
});

fetchWeather("Mymensingh");
