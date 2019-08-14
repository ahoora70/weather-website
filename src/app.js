const express = require("express");
const app = express();

// #1
// برای راه اندازی view engine
const hbs = require("hbs");
//  به اکسپرس میگیم که ویو انجین اچ بی اس هست
app.set("view engine", "hbs");
//  #2
// برای مسیر دهی برای استفاده از فایل های استاتیک و همچنین داینامیک
const path = require("path");
// #3
// مسیر دادن و نشون دادن به اکسپرس که پوشه ویو انجین کجا هست
const viewPath = path.join(__dirname, "../templates/views");
// به اکسپرس میگیم از ویو های داخل پوشه ویوز استفاده کنه
app.set("views", viewPath);
const partialsPath = path.join(__dirname, "../templates/partials");
// #4
// آدرس دهی پوشه پارشال با پوشه ویو فرق داره و از دو روش متفاوت استفاده میشه
hbs.registerPartials(partialsPath);
// #5
// به کار گیری فایل های استاتیک
const pathName = path.join(__dirname, "../public");
app.use(express.static(pathName));

//
//
const port = process.env.PORT || 3000;

app.get("", (req, res) => {
  res.render("index", {
    title: "welcome ",
    masage: "",
    error: ""
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about ",
    masage: "",
    error: ""
  });
});

// #17
// وارد کردن اطلاعات از برنامه هواشناسی
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ Eroor: "you must provide an address" });
  }
  // موقعی که ارور میده برنامه هنوط سعی میکنه مقدار کالبک رو توی کروشه دیستراکت کنه
  // و این باعث خرابی اپ میشه پس با قرار دادن یک کروشه خالی به عنوان ارزش پیشفرض کالبک
  // در صورت ارور و حضور پیام خطا وعدم حضور مقادیر کالبک مقدار پیشفرض که هیچ هست از خرابی اپ جلوگیری میکنه
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          temperature: forecastData.temperature,
          humidity: forecastData.humidity,
          apparentTemperature: forecastData.apparentTemperature,
          apparentTemperatureHigh: forecastData.apparentTemperatureHigh,
          apparentTemperatureLow: forecastData.apparentTemperatureLow,
          summary: forecastData.summary,
          location
        });
      });
    }
  );
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    masage: "",
    error: ""
  });
});

// #7
//  ارور هندلینگ یک مورد کلی یک مورد برای صفحه هلپ
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "help page not found !!!"
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "page not found 404 !!!"
  });
});
app.listen(port, () => {
  console.log("server is on port" + port + "...");
});
