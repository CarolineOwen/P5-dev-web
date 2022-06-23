//cibler un produit en fonction de son ID dans l'URL
let params = new URL(document.location).searchParams;
let id = params.get("id");

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
    document.getElementById("description").innerText = `${descri}`;
    document.getElementById("title").innerText = `${data.name}`;
    document.getElementById("price").innerText = `${data.price}`;
    //ForEach parcourt le tableau de couleurs et les insère dynamiquement dans le DOM
    data.colors.forEach((style) => {
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
    document.querySelector(
      ".item__content"
    ).innerHTML = `<h3>Nous n'avons pas réussi à aficher le produit demandé, veuillez nous excuser pour la gêne occasionnée</h3>`;
  });

//fonction qui ajoute des produits au panier au clic via le local Storage
function clicAddBasket() {
  let bouton = document.getElementById("addToCart");
  //on écoute le clic qui déclenche les actions pour enregistrer le produit sélectionné dans le local storage
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
    if (qty > 0 && qty < 101 && select != '') {
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
      let newElt = document.createElement("div");
      document
        .querySelector(".item__content__settings__quantity")
        .appendChild(newElt);
      newElt.innerHTML = `<br><h3>Le produit a été correctement ajouté au panier</h3>`;
      // alert("Le produit a été correctement ajouté au panier");
    } else {
      alert("veuillez sélectionner une quantité entre 1 et 100 ou choisir une couleur");
    }
  });
}
