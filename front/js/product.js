let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

//déclarer URL Produits + /id 
let mainURL = "http://localhost:3000/api/products/"

let productURL = mainURL + id;
console.log(productURL)

fetch(productURL)
.then(result => result.json())
.then((data) => {
    let imag = document.createElement("img")
    document.querySelector(".item__img").appendChild(imag);
    imag.src = data.imageUrl;
    let descri = data.description;
    console.log(descri)
    document.getElementById("description").innerText += (`${descri}`)
    document.getElementById("title").innerText += (`${data.name}`)
    document.getElementById("price").innerText += (`${data.price}`)
    data.colors.forEach(style => {
        console.log(style)
        let coloris = document.createElement("option")
    document.getElementById("colors").appendChild(coloris);
    coloris.innerHTML = `${style}`
    });
});

/*.then((data) => {for(let colors of data) {
    document.getElementById("colors").innerHTML += (`<option value="vert">${data.colors}</option>
    <option value="blanc">${data.colors}</option>`)
}


);*/

/*fetch(productURL) 
.then(result => result.json())
.then((data) => { for(let k in data) {
    console.log(k);
    let test = data[k];
    console.log(test);
    for(let b in k){
        console.log(b);
        console.log(k[name]);
    }
    let descri = document.getElementById("description");
    let info = k.description;
    console.log(info)
descri.innerText = info;}
    

.then((data) => {for(let [key, value] of Object.entries(data)) {
    console.log(`${data.description}`);
}});

}) */



