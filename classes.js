import { successList, failList, retreatList } from "./taglines.js";

/*****************************
          CLASSES
*******************************/

// -------- Player Ship -------- //
export default class PlayerShip {
  constructor() {
    this.hull = 50;
    this.firepower = 50;
    this.accuracy = 1;
    this.taglinesSuccess = successList;
    this.taglinesFail = failList;
    this.taglinesRetreat = retreatList;
  }

  attack() {
    // attack successful
    if (Math.random() < this.accuracy) {
      return true;
    } else {
      // attack failed
      return false;
    }
  }

  talk(taglineList) {
    return taglineList[Math.floor(Math.random() * 10)];
  }
}
// -------- End Player Ship -------- //

// -------- Alien Ship -------- //
export class AlienShip {
  constructor(name) {
    this.name = name;
    this.hull = Math.floor(Math.random() * 4 + 3);
    this.firepower = Math.floor(Math.random() * 3 + 2);
    this.accuracy = (Math.random() * 0.2 + 0.6).toFixed(2);
  }

  attack() {
    // attack successful
    if (Math.random() < this.accuracy) {
      console.log("You've been hit!");
      return true;
    } else {
      // attack failed
      console.log("You dodged a hit!");
      return false;
    }
  }
}
// -------- End Alien Ship -------- //
