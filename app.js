//------------------ IMPORTS ------------------ //
import {
  successList,
  failList,
  retreatList,
  alienSuccessList,
  alienFailList,
} from "./taglines.js";
import { titleText } from "./title-text.js";
import PlayerShip, { AlienShip } from "./classes.js";
import {
  statusBar,
  formLeft,
  formRight,
  specsFormLeft,
  specsFormRight,
} from "./elements.js";
import { createNamesList, typingEffect } from "./functions.js";
import { alienShipNames } from "./ships.js";
import { printActionToTerminal } from "./terminal.js";
import { quitList } from "./taglines.js";

//---------------- END IMPORTS ----------------//

//------------------ ELEMENT SELECTORS ------------------//
const titleTextElement = document.getElementById("text");
const statusBarContainer = document.querySelector(".status-bar-container");
const shipName = document.querySelector("#shipName");
const startGameBtn = document.querySelector("#start-game");
const alienBoxForm = document.querySelector(".alien-box-form");
const gameContents = document.querySelector(".game-contents");
const playerBox = document.querySelector(".player-box");
const body = document.querySelector("body");
const specsBtn = document.querySelector(".specsBtn");
//---------------- END ELEMENT SELECTORS ----------------//

//----------------- INITIAL PAGE ACTIONS -----------------//

// Load title text
typingEffect(titleText, titleTextElement);

// Activate Specifications Window
specsBtn.onclick = function () {
  gameContents.classList.add("specs-active");
  body.classList.add("specs-active");
  alienBoxForm.innerHTML = specsFormRight;
  playerBox.innerHTML = specsFormLeft;

  const backBtn = document.querySelector(".backBtn");
  backBtn.onclick = function () {
    gameContents.classList.remove("specs-active");
    body.classList.remove("specs-active");
  };
};

//------------------- END INITIAL TEXT -------------------//

//------------------- CONTROL BUTTON GLOW -------------------//

const addButtonGlow = function () {
  const btnSelector = document.querySelectorAll(".btn");
  btnSelector.forEach(function (button) {
    button.classList.add("btnGlow");
  });
};

const removeButtonGlow = function () {
  const btnSelector = document.querySelectorAll(".btn");
  btnSelector.forEach(function (button) {
    button.classList.remove("btnGlow");
  });
};
//--------------- MAIN GAME LOGIC ---------------//
// Start Game
startGameBtn.onclick = function () {
  if (shipName.value === "") {
    alert("You must enter a ship name");
  } else {
    console.log("Game has started!");

    playerBox.innerHTML = formLeft;
    alienBoxForm.innerHTML = formRight;
    statusBarContainer.classList.add("status-bar-container-active");
    statusBarContainer.innerHTML = statusBar;
    document.querySelector("#signin-header").innerHTML =
      shipName.value.toUpperCase();
    gameContents.classList.add("specs-active");
    body.classList.add("game-active");

    // Enable game play buttons
    const enableGameButtons = function () {
      document.querySelectorAll(".btn").forEach(function (button) {
        button.disabled = false;
      });
    };
    // Intro Function
    const introFunction = function () {
      printActionToTerminal(
        "Welcome to Save The Universe! Your mission is to destroy the invading alien ships and protect Earth. Good luck, captain!",
        "player",
        document.getElementById("status-bar-inner"),
        function () {
          enableGameButtons();
          addButtonGlow();
        }
      );
    };
    introFunction();

    //------------ Instantiate Player Ship ------------//
    const playerShip = new PlayerShip();

    //--------- Create Random List of Alien Ship Names -------//
    const randomShipNames = createNamesList(alienShipNames);

    //-------- Create Fleet of Alien Ships --------//
    const alienShips = [];
    for (let i = 0; i < 6; i++) {
      alienShips.push(new AlienShip(randomShipNames[i]));
    }

    //------------ Propagate Player Ship Elements ------------//
    const updatePlayer = () => {
      document.querySelector("#player-hull-value").innerHTML = String(
        playerShip.hull
      );
      document.querySelector("#player-firepower-value").innerHTML = String(
        playerShip.firepower
      );
      document.querySelector("#player-accuracy-value").innerHTML = String(
        playerShip.accuracy
      );
    };
    updatePlayer();

    //------------ Propagate Alien Ship Elements ------------//
    for (let i = 0; i < 6; i++) {
      let name = `.alien-ship-${i} h3`;
      let hull = `.alien-ship-${i} .alien-hull-value`;
      let firepower = `.alien-ship-${i} .alien-firepower-value`;
      let accuracy = `.alien-ship-${i} .alien-accuracy-value`;
      document.querySelector(name).innerHTML = String(alienShips[i].name);
      document.querySelector(hull).innerHTML =
        "Hull: " + String(alienShips[i].hull);
      document.querySelector(firepower).innerHTML =
        "Firepower: " + String(alienShips[i].firepower);
      document.querySelector(accuracy).innerHTML =
        "Accuracy: " + String(alienShips[i].accuracy);
    }

    //-------------- Select Current Alien Ship --------------//
    let shipIndex = 0;

    //------------ Style Current Alien Ship ------------//
    const styleAlienShip = () => {
      if (shipIndex < 6) {
        const previousShipName = document.querySelector(
          `.alien-ship-${shipIndex - 1} h3`
        );
        const currentShipName = document.querySelector(
          `.alien-ship-${shipIndex} h3`
        );
        if (shipIndex > 0 && shipIndex < 6) {
          previousShipName.classList.remove("alien-active");
          previousShipName.classList.add("alien-dead");
        }
        currentShipName.classList.add("alien-active");
      }
    };

    styleAlienShip();

    //------------ Update Alien Ship Hull Points ------------//
    const updateAlienHull = () => {
      const alienHullSelector = document.querySelector(
        `.alien-ship-${shipIndex} .alien-hull-value`
      );
      if (alienShips[shipIndex].hull <= 0) {
        alienHullSelector.innerHTML = "Hull: 0";
      } else {
        alienHullSelector.innerHTML =
          "Hull: " + String(alienShips[shipIndex].hull);
      }
    };

    //------------ Select Next Alien If Defeated ------------//
    const nextAlienShip = (currentShip) => {
      // Check if game has been won, if so display win message and reload app
      if (alienShips[shipIndex].hull <= 0 && shipIndex >= 5) {
        const currentShipName = document.querySelector(
          `.alien-ship-${shipIndex} h3`
        );
        currentShipName.classList.remove("alien-active");
        currentShipName.classList.add("alien-dead");
        console.log("you win");
        printActionToTerminal(
          "Congratulations! You terminated all alien ships and saved humanity. Live long and prosper....................",
          "player",
          parentDiv,
          function () {
            location.reload();
            return;
          }
        );
      } else if (currentShip.hull <= 0) {
        shipIndex++;
        styleAlienShip();
      }
    };

    //------------- Update Player Health Bar -------------//
    const innerBar = document.querySelector(".progress-bar-inner");
    const updatePlayerHealthBar = function () {
      if (playerShip.hull <= 0) {
        innerBar.style.width = "0%";
      } else {
        const healthBar = Math.floor((playerShip.hull / 20) * 100);
        console.log(healthBar);
        innerBar.style.width = healthBar + "%";
      }
    };

    //--------------- Update Alien Health Bar ---------------//

    const updateAlienHealthBar = function () {
      const alienInnerBar = document.querySelector(
        `.alien-health-bar-inner-${shipIndex}`
      );
      if (alienShips[shipIndex].hull <= 0) {
        alienInnerBar.style.height = "0%";
      } else {
        const healthBar = Math.floor((alienShips[shipIndex].hull / 6) * 100);
        console.log(healthBar);
        alienInnerBar.style.height = healthBar + "%";
      }
    };

    //---------------- CAPTAIN TYPING TEXT EFFECT ----------------//

    const printString = function (stringsList, callback = () => {}) {
      // Set innerHTML to an empty string
      document.getElementById("player-chat").innerHTML = "";
      let randomString =
        stringsList[Math.floor(Math.random() * stringsList.length)];
      let i = 0;
      let interval = setInterval(() => {
        document.getElementById("player-chat").innerHTML += randomString[i];
        i++;
        if (i === randomString.length) {
          callback();
          clearInterval(interval);
        }
      }, 50);
    };

    //---------------- END TYPING TEXT EFFECT ----------------//

    /***************************************************************
                          GAME LOGIC
    ****************************************************************/

    //---------------- Parent Div For Terminal Printing ------//
    const parentDiv = document.getElementById("status-bar-inner");

    //---------------- Alien Attack Logic --------------------//
    const alienAttack = function () {
      console.log(shipIndex);

      // Determine Alien Attack Result as Boolean
      const enemyAttackResult = playerShip.attack();
      const enemyFirepower = alienShips[shipIndex].firepower;
      const currentAlien = alienShips[shipIndex].name;
      if (enemyAttackResult) {
        const alienAttackStringSuccess = `${currentAlien} is attacking...... Attack successful... ${shipName.value} has taken ${enemyFirepower} points of damage`;
        printActionToTerminal(
          alienAttackStringSuccess,
          "alien",
          parentDiv,
          function () {
            updatePlayer();
            updatePlayerHealthBar();
            if (playerShip.hull <= 0) {
              console.log("You lost!");
              printActionToTerminal(
                "Your space ship has been destroyed and aliens have invaded Earth! RIP......",
                "dead",
                parentDiv
              );
              return;
            } else {
              addButtonGlow();
            }
          }
        );
        playerShip.hull -= alienShips[shipIndex].firepower;
      } else {
        const alienAttackStringFail = `Alien is attacking...... Attack failed....`;
        printActionToTerminal(
          alienAttackStringFail,
          "alien",
          parentDiv,
          function () {
            addButtonGlow();
          }
        );
      }
    };

    //----------------- Attack button logic -----------------//

    // Add event listener to attack button
    document.querySelector(".attackBtn").addEventListener("click", function () {
      // Remove Button Glow
      removeButtonGlow();

      // Determine Player Attack Result as Boolean
      const playerAttackResult = playerShip.attack();

      // Print Player Attack Result To Terminal
      if (playerAttackResult) {
        const playerAttackStringSuccess = `You are attacking ${alienShips[shipIndex].name}...... Attack successful...`;
        printActionToTerminal(
          playerAttackStringSuccess,
          "player",
          parentDiv,
          function () {
            // Apply Damage To Current Alien Ship
            alienShips[shipIndex].hull -= playerShip.firepower;

            // Update Alien Stats
            updateAlienHull();

            // Update Alien Health Bar
            updateAlienHealthBar();

            // Check if Alien Ship Defeated and Move to Next Ship
            // if (alienShips[shipIndex].hull <= 0 && shipIndex >= 5) {
            //   currentShipName.classList.remove("alien-active");
            //   currentShipName.classList.add("alien-dead");
            //   console.log("you win");
            //   printActionToTerminal(
            //     "Congratulations! You terminated all alien ships and saved humanity!",
            //     "player",
            //     parentDiv
            //   );
            //   document.querySelector(".quitBtn").button.disabled = false;
            //   return;

            nextAlienShip(alienShips[shipIndex]);

            // Print Tagline & Initiate Alien Attack
            printString(successList, function () {
              if (shipIndex <= 5 && alienShips[shipIndex].hull > 0) {
                alienAttack();
              }
            });
          }
        );
      } else {
        const playerAttackStringFail = `You are attacking ${alienShips[shipIndex].name}...... Attack failed...`;
        printActionToTerminal(
          playerAttackStringFail,
          "player",
          parentDiv,
          function () {
            alienAttack();
          }
        );
      }

      // Determine Alien Attack Result as Boolean
      const enemyAttackResult = playerShip.attack();

      // Get current alien ship firepower
      const enemyFirepower = alienShips[shipIndex].firepower;
    });

    //----------------- Retreat button logic -----------------//
    document
      .getElementById("retreat-button")
      .addEventListener("click", function () {
        console.log("you are retreating!");
        const retreatMsg =
          "Enterprise is retreating... Hull repaired by 1 point...";
        printActionToTerminal(retreatMsg, "player", parentDiv, function () {
          playerShip.hull++;
          updatePlayer();
          // Print Tagline & Initiate Alien Attack
          printString(retreatList, function () {
            alienAttack();
          });
        });
      });

    // Add event listener to Quit Button
    document.querySelector(".quitBtn").addEventListener("click", function () {
      printActionToTerminal(
        "Deactivating Warp Drives... Quitting game............",
        "player",
        parentDiv,
        function () {
          gameContents.classList.remove("specs-active");
          body.classList.remove("game-active");
          shipName.value = "";
          statusBarContainer.innerHTML = "";
          console.log("You have quit!");
        }
      );
    });
  }
};
