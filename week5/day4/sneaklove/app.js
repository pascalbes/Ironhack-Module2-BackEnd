console.log("node says : waxOn/waxOff !");

require("dotenv").config();
require("./config/mongodb"); // database initial setup
require("./helpers/hbs"); // utils for hbs templates


// base dependencies
const express = require("express");
const hbs = require("hbs");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

// const path = require("path"); (utile ?)

// initial config
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());


// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    }),
    saveUninitialized: true,
    resave: true
  })
);

app.use(flash());

app.locals.site_url = `http://localhost:${process.env.PORT}`;
//SITE-URL ???
// used in front end to perform ajax request (var instead of hardcoded)

// CUSTOM MIDDLEWARE
// check if user is logged in... 
// usecases : conditional display in hbs templates
// WARNING: this function must be declared AFTER the session setup
// WARNING: this function must be declared BEFORE app.use(router(s))


// function eraseSessionMessage() {
//   var count = 0; // initialize counter in parent scope and use it in inner function
//   return function(req, res, next) {
//     if (req.session.msg) { // only increment if session contains msg
//       if (count) { // if count greater than 0
//         count = 0; // reset counter
//         req.session.msg = null; // reset message
//       }
//       ++count; // increment counter
//     }
//     next(); // continue to the requested route
//   };
// }

// app.use(eraseSessionMessage);

// Getting/Using router(s)
const basePageRouter = require("./routes/index");
app.use("/", basePageRouter);

app.use("/auth", require("./routes/auth"));
app.use("/dashboard", require("./routes/dashboard"));

module.exports = app

