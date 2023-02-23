"use strict";
const express = require('express');
const app = express();
const PORT = 8080;

// some mockup logic to simulate our app

// my primitive implementation of python's range function
/** @type {(n: number, m: number?, step: number?) => number[]} */
const range = (n, m=undefined, step=undefined) => {
    if (m == undefined) {
        return [...Array(n).keys()]
    } else if (step == undefined) {
        return range(m-n).map(i => i + n)
    }
    return range(n, m).filter((_, i) => i%step==0)
} 

// NOTE: birds will always have same ID as index

const birds = range(1, 11).map(i => ({
    id: i,
    name: String.fromCharCode(i+96)
}))


/** @type {(id: number) => bool} */
const check_id = (id) => {
    return id > 0 && id <= birds.length
    // return birds.findIndex(e => e.id == id) == undefined
}

const parse_bird = (bird) => {
    // TS here would be perfect
    const msg = "Missing required property!"
    if ( !("name" in bird)) {
        return { error: true, message: msg};
    }
    if (Object.keys(bird).find(e=> !(e in ["name"]))) {
        return { error: true, message: "Invalid shape of data!"};
    }
    return {error: false, bird};
}

const find_bird = (id) => {
    if (!check_id(id)) {
        return {error: true, message: `No bird with ID ${id} exists!`};
    }
    return { error: false, bird: birds[id-1] };
}

/** @type {(bird: {name: string})} */
const add_bird = (bird) => {
    bird.id = birds.length
    birds.push(bird)
    return bird;
}

const update_bird = (id, bird) => {
    // TS here would be perfect even more
    if (!check_id(id)) {
        return {error: true, message: `No bird with ID ${id} exists!`}
    }
    Object.assign(birds[id-1], bird)
    return {error: false, updated_bird: birds[id-1]}

}

const delete_bird = (id) => {
    if (!check_id(id)) {
        return {error: true, message: `No bird with ID ${id} exists!`}
    }
    birds.splice(id-1, 1);
    birds.slice(id).forEach(e, i => e.id = i)
    return {error: false}
}


// API

app.use(express.json())

// logging middleware
app.use((req, _, next) => {
    console.log(`Received Request: ${req.method} ${req.url}`);
    next();
})

// TODO update documentation
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
            <h1>OUTDATED</h1>
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
    res.send({data: birds});
});

app.get("/birds/:id", (req, res) => {
    const id = Number(req.params.id);
    const {error, message, bird} = find_bird(id);
    if (error) {
        res.send({ message })
        return
    }
    res.send({ data: bird });
});

app.post("/birds", (req, res) => {
    const new_bird = req.body;
    const {error, message} = parse_bird(new_bird);
    if (error) {
        res.send({message});
        return
    }
    res.send({data: add_bird(new_bird)})
})

app.put("/birds/:id", (req, res) => {
    const id = Number(req.params.id);
    const bird = req.body;
    const data_ver = parse_bird(bird);
    if (data_ver.error) {
        res.send({message: data_ver.message});
        return;
    }
    const {error, message, updated_bird} = update_bird(id, bird);
    if (error) {
        res.send({message});
        return
    }
    res.send({message: updated_bird})
});

app.delete("/birds/:id", (req, res) => {
    const id = Number(req.params.id);
    const {error, message} = delete_bird(id);
    if (error) {
        res.send({message})
        return
    }
    res.send({message: "Bird has beed deleted"});
})

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`)
});
