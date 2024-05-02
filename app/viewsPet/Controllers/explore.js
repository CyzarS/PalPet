function loadHomeContent() {
    var dashboardContent = document.querySelector('.dashboard-content');

    var homeNavItem = document.getElementById('explore');
    if (!homeNavItem.classList.contains('active')) {
        return;
    }
    dashboardContent.innerHTML = `
        <div class="grid-container">
            <div class="card">
                <img src="https://via.placeholder.com/300" alt="Imagen 1">
                <div class="card-content">
                    <div class="card-title">Título 1</div>
                </div>
            </div>
            <div class="card">
                <img src="https://via.placeholder.com/300" alt="Imagen 2">
                <div class="card-content">
                    <div class="card-title">Título 2</div>
                </div>
            </div>
            <div class="card">
                <img src="https://via.placeholder.com/300" alt="Imagen 3">
                <div class="card-content">
                    <div class="card-title">Título 3</div>
                </div>
            </div>
            <div class="card">
                <img src="https://via.placeholder.com/300" alt="Imagen 4">
                <div class="card-content">
                    <div class="card-title">Título 3</div>
                </div>
            </div>
            <div class="card">
                <img src="https://via.placeholder.com/300" alt="Imagen 5">
                <div class="card-content">
                    <div class="card-title">Título 3</div>
                </div>
            </div>
            <div class="card">
                <img src="https://via.placeholder.com/300" alt="Imagen 6">
                <div class="card-content">
                    <div class="card-title">Título 3</div>
                </div>
            </div>
            <div class="card">
                <img src="https://via.placeholder.com/300" alt="Imagen 7">
                <div class="card-content">
                    <div class="card-title">Título 3</div>
                </div>
            </div>
            <div class="card">
                <img src="https://via.placeholder.com/300" alt="Imagen 8">
                <div class="card-content">
                    <div class="card-title">Título 3</div>
                </div>
            </div>
            <div class="card">
                <img src="https://via.placeholder.com/300" alt="Imagen 9">
                <div class="card-content">
                    <div class="card-title">Título 3</div>
                </div>
            </div>
        </div>`;
}

loadHomeContent();
