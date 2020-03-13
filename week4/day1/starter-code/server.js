const express = require("express");
const server = express();
const PORT = 9999; //must be 4 digits
const path = require("path"); // to install : npm install hbs
const hbs = require("hbs"); //no need ton install : core nodel lib
//const projects = require("./public/js/data")


//inital setup
// __dirname : dossier du serveur
//server.use : location where everything will be downloaded
//server.view : define where the "views" are

// Make everything inside of public/ available to the browser (styles, images, frontend scripts)
server.use(express.static(path.join(__dirname, "public"))); // rock solid syntax

// indicates express where our "views" templates are located
// view is a term part of MVC design pattern... more coming. in a nutshell, a view is a page ; )
server.set("views", path.join(__dirname, "views"));
// indicates express wich view engine this app will use ; )
server.set("view engine", "hbs"); // in this case hbs, there are others ... pug/jade etc.engine !

hbs.registerPartials(path.join(__dirname, "views/partials"));
// what is a view engine ???
// basicaly a way to code HTML++ (loops, conditionals)

/////////////////////////////////////
//////setup routes
/////////////////////////////////////

server.get("/", (HTTPrequest, HTTPResponse) => {
    const data = {
        title: "Hello I'm Pascal",
        p: ["I'm a senior project manager, junior web dev", "I love to design, develop and deliver stuff"],
        imgSource: "./assets/img/photoPB.jpg"
    };
    HTTPResponse.render("home", data); // data as to be an object
})

server.get("/projects", (req, res) => {
    const projects = [
        {   name: "I Love Paris",
            description: "a game to test your knowledge and learn about Paris",
            imgSource:"./assets/img/iloveparis.jpg",
            link:"https://pascalbes.github.io/iloveparis/"
        },
        {   name: "I Love Nancy",
            description: "a game to test your knowledge and learn about Nancy",
            imgSource:"/assets/img/ilovenancy.jpg",
            link:""
        }]
    res.render("projects", {projects});
})

server.get("/about", (req, res) => {
    const data = {
        title: "Présentation",
        css:["about"]
    }
    res.render("about", data);
})

server.get("*", (req, res) => {
    res.send("error 404");
})

//kickstart
server.listen(PORT, ()=> {
    console.log("yata ! server is tunning @ http://localhost:" + PORT)
});