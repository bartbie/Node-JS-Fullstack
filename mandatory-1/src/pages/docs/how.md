---
layout: ../../layouts/DocsLayout.astro
title: How
---
# How

*Before reading this part, I advise to read [this section](http://localhost:3000/docs/astro#astrojs) about how astro works, more or less.*

## Node integration

Astro is meant to be used standalone, it being its own server handling the routing etc.
Thankfully (for me), it allows to be used on a Node server.
It can also act as a middleware run by express (or netlify).

`astro.config.mjs`:
```js
import { defineConfig } from "astro/config";
import node from '@astrojs/node';
// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'middleware'
  }),
});
```
`app.mjs`:
```js
import express from 'express';
import { handler as ssrHandler } from '../dist/server/entry.mjs';

const app = express();
const PORT = 3000;

app.use(express.static('dist/client/'))
app.use(ssrHandler);

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```
The benefit is that astro still handles our routing via its file-based solution, so we don't need to write reduntant functions.

The problem is, now we need to *manually* build our pages first using `npm run build` before running the server!
I've automated the process via npm scripts + i've added `run.sh` for newcomers.

**Remember to first install the dependencies.**

## File-based routing

As mentioned in the Node section, we don't need to write our own route-handlers.
Instead, this project leverages the Astro's file-based routing system.

```sh
./src
└── pages  # this is where our routes live
    ├── admin  # folders are used for nested routing
    │   ├── index.astro  
    │   └── login.astro  # one of the endpoints
    ├── docs
    │   ├── express-js.md  # we use Markdown for our docs endpoints
    │   ├── index.astro
    │   └── introduction.md
    └── index.astro
```

We have this `index.astro` files used, one in root of `pages/`, the other two in `docs/` and `admin/` respectively.
As the name suggests, those represent `/` endpoints.

In our case, those are just redirects to other pages.

```astro
<!-- pages/docs/index.astro -->
<script is:inline>
	// Redirect to the first page of documentation.
	window.location.pathname = `/docs/introduction`;
</script>
```

## Express.js bottleneck problem

As mentioned [here](http://localhost:3000/docs/how#node-integration), Astro is usually run standalone and we have to run it via Express app due to project's requirements.

This isn't too bad (i mean you can read this documentation right now!), but it means that there is a seperate build step.
Not a problem for running the server itself,
but it restricts us from running smart code that would programmatically add each Markdown file from folder located elsewhere during building/deploying time (those are the same step when running standalone, remember).

Moreover, this disallows us to generate new routes during runtime

To put it simply, 

- *now*, when you want to add a new Markdown route, you need to put the file inside `src/pages/docs` (or your other nested route).
You also need to specify routes in `CONSTS.ts` file if you want your file to be on the sidebar.
 
- *instead*, you could have seperate folder called content where your files are located and your astro server would build routes from.

- *moreover*, you can't have dynamic new routing, you need to rebuild your astro middleware everytime you add a file.

*Technically*, the last sentence may be a lie, simply because I coudn't figure out a way outside the official, supported Astro way™.

### Deployment
Lastly, I haven't tested deploying on Vercel yet,
but I wouldn't be surprised to discover that it's not working in the express mode.

Obviously, you can still run this project without express, via `npm run start` or `npm run dev` (those are aliases).

This has the nice benefit of dropping the build step for Node, so hot-reloading works again.

## Admin page
Admin page is unfortunately only a mockup, there is no Markdown uploading functionality yet.

The auth system itself is also obviously just a mockup, the passwords are stored in `CONSTS.ts` are printed in the client's console to make the demo faster to debug. This obviously is not secure. Obviously.

<br/>

 *Thanks for reading :)*