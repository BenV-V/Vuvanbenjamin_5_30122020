// récupération des élément contact et récupération des éléments total et order dans le HTML
const contact = JSON.parse(localStorage.getItem("contact"));
let html ="";

    html +=`
            <div class ="confirmorder">
                <h2>Confirmation de la commande</h2>
                <p>Merci pour votre commande <strong>${contact.firstName} ${contact.lastName} </strong> !<br>
                Votre commande <strong>n°${JSON.parse(localStorage.getItem("order_Id"))}</strong> 
                <br>d'un montant de <strong>${(JSON.parse(localStorage.getItem('total'))/100)}€</strong> vous sera envoyée prochainement !
                <br>A bientôt sur <strong>Oricocam</strong> !</p>
            </div>
            `
document.querySelector("#confirmation").innerHTML = html;

// vidage de localStorage
localStorage.clear()
