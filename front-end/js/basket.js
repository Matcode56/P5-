let productLocalStorage= JSON.parse(localStorage.getItem("product"));


let gridProduct= document.querySelector(".product_added")

if(productLocalStorage===null){
    gridProduct.innerHTML="Votre panier est vide "
}
else{
    for(i=0; i< productLocalStorage.length; i++){
        gridProduct.innerHTML+= 
        `<p class="name_product">${productLocalStorage[i].name}</p>
                     
        <p class="quantity_product">${productLocalStorage[i].quantity}</p>
       
        <p class="price_product_">${productLocalStorage[i].price}</p>
        
        <button> Suppr </button>`
    }
   
    console.log(productLocalStorage);
}