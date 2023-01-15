import { successList, failList, retreatList } from "/taglines.js";

/*****************************
          CLASSES
*******************************/

// -------- Player Ship -------- //
export default class PlayerShip {
  constructor() {
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
    this.taglinesSuccess = successList;
    this.taglinesFail = failList;
    this.taglinesRetreat = retreatList;
  }

  attack() {
    // attack successful
    if (Math.random() < this.accuracy) {
      console.log("Attack Successful!");
      return true;
    } else {
      // attack failed
      console.log("Attack Failed!");
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
