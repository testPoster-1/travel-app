export const deleteTrip = () => {
  if (confirm("Are you sure you want to remove all of your trip information?")) {
    window.location.reload();
  };
  
}