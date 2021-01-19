let totalCart = document.querySelector("#cart");
let cart = window.localStorage.getItem('panier');
const content = document.querySelector('#content');
display()

// fonction panier et contenu du panier
function display() {
    //Si panier strictement différent de null (donc vide), création d'un tableau avec un total de base de 0
    if (window.localStorage.getItem('panier') !== null) {
        let items = JSON.parse(cart);
        total = 0
        totalCart.insertAdjacentHTML("afterbegin",
            `<h1>Panier</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Photo</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Lentille</th>
                        <th scope="col">Nombre d'articles</th>
                        <th scope>Prix</th>              
                    </tr>
                </thead>
                <tbody class="cartdetails">
                </tbody>
            </table>`
        );
        
        let html = "";
        // Pour chaque caméra différente ou avec lentille différente, rajout dans le tableau
        items.forEach( (item) => {
            total = total + (item.price * item.quantity);

            html +=`<tr>
                        <td class="cameraimg"><img src="${item.image}" alt="camera"></td>
                        <td class="cameraname">${item.name}</td>
                        <td class="lensecamera">${item.lenses}</td>
                        <td class="cameraquantity">${item.quantity}</td>
                        <td class="cameraprice">${(item.price/100 * item.quantity)}€</td>
                    </tr>            
                    `
            document.querySelector(".cartdetails").innerHTML = html;
        })
        
        // Affichage du total et du bouton annuler
        totalCart.insertAdjacentHTML("beforeend",
        `<tfoot class="total">
            <strong>Total: ${(total/100)}€</strong>
            <button class="cancel">Annuler le panier</button>
        </tfoot> 
        `
        );
        // permet l'apparition du formulaire
        function toggleDisplay(element){
            element.classList.toggle('d-none')
        }
        toggleDisplay(content);
    
        //Ecoute de l'élement et fonction annulation du panier
        const cancel = document.querySelector(".cancel");
            cancel.addEventListener('click', () => {
                cancelOrder();
        });
        function cancelOrder() {
            localStorage.clear()
            totalCart.innerHTML = "";
            display();
        }
        //Ecoute de l'élement et fonction validation formulaire
        const form = document.querySelector(".contactform");
            form.addEventListener('submit', event => {
            event.preventDefault();
            send();
        });
        //fonction qui reprend les éléments du contact et du produit
        function send() {
            let products = []; 
            // Récupération des informations contenues dans les input
            let infoContact = document.getElementsByTagName("input");
            // Objet contact
            let contact = {
                lastName : infoContact[0].value,
                firstName : infoContact[1].value,
                address : infoContact[2].value,
                city : infoContact[3].value,
                email : infoContact[4].value,
            } 
            fetch("http://localhost:3000/api/cameras/order", {
            // définition de la méthode utilisée par la requête
            method: "POST",
            // définition du corps qu’on souhaite ajouter à notre requête
            body: JSON.stringify({
                contact, products
            }),
            // les en-têtes qu’on souhaite ajouter à notre requête 
            headers: {"Content-Type": "application/json"},    
            })

            .then(response => {return response.json();})
            .then(response => {
                // stocke les données contact, order et total dans localStorage, puis transfère vers page de confirmation
                localStorage.setItem('contact', JSON.stringify(response.contact));
                localStorage.setItem('order_Id', JSON.stringify(response.orderId));
                localStorage.setItem('total', JSON.stringify(total));
                window.location.href = "confirmation.html";
            })
        }
    }
    //Sinon, ajout de l'HTML relatif au panier vide 
    else {
        totalCart.insertAdjacentHTML("afterend",
            `<h2>Panier</h2>
            Oups !! Il semblerait que votre panier soit vide !
            <a href="./index.html" class="cart-section"><strong>Continuez vos achats !</strong></a>
            `
            )
            // permet la suppression du formulaire si panier vide
            function addDisplay(element){
                element.classList.add('d-none')
            }
            addDisplay(content);
    }
}