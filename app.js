const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

// homepage route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "a0f1121aab52ee3b6647fcfb7311504b";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid= " +
    apiKey +
    "&units=" +
    unit;
  console.log(url);
  https.get(url, (response) => {
    console.log(response.statusCode);

      response.on("data", (data) => {
      const weather_data = JSON.parse(data);
      const temp = weather_data.main.temp;
      const icon = weather_data[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const weatherDescription = weather_data.weather[0].description;
      res.write(
        "<p> The weather Description is " + weatherDescription + "</p>"
      );
      res.write(
        " <h1>The temperature in" + query + "is" + temp + "Degree celcius </h1>"
      );
      res.write("<img src=" + imageUrl + " > ");
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
 