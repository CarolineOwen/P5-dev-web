fetch("http://localhost:3000/api/products")
  .then((result) => result.json())

  // .then((tab) => {for(let products = 0; products < tab.length; products++){}})
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
      console.log(products.imageUrl);
    }
  })

  .catch(function (err) {
    //Une erreur est survenue
  });


// document.write(tab[i].name);
//}
