export const timeDifference = (userDate, rtnDate) => {
  let imgHolder = document.querySelector("#img-holder");
  let d = new Date(); //gets current date and time to compare against the user's dates
  let inputDate = new Date(`${userDate} 00:00`); //new Date() assumes UTC time, need to add the 00:00 in the string to set user input to same time zone as "d"
  let rtnDateObj = new Date(`${rtnDate} 00:00`); 
  let dateToday = (`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`); //Note +1 in order to get the actual month 
  let leaveDate = (`${inputDate.getFullYear()}-${inputDate.getMonth() + 1}-${inputDate.getDate()}`);
  let timeDiff = new Date(leaveDate).getTime() - new Date(dateToday).getTime() //difference in milliseconds between today's date and when they are leaving


  if (userDate && rtnDate) {
    console.log("dato: " +inputDate.getTime() + " "+ rtnDateObj.getTime()); //true if the user put in a leave and return date

    if (inputDate.getTime() > rtnDateObj.getTime()) { //this makes sure that the return date is not before the leave date
      imgHolder.scrollIntoView({
        block: "center",
        behaviour: "smooth",
        alignToTop: false,
        inline: "nearest"
      });
      document.getElementById("err-holder").innerHTML = "Your return date cannot be before your leave date."
      return false;
    } else if (timeDiff > 518400000) { //milliseconds - if the date is longer than 6 days away
      console.log("longer than 6 days aways");
      return 7;
    } else if (timeDiff >= 0 && timeDiff <= 518400000) {  //if the leave day is today or within 6 days
      console.log("Leaving in 6 days or less");
      return 3;
    } else {
      console.log("Input date is in the past"); //Will be true if user inputs date in the past 
      imgHolder.scrollIntoView({
        block: "center",
        behaviour: "smooth",
        alignToTop: false,
        inline: "nearest"
      });
      document.getElementById("err-holder").innerHTML = "You entered a date that has already passed. Please enter a date that is no earlier than today."
      return false;
    }
  } else {
    imgHolder.scrollIntoView({
      block: "center",
      behaviour: "smooth",
      alignToTop: false,
      inline: "nearest"
    });
    document.getElementById("err-holder").innerHTML = "Please enter your leave and return dates."
    return false;
  }
} //go back to main.js

export const vacayLength = (userDate, rtnDate) => { //calcluations time between leave and return dates
  let leaveDate = new Date(`${userDate} 00:00`); //new Date() assumes UTC time, need to add the 00:00 in the string to set user input to same time zone as "d"
  let userRtnDate = new Date(`${rtnDate} 00:00`); //gets current date and time to compare against the user's date  
  const timeDiff = (new Date(userRtnDate).getTime() - new Date(leaveDate).getTime()) / 86400000;  //subtracting the getTime will give you time in milliseconds. Divde by the number of milliseconds in a day
  return timeDiff;
}
