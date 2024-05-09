function loadHomeContent() {
    var dashboardContent = document.querySelector('.dashboard-content');
    var homeNavItem = document.getElementById('explore');
    dashboardContent.innerHTML = ` 
    <h2 class="title">Meet Our Adorable Pets</h2>
    <div class="grid-container">
    </div>`;

    const gridContainer = document.querySelector('.grid-container');

    // Call fetchAndDisplayProducts function after it's defined
    fetchAndDisplayProducts();

    async function fetchAndDisplayProducts() {
        try {
            const response = await fetch('/api/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1Y2kxMjNAZ21haWwuY29tIiwiX2lkIjoiNjYzMDJiOWM3OGYzM2QwNThmNmNhNTQyIiwiaWF0IjoxNzE0NDkxMDk2LCJleHAiOjE3MTQ0OTQ2OTZ9.fYDv53UT5wyhhSeLtLhLJMSc6diSiyjQIf6W0RjbZUM',
                    'x-auth': '23423'
                    // Include any other necessary headers
                },
            });
            const data = await response.json();
            const products = data;
        
            // Clear existing cards
            gridContainer.innerHTML = '';
        
            // Create new cards for each product
            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'card';
        
                const image = document.createElement('img');
                image.src = product.imageUrl; // Assuming the product has an imageUrl property
                image.alt = product.name;
        
                const cardContent = document.createElement('div');
                cardContent.className = 'card-content';
        
                const cardTitle = document.createElement('div');
                cardTitle.className = 'card-title';
                cardTitle.textContent = product.name;

                const cardDescription = document.createElement('div');
                cardDescription.className = 'card-description ';
                cardDescription.textContent = product.description; // Assuming the product has a description property
        
                cardContent.appendChild(cardTitle);
                cardContent.appendChild(cardDescription);
                card.appendChild(image);
                card.appendChild(cardContent);
                gridContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    }
}

loadHomeContent();


