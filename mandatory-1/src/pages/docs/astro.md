---
layout: ../../layouts/DocsLayout.astro
title: Server-side rendering && Astro
---

# Server-side rendering && Astro

## What is SSR?

SSR means the process of generating HTML, CSS, and JavaScript beforehand, on the server, and sending to the client as a fully rendered page. This obviously differs from the traditional SPA mindset, where we generate out HTML and CSS programmatically on the client's machine via JS sent by us.

You can kinda think of it like a compilation step done on the server for the page sent to the client. The difference is your server acts as the compiler, usually using functionality provided by some framework/library.

## Why?

SSR has several benefits for us:
- Search engines crawlers have restrictions on what they can load when opening a page, usually they ignore JS;
SSR allows to improve our search engine optimization (SEO), since our server renders the page before-hand and crawlers see the same content as our users.

- Since the user already gets the rendered website, the initial load time of the website can be much faster. The drawback here is when the server needs to rerender the page for the request, which means that the users will see loading state longer in this scenario. Usually though, you prerender the route once or the render itself is very fast, so it's a worthy trade off.

- Some privacy-internet people on the internet just don't use the browser with JS enabled, since it can leak your digital footprint. no-JS prerendered websites allow them to see your content anyway.


## Astro.js

Astro is an interesting case in the world of ever-changing landscape of JS/TS frameworks.
It is a framework, allowing us to use components, layouts, hot-reloading your code, its CLI tool,
automatic TS transpilation, and all the other perks the frameworks using Vite under the hood made us used to at this point.

Yet at the same time it is kind-of a static-site generator, that allows you to render static sites at build time via Vite (sounds like the mentioned SSR!) that only ship HTML and CSS with JS being opt-in at each component level. Moreover, you can create your routes using just* Markdown files like this very documentation you're reading right now.

Less important for our use-case yet worth mentioning, since it is basically an SSR-only framework,
it allows you to write your components in most of the popular frameworks (React, Solid, Svelte etc.) if wanted,
that then get rendered to pure HTML+CSS.

## Quick Astro introduction

### syntax

you write your components either the framework you want (e.g. `jsx` for React or Solid),
or using the astro syntax inside `.astro` files

```astro
---
// here you put logic that will be executed once, during build time
import {sometext} from "somewhere";
---

<!-- our component structure, think JSX but pure HTML,
 no VDOM or other abstractions -->
<p>
{sometext /*hey like in JSX!*/}
<slot/> <!-- that means the children of this component-->
</p>

<style> /* css */
p { color: blue; }
</style>

<script>
// if you want, you can include JS within your component
console.log(sometext)
</script>
```

You can also create Layouts, which define how the whole body should look like, syntax being the same.

### generating pages from Markdown

What is extremely useful for our use-case is the fact that we can define routes using simple Markdown files!

You can specify the layout used for the page to make it look fancy,
and other key-value pairs that you can read in that layout to programmatically setup other html elements,
like title, author, etc.
```md
<!--literally yanked from this page-->
---
layout: ../../layouts/DocsLayout.astro
title: Server-side rendering && Astro
---
# Server-side rendering && Astro
blah blah
```
This is why Astro is popular in the space of online documentations,
since it allows us to quickly generate massive amounts of pages from probably already created in Markdown format documents.

