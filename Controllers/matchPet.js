document.addEventListener('DOMContentLoaded', function() {
    loadHomeContent();
});

function loadHomeContent() {
    var dashboardContent = document.querySelector('.dashboard-content');
    var homeNavItem = document.getElementById('matchPet');
    dashboardContent.innerHTML = `
        <div class="tinder text-center">
            <div class="tinder--status">
                <i class="fa fa-remove"></i>
                <i class="fa fa-heart"></i>
            </div>

            <div class="tinder--cards">
            </div>

            <div class="tinder--buttons">
                <button id="nope"><i class="fa fa-remove"></i></button>
                <button id="love"><i class="fa fa-heart"></i></button>
            </div>
        </div>`; 

    fetchAndDisplayProducts();
}

async function fetchAndDisplayProducts() {
    try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch('/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'x-auth': '23423'
            },
        });
        const data = await response.json();
        const products = data;

        const tinderCards = document.querySelector('.tinder--cards');
        tinderCards.innerHTML = '';

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'tinder--card';
            card.dataset.productId = product._id;


            const image = document.createElement('img');
            image.src = product.imageUrl;
            image.alt = product.name;

            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';

            const cardTitle = document.createElement('div');
            cardTitle.className = 'card-title';
            cardTitle.textContent = product.name;

            cardDescription = document.createElement('div');
            cardDescription.className = 'card-description';
            cardDescription.innerHTML = `
                <p>Age: ${product.age}</p>
                <p>Breed: ${product.breed}</p>
                <p>Species: ${product.species}</p>
                <p>${product.description}</p>
            `;

            cardContent.appendChild(cardTitle);
            cardContent.appendChild(cardDescription);
            card.appendChild(image);
            card.appendChild(cardContent);
            tinderCards.appendChild(card);
        });

        // Inicializar tarjetas de Tinder
        initTinderCards();
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

function initTinderCards() {
    var tinderContainer = document.querySelector('.tinder');
    var allCards = document.querySelectorAll('.tinder--card');
    var nope = document.getElementById('nope');
    var love = document.getElementById('love');

    
    function initCards(card, index) {
        var newCards = document.querySelectorAll('.tinder--card:not(.removed)');

        newCards.forEach(function (card, index) {
            card.style.zIndex = allCards.length - index;
            card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
            card.style.opacity = (10 - index) / 10;
        });

        tinderContainer.classList.add('loaded');
    }

    initCards();

    allCards.forEach(function (el) {
        var hammertime = new Hammer(el);

        hammertime.on('pan', function (event) {
            el.classList.add('moving');
        });

        hammertime.on('pan', function (event) {
            if (event.deltaX === 0) return;
            if (event.center.x === 0 && event.center.y === 0) return;

            tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
            tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

            var xMulti = event.deltaX * 0.03;
            var yMulti = event.deltaY / 80;
            var rotate = xMulti * yMulti;

            event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
        });

        hammertime.on('panend', function (event) {
            el.classList.remove('moving');
            //tinderContainer.classList.remove('tinder_love');
            tinderContainer.classList.remove('tinder_nope');

            var moveOutWidth = document.body.clientWidth;
            var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

            event.target.classList.toggle('removed', !keep);

            if (keep) {
                event.target.style.transform = '';
            } else {
                var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
                var toX = event.deltaX > 0 ? endX : -endX;
                var endY = Math.abs(event.velocityY) * moveOutWidth;
                var toY = event.deltaY > 0 ? endY : -endY;
                var xMulti = event.deltaX * 0.03;
                var yMulti = event.deltaY / 80;
                var rotate = xMulti * yMulti;

                event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
                initCards();
            }
        });
    });

    function createButtonListener(love) {
        return function (event) {

            var cards = document.querySelectorAll('.tinder--card:not(.removed)');
            var moveOutWidth = document.body.clientWidth * 1.5;

            var card = cards[0];
            
            if (!cards.length) return false;

            if (love) {
                var currentCard = document.querySelector('.tinder--card:not(.removed)');
                var productId = currentCard.getAttribute('data-product-id');
                // Llamar a la función para añadir productos al carrito
                addToCart(productId);
                card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';

            } else {
                card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
            }

            card.classList.add('removed');

            initCards();

            event.preventDefault();
        };
    }

    function addToCart(productId) {
        // Datos necesarios para añadir el producto al carrito
        var requestData = {
            productId: productId,
            quantity: 1 // Puedes ajustar la cantidad según tus necesidades
        };
    
        fetch('/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
            console.log('Producto añadido al carrito:', data);
        })
        .catch(error => {
            // Manejar errores, por ejemplo, mostrar un mensaje de error
            console.error('Error al añadir el producto al carrito:', error);
        });
    }

    var nopeListener = createButtonListener(false);
    var loveListener = createButtonListener(true);

    nope.addEventListener('click', nopeListener);
    love.addEventListener('click', loveListener);

}

loadHomeContent();

