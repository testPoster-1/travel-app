const express = require("express"); 
const cors = require("cors"); 

const app = express(); //start instance of express app
const port = 2000; 

app.use(cors());

//bodyparser is deprecated - use the following instead
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("dist"));  //entry point for app
app.get("/", function (req, res) {
  res.sendFile(path.resolve("dist/index.html"))
  }); //resolves the path to the html file to render into browser

app.listen(port, () => {
  console.log(`Listening on port ${port}`);;
});




