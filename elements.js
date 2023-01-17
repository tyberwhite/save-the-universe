/*****************************
          ELEMENTS
*******************************/

//------------------- STATUS BAR ------------------------//
export const statusBar = `
  <div class="status-bar">
    <div class="status-bar-inner" id="status-bar-inner">
    <div id="initializing"></div></div>
  </div>`;

//----------------- STATUS BAR END ----------------------//

// Player Ship & Stats
export const formLeft = `

<h1 id="signin-header">USS Assembly</h1>
<div class="progress-bar">
      <div class="progress-bar-inner"></div>
    </div>
    
<div class="player-stats" id="player-hull">
  Hull: <span id="player-hull-value">8</span>
 </div>
 <div class="player-stats"  id="player-firepower">
  Firepower: <span id="player-firepower-value">10</span>
 </div>
 <div class="player-stats"  id="player-accuracy">
  Accuracy: <span id="player-accuracy-value">9</span>
 </div>
 <button class="btn attackBtn player-btn btnGlow" id="attack-btn">Attack</button>
 <button class="btn retreatBtn player-btn btnGlow" id="retreat-button">Retreat</button>
          <button class="btn quitBtn player-btn btnGlow">Quit</button>
          
          <div id="status"><span id="status-text">CAPTAIN:</span> <span id="player-chat"></span></div>
`;

// Alien Ships & Stats
export const formRight = `<div class="alien-ships-container">
<div class="alien-box">
  <div class="alien-health-bar">
    <div class="alien-health-bar-inner-0"></div>
  </div>
  <div class="alien-ship-content alien-ship-0">
    <h3>Invader</h3>
    <p class="alien-hull-value">Hull: 6</p>
    <p class="alien-firepower-value">Firepower: 4</p>
    <p class="alien-accuracy-value">Accuracy: 0.55</p>
  </div>
</div>
<div class="alien-box">
  <div class="alien-health-bar">
    <div class="alien-health-bar-inner-1"></div>
  </div>
  <div class="alien-ship-content alien-ship-1">
    <h3>Invader</h3>
    <p class="alien-hull-value">Hull: 6</p>
    <p class="alien-firepower-value">Firepower: 4</p>
    <p class="alien-accuracy-value">Accuracy: 0.55</p>
  </div>
</div>
<div class="alien-box">
  <div class="alien-health-bar">
    <div class="alien-health-bar-inner-2"></div>
  </div>
  <div class="alien-ship-content alien-ship-2">
    <h3>Invader</h3>
    <p class="alien-hull-value">Hull: 6</p>
    <p class="alien-firepower-value">Firepower: 4</p>
    <p class="alien-accuracy-value">Accuracy: 0.55</p>
  </div>
</div>
<div class="alien-box">
  <div class="alien-health-bar">
    <div class="alien-health-bar-inner-3"></div>
  </div>
  <div class="alien-ship-content alien-ship-3">
    <h3>Invader</h3>
    <p class="alien-hull-value">Hull: 6</p>
    <p class="alien-firepower-value">Firepower: 4</p>
    <p class="alien-accuracy-value">Accuracy: 0.55</p>
  </div>
</div>
<div class="alien-box">
  <div class="alien-health-bar">
    <div class="alien-health-bar-inner-4"></div>
  </div>
  <div class="alien-ship-content alien-ship-4">
    <h3>Invader</h3>
    <p class="alien-hull-value">Hull: 6</p>
    <p class="alien-firepower-value">Firepower: 4</p>
    <p class="alien-accuracy-value">Accuracy: 0.55</p>
  </div>
</div>
<div class="alien-box">
  <div class="alien-health-bar">
    <div class="alien-health-bar-inner-5"></div>
  </div>
  <div class="alien-ship-content alien-ship-5">
    <h3>Invader</h3>
    <p class="alien-hull-value">Hull: 6</p>
    <p class="alien-firepower-value">Firepower: 4</p>
    <p class="alien-accuracy-value">Accuracy: 0.55</p>
  </div>
</div>
</div>`;

// Specifications Form
export const specsFormLeft = `<div id="specs-text-container"><h1 id="specs-header">SPECIFICATIONS</h1>
<p class="specs-content">There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. Your strength is that you have the initiative and get to attack first. However, you do not have targeting lasers and can only attack the aliens in order. After you have destroyed a ship, you have the option to make a hasty retreat.</p> <span class="backBtn">Back</span></div>`;

// Specifications Image
export const specsFormRight = `<img src="img/space-ship-main.png" alt="Space Ship" id="specs-img">`;
