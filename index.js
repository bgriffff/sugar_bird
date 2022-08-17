const express = require('express');

let app = express();

let path = require("path");

const port = 3000;

const dayjs = require('dayjs')

// const port = process.env.PORT || 3001;
// const knex = require(path.join(__dirname + '/knex/knex.js'));


require("dotenv").config({path:__dirname + "/.env"});

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
        res.redirect("/thanks");
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

app.get("/thanks", (req,res) => {
    //shows a thank you message
    res.render("thanks");

    // Sending Emails
    const sendgrid = require('@sendgrid/mail');

    const apiKey = process.env["API_TOKEN"];

    sendgrid.setApiKey(apiKey)

    const msg = {
    to: process.env["EMAIL_TO"],
    from: process.env["EMAIL_FROM"],
    subject: "New Order!!",
    text: 'Hey you just got a new order!',
    html: 'Hey you just got a new order! <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" >View Orders</a>',
    }
    sendgrid
    .send(msg)
    .then((resp) => {
        console.log('Email sent\n', resp)
    })
    .catch((error) => {
        console.error(error)
    })
});

app.get("/orders", (req, res) => {
    knex.select().from("sugar_bird").orderBy("pickup_date").then(new_order => {
        res.render("orders", {sugar_bird : new_order});
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

app.get("/table", (req, res) => {
    knex.select().from("sugar_bird").orderBy("pickup_date").then(new_order => {
        res.render("table", {sugar_bird : new_order});
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});

app.get("/view/:id", (req, res) => {
    knex("sugar_bird").where("order_id", parseInt(req.params.id)).then(new_order => {
        res.render("view", {sugar_bird : new_order});
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});


app.post("/view", (req,res) =>{
    knex("sugar_bird").where("order_id", parseInt(req.body.order_id)).update({
        // pickup_date: req.body.pickup_date,
        // first_name: req.body.first_name.toUpperCase(),
        // last_name: req.body.last_name.toUpperCase(),
        // email: req.body.email,
        // phone_number: req.body.phone_number,
        // num_cookies: req.body.num_cookies,
        // event: req.body.event,
        // theme: req.body.theme,
        // colors: req.body.colors,
        // personalization: req.body.personalization,
        // questions: req.body.questions,
        notes: req.body.notes,
    }).then(sugar_bird =>{
        res.redirect("/orders");
    }).catch(err => {
        console.log(err);
        res.status(500).json({err});
    });
});


app.post("/delete/:id", (req, res) => {
    knex("sugar_bird").where("order_id", req.params.id).del().then(sugar_bird => {
        res.redirect("/orders");
    });
});

app.post("/deleteTable/:id", (req, res) => {
    knex("sugar_bird").where("order_id", req.params.id).del().then(sugar_bird => {
        res.redirect("/table");
    });
});


app.use("/assets", express.static(__dirname + "/assets"));
app.use("/js", express.static(__dirname + "/js"));
app.use("https://unpkg.com/dayjs@1.8.21/dayjs.min.js", express.static(__dirname + "https://unpkg.com/dayjs@1.8.21/dayjs.min.js"));

app.listen(port, () => console.log("Website is listening"));
