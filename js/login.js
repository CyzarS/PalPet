const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;
    const rememberMeCheckbox = document.getElementById('rememberMeCheckbox').checked; // Obtener el estado del checkbox "Remember Me"

    const userData = {
        email: loginEmail,
        password: loginPassword,
        rememberMe: rememberMeCheckbox // Pasar el estado del checkbox al servidor
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

            localStorage.setItem('access_token', data.token);

            // Redireccionar a la página deseada
            window.location.href = 'palpet.html';
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
