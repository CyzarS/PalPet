const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    const userData = {
        email: loginEmail,
        password: loginPassword
    };

    try {
        const response = await fetch('/api/auth/login', {
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
                text: 'Inicio de sesión exitoso',
                icon: 'success'
            });

            // Guardar el token en el almacenamiento local si "Remember me" está marcado
            if (rememberMe) {
                localStorage.setItem('access_token', data.token);
            }
            
            // Aquí puedes redirigir al usuario a otra página después del inicio de sesión exitoso
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