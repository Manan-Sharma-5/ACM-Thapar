//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/jobsDB", {useNewUrlParser: true});



app.get("/", function(req, res) {

 res.render("login");
});

app.post("/", function(req, res){
    userName = req.body.loginName;
    passWord = req.body.pass;

    if(userName === "manan@123.com" && passWord === "12345"){
        res.redirect("index");
    }
})

app.get("/index", function(req, res){
    res.render("index");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
