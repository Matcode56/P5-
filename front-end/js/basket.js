main();

async function main(){
    const productLocalStorage= getProduct();
    console.log(productLocalStorage);

    let gridProduct= document.querySelector(".product_added");
    if(productLocalStorage===null || productLocalStorage.length==0){
        gridProduct.innerHTML="Votre panier est vide "
    }
    else{
        const Total_Price= calcTotalPrice(productLocalStorage);
        displayInfosProduct(productLocalStorage, Total_Price);
        runBtnDelete(productLocalStorage);
        calcTotalPrice(productLocalStorage);
        displayForm();
        controlForm(productLocalStorage, Total_Price);
        
    }

    
    
}

function getProduct(){
    return JSON.parse(localStorage.getItem("product"));
}


function displayInfosProduct(productLocalStorage, Price_total){

    let gridProduct= document.querySelector(".product_added");
  
        for(i=0; i< productLocalStorage.length; i++){
            gridProduct.innerHTML+= 
            `<p class="name_product">${productLocalStorage[i].name}</p>
                     
            <p class="quantity_product">${productLocalStorage[i].quantity}</p>

            <p class="color_product">${productLocalStorage[i].color}</p>
       
            <p class="price_product_">${new Intl.NumberFormat('fr-FR', { 
                style: 'currency', currency: 'EUR' }
                ).format(productLocalStorage[i].price)}</p>

            <button class="btn_delete"> Suppr </button>`
        }

        let div_total= document.querySelector(".total_product");

        div_total.innerHTML= "Total: "+  new Intl.NumberFormat('fr-FR', { 
            style: 'currency', currency: 'EUR' }
            ).format(Price_total);
    
}

function runBtnDelete(productLocalStorage){
    let btn_delete= document.querySelectorAll(".btn_delete");
        
        for(let l=0; l<btn_delete.length; l++){
            btn_delete[l].addEventListener("click", (event) => {
                event.preventDefault();
                nameSelectToSuppr= productLocalStorage[l].name;
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

        <button id="btn_validate">Validez mon panier</button>`
    }
   



function controlForm(productLocalStorage, Total_Price){

    // Récupération données formulaire 

    const form= document.querySelector(".bloc_form");
    let text_error= document.createElement("p");
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
                const idProductsBuy= [];
                for(let id=0; id<productLocalStorage.length; id++){
                    idProductsBuy.push(productLocalStorage[id].id);
                }
                console.log(idProductsBuy);
                

                
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

