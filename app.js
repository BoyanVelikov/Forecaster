function attachEvents() {
    let baseUrl = 'http://localhost:3030/jsonstore/forecaster';
    let location = document.getElementById('location');
    let codeLocation = '';
    let getWeatherButton = document.getElementById('submit');
    let forecastDiv = document.getElementById('forecast');
    let currentDiv = document.getElementById('current');
    let upcomingDiv = document.getElementById('upcoming');
    let errorP = document.createElement('p');
    getWeatherButton.addEventListener('click', solve);
 
    function solve() {
        codeLocation = '';
        
        fetch(baseUrl + '/locations')
            .then((res) => res.json())
            .then((data) => {

                for (let each of data) {

                    if (each.name == location.value) {
                        codeLocation = each.code;
                        break;
                    }
                }
            })
            .catch((error) => console.log('Error'));

        fetch(baseUrl + `/today/${codeLocation}`)
            .then((res) => res.json())
            .then((data) => {
                forecastDiv.style.display = 'block';
                let todayName = data[codeLocation].name;
                let todayDegreesLow = data[codeLocation].forecast.low;
                let todayDegreesHigh = data[codeLocation].forecast.high;
                let todayWeather = data[codeLocation].forecast.condition;
                let divForecasts = document.createElement('div');
                divForecasts.setAttribute('class', 'forecasts');
                let conditionSymbolSpan = document.createElement('span');
                let conditionSpan = document.createElement('span');
                let forecastCity = document.createElement('span');
                let forecastDegrees = document.createElement('span');
                let forecastWeather = document.createElement('span');
                forecastDegrees.setAttribute('class', 'forecast-data');
                forecastWeather.setAttribute('class', 'forecast-data');
                conditionSymbolSpan.setAttribute('class', 'condition symbol');
                conditionSpan.setAttribute('class', 'condition');
                forecastCity.setAttribute('class', 'forecast-data');

                if (todayWeather == 'Sunny') {
                    conditionSymbolSpan.innerHTML = '&#x2600;';
                } else if (todayWeather == 'Partly sunny') {
                    conditionSymbolSpan.innerHTML = '&#x26C5;';
                } else if (todayWeather == 'Overcast') {
                    conditionSymbolSpan.innerHTML = '&#x2601;';
                } else if (todayWeather == 'Rain') {
                    conditionSymbolSpan.innerHTML = '&#x2614;';
                }

                forecastCity.textContent = todayName;
                forecastDegrees.innerHTML = `${todayDegreesLow}${"&#176;"}/${todayDegreesHigh}${"&#176;"}`;
                forecastWeather.textContent = todayWeather;
                currentDiv.appendChild(divForecasts);
                divForecasts.appendChild(conditionSymbolSpan);
                divForecasts.appendChild(conditionSpan);
                conditionSpan.appendChild(forecastCity);
                conditionSpan.appendChild(forecastDegrees);
                conditionSpan.appendChild(forecastWeather);
            })
            .catch((error) => {
                let errorP = document.createElement('p');
                errorP.textContent = 'Error';
                forecastDiv.appendChild(errorP);
                forecastDiv.style.display = 'block';
                currentDiv.style.display = 'none';
                upcomingDiv.style.display = 'none';

            });

        fetch(baseUrl + `/upcoming/${codeLocation}`)
            .then((res) => res.json())
            .then((data) => {
                let divForecasts3Days = document.createElement('div');
                divForecasts3Days.setAttribute('class', 'forecast-info');
                upcomingDiv.appendChild(divForecasts3Days);

                for (each of data[codeLocation].forecast) {

                    let upcomingSpan = document.createElement('span');
                    let upcomingSymbol = document.createElement('span');
                    let upcomingDegrees = document.createElement('span');
                    let upcomingWeather = document.createElement('span');

                    upcomingSpan.setAttribute('class', 'upcoming');
                    upcomingSymbol.setAttribute('class', 'symbol');
                    upcomingDegrees.setAttribute('class', 'forecast-data');
                    upcomingWeather.setAttribute('class', 'forecast-data');
                    upcomingWeather.textContent = each.condition;
                    upcomingDegrees.innerHTML = `${each.low}${"&#176;"}/${each.high}${"&#176;"}`;

                    if (each.condition == 'Sunny') {
                        upcomingSymbol.innerHTML = '&#x2600;';
                    } else if (each.condition == 'Partly sunny') {
                        upcomingSymbol.innerHTML = '&#x26C5;';
                    } else if (each.condition == 'Overcast') {
                        upcomingSymbol.innerHTML = '&#x2601;';
                    } else if (each.condition == 'Rain') {
                        upcomingSymbol.innerHTML = '&#x2614;';
                    }

                    divForecasts3Days.appendChild(upcomingSpan);
                    upcomingSpan.appendChild(upcomingSymbol);
                    upcomingSpan.appendChild(upcomingDegrees);
                    upcomingSpan.appendChild(upcomingWeather);
                };

            });
            // .catch((error) => {
                
            //     errorP.textContent = 'Error';
            //     forecastDiv.appendChild(errorP);
            //     forecastDiv.style.display = 'block';
            //     currentDiv.style.display = 'none';
            //     upcomingDiv.style.display = 'none';
            // });


    }

}
attachEvents();