function loadHomeContent() {
    var dashboardContent = document.querySelector('.dashboard-content');

    var homeNavItem = document.getElementById('create');
    if (!homeNavItem.classList.contains('active')) {
        return;
    }
    dashboardContent.innerHTML = `
    <div class="container-crear">
    <div class="form-container">
        <h2>CREATE PET</h2>
        <form id="petForm">
            <label for="nombre">Name:</label>
            <input type="text" id="name" name="Name" required>

            <label for="Species">Species:</label>
            <select id="specie" name="Species" required> 
                <option value="" selected disabled hidden></option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
            </select>

            <label for="breed">Breed:</label>
            <input type="text" id="breed" name="Breed" required>

            <label for="edad">Age:</label>
            <input type="number" id="age" name="Age" required>

            <label for="gender">Gender:</label>
            <select id="gender" name="gender" required> 
                <option value="" selected disabled hidden></option>
                <option value="true">Male</option>
                <option value="false">Female</option>
            </select>

            <label for="descripcion">Description:</label> 
            <textarea id="description" name="Description" required></textarea>

            <label for="image">Image:</label>
            <input type="file" id="imageUrl" name="Image" accept="image/png, image/jpeg" required>
            <button type="submit">Crear</button>
        </form>
    </div>

    <div class="image-container">
        <img id="preview" src="https://via.placeholder.com/300" alt="Imagen de mascota">
    </div>
</div>`;

    document.getElementById('imageUrl').addEventListener('change', function() {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview').src = e.target.result;
        }
        reader.readAsDataURL(this.files[0]);
    });

    createPet();
}

function createPet() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token JWT no encontrado.');
        return;
    }

    const petForm = document.getElementById('petForm');
    petForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(petForm);
        const pet = {};
        formData.forEach((value, key) => {
            pet[key] = value;
        });

        // Añade los campos faltantes
        pet.stock = 1; // Asume que el stock siempre es 1

        // Convierte el URL de datos de la imagen en un Blob y añádelo a formData
        fetch(pet.imageUrl)
            .then(res => res.blob())
            .then(blob => {
                // Resto del código para convertir la imagen en un Blob y enviar la solicitud
            })
            .catch(error => {
                console.error('Error al cargar la imagen:', error);
                alert('Error al cargar la imagen. Por favor, asegúrate de proporcionar una URL válida.');
            });
    });

    // Obtener el usuario actual
    fetch('/api/users/me', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(user => {
        // Asignar el ID del usuario a la mascota
        pet.userID = user._id;

        // Luego puedes hacer la solicitud para crear la mascota aquí
    })
    .catch(error => console.error('Error al obtener el usuario actual:', error));
}

loadHomeContent();