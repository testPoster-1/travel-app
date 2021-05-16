export const timeDifference = () => {
  let d = new Date(); //gets current date and time to compare against the user's date
  let leaveDate = document.getElementById("leave-date").value;
  let dateToday = (`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`); //Note +1 in order to get the actual month 
console.log(dateToday);
const timeDiff = new Date(leaveDate).getTime() - new Date(dateToday).getTime() //difference in milliseconds
console.log(timeDiff);

if (timeDiff > 518400000) { //milliseconds - cut off is 6 days
  console.log("longer than 6 days aways");
  return true
  } else {
    console.log("6 days or shorter away");
    return false
  }
}