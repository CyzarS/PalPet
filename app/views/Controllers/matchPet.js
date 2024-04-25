document.addEventListener('DOMContentLoaded', function() {
    loadHomeContent();
});

function loadHomeContent() {
    var dashboardContent = document.querySelector('.dashboard-content');

    var homeNavItem = document.getElementById('matchPet');
    if (!homeNavItem.classList.contains('active')) {
        return;
    }
    dashboardContent.innerHTML = '<div class="petCardContainer">' +
        '<img src="./Images/Gato 1.png" alt="Imagen de perfil" />' +
        '<h2>Steve The Cheese Wizard</h2>' +
        '<p>Edad: 3 Años</p>' +
        '<p>Raza: Gato</p>' +
        '<p>Sexo: Macho</p>' +
        '<p>Ubicación: Ciudad de México</p>' +
        '<p>Descripción: Steve es un gato muy cariñoso y juguetón. Es muy sociable y se lleva bien con otros gatos.</p>' +
        '<div class="actions">' +
        '<button class="dislike">Dislike</button>' +
        '<button class="like">Like</button>' +
        '</div>' +
        '</div>' +
        '<div id="petModal" class="modal">' +
        '<div class="modal-content">' +
        '<span class="close">&times;</span>' +
        '<h2>(Ejemplo del modal) <br> Contacto: </h2>' +
        '<h3>Mail: luis777GaymerPro@gmail.com</h3>' +
        '<h3>Telephone: 333123423</h3>' +
        '<h3>Location: API GOOGLE MAPS</h3>' +
        '<h3>Vacunas: Completas</h3>' +
        '<h3>Esterilización: </h3>' +
        '</div>' +
        '</div>';

    Promise.resolve().then(function() {
        var likeButton = document.querySelector('.like');
        likeButton.addEventListener('click', function() {
            var petModal = document.getElementById('petModal');
    
                // Mostrar el modal
            petModal.style.display = 'block';
    
                // Agregar controlador de eventos al botón de cierre del modal
            var closeButton = document.querySelector('.close');
            closeButton.addEventListener('click', function() {
                petModal.style.display = 'none';
            });
        });
    });
}

loadHomeContent();



