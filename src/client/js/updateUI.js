export const updateUI = (dataObj, imgHolder, userDate) => {
//recall that the appropriate number of days has already been added to the dataobj.neweatherdata from the server

  console.log("Upate UI Ran");
  let preLoader = document.getElementById("pre-loader-holder");
  imgHolder.style.backgroundImage = `url(${dataObj.fetchedData.pixURL})`;
  document.getElementById("text").innerHTML = "";
  preLoader.classList.remove("pre-loader");
  console.log("Test" + dataObj.newWeatherEntry[0].snow);

  for (let item in dataObj.newWeatherEntry) {

    console.log("weather item: " + JSON.stringify(dataObj.newWeatherEntry[item]));
    let dayCount = new Date(`${userDate} 00:00`);

    dayCount.setDate(parseInt(dayCount.getDate()) + parseInt(item));
    let newBtn = document.createElement("button"); //create a <button></button> tag
    // newP.id = item; //generate unique ids for each p tag
    newBtn.id = `btn${item}`;
    newBtn.classList.add("accordion");
    newBtn.innerHTML = `Weather for ${dayCount.getMonth() + 1}/${dayCount.getDate()} `;



    let newDiv = document.createElement("div");

    console.log(newBtn);
    newDiv.classList.add("panel");

    for (let element in dataObj.newWeatherEntry[item]) {
      console.log("element: " + element);
      let weatherElem = dataObj.newWeatherEntry[item][element];
      element = element[0].toUpperCase() + element.slice(1); //capitalize the first letter 
      let newP = document.createElement("p");
      let bolded = document.createElement("b"); //created a <b></b> tag 
      let textnode = document.createTextNode(element); //bold tags need a *textnode* specifically 
      bolded.appendChild(textnode);
      newP.appendChild(bolded);

      let weatherNode;
      if (element == "Snow" || element == "Rain") {
        weatherNode = document.createTextNode(`: ${weatherElem} mm`);
      } else if (element == "Temp") {
        weatherNode = document.createTextNode(`: ${weatherElem} F`);
      } else {
        weatherNode = document.createTextNode(`: ${weatherElem}`);
      }
      newP.appendChild(weatherNode);
      newDiv.appendChild(newP);
    }
    document.getElementById("result-holder").appendChild(newBtn); //Appending into the DOM 
    document.getElementById("result-holder").appendChild(newDiv); //Appending into the DOM 
  }

var acc = document.getElementsByClassName("accordion");
var i;
console.log("acc: " + acc.length);

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    console.log("panel clicked");
    this.classList.toggle("active");
    console.log(document.getElementsByTagName("button"));
    let panel = this.nextElementSibling;
    console.log(panel);
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
}
