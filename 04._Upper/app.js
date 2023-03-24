import express from "express";
const app = express();

import path from "path";

app.use(express.static("public"));

import templateEngine from "./util/templateEngine.js";

const frontpage = templateEngine.readPage("./public/pages/frontpage/frontpage.html");
const frontpagePage = templateEngine.renderPage(frontpage, {
    tabTitle: "Upper | Welcome"
});

const IRLQuests = templateEngine.readPage("./public/pages/IRLQuests/IRLQuests.html");
const IRLQuestsPage = templateEngine.renderPage(IRLQuests, {
    tabTitle: "Upper | IRLQuests"
});


app.get("/", (req, res) => {
    res.send(frontpagePage);
});

app.get("/IRLQuests", (req, res) => {
    res.send(IRLQuestsPage);
});

app.get("/jokes", async (req, res) => {
    const jokesPage = await templateEngine.renderJokePage();
    res.send(jokesPage);    
});


const PORT = Number(process.env.PORT) || 8082;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server running on port", PORT);
});
