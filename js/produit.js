let html="";
//recherche du produit avec substring
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
        //pour chaque réponse de lentille, rajout dans l'élément créé intégré dans #lense-select
    let option = document.createElement('option');
    option.innerHTML = response.lenses[i];
    // option est l'élément enfant de select
    select.appendChild(option);
}
    
//évenement pour rajouter au panier
    document.querySelector(".add").addEventListener('click', (event) => {
        event.preventDefault();
        //Permet de récupérer le texte de l'option
        response.selectLenses = select[select.selectedIndex].innerHTML;
        cart(response);
    })
})

// Fonction pour ajouter au panier
function cart (item) {
// créer un tableau qui sera alimenté par les éléments récupéres dans sessionStorage
let cartElement = []
let sessionElement = {
    image: item.imageUrl,
    name: item.name,
    price: item.price,
    quantity: 1,
    _id: item._id,
    lenses: item.selectLenses
}
//Valeur boolean true pour variable autre élément 
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

        cartElement.forEach((element) => {
            //si l'id du produit et le même que celui selectionné, idem pour la lentille, augmente la quantité
            if (item._id === element._id && item.selectLenses === element.lenses) {
                element.quantity++;
                //cela ne correspond pas à un autre élément
                otherElement = false;
            }
        })
// sinon, autre élément qui est à rajouter au tableau
if (otherElement) cartElement.push(sessionElement);
sessionStorage.setItem('camera choisie', JSON.stringify(cartElement));
}
//ajoute une alerte
alert("La caméra a été ajoutée au panier");
}

