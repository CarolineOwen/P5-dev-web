// Récupération de l'orderId du local storage et affichage dans le DOM
document.getElementById("orderId").innerText = localStorage.getItem("orderId");
//vide le local storage une fois la commande effectuée
localStorage.clear();
