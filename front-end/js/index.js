

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
            document.querySelector(".produits").appendChild(card_product);
            card_product.classList.add("card_product");

            let img_product= document.createElement("img");
            card_product.appendChild(img_product);
            img_product.classList.add("card_img");
            img_product.src = responseAPI[article].imageURL;

            let heading_card= document.createElement("div");
            card_product.appendChild("heading_card");
            heading_card.classList("heading_card");

            let title_card= document.createElement("h3");
            heading_card.appendChild("title_card");
            title_card.innerHTML=responseAPI[article].name;

            let price_card= document.createElement("span")
            heading_card.appendChild("title_card");
            price_card.innerHTML=responseAPI[article].price;

            let description_product= document.createElement("p");
            card_product.appendChild("description_product");
            description_product.classList("description_card")
            description_product.innerHTML= resultatAPI[article].description;


        
        }
        
    })


    .catch(function(error){
        let bloc_produits= document.querySelector(".produits");
        bloc_produits.innerHTML="Nous avons rencontrons un problème avec l'affichage des produits. Vérifier que le serveu local est bien actif. <br/> <br/> Vérifier que le port 3000 est bien actif";
        bloc_produits.classList.add("text_error");
    });

}

getProduct();
