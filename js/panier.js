let totalCart = document.querySelector("#cart");
let cart = window.sessionStorage.getItem('camera choisie')
display()

// fonction panier et contenu du panier
function display() {
    //Si panier strictement différent de null (donc vide), création d'un tableau avec un total de base de 0
    if (window.sessionStorage.getItem('camera choisie') !== null) {
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
        // ajout du formulaire de contact
        totalCart.insertAdjacentHTML("beforeend",
            `<h3>Merci de remplir le formulaire ci-dessous :</h3>
                <form name="Form" class="contactform" type="submit" method="post">
                    <table class="form-style">
                        <tr>
                            <td><label for="lastname">Votre nom <span class="required">*</span></label></td>
                            <td><input type="text" name="lastname" id="lastname" placeholder="Spielberg" maxlength="12" pattern="[a-zA-ZÀ-ÿ]{2,10}" required />
                                <span class="error" id="errorname"></span></td>
                        </tr>
                        <tr>
                            <td><label for="firstname">Votre prénom <span class="required">*</span></label></td>
                            <td><input type="text" name="firstname" id="firstname" placeholder="Steven" maxlength="12" pattern="[a-zA-ZÀ-ÿ]{2,10}" required /></td>
                        </tr>
                        <tr>
                            <td><label for="Address">Votre adresse <span class="required">*</span></label></td>
                            <td><input type="text" name="adress" id="address" placeholder="100 rue de Hollywood" maxlength="40" required /></td>
                        </tr>
                        <tr>
                            <td><label for="city">Code postal et ville <span class="required">*</span></label></td>
                            <td><input type="text" name="city" id="city" placeholder="5175 Los Angeles" maxlength="40" required /></td>
                        </tr>                        
                        <tr>
                            <td><label>Votre adresse e-mail <span class="required">*</span></label></td>
                            <td><input type="email" name="email" id="email" placeholder="Merci de renseigner une adresse valide" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}" size="37" required/></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="submit" value="Valider votre commande" class="validate" id="submit"><input type="reset" class="reset" value="Réinitialiser"> </td>
                        </tr>
                    </table>
                </form>
            `
        );

//Sinon, ajout de l'HTML relatif au panier vide
    } else {
        totalCart.insertAdjacentHTML("afterend",
            `<h2>Panier</h2>
            Oups !! Il semblerait que votre panier soit vide !
            <a href="./index.html" class="cart-section"><strong>Continuez vos achats !</strong></a>
            `
        )
    }
}
//Ecoute de l'élement et fonction annulation du panier
const cancel = document.querySelector(".cancel");
    cancel.addEventListener('click', () => {
        cancelOrder();
});
function cancelOrder() {
    sessionStorage.clear()
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
    let lastName = document.getElementById("lastname").value;
    let firstName = document.getElementById("firstname").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value

// Objet contact
    let contact = {lastName,firstName,address,city,email};
    
    fetch("http://localhost:3000/api/cameras/order", {
// définition de la méthode utilisée par la requête
        method: "POST",
// définition du corps qu’on souhaite ajouter à notre requête
        body: (JSON.stringify({contact, products})),
// les en-têtes qu’on souhaite ajouter à notre requête 
        headers: {"Content-Type": "application/json"},    
    })
    .then(response => {return response.json();})
    .then(response => {
// stocke les données contact, order et total dans sessionStorage, puis transfère vers page de confirmation
        sessionStorage.setItem('contact', JSON.stringify(response.contact));
        sessionStorage.setItem('order_Id', JSON.stringify(response.orderId));
        sessionStorage.setItem('total', JSON.stringify(total));
        window.location.href = "confirmation.html";
    })

}