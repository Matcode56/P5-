main();

function main(){
   const priceOrder= JSON.parse(localStorage.getItem("priceOrder"));
   const idOrder= localStorage.getItem("numberId");

   displayInfosOrder(priceOrder, idOrder);
}

function displayInfosOrder(priceOrder, idOrder){

   const info_order= document.querySelector(".info_order");

   info_order.innerHTML+=
    `<p>Votre numéro de commande: <span>${idOrder}</span> </p>
     <p>Prix total: <span>${new Intl.NumberFormat('fr-FR', { 
        style: 'currency', currency: 'EUR' }
        ).format(priceOrder)}</span> </p>
     <p>Livraison prévu: <span>5 jours ouvrées</span></p>`;
}









