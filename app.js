const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// const address = process.argv[2];
// if (!address) {
//   return console.log("please enter the address");
// } else {
//   geocode(address, (error, { longitude, latitude, location } = {}) => {
//     if (error) {
//       console.log(error);
//     } else {
//       forecast(
//         latitude,
//         longitude,
//         (error, { temperature, humidity, summary }) => {
//           if (error) {
//             console.log("error in forecast servec");
//           } else {
//             console.log(temperature);
//             console.log(humidity);
//             console.log(summary);
//             console.log(location);
//           }
//         }
//       );
//     }
//   });
// }

const express = require("express");
const app = express();

const path = require("path");

app.set("view engine", "hbs");

const hbs = require("hbs");
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

const viewsPath = path.join(__dirname, "../templates/views");
app.set("views", viewsPath);

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
//

app.get("", (req, res) => {
  res.render("index");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ Eroor: "you must provide an address" });
  }
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send(error);
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send(error);
        }
        res.send({
          temperature: forecastData.temperature,
          humidity: forecastData.humidity,
          summary: forecastData.summary,
          location
        });
      });
    }
  );
});

//
//
//

app.listen(3000, () => {
  console.log("server is running...");
});
