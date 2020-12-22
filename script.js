// Source : https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects/JSON
//Donc, pour commencer, nous allons charger l'URL du fichier JSON que nous voulons récupérer dans une variable. 
let requestURL = "https://sampleapis.com/recipes/api/recipes";
let request = new XMLHttpRequest();
//Afin de créer une requête, nous avons besoin d'instancier un nouvel objet XMLHttpRequest à partir 
//de son constructeur en utilisant le mot clé new.

//Maintenant, nous avons besoin d'ouvrir une nouvelle requête grâce à la méthode open()
request.open('GET', requestURL);

//La méthode HTTP à utiliser sur le réseau pour notre requête. Dans notre cas, la méthode GET est appropriée dans la mesure où nous voulons simplement récupérer quelques données.
//L'URL où adresser notre requête — il s'agit de l'URL du fichier JSON dont nous parlions tout à l'heure.

request.send();

request.responseType = 'json';

//document.getElementById("banniere_description").innerHTML = "TEST";

//La réponse du serveur et son traitement.
request.onload = function() {
    var recettes = request.response;
//    populateTitle(recettes);
    dropDownRecipes(recettes);  // function à modifier
  }

  // Alimentation du DropDown
function dropDownRecipes(jsonObj) {
var recettes_sel = document.getElementById("choix_recette");

for (var i=0; i < jsonObj.length; i++){
    if (jsonObj[i]['title'] != ""){
        var option = document.createElement("option");
        option.text = jsonObj[i]['title'];
        option.value = jsonObj[i]['id'];
        recettes_sel.add(option);
    }

}

}  

function populateTitle(jsonObj) {
    document.getElementById("baniere_title_text").innerHTML = jsonObj[0]['title'];
    }

function findRecipe(id) {
    var rec = request.response;
    for (var i = 0; i<rec.length; i++){
        if (rec[i]['id'] == id) {
            return rec[i];
        }
    }
    }

const newLocal = "href";
function uneRecette() {
var ele = document.getElementById("choix_recette");
var idR = ele.options[ele.selectedIndex].value;
console.log(ele);

// Recuperation des data json de la recette correspondante a l'id
recipe = findRecipe(idR);
var titleR = recipe["title"];
var descR = recipe["directions"];
var prepTimeR = recipe["prepTime"];
var cookTimeR = recipe["cookTime"];
var totalTimeR = recipe["totalTime"];
var ingredR = recipe["ingredients"].split('\n');
var imgSrcR = recipe["photoUrl"];
var urlRecette = recipe["source"]

//    var dirR = recipe["directions"];

// Image de la recette
//var imgR = document.getElementById("imgR");
//imgR.setAttribute("src", imgSrcR);
document.getElementById("baniere_title_text").innerHTML = titleR;     
document.getElementById("banniere_image").style.background = "url("+imgSrcR+") no-repeat center / cover";

document.getElementById('bouton_rouge').setAttribute("href", urlRecette);
document.getElementById("temps_preparation").innerHTML = prepTimeR + " minutes";
document.getElementById("temps_cuisson").innerHTML = cookTimeR + " minutes";
document.getElementById("temps_total").innerHTML = totalTimeR + " minutes";

//document.getElementById("ingredients").innerHTML = ingredR
//document.getElgetElementById('bouton_rouge').href = urlRecette

// // Tableau de temps (total / preparation / cuisson)
// var tbT = document.getElementById("tableTime");
// tbT.rows[1].cells[0].innerHTML = totalTimeR + " min"
// tbT.rows[1].cells[1].innerHTML = prepTimeR + " min"
// tbT.rows[1].cells[2].innerHTML = cookTimeR + " min"

// Description de la recette
document.getElementById("description").innerHTML = descR;

// // Ingredients listes dans une liste à puce
ingL = document.getElementById("ingredients")
for (var j=0; j<ingredR.length; j++) {
    var ingItem = document.createElement('li');
    ingItem.textContent = ingredR[j];
    ingL.append(ingItem);
}

// // Instructions pour la recette
// document.getElementById("instR").innerHTML = dirR;
}
