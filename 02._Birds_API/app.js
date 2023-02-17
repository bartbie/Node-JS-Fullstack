const express = require("express");
const app = express();

const birds = [
    { id: 1, name: "Violet-backed starling", maleRating: 10, femaleRating: 2 },
];

app.get("/birds", (req, res) => {
    res.send({ data: birds });
});

app.get("/birds/:id", (req, res) => {
    const foundBird = birds.find(bird => bird.id === Number(req.params.id));

    res.send({ data: foundBird });
});

app.listen(8080, () => {
    console.log("Server is running on port", 8080);
});
