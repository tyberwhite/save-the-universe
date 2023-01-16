/**********************************
            TERMINAL
**********************************/

//-------------------- Terminal Function -----------------------//
export function printActionToTerminal(
  string,
  playerName,
  parentDiv,
  callback = () => {}
) {
  // Create a new div for each action printed to terminal window
  const childDiv = document.createElement("div");
  const span = document.createElement("span");
  span.innerHTML = "> ";
  span.classList.add = "player-terminal-prompt";

  // Add id for styling based on player type
  if (playerName === "player") {
    childDiv.classList.add("player-terminal-action");
    span.id = "player-terminal-prompt";
  } else {
    childDiv.classList.add("alien-terminal-action");
    span.id = "alien-terminal-prompt";
  }
  childDiv.classList.add("alien-terminal-action");

  // Append new div to terminal window
  parentDiv.appendChild(childDiv);
  childDiv.appendChild(span);

  let i = 0;
  let interval = setInterval(() => {
    childDiv.innerHTML += string[i];
    i++;
    if (i >= string.length) {
      clearInterval(interval);
      callback();
      if (playerName === "alien") {
        document.querySelectorAll(".btn").forEach(function (button) {
          button.disabled = false;
        });
      }
    }
  }, 70);
}
//-------------------- Terminal Function -----------------------//
