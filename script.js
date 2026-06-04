const apiKey = "5be4b864f3acdc31d0109e45117ee0bd";

async function getWeather(){

const city=document.getElementById("city").value.trim();

if(city===""){
alert("Enter city name");
return;
}

try{

const weatherResponse=await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

const weatherData=await weatherResponse.json();

if(weatherData.cod!=200){

document.getElementById("weatherResult").innerHTML=
"<h2>City Not Found</h2>";

return;
}

const forecastResponse=await fetch(
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
);

const forecastData=await forecastResponse.json();

document.getElementById("weatherResult").innerHTML=`

<div class="weather-card">

<div class="city">
📍 ${weatherData.name}
</div>

<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png">

<div class="temp">
${Math.round(weatherData.main.temp)}°C
</div>

<div class="condition">
${weatherData.weather[0].description}
</div>

<div class="stats">

<div class="stat">
💧 Humidity<br>
${weatherData.main.humidity}%
</div>

<div class="stat">
🌬 Wind<br>
${weatherData.wind.speed} km/h
</div>

<div class="stat">
🌡 Feels Like<br>
${Math.round(weatherData.main.feels_like)}°C
</div>

<div class="stat">
🔽 Pressure<br>
${weatherData.main.pressure}
</div>

</div>

</div>
`;

let forecastHTML="";

for(let i=0;i<7;i++){

const item=forecastData.list[i*8];

if(!item) break;

const date=new Date(item.dt_txt);

forecastHTML += `

<div class="forecast-day">

<span>
${date.toLocaleDateString('en-US',{weekday:'short'})}
</span>

<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">

<span>
${Math.round(item.main.temp)}°C
</span>

</div>

`;

}

document.getElementById("forecastResult").innerHTML=
forecastHTML;

}
catch(error){

console.log(error);

}

}

document.getElementById("city").addEventListener("keypress",(e)=>{

if(e.key==="Enter"){
getWeather();
}

});