const express = require("express");
const app = express();

app.use(express.json());

const birds = [
    { id: 1, name: "Violet-backed starling", maleRating: 10, femaleRating: 2 },
    { id: 2, name: "Penguin" },
];
let currentId = 2;

app.get("/birds", (req, res) => {
    res.send({ data: birds });
});

app.get("/birds/:id", (req, res) => {
    const foundBird = birds.find(bird => bird.id === Number(req.params.id));
    res.send({ data: foundBird });
});

app.post("/birds", (req, res) => {
    const birdToCreate = req.body;
    birdToCreate.id = ++currentId;
    birds.push(birdToCreate);
    res.send({ data: birdToCreate });
});


app.patch("/birds/:id", (req, res) => {
    let foundIndex = birds.findIndex(bird => bird.id === Number(req.params.id));
    if (foundIndex === -1) {
        res.status(404).send({ message: `No bird found with id ${req.params.id}` })
    } else {
        const foundBird = birds[foundIndex];
        const birdToUpdate =  { ...foundBird, ...req.body, id: foundBird.id };
        birds[foundIndex] = birdToUpdate;
        res.send({ data: birdToUpdate });
    }
});


app.delete("/birds/:id", (req, res) => {
    const foundIndex = birds.findIndex(bird => bird.id === Number(req.params.id));
    if (foundIndex === -1) {
        res.status(404).send({ data: foundIndex, message: `No bird found with id ${req.params.id}` })
    } else {
        const deletedBird = birds.splice(foundIndex, 1)[0];
        res.send({ data: deletedBird });
    }
});


app.listen(8080, () => {
    console.log("Server is running on port", 8080);
});
