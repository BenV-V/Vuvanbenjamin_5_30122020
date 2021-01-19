// récupération de l'API
fetch('http://localhost:3000/api/cameras')

    .then(response => {return response.json()})

    .then((response) => {for(let i = 0; i < response.length; i++) {
        class Response {
            constructor(image, name, description, price, _id){
                this.image = image;
                this.name = name;
                this.description= description;
                this.price = price;
                this._id = _id;
            }
        }
        let newResponse = new Response(
            response[i].imageUrl,
            response[i].name,
            response[i].description,
            response[i].price,
            response[i]._id,        
        )
        // intégration dans le fichier index.html dans la div #cameras pour chaque réponse
        document.querySelector('#cameras').innerHTML +=  
                  `<div class="card">    
                    <img src="${newResponse.image}" class="card-img-top" alt="Images cameras">
                    <div class="card-body">
                      <h3 class="card-title">${newResponse.name}</h3>
                      <p class="card-text">${newResponse.description}</p>
                      <p class="row">Prix : ${(newResponse.price/100)} €</p>
                      <a href="./produit.html?${newResponse._id}" class="btn btn-primary stretched-link">Voir l'article</a>
                    </div>
                  </div>`
    }})

