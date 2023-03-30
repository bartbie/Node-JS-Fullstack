---
layout: ../../layouts/DocsLayout.astro
title: Express.js
---
# Express.js Documentation

Express.js is a popular web framework for Node.js that allow to create quickly backends in Node that handle HTTP requests. This document will provide what was more or less presented during the course so far.

## Installation

Obviously, as express.js is an npm package, you need to install it first. Run this command in your project folder.

```sh
npm install express
```

## Creating an Express Application

To create an Express.js application, you need to require the Express.js module and create an instance of it. 

- using the `require` syntax from CommonJS (`.cjs` files)

```js
const express = require('express');
const app = express();
```

- using the `import` syntax from ECMAScript (`.mjs` files)

```js
import {express} from 'express';
const app = express();
```

After that, specify a port to listen and pass a closure, that will be run after starting the server.

Here's a common way to do it.
```js
const PORT = 3000; // for example
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## HTTP Requests
In order for our server-application to have any use, we need to add functions that will handle incoming requests!

### GET
```js
app.get("/endpoint", (req, res) => {
    res.send(data); // put our data here
});
```

### POST
```js
app.post("/endpoint", (req, res) => {
    // our logic here
    res.send(data);
});
```

and so on...