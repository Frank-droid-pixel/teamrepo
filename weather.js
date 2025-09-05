

    const formEL = document.querySelector("form");
    const cityInputEl = document.getElementById("city-input");

    // Elements
    const tempEl = document.querySelector(".temperature");
    const cityEl = document.querySelector(".city");
    const countryEl = document.querySelector(".country");
    const humidityEl = document.querySelector(".humidity");
    const windEl = document.querySelector(".wind");
    const feelsEl = document.querySelector(".feels-like");
    const pressureEl = document.querySelector(".pressure");
    const visibilityEl = document.querySelector(".visibility");
    const descriptionEl = document.querySelector(".description");
    const weatherIconEl = document.querySelector(".weather-icon");
    const timeEl = document.querySelector(".time");
    const dayEl = document.querySelector(".day");
    const timezoneEl = document.querySelector(".timezone-text");

    formEL.addEventListener("submit", (event) => {
      event.preventDefault();
      const cityValue = cityInputEl.value;
      getWeatherData(cityValue);
    });

    async function getWeatherData(cityValue) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log(data);

        // Weather data
        tempEl.textContent = `${Math.round(data.main.temp)}°C`;
        cityEl.textContent = data.name;
        countryEl.textContent = data.sys.country;
        humidityEl.textContent = `${data.main.humidity}%`;
        windEl.textContent = `${data.wind.speed} m/s`;
        feelsEl.textContent = `${Math.round(data.main.feels_like)}°C`;
        pressureEl.textContent = `${data.main.pressure} hPa`;
        visibilityEl.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        descriptionEl.textContent = data.weather[0].description;

        // Dynamic icon
        const icon = data.weather[0].icon;
        weatherIconEl.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        weatherIconEl.alt = data.weather[0].description;

        // Date & Time
        const localTime = new Date((data.dt + data.timezone) * 1000);
        timeEl.textContent = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        dayEl.textContent = localTime.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        timezoneEl.textContent = `GMT${data.timezone / 3600 >= 0 ? '+' : ''}${data.timezone / 3600}`;

      } catch (error) {
        console.error(error);

        // fallback if error
        tempEl.textContent = "--";
        cityEl.textContent = "Error fetching data";
        countryEl.textContent = "--";
        humidityEl.textContent = "--";
        windEl.textContent = "--";
        feelsEl.textContent = "--";
        pressureEl.textContent = "--";
        visibilityEl.textContent = "--";
        descriptionEl.textContent = "Try again later";
        weatherIconEl.src = "";
        timeEl.textContent = "--";
        dayEl.textContent = "--";
        timezoneEl.textContent = "--";
      }
    }
