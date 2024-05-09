var home = document.getElementById('home');
var explore = document.getElementById('explore');

home.addEventListener('click', function() {
    loadJSFile('../Controllers/home.js');
});

explore.addEventListener('click', function() {
    loadJSFile('../Controllers/explore.js');
});


function loadJSFile(filename) {
    var fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", filename);
    document.getElementsByTagName("head")[0].appendChild(fileref);
}
