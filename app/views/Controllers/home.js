function loadHomeContent() {
    var dashboardContent = document.querySelector('.dashboard-content');
    
    var homeNavItem = document.getElementById('home');
    if (!homeNavItem.classList.contains('active')) {
        return;
    }

    
    dashboardContent.innerHTML =
    '<img id="img_home" src="Images/home.png" alt="Home" style="width: 100%;" />'

    var img_home = document.getElementById('img_home');

    img_home.addEventListener('click', function() {
        loadJSFile('Controllers/matchPet.js');
    });

    function loadJSFile(filename) {
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}

loadHomeContent();