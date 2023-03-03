import express from "express";
const app = express();

// import jokes from "./util/jokes.js";






const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server running on port", PORT);
});
