function loadHomeContent() {
    var dashboardContent = document.querySelector('.dashboard-content');
    
    var homeNavItem = document.getElementById('home');
    if (!homeNavItem.classList.contains('active')) {
        return;
    }

    
    dashboardContent.innerHTML =
    '<img src="Images/home.png" alt="Home" style="width: 100%;" />' +
    '<button id="btn_home" style="position: absolute; bottom: 15%; right: 15%; background-color: #2B3499; color: white; border-radius: 200px; padding: 10px 20px; border: none; font-size: 2vw;">Click here to try!</button>';                         
}

loadHomeContent();