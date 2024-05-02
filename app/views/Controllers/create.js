function loadHomeContent() {
    var dashboardContent = document.querySelector('.dashboard-content');

    var homeNavItem = document.getElementById('create');
    if (!homeNavItem.classList.contains('active')) {
        return;
    }
    dashboardContent.innerHTML = `
    <div class="container-crear">
    <div class="form-container">
        <h2>Crear Mascota</h2>
        <form id="petForm">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>

            <label for="raza">Raza:</label>
            <input type="text" id="raza" name="raza" required>

            <label for="color">Color:</label>
            <input type="text" id="color" name="color" required>

            <label for="edad">Edad:</label>
            <input type="number" id="edad" name="edad" required>

            <button type="submit">Crear</button>
        </form>
    </div>

    <div class="image-container">
        <img src="https://via.placeholder.com/300" alt="Imagen de mascota">
    </div>
</div>`;
}

loadHomeContent();