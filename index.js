// Fetching background & Author name

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
.then(response => response.json())
.then(data => {
    //displaying background images
    document.body.style.backgroundImage = `url(${data.urls.full})`
    //display name of author 
    document.getElementById('author').textContent = `By: ${data.user.name}`
})
// dafault backgroundImage /author 
.catch(error => {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`
    document.getElementById('author').textContent = 'By: Doni Achmad';
});

//Fetching crypto API
fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
.then(response => {
    if(!response.ok) {
        throw Error("Something went wrong")
    }
    return response.json();
})
.then(data => {
    document.getElementById('crypto-top').innerHTML = `
    <img src=${data.image.small} />
    <span>${data.name}</span>`
    
    document.getElementById('crypto').innerHTML += `
    <p>🎯: $${data.market_data.current_price.usd}</p>
    <p>👆: $${data.market_data.high_24h.usd}</p>
    <p>👇: $${data.market_data.low_24h.usd}</p>`
    
})
.catch(error  => console.log(error))

//learning using arrow func ,to display time and update it in a sec
// const updateTime = () => {
//     const d = new Date();
//     const timestamp = d.getHours() +':'+ d.getMinutes();
//     // console.log(timestamp)

//     document.getElementById('time').textContent = timestamp;
// }
// setInterval(updateTime, 1000);

// function getCurrentTime() {
//     const date = new Date()
//     document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
// }

// setInterval(getCurrentTime, 1000)

//Weather Display
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
    .then(response => {
        if(!response.ok) {
            throw Error('Weather data is not available')
        }
        return response.json();
    })
    .then(data => {
        // getting the weather icon
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById('weather').innerHTML = `
        <img src=${iconUrl} />
        <p>${Math.round(data.main.temp)}º</p>
        <p>${data.name}</p>`
    })
    .catch(error => console.log(error));
})
