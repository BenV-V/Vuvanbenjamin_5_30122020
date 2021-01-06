const camera = window.location.search.substring(1); 
let html="";
let select = document.querySelector(".choice");
let carts = document.querySelector(".cart");

//recherche du produit
fetch(`http://localhost:3000/api/cameras/${camera}`)
    .then((response) => response.json())
    .then(response => {     
// intégration dans le HTML
    html += `<h3 class="row">${response.name}</h3>
        <p class="row"><img src="${response.imageUrl}" alt="cameras"></p>
        <p class="row">${response.description}</p>
        <p class="row"><b>Prix: ${(response.price/100)} €</b></p>`
        
    document.getElementById("details").innerHTML = html;
// recherche de l'option lentille
    response.lenses.forEach (function (lenses) {
        let choicelense = document.createElement("option");
        select.appendChild(choicelense);
        choicelense.textContent = lenses;
        
    })   
//évenement pour rajouter au panier
    carts.addEventListener('click', () => {
        cartNumbers(response);
        totalCost(response)
    })
//fonction mettant le panier au même niveau que le local storage
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.nav-link span').textContent = productNumbers;
    } 
}
//fonction faisant évoluer le panier en temps réel et convertit en nombre
function cartNumbers(response) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if( productNumbers ){
        localStorage.setItem('cartNumbers' , productNumbers + 1);  
        document.querySelector('.nav-link span').textContent = productNumbers + 1;          
    } else {
        localStorage.setItem('cartNumbers' , 1);
        document.querySelector('.nav-link span').textContent = 1;
    }

    setItems(response);
}
// fonction permettant de mettre plusieurs élements dans le panier (logiquement)
    function setItems(response){
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        console.log("Mon appareil photo choisi est : ", cartItems);

        if(cartItems != null){
            
            if(cartItems[response.name] == undefined){
                cartItems = {
                    ...cartItems,
                    [response.name]: response
                }
            }

        } else{
            cartItems = {
                [response.name]: response
            }
        }
        cartItems = {
            [response.name]: response
        }
        localStorage.setItem("productsInCart", JSON.stringify (cartItems));
    }
// création de cout total
function totalCost(response){
    let cartCost = localStorage.getItem('Coût total');

// addition du prix au rajout de produit 
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("Coût total", cartCost + response.price/100);
    }else
        localStorage.setItem("Coût total", response.price/100);
}
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    console.log(cartItems);
}
onLoadCartNumbers()
displayCart();
})
