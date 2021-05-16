export const timeDifference = (user) => {
  let d = new Date(); //gets current date and time to compare against the user's date
  let inputDate = new Date(user);
  let dateToday = (`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`); //Note +1 in order to get the actual month 
  let leaveDate = (`${inputDate.getFullYear()}-${inputDate.getMonth() + 1}-${inputDate.getDate()+1}`);
  console.log(`${dateToday} + ${leaveDate}`);
  const timeDiff = new Date(leaveDate).getTime() - new Date(dateToday).getTime() //difference in milliseconds
  console.log(timeDiff);

  if (timeDiff > 518400000) { //milliseconds - cut off is 6 days
    console.log("longer than 6 days aways");
    return 1;
  } else if (timeDiff < 0) {
    console.log("Input date is in the past");
    return -1; 
  } else {
    console.log("Date is 6 days or less away");
    return 0;
  }
}

