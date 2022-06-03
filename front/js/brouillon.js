// récupérer les produits du local storage
/*let panier = JSON.parse(localStorage.getItem("basket"));
console.log(panier);
let structurePanier = [];
let total = 0;

//itéter sur chaque produit du local storage et récupérer l'id de chaque produit

for (k=0; k<panier.length ; k++) {
  console.log(panier.length);
  
  let id = i.id;
  console.log(id);

  let mainURL = "http://localhost:3000/api/products/";
  let productURL = mainURL + id;
  console.log(productURL);

  //appel à l'API + id pour récupérer les données manquantes au local storage et les ajouter au DOM dynamiquement
  fetch(productURL)
    .then((result) => result.json())
    .then((data) => {
      structurePanier = structurePanier + 
       `<article class="cart__item" data-id="${i.id}" data-color="${i.colori}">
<div class="cart__item__img">
  <img src="${data.imageUrl}" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${data.name}</h2>
    <p>${i.colori}</p>
    <p>${data.price}€</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${i.quantite}">
      
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`;
console.log(structurePanier);
      //formule pour obtenir le prix total de chaque canapé en fonction de sa quantité

      //ok ça fonctionne
      total += data.price * i.quantite;
      console.log(total);
      document.getElementById("totalPrice").innerHTML = total;
      //essaye d'avoir le total price en additionnant le total de chaque article
      //ne fonctionne pas
      
    })
}

//formule pour obtenir la quantité totale de tout mes article
let totalQuantity = 0;
for (let i of panier) {
  totalQuantity += i.quantite;
  console.log(totalQuantity);
}
document.getElementById("totalQuantity").innerHTML = `${totalQuantity}`; //ok ça fonctionne

//bouton supprimer
let boutonSupprimer = document.querySelectorAll(".delateItem");
      console.log(boutonSupprimer);*/
