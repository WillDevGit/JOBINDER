import {
  userLogged,
  getUserData,
  getUsersData,
  getUsersMatchedId,
  insertUserInUsersMatchedId,
} from "./user.js";
import { updateChat } from "../frontend/scripts/chat.js";

// Get the user logged
const userLoggedId = userLogged();

// User can be not logged
let userData = null;

// Get the user data if the user is logged
if (userLoggedId) {
  userData = getUserData(userLoggedId);
}

// Get the users data
const usersData = getUsersData();

let cardContent = [];

// Create the cards content with the users data
usersData.forEach((user) => {
  if (!user.serviceProfile) return;

  const userAlreadyMatched = getUsersMatchedId(userLoggedId).includes(
    user.cellphone
  );

  if (userAlreadyMatched) return;
  if (!userData || user.cellphone !== userData.cellphone) {
    cardContent.push({
      img: user.serviceProfile.serviceImg,
      nome: `<h3>${user.fullName}</h3>`,
      desc: `
      <div>
        <span>Especialidade: </span>
        <span>${user.serviceProfile.specialties}</span> 
      </div>

      <div>
          <span>Disponibilidade: </span>
          <span>${user.serviceProfile.avaliability}</span>
      </div>

      <div>
        <span>Descrição: </span>
        <span>${user.serviceProfile.services}</span>
      </div> 
       `,
      id: user.cellphone,
    });
  }
});

let index = 0;

class Carousel {
  constructor(element) {
    this.board = element;

    if (cardContent.length === 0) {
      return;
    }

    // Add first card
    this.push();
    // Add second card
    this.push();
    // handle gestures
    this.handle();
  }

  handle() {
    // List all cards
    this.cards = this.board.querySelectorAll(".card");

    // Get top card
    this.topCard = this.cards[this.cards.length - 1];

    // Get next card
    this.nextCard = this.cards[this.cards.length - 2];

    // If there's a next card, display it
    if (this.cards.length > 0) {
      // Define top card initial position
      this.topCard.style.transform =
        "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)";

      // Destroy previous Hammer instance, if exists
      if (this.hammer) this.hammer.destroy();

      // Listen for tap and pan gestures on top card
      this.hammer = new Hammer(this.topCard);
      this.hammer.add(new Hammer.Tap());
      this.hammer.add(
        new Hammer.Pan({
          position: Hammer.position_ALL,
          threshold: 0,
        })
      );

      // Pass events data to the handler methods
      this.hammer.on("tap", (e) => {
        this.onTap(e);
      });
      this.hammer.on("pan", (e) => {
        this.onPan(e);

        // If dragging to right
        if (e.deltaX > 0) {
          this.topCard.style.border = "3px solid green";
        }
        // If dragging to left
        else if (e.deltaX < 0) {
          this.topCard.style.border = "3px solid red";
        }
      });

      // If card went to its original position
      this.hammer.on("panend", (e) => {
        this.topCard.style.border = "none";
      });
    }
  }

  onTap(e) {
    // Get finger position on top card
    let propX =
      (e.center.x - e.target.getBoundingClientRect().left) /
      e.target.clientWidth;

    // obter graus de rotação em torno do eixo Y (+/- 15) com base na posição do dedo
    let rotateY = 15 * (propX < 0.05 ? -1 : 1);

    // Enable transform transition
    this.topCard.style.transition = "transform 100ms ease-out";

    // Rotate
    this.topCard.style.transform =
      "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(" +
      rotateY +
      "deg) scale(1)";

    // Wait transition end
    setTimeout(() => {
      // Reset cards position and size
      this.topCard.style.transform =
        "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)";
    }, 100);
  }

  onPan(e) {
    if (!this.isPanning) {
      this.isPanning = true;

      // Remove transition properties
      this.topCard.style.transition = null;
      if (this.nextCard) this.nextCard.style.transition = null;

      // Get initial coordinates
      let style = window.getComputedStyle(this.topCard);
      let mx = style.transform.match(/^matrix\((.+)\)$/);
      this.startPosX = mx ? parseFloat(mx[1].split(", ")[4]) : 0;
      this.startPosY = mx ? parseFloat(mx[1].split(", ")[5]) : 0;

      // Get the limits of the card
      let bounds = this.topCard.getBoundingClientRect();

      // Get the direction of the pan
      this.isDraggingFrom =
        e.center.y - bounds.top > this.topCard.clientHeight / 2 ? -1 : 1;
    }

    // Get position X and Y
    let posX = e.deltaX + this.startPosX;
    let posY = e.deltaY + this.startPosY;

    // Get the proportion of the movement, between 0 and 1
    let propX = e.deltaX / this.board.clientWidth;
    let propY = e.deltaY / this.board.clientHeight;

    // Get the direction of the movement
    let dirX = e.deltaX < 0 ? -1 : 1;

    // Get the angle of rotation, between -45 and 0
    let deg = this.isDraggingFrom * dirX * Math.abs(propX) * 45;

    // Get the scale of the card, between 95 and 100
    let scale = (95 + 5 * Math.abs(propX)) / 100;

    // Move and rotate the top card
    this.topCard.style.transform =
      "translateX(" +
      posX +
      "px) translateY(" +
      posY +
      "px) rotate(" +
      deg +
      "deg) rotateY(0deg) scale(1)";

    // Increase the size of the next card
    if (this.nextCard)
      this.nextCard.style.transform =
        "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(" +
        scale +
        ")";

    if (e.isFinal) {
      this.isPanning = false;

      let successful = false;

      // Backwards movement and card was not moved enough
      this.topCard.style.transition = "transform 200ms ease-out";
      if (this.nextCard)
        this.nextCard.style.transition = "transform 100ms linear";

      // Verify if the card was moved to the right or to the left
      if (propX > 0.25 && e.direction == Hammer.DIRECTION_RIGHT) {
        insertUserInUsersMatchedId(userLoggedId, this.topCard.id);
        updateChat();

        successful = true;
        // get right border position
        posX = this.board.clientWidth;
      } else if (propX < -0.25 && e.direction == Hammer.DIRECTION_LEFT) {
        this.topCard.style.border = "5px blue solid";
        successful = true;
        // get left border position
        posX = -(this.board.clientWidth + this.topCard.clientWidth);
      } else if (propY < -0.25 && e.direction == Hammer.DIRECTION_UP) {
        successful = true;
        // get top border position
        posY = -(this.board.clientHeight + this.topCard.clientHeight);
      }

      if (successful) {
        // Throw card in the chosen direction
        this.topCard.style.transform =
          "translateX(" +
          posX +
          "px) translateY(" +
          posY +
          "px) rotate(" +
          deg +
          "deg)";

        // Wait transition end
        setTimeout(() => {
          // Remove swiped card
          this.board.removeChild(this.topCard);
          // Add new card
          this.push();
          // Handle gestures on new top card
          this.handle();
        }, 200);
      } else {
        // Reset cards position and size
        this.topCard.style.transform =
          "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(1)";
        if (this.nextCard)
          this.nextCard.style.transform =
            "translateX(-50%) translateY(-50%) rotate(0deg) rotateY(0deg) scale(0.95)";
      }
    }
  }

  push() {
    // Create a new card and add it to the board
    let card = document.createElement("div");
    card.id = cardContent[index].id;
    card.imgPerfil = cardContent[index].img;

    card.classList.add("card");

    // Create a new card and add it to the board
    let imagem = document.createElement("div");
    imagem.style.backgroundImage = `url(${cardContent[index].img})`;
    imagem.classList.add("imagem");

    //Add the name to the card
    let nameCard = document.createElement("div");
    nameCard.innerHTML = cardContent[index].nome;
    nameCard.classList.add("name-card");

    // Add the description to the card
    let description = document.createElement("div");
    description.innerHTML = cardContent[index].desc;
    description.classList.add("description");

    // TODO: Adicionar botões de ação
    // Buttons
    let botoes = document.createElement("div");
    botoes.innerHTML =
      "<img src='../images/cancel.png'> <img src='../images/voltar.png'> <img src='../images/confirme.png'>";
    botoes.classList.add("botoes");

    // Add event listeners to the buttons
    botoes.querySelectorAll("img").forEach((botao) => {
      botao.addEventListener("mouseover", () => {
        botao.style.transform = "scale(1.05)";
        botao.style.cursor = "pointer";
      });
      botao.addEventListener("mouseout", () => {
        botao.style.transform = "scale(1)";
      });
    });

    // Add the id to the buttons
    botoes.querySelectorAll("img")[0].id = "cancel";
    botoes.querySelectorAll("img")[1].id = "voltar";
    botoes.querySelectorAll("img")[2].id = "confirme";

    // Add the event listener to the buttons
    card.appendChild(imagem);
    card.appendChild(nameCard);
    card.appendChild(description);
    card.appendChild(botoes);

    /** 
        codigo original 
        card.style.backgroundImage =
            "url('https://picsum.photos/320/320/?random=" + Math.round(Math.random() * 1000000) + "')"
        */

    this.board.insertBefore(card, this.board.firstChild);
    index = index == cardContent.length - 1 ? 0 : (index += 1);
  }
}

let board = document.querySelector("#board");

let carousel = new Carousel(board);
