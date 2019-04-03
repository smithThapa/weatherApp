let date = moment();
let differentTimestampDays = [];

const weatherIconSelector = (code) => {
    if(code === 800){
         return 'sunny'
    } else{
        code = Number(code.toString()[0])
        switch(code){
            case 2:
                return 'thunderstorm'
            case 3: 
            case 5:
                return 'rain'
            case 6:
                return 'snow'
            case 7:
            case 8:
                return 'cloudy'

        }
    }
}

let fivedayForecastWrapper = document.querySelector('.five-days-forecast-wrapper');

const API_KEY = 'wSo0LRcHZMmsh4rXshasAImNK7Ulp19zkGQjsnUjeMXsnpyilC';
    let url = `https://weatherbit-v1-mashape.p.mashape.com/forecast/3hourly?lat=${-33}&lon=${151}`;
    let fetchData = {
        headers: {"X-Mashape-Key": API_KEY}
    };

    loaderWrapper.innerHTML = loader;
    fetch(url, fetchData).then(res=> res.json()).then(
        data => {

            loaderWrapper.innerHTML = `<h1 class="current-temp">${data.data[0].app_temp}°</h1>
                                        <h2 class="weather-condition">${data.data[0].weather.description}</h2>`;

            let differentTimestampDays = data.data
            .filter((value, index, arr) => {
                if(index < arr.length-1){
                    return !(moment(value.timestamp_local).isSame(arr[index+1].timestamp_local,'day'))
                }
            })

            fivedayForecastWrapper.innerHTML = `
            <div class="five-day-forecast">
                <div class=" day day-one">
                    <p class="week-day">${date.add(1,'days').format('dddd')}</p>
                    <img class="small-image" src="assets/${weatherIconSelector(differentTimestampDays[0].weather.code)}.png" alt="Sunny icon"/>
                    <p class="week-temperature">${differentTimestampDays[0].app_temp}°</p>
                </div>
                <div class=" day day-one">
                    <p class="week-day">${date.add(2,'days').format('dddd')}</p>
                    <img class="small-image" src="assets/${weatherIconSelector(differentTimestampDays[1].weather.code)}.png" alt="Sunny icon"/>
                    <p class="week-temperature">${differentTimestampDays[1].app_temp}°</p>
                </div>
                <div class="day day-two">
                    <p class="week-day">${date.add(3,'days').format('dddd')}</p>
                    <img class="small-image" src="assets/${weatherIconSelector(differentTimestampDays[2].weather.code)}.png" alt="Sunny icon"/>
                    <p class="week-temperature">${differentTimestampDays[2].app_temp}°</p>
                </div>
                <div class="day day-three">
                    <p class="week-day">${date.add(4,'days').format('dddd')}</p>
                    <img class="small-image" src="assets/${weatherIconSelector(differentTimestampDays[3].weather.code)}.png" alt="Sunny icon"/>
                    <p class="week-temperature">${differentTimestampDays[3].app_temp}°</p>
                </div>
                <div class="day day-four">
                    <p class="week-day">${date.add(5,'days').format('dddd')}</p>
                    <img class="small-image" src="assets/${weatherIconSelector(differentTimestampDays[4].weather.code)}.png" alt="Sunny icon"/>
                    <p class="week-temperature">${differentTimestampDays[4].app_temp}°</p>
                </div>
            </div>`;

            //let counter = 0;
            // weekTemperatures.forEach(temp => {
            //     temp.innerText = `${differentTimestampDays[counter].app_temp}°`;
            //     counter++;
            // })

            console.log(differentTimestampDays)


        }
    ).catch(
        (err) => {
            console.log(err);
        }
    )



