/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const button = document.getElementById("generate");

const nameCity = document.getElementById("city-name");
const feelings = document.getElementById("feelings");
const country = document.getElementById("country");
// html to update UI

const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

// OpenWeatherApi
const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const APIKey = "292b739f06e2a3efdee8c6f34db22cfb";

const fetchWeather = async (baseURL, name, apiKey, units) => {
  try {
    const request = await fetch(
      `${baseURL}?q=${name}&APPID=${apiKey}&units=${units}`
    );
    const result = await request.json();
    const {
      main: { temp },
    } = result;
    return temp;
  } catch (error) {
    throw error;
  }
};

const saveDataWeather = async (path, data) => {
  try {
    await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw error;
  }
};

const updateUIWeather = (temperature, newDate, feelings) => {
  date.innerHTML = newDate;
  temp.innerHTML = Math.round(temperature) + "degrees";
  content.innerHTML = feelings;
};

button.addEventListener("click", () => {
  fetchWeather(baseURL, nameCity.value, APIKey, "Standard")
    .then((temp) => {
      return { date: newDate, temp, content: feelings.value };
    })
    .then((data) => {
      saveDataWeather("/add", data);
      return data;
    })
    .then(({ temp, date, content }) => updateUIWeather(temp, date, content))
    .catch((e) => {
      console.error(e);
    });
});
