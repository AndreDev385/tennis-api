document
    .getElementById("login-form")
    .addEventListener("submit", function(event) {
        console.log("submit");

        console.log(event, "Event");
    });

document
    .getElementById("login-form")
    .addEventListener("htmx:afterSwap", function(event) {
        console.log("hmtx:afterSwap");

        console.log(event);
    });
