export const persistance = () => {
  console.log("persistance ran");
  let tripArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];  //ternary operator: if localstorage.getitem(items) is true, then triparray will equal JSON.parse(localStorage.getItem('items'), if it's false, then triparry will be equal to []. 

const data = JSON.parse(localStorage.getItem('items'));
// tripArray.push("hello");
localStorage.setItem('items', JSON.stringify(tripArray));
console.log(data);



}