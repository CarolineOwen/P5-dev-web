//cibler un produit en fonction de son ID dans l'URL
let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

//requete à l'API en fonction du produit ciblé grâce à son identifiant
let mainURL = "http://localhost:3000/api/products/";
let productURL = "http://localhost:3000/api/products/" + id;


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
    //ForEach parcourt le tableau de couleurs et les insère dynamiquement dans le DOM
    data.colors.forEach((style) => {
      console.log(style);
      let coloris = document.createElement("option");
      document.getElementById("colors").appendChild(coloris);
      coloris.innerHTML = `${style}`;
    });
    //appel de la fonction (définie plus bas) qui ajoute les produits au panier au clic
    clicAddBasket();
  })
  //En cas d'échec de l'appel à l'API attraper l'erreur pour empecher que javaScript bloque tout
  .catch(function (err) {
    console.dir(err);
  alert(
      "Nous n'avons pas réussi à aficher le produit demandé, veuillez nous excuser pour la gêne occasionnée"
    );
  });

//fonction qui ajoute des produits au panier au clic via le local Storage
function clicAddBasket() {
  let bouton = document.getElementById("addToCart");
  //on écoute le clic qui déclenche les actions pour enregistré le produit sélectionné dans le local storage
  bouton.addEventListener("click", () => {
    let select = document.getElementById("colors").value;
    let qty = parseInt(document.getElementById("quantity").value);
    let identifiant = id;
    //défini le produit qui ira dans le panier
    let produitChoisi = {
      id: identifiant,
      idAndColor: identifiant + select,
      colori: select,
      quantite: qty,
    };
//enregistrer le panier dans le local storage
    function saveBasket(basket) {
      localStorage.setItem("basket", JSON.stringify(basket));
    }
//recuperer le panier localStorage
    function getBasket() {
      let basket = localStorage.getItem("basket");
      //si le panier est vide renvoyer un tableau vide
      if (basket == null) {
        return [];
        //sinon renvoyer le panier
      } else {
        return JSON.parse(basket);
      }
    }
//pour ajouter un produit au panier
    function addBasket(produitChoisi) {
      //on récupère le panier du LS
      let basket = getBasket();
      //si on a déjà un produit dans le panier on va comparer son ID et sa couleur pour augmenter sa quantité
      let foundProduct = basket.find(
        (p) => p.idAndColor == produitChoisi.idAndColor
      );
      if (foundProduct != undefined) {
        foundProduct.quantite += qty;
        //sinon on y ajoute le produit selectionné
      } else {
        basket.push(produitChoisi);
      }
      //puis on sauvegarde dans le local storage le nouveau panier
      saveBasket(basket);
    }

    addBasket(produitChoisi);
   alert("Le produit a été correctement ajouté au panier");
  });
}
