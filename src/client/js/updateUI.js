export const updateUI = (dataObj, imgHolder, userDate) => {
  console.log("Upate UI Ran");
  let preLoader = document.getElementById("pre-loader-holder");
  imgHolder.style.backgroundImage = `url(${dataObj.fetchedData.pixURL})`;
  document.getElementById("text").innerHTML = "";
  preLoader.classList.remove("pre-loader");
  console.log("Test" + dataObj.newWeatherEntry[0].snow);

  {/* <button class="accordion">Section 2</button>
              <div class="panel">
                <p>Lorem ipsum...</p>
              </div> */}

  // ---------------------------------START ACCORDION MENU CREATION---------------------------
  if (Object.keys(dataObj.newWeatherEntry).length == 3) { //need to assess number of keys, can't just do .length as with arrays
    console.log("length of weather data is three");

  } else {
    for (let item in dataObj.newWeatherEntry) {
      console.log("weather item: " + JSON.stringify(dataObj.newWeatherEntry[item]));
      let dayCount = new Date(`${userDate} 00:00`);
      dayCount.setDate(parseInt(dayCount.getDate()) + parseInt(item));

    
      // let weather = dataObj.newWeatherEntry[item]; //change the word to all lowercase
      // item = item[0].toUpperCase() + item.slice(1); //capitalize the first letter 
      // newP.innerHTML = `${item}: ${feeling}`;
      // console.log(newP);
      // resultsHolder.appendChild(newP); //Appending into the DOM 



      let newBtn = document.createElement("button"); //create a <button></button> tag
      // newP.id = item; //generate unique ids for each p tag
      
      let newDiv = document.createElement("div");
      newBtn.id = `btn${item}`;
      console.log(newBtn);
      newDiv.classList.add("panel");
      

      for (let element in dataObj.newWeatherEntry[item]) {
        let weatherElem = dataObj.newWeatherEntry[item][element];
        let newP = document.createElement("p");
        let bolded = document.createElement("b"); //created a <b></b> tag 
        let textnode = document.createTextNode(element); //bold tags need a *textnode* specifically 
        bolded.appendChild(textnode);
        newP.appendChild(bolded);
        let weatherNode = document.createTextNode(": " + weatherElem);
        newP.appendChild(weatherNode);
  
        newDiv.appendChild(newP);
          }
      
      newBtn.classList.add("accordion");
      document.getElementsByClassName("accordion")[0].appendChild(newDiv);
      
      newBtn.innerHTML = `Weather for ${dayCount.getMonth()}/${dayCount.getDate()} `;
      document.getElementById("result-holder").appendChild(newBtn); //Appending into the DOM 
      document.getElementById("result-holder").appendChild(newDiv); //Appending into the DOM 

    }
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
