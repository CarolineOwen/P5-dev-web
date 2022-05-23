//cibler un produit en fonction de son ID dans l'URL
let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

//requete à l'API en fonction du produit ciblé grâce à son identifiant
let mainURL = "http://localhost:3000/api/products/";

let productURL = mainURL + id;
console.log(productURL);

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
    data.colors.forEach((style) => {
      console.log(style);
      let coloris = document.createElement("option");
      document.getElementById("colors").appendChild(coloris);
      coloris.innerHTML = `${style}`;
    })
  })
  //En cas d'échec de l'appel à l'API attraper l'erreur pour empecher que javaScript bloque tout
  .catch(function (err) {
    console.dir(err)
    alert("Nous n'avons pas réussi à aficher le produit demandé, veuillez nous excuser pour la gêne occasionnée")
  });


