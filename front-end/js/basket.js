main();

async function main(){
    const productLocalStorage= getProduct();
    

    
    if(productLocalStorage===null || productLocalStorage.length==0){
        emptyBasket()
    }

    else{
        const idProductsBuy= getIdProduct(productLocalStorage);
        const Total_Price= calcTotalPrice(productLocalStorage);
        displayInfosProduct(productLocalStorage, Total_Price);
        runBtnDelete(productLocalStorage);
        displayForm();
        controlForm(idProductsBuy, Total_Price);
    }
    
}

function getProduct(){
    return JSON.parse(localStorage.getItem("product"));
}

function emptyBasket(){ 
    let bloc_product= document.querySelector(".bloc_product_basket");
    bloc_product.innerHTML=
    `
    <p class="textEmptyBasket">Votre panier est vide</p>
    <a href="index.html" class="link_return">Retourner à la séléction d'article</a>
    `
}
function getIdProduct(productLocalStorage){
    idProductsBuy= [];
    for(let id=0; id<productLocalStorage.length; id++){
        idProductsBuy.push(productLocalStorage[id].id);
    }
    return idProductsBuy;
}




function displayInfosProduct(productLocalStorage, Price_total){

    const bloc_product= document.querySelector(".bloc_product_basket");
    const cards_product_basket= document.createElement("div");
    cards_product_basket.classList.add("cards_product_basket")
    const total_price= document.createElement("p");
    total_price.classList.add("total_price");

    for(i=0; i< productLocalStorage.length; i++){
    cards_product_basket.innerHTML+=
    `             
        
                <div class="card_product_basket">
                    <h3>${productLocalStorage[i].name}</h3>
                    <p class="quantity_product_basket">${"Quantité: "+productLocalStorage[i].quantity}</p>
                    <p class="color_product_basket">${"Couleur :"+ productLocalStorage[i].color}</p>
                    <p class="price_product_basket">${"Prix :" + new Intl.NumberFormat('fr-FR', { 
                        style: 'currency', currency: 'EUR' }
                        ).format(productLocalStorage[i].price)}</p>
                <div/>
    `
        }

    total_price.innerHTML=
    `
    ${"Total: "+  new Intl.NumberFormat('fr-FR', { 
        style: 'currency', currency: 'EUR' }
        ).format(Price_total)}
    `

    bloc_product.append(cards_product_basket, total_price);

}
         
   

    function runBtnDelete(productLocalStorage){

        const card_product_basket= document.querySelectorAll(".card_product_basket");
        console.log(card_product_basket.length);
      
        

        for(let f=0; f<card_product_basket.length; f++){
            card_product_basket[f].innerHTML+=`<button class="btn_delete">Suppr</button>`;
        }

        const allBtnDelete= document.querySelectorAll(".btn_delete");
        console.log(allBtnDelete);

        for(let x=0; x<allBtnDelete.length; x++){

            allBtnDelete[x].addEventListener("click", (event) => {
                event.preventDefault();
                const nameSelectToSuppr= productLocalStorage[x].name;
                alert("Le produit" + nameSelectToSuppr +"a été supprimé");

                productLocalStorage= productLocalStorage.filter(elt => elt.name !== nameSelectToSuppr)
                console.log(productLocalStorage);
                localStorage.setItem("product", JSON.stringify(productLocalStorage));

                window.location.href="basket.html";

            });
        }
          
    }
    function calcTotalPrice (productLocalStorage){   

        let Price_total= 0;

        
        let arrPrice=[];
        let totalQuantité=[];
        let multiply_quantity_price= [];


        for(let m=0; m< productLocalStorage.length; m++){
            
            arrPrice.push(productLocalStorage[m].price);
            totalQuantité.push(productLocalStorage[m].quantity);
            arrPrice = arrPrice.map((x) => parseFloat(x));
            totalQuantité = totalQuantité.map((x) => parseFloat(x));
        }

        

        for(let d=0; d<arrPrice.length; d++){

            multiply_quantity_price.push(arrPrice[d]*totalQuantité[d]);
            
        }

        multiply_quantity_price.forEach(price => {
            Price_total+= price;
        })
       
        return Price_total;
        
    
        
    }

    function displayForm(){
        let bloc_form= document.querySelector(".bloc_form");
        bloc_form.innerHTML=
        `<h2>Coordoonées</h2>
        <form class="form">
            <div>
                <label for="name">Prénom:</label>
                <input type="text" placeholder="Prénom" id="name" name="user_name" required> 
            </div>
            
            <div>
                <label for="lastname">Nom:</label>
                <input type="text" placeholder="Nom" id="lastname" name="user_lastname" required>
            </div>
            
        
            <div>      
                <label for="postal">Code postal:</label>
                <input type="text" placeholder="Code postal" id="postal" name="user_postal" required>
            </div>      
            
            <div>
                <label for="city">Ville:</label>
                <input type="text" placeholder="Ville" id="city" name="user_city" required>
            </div>
            
            
        
            <div>
                <label for="adress">Adresse:</label>
                <input type="text" placeholder="Adresse de livraison" id="adress" name="user_adress" required>
            </div>
            
            <div>
                <label for="mail">Adresse mail:</label>
                <input type="email" placeholder="Adresse mail" id="mail" name="user_mail" required>
            </div>
            
            <div>
                <label for="phone" >Numéro de téléphone:</label>
                <input type="tel" placeholder="Numéro de téléphone" id="phone" name="phone" required >
            </div>
            

        </form>

        <button id="btn_validate">Valider</button>`
    }
   



function controlForm(idProductsBuy, Total_Price){


    // Récupération données formulaire 

    const form= document.querySelector(".bloc_form");
    let text_error= document.createElement("p");
    text_error.classList.add("textError");
    let inputName= document.querySelector("#name");
    let inputLastName= document.querySelector("#lastname");
    let inputPostal= document.querySelector("#postal");
    let inputCity= document.querySelector("#city");
    let inputAdress= document.querySelector("#adress");
    let inputMail= document.querySelector("#mail");
    let inputTel= document.querySelector("#phone");
    const btn_confirm= document.querySelector("#btn_validate");


    
    //Contrôle si les règles Regex sont respéctés

    btn_confirm.addEventListener("click", (event) =>{
        
        console.log(inputCity.value);
        event.preventDefault();
            if(!inputName.value ||
                !inputLastName.value ||
                !inputPostal.value ||
                !inputCity.value ||
                !inputAdress.value ||
                !inputMail.value ||
                !inputTel.value){

                    form.append(text_error);
                    text_error.innerHTML="Attention, vous n'avez pas rempli tout les champs";
            }
            else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(inputMail.value)){
                    
                    form.append(text_error);
                    text_error.innerHTML="Veuillez saisir une adresse mail valide";
                    console.log(inputMail.value)
            
            }
            
            else if(!/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/g.test(inputTel.value)){
                    form.append(text_error);
                    text_error.innerHTML="Veuillez saisir un numéro de téléphone valide";
                    console.log(inputTel.value)
                }

            else if(!/^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/g.test(inputPostal.value)){
                    form.append(text_error);
                    text_error.innerHTML="Veuillez saisir votre code postal complet et valide";
                }
            
            
            else{

                
               
                const order={
                    contact: {
                        firstName: inputName.value,
                        lastName: inputLastName.value,
                        address: inputAdress.value,
                        city: inputCity.value,
                        email: inputMail.value,
                    },
                    products: idProductsBuy,
                }



                sendOrder(order, Total_Price);
                }
            })
        }

        function sendOrder(order, Total_Price){
            
            console.log(order)
            
            const initRequest=
                {
                    method: "POST",
                        body: JSON.stringify(order),
                        headers: { "Content-Type": "application/json" },
                        mode:"cors",
                }
            
                fetch("http://localhost:3000/api/furniture/order", initRequest) 
                       
                .then(function (response) {
                    return response.json()
                  })
            
                .then(function(responseAPI){
                    console.log(responseAPI)
                   console.log(responseAPI.orderId)
                   
                   localStorage.setItem("numberId", responseAPI.orderId);
                   localStorage.setItem("priceOrder", Total_Price);
                   localStorage.removeItem("product");

                   window.location.href="confirmation.html"
                    
                })
            
                .catch((error =>{
                    console.log(error)
                }))
            
        }
    
