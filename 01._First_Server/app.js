const app = require("express")();
/* const express = require("express");
const app = express(); */

// route (entire thing)
//  HTTP method
//  |   endpoint   callback function
app.get("/", (req, res) => {
    res.send({ message: "Our first route" });
});

let bicycleSpins = 0;
app.get("/spinthebicycle", (req, res) => {
    bicycleSpins += 1;
    res.send({ message: `People have spun the bicycle wheel ${bicycleSpins} times` });
});

app.get("/about", (req, res) => {
    res.send(`
        <h1>About</h1>
        <h3>This is my about page.</h3>
    `);
});




app.listen(8080);
