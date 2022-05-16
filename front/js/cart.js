 /*fetch("http://localhost:3000/api/products")
.then(result => result.json())
.then((tab) => {
    for(let i of tab){console.log(i);
        }
   // document.write(tab[i].name);
//}
console.log(tab[0].name);
let objet = { nom: tab[0].name,
des: tab[0].description,
image: tab[0].imageUrl};
console.log(objet);
})
.catch(function(err) {
//Une erreur est survenue
});



let items = document.getElementById('items');
console.log(items.innerText);
items.innerHTML = "<em>cc</em>";

for(let i = 0; i < tab.length; i++){
    console.log(tab[i].name) 
 console.log(tab[i].name + " " + tab[i].price);}
 
 console.log(tab[0].name);
 let objet = { nom: tab[0].name,
 des: tab[0].description,
image: tab[0].imageUrl};
 console.log(objet);


    

let h6= document.getElementById("items");
h6.innerHTML = "<h3>demain</h3>";


let a = document.createElement("a");
document.querySelector("#items.items").appendChild(a);

let article = document.createElement("article");
document.querySelector("#items.items").appendChild(article);

let img = document.createElement("img");
img.src ="../images/kanap01.jpeg";
document.querySelector("#items.items").appendChild(img);
img.style.width = "100px";


let h3 = document.createElement("h3");
document.querySelector("#items.items").appendChild(h3);
h3.innerHTML ="Canap Sinopé";
h3.style.color ="pink";

let p = document.createElement("p");
document.querySelector("#items.items").appendChild(p);
p.innerHTML ="Excepteur sint occaecat";

let img = document.createElement("img");
document.querySelector("#items").appendChild(img);

class product {
    constructor(img, h3, p){
        this.img = img;
        this.h3 = h3;
        this.p = p;
    }
}

let age = 37;
console.log(`j'ai ${age}`);
age = 38;
console.log(`j'ai ${age}`);/*/

/*let img = document.createElement("img");
img.src ="http://localhost:3000/images/kanap01.jpeg";
document.querySelector("#items.items").appendChild(img);*/

