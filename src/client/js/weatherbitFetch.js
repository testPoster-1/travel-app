export const weatherbitFetch = async (coords) => {
  console.log("Weatherbit called");

  let latitude = coords.geonames[0].lat;
  let longitude = coords.geonames[0].lng;

  let sendCity = await fetch ("http://localhost:2000/getWeather", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({latitude, longitude})
  });
}