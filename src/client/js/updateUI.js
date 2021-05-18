export const updateUI = (dataObj) => {
  console.log(JSON.stringify(dataObj));
  console.log("UpdateUI function ran");
  
  const imgHolder = document.getElementById("img-holder");
  let newImg = document.createElement("img");
  imgHolder.appendChild(newImg);
  newImg.src = String(dataObj.pixURL);
  console.log(`this is my pix url ${dataObj.pixURL}`);
}