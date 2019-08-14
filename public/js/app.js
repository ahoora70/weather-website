const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const result1 = document.querySelector("#result1");
const result2 = document.querySelector("#result2");
const result3 = document.querySelector("#result3");
const result4 = document.querySelector("#result4");

weatherForm.addEventListener("submit", event => {
  event.preventDefault();

  const location = search.value;

  result1.textContent = "loading...";
  result2.textContent = "";
  result3.textContent = "";
  result4.textContent = "";
  result5.textContent = "";
  result6.textContent = "";
  result7.textContent = "";

  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        result1.textContent = data.error;
      } else {
        result1.textContent = "temperature: " + data.temperature;
        (result2.textContent = "humidity: " + data.humidity + "%"),
          (result5.textContent =
            "apparent Temperature: " + data.apparentTemperature);
        result6.textContent =
          "apparent Temperature High: " + data.apparentTemperatureHigh;
        result7.textContent =
          "apparent Temperature Low: " + data.apparentTemperatureLow;
        result3.textContent = "summary: " + data.summary;
        result4.textContent = "location: " + data.location;
      }
    });
  });
});
