export const timeDifference = (userDate) => {
  if (userDate) {
    let d = new Date(); //gets current date and time to compare against the user's date
    let inputDate = new Date(`${userDate} 00:00`); //new Date() assumes UTC time, need to add the 00:00 in the string to set user input to same time zone as "d"
    let dateToday = (`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`); //Note +1 in order to get the actual month 
    let leaveDate = (`${inputDate.getFullYear()}-${inputDate.getMonth() + 1}-${inputDate.getDate()}`);
    console.log(`${dateToday} + ${leaveDate}`);
    const timeDiff = new Date(leaveDate).getTime() - new Date(dateToday).getTime() //difference in milliseconds
    console.log(timeDiff);

    if (timeDiff > 518400000) { //milliseconds - cut off is 6 days
      console.log("longer than 6 days aways");
      return 2;
    } else if (timeDiff >= 0 && timeDiff <= 518400000) {
      console.log ("Leaving in 6 days or less");
      return 1
    } else {
      console.log("Input date is in the past"); //Will be true if user inputs date in the past 
      return false;
    } 
  } else {
    console.log("No date - please enter a date");
    return false;
  }
}
