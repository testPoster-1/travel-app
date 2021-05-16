export const nameValidation = (userName) => {
  if (!userName) {
    console.log("You are anonymous");
    return userName = "Anonymous";
  } else {
    return userName;
  }
}
