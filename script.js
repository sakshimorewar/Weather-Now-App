const apiKey = "84148bc0035c8f5b7208bf4458a11891"; //OpenWeatherMap
const cityInput = document.querySelector(".cityy");     
const countrySelect = document.querySelector(".country"); 
const cityBox = document.getElementById("city"); 
const dateBox = document.getElementById("date");
const tempBox = document.getElementById("temp");
const condBox = document.getElementById("cond");

// Function to update city + country info
async function updateCityCountry() {
    const city = cityInput.value.trim();
    const country = countrySelect.value;

    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    if (country === "Choose") {
        alert("Please select a country.");
        return;
    }

    cityBox.querySelector("p").textContent = `City: ${city}, ${country}`;

    const countryCodes = { India: "IN", UK: "GB", "South Korea": "KR", Japan: "JP", US: "US" };
    const countryCode = countryCodes[country];

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        const now = new Date();
        dateBox.querySelector("p").textContent = `Date: ${now.toLocaleDateString()}`;
        tempBox.querySelector("p").textContent = `Temperature: ${data.main.temp}°C`;
        condBox.querySelector("p").textContent = `Condition: ${data.weather[0].main}`;
        
    } catch (err) {
        alert(err.message);
        console.error(err);
    }
}

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") updateCityCountry();
});

countrySelect.addEventListener("change", updateCityCountry);
