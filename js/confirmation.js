const contact = JSON.parse(sessionStorage.getItem("contact"));
const orderId = JSON.parse(sessionStorage.getItem("order_Id"));
const total = JSON.parse(sessionStorage.getItem('total'));
let html ="";

html +=`
        <div class ="confirmorder">
            <h2>Confirmation de la commande</h2>
            <p style="color: black;">
            Merci pour votre commande <strong>${contact.firstName} ${contact.lastName} </strong> !<br>Votre commande <strong>n°${orderId}</strong> <br>d'un montant de <strong>${(total/100)}€ vous sera envoyée prochainement !</strong>
            <br> A bientôt sur <strong>Oricocam<s/trong> !</p>
        </div>
        `
    document.querySelector("#confirmation").innerHTML = html;

sessionStorage.clear()
