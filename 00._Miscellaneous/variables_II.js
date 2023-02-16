"use strict"

// Never EVER do this
// totalGlobalVariable = "Never ever do this";
// var globalVariable = "Also never do this";

/* {
    var someValue = true;
    {
        var someValue = false;
    }
    console.log(someValue);
} */

/* {
    let someValue = true;
    {
        let someValue = false;
    }
    console.log(someValue);
} */


/* for (var i = 0; i <= 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
} */

for (let i = 0; i <= 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
}
