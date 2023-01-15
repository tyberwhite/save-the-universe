//------------------ IMPORTS ------------------ //
import {
  successList,
  failList,
  retreatList,
  alienSuccessList,
  alienFailList,
} from "/taglines.js";
import { titleText } from "/title-text.js";
import PlayerShip, { AlienShip } from "/classes.js";
import {
  statusBar,
  formLeft,
  formRight,
  specsFormLeft,
  specsFormRight,
} from "/elements.js";
import { createNamesList, typingEffect } from "/functions.js";
import { alienShipNames } from "/ships.js";

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

    //---------------- BUTTON CONTROLS ----------------//

    const retreatButton = document.querySelector(".retreatBtn");

    // Add event listener to retreat button

    function enableRetreatButton() {
      retreatButton.addEventListener("click", function () {
        console.log(playerShip.talk(retreatList));
        playerRetreatTyping();
        playerShip.hull += 1;
        updatePlayer();
        console.log("waiting for alien...");
        setTimeout(alienAttack, 5000);
      });
    }

    // Remove event listener from retreat button
    const removeRetreatButton = function () {
      retreatButton.addEventListener("click", function () {
        console.log(playerShip.talk(retreatList));
        playerRetreatTyping();
        playerShip.hull += 1;
        updatePlayer();
        console.log("waiting for alien...");
        setTimeout(alienAttack, 5000);
      });
    };

    //---------------- END BUTTON CONTROLS ----------------//

    // Enable Player Buttons
    enableRetreatButton();

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
      const previousShipName = document.querySelector(
        `.alien-ship-${shipIndex - 1} h3`
      );
      const currentShipName = document.querySelector(
        `.alien-ship-${shipIndex} h3`
      );
      if (shipIndex > 0) {
        previousShipName.classList.remove("alien-active");
        previousShipName.classList.add("alien-dead");
      }
      currentShipName.classList.add("alien-active");
    };
    styleAlienShip();

    //------------ Update Alien Ship Hull Points ------------//
    const updateAlienHull = () => {
      document.querySelector(
        `.alien-ship-${shipIndex} .alien-hull-value`
      ).innerHTML = "Hull: " + String(alienShips[shipIndex].hull);
    };

    //------------ Select Next Alien If Defeated ------------//
    const nextAlienShip = (currentShip) => {
      if (currentShip.hull <= 0) {
        shipIndex++;
        styleAlienShip();
      }
    };

    //--------------- Alien Ship Attack Logic ---------------//
    const alienAttack = () => {
      console.log("alien is attacking!!!!");
      if (alienShips[shipIndex].attack()) {
        playerShip.hull -= alienShips[shipIndex].firepower;
        updatePlayer();
        gameLost();
        removeRetreatButton();
        createStatusBarElement();
        statusBarUpdateAlien();

        // Modify Player's Health Bar
        const innerBar = document.querySelector(".progress-bar-inner");

        const changeHealth = () => {
          console.log("hull: " + playerShip.hull);
          if (playerShip.hull <= 0) {
            innerBar.style.width = "0%";
          } else {
            const healthBar = Math.floor((playerShip.hull / 20) * 100);
            console.log(healthBar);
            innerBar.style.width = healthBar + "%";
          }
        };
        changeHealth();

        // Set a delay after alien ship attacks
        setTimeout(() => {
          clearText();
        }, 2000);
      }
    };

    //------------ Check If Game Won ------------//
    const gameWon = () => {
      if (shipIndex > 5) {
        setTimeout(() => {
          location.reload();
        }, 5000);
      }
    };

    //------------ Check If Game Lost ------------//
    function gameLost() {
      if (playerShip.hull <= 0) {
        console.log("You lost!!!");
        setTimeout(() => {
          location.reload();
        }, 5000);
      }
    }

    //--------------- Freeze Player Buttons --------------//
    const freezeButtons = () => {
      const buttons = document.querySelectorAll(".btn");
      buttons.forEach(function (button) {
        button.disabled = true;
      });
      setTimeout(function () {
        buttons.forEach(function (button) {
          button.disabled = false;
        });
      }, 5000);
    };
    //---------------- TYPING TEXT EFFECT ----------------//

    // Captain Taglines Variables
    let textIndex = 0;
    let playerTextSuccess = successList[Math.floor(Math.random() * 10)];
    let playerTextFail = failList[Math.floor(Math.random() * 10)];
    let playerTextRetreat = retreatList[Math.floor(Math.random() * 10)];

    // Status Bar Variables
    let statusBarTypingIndex = 0;
    let statusBarAttackIndex = 0;
    let statusBarFailIndex = 0;

    const attackSuccess = "Attack successful! ";
    const attackFailed = "Attack failed! ";
    const retreatResult = "Hull repaired by one point... ";

    const playerSuccessTyping = function () {
      if (textIndex < playerTextSuccess.length) {
        document.getElementById("player-chat").innerHTML +=
          playerTextSuccess.charAt(textIndex);
        textIndex++;
        // Duration in milliseconds
        setTimeout(playerSuccessTyping, 50);
      }
    };

    const playerFailTyping = function () {
      if (textIndex < playerTextFail.length) {
        document.getElementById("player-chat").innerHTML +=
          playerTextFail.charAt(textIndex);
        textIndex++;
        // Duration in milliseconds
        setTimeout(playerFailTyping, 50);
      }
    };

    const playerRetreatTyping = function () {
      if (textIndex < playerTextRetreat.length) {
        document.getElementById("player-chat").innerHTML +=
          playerTextRetreat.charAt(textIndex);
        textIndex++;
        // Duration in milliseconds
        setTimeout(playerRetreatTyping, 50);
      }
    };

    // Create new element for status bar
    const createStatusBarElement = function () {
      const statusBarInner = document.getElementById("status-bar-inner");
      const newDiv = document.createElement("div");
      const statusIdentity = document.createElement("span");
      const newSpan1 = document.createElement("span");
      const newSpan2 = document.createElement("span");

      newSpan1.setAttribute("id", `status-bar-text-${statusBarIndex}`);
      newSpan2.setAttribute("id", `status-bar-result-${statusBarIndex}`);
      newDiv.setAttribute("id", `status-bar-prompt-${statusBarIndex}`);

      statusIdentity.setAttribute("id", "status-identity");
      statusIdentity.innerHTML = "Player: ";

      statusBarInner.appendChild(newDiv);
      newDiv.appendChild(statusIdentity);
      newDiv.appendChild(newSpan1);
      newDiv.appendChild(newSpan2);
    };

    // Create new element for status bar
    let statusBarIndex = 1;

    const createStatusBarElementAlien = function () {
      const statusBarInner = document.getElementById("status-bar-inner");
      const newDiv = document.createElement("div");
      const statusIdentity = document.createElement("span");
      const newSpan1 = document.createElement("span");
      const newSpan2 = document.createElement("span");

      newSpan1.setAttribute("id", `status-bar-text-${statusBarIndex}`);
      newSpan2.setAttribute("id", `status-bar-result-${statusBarIndex}`);
      newDiv.setAttribute("id", `status-bar-prompt-${statusBarIndex}`);

      statusIdentity.setAttribute("id", "alien-identity");
      statusIdentity.innerHTML = `${alienShips[shipIndex].name}: `;

      statusBarInner.appendChild(newDiv);
      newDiv.appendChild(statusIdentity);
      newDiv.appendChild(newSpan1);
      newDiv.appendChild(newSpan2);
    };

    const statusBarUpdateSuccess = function () {
      const statusReport = `Attacking ${alienShips[shipIndex].name}......  `;
      if (statusBarTypingIndex < statusReport.length) {
        document.getElementById(
          `status-bar-text-${statusBarIndex}`
        ).innerHTML += statusReport.charAt(statusBarTypingIndex);
        statusBarTypingIndex++;
        console.log("statusbar: ", statusBarIndex);

        // Duration in milliseconds
        setTimeout(statusBarUpdateSuccess, 60);
      }
      setTimeout(statusBarAttackResult, 2000);
    };

    const statusBarUpdateFail = function () {
      const statusReport = `Attacking ${alienShips[shipIndex].name}......  `;
      if (statusBarTypingIndex < statusReport.length) {
        document.getElementById(
          `status-bar-text-${statusBarIndex}`
        ).innerHTML += statusReport.charAt(statusBarTypingIndex);
        statusBarTypingIndex++;
        // Duration in milliseconds
        setTimeout(statusBarUpdateFail, 60);
      }
      setTimeout(statusBarFailResult, 2000);
    };

    let statusBarRetreatIndex = 0;
    let statusBarRetreatIndex2 = 0;

    const statusBarRetreat = function () {
      const statusReport = `Retreating......  `;
      if (statusBarRetreatIndex < statusReport.length) {
        document.getElementById(
          `status-bar-text-${statusBarIndex}`
        ).innerHTML += statusReport.charAt(statusBarRetreatIndex);
        statusBarRetreatIndex++;

        // Duration in milliseconds
        setTimeout(statusBarRetreat, 60);
      }
      setTimeout(statusBarRetreatResult, 2000);
    };

    const statusBarAttackResult = function () {
      if (statusBarAttackIndex < attackSuccess.length) {
        document.getElementById(
          `status-bar-result-${statusBarIndex}`
        ).innerHTML += attackSuccess.charAt(statusBarAttackIndex);
        statusBarAttackIndex++;
        // Duration in milliseconds
        setTimeout(statusBarAttackResult, 50);
      }
    };

    const statusBarFailResult = function () {
      if (statusBarFailIndex < attackFailed.length) {
        document.getElementById(
          `status-bar-result-${statusBarIndex}`
        ).innerHTML += attackFailed.charAt(statusBarFailIndex);
        statusBarFailIndex++;
        // Duration in milliseconds
        setTimeout(statusBarFailResult, 50);
      }
    };

    const statusBarRetreatResult = function () {
      if (statusBarRetreatIndex2 < retreatResult.length) {
        document.getElementById(
          `status-bar-result-${statusBarIndex}`
        ).innerHTML += retreatResult.charAt(statusBarRetreatIndex2);
        statusBarRetreatIndex2++;
        // Duration in milliseconds
        setTimeout(statusBarRetreatResult, 50);
      }
    };

    //--------------- Alien Attack - Console Message ------------------//
    let statusBarAlienIndex = 0;

    const statusBarUpdateAlien = function () {
      const statusReport = `is attacking......  `;
      if (statusBarAlienIndex < statusReport.length) {
        document.getElementById(
          `status-bar-text-${statusBarIndex}`
        ).innerHTML += statusReport.charAt(statusBarAlienIndex);
        statusBarAlienIndex++;

        // Duration in milliseconds
        setTimeout(statusBarUpdateAlien, 60);
      }
      setTimeout(statusBarAlienResult, 2000);
    };

    const alienSuccess = "Direct hit!";
    const alienMissed = "Attack missed!";

    let statusBarAlienResultIndex = 0;

    const statusBarAlienResult = function () {
      if (statusBarAlienResultIndex < alienSuccess.length) {
        document.getElementById(
          `status-bar-result-${statusBarIndex}`
        ).innerHTML += alienSuccess.charAt(statusBarAlienResultIndex);
        statusBarAlienResultIndex++;
        setTimeout(statusBarAlienResult, 50);
      }
      console.log("index dude: ", statusBarIndex);
    };

    //---------------- END TYPING TEXT EFFECT ----------------//

    //---------------- CLEAR TYPING EFFECT ---------------------//
    const clearText = function () {
      document.getElementById("player-chat").innerHTML = "";
      textIndex = 0;
      playerTextSuccess = successList[Math.floor(Math.random() * 10)];
      playerTextFail = failList[Math.floor(Math.random() * 10)];
      playerTextRetreat = retreatList[Math.floor(Math.random() * 10)];
    };
    //---------------- END CLEAR TYPING EFFECT ---------------------//

    //--------------- GAME LOGIC ---------------//

    // Send initializing message
    // const initializing = document.getElementById("initializing");
    // setTimeout(function () {
    //   typingEffect(
    //     "Initializing launch protocols... All systems at optimal levels. Charging phaser arrays... Targeting alien vessels... Engaging warp drive... ",
    //     initializing
    //   );
    // }, 800);

    // Link Retreat Button and Console
    const newRetreatBtn = document.getElementById("retreat-button");
    newRetreatBtn.addEventListener("click", function () {
      createStatusBarElement();
      statusBarRetreat();
    });

    // Attack button logic
    document.querySelector(".attackBtn").addEventListener("click", function () {
      console.log("You are attacking the enemy!");
      console.log("status index: ", statusBarIndex);

      createStatusBarElement();
      const attackResult = playerShip.attack();

      if (attackResult) {
        statusBarUpdateSuccess();
      } else {
        statusBarUpdateFail();
      }

      setTimeout(() => {
        if (attackResult) {
          alienShips[shipIndex].hull -= playerShip.firepower;

          playerSuccessTyping();

          updateAlienHull();
          nextAlienShip(alienShips[shipIndex]);
          gameWon();
        } else {
          playerFailTyping();
        }
        freezeButtons();
        console.log("waiting for alien...");

        setTimeout(createStatusBarElementAlien, 5000);
        setTimeout(statusBarUpdateAlien, 5100);
        setTimeout(function () {
          statusBarIndex++;
        }, 9000);
      }, 3000);
      setTimeout(function () {
        statusBarIndex++;
        statusBarTypingIndex = 0;
        statusBarAttackIndex = 0;
        statusBarFailIndex = 0;
        statusBarRetreatIndex = 0;
        statusBarRetreatIndex2 = 0;
        statusBarAlienIndex = 0;
      }, 4000);
    });

    // Retreat Button Logic
    // const retreatButtonLogic = document.getElementById("retreatBtn");
    // retreatButtonLogic.addEventListener("click", statusBarRetreat);

    // Quit Button
    document.querySelector(".quitBtn").addEventListener("click", function () {
      gameContents.classList.remove("specs-active");
      body.classList.remove("game-active");
      shipName.value = "";
      statusBarContainer.innerHTML = "";
      console.log("You have quit!");
    });
  }
};
