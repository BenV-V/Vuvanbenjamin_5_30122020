let html = "";

fetch('http://localhost:3000/api/cameras')
    .then(response => {return response.json()})
    .then((response) => {for(let i = 0; i < response.length; i++) {

    html += ` <div class="card">
                <img src="${response[i].imageUrl}" class="card-img-top" alt="Images cameras">
                <div class="card-body">
                  <h5 class="card-title">${response[i].name}</h5>
                  <p class="card-text">${response[i].description}</p>
                  <p class="row">Prix : ${(response[i].price/100).toFixed(2).replace(".",",")}€</p>
                  <a href="./produit.html?${response[i]._id}" class="btn btn-primary stretched-link">Voir l'article</a>
                </div>
              </div>`
    }   
    document.getElementById("cameras").innerHTML = html
})
