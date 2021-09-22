main();

async function main(){
    const idProduct= getIdProduct()
    const product= await getInfosProduct(idProduct);
    displayInfosProduct(product);
}

function getIdProduct(){
const param= (new URL(document.location)).searchParams;
return param.get("id");
}


async function getInfosProduct(idProduct){
    const URL= `http://localhost:3000/api/furniture/${idProduct}`
    try {
        const askAPI = await fetch(URL);
        const responseAPI = await askAPI.json();
        return responseAPI;
    } catch (e) {
        const bloc_section = document.querySelector("section");
        const text_error = document.createElement("p");
        text_error.innerHTML = "Désolé nous rencontrons un problème d'affichage, résseayez ultérieurement";
        text_error.classList.add("text_error");
        bloc_section.append(text_error);
    }   
}


function displayInfosProduct(product){
    let section= document.querySelector("section");
        section.innerHTML=
        `<div class="product">
            <img src="${product.imageUrl}"/>
            <div class="infos_product">
                <h2 class="title_product">${product.name}</h2>
                <p class="description_product">${product.description} </p>
                <p class="price_product"></p>
            </div>

            <div class="infos_order">
                <p>
                    <label for="quantity_product" class="label_product_page">Quantité:</label>
                    <input type="number"  id="quantity_product" name="quantity_product" required
                    minlength="1" maxlength="2" step="1">
                </p>

                <p>
                    <label for="color_product" class="label_product_page">Couleur:</label>

                    <select name="color_product" id="color_product">
                        
                    </select>
                </p>

                <div class="validError">
                    <a href ="#" class="div_basket">
                        <button type ="submit" id="btn_add" value="submit"> Ajouter au panier</button>
                    </a>
                </div>
            </div>

        </div>`;

        //Gestion des différents choix de couleurs 
        const select_color=document.querySelector("select");

        colors= product.varnish;

        colors.forEach(color => {
        const colorOption = document.createElement("option")
        colorOption.setAttribute("value", color)
        colorOption.innerHTML = color
        select_color.appendChild(colorOption)
        })

        //Gestion du prix à afficher 
        const price_product= document.querySelector(".price_product");
        let Price_convert = product.price / 100;
        price_product.innerHTML=new Intl.NumberFormat('fr-FR', { 
            style: 'currency', currency: 'EUR' }
            ).format(Price_convert);

        
        // Gestion du bouton ajouter au panier 

        const btn_basket= document.querySelector("#btn_add");
        const input_quantity= document.querySelector("#quantity_product");
        
        const color_selected = select_color.options[select_color.selectedIndex].text;

        btn_basket.addEventListener("click", () => {
           
            console.log(Number.isInteger(Number(input_quantity.value)));
            // Si l'utilisateur a rentré une quantité valide
            if(input_quantity.value>0 && Number.isInteger(Number(input_quantity.value))){

                addLocalStorage();

                function addLocalStorage(){

                    const productAdded={
                        name: product.name,
                        price: product.price/100,
                        quantity: input_quantity.value,
                        color: color_selected,
                        id: product._id,
                    }
                    console.log(productAdded);
                    let eltInStorage= JSON.parse(localStorage.getItem("product"))
                    console.log(eltInStorage);
                    
                    if (eltInStorage === null){
                        eltInStorage=[];
                        eltInStorage.push(productAdded);
                        localStorage.setItem("product", JSON.stringify(eltInStorage))
                        console.log(eltInStorage);
                        infosAdd();


            
                    }
                    else{
                        eltInStorage.push(productAdded);
                        localStorage.setItem("product", JSON.stringify(eltInStorage));
                        console.log(eltInStorage);
                        infosAdd();

                    }

                    function infosAdd() {
                        if(document.querySelector(".textValidate")=== null && document.querySelector(".textError")===null){
                            const div_validError= document.querySelector(".validError");
                            const textInfosOrder= document.createElement("p");
                            textInfosOrder.classList.add("textValidate")
                            textInfosOrder.innerHTML= "Vos produit ont bien été ajouté au panier"
                            div_validError.prepend(textInfosOrder);
                            }
                            else if(document.querySelector(".textError")!==null){
                                const textError= document.querySelector(".textError");
                                textError.innerHTML= "Vos produit ont bien été ajouté au panier";
                                textError.classList.remove("textError");
                                textError.classList.add("textValidate");
            
                            }
                        
                    }
                    
                }

              
            }
            else{
                if(document.querySelector(".textError")=== null && document.querySelector(".textValidate")===null){
                const div_validError= document.querySelector(".validError");
                const textError= document.createElement("p");
                textError.classList.add("textError");
                textError.innerHTML="Veuillez entrer une quantité valide";
                div_validError.prepend(textError);
                }
                else if(document.querySelector(".textValidate")!==null){
                    const textInfosOrder= document.querySelector(".textValidate");
                    textInfosOrder.innerHTML= "Veuillez entrer une quantité valide";
                    textInfosOrder.classList.remove("textValidate");
                    textInfosOrder.classList.add("textError");
                }
            }
            });
}   


        

