//lancement et requete de l'API avec la promesse fetch

fetch("http://localhost:3000/api/products")
//retour des résultats en  format JSON
  .then((result) => result.json())

  // récupération de la réponse en la parcourant pour insérer les éléments de manière dynamique dans le DOM
  .then((tab) => {
    for (let products of tab) {
      document.getElementById(
        "items"
      ).innerHTML += `<a href="./product.html?id=${products._id}">
            <article> <img src ="${products.imageUrl}" alt="${products.altTxt}" >
            <h3 class="productName">${products.name}</h3> 
              <p class = "productDescription">${products.description}</p>
              </article>
              </a>`;
    }
  })
//En cas d'échec de l'appel à l'API attraper l'erreur pour empecher que javaScript bloque tout
  .catch(function (err) {
    console.dir(err)
    alert("Nous n'avons pas réussi à aficher les produits, veuillez nous excuser pour la gêne occasionnée")
  });



