let productLocalStorage= JSON.parse(localStorage.getItem("product"));
console.log(productLocalStorage);


let gridProduct= document.querySelector(".product_added");

if(productLocalStorage===null){
    gridProduct.innerHTML="Votre panier est vide "
}
else{
    addInfosProduct();
    calculTotalPrice();
    btn_suppr();
    controleForm();
    }
   
    

function addInfosProduct(){

    
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
}

// Ajout fonctionnalité bouton supprimé
function btn_suppr(){
    let btn_delete= document.querySelectorAll(".btn_delete");

    console.log(btn_delete);
    
        
        for(let l=0; l<btn_delete.length; l++){
            btn_delete[l].addEventListener("click", (event) => {
                event.preventDefault();
                nameSelectToSuppr= productLocalStorage[l].name;
                alert("Le produit" + nameSelectToSuppr +"a été supprimé");

                productLocalStorage= productLocalStorage.filter(elt => elt.name !== nameSelectToSuppr)
                console.log(productLocalStorage);
                localStorage.setItem("product", JSON.stringify(productLocalStorage));

                window.location.href="basket.html"

            });
        }
    }

    // functionnalité calcul total

    
    function calculTotalPrice (){   
        
        let div_total= document.querySelector(".total_product")
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
       
        
       
        div_total.innerHTML= "Total: "+  new Intl.NumberFormat('fr-FR', { 
            style: 'currency', currency: 'EUR' }
            ).format(Price_total);
        
        
    }




function controleForm(){

    // Récupération données formulaire 

    const form= document.querySelector(".form");
    let text_error= document.querySelector("p");
    let inputName= document.querySelector("#name");
    let inputLastName= document.querySelector("#lastname");
    let inputPostal= document.querySelector("#postal");
    let inputCity= document.querySelector("#city");
    let inputAdress= document.querySelector("#adress");
    let inputMail= document.querySelector("#mail");
    let inputTel= document.querySelector("#phone");
    const btn_confirm= document.querySelector("#btn_validate");



    // Règles Regex

    let emailRegExp= new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)

    let telRegExp= new RegExp(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/g);

    let postalRegExp= new RegExp(/^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/g);


    function testEmail(email){
        return emailRegExp.test(email);
    }

    function testTel(tel){
        return telRegExp.test(tel);
    }

    function testPostal(Postal){
        return postalRegExp.test(Postal);
    }


    
    //Contrôle si les règles Regex sont respéctés

    btn_confirm.addEventListener("click", (event) =>{
        event.preventDefault();
            if(!inputName.value ||
                !inputLastName.value ||
                !inputPostal.value ||
                !inputCity.value ||
                !inputAdress.value ||
                !inputMail.value ||
                !inputTel.value){

                    form.append(text_error);
                    text_error.innerHTML="Attention, vous n'avez pas rempli tout les champs"
            }
            else if(
                inputName.value == true &&
                inputLastName.value == true &&
                inputPostal.value == true &&
                inputCity.value == true &&
                inputAdress.value == true &&
                inputTel.value == true &&
                !testEmail(inputMail.value)){
                    
                    form.append(text_error);
                    text_error.innerHTML="Veuillez saisir une adresse mail valide";
                    console.log(inputMail.value)
            
            }
            
            else if(
                inputName.value== true  &&
                inputLastName.value == true &&
                inputPostal.value == true  &&
                inputCity.value == true &&
                inputAdress.value == true &&
                inputMail.value == true &&
                !testTel(inputTel.value)){
                    form.append(text_error);
                    text_error.innerHTML="Veuillez saisir un numéro de téléphone valide";
                    console.log(inputTel.value)
                }

            else if(
                inputName.value == true &&
                inputLastName.value == true &&
                inputPostal.value == true &&
                inputCity.value == true &&
                inputAdress.value == true  &&
                inputMail.value == true &&
                inputTel.value == true &&
                !testPostal(inputPostal)){
                    form.append(text_error);
                    text_error.innerHTML="Veuillez saisir votre code postal complet et valide";
                }

            /* 
            Création de la constance order SI toutes les règles sont respéctés pour 
            stocker les infos nécessaires à envoyer aux back-end pour confirmer la commande
            */
            
            else{
                const order={
                    contact: {
                        firstName: inputName.value,
                        lastName: inputLastName.value,
                        city: inputCity.value,
                        address: inputAdress.value,
                        email: inputMail.value,
                    },
                    products: productLocalStorage,
                }
                console.log(order)
            }
            
    })

}

const init={
    method: "POST",
    body: JSON.stringify(order),
    
}

