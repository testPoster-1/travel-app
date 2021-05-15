export const PixabayImages = async (postCity) => {
  console.log(postCity);
  let cityImage = await fetch ("http://localhost:2000/postCity", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({postCity})
  });
}  