function loadHomeContent() {
    var dashboardContent = document.querySelector('.dashboard-content');
    
    var homeNavItem = document.getElementById('home');
    if (!homeNavItem.classList.contains('active')) {
        return; 
    }

    dashboardContent.innerHTML =
    '<img id="img_match" src="Images/ExploreHome.png" alt="Home" style="width: 100%;" />'

    var img_match = document.getElementById('img_match');

    img_match.addEventListener('click', function() {
        loadJSFile('Controllers/explore.js');
    });

    function loadJSFile(filename) {
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}

loadHomeContent();