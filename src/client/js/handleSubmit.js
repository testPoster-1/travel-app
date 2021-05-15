const leaveDate = document.getElementById("leave-date").value;
const userName = document.getElementById("name").value;
const dest = document.getElementById("destination").value;

export const handleSubmit = (e) => {
  e.preventDefault();

  console.log("User clicked submit");
}