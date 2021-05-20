export const updateUI = (dataObj, imgHolder) => {
  let preLoader = document.getElementById("pre-loader-holder");
  
  imgHolder.style.backgroundImage = `url(${dataObj.pixURL})`;
  document.getElementById("text").innerHTML = "";
  preLoader.classList.remove("pre-loader");

}