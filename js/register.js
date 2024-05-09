const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const signupFirstName = document.getElementById('signupFirstName').value;
    const signupLastName = document.getElementById('signupLastName').value;
    const email = document.getElementById('signupEmail').value;
    const signupPassword = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (signupPassword !== confirmPassword) {
        Swal.fire({
            title: 'Error',
            text: 'Las contraseñas no coinciden',
            icon: 'error'
        });
        return;
    }

    const name = signupFirstName + " " + signupLastName;
    const password = confirmPassword; // No hash la contraseña en el cliente

    const userData = {
        name,
        email,
        password
    };

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            Swal.fire({
                title: '¡Éxito!',
                text: 'Usuario registrado exitosamente',
                icon: 'success'
            });
            // Aquí puedes redirigir al usuario a otra página o realizar alguna otra acción después del registro exitoso
            window.location.href = 'login.html';
        } else {
            Swal.fire({
                title: 'Error',
                text: `${data.error}`,
                icon: 'error'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error en el servidor',
            icon: 'error'
        });
        console.error('Error:', error);
    }
});