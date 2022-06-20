//lancement et requete de l'API avec la promesse fetch

fetch("http://localhost:3000/api/products")
  //retour des résultats en  format JSON
  .then((result) => result.json())

  // récupération de la réponse en la parcourant pour insérer les éléments de manière dynamique dans le DOM
  .then((tab) => {
    // à chaque tour de boucle création de chaque canapé
    for (let product of tab) {
      document.getElementById(
        "items"
      ).innerHTML += `<a href="./product.html?id=${product._id}">
            <article> <img src ="${product.imageUrl}" alt="${product.altTxt}" >
            <h3 class="productName">${product.name}</h3> 
              <p class = "productDescription">${product.description}</p>
              </article>
              </a>`;
    }
  })

  //En cas d'échec de l'appel à l'API, attraper l'erreur pour empecher que javaScript bloque tout
  .catch(function (err) {
    console.dir(err);
    document.getElementById(
      "items"
    ).innerHTML = `<h3>"Nous n'avons pas réussi à aficher les produits, veuillez nous excuser pour la gêne occasionnée"</h3>`;
  });
