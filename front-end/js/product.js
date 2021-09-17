// Récupération de l'Id via les infos de l'URL
main();

async function main(){
    const idProduct= getIdProduct()
    const product= await getInfosProduct(idProduct);
    displayInfosProduct(product);
}

function getIdProduct(){
let param= (new URL(document.location)).searchParams;
return param.get("id");
}


function getInfosProduct(idProduct){
    let URL= `http://localhost:3000/api/furniture/${idProduct}`
    return fetch(URL)
        .then((response)=> response.json())
        .then(function(responseAPI){
                return responseAPI;
                
            })
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
                    <label for="quantity_product">Quantité:</label>
                    <input type="number"  id="quantity_product" name="quantity_product" required
                    minlength="1" maxlength="4">
                </p>

                <p>
                    <label for="color_product">Couleur:</label>

                    <select name="color_product" id="color_product">
                        
                    </select>
                </p>

                
                <a href ="#" class="div_basket">
                    <button type ="submit" id="btn_add" value="submit"> Ajouter au panier</button>
                </a>
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
            // Si l'utilisateur a rentré une quantité valide
            if(input_quantity.value>0){

                let productAdded={
                    name: product.name,
                    price: product.price/100,
                    quantity: input_quantity.value,
                    color: color_selected,
                    id: product._id,
                }
                console.log(productAdded);
                let eltInStorage= JSON.parse(localStorage.getItem("product"))
                console.log(eltInStorage);


                function addLocalStorage(){
                    
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
                        const divInfosOrder= document.querySelector(".infos_order")
                        const div_infos= document.createElement("p");
                        div_infos.innerHTML= "Vos produit a bien été ajouté au panier"
                        divInfosOrder.append(div_infos)
                    }
                    
                }

                addLocalStorage()
                
            }
            else{
                alert("Veuillez entrer une quantité de produit")
            }
            });
        

}   


        

/*
        
        // Renvoie des données vers le local Storage

        const btn_basket= document.querySelector("#btn_add");
        const input_quantity= document.querySelector("#quantity_product");
        
        const title_product= document.querySelector(".title_product");
        const price_product= document.querySelector(".price_product");
        Price_convert = product.price / 100;
        price_product.innerHTML=new Intl.NumberFormat('fr-FR', { 
            style: 'currency', currency: 'EUR' }
            ).format(Price_convert);
        var color_selected = select_color.options[select_color.selectedIndex].text;
        

      
            btn_basket.addEventListener("click", () => {
            if(input_quantity.value>0){

                let productAdded={
                    name: product.name,
                    price: product.price/100,
                    quantity: input_quantity.value,
                    color: color_selected,
                    id: id,
                }
                console.log(productAdded);
                let eltInStorage= JSON.parse(localStorage.getItem("product"))
                console.log(eltInStorage)
                function addLocalStorage(){
                    
                    
                    if (eltInStorage === null){
                        eltInStorage=[];
                        eltInStorage.push(productAdded);
                        localStorage.setItem("product", JSON.stringify(eltInStorage))
                        console.log(eltInStorage)
            
                    }
                    else{
                        eltInStorage.push(productAdded);
                        localStorage.setItem("product", JSON.stringify(eltInStorage));
                        console.log(eltInStorage);

                    }
                    
                }
                
                

                addLocalStorage()
                
            }
            else{
                alert("Veuillez entrer une quantité de produit")
            }
            });*/
