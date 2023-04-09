//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/jobsDB", {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    // You can perform database operations here
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

const jobSchema = new mongoose.Schema({
    jobName: String,
    jobContent: String,
});

const Job = mongoose.model('Job', jobSchema); 


app.get("/", function(req, res) {
 res.render("login");
});

app.post("/", function(req, res){
    userName = req.body.loginName;
    passWord = req.body.pass;

    if(userName === "manan@123.com" && passWord === "12345"){
        res.redirect("index");
    }
});

app.post("/job-uploading", function(req, res){
    const newJob = new Job({
        jobName: req.body.input,
        jobContent: req.body.content
    });

    newJob.save()
        .then(job => {
            console.log('Job document created:', job);
            res.redirect("/job/" + job._id); // Redirect to job detail page with the newly created job's _id
        })
        .catch(err => {
            console.error('Failed to create job document:', err);
            res.status(500).send("Failed to create job document");
        });
});

app.get("/index", function(req, res){
    res.render("index", {variableName: "Manan Sharma"});
});

app.get("/job-uploading", function(req, res){
    res.render("job-uploading");
});

app.get("/:profileName", function(req, res){
    res.render("profile");
});

app.get("/job/:id", function(req, res){
   Job.find({}) // Fetch all job documents from the database
        .then(jobs => {
            res.render("job-detail", {jobs: jobs, variableName: "Manan Sharma"}); // Pass the array of job documents to the view template
        })
        .catch(err => {
            console.error("Failed to fetch job documents:", err);
            res.status(500).send("Failed to fetch job documents");
        });
});

app.get("/job/:id", function(req, res){
    res.render("job-detail");
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
