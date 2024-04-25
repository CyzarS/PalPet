function loadHomeContent() {
    var dashboardContent = document.querySelector('.dashboard-content');

    var homeNavItem = document.getElementById('explore');
    if (!homeNavItem.classList.contains('active')) {
        return;
    }

    var cardsHTML = `
    <div class="container">
        <div class="text-center">
            <h1>Explore our community</h1>
        </div>
        <div class="container">
            <div class="card-columns">
            <div class="card">
                <a href="#">
                <img class="card-img-top" src="Images/mascota1.jpg" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">Lena</h5>
                <p class="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad alias, aliquid amet aspernatur atque culpa cum debitis dicta doloremque, dolorum ea eos et excepturi explicabo facilis harum illo impedit incidunt laborum laudantium...
                </p>
                <p class="card-text"><small class="text-muted"><i class="fas fa-eye"></i>1000<i class="far fa-user"></i>admin<i class="fas fa-calendar-alt"></i>Jan 20, 2018</small></p>
            </div>
                </a>
            </div>
            <div class="card">
                <a href="#">
                <img class="card-img-top" src="Images/mascota2.png" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">Escobar</h5>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio iusto maxime nemo omnis praesentium similique.</p>
                <p class="card-text"><small class="text-muted"><i class="fas fa-eye"></i>1000<i class="far fa-user"></i>admin<i class="fas fa-calendar-alt"></i>Jan 20, 2018</small></p>
                </div>
                </a>
            </div>
            <div class="card">
                <a href="#">
                <img class="card-img-top" src="Images/mascota8.png" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">Robin</h5>
                <p class="card-text">Amet commodi deleniti enim laboriosam odio placeat praesentium quis ratione rerum suscipit.</p>
                <p class="card-text"><small class="text-muted"><i class="fas fa-eye"></i>1000<i class="far fa-user"></i>admin<i class="fas fa-calendar-alt"></i>Jan 20, 2018</small></p>
                </div>
                </a>
            </div>
            <div class="card">
                <a href="#">
                <img class="card-img-top" src="Images/mascota1.jpg" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">Cassandra</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted"><i class="fas fa-eye"></i>1000<i class="far fa-user"></i>admin<i class="fas fa-calendar-alt"></i>Jan 20, 2018</small></p>
                </div>
                </a>
            </div>
            <div class="card">
                <a href="#">
                <img class="card-img-top" src="Images/mascota2.png" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">Sophia</h5>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, consequatur culpa cumque deserunt dignissimos error explicabo fugiat harum ipsam magni minus mollitia nemo perferendis qui repellendus rerum saepe vel voluptate voluptatem voluptatum!
                    Aperiam, labore, molestiae!..</p>
                <p class="card-text"><small class="text-muted"><i class="fas fa-eye"></i>1000<i class="far fa-user"></i>admin<i class="fas fa-calendar-alt"></i>Jan 20, 2018</small></p>
                </div>
                </a>
            </div>
            <div class="card">
                <a href="#">
                <img class="card-img-top" src="Images/mascota8.png" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">Max</h5>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque commodi debitis eaque explicabo fuga maiores necessitatibus, neque omnis optio vel!</p>
                <p class="card-text"><small class="text-muted"><i class="fas fa-eye"></i>1000<i class="far fa-user"></i>admin<i class="fas fa-calendar-alt"></i>Jan 20, 2018</small></p>
                </div>
                </a>
            </div>
            </div>
        </div>
    </div>
    `;
    
    dashboardContent.innerHTML = cardsHTML;
}

loadHomeContent();
