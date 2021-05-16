export const destValidation = (userDest) => {
  console.log(userDest);
  if (userDest.includes(",, ")) { //commas are used to separate city, state, country. If ",, " (note space after last comma), then there is no input from user.
    console.log("User did not enter any location information");
    return false;
  } else {
    return true; 
  }
}