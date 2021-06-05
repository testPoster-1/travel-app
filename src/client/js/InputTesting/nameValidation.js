export const nameValidation = (userName) => {
  if (!userName) { //if user does not input name, will assign them the name "Anonymous"
    let anon = "Anonymous"
    return anon;
  } else {
    return userName;
  }
}
//go back to main.js
