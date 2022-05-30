// récupérer les produits du local storage
let panier = JSON.parse(localStorage.getItem("basket"));
console.log(panier);
for(let i of panier){
    let id = i.id;
    console.log(id);

let mainURL = "http://localhost:3000/api/products/";

let productURL = mainURL + id;
console.log(productURL);
    
fetch(productURL)
.then((result) => result.json())
.then((data) => {
document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${i.id}" data-color="${i.colori}">
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
let prices = data.price * i.quantite
let totalPrice = 0;
let totalQuantity = 0;
for(let i of panier) {
totalQuantity += (i.quantite);
totalPrice += (prices);
document.getElementById("totalQuantity").innerHTML = `${totalQuantity}`;
document.getElementById("totalPrice").innerHTML = `${totalPrice}`
}

})
};






