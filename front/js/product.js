//cibler un produit en fonction de son ID dans l'URL
let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

//requete à l'API en fonction du produit ciblé grâce à son identifiant
let mainURL = "http://localhost:3000/api/products/";

let productURL = mainURL + id;
console.log(productURL)


fetch(productURL)
  .then((result) => result.json())
  .then((data) => {
      //creation des élements de manière dynamique dans le DOM
    let imag = document.createElement("img");
    document.querySelector(".item__img").appendChild(imag);
    imag.src = data.imageUrl;
    let descri = data.description;
    console.log(descri);
    document.getElementById("description").innerText = `${descri}`;
    document.getElementById("title").innerText = `${data.name}`;
    document.getElementById("price").innerText = `${data.price}`;
    data.colors.forEach((style) => {
      console.log(style);
      let coloris = document.createElement("option");
      document.getElementById("colors").appendChild(coloris);
      coloris.innerHTML = `${style}`;
    })
    //appel de la fonction (définie plus bas) qui ajoute les produits au panier au clic
    addBasket1();
  })
  //En cas d'échec de l'appel à l'API attraper l'erreur pour empecher que javaScript bloque tout
  .catch(function (err) {
    console.dir(err)
    alert("Nous n'avons pas réussi à aficher le produit demandé, veuillez nous excuser pour la gêne occasionnée")
  });

//ajout des produits au panier au clic via le local Storage
function addBasket1() {
let bouton = document.getElementById("addToCart");
bouton.addEventListener('click', () => {
    let select = document.getElementById("colors").value;
    console.log(select);
    let qty = parseInt(document.getElementById("quantity").value);
    console.log(qty);
    let identifiant = id;
    console.log(identifiant);
    let produitChoisi = {
        id: identifiant,
        idAndColor:identifiant+select,
        colori: select,
        quantite: qty,
    }
    console.log(produitChoisi);
    
function saveBasket(basket){ 
    localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket(){
    let basket = localStorage.getItem("basket");
    if (basket == null){
        return [];
    }else {
        return JSON.parse(basket);
    }
}

function addBasket(produitChoisi){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.idAndColor == produitChoisi.idAndColor);
    if(foundProduct != undefined){
        foundProduct.quantite += qty;
    }else{
        basket.push(produitChoisi);
    }
    saveBasket(basket);
}

addBasket(produitChoisi);
} )
};




