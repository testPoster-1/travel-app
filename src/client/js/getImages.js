export const PixabayImages = () => {
  getPixabay();
}  

// const postCity = async (data) => {
//   console.log(data);
//   let cityImage = await fetch ("http://localhost:2000/postCity", {
//     method: "POST",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({data})
//   });
//   return cityImage;
// }

const getPixabay = async () => { //GET the data that was previously POSTed from the postCity function
  console.log("getpics ran");
      let getImg = await fetch ("http://localhost:2000/getImages");
      let pixabayImg = await getImg.json();
      console.log(pixabayImg);   
}