const express = require("express"); 
const cors = require("cors"); 

const app = express(); //start instance of express app
const port = 2000; 

app.use(cors());

//bodyparser is deprecated - use the following instead
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);;
});




