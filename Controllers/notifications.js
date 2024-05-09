function loadHomeContent() {
    var dashboardContent = document.querySelector('.dashboard-content');
    var homeNavItem = document.getElementById('notifications');
    dashboardContent.innerHTML = ` 
    <h2 class="title">Take a look at your Match History</h2>
    <div class="grid-container">
    </div>`;

    const gridContainer = document.querySelector('.grid-container');

    // Call fetchAndDisplayProducts function after it's defined
    fetchAndDisplayProducts();

    async function fetchAndDisplayProducts() {
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await fetch('/api/cart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'x-auth': '23423'
                },
            });
            const data = await response.json();
            const products = data.cart.products;

            // Clear existing cards
            gridContainer.innerHTML = '';

            // Create new cards for each product
            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'card';
                card.dataset.productId = JSON.stringify(product.productId._id).replace(/\"/g, '');
            
                const closeButton = document.createElement('button');
                closeButton.className = 'close-button';
                closeButton.textContent = 'x';
                closeButton.addEventListener('click', () => {
                    var productId = card.getAttribute('data-product-id');
                    console.log(productId);
                    remove(productId);
                });
            
                const image = document.createElement('img');
                image.src = product.productId.imageUrl;
                image.alt = product.productId.name;
            
                const cardContent = document.createElement('div');
                cardContent.className = 'card-content';
            
                const cardTitle = document.createElement('div');
                cardTitle.className = 'card-title';
                cardTitle.textContent = product.productId.name;
            
                const cardDescription = document.createElement('div');
                cardDescription.className = 'card-description';
                cardDescription.textContent = product.productId.description;
            
                cardContent.appendChild(cardTitle);
                cardContent.appendChild(cardDescription);
                card.appendChild(closeButton); // Agregar el botón de cierre a la tarjeta
                card.appendChild(image);
                card.appendChild(cardContent);
                gridContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    }
}

async function remove(productId) {
    try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch(`/api/cart/remove/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'x-auth': '23423'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            // Aquí puedes realizar cualquier otra acción que necesites después de eliminar el producto del carrito
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData.error);
            // Manejar el caso en que ocurra un error en la eliminación del producto del carrito
        }
    } catch (error) {
        console.error('Error:', error);
        // Manejar el caso en que ocurra un error en la solicitud HTTP
    }
}


loadHomeContent();
