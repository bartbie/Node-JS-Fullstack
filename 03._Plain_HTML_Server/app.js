const express = require("express");
const app = express();

app.use(express.static("public"));


// const tankUtil = require("./util/tanks.js");
// console.log(tanksUtil.getTanks());

const { getTanks, addTank } = require("./util/tanks.js");
// console.log(getTanks());

let visitorCount = 0;

/* Pages */

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/frontpage/frontpage.html");
});

app.get("/tanks", (req, res) => {
    res.sendFile(__dirname + "/public/tanks/tanks.html");
});

app.get("/visitors", (req, res) => {
    res.sendFile(__dirname + "/public/visitors/visitors.html");
});

app.get("/museumGuards", (req, res) => {
    res.sendFile(__dirname + "/public/museumGuards/museumGuards.html");
});


/* API */

app.get("/api/tanks", (req, res) => {
    res.send({ data: getTanks() });
});

app.get("/api/visitors", (req, res) => {
    res.send({ data: visitorCount });
});

app.put("/api/visitors", (req, res) => {
    res.send({ data: ++visitorCount });
});

app.get("/api/guards", (req, res) => {
    if (req.query.passport === "theskyisblue") {
        return res.redirect("/api/tanks");        
    }
    res.send({ message: "You are not allowed to see the tanks. Give us the secret in the query string with the key being passpor. "});    
});


const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Server is running on port", PORT);
});
