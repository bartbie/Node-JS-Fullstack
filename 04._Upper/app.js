import express from "express";
const app = express();

import path from "path";

app.use(express.static("public"));

// import jokes from "./util/jokes.js";

import renderPage from "./util/templateEngine.js";

const frontpagePath = "./public/pages/frontpage/frontpage.html";
const frontpagePage = renderPage(frontpagePath, {
    tabTitle: "Upper | Welcome"
});

const jokesPath = "./public/pages/jokes/jokes.html";
const jokesPage = renderPage(jokesPath, {
    tabTitle: "Upper | Jokes",
    cssLink: `<link rel="stylesheet" href="/pages/jokes/jokes.css">`
});

const IRLQuestsPath = "./public/pages/IRLQuests/IRLQuests.html";
const IRLQuestsPage = renderPage(IRLQuestsPath, {
    tabTitle: "Upper | IRLQuests"
});


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
