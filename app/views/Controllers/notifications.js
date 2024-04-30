function loadHomeContent() {
    var dashboardContent = document.querySelector('.dashboard-content');

    var homeNavItem = document.getElementById('notifications');
    if (!homeNavItem.classList.contains('active')) {
        return;
    }
    dashboardContent.innerHTML = `
    <div class="profile-section">
        <div class="profile-info">
            <img src="profile-image.jpg" alt="Profile Image">
            <h2>Name: John Doe</h2>
            <p>Email: johndoe@example.com</p>
            <p>Phone: +1234567890</p>
            <hr>
        </div>

        <div class="card-section">
            <div class="card">
                <img src="card1-image.jpg" alt="Card 1 Image">
                <h3>Card 1 Title</h3>
            </div>
            <div class="card">
                <img src="card2-image.jpg" alt="Card 2 Image">
                <h3>Card 2 Title</h3>
            </div>
            <div class="card">
                <img src="card3-image.jpg" alt="Card 3 Image">
                <h3>Card 3 Title</h3>
            </div>
            <div class="card">
                <img src="card4-image.jpg" alt="Card 4 Image">
                <h3>Card 4 Title</h3>
            </div>
            <!-- Repite las tarjetas anteriores para completar la fila -->
            <!-- Puedes añadir más tarjetas según sea necesario -->
            <!-- Ejemplo de la tarjeta 5 -->
            <div class="card">
                <img src="card5-image.jpg" alt="Card 5 Image">
                <h3>Card 5 Title</h3>
            </div>
            <!-- Y así sucesivamente -->
        </div>
    </div>`;
}

loadHomeContent();