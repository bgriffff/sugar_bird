const express = require('express');

let app = express();

let path = require("path");

const port = 3000;

// const port = process.env.PORT || 3001;
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
        pickup_date: req.body.pickup_date,
        first_name: req.body.first_name.toUpperCase(),
        last_name: req.body.last_name.toUpperCase(),
        email: req.body.email,
        phone_number: req.body.phone_number,
        num_cookies: req.body.num_cookies,
        event: req.body.event,
        theme: req.body.theme,
        colors: req.body.colors,
        personalization: req.body.personalization,
        questions: req.body.questions,
        notes: req.body.notes,
    }).then(sugar_bird =>{
        res.redirect("/orders");
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

app.get("/orders", (req, res) => {
    knex.select().from("sugar_bird").then(new_order => {
        res.render("orders", {sugar_bird : new_order});
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

app.use("/assets", express.static(__dirname + "/assets"));

app.listen(port, () => console.log("Website is listening"));
