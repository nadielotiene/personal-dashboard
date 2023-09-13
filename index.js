fetch ("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
  .then(res => res.json())
  .then(data => {
    document.body.style.backgroundImage = `url(${data.urls.full})`
    document.getElementById("author").textContent = `Photo by: ${data.user.name}`
    // console.log(data.urls.full)
    // throw Error("I'm an error!")
  })
  .catch(err => {
  console.log("Something went wrong!")
  document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1468413253725-0d5181091126?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTM0MjgzMTF8&ixlib=rb-4.0.3&q=85")`
  document.getElementById("author").textContent = "Photo by: David Marcu"
})



fetch ("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then(res => {
    if (!res.ok) {
      throw Error("Something went wrong")
    }
    console.log(res.status)
    console.log(res.ok)
    return res.json()
  })
  .then(data => {
    document.getElementById("crypto--main").innerHTML = `
      <img src=${data.image.small} />
      <h3>${data.name}</h3>
    `
    document.getElementById("crypto--stats").innerHTML = `
      <p>Current: $${data.market_data.current_price.usd}</p>
      <p>High: $${data.market_data.high_24h.usd}</p>
      <p>Low: $${data.market_data.low_24h.usd}</p>
    `
    // console.log(data)
  })
  .catch(err => {
    console.error(err)
    document.getElementById("crypto--name").textContent = "Not available at the moment"
  })

function updateClock() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString("en-us", {timeStyle: "medium"});
  document.getElementById("clock").textContent = `${currentTime}`
}
setInterval(updateClock, 1000)


navigator.geolocation.getCurrentPosition(position => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=5f4736e720bda76fd43cf92d8c48f9d9`)
    .then(res => {
      if (!res.ok) {
        throw Error("Weather data not available")
      }
      return res.json()
    })
    .then(data => {
      const iconUrl = `
      https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png
      `
      document.getElementById("weather--div").innerHTML = `
        <img src=${iconUrl} />
        <h2>${Math.round(data.main.temp)}°</h2>
        <p>${data.name}</p>
      `
      console.log(data)
    })
    .catch(err => console.error(err))
})

