import express from "express";
const app = express();

import path from "path";

app.use(express.static("public"));

// import jokes from "./util/jokes.js";

import fs from "fs";
// Components
// task read the navbar and the footer here
const navbar = fs.readFileSync("./public/components/navbar/navbar.html").toString();
const footer = fs.readFileSync("./public/components/footer/footer.html").toString();

// Pages
const frontpage = fs.readFileSync("./public/pages/frontpage/frontpage.html").toString();
const jokes = fs.readFileSync("./public/pages/jokes/jokes.html").toString();
const IRLQuests = fs.readFileSync("./public/pages/IRLQuests/IRLQuests.html").toString();

// Constructed pages
const frontpagePage = navbar + frontpage + footer;
const jokesPage = navbar + jokes + footer;
const IRLQuestsPage = navbar + IRLQuests + footer;

app.get("/", (req, res) => {
    res.send(frontpagePage);
});

app.get("/IRLQuests", (req, res) => {
    res.send(IRLQuestsPage);
});

app.get("/jokes", (req, res) => {
    res.send(jokesPage);
});



const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server running on port", PORT);
});
