// création class produits
class Products{
  constructor(element){
      this.$el = element;

      this.display();
  }

  // appel de la fonction display
  display(){    
      // recherche de l'API
      fetch('http://localhost:3000/api/cameras')
          .then(response => {return response.json()})
          .then(item =>  {
              // Pour chaque réponse de l'API
              item.forEach(product => {
              // intégration des produits dans le HTML
              let html = 
                  `<div class="card">    
                      <img src="${product.imageUrl}" class="card-img-top" alt="Images cameras">
                      <div class="card-body">
                      <h3 class="card-title">${product.name}</h3>
                      <p class="card-text">${product.description}</p>
                      <p class="row">Prix : ${(product.price/100)} €</p>
                      <a href="./produit.html?${product._id}" class="btn btn-primary stretched-link">Voir l'article</a>
                      </div>
                  </div>`;
      
          this.$el.insertAdjacentHTML('beforeend', html);
          });
      })
  }
}
// intégration des produits dans l'id cameras
const products = new Products(document.getElementById('cameras'));

  

