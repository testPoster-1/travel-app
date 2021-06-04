export const nameValidation = (userName) => {
  if (!userName) {
    let anon = "Anonymous"
    return anon;
  } else {
    return userName;
  }
}
