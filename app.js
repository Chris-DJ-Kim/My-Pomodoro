const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static('public'));


app.listen(3000, function() {
    console.log("Server is running on port 3000!")
});

app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html") 
})



// Why have a backend? I want to one day turn this timer into a 
// multi-page app with the ability to log in, track time spent working (like a productivity app),etc