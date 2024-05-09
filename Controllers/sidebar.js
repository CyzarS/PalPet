var home = document.getElementById('home');
var matchPet = document.getElementById('matchPet');
var explore = document.getElementById('explore');
var notifications = document.getElementById('notifications');
var create = document.getElementById('create');
var profile = document.getElementById('profile');

profile.addEventListener('click', function() {
    loadJSFile('../Controllers/profile.js');
});

home.addEventListener('click', function() {
    loadJSFile('../Controllers/palpet.js');
});

matchPet.addEventListener('click', function() {
    loadJSFile('../Controllers/matchPet.js');
});

explore.addEventListener('click', function() {
    loadJSFile('../Controllers/explore.js');
});

notifications.addEventListener('click', function() {
    loadJSFile('../Controllers/notifications.js');
});

create.addEventListener('click', function() {
    loadJSFile('../Controllers/create.js');
});

function loadJSFile(filename) {
    var fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", filename);
    document.getElementsByTagName("head")[0].appendChild(fileref);
}
