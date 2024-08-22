/* eslint-disable */
import "bootstrap";
import "./style.css";
// declarando los colores de las cartas
const diamond = { symbol: "♦", color: "red" };
const heart = { symbol: "♥", color: "red" };
const spade = { symbol: "♠", color: "black" };
const club = { symbol: "♣", color: "black" };
//declarando los arrays que contienen lo necesario para generar las cartas
const cardColor = [diamond, heart, spade, club];
const cardNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let card = {};
let cardList = [];
//declarando el input, buttons y demas
let cardQuantity = document.getElementById("quantity");
const drawBtn = document.getElementById("drawBtn");
const sortBtn = document.getElementById("sortBtn");
const originalSpot = document.getElementById("cardSpace");
const sortSpot = document.getElementById("sortingSpace");
let spotInner = "";
let sortCount = 0;

//listener de tipo click en el boton Draw
drawBtn.addEventListener("click", function() {
  if (cardQuantity.value >= 2 && cardQuantity.value <= 10) {
    spotInner = "";
    sortSpot.innerHTML = "";
    cardsGenerator(cardQuantity.value, originalSpot);
  }
});
//listener de tipo click en el boton Sort
sortBtn.addEventListener("click", () => selectSort());

//funcion que genera un numero aleatorio necesario para el index de cada elemento
function indexGenerator(arr) {
  return Math.floor(Math.random() * arr.length);
}
//funcion que genera una nueva carta
function cardsGenerator(num, spot) {
  cardList = [];
  for (let i = 1; i <= num; i++) {
    let generatedCard = cardNumber[indexGenerator(cardNumber)];
    let generatedColor = cardColor[indexGenerator(cardColor)];
    card = { number: generatedCard, color: generatedColor };
    cardList.push(card);
  }
  console.log(cardList);
  cardPrinter(spot);
}

function cardPrinter(spot) {
  //guardando en una variable el lugar donde irá la carta generada e impresa
  //variable para generar cartas especiales A J Q K
  let cardN = "";
  //imprimiendo n cartas
  if (spot.id === "cardSpace")
    spotInner += `<div class="row ms-3 mb-3"><h4>Original</h4>`;
  else
    spotInner += `<div class="d-flex flex-row align-items-center ms-3 mb-3"><h4 class="me-2">${sortCount}</h4>`;
  for (let i = 0; i < cardList.length; i++) {
    //switch que transforma a cartas especiales
    switch (cardList[i].number) {
      case 1:
        cardN = "A";
        break;
      case 11:
        cardN = "J";
        break;
      case 12:
        cardN = "Q";
        break;
      case 13:
        cardN = "K";
        break;
      default:
        cardN = cardList[i].number.toString();
        break;
    }
    spotInner += `
    <div class="card bg-white position-relative m-1" style="border-radius:8px; width:80px; height:120px">
    
    <h3 class="position-absolute top-0 start-0 ms-2" style="color:${cardList[i].color.color}">
    ${cardList[i].color.symbol}
    </h3>
    
    <h3 class="position-absolute top-50 start-50 translate-middle" style="color:${cardList[i].color.color}">
    ${cardN}
    </h3>
    
    <h3 class="position-absolute bottom-0 end-0 me-2" style="color:${cardList[i].color.color}">
    ${cardList[i].color.symbol}
    </h3>
    
    </div>`;
  }
  spotInner += `</div>`;
  spot.innerHTML = spotInner;
}

function selectSort() {
  let min = 0;
  spotInner = `<div class="row ms-1"><h4>Sorted</h4></div>`;
  sortCount = 0;
  while (min < cardList.length) {
    for (let i = min + 1; i < cardList.length; i++) {
      if (cardList[min].number > cardList[i].number) {
        let aux = cardList[min];
        cardList[min] = cardList[i];
        cardList[i] = aux;
        cardPrinter(sortSpot);
        sortCount += 1;
      }
    }
    min++;
  }
}
