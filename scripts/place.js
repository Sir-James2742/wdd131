const currentyear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const today = new Date();

currentyear.innerHTML = `<span >${today.getFullYear()}</span>`;
lastModified.innerHTML = `Last modification: <span class="date">${new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(today)}</span>`;

let temperature = document.querySelector("#temp");
let windSpeed = document.querySelector("#wind");

temperature.textContent = `${48}°F`;
windSpeed.textContent = `${5 } mph`;  
let condition = document.querySelector("#condition");

condition.textContent = "cloudy"; 
temperature = 48;
windSpeed = 5;

function calculateWindChill(temperature, windSpeed) {
    
    return 35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16));
}


let windChill = "N/A";
if (temperature <= 50 && windSpeed > 3) {
    const chillFactor = calculateWindChill(temperature, windSpeed);
    windChill = `${Math.round(chillFactor)}°F`; 
}


document.addEventListener('DOMContentLoaded', function () {
    const windChillElement = document.querySelector('#chill');
    if (windChillElement) {
        windChillElement.textContent = windChill;
    }
});