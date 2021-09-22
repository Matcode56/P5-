main();

async function main(){
    const products= await getProducts();
    console.log(products)

    for(article of products){
        displayProduct(article);
    }
}


async function getProducts(){
    try {
        const askAPI = await fetch("http://localhost:3000/api/furniture");
        const responseAPI = await askAPI.json();
        return responseAPI;
    } catch (error) {
        let bloc_produits = document.querySelector(".produits");
        bloc_produits.innerHTML = "Nous avons rencontrons un problème avec l'affichage des produits. Vérifier que le serveu local est bien actif. <br/> <br/> Vérifier que le port 3000 est bien actif";
        bloc_produits.classList.add("text_error");
    }
}

//Fonction permettant de disposer les produits sur la page Web

function displayProduct(article){

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

       card_product.href=`product.html?id=${article._id}`;
       img_product.src = article.imageUrl;
       title_card.innerHTML= article.name;

       Price_convert = article.price / 100;
       price_card.innerHTML=new Intl.NumberFormat('fr-FR', { 
           style: 'currency', currency: 'EUR' }
           ).format(Price_convert);

       description_product.innerHTML= article.description;
    }
