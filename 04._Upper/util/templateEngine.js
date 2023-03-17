import fs from "fs";
import getJoke from "./jokes.js";
import escape from "escape-html";


function renderPage(page, config={}) {
    const navbar = fs.readFileSync("./public/components/navbar/navbar.html").toString()
                    .replace("$TAB_TITLE", config.tabTitle || "Upper")
                    .replace("$CSS_LINK", config.cssLink || "");
    const footer = fs.readFileSync("./public/components/footer/footer.html").toString()
                    .replace("$FOOTER_YEAR", `© ${new Date().getFullYear()}`);

    return navbar + page + footer;
}

function readPage(pagePath) {
    return fs.readFileSync(pagePath).toString();
}

async function renderJokePage() {
    const path = "./public/pages/jokes/jokes.html";
    let jokePage = readPage(path);
    const joke = await getJoke();

    if (joke.joke) {
        jokePage = jokePage.replace("$JOKE_HTML_CONTENT", `<h3>${joke.joke}</h3>`);
    } else if (joke.setup && joke.delivery) {
        const jokeHtmlContent = `
            <h3>${escape(joke.setup)}</h3>
            <h4>...</h4>
            <h3>${escape(joke.delivery)}</h3>
        `;
        jokePage = jokePage.replace("$JOKE_HTML_CONTENT", jokeHtmlContent);
    } else {
        jokePage = jokePage.replace("$JOKE_HTML_CONTENT", "<h3>No jokes for you.</h3>");
    }

    const constructedPage = renderPage(jokePage, {
        tabTitle: "Upper | Jokes",
        cssLink: `<link rel="stylesheet" href="/pages/jokes/jokes.css">`
    });
    return constructedPage;    
}

export default {
    renderPage,
    readPage,
    renderJokePage
};
