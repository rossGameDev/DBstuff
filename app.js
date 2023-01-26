var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.port||3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/gameEntries",{
    useNewURLParser:true
}).then(function(){
    console.log("Connected to MongoDB!");
}).catch(function(err){
    console.log(err);
});

require("./models/Game");
var Game = mongoose.model("game");

//example routes
app.get("/", function(req, res){
    res.send("Hello!");
});

app.get("/poop", function(req, res){
    res.send("What's up bro?");
});

app.post("/saveGame", function(req, res){
    console.log(req.body);        

    new Game(req.body).save().then(function(){
        //res.send(req.body);
        res.redirect("index.html");
    });
})

app.get("/getGames", function(req, res){
    Game.find({}).then(function(game){
        console.log({game});
        res.json({game});
    });
})

app.use(express.static(__dirname+"/pages"));
app.listen(port, function(){
    console.log(`Running on Port ${port}`);
});