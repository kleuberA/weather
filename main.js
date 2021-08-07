
let weather = {
  apiKey: "0167e934de724583f06cba484ab839fd",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, temp_min } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;
    let img = "https://openweathermap.org/img/wn/" + icon + ".png"
    $(".cidade").text(name + ", " + country);
    $(".icon").attr('src', img);
    $(".descricao").text(description);
    $(".temperaturaMaxima").text(Math.trunc(temp) + "°/");
    $(".temperaturaMinima").text(Math.trunc(temp_min) + "°");
    $(".umidade").text("Umidade: " + humidity + "%");
    $(".wind").text("Velocidade do vento: " + speed + " km/h");
    const url = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    $('.card').css('background', url)
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

$(".search").click((event) => {
  weather.search();
});

$(".search-bar").keyup((event) => {
   if (event.key == "Enter") {
      weather.search();
    }
});

weather.fetchWeather("Brasilia");