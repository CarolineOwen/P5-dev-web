// récupérer les produits du local storage
let panier = JSON.parse(localStorage.getItem("basket"));

let total = 0;
//si le panier est vide, un message indique à l'utilisateur d'ajouter un article au panier
if (panier === null || panier == 0 || panier == undefined) {
  let vide = document.getElementById("cart__items");
  vide.innerHTML = `<h3>Veuillez ajouter au moins un article au panier</h3>`;
} else {
  //sinon itérer sur chaque produit du panier et récupérer leur id
  for (let i of panier) {
    let id = i.id;
    let mainURL = "http://localhost:3000/api/products/";
    let productURL = mainURL + id;
    //appel à l'API + id pour récupérer les données manquantes du local storage et les ajouter au DOM dynamiquement
    fetch(productURL)
      .then((result) => result.json())
      .then((data) => {
        document.getElementById(
          "cart__items"
        ).innerHTML += `<article class="cart__item" data-id="${i.id}" data-color="${i.colori}">
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

        //formule pour obtenir la quantité et le prix total du panier avec la variable total qu'on a défini au début du document
        total += data.price * i.quantite;
        document.getElementById("totalPrice").innerHTML = total;
        totalQuantite();
        //ajout des fonctions pour pouvoir supprimer ou modifier un produit
        supprimerUnProduit();
        modificationQuantite();
      })
      .catch(function (err) {
        console.dir(err);
        document.querySelector(
          "#cart__items"
        ).innerHTML = `<h3>Nous n'avons pas réussi à aficher les produits, veuillez nous excuser pour la gêne occasionnée</h3>`;
      })
      
  }
}

//fonction pour obtenir la quantité totale de tous mes article
function totalQuantite() {
  let itemQtt = document.getElementsByClassName("itemQuantity");
  totalQtt = 0;

  for (let i = 0; i < itemQtt.length; ++i) {
    totalQtt += itemQtt[i].valueAsNumber;
  }

  document.getElementById("totalQuantity").innerHTML = totalQtt;
}

//fonction pour supprimer un produit du panier
function supprimerUnProduit() {
  let supprimer = document.querySelectorAll(".deleteItem");
  console.log(supprimer);

  for (let l = 0; l < supprimer.length; l++) {
    supprimer[l].addEventListener("click", (event) => {
      event.preventDefault();
      console.log("coucou");
      let supprimerId = panier[l].idAndColor;
      console.log(supprimerId);
      panier = panier.filter((el) => el.idAndColor !== supprimerId);
      console.log(panier);
      localStorage.setItem("basket", JSON.stringify(panier));
      location.reload();
    });
  }
}

//fonction pour modifier la quantité d'un produit dans le panier
function modificationQuantite() {
  let plus = document.querySelectorAll(".itemQuantity");
  console.log(plus);

  for (let p = 0; p < plus.length; p++) {
    plus[p].addEventListener("change", (event) => {
      event.preventDefault();
      let plusId = panier[p].quantite;
      console.log(plusId);
      let plusModifQty = plus[p].value;
      console.log(plusModifQty);
      const resultFind = panier.find((el) => el.plusModifQty !== plusId);
      resultFind.quantite = plusModifQty;
      panier[p].quantite = resultFind.quantite;
      localStorage.setItem("basket", JSON.stringify(panier));
      location.reload();
    });
  }
}

// DEUXIEME PARTIE FORMULAIRE
//CONTROLE DES CHAMPS

// const prenom
const validFisrtName = function (inputFirstName) {
  let firstNameRegExp = new RegExp("^[a-zA-Zéè-]{3,25}$");
  let testName = firstNameRegExp.test(inputFirstName.value);
  let error = document.getElementById("firstNameErrorMsg");
  if (testName) {
    error.innerHTML = "prénom valide";
    return true;
  } else {
    error.innerHTML = "erreur, uniquement les lettres sont acceptées";
    return false;
  }
};

// const nom
const validLastName = function (inputLastName) {
  let lastNameRegExp = new RegExp("^[a-zA-Zéè-]{3,25}$");
  let testLastName = lastNameRegExp.test(inputLastName.value);
  let error = document.getElementById("lastNameErrorMsg");
  if (testLastName) {
    error.innerHTML = "nom valide";
    return true;
  } else {
    error.innerHTML = "erreur, uniquement les lettres sont acceptées";
    return false;
  }
};

// const adresse
const validAddress = function (inputAddress) {
  let addressRegExp = new RegExp(
    "^[A-Za-z0-9]{1,20}[\\s]{1}[A-Za-z0-9]{1,20}[a-zA-Z\\s]+$"
  );
  let testAddress = addressRegExp.test(inputAddress.value);
  let error = document.getElementById("addressErrorMsg");
  if (testAddress) {
    error.innerHTML = "adresse valide";
    return true;
  } else {
    error.innerHTML = "adresse non valide";
    return false;
  }
};

// const ville
const validCity = function (inputCity) {
  let cityRegExp = new RegExp("^[a-zA-Z\\s]{1,50}$");
  let testCity = cityRegExp.test(inputCity.value);
  let error = document.getElementById("cityErrorMsg");
  if (testCity) {
    error.innerHTML = "ville valide";
    return true;
  } else {
    error.innerHTML = "erreur, uniquement les lettres sont acceptées";
    return false;
  }
};

// const mail
const validEmail = function (inputEmail) {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z]+[.]{1}[a-z]{2,10}$"
  );
  let testEmail = emailRegExp.test(inputEmail.value);
  let error = document.getElementById("emailErrorMsg");
  if (testEmail) {
    error.innerHTML = "email valide";
    return true;
  } else {
    error.innerHTML = "erreur, veuillez respecter le format email avec un @";
    return false;
  }
};

//Formulaire vérification des champs au moment du remplissage//
let form = document.querySelector(".cart__order__form");
console.log(form);

form.firstName.addEventListener("change", function () {
  validFisrtName(this);
});

form.lastName.addEventListener("change", function () {
  validLastName(this);
});

form.address.addEventListener("change", function () {
  validAddress(this);
});

form.city.addEventListener("change", function () {
  validCity(this);
});

form.email.addEventListener("change", function () {
  validEmail(this);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  {
    form.submit();
  }
});

// Ecoute du bouton au clic pour passer commande
const boutonForm = document.querySelector("#order");
boutonForm.addEventListener("click", (e) => {
  e.preventDefault();
  //si tout les champs sont valid et que le panier contient au moins un produit
  if (
    validFisrtName(form.firstName) &&
    validLastName(form.lastName) &&
    validAddress(form.address) &&
    validCity(form.city) &&
    validEmail(form.email) &&
    panier.length > 0
  ) {
    //creation d'un objet contact
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };
    //envoie de cet objet dans le LS
    localStorage.setItem("contact", JSON.stringify(contact));

    //creation d'un tableau produit avec son ID
    const products = [];
    for (let i = 0; i < panier.length; i++) {
      products.push(panier[i].id);
    }

    //Données à envoyer au serveur
    const formulairePlusPanier = {
      contact,
      products,
    };
    //options de l'envoie fetch avec la methode POST
    const options = {
      method: "POST",
      body: JSON.stringify(formulairePlusPanier),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((result) => result.json())
      .then((data) => {
        //envoie de l'orderID dans le local storage
        localStorage.setItem("orderId", data.orderId);
        //redirection sur la page de confirmation
        window.location = "confirmation.html";
      })
      //si la promesse ne fonctionne pas on récupère l'erreur en l'ajoutant dynamiquement
      .catch(function (err) {
        console.dir(err);
        let newElt = document.createElement("div");
        document.querySelector("#emailErrorMsg").appendChild(newElt);
        newElt.innerHTML = `<br><h3>Une erreur est survenue lors de la commande, veuillez nous excuser pour la gêne occasionnée</h3>`;
      });
  } else {
    //ajouter un commentaire dynamiquement si les champs ne sont pas correctement remplis
    let newElt = document.createElement("div");
    document.querySelector("#emailErrorMsg").appendChild(newElt);
    newElt.innerHTML = `<br><h3>veuillez renseigner les champs correctement ou ajouter un produit dans votre panier</h3>`;
  }
});
