const productId = window.location.search.substr(1); 
let html="";
let select = document.querySelector(".choice");

fetch(`http://localhost:3000/api/cameras/${productId}`)
    .then((response) => response.json())
    .then(response => {     

    html += `<h1 class="row">${response.name}</h1>
        <p class="row"><img src="${response.imageUrl}" alt="cameras"></p>
        <p class="row">${response.description}</p>
        <p class="row"><b>Prix: ${(response.price/100).toFixed(2).replace(".",",")}€</b></p>`
        
    document.getElementById("details").innerHTML = html;
    
    response.lenses.forEach (function (lenses) {
        let option = document.createElement("option");
        option.textContent = lenses;
        select.appendChild(option);
    })   

})
