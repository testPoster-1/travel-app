export const updateUI = (dataObj, imgHolder) => {
  imgHolder.style.backgroundImage = `url(${dataObj.pixURL})`;
}