
const app = function(){
  const url = "https://api.punkapi.com/v2/beers"
  makeRequest(url);
  const jsonString = localStorage.getItem('beer');
  let savedBeer = JSON.parse(jsonString);
  if (!savedBeer) return;
  displayBeer(savedBeer);
}

const makeRequest = function(url) {
  vconst request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener( "load", function() {
    var beers = JSON.parse(this.responseText);
    render( beers );
  });
  request.send();
}

const addBeersToDropDown = function (beers) {
  const select = document.querySelector('#beer-drop-down');
  beers.forEach(function(beer) {
    let option = document.createElement("option");
    option.innerText = beer.name;
    option.value = JSON.stringify(beer);
    select.appendChild(option);
  })
};

const displayBeer = function (beer) {
  let div = document.querySelector('#beer');
  div.innerHTML = "";
  let nameHeading = document.createElement("h1");
  nameHeading.innerText = beer.name;
  let abvP = document.createElement("p");
  abvP.innerText = "The abv is " + beer.abv
  let img = document.createElement("img")
  img.src = beer.image_url;
  div.appendChild(nameHeading);
  div.appendChild(abvP);
  div.appendChild(img);
}

const render = function (beers) {
  addBeersToDropDown(beers);
  const select = document.querySelector('#beer-dropdown');
  select.addEventListener('change', function() {
    localStorage.setItem('beer', this.value);
    beer = JSON.parse(this.value);
    displayBeer(beer);
  })
}

document.addEventListener('DOMContentLoaded', app);
