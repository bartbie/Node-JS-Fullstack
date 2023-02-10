
// possible because of hoisting
// console.log(random(0, 10));

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) - min);
}

const randomAnonymousFunction = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) - min);
};

const randomArrowFunction = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) - min);
};

const randomArrowFunctionCompact = (min, max) => Math.floor(Math.random() * (max - min + 1) - min);



function genericActionPerformer(genericAction, genericName) {
    // do stuff...

    return genericAction(genericName);
}

const subtract = (name) => `${name} is subtracting.`;
console.log(genericActionPerformer(subtract, "Tobias"));

const walk = (name) => `${name} is walking`;
console.log(genericActionPerformer(walk, "Nicolas"));



console.log(genericActionPerformer((name) => `${name} is reading.`, "Andrea"));

