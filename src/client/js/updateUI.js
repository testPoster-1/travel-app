export const updateUI = (dataObj, imgHolder, userDate) => {
  console.log("Upate UI Ran");
  let preLoader = document.getElementById("pre-loader-holder");
  imgHolder.style.backgroundImage = `url(${dataObj.fetchedData.pixURL})`;
  document.getElementById("text").innerHTML = "";
  preLoader.classList.remove("pre-loader");

{/* <button class="accordion">Section 2</button>
              <div class="panel">
                <p>Lorem ipsum...</p>
              </div> */}

// ---------------------------------START ACCORDION MENU CREATION---------------------------
if (Object.keys(dataObj.newWeatherEntry).length == 3) { //need to assess number of keys, can't just do .length as with arrays
  console.log("length of weather data is three");
  
} else {
    for (let item in dataObj.newWeatherEntry) {
      console.log(userDate);
      let dayCount = new Date(`${userDate} 00:00`);
      dayCount.setDate(parseInt(dayCount.getDate()) + parseInt(item));
      
      

    let newBtn = document.createElement("button"); //create a <button></button> tag
    // newP.id = item; //generate unique ids for each p tag
    newBtn.classList.add("accordion");
    newBtn.innerHTML = `Weather for ${dayCount.getMonth()}/${dayCount.getDate()} `;
    document.getElementById("result-holder").appendChild(newBtn); //Appending into the DOM 

}


}
}
