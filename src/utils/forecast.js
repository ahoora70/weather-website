// #1 api
// درخواست پکیج ریکویست برای استفاده کردن از ای پی آی
const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/d30a5ba2d3ef56f2dff496a7b057400f/" +
    latitude +
    "," +
    longitude +
    "?units=si";
  // بعد از یو ار ال میتونی آپشن هایی که ای پی ای عرضه میکنه رو طبق دستور العمل خودشون
  // به روش کوری ته یو ار ال اضافه کنی
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
    }
    callback(undefined, {
      temperature: body.currently.temperature,
      humidity: body.currently.humidity,
      apparentTemperature: body.currently.apparentTemperature,
      apparentTemperatureHigh: body.daily.data[0].apparentTemperatureHigh,
      apparentTemperatureLow: body.daily.data[0].apparentTemperatureLow,
      summary: body.currently.summary
    });
  });
};
module.exports = forecast;
