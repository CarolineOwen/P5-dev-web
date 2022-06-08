// récupérer les produits du local storage
let panier = JSON.parse(localStorage.getItem("basket"));
console.log(panier);

let total = 0;

//itérer sur chaque produit du local storage et récupérer l'id de chaque produit
//vérifier que quelque chose soit dans le if panier.lenght>0 / else afficher le panier est vide

for (let i of panier) {
  let id = i.id;
  console.log(id);

  let mainURL = "http://localhost:3000/api/products/";
  let productURL = mainURL + id;
  console.log(productURL);

  //appel à l'API + id pour récupérer les données manquantes au local storage et les ajouter au DOM dynamiquement
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

      //formule pour obtenir le prix total du panier
      total += data.price * i.quantite;
      console.log(total);
      document.getElementById("totalPrice").innerHTML = total;

      totalQuantite();
      supprimerUnProduit();
      modificationQuantite();
    });
}

//formule pour obtenir la quantité totale de tous mes article
function totalQuantite() {
  let itemQtt = document.getElementsByClassName("itemQuantity");
  totalQtt = 0;

  for (let i = 0; i < itemQtt.length; ++i) {
    totalQtt += itemQtt[i].valueAsNumber;
  }

  document.getElementById("totalQuantity").innerHTML = totalQtt;
}

//formule pour supprimer un produit du panier
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

//formule pour modifier la quantité d'un produit dans le panier
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

console.log(panier);

// const prenom//

const validFisrtName = function (inputFirstName) {
  let firstNameRegExp = new RegExp("^[a-zA-Zéè-]{3,25}$");
  let testName = firstNameRegExp.test(inputFirstName.value);
  let error = document.getElementById("firstNameErrorMsg");
  if (testName) {
    error.innerHTML = "prénom valide";
    return true;
  } else {
    error.innerHTML = "prénom  non valide";
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
    error.innerHTML = "nom  non valide";
    return false;
  }
};

// const adresse

const validAddress = function (inputAddress) {
  let addressRegExp = new RegExp("^[A-Za-z0-9\\s*]+$");
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
  let cityRegExp = new RegExp("^[a-zA-Z]{1,50}$");
  let testCity = cityRegExp.test(inputCity.value);
  let error = document.getElementById("cityErrorMsg");
  if (testCity) {
    error.innerHTML = "ville valide";
    return true;
  } else {
    error.innerHTML = "ville non valide";
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
    error.innerHTML = "email non valide";
    return false;
  }
};

//Formulaire vérification des champs//
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

// Au clic pour passer commande
const boutonForm = document.querySelector("#order");
boutonForm.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    validFisrtName(form.firstName) &&
    validLastName(form.lastName) &&
    validAddress(form.address) &&
    validCity(form.city) &&
    validEmail(form.email)
  ) {
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    localStorage.setItem("contact", JSON.stringify(contact));
    console.log(localStorage);

    const products = [];
    for (let i = 0; i < panier.length; i++) {
      products.push(panier[i].id);
    }

    const formulairePlusPanier = {
      contact,
      products,
    };

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
        localStorage.setItem("orderId", data.orderId);
        window.location = "confirmation.html";
      })

      .catch(function (err) {
        console.dir(err);
        alert(
          "Une erreur est survenue, veuillez nous excuser pour la gêne occasionnée"
        );
      });
  }
});
