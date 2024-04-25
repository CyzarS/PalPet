function loadHomeContent() {
    var dashboardContent = document.querySelector('.dashboard-content');
    
    var homeNavItem = document.getElementById('home');
    if (!homeNavItem.classList.contains('active')) {
        return;
    }

    // Inserta el código del carrusel y las tarjetas dentro del elemento .dashboard-content
    dashboardContent.innerHTML = `
        <!-- Carrusel -->
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="Images/slide1.png" class="d-block w-100 rounded" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="Images/slide2.png" class="d-block w-100 rounded" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="Images/slide3.png" class="d-block w-100 rounded" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div><br>
        <div class="heading">Check out our newest friends!</div>
        <!-- Tres tarjetas -->
        <div class="row mt-4">
            <div class="col-md-4">
                <div class="card">
                    <img src="Images/mascota1.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Nala</h5>
                        <p class="card-text">Breed: Toy Terrier</p>
                        <p class="card-text">Weight: 3 kg</p>
                        <p class="card-text">Height: 20 cm</p>
                        <p class="card-text">Age: 12 months</p>
                        <p class="card-text">Color: Brown</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <img src="Images/mascota2.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Escobar</h5>
                        <p class="card-text">Breed: Chihuahua</p>
                        <p class="card-text">Weight: 2 kg</p>
                        <p class="card-text">Height: 15 cm</p>
                        <p class="card-text">Age: 8 months</p>
                        <p class="card-text">Color: Black</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <img src="Images/mascota8.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Lena</h5>
                        <p class="card-text">Breed: Ragdoll</p>
                        <p class="card-text">Weight: 1 kg</p>
                        <p class="card-text">Height: 15 cm</p>
                        <p class="card-text">Age: 6 months</p>
                        <p class="card-text">Color: Grey</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

loadHomeContent();