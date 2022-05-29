// récupérer les produits du local storage
/*let panier = JSON.parse(localStorage.getItem("basket"));
console.log(panier);
for(let i of panier){
let id = i.id;
console.log(id);

let mainURL = "http://localhost:3000/api/products/";
console.log(mainURL);

let productURL = mainURL + id;
console.log(productURL);

    
fetch(productURL)
.then((result) => result.json())
.then(function(data) {
document.getElementById("cart__items").innerHTML= panier.map((produit) => `<article class="cart__item" data-id="${produit.id}" data-color="${produit.colori}">
<div class="cart__item__img">
  <img src="${data.imageUrl}" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${data.name}</h2>
    <p>${produit.colori}</p>
    <p>${data.price}</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantite}">
      
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`)})};*/