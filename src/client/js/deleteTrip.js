export const deleteTrip = () => {
  if (confirm("Are you sure you want to remove all of your trip information?")) {
    localStorage.clear();   // clear local storage
    window.location.reload();
  };
  
}