import {weatherbitFetch} from "./weatherbitFetch";

export const handleSubmit = (e) => {
  e.preventDefault(); //prevent page from reloading on click  
  let leaveDate = document.getElementById("leave-date").value;
  let userName = document.getElementById("name").value;
  let userDest = document.getElementById("destination").value;
  console.log("User clicked submit");
  console.log(`location: ${userDest}`);
  console.log(`date: ${leaveDate}`);
  console.log(`name: ${userName}`);

  if (userDest) {
    getCoords(userDest)
      .then (coords => weatherbitFetch(coords))
      .then (weather => console.log(weather))
  }
}

const getCoords = async (destination) => {
  let fetchCoords = await fetch("http://localhost:2000/fetchCoords", {//local server is on port 2000. See POST on server.js with fetchCoords as path
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({destination}) //Notice this was sent as an object
  });
  let coords = await fetchCoords.json();
  return coords;
}