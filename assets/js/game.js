(() => {
  "use strict";
  // VARIABLES GLOBALES
  let deck = []; // Creamos un array vacio porque vamos a enviarle datos desde una funcion
  let types = ["C", "D", "H", "S"]; // Aqui lo que hacemos es guardar lo tipos de carta
  const specials = ["A", "j", "Q", "K"]; // Aqui creamos un areglo para cartas especiales

  // REFERENCIAS HTML5
  const btnGet     = document.querySelector("#btn-get");
  const btnStop    = document.querySelector("#btn-stop");
  const btnNewGame = document.querySelector("#btn-new");

  let playerPoints = 0,
    computerPoints = 0;

  const htmlPoints = document.querySelectorAll("small");

  const playerCards = document.querySelector("#player-cards");
  const computerCards = document.querySelector("#computer-cards");

  // FUNCION PARA BARAJAR CARTAS
  const createDeck = () => {
    for (let i = 2; i < 10; i++) {
      // Creamos un bucle for of que recorra los "types"
      for (let type of types) {
        // Introducimos los tipos en el arreglo de las baraja o "deck" mediante metodo push
        deck.push(i + type);
      }
    }

    // Recorremos el tipo de tipos para poder obtener cada uno
    for (let type of types) {
      // Recorremos la carta especiales de las especiales para obtener cada una
      for (let special of specials) {
        // Introducimos una carta especial por cada tipo
        deck.push(special + type);
      }
    }
    // Aqui utilizamos una libreria de terceros llamada: Underscore
    deck = _.shuffle(deck);
  };

  createDeck();

  // FUNCION PARA PEDIR CARTAS
  const getCard = () => {
    if (deck.length === 0) {
      throw "No hay carta en le deck";
    }

    // El metodo pop nos regresa el ultimo elemento de un array y luego lo borra del arreglo
    const card = deck.pop();

    return card;
  };

  // getCard()
  const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);

    return isNaN(
      value
    ) /*pasamos por parametros los valores con operadores ternarios */
      ? value === "A"
        ? 11
        : 10
      : value * 1;
  };

  const value = cardValue(getCard());
  console.log({ value });

  //Eventos con callback y sin ellos.

  // Evento Click: Pedir Carta.
  btnGet.addEventListener("click", () => {
    const card = getCard();

    playerPoints = playerPoints + cardValue(card);

    htmlPoints[0].innerText = playerPoints;

    const cardsImg = document.createElement("img");
    cardsImg.src = `assets/cards/${card.toUpperCase()}.png`;
    cardsImg.classList.add("cards");

    playerCards.append(cardsImg);

    if (playerPoints > 21) {
      console.warn("You Lose");
      btnGet.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerPoints);
    } else if (playerPoints === 21) {
      console.warn("You Win");
      btnGet.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerPoints);
    }
  });

  btnStop.addEventListener("click", () => {
    btnGet.disabled = true;
    btnStop.disabled = true;

    computerTurn(playerPoints);
  });

  btnNewGame.addEventListener("click", () => {
    deck = [];
    deck = createDeck();

    playerPoints = 0;
    computerPoints = 0;
    htmlPoints[0].innerText = 0;
    htmlPoints[1].innerText = 0;

    computerCards.innerHTML = "";
    playerCards.innerHTML = "";

    btnGet.disabled = false;
    btnStop.disabled = false;
  });

  // TURNO DE LA COMPUTADORA
  const computerTurn = (minimalPoints) => {
    do {
      const card = getCard();

      computerPoints = computerPoints + cardValue(card);

      htmlPoints[1].innerText = computerPoints;

      const cardsImg = document.createElement("img");
      cardsImg.src = `assets/cards/${card.toUpperCase()}.png`;
      cardsImg.classList.add("cards");
      computerCards.append(cardsImg);

      if (minimalPoints > 21) {
        break;
      }
    } while (computerPoints < minimalPoints && minimalPoints <= 21);

    setTimeout(() => {
      if (computerPoints === minimalPoints) {
        alert("Nadie gana!");
      } else if (minimalPoints > 21) {
        alert("Computadora win!");
      } else if (computerPoints > 21) {
        alert("Jugador win!!");
      } else {
        alert("Computadora win!");
      }
    }, 10);
  };
})();
