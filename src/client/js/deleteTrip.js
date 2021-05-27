export const deleteTrip = () => {
  if (confirm("Are you sure you want to remove all of your trip information?")) {
    localStorage.clear();   // clear local storage
    alert("All of your trips have been deleted");
    window.location.reload();
  };
  
}