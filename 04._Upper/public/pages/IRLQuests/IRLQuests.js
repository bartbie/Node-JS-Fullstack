

fetch("https://www.boredapi.com/api/activity")
.then(response => response.json())
.then(result => {
    document.getElementById("quest").innerText = result.activity;
});



