"use strict";
const express = require('express');
const app = express();
const PORT = 8080;

// some mockup logic to simulate our app
const birds = []
for (let i = 1; i < 11; i++) {
    birds.push({
        id: i,
        name: String.fromCharCode(i+96)
    });
}

app.use(express.json())

// logging middleware
app.use((req, _, next) => {
    console.log(`Received Request: ${req.method} ${req.url}`);
    next();
})

app.get("/", (_, res) => {
    const welcome_page = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Birds API</title>
        </head>
        <body>
            <h1>Birds API</h1>
            <h2>Welcome</h2>
            <h3>Documentation</h3>
            <p>
                /birds
                <ul>
                    <il>GET - retrieve all birds</il>
                </ul>
            </p>
            <p>
                /birds/{id}</p>
                <ul>
                    <il>GET - retrieve specific bird by {id} </il>
                </ul>
            <p/>
        </body>
    </html>`;
    res.send(welcome_page);

})

app.get("/birds", (req, res) => {
    res.send(birds)
});

app.get("/birds/:id", (req, res) => {
    res.send(birds.find(e => e.id == req.params.id))
});

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`)
});
