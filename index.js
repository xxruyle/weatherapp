const getWeather = async (location) => {
    const weatherLink = `http://api.weatherapi.com/v1/current.json?key=10e592c59e4644edb18195854232407&q=${location}&aqi=no`;


    const weatherResponse = await fetch(weatherLink, {mode: 'cors'});

    const weatherData = await weatherResponse.json();
    return weatherData;
}   

const getData = async (locationInfo) => {
    const location = locationInfo;

    const data = await getWeather(location).catch((err) => {
        console.log(err);
    });

    console.log(data);

    const time = new Date(data.location.localtime); 
    const standardTime = time.toLocaleTimeString('en-US');


    const condition = data.current.condition.text; 
    const locationName = data.location.name; 
    const temp = data.current.temp_f; 

    const feels = data.current.feelslike_f; 

    const wind  = data.current.wind_mph; 
    
    const humidity = data.current.humidity; 

    injectData(standardTime, condition, locationName, temp, feels, wind, humidity);

}

const injectData = (time, condition, location, temperature, feelsLike, wind, humidity) => {
    const timeNode = document.querySelector('.time');


    const conditionNode = document.querySelector('.condition');
    const locationNode = document.querySelector('.location');
    const tempeartureNode = document.querySelector('.temperature');


    const unitNode = document.querySelector('.unit');
    const feelsNode = document.querySelector('.feels');
    const windNode = document.querySelector('.wind');
    const humidityNode = document.querySelector('.humidity');


    timeNode.textContent = time; 
    conditionNode.textContent = condition; 
    locationNode.textContent = location; 
    tempeartureNode.textContent = temperature;
    unitNode.textContent = '°F';
    feelsNode.textContent = `Feels like: ${feelsLike}`; 
    windNode.textContent = `${wind} MPH`; 
    humidityNode.textContent = `Humidity: ${humidity}`;

}

const input = document.querySelector('input');

getData("London");

window.addEventListener('keydown', (event) => {
    if (event.code === "Enter")
    {
        if (input.value === "") 
        {
            getData("London");
        } else {
            getData(input.value);
            input.value = ""; 
        }


    }
})
