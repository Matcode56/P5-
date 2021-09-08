// Récupération de l'Id via les infos de l'URL
let param= (new URL(document.location)).searchParams;
let id=param.get("id");

console.log(id);

//Adresse d'appel d'API
const Url= `http://localhost:3000/api/furniture/${id}`
console.log(Url);

//Appel API

fetch(Url)
    .then((response)=> response.json()
    .then(function(responseAPI){
        const product= responseAPI;
        console.log(product);

        let section= document.querySelector("section");
        let card_product= document.createElement("div");
        section.appendChild(card_product);
        card_product.classList.add("product");
        
        card_product.innerHTML=
        `<img src="${product.imageUrl}" />
        <div class="infos_product">
            <h2 class="title_product">${product.name}</h2>
            <p class="description_product">${product.description} </p>`;

        let infos_product= document.querySelector(".infos_product");
        let price =document.createElement("p");
        price.classList.add("price_product")
        infos_product.append(price);

        Price_convert = product.price / 100;
        console.log(Price_convert);
        price.innerHTML=new Intl.NumberFormat('fr-FR', { 
            style: 'currency', currency: 'EUR' }
            ).format(Price_convert);

           

        

        


    }))

    .catch(function(error){
      console.log(error)
    })

