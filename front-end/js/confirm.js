
let priceLocalStorage= JSON.parse(localStorage.getItem("priceOrder"));

console.log(priceLocalStorage);

let idOrder= localStorage.getItem("numberId");

console.log(idOrder);





let info_order= document.querySelector(".info_order");

info_order.innerHTML+=
    `<p>Votre numéro de commande: <span>${idOrder}</span> </p>
     <p>Prix total: <span>${new Intl.NumberFormat('fr-FR', { 
        style: 'currency', currency: 'EUR' }
        ).format(priceLocalStorage)}</span> </p>
     <p>Livraison prévu: <span>5 jours ouvrées</span></p>`;





