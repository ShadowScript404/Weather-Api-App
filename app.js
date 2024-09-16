// WEATHER APP
// selecting elements
const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');

// this is the apiKey
const apiKey = "d3b8cd3fafb80fc22b5fba0073309153";

// adding eventListener using async and await that returns promise
weatherForm.addEventListener('submit', async event =>{
    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }else{
        displayError("Please enter a city")
    }
});

// fetching data from api with constructed url
async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    console.log(response);
    if(!response.ok){
        throw new Error("could not fetch weather data");
    }
    return await response.json();
}

// this function takes the data from the api and display it on webpage
function displayWeatherInfo(data){
    // console.log(data);
    // data is extracted into pieces
    const {name: city,
           main: {temp, humidity},
           weather:[{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    // these lines creates the html element to display the weather data
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    // assigning values to the elements
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15)* (9/5) + 32).toFixed(1)}°C`
    humidityDisplay.textContent = `humidity: ${humidity}%`
    descDisplay.textContent = description;       
    weatherEmoji.textContent = getWeatherEmoji(id);

    // adding css classList
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    // this lines add all the created element to the card element where the weather element is shown on webpage
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji)
}

// this function takes the weather id as parameter (this weatherId is from the api)
function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 300):
        return "⛈️";
        case(weatherId >= 300 && weatherId < 400):
        return "🌧️";
        case(weatherId >= 500 && weatherId < 600):
        return "🌧️";
        case(weatherId >= 600 && weatherId < 700):
        return "❄️";
        case(weatherId >= 700 && weatherId < 800):
        return "🌫️";
        case(weatherId === 800):
        return "🌞";
        case(weatherId >= 801 && weatherId < 810):
        return "☁️";
        default:
            return "❓"
    }
}

// displaying error msg
function displayError(message){
    // creates new html "p" element
    const errorDisplay = document.createElement("p"); 
    errorDisplay.textContent = message;
    // adds css classList
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}