$(document).ready(function() {
})

let imagelist = ["header.png", "portrait.png", "me.jpeg", "smile.jpeg"]

var timesPerSecond = 4; // how many times to fire the event per second
var wait = false;
$(document).on('mousemove', function (event) {
    // don't handle events when one has just occurred
    if (!wait) {
        // fire the event
        logMouse(event);
        // stop any further events
        wait = true;
        // after a fraction of a second, allow events again
        setTimeout(function () {
            wait = false;
        }, 1000 / timesPerSecond);
    } 
});

function logMouse(e) {

    const randomElement = imagelist[Math.floor(Math.random() * imagelist.length)];
    $(".aboutimage").attr("src", "../static/img/about/" + randomElement);

}