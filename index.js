const express = require('express');

let app = express();

let path = require("path");

const port = process.env.PORT || 3001;
// const knex = require(path.join(__dirname + '/knex/knex.js'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended : true}));

const knex = require('knex')({
    client: "pg",
    connection:{
        host: "localhost",
        user: "postgres",
        password: "1312",
        database: "cookies",
        port: 5432
    }
});

app.get("/", (req,res) => {
    res.render("form");
});

app.post("/", (req,res) =>{
    knex("sugar_bird").insert({
        name: req.body.name.toUpperCase(),
        num_standard: req.body.num_standard,
        cookie_detail_stan: req.body.cookie_detail_stan,
        num_large: req.body.num_large,
        cookie_detail_large: req.body.cookie_detail_large,
        description: req.body.description,
        date: req.body.date,
        num_hours: req.body.num_hours,
    }).then(cookies =>{
        res.redirect("/");
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

app.use("/assets", express.static(__dirname + "/assets"));

app.listen(port, () => console.log("Website is listening"));
