export const deleteTrip = (i) => {
  // let tripDelete = JSON.parse(localStorage.getItem("trips"))[i];
  // console.log(tripDelete);
  // if (confirm(`Are you sure you want to delete the trip data to ${tripDelete.dataObj.fetchedData.city}?`)) {
    
  //   localStorage.removeItem("trips");   // clear local storage
  //   alert(`Your trip to ${tripDelete.dataObj.fetchedData.city} has been deleted`);
  //   window.location.reload();
  // }; 

  let tripDelete = localStorage.getItem("trips");
  tripDelete.splice(i, 1); 
  localStorage.setItem("trips", tripDelete);
  window.location.reload();
}