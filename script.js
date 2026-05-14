let final = document.getElementById("stats");
let button = document.getElementById("search");
let inputField = document.getElementById("input");

const icons = {
    "Clear": "☀️",
    "Sunny": "☀️",
    "Partly cloudy": "⛅",
    "Cloudy": "☁️",
    "Overcast": "☁️",
    "Mist": "🌫️",
    "Patchy rain nearby": "🌦️",
    "Rain": "🌧️",
    "Thunderstorm": "⚡"
};

inputField.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        search();
    }
});

async function search() {
    let city = inputField.value;
    let now = new Date();
    let time = now.toLocaleTimeString('ar-EG');

    if (city === "") {
        final.innerHTML = "<p style='color:red'>Please enter a city name!</p>";
        return;
    }

    let link = `https://wttr.in/${city}?format=j1&lang=ar`;

    try {
        final.innerHTML = "Searching...📡";
        let content = await fetch(link);
        
        if (!content.ok) {
            final.innerHTML = "Area not found 🔴";
            return;
        }

        let data = await content.json();
        let current = data.current_condition[0];
        let { humidity, visibility, temp_C } = current;
        let desc = current.weatherDesc[0].value;
        let icon = icons[desc] || "🌡️";
        let areaName = data.nearest_area[0].areaName[0].value;

        final.innerHTML = `
        <div class="card">
            <h2 class="area">${areaName}-${data.nearest_area[0].country[0].value}</h2>
            <div class="info">
                <div>Temp: ${temp_C}°C</div>
                <div>Humidity: ${humidity}%</div>
                <div>Visibility: ${visibility} km</div>
                <h3>${icon} ${desc}</h3>
                <small>Last update: ${time}</small>
            </div>
            <div class="warning">
                The information may be incorrect if entry is invalid.
            </div>
        </div>`;

        if (temp_C > 30) {
            document.body.style.backgroundColor = "#FF5500";
        } else if (temp_C < 15) {
            document.body.style.backgroundColor = "#87BEF8";
        } else {
            document.body.style.backgroundColor = "#C9FFD8";
        }

    } catch (e) {
        final.innerHTML = "Error: " + e.message;
    }
}
