function loadHomeContent() {
    var dashboardContent = document.querySelector('.dashboard-content');

    var homeNavItem = document.getElementById('create');
    if (!homeNavItem.classList.contains('active')) {
        return;
    }
    dashboardContent.innerHTML = "<h1>Estoy en la página de create</h1>";
}

loadHomeContent();