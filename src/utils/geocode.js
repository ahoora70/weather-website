// #1 api
// درخواست پکیج ریکویست برای استفاده کردن از ای پی آی
const request = require("request");
// #2
// تعریف فانکشن با دوتا پارامتر یک آدرس و یک کالبک
// کالبک اطلاعات دریافتی از ای پی ای رو منقل میکنه
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoicGFydmF6ejEzNjUiLCJhIjoiY2p6MnJxY2MzMDA2MjNjbzhxa2xxN2hlMCJ9.EcOChS6x4XfBzomP7JiHPw";
  // اینجا دیستراکچر کردیم
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.message) {
      callback(" oops!!!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
