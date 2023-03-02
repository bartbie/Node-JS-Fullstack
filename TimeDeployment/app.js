const express = require("express");
const app = express();
const PORT = 8080;

app.get("/", (_, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server is running on port ${PORT}`);
});
