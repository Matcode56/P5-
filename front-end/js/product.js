// Récupération de l'Id via les infos de l'URL
let param= (new URL(document.location)).searchParams;
let id=param.get("id");

console.log(id);

//Adresse d'appel d'API
const Url= `http://localhost:3000/api/furniture/${id}`
console.log(Url);



//Appel API

    fetch(Url)
        .then((response)=> response.json())
        .then(function(responseAPI){

            //récupération des données du produits dans  2 array (1 array produit complet, 1 array avec les couleurs)
                const product= responseAPI;
                const colors= product.varnish;

                console.log(product);
                console.log(product.varnish)

            //Création de la card
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

                // Création des différentes couleur possible

                const select_color=document.querySelector("select");

                colors.forEach(color => {
                const colorOption = document.createElement("option")
                colorOption.setAttribute("value", color)
                colorOption.innerHTML = color
                select_color.appendChild(colorOption)
                })

                
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
                    });
        })
            
                
        .catch(function(error){
            console.log(error);
        });

    
        