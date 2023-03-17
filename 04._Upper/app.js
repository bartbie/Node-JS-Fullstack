import express from "express";
const app = express();

import path from "path";

app.use(express.static("public"));

import jokes from "./util/jokes.js";

import fs from "fs";
// Components
// task read the navbar and the footer here
const navbar = fs.readFileSync("./public/components/navbar/navbar.html").toString();
const footer = fs.readFileSync("./public/components/footer/footer.html").toString();

// Pages
const frontpage = fs.readFileSync("./public/pages/frontpage/frontpage.html").toString();
// task read the other files and serve them 

// Constructed pages
const frontpagePage = navbar + frontpage + footer;

app.get("/", (req, res) => {
    res.send(frontpagePage);
});

app.get("/IRLQuests", (req, res) => {
    res.sendFile(path.resolve("public/pages/IRLQuests/IRLQuests.html"));
});

app.get("/jokes", (req, res) => {
    res.sendFile(path.resolve("public/pages/jokes/jokes.html"));
});



const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server running on port", PORT);
});
