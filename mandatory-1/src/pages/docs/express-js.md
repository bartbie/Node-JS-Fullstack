---
layout: ../../layouts/DocsLayout.astro
title: Express.js
---
# Express.js Documentation

Express.js is a popular web framework for Node.js that allows us to create quickly backends in Node that handle HTTP requests. This document will provide what was more or less presented during the course on this topic so far.

## Installation

*Obviously*, as express.js is an npm package, so you need to install it first. Run this command in your project folder to install the dependency.

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

## Routing
In order for our server-application to have any use, we need to add functions that will handle incoming requests!

the general structure of our request-handler method looks like this:

```js
app./*name of our HTTP method*/("/name-of-endpoint", (req, res) => {
    // our logic here
    res.send(data);
})
```

probably the most used HTTP methods out there,
GET and POST, as examples:

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

## Dynamic Routes

Writing same code for each possible combination inside our routes would be tedious to do, so we can automate it instead!

### URL Params

If required, we can access [URL parameters](https://en.wikipedia.org/wiki/Query_string) defined by us inside our schema in the endpoint string passed to `app`.

Here's a simple use case: imagine we need to know which resource to serve based on id. We can just specify param `id` inside our endpoint string, parse inside our closure the param and go on with our logic.

```js
app.delete("/endpoint/:id", (req, res) => {
    const id = Number(req.params.id);
    // rest of our logic
    res.send(data);
})
```

### Regex-matched Routes

What if we want more? What if we want our routes to be handled by a pattern, so we don't need to write/pass the same function for our [bat, cat, fat, etc.] routes? That's where regular expressions comes in with help.

```js
app.patch(/[a-zA-z]at/, (req, res) => { 
   // you know the rest 
})
```

## Middleware
Express allows us to provide a **middleware** for our app. Those refeer to functions that can be executed before the proper route-handler method gets called. They are regularly used for logging, auth, error handling or parsing general data
```js
// middleware for logginc incoming request
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next(); // you need to call next
});
```
`next()` tells our app move on to the next function, be it another middleware in line or the route handler. 

## Filesystem access
since NodeJS is a server-runtime, this allows us to have proper access to filesystem, compared to the usual JS written for sandboxed webapps run on client-end.

```js
import fs from "fs";
const file_str = fs.readFileSync("/some/cool/file.temp").toString()
```