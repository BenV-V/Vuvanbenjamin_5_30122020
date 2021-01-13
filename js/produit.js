let html="";
//recherche du produit
fetch(`http://localhost:3000/api/cameras/${location.search.substring(1)}`)
    .then(response => {return response.json()})
    .then((response) => {     
// intégration dans le HTML
    html += `
            <div class="card">
                <h3 class="card-title">${response.name}</h3>        
                <img src="${response.imageUrl}" class="card-img-top" alt="Images cameras">
                <div class="card-body">
                    <p class="card-text">${response.description}</p>
                    <p class="row">Prix : ${(response.price/100)} €</p>
                    <label for="lense-select">Choix de la lentille :</label>
                    <select name="lenses" id="lense-select"></select>
                    <button class="add" >Ajouter</button>
                </div>
            </div>
            `      
    document.getElementById("details").innerHTML = html;

// recherche de l'option lentille
    const select = document.querySelector('#lense-select');
    for (let i = 0; i < response.lenses.length; i++) {
    let option = document.createElement('option');
    option.innerHTML = response.lenses[i];
    select.appendChild(option);
}
    
//évenement pour rajouter au panier
    document.querySelector(".add").addEventListener('click', (event) => {
        event.preventDefault();
        response.selectLenses = select.options[select.selectedIndex].innerHTML;
        cart(response);
    })
})

// Fonction pour ajouter au panier
function cart (item) {
let cartElement = []
let sessionElement = {
    image: item.imageUrl,
    name: item.name,
    price: item.price,
    quantity: 1,
    _id: item._id,
    lenses: item.selectLenses
}
let otherElement = true;
const cart = sessionStorage.getItem('camera choisie')

// Créer un tableau dans sessionStorage si vide avec élément
if (cart === null) {
    cartElement.push(sessionElement);
    sessionStorage.setItem('camera choisie', JSON.stringify(cartElement));
} 
    // Ou récupère le tableau du sessionStorage et ajoute le nouveau produit
    else { 
        cartElement = JSON.parse(cart);

        cartElement.forEach((product) => {
            if (item._id === product._id && item.selectLenses === product.lenses) {
                product.quantity++;
                otherElement = false;
            }
        })

if (otherElement) cartElement.push(sessionElement);
sessionStorage.setItem('camera choisie', JSON.stringify(cartElement));
}

alert("La caméra a été ajoutée au panier");
}

