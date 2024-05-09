function loadHomeContent() {
    var dashboardContent = document.querySelector('.dashboard-content');

    dashboardContent.innerHTML = `
    <h2 class="title">Edit your profile</h2>
    <div class="profile-section">
    <div class="image-container">
        <img id="preview" src="https://via.placeholder.com/300" alt="Imagen de mascota">
            <br><br><label for="image"></label>
            <input type="file" id="imageUrl" name="Image" accept="image/png, image/jpeg" required>
        </form>
    </div>
    <form class="profile-form">
        <div class="profile-info">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" value="">
        </div>
        <div class="profile-info">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="">
        </div>
        <div class="profile-info">
            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" value="">
        </div>
        <div class="profile-info">
            <label for="location">Location:</label>
            <input type="text" id="location" name="location" value="">
        </div>
        <button type="submit">Save</button>
    </form>
</div>`;

    document.getElementById('imageUrl').addEventListener('change', function() {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview').src = e.target.result;
        }
        reader.readAsDataURL(this.files[0]);
    });

     // Agrega un event listener al botón Save
     document.querySelector('.profile-form button[type="submit"]').addEventListener('click', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        // Recolecta la información del formulario
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value
            // Añade cualquier otro campo que necesites aquí
        };

        // Llama a la función para guardar la información del usuario
        saveUserData(formData);
    });


    fetchAndDisplayUserData();
    
}

async function fetchAndDisplayUserData() {
    try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch('/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'x-auth': '23423'
            },
        });
        const userData = await response.json();
        
        // Fill user data into form fields
        document.getElementById('name').value = userData.name;
        document.getElementById('email').value = userData.email;
        document.getElementById('phone').value = userData.phone;
        document.getElementById('location').value = userData.location;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

async function saveUserData(formData) {
    try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch('/api/users/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'x-auth': '23423'
            },
            body: JSON.stringify(formData) // Convierte el objeto formData a JSON
        });

        const updatedUserData = await response.json();
        console.log('User data updated:', updatedUserData);
        // Aquí podrías mostrar un mensaje de éxito o actualizar la interfaz de usuario de alguna manera
        alert('User data updated successfully');
    } catch (error) {
        console.error('Error updating user data:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
    }
}



loadHomeContent();
