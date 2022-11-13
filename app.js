const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

app.get("/getAllDayWeatherByCity", async (req, res) => {
  let city = req.body.city;
  if (!city) {
    return res
      .status(404)
      .send({ message: "Please provide a valid City", status: 404 });
  }
  let URL = `http://api.weatherapi.com/v1/forecast.json?key=8fb3917af0e248deaa985110221211&q=${city}&days=14&aqi=no&alerts=no`;
  console.log(URL);
  let config = {
    method: "get",
    url: URL,
  };
  let result = await axios(config);
  let obj = {};
  obj.location = result.data.location;
  obj.currentTemp = result.data.current.temp_c + " c";
  obj.weatherCondition = result.data.current.condition.text;
  obj.humidity = result.data.current.humidity;
  obj.days = {};
  for (var x = 0; x < 14; x++) {
    let temp = "day" + (x + 1);
    obj.days[temp] = {
      date: result.data.forecast.forecastday[x].date,
      maxTemp: result.data.forecast.forecastday[x].day.maxtemp_c,
      mintemp: result.data.forecast.forecastday[0].day.mintemp_c,
      weatherCondition: result.data.forecast.forecastday[x].day.condition.text,
    };
  }

  res.send(obj);
});

app.get("/getSingleDayWeatherByCity", async (req, res) => {
  let city = req.body.city;
  let day = req.body.date;
  if (!city) {
    return res
      .status(404)
      .send({ message: "Please provide a valid City", status: 404 });
  }
  if (!day) {
    return res
      .status(404)
      .send({ message: "Please provide a valid date", status: 404 });
  }
  let URL = `http://api.weatherapi.com/v1/history.json?key=8fb3917af0e248deaa985110221211&q=${city}&dt=${day}`;
  console.log(URL);
  let config = {
    method: "get",
    url: URL,
  };
  let result = await axios(config);
  let obj = {};
  obj.location = result.data.location;
  (obj.date = result.data.forecast.forecastday[0].date),
    (obj.maxTemp = result.data.forecast.forecastday[0].day.maxtemp_c),
    (obj.mintemp = result.data.forecast.forecastday[0].day.mintemp_c),
    (obj.weatherCondition =
      result.data.forecast.forecastday[0].day.condition.text),
    //   obj.avgTemp = result.data.current.temp_c + " c";
    //   obj.weatherCondition = result.data.current.condition.text;
    //   obj.humidity = result.data.current.humidity;
    //   obj.days = {}
    //     for (var x = 0; x < 1; x++) {
    //         let temp = "day"+(x+1);
    //        obj.days[temp]= {
    //             date: result.data.forecast.forecastday[x].date,
    //             maxTemp: result.data.forecast.forecastday[x].day.maxtemp_c,
    //             mintemp: result.data.forecast.forecastday[0].day.mintemp_c,
    //             weatherCondition: result.data.forecast.forecastday[x].day.condition.text,
    //           }
    // }

    res.send(obj);
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
