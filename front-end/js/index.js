function getProduct(){
    fetch("http://localhost:3000/api/furniture")
    .then(function(response){
        return response.json();
    })

    .then(function(responseAPI){
        const products= responseAPI;
        console.log(products);
        for (let article in products){
            let card_product= document.createElement("a");
            let img_product= document.createElement("img");
            let heading_card= document.createElement("div");
            let title_card= document.createElement("h3");
            let price_card= document.createElement("span");
            let description_product= document.createElement("p");

            document.querySelector(".produits").appendChild(card_product);
           card_product.append(img_product, heading_card, description_product);
           heading_card.append(title_card, price_card);

           card_product.classList.add("card_product");
           img_product.classList.add("card_img");
           heading_card.classList.add("heading_card");
           description_product.classList.add("description_card");

           card_product.href=`product.html?id=${responseAPI[article]._id}`;
           img_product.src = responseAPI[article].imageUrl;
           title_card.innerHTML= responseAPI[article].name;

           Price_convert = responseAPI[article].price / 100;
           price_card.innerHTML=new Intl.NumberFormat('fr-FR', { 
               style: 'currency', currency: 'EUR' }
               ).format(Price_convert);

           description_product.innerHTML= responseAPI[article].description;
           





            
        }
        
    })


    .catch(function(error){
        let bloc_produits= document.querySelector(".produits");
        bloc_produits.innerHTML="Nous avons rencontrons un problème avec l'affichage des produits. Vérifier que le serveu local est bien actif. <br/> <br/> Vérifier que le port 3000 est bien actif";
        bloc_produits.classList.add("text_error");
    });

}

getProduct();
