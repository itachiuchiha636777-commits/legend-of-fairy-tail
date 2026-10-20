// 1. DOM ELEMENTS & GLOBALS
// ==========================================
const game = document.getElementById("game");

// =========================================
document.documentElement.style.setProperty(
  "--app-height",
  window.innerHeight + "px"
);
// 1. DOM ELEMENTS & GLOBALS
// ==========================================
// ==========================================
// 🔥 NAYA JADOO: SCREEN SHAKE STYLE
// ==========================================
// 🎴 SPECIAL MOVES CARD MAPPING DICTIONARY
// ==========================================
const MOVE_CARD_MAP = {
  // 😈 SUKUNA
  enemy3_hellAttack: "assets/sukunamove1.png", // Malevolent Shrine
  enemy3_kiBlast: "assets/sukunamove2.png",

  // 🟢 DEKU
  player_kiBlast: "assets/dekumove1.png",
  player_mediumAttack: "assets/dekumove2.png",
  player_hellAttack: "assets/dekumove3.png",

  // 🟡 GOKU BLACK
  enemy_kiBlast: "assets/gokublackmove1.png",
  enemy_mediumAttack: "assets/gokublackmove2.png",
  enemy_kamehameha: "assets/gokublackmove3.png",
  enemy_bigKamehameha: "assets/gokublackmove4.png",
  enemy_extraAttack: "assets/gokublackmove5.png",
  enemy_hellAttack: "assets/gokublackmove6.png",

  // 🔵 GOKU SSB
  teammate_kiBlast: "assets/gokussbmove1.png",
  teammate_kamehameha: "assets/gokussbmove2.png",
  teammate_hellAttack: "assets/gokussbmove3.png",
  teammate_mediumAttack: "assets/gokussbmove4.png",
  // 🔴 JIREN
  teammate2_kiBlast: "assets/jirenmove1.png",
  teammate2_mediumAttack: "assets/jirenmove2.png",
  teammate2_hellAttack: "assets/jirenmove3.png",

  // 🦅 ITACHI
  teammate3_kiBlast: "assets/itachimove1.png",
  teammate3_fireBallAttack: "assets/itachimove2.png",
  teammate3_fireStyleAttack: "assets/itachimove3.png",
  teammate3_hellAttack: "assets/itachimove4.png",
  teammate3_mediumAttack: "assets/itachimove5.png",
  // 🟣 FRIEZA
  enemy2_kiBlast: "assets/friezamove1.png",
  enemy2_kamehameha: "assets/friezamove2.png",
  enemy2_hellAttack: "assets/friezamove3.png",
  enemy2_mediumAttack: "assets/friezamove4.png",
  // ⚡ SASUKE
  sasuke_kiBlast: "assets/sasukemove1.png",
  sasuke_mediumAttack: "assets/sasukemove2.jpg",
  sasuke_hellAttack: "assets/sasukemove3.png",
};
// ==========================================
const shakeStyle = document.createElement("style");
shakeStyle.innerHTML = `
@keyframes shakeHit {
    0% { transform: translate(8px, 8px); }
            25% { transform: translate(-8px, -6px); }
                        50% { transform: translate(6px, 8px); }
          75% { transform: translate(-6px, 6px); }
             100% { transform: translate(0, 0); }
                                                                  }
     .shake-active { animation: shakeHit 0.2s ease-in-out; }
    `;
document.head.appendChild(shakeStyle);
// 🔥 NAYA JADOO: JS SE EP BAR BANA DIYA 🔥
const epBarHTML = `
      <div id="epBars" style="position: absolute; top: 60px; left: 0; width: 100%; padding: 0 20px; display: flex; justify-content: space-between; box-sizing: border-box; z-index: 10; pointer-events: none;">
       <div style="width: 35%; height: 8px; background: rgba(0,0,0,0.5); border: 1px solid #0ff; border-radius: 2px;">
       <div id="p1EpFill" style="width: 100%; height: 100%; background: cyan; box-shadow: 0 0 5px cyan; transition: width 0.2s;"></div>
      </div>
 <div style="width: 35%; height: 8px; background: rgba(0,0,0,0.5); border: 1px solid #0ff; border-radius: 2px; transform: scaleX(-1);">
 <div id="p2EpFill" style="width: 100%; height: 100%; background: cyan; box-shadow: 0 0 5px cyan; transition: width 0.2s;"></div>
</div>
  </div>`;

game.insertAdjacentHTML("beforeend", epBarHTML);

const p1EpFill = document.getElementById("p1EpFill");
const p2EpFill = document.getElementById("p2EpFill");

// EP Update karne ka function
// EP Update karne ka function
function updateEpBars() {
  function setEpColor(element, currentEp) {
    if (!element) return;
    let percent = 0;

    if (currentEp > 600) {
      percent = (currentEp - 600) / 2;
      element.style.background = "linear-gradient(to right, #9400d3, #ba55d3)";
      element.style.boxShadow = "0 0 5px purple";
      // 🟠 T तीसरी Bar (Orange)
    } else if (currentEp > 400) {
      percent = (currentEp - 400) / 2;
      element.style.background = "linear-gradient(to right, #ff8c00, #ffa500)";
      element.style.boxShadow = "0 0 5px orange";
    } else if (currentEp > 200) {
      // 🩷 Dूसरी Bar (Pink)
      percent = (currentEp - 200) / 2;
      element.style.background = "linear-gradient(to right, #ff3399, #ff66b2)";
      element.style.boxShadow = "0 0 5px hotpink";
    } else {
      // 🔵 P हली Bar (Blue)
      percent = currentEp / 2;
      element.style.background = "linear-gradient(to right, #00bfff, #00ffff)";
      element.style.boxShadow = "0 0 5px cyan";
    }
    //element.style.width = percent + "%";
    element.style.width = Math.max(0, Math.min(100, percent)) + "%";
  }

  const myHero = getMyFighter();
  const p1Fighter = currentP1Leader || player1;
  const p2Fighter = currentEnemyLeader || enemy;
  setEpColor(p1EpFill, p1Fighter.ep);
  setEpColor(p2EpFill, p2Fighter.ep);
  //const enemyHero = currentEnemyLeader || enemy;
  // setEpColor(p1EpFill, myHero.ep);
  //setEpColor(p2EpFill, enemyHero.ep);
}
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const p1HealthFill = document.getElementById("p1HealthFill");
const p2HealthFill = document.getElementById("p2HealthFill");

let gameStarted = false;
// 🎯 YAHAN TOP PAR DECLARE KARO (Line ~125 ke paas):
let currentP1Leader = null;
let currentEnemyLeader = null;
const DEBUG_MODE = false;
let WORLD_WIDTH = 1500; // Duniya 1500px ki ban gayi!
window.cameraX = 0;
window.cameraY = 0;
// Red/Blue boxes dekhne ke liye
let isL2Pressed = false;
let isL1Pressed = false;
let isR2Pressed = false;
let isR1Pressed = false;
// Yeh yaad rakhega ki L2 daba hai ya nahi

let projectiles = [];
let userControlledFighter = null;

// ==========================================
// 🎵 PRO SOUND SYSTEM (Zero Lag & High Quality)
// ==========================================
const ENABLE_SOUND = true; // 🔥 Sound switch ON!

class SoundEffect {
  constructor(src, poolSize = 6, volume = 0.85) {
    this.pool = [];
    for (let i = 0; i < poolSize; i++) {
      let audio = new Audio(src);
      audio.volume = volume;
      audio.preservesPitch = true; // Speed change par aawaz nahi phategi
      this.pool.push(audio);
    }
    this.index = 0;
  }

  play(speed = 1.0) {
    if (!ENABLE_SOUND) return;
    let audio = this.pool[this.index];
    audio.playbackRate = speed;
    audio.currentTime = 0;
    let playPromise = audio.play();
    if (playPromise !== undefined) {
      // 0ms delay start
      //audio.play().catch(() => {});
      playPromise.catch(() => {});
    }
    this.index = (this.index + 1) % this.pool.length;
  }
}

// 📦 Saare Sound Fils:
const sfxPunch = new SoundEffect("assets/punch.mp3", 20, 0.9);
const sfxKick = new SoundEffect("assets/kick.mp3", 20, 1.0);
const sfxDash = new SoundEffect("assets/dash.mp3", 20, 0.8);
const sfxJump = new SoundEffect("assets/jump.mp3", 20, 0.8);
const sfxKamehameha = new SoundEffect("assets/kamehameha.mp3", 20, 1.0);
const sfxCharge = new SoundEffect("assets/charge.mp3", 8, 0.85);
function playSfx(soundName, speed = 2.3) {
  if (!ENABLE_SOUND) return;
  let speedFactor = 2.3;
  if (typeof window.CURRENT_FRAME_SPEED !== "undefined") {
    let ratio = 6 / window.CURRENT_FRAME_SPEED; // e.g. 6 / 3 = 2
    speedFactor = 1 + (ratio - 1) * 0.35; // Natural smooth sync (no audio cutting)
  }

  let finalSpeed = Math.min(3.3, Math.max(1.0, speed * speedFactor));
  if (soundName === "punch") sfxPunch.play(finalSpeed);
  else if (soundName === "kick") sfxKick.play(finalSpeed);
  else if (soundName === "dash") sfxDash.play(finalSpeed);
  else if (soundName === "jump") sfxJump.play(finalSpeed);
  else if (soundName === "kamehameha") sfxKamehameha.play(finalSpeed);
  else if (soundName === "charge") sfxCharge.play(finalSpeed);
}
/* =================================================================
   🚄 2GB RAM / 32GB STORAGE ULTRA-OPTIMIZATION FOR 16 FIGHTERS LIVE
      ================================================================= */
// 🚀 HUGGING FACE HYBRID CONNECTION MANAGER (PASTE IN game.js TOP)
/*function setupDynamicNetworkPipeline() {
  const isOnline = navigator.onLine;

  if (isOnline) {
    console.log(
      "🟢 ONLINE NODE DETECTED: Fetching assets from Hugging Face CDN..."
    );
    // 🔗 Apne Hugging Face Static Space ka asli URL lagao (taaki photo/sound load ho sake)
    window.HF_CDN_URL = "https://huggingface.co/spaces/Itachi636777/legend-of-fairy-tail/resolve/main/
    ";

    // 📡 Render Singapore Server URL Sync (Yahan bina duplicate slashes ke lagana)
    window.CUSTOM_FIGHT_SERVER_URL = "wss://fairy-tail-server.onrender.com";

    if (typeof initDedicatedFightServer === "function")
      initDedicatedFightServer();
    if (typeof requestMicrophonePermission === "function")
      requestMicrophonePermission();
  } else {
    console.log(
      "📴 OFFLINE MODE: Running completely inside Local mobile directory..."
    );
    window.HF_CDN_URL = "assets/";
    window.CUSTOM_FIGHT_SERVER_URL = null;
    window.isGuestClient = false;
  }
}
setupDynamicNetworkPipeline();
window.addEventListener("online", setupDynamicNetworkPipeline);
window.addEventListener("offline", setupDynamicNetworkPipeline);*/

// ==========================================
// 2. THE FIGHTER CLASS
// ==========================================
// ⚡ PRO HACK: 80 jagah code badle bina har fighter ka apna move aur card chalega!

class Fighter {
  get id() {
    return this.charRole || this._uniqueId;
  }
  set id(val) {
    this._uniqueId = val;
  }

  constructor(
    elementId,
    fighterData,
    startX,
    facingDirection = 1,
    imageUrl,
    bgSize
  ) {
    let el = document.getElementById(elementId);
    if (!el) {
      el = document.createElement("div");
      el.id = elementId;
      el.className = "fighter";
      (document.getElementById("stageContainer") || game).appendChild(el);
    }

    this.element = el;
    //this.element = document.getElementById(elementId);
    //  this.id = elementId;
    this._uniqueId = elementId;
    this.charRole = null;
    this.data = fighterData;
    this.imageUrl = imageUrl;
    this.bgSize = bgSize;

    this.x = startX;
    this.y = 40;
    this.scaleX = facingDirection;
    this.velocityY = 0;
    this.gravity = 2.2;

    this.health = 100;
    this.healthBars = 4;
    this.ep = 800;
    this.isCharging = false;
    this.comboCount = 0;
    this.aiEscapeHits = 0;
    this.comboTimer = 0;
    this.state = "idle";
    this.frameIndex = 0;
    let vfxId = this.id === "player" ? "p1-dash" : "p2-dash";
    this.vfxElement = document.getElementById(vfxId);
    this.vfxFrame = 1;
    this.moveLeft = false;
    this.moveRight = false;
    this.jumping = false;
    this.isAttacking = false;
    this.kbVelocityX = 0;
    // 🔥 NAYA: OVERHEAD HP/EP BAR (Sirf Teammates aur NPCs ke liye)
    // 🎯 1P / ENEMY Indicator Badge
    this.badge = document.createElement("div");
    this.badge.className = "fighter-badge";
    this.badge.style.position = "absolute";
    this.badge.style.zIndex = "25";
    this.badge.style.pointerEvents = "none";
    this.badge.style.whiteSpace = "nowrap";
    this.badge.style.fontFamily = "Impact, Arial, sans-serif";
    this.badge.style.fontSize = "13px";
    this.badge.style.letterSpacing = "1px";
    this.badge.style.transform = "translateX(-50%)";
    this.badge.style.display = "none";
    let stage = document.getElementById("stageContainer") || game;
    stage.appendChild(this.badge);
    this.miniBar = document.createElement("div");
    this.miniBar.className = "mini-bar-container";
    this.miniHp = document.createElement("div");
    this.miniHp.className = "mini-hp-fill";
    this.miniEp = document.createElement("div");
    this.miniEp.className = "mini-ep-fill";

    this.miniBar.appendChild(this.miniHp);
    this.miniBar.appendChild(this.miniEp);
    (document.getElementById("stageContainer") || game).appendChild(
      this.miniBar
    );
    //game.appendChild(this.miniBar);

    if (DEBUG_MODE) this.createDebugBoxes();
    this.updateCSS();
  }
  consumeEp() {
    if (this.ep >= 20) {
      this.ep -= 20;
      if (this.isControlledByPlayer || this.id === "player") {
        updateEpBars();
      } else {
        this.updateMiniBars(); // NAYA: Teammate ki Overhead EP Bar update
      }
      return true;
    }
    return false;
  }

  updateMiniBars() {
    if (this.miniBar) {
      // Teammate ke 3 Health Bars ko mila kar 300% total HP banayi
      let totalHp =
        this.healthBars > 0 ? (this.healthBars - 1) * 100 + this.health : 0;
      let hpPercent = (totalHp / 400) * 100;
      let epPercent = (this.ep / 800) * 100;

      this.miniHp.style.width = Math.max(0, Math.min(100, hpPercent)) + "%";
      this.miniEp.style.width = Math.max(0, Math.min(100, epPercent)) + "%";
    }
  }

  createDebugBoxes() {
    let container = document.getElementById("stageContainer") || game;

    this.hurtboxDiv = document.createElement("div");
    this.hurtboxDiv.className = "debug-hurtbox";
    container.appendChild(this.hurtboxDiv);

    //game.appendChild(this.hurtboxDiv);

    this.hitboxDiv = document.createElement("div");
    this.hitboxDiv.className = "debug-hitbox";
    container.appendChild(this.hitboxDiv);

    //game.appendChild(this.hitboxDiv);
  }

  showFrame(frame) {
    if (!frame) return;
    this.element.style.width = frame.w + "px";
    this.element.style.height = frame.h + "px";
    this.element.style.backgroundImage = `url("${this.imageUrl}")`;
    this.element.style.backgroundPosition = `-${frame.x}px -${frame.y}px`;
    this.element.style.backgroundSize = this.bgSize;
  }

  setState(newState) {
    if (!this.data[newState] || this.data[newState].length === 0) {
      this.isAttacking = false;
      return;
    }

    this.element.style.opacity = "1";
    if (this.state !== newState) {
      this.state = newState;
      this.frameIndex = 0;

      /* if (
        typeof MOVE_CARD_MAP !== "undefined" &&
        MOVE_CARD_MAP[`${this.id}_${newState}`]
      ) {
        triggerMoveCutIn(this.id, newState);
      }*/ let role = this.charRole || this.id;
      let cardKey = `${role}_${newState}`;
      if (typeof MOVE_CARD_MAP !== "undefined" && MOVE_CARD_MAP[cardKey]) {
        triggerMoveCutIn(role, newState);
      }

      if (newState === "dash") {
        playSfx("dash", 2);
      }
      // 👊 2. Punch, Smash Punch, Hell Punch -> Punch Sound
      else if (
        newState === "punch" ||
        newState === "smashPunch" ||
        newState === "hellPunch"
      ) {
        playSfx("punch", 2);
      }
      // 🦵 3. Kick, Smash Kick, Hell Kick -> Kick Sound
      else if (
        newState === "kick" ||
        newState === "smashKick" ||
        newState === "hellKick"
      ) {
        playSfx("kick", 1.5);
      }
    }
  }

  // takeHit(damage, hitSourceX, attackerId) {
  //if (this.health <= 0) return;
  takeHit(damage, hitSourceX, attacker) {
    if (this.health <= 0 || !this.activeInBattle) return;
    let attackerFighter =
      /*  typeof attacker === "object" && attacker !== null
        ? attacker
        : activeMatchFighters.find(
            (f) => f._uniqueId === attacker || f.id === attacker
          );*/
      typeof attacker === "object" && attacker !== null
        ? attacker
        : activeMatchFighters.find(
            (f) =>
              (f._uniqueId === attacker || f.id === attacker) &&
              f.team !== this.team
          ) ||
          activeMatchFighters.find(
            (f) => f._uniqueId === attacker || f.id === attacker
          );

    // 🛑 KHUD KO AUR APNI TEAM KO ZERO DAMAGE:
    if (
      attackerFighter &&
      (attackerFighter === this || attackerFighter.team === this.team)
    ) {
      return;
    }

    //let attackerFighter = null;
    //if (typeof attacker === "object" && attacker !== null) {
    //  attackerFighter = attacker;
    //} // else if (attacker) {
    //  attackerFighter =
    //  activeMatchFighters.find(
    //     (f) => f._uniqueId === attacker || f.id === attacker
    //  ) || activeFighterMap[attacker];
    //  }
    else if (typeof attacker === "string" && attacker) {
      attackerFighter = activeMatchFighters.find(
        (f) =>
          f.activeInBattle && f.team !== this.team && f._uniqueId === attacker
        // 👈 Dost ya khud ko kabhi hit nahi dega
        //   (f._uniqueId === attacker || f.id === attacker) &&
        //  f.isAttacking // 👈 Khada hua player kabhi attacker nahi ban sakta!
      );
    }

    //  attackerFighter =
    //  activeMatchFighters.find(
    //  (f) => f._uniqueId === attacker || f.id === attacker
    //  ) || activeFighterMap[attacker];
    //  attackerFighter =
    //  activeMatchFighters.find((f) => f._uniqueId === attacker) ||
    //   activeMatchFighters.find(
    //     (f) => f.id === attacker && f.team !== this.team
    //   ) ||
    //    null;
    // }
    /* if (attackerId) {
      let attacker =
        activeMatchFighters.find(
          (f) => f.id === attackerId || f._uniqueId === attackerId
        ) || activeFighterMap[attackerId];*/

    // 1. Khud ko kabhi damage nahi lagega:
    /*if (
        attacker === this ||
        attackerId === this.id ||
        attackerId === this._uniqueId
      ) {
        return;
      }*/
    //  if (attackerFighter) {
    //  if (attacker === this || attackerId === this.id) return;
    //   if (attacker && attacker.team === this.team) return;
    // 2. Apni hi team ke fighter se kabhi damage nahi lagega:
    //  if (attacker && attacker.team === this.team) {
    //return;
    //   }
    //  }
    //   if (attackerFighter === this) return;
    //  if (attackerFighter.team === this.team) return;

    // 💥 USI ASLI FIGHTER KA COMBO BADHEGA JISNE MAARA HAI:
    // attackerFighter.comboCount = (attackerFighter.comboCount || 0) + 1;
    //  attackerFighter.comboTimer = 120; // 2 seconds timer
    // attackerFighter.showComboText(); // Sirf uska apna combo show hoga!
    // }
    //if (attacker) {
    // attacker.comboCount = (attacker.comboCount || 0) + 1;
    //  attacker.comboTimer = 120; // 1.5 second tak combo zinda rahega
    //  attacker.showComboText(); // Attacker apna combo dikhayega!
    //  }
    //  }
    if (
      attackerFighter &&
      attackerFighter.isControlledByPlayer &&
      !attackerFighter.isAttacking
    ) {
      attackerFighter = null;
    }

    // Unselected ya dead fighter ko ignore karo
    if (this.grabbedEnemy) {
      this.grabbedEnemy.isGrabbedBySSB = false;
      this.grabbedEnemy = null;
    }
    this.isGrabbedBySSB = false;

    // 🛡️ AAPKA GENIUS LOGIC: DOST KO ZERO (0) DAMAGE!
    //if (attackerId) {
    // let attacker = activeFighterMap[attackerId];
    // if (attacker && attacker.team === this.team) {
    // return; // 👈 Same team hai toh ZERO damage! Koi chot nahi lagegi!
    //}
    //  }

    // if (this.state === "teleport") return;
    if (
      this.state === "teleport" ||
      this.state === "instantTransmission" ||
      this.state === "dash" ||
      this.state === "punch" ||
      this.state === "kick" ||
      this.state === "kamehameha" ||
      (this.state === "mediumAttack" && this.id === "enemy2") ||
      (this.state === "hellAttack" && this.id === "teammate") ||
      (this.state === "hellAttack" &&
        (this.id === "sasuke" ||
          (this.imageUrl && this.imageUrl.includes("sasuke")))) ||
      (this.state === "smashKick" && this.id === "player")

      // (this.state === "hellAttack" && this.id === "teammate") ||
      // (this.state === "smashKick" && this.id === "player") // 👈 SIRF FRIEZA KE LIYE! Baaki kisi par fark nahi padega!
    )
      return;
    // this.comboCount++;
    // this.comboTimer = 120;
    playSfx("kamehameha", 2.2);
    // 🛡️ BLOCK LOGIC: Agar player Block kar raha hai
    this.aiEscapeHits = (this.aiEscapeHits || 0) + 1;
    if (
      (this.state === "block" || this.isBlocking) &&
      hitSourceX !== undefined
    ) {
      // Direction Check: Dushman aage se maar raha hai ya peechhe se?
      // Agar scaleX 1 (Right) hai toh dushman ka X bada hona chahiye.
      let attackFromFront =
        (this.scaleX === 1 && hitSourceX > this.x) ||
        (this.scaleX === -1 && hitSourceX < this.x);

      if (attackFromFront) {
        // =======================================================
        // 🔴 NAYA JADOO: GUARD STAMINA (EP) & GUARD BREAK SYSTEM
        // =======================================================
        if (this.ep >= damage) {
          // SUCCESSFUL BLOCK: Agar EP damage jhelne ke liye kafi hai
          this.ep -= damage;

          // Jitna damage aana tha, utni hi EP kat li
          updateEpBars();
          if (this.miniBar) this.updateMiniBars();
          // Cyan bar ko chhota kar diya
          if (this.id === "enemy" && this.aiEscapeHits >= 3) {
            this.teleport();
            if (this.state === "teleport") {
              this.aiEscapeHits = 0; // Combo reset
              return; // Engine yahin se gayab kar dega!
            }
          }
          if (this.state !== "block") {
            this.setState("block");
            this.isAttacking = true;
          }
          return; // HP kam nahi hogi
        } else {
          // GUARD BREAK
          this.ep = 0;
          updateEpBars();
          if (this.miniBar) this.updateMiniBars();
          this.isBlocking = false;
        }
      }
    }
    //  this.showComboText(attackerId);

    this.health -= damage;
    //this.health -= damage;
    const gameContainer = document.getElementById("game");
    if (gameContainer) {
      gameContainer.classList.add("shake-active");
      //  setTimeout(() => gameContainer.classList.remove("shake-active"), 200);
      // }
      //  game.classList.add("shake-active");
      if (this.miniBar) this.updateMiniBars(); // Teammate ko maar padegi toh overhead HP kam hogi!
      setTimeout(() => game.classList.remove("shake-active"), 200);
    }
    if (
      attackerFighter &&
      attackerFighter !== this &&
      attackerFighter.team !== this.team
    ) {
      attackerFighter.comboCount = (attackerFighter.comboCount || 0) + 1;
      attackerFighter.comboTimer = 120;
      attackerFighter.showComboText(); // Sirf sach mein maarne wale ka combo badhega!
    }

    this.isAttacking = false;
    this.moveLeft = false;
    this.moveRight = false;
    // ==========================================
    // NAYA COMBO LOGIC
    // ==========================================
    // ==========================================

    if (this.health <= 0) {
      this.healthBars--; // Ek life bar (rang) kam kardo

      if (this.healthBars > 0) {
        // Agar life bachi hai, toh wapas 100 Health kar do (Color change hoga)
        this.health = 100;
        this.state = "hit"; // Sirf jhatka lagega, marega nahi
        this.frameIndex = 0;
        // this.state = "hit";
        // this.frameIndex = 0;
        // this.hitStunTimer = 0;
        // 🎯 Hit frame turant screen par show karo (No skip)
      } else {
        // Jab teeno rang khatam, tabhi Maut!
        this.health = 0;
        this.state = "death";
        this.frameIndex = 0;
        let anyTeammateAlive = activeMatchFighters.some(
          (f) =>
            f !== this &&
            f.activeInBattle &&
            f.team === this.team &&
            (f.health > 0 || f.healthBars > 0)
        );
        triggerJapaneseKO(!anyTeammateAlive);
      }
    } else {
      // =======================================================
      // 🧠 BOSS AI MAGIC: DOUBLE ESCAPE SYSTEM
      // =======================================================
      // =======================================================
      // 🧠 BOSS AI MAGIC: DOUBLE ESCAPE SYSTEM
      // =======================================================
      // if (this.id === "enemy") {
      // 1. COMBO BREAKER (4 Hit padne par)
      if (this.id === "enemy" && !this.isControlledByPlayer) {
        if (this.aiEscapeHits >= 3) {
          this.teleport();

          // 🔥 NAYA FIX: Engine check karega kya sach mein teleport hua? (EP thi ya nahi)
          if (this.state === "teleport") {
            this.aiEscapeHits = 0;
            return; // Agar sach mein teleport ho gaya, toh yahin ruk jao
          }
        }

        // 2. RANDOM ESCAPE (Pit'te waqt)
        else if (Math.random() < 0.4) {
          this.instantTransmission(player1);

          // 🔥 NAYA FIX: Engine check karega kya sach mein gayab hua?
          if (this.state === "instantTransmission") {
            return; // Agar gayab hua tabhi roko
          }
        }
      }

      this.state = "hit";
      this.frameIndex = 0;
    }
  }

  // ==========================================
  // 💥 NAYA PRO FUNCTION: SMOOTH KNOCKBACK MANAGER
  // ==========================================
  applyKnockback(
    attackName,
    attackerDirection,
    customVy = null,
    attacker = null
  ) {
    let attackerFighter =
      typeof attacker === "object" && attacker !== null
        ? attacker
        : activeMatchFighters.find(
            (f) => f._uniqueId === attacker || f.id === attacker
          );

    // 🛑 KHUD KO AUR APNI TEAM KO ZERO DHAKKA:
    if (
      attackerFighter &&
      (attackerFighter === this || attackerFighter.team === this.team)
    ) {
      return;
    }

    //if (attacker && (attacker === this || attacker.team === this.team)) return;
    if (this.state === "kamehameha" || this.state === "bigKamehameha") return;
    let speedX = 0;
    let speedY = 0;

    // 1. ATTACK KE HISAAB SE SPEED (Aur Duri) SET KARO
    // Formula: Total Duri = Speed x 6.5 (approx)
    if (attackName === "punch") {
      speedX = 6;
      speedY = 2; // Dre-dre peeche jayega (approx 40px duri)
    } else if (attackName === "kick") {
      speedX = 9;
      speedY = 3;

      // Thoda medium dhakka (approx 60px duri)
    } else if (attackName === "smashKick") {
      speedX = 9;
      speedY = 12;
    } else if (attackName === "smashPunch") {
      speedX = 10;
      speedY = 4; // Medium-heavy dhakka (approx 65px)
    } else if (attackName === "hellPunch") {
      speedX = 16;
      speedY = 5;

      // Sabse TEZ aur fast dhakka! (approx 100px+ duri)
    } else if (attackName === "hellKick") {
      speedX = 6;
      speedY = 16;
    } else if (attackName === "kiBlast") {
      speedX = 12;
      speedY = 2; // 🔥 NAYA JADOO: Goli ka Impact (Punch se double Dhakka!)
    } else if (attackName === "ssbHellAttack") {
      speedX = 3; // 💥 Peeche fekega
      speedY = 29; // 🚀 Seedha aasmaan me uchhal dega!
    }

    if (customVy !== null) {
      speedY = customVy;
    }

    // 2. DIRECTION SET KARO (Jis taraf dushman dekh raha hai, udhar feko)

    this.kbVelocityX = attackerDirection === 1 ? speedX : -speedX;
    if (speedY > 0) {
      this.jumping = true; // Engine ko bataya dushman hawa me hai
      this.velocityY = speedY; // Upar udne ki speed
    }
  }

  //showComboText(attackerId) {
  //  if (this.comboCount >= 1 && attackerId) {
  // showComboText() {
  //  if (this.comboCount >= 1) {
  //  let comboId = null;

  //if (this.comboCount >= 1) {
  //let comboId = "p2-combo";
  /*
// Agar Goku Black (enemy) pit raha hai, toh check karo kisne maara!
if (this.id === "enemy" || this.id === "enemy2" || this.id === "enemy3") {
if (attackerId === "teammate") comboId = "t1-combo"; // Goku SSB
else if (attackerId === "teammate2") comboId = "t2-combo";
else if (attackerId === "teammate3") comboId = "t3-combo"; // Jiren
else comboId = "p1-combo"; // Deku
}
if (this.id === "player" || this.id === "teammate" || this.id === "teammate2" || this.id === "teammate3") {
if (attackerId === "sasuke") comboId = "sasuke-combo";
else if (attackerId === "enemy3") comboId = "s1-combo";
else if (attackerId === "enemy2") comboId = "f1-combo"; // Frieza
else comboId = "p2-combo"; // Goku Black
}*/
  /*const comboMap = {
        player: "p1-combo", // 🟢 Deku (Left Top)
        teammate: "t1-combo", // 🔵 Goku SSB (Left)
        teammate2: "t2-combo", // 🔴 Jiren (Left)
        teammate3: "t3-combo",
        teammate4: "t4-combo",
        teammate5: "t5-combo",
        t4: "t4-combo",
        t5: "t5-combo",
        t6: "t6-combo",
        // 🟢 Itachi (Left Sharingan)
        enemy: "p2-combo", // 🟡 Goku Black (Right)
        enemy2: "f1-combo", // 🟣 Frieza (Right)
        enemy3: "s1-combo",
        // 🩷 Sukuna (Right)
        sasuke: "sasuke-combo",
        enemy4: "e4-combo",
        enemy5: "e5-combo", // 🧪 6th Enemy (E4 ke upar - Neon Lime)
        enemy6: "e6-combo",
        e4: "e4-combo",
        e5: "e5-combo",
        e6: "e6-combo",
        // ⚡ Sasuke (Right Chidori)
      };
      let attacker =
        activeFighterMap[attackerId] ||
        activeMatchFighters.find(
          (f) => f.id === attackerId || f._uniqueId === attackerId
        );

      let comboId = null;

      // 1. Direct ID / Unique ID Check
      if (attacker && attacker._uniqueId && comboMap[attacker._uniqueId]) {
        comboId = comboMap[attacker._uniqueId];
      } else if (comboMap[attackerId]) {
        comboId = comboMap[attackerId];
      }
      if (attacker) {
        if (attacker.team === "p1") {
          let idx = teamAFighters.indexOf(attacker);
          if (idx == 4) comboId = "t4-combo";
          else if (idx === 5)
            comboId = "t5-combo"; // 🖤 6th Player -> T4 ke upar (Light Black)
          else if (idx == 6) comboId = "t6-combo";
          else if (idx >= 7) comboId = "t7-combo"; // Deku/Goku SSB ke upar
          else if (!comboId) comboId = "p1-combo";
        } else if (attacker.team === "enemy") {
          let idx = teamBFighters.indexOf(attacker);
          if (idx == 4) comboId = "e4-combo";
          else if (idx === 5)
            comboId = "e5-combo"; // 🧪 6th Enemy -> E4 ke upar (Neon Lime)
          else if (idx == 6) comboId = "e6-combo";
          else if (idx >= 7) comboId = "e7-combo"; // Goku Black ke upar
          else if (!comboId) comboId = "p2-combo";
        }
      }
      //  let comboId = comboMap[attackerId];
      let comboEl = document.getElementById(comboId);
      if (comboEl) {
        comboEl.innerText = this.comboCount + " HITS!";
        comboEl.style.opacity = 1;
        comboEl.classList.remove("pop-anim");
        void comboEl.offsetWidth;
        comboEl.classList.add("pop-anim");
      }
    }
  }*/
  /*  let attacker =
        activeMatchFighters.find(
          (f) => f.id === attackerId || f._uniqueId === attackerId
        ) || activeFighterMap[attackerId];

      let comboId = null;

      // 🎯 PURE SLOT POSITION BASED COMBO (16 Players All Different Colors):
      if (attacker) {
        // if (attacker.team === "p1") {
        if (this.team === "p1") {
          const p1Slots = [
            "p1-combo",
            "t1-combo",
            "t2-combo",
            "t3-combo",
            "t4-combo",
            "t5-combo",
            "t6-combo",
            "t7-combo",
          ];

        /*  let idx = teamAFighters.indexOf(attacker);
          if (idx === -1)
            idx = activeMatchFighters
              .filter((f) => f.team === "p1")
              .indexOf(attacker);
          comboId = p1Slots[idx] || "p1-combo";
        } else {
          const enemySlots = [
            "p2-combo",
            "f1-combo",
            "s1-combo",
            "sasuke-combo",
            "e4-combo",
            "e6-combo",
            "e7-combo",
          ];
          let idx = teamBFighters.indexOf(attacker);
          if (idx === -1)
            idx = activeMatchFighters
              .filter((f) => f.team === "enemy")
              .indexOf(attacker);
          comboId = enemySlots[idx] || "p2-combo";
        }
      }*/
  /*
let idx = teamAFighters.indexOf(this);
        if (idx === -1) idx = activeMatchFighters.filter(f => f.team === "p1").indexOf(this);
                comboId = p1Slots[idx] || "p1-combo";
                      } else {
                              const enemySlots = [
                                        "p2-combo", "f1-combo", "s1-combo", "sasuke-combo",
                                                  "e4-combo", "e5-combo", "e6-combo", "e7-combo"
                                                          ];
                                                                  let idx = teamBFighters.indexOf(this);
                                                                          if (idx === -1) idx = activeMatchFighters.filter(f => f.team === "enemy").indexOf(this);
                                                                                  comboId = enemySlots[idx] || "p2-combo";
                                                                                        }
      if (comboId) {
        let comboEl = document.getElementById(comboId);
        if (comboEl) {
          comboEl.innerText = this.comboCount + " HITS!";
          comboEl.style.opacity = 1;
          comboEl.classList.remove("pop-anim");
          void comboEl.offsetWidth;
          comboEl.classList.add("pop-anim");
        }
      }
    }
  }*/
  // 🎯 100% CLEAN & ZERO ERROR COMBO DISPLAY:
  showComboText() {
    if (this.comboCount >= 1) {
      /*  const p1Slots = [
        "p1-combo",
        "t1-combo",
        "t2-combo",
        "t3-combo",
        "t4-combo",
        "t5-combo",
        "t6-combo",
        "t7-combo",
      ];
      const enemySlots = [
        "p2-combo",
        "f1-combo",
        "s1-combo",
        "sasuke-combo",
        "e4-combo",
        "e5-combo",
        "e6-combo",
        "e7-combo",
      ];*/
      const p1Slots = [
        "t7-combo", // 👈 1st (Aapka Fighter / Slot 1) -> Screen ke TOP (15px) par!
        "t5-combo", // 👈 2nd Slot -> (57px)
        "t4-combo", // 👈 3rd Slot -> (99px)
        "p1-combo", // 👈 4th Slot -> (141px)
        "t1-combo", // 👈 5th Slot -> (184px)
        "t2-combo", // 👈 6th Slot -> (226px)
        "t3-combo", // 👈 7th Slot -> (268px)
        "t6-combo", // 👈 8th Slot -> (310px)
      ];
      const enemySlots = [
        "e7-combo", // 👈 Enemy 1 (Leader) -> Screen ke TOP (15px) par!
        "e5-combo", // 👈 Enemy 2 -> (57px)
        "e4-combo", // 👈 Enemy 3 -> (99px)
        "p2-combo", // 👈 Enemy 4 -> (141px)
        "f1-combo", // 👈 Enemy 5 -> (184px)
        "s1-combo", // 👈 Enemy 6 -> (226px)
        "sasuke-combo", // 👈 Enemy 7 -> (268px)
        "e6-combo", // 👈 Enemy 8 -> (310px)
      ];

      let comboId = null;
      if (this.team === "p1") {
        let idx = teamAFighters.indexOf(this);
        if (idx === -1) {
          idx = activeMatchFighters
            .filter((f) => f.team === "p1")
            .indexOf(this);
        }
        comboId = p1Slots[idx] || "t7-combo";
      } else {
        let idx = teamBFighters.indexOf(this);
        if (idx === -1) {
          idx = activeMatchFighters
            .filter((f) => f.team === "enemy")
            .indexOf(this);
        }
        comboId = enemySlots[idx] || "e7-combo";
      }

      if (comboId) {
        //  let comboEl = document.getElementById(comboId);
        this.comboElementId = comboId;
        let comboEl = document.getElementById(comboId);

        if (comboEl) {
          comboEl.innerText = this.comboCount + " HITS!";
          comboEl.style.opacity = 1;
          comboEl.classList.remove("pop-anim");
          void comboEl.offsetWidth;
          comboEl.classList.add("pop-anim");
        }
      }
    }
  }
  getHurtbox() {
    let currentAnim = this.data[this.state];
    let frame =
      currentAnim && currentAnim[this.frameIndex]
        ? currentAnim[this.frameIndex]
        : this.data["idle"][0];

    let hurtWidth = frame.w;
    let hurtHeight = frame.h; // NAYA: Default height

    // BLUE BOX BUG FIX: Width aur Height dono ko fix karo
    if (this.state === "kamehameha" && this.frameIndex === 6) {
      hurtWidth = 50; // Sirf Goku ke sharir ki motai

      // NAYA FIX: Height ko normal "idle" (khade hue) Goku jitna kar do!
      hurtHeight = this.data["idle"][0].h;
    }
    if (
      this.state === "hellPunch" ||
      this.state === "smashPunch" ||
      this.state === "smashKick" ||
      this.state === "extraAttack" ||
      this.state === "hellKick" || // 👈 Tune bola, add kar diya!
      this.state === "mediumAttack" || // 👈 Ye bhi add ho gaya!
      this.state === "kiBlast" ||
      this.state === "kamehameha" ||
      this.state === "dash"
    ) {
      hurtWidth = 55; // Sirf character ki body ki motai!
      hurtHeight = this.data["idle"][0].h; // Normal khade hone wali height

      // 🔴 POSITION SHIFT: Agar animation aage ja rahi hai, toh blue box ko bhi aage khiskao
      let forwardShift = 20; // 20px aage shift kiya taaki box photo ke center mein rahe
      let boxX =
        this.scaleX === 1 ? this.x + forwardShift : this.x - forwardShift;
      return { x: boxX, y: this.y, w: hurtWidth, h: hurtHeight };
    }
    /*let boxY = this.y;
    if (
      this.charRole === "enemy3" ||
      this.id === "enemy3" ||
      this._uniqueId === "enemy3"
    ) {
      boxY -= 8;
    }*/

    // Ab w aur h dono fixed wali jayengi
    return { x: this.x, y: this.y, w: hurtWidth, h: hurtHeight };
  }

  getHitbox() {
    const isSasuke =
      this.id === "sasuke" ||
      this.charRole === "sasuke" ||
      (this.imageUrl && this.imageUrl.includes("sasuke"));
    const isDeku =
      this.id === "player" ||
      this.charRole === "player" ||
      (this.imageUrl && this.imageUrl.includes("deku"));
    const isItachi =
      this.id === "teammate3" ||
      this.charRole === "teammate3" ||
      (this.imageUrl && this.imageUrl.includes("itachi"));

    //const isActualFrieza = (this.id === "enemy2" || this.charRole === "enemy2") && (this.imageUrl && this.imageUrl.includes("frieza"));

    const isActualFrieza = Boolean(
      this.imageUrl && this.imageUrl.includes("frieza")
    );

    // ==========================================================
    // ⚡ SASUKE HITBOX SYSTEM (Punch: 5, Kick: 3, Smash/Hell Moves)
    // ==========================================================
    // if (this.id === "sasuke") {
    // Punch: 5 frames (Hit index 2 aur 3 par aayega)
    // if (
    // this.id === "sasuke" ||
    //  this.charRole === "sasuke" ||
    //  (this.imageUrl && this.imageUrl.includes("sasuke"))
    // ) {
    if (isSasuke) {
      if (
        this.state === "punch" &&
        this.frameIndex !== 2 &&
        this.frameIndex !== 3
      )
        return null;

      // Kick: 3 frames (Hit index 1 aur 2 par)
      if (
        this.state === "kick" &&
        this.frameIndex !== 1 &&
        this.frameIndex !== 2
      )
        return null;

      // Smash Punch: 3 frames (Hit index 2)
      if (this.state === "smashPunch" && this.frameIndex !== 2) return null;

      // Smash Kick: 4 frames (Hit index 3)
      if (this.state === "smashKick" && this.frameIndex !== 3) return null;

      // Hell Punch: 4 frames (Hit index 3)
      if (this.state === "hellPunch" && this.frameIndex !== 3) return null;

      // Hell Kick: 3 frames (Hit index 2)
      if (this.state === "hellKick" && this.frameIndex !== 2) return null;
      /*   if (this.state === "smashKick") {
        let currentAnim = this.data[this.state];
        // let frame = this.data[this.state][this.frameIndex];
        //  if (!frame) return null;
        let frame =
          currentAnim && currentAnim[this.frameIndex]
            ? currentAnim[this.frameIndex]
            : null;
        if (!frame) return null;
        let boxWidth = 35;
        let boxHeight = frame.h / 2 + 15;
        let uparKhiskao = 20; // 🎯 UPAR
        let andarKhiskao = -5; // 🎯 Haath ke paas (andar)

        let hitboxX =
          this.scaleX === 1
            ? this.x + frame.w - boxWidth - andarKhiskao
            : this.x + andarKhiskao;

        return {
          x: hitboxX,
          y: this.y + uparKhiskao,
          w: boxWidth,
          h: boxHeight,
        };
      }*/
      /* if (this.state === "hellKick") {
        let frame = this.data[this.state][this.frameIndex];
        if (!frame) return null;
        let boxWidth = 35;
        let boxHeight = frame.h / 2 + 15;
        let uparKhiskao = -5; // 🎯 UPAR
        let andarKhiskao = -10; // 🎯 Haath ke paas (andar)

        let hitboxX =
          this.scaleX === 1
            ? this.x + frame.w - boxWidth - andarKhiskao
            : this.x + andarKhiskao;

        return {
          x: hitboxX,
          y: this.y + uparKhiskao,
          w: boxWidth,
          h: boxHeight,
        };
      }*/
      if (this.state === "smashKick" || this.state === "hellKick") {
        let currentAnim = this.data[this.state];
        let frame =
          currentAnim && currentAnim[this.frameIndex]
            ? currentAnim[this.frameIndex]
            : null;
        if (!frame) return null;
        let boxWidth = 35;
        let boxHeight = frame.h / 2 + 15;
        let uparKhiskao = this.state === "smashKick" ? 20 : -5;
        let andarKhiskao = this.state === "smashKick" ? -5 : -10;
        let hitboxX =
          this.scaleX === 1
            ? this.x + frame.w - boxWidth - andarKhiskao
            : this.x + andarKhiskao;
        return {
          x: hitboxX,
          y: this.y + uparKhiskao,
          w: boxWidth,
          h: boxHeight,
        };
      }

      if (["punch", "kick", "smashPunch", "hellPunch"].includes(this.state)) {
        // let frame = this.data[this.state][this.frameIndex];
        // if (!frame) return null;
        let currentAnim = this.data[this.state];
        let frame =
          currentAnim && currentAnim[this.frameIndex]
            ? currentAnim[this.frameIndex]
            : null;
        if (!frame) return null;
        let boxWidth = 32;
        let boxHeight = frame.h / 2 + 10;
        let pushForward = 12;

        /*  let hitboxX =
          this.scaleX === 1
            ? this.x + frame.w - 15 + pushForward
            : this.x - boxWidth + 15 - pushForward;
        return {
          x: hitboxX,
          y: this.y + frame.h / 4,
          w: boxWidth,
          h: boxHeight,
        };
      }*/
        let hitboxX =
          this.scaleX === 1
            ? this.x + frame.w - 15 + pushForward
            : this.x - boxWidth + 15 - pushForward;
        return {
          x: hitboxX,
          y: this.y + frame.h / 4,
          w: boxWidth,
          h: boxHeight,
        };
      }
    }
    // ==========================================================
    // 🌀 GOKU SSB GRAB HITBOX (Debug Box dikhane ke liye)
    // =======================================================
    // 🌀 GOKU SSB MEDIUM ATTACK (Index 1 se 4 tak poore Spin Loop mein Red Box dikhega):
    if (this.state === "mediumAttack" && this.id === "teammate") {
      // Frame 2 se lekar Frame 5 tak (Indices 1 to 4) Hitbox active rahega:
      // if (this.frameIndex >= 0 && this.frameIndex <= 5) {
      let boxW = 55;
      let boxH = 55;
      let fwd = 28;
      let oy = 23;
      if (this.frameIndex === 0) {
        fwd = 28; // 1. Grab Reach (Aage)
        oy = 23;
      } else {
        if (this.spinPhase === 0) {
          fwd = 0; // 2. Right (Aage)
          oy = -5;
        } else if (this.spinPhase === 1) {
          fwd = -32; // 3. Up (Upar)
          oy = 18; // 👈 Pehle 60 tha, ab neeche paas kar diya
        } else if (this.spinPhase === 2) {
          fwd = 0; // 4. Left (Peeche)
          oy = 52;
        } else if (this.spinPhase === 3) {
          fwd = 32; // 5. Down (Neeche Pairon ke paas)
          oy = 18;
        }
      }
      let rightForward = this.scaleX === 1 ? 20 : 10;
      let posX = this.x + this.scaleX * fwd + rightForward;
      let posY = this.y + oy;
      return { x: posX - boxW / 2, y: posY - boxH / 2, w: boxW, h: boxH };
    }

    // 🔄 HAR FRAME PAR HITBOX KI DISHA BADLEGI (CIRCULAR ROTATION):
    //let hitX = this.scaleX === 1 ? this.x + ox : this.x - ox - boxW + 30;
    //let hitY = this.y + oy;
    // return { x: hitX, y: hitY, w: boxW, h: boxH };
    //  }
    //  return null;
    // }
    // ==========================================================
    // 🌀 GOKU SSB MEDIUM ATTACK HITBOX (Line 493 to 528)
    // ==========================================================
    /* if (this.state === "mediumAttack" && this.id === "teammate") {
      let boxW = 55;
      let boxH = 55;
      let fwd = 28;
      let oy = 10;

      // 1. Shuruwati Reach (Frame 2 Aage):
      if (this.frameIndex === 0) {
        fwd = 28;
        oy = 10;
      }
      // 2. 🌀 Spin Loop: Down ➔ Peeche ➔ Upar ➔ Aage:
      else {
        if (this.spinPhase === 0) {
          fwd = 0; // 1. Down (Neeche pairon ke paas)
          oy = -5;
        } else if (this.spinPhase === 1) {
          fwd = -32; // 2. Peeche (Peeth se thoda gap)
          oy = 18;
        } else if (this.spinPhase === 2) {
          fwd = 0; // 3. Upar (Sar ke upar hawa me)
          oy = 52;
        } else if (this.spinPhase === 3) {
          fwd = 32; // 4. Aage (Haath ke paas)
          oy = 18;
        }
      }

      // 🎯 Left aur Right dono taraf 100% exact center:
      let posX = this.x + this.scaleX * fwd;
      let posY = this.y + oy;

      return { x: posX - boxW / 2, y: posY - boxH / 2, w: boxW, h: boxH };
    }*/

    if (this.id === "teammate3") {
      if (this.state === "kick" && this.frameIndex !== 2) return null;
      if (this.state === "punch" && this.frameIndex !== 3) return null;
      if (this.state === "smashKick" && this.frameIndex !== 3) return null;
      if (this.state === "smashPunch" && this.frameIndex !== 3) return null;
      if (this.state === "hellKick" && this.frameIndex !== 3) return null;
      if (
        this.state === "hellPunch" &&
        this.frameIndex !== 1 &&
        this.frameIndex !== 2 &&
        this.frameIndex !== 3 &&
        this.frameIndex !== 4
      )
        return null;

      if (
        [
          "punch",
          "kick",
          "smashPunch",
          "smashKick",
          "hellPunch",
          "hellKick",
        ].includes(this.state)
      ) {
        let frame = this.data[this.state][this.frameIndex];
        if (!frame) return null;
        let boxWidth = 30;
        let boxHeight = frame.h / 2 + 10;
        let pushForward = 10;
        let hitboxX =
          this.scaleX === 1
            ? this.x + frame.w - 15 + pushForward
            : this.x - boxWidth + 15 - pushForward;
        return {
          x: hitboxX,
          y: this.y + frame.h / 4,
          w: boxWidth,
          h: boxHeight,
        };
      }
    }
    // 🔵 Goku SSB Hell Attack Frame 1 Hitbox:
    if (
      this.state === "hellAttack" &&
      this.id === "teammate" &&
      this.frameIndex === 2
    ) {
      let frame = this.data[this.state][1];
      let boxWidth = 45;
      let boxHeight = frame.h / 2 + 10;
      let hitboxX =
        this.scaleX === 1
          ? this.x + frame.w - 15 - 2
          : this.x - boxWidth + 15 + 2;
      return { x: hitboxX, y: this.y + frame.h / 4, w: boxWidth, h: boxHeight };
    }
    // ==========================================================
    // 🔥 NAYA: SUKUNA (ENEMY3) CUSTOM HITBOX & FRAMES
    // ==========================================================
    if (this.id === "enemy3") {
      // 1. PUNCH (Frame 4th par hit lagega - Index 3)
      if (this.state === "punch" && this.frameIndex !== 3) return null;
      // 2. KICK (Frame 5th par hit lagega - Index 4)
      if (this.state === "kick" && this.frameIndex !== 4) return null;
      if (this.state === "hellPunch" && this.frameIndex !== 5) return null;
      // 3. SMASH PUNCH (Frame 3rd par hit lagega - Index 2)
      if (this.state === "smashPunch" && this.frameIndex !== 2) return null;
      if (this.state === "hellKick" && this.frameIndex !== 5) return null;
      if (this.state === "smashKick" && this.frameIndex !== 4) return null;
      if (
        this.state === "hellPunch" ||
        this.state === "smashKick" ||
        this.state === "smashPunch" ||
        this.state === "hellKick" ||
        this.state === "kick" ||
        this.state === "punch"
      ) {
        let frame = this.data[this.state][this.frameIndex];
        let boxWidth = 30; // Dabba thoda chauda
        let boxHeight = frame.h / 2 + 10;
        let pushForward = 10; // 🎯 Sukuna thoda dur tak marega!

        let hitboxX =
          this.scaleX === 1
            ? this.x + frame.w - 15 + pushForward
            : this.x - boxWidth + 15 - pushForward;

        return {
          x: hitboxX,
          y: this.y + frame.h / 4,
          w: boxWidth,
          h: boxHeight,
        };
      }
    }
    //if (this.id === "enemy2") {
    // if (this.state === "mediumAttack" && this.frameIndex >= 2) {
    if (
      this.id === "enemy2" ||
      (this.imageUrl && this.imageUrl.includes("frieza"))
    ) {
      if (this.state === "mediumAttack" && this.frameIndex >= 2) {
        let frame = this.data[this.state][this.frameIndex];
        if (!frame) return null;
        return { x: this.x, y: this.y, w: frame.w, h: frame.h };
      }

      // Punch mein sirf 2nd frame (Index 1) par hit lagega
      if (this.state === "punch" && this.frameIndex !== 1) return null;
      if (this.state === "smashPunch" && this.frameIndex !== 1) return null;
      if (this.state === "hellPunch" && this.frameIndex !== 1) return null;

      // Kick mein sirf 3rd frame (Index 2) par hit lagega
      if (this.state === "kick" && this.frameIndex !== 2) return null;

      if (["punch", "smashPunch", "hellPunch", "kick"].includes(this.state)) {
        let frame = this.data[this.state][this.frameIndex];
        if (!frame) return null;

        let boxWidth = 25;
        let boxHeight = frame.h / 2;
        let pushForward = 10; // 🎯 5px aage dhakka!

        let hitboxX =
          this.scaleX === 1
            ? this.x + frame.w - 15 + pushForward
            : this.x - boxWidth + 15 - pushForward;

        return {
          x: hitboxX,
          y: this.y + frame.h / 4,
          w: boxWidth,
          h: boxHeight,
        };
      }
    }
    if (this.state === "punch" && this.id === "teammate2") {
      if (this.frameIndex !== 3 && this.frameIndex !== 5) return null;
      if (!this.data[this.state] || !this.data[this.state][this.frameIndex])
        return null;
      let frame = this.data[this.state][this.frameIndex];

      let boxWidth = 25; // Dabbe ki chaudai
      let boxHeight = 25; // Dabbe ki lambai

      // 🎛️ CONTROLS: YAHAN SE DABBA ADJUST KAR BHAII!
      let andarKhiskao = -20; // Isko badhaoge toh dabba andar (hath par) aayega
      let uparKhiskao = 25; // Isko badhaoge toh dabba UPAR jayega

      let hitboxX;
      if (this.scaleX === 1) {
        // Agar Jiren Right dekh raha hai
        hitboxX = this.x + frame.w - boxWidth - andarKhiskao;
      } else {
        // Agar Jiren Left dekh raha hai
        hitboxX = this.x + andarKhiskao;
      }

      return {
        x: hitboxX,
        y: this.y + uparKhiskao, // 🔥 Dabbe ko Y-Axis par upar bheja!
        w: boxWidth,
        h: boxHeight,
      };
    }
    if (
      this.state === "block" ||
      this.state === "dash" ||
      this.state === "teleport"
    )
      return null;
    if (!this.isAttacking || this.state === "kiBlast") return null;

    // 🔥 1. NAYA JADOO: kiAttack ka Hitbox Lock
    if (this.state === "kiAttack") {
      // Sirf Frame 5 (index 4), Frame 6 (index 5) aur Frame 8 (index 7) par Hitbox niklega!
      if (
        this.frameIndex !== 5 &&
        this.frameIndex !== 6 &&
        this.frameIndex !== 8
      ) {
        return null; // Baaki frames par hit nahi hoga
      }
    }

    // NAYA LOGIC: Smash Punch mein sirf 3rd frame (Index 2) par Red Box aayega

    if (
      this.state === "hellPunch" &&
      this.frameIndex !== 3 &&
      (this.id === "enemy" || this.id === "teammate")
    )
      return null;
    if (
      this.state === "hellKick" &&
      this.frameIndex !== 3 &&
      this.id === "teammate"
    )
      return null;
    if (
      this.state === "smashPunch" &&
      this.frameIndex !== 2 &&
      (this.id === "enemy" || this.id === "teammate")
    )
      return null;
    if (this.state === "extraAttack" && this.frameIndex !== 1) return null;
    // KAMEHAMEHA GROWING HITBOX
    // ==========================================================
    // 🔥 2. NAYA: SMASH PUNCH KA CUSTOM RED BOX 🔥
    // ==========================================================
    if (
      this.state === "smashPunch" &&
      this.frameIndex === 2 &&
      (this.id === "enemy" || this.id === "teammate")
    ) {
      let frame = this.data[this.state][2];

      // A. BOX KI SIZE (Yahan se chhota bada karo)
      let boxWidth = 25; // Chaudai
      let boxHeight = frame.h / 2; // Lambai

      // B. BOX KI POSITION (X-Axis)
      let hitboxX;
      if (this.scaleX === 1) {
        // Agar Right dekh raha hai (Player):
        // '- 5' karne se box 5px LEFT (andar) ki taraf khisak jayega
        hitboxX = this.x + frame.w - 15 - 1;
      } else {
        // Agar Left dekh raha hai (Enemy/Goku):
        // '+ 5' karne se box 5px RIGHT (andar) ki taraf khisak jayega
        hitboxX = this.x - boxWidth + 15 + 1;
      }

      return {
        x: hitboxX,
        y: this.y + frame.h / 4, // Yahan se Upar-Neeche adjust kar sakte ho
        w: boxWidth,
        h: boxHeight,
      };
    }
    // ==========================================================
    // NAYA: EXTRA ATTACK KA CUSTOM RED BOX (Frame 2 par)
    // ==========================================================
    if (this.state === "extraAttack" && this.frameIndex === 1) {
      let frame = this.data[this.state][1];

      let boxWidth = 30; // Hell Punch size
      let boxHeight = frame.h / 2 + 20; // Hell Punch height boost

      let hitboxX;
      if (this.scaleX === 1) {
        hitboxX = this.x + frame.w - 15 - 3;
      } else {
        hitboxX = this.x - boxWidth + 15 + 2;
      }

      return {
        x: hitboxX,
        y: this.y + frame.h / 4 - 10,
        w: boxWidth,
        h: boxHeight,
      };
    }

    /*
// ==========================================================
// NAYA: SMASH KICK KA CUSTOM RED BOX
// ==========================================================
if (this.state === "smashKick" && this.frameIndex === 2) {
let frame = this.data[this.state][2];

let boxWidth = 25; // Same as Smash Punch
let boxHeight = frame.h / 2; // Same as Smash Punch

let hitboxX;
if (this.scaleX === 1) {
hitboxX = this.x + frame.w - 15 - 2;
} else {
hitboxX = this.x - boxWidth + 15 + 2;
}

return {
x: hitboxX,
y: this.y + frame.h / 4,
w: boxWidth,
h: boxHeight
};
}*/
    // ==========================================================
    // 🔥 SMASH KICK HITBOX (Sirf Deku ka 6-Frame OP vs Baaki Characters ka Normal)
    // ==========================================================
    if (this.state === "smashKick") {
      // A. 🟢 SIRF DEKU KE LIYE (Frame 4 Launch Kick aur Frame 6 Drop Kick par Red Box):
      // if (this.id === "player") {
      // Frame 4 (Index 3): Launch Kick Hitbox
      //  if (this.frameIndex === 4) {
      if (
        this.id === "player" ||
        this.charRole === "player" ||
        (this.imageUrl && this.imageUrl.includes("deku"))
      ) {
        //   let currentAnim = this.data[this.state];
        // let frame =
        // currentAnim && currentAnim[this.frameIndex]
        //     ? currentAnim[this.frameIndex]
        // : this.data["idle"][0];
        // if (!frame) return null;

        /*  if (this.frameIndex === 4) {
          let boxWidth = 35;
          let boxHeight = 45;
          let hitboxX =
            this.scaleX === 1 ? this.x + 30 : this.x - boxWidth + 10;
          return { x: hitboxX, y: this.y + 10, w: boxWidth, h: boxHeight };
        }*/

        if (this.frameIndex === 4) {
          return {
            x: this.scaleX === 1 ? this.x + 30 : this.x - 25,
            y: this.y + 10,
            w: 35,
            h: 45,
          };
        }

        // Frame 6 (Index 5): Head Drop Kick Hitbox
        /*  if (this.frameIndex === 5) {
          let boxWidth = 45;
          let boxHeight = 45;
          let hitboxX = this.x - 10;
          return { x: hitboxX, y: this.y - 15, w: boxWidth, h: boxHeight };
        }
        // Frame 1, 2, 3, 5 par koi Red Box nahi (Slide & Teleport me safe):
        return null;
      }*/
        if (this.frameIndex === 5) {
          return { x: this.x - 10, y: this.y - 15, w: 45, h: 45 };
        }
        return null;
      }

      // B. 🔵 BAAKI CHARACTERS KE LIYE (Goku SSB / Teammates ka puraana 3-frame normal box):
      if (this.frameIndex === 2) {
        let animArray = this.data[this.state];
        let frame = animArray && animArray ? animArray : this.data["idle"][0];
        let boxWidth = 25;
        let boxHeight = frame.h / 2;
        let hitboxX =
          this.scaleX === 1
            ? this.x + frame.w - 15 - 2
            : this.x - boxWidth + 15 + 2;
        return {
          x: hitboxX,
          y: this.y + frame.h / 4,
          w: boxWidth,
          h: boxHeight,
        };
      }
      return null;
    }
    // ==========================================================
    // NAYA: HELL PUNCH KA CUSTOM RED BOX
    // ======================================================
    if (
      this.state === "hellPunch" &&
      this.frameIndex === 3 &&
      (this.id === "enemy" || this.id === "teammate")
    ) {
      let frame = this.data[this.state][3]; // 4th Frame

      let boxWidth = 30; // Hell Punch ka thoda lamba box
      let boxHeight = frame.h / 2 + 20;

      let hitboxX;
      if (this.scaleX === 1) {
        hitboxX = this.x + frame.w - 15 - 2;
      } else {
        hitboxX = this.x - boxWidth + 15 + 2;
      }

      return {
        x: hitboxX,
        y: this.y + frame.h / 4 - 5,
        w: boxWidth,
        h: boxHeight,
      };
    }
    // ==========================================================
    // 🔥 NAYA: JIREN HELL PUNCH (Frame 3,4,5,6 Hitbox)
    // ==========================================================
    if (this.state === "hellPunch" && this.id === "teammate2") {
      // Frame 1 aur 2 (Index 0 aur 1) par koi Hitbox nahi (Sirf Pose)
      if (this.frameIndex < 2 || this.frameIndex > 5) return null;

      // Agar aage ki photos load nahi hui toh crash se bacho
      if (!this.data[this.state] || !this.data[this.state][this.frameIndex])
        return null;

      let frame = this.data[this.state][this.frameIndex];

      // 🎛️ Exact Deku wala Size aur Reach
      let boxWidth = 85; // Bada dabba
      let boxHeight = 60;
      let reachForward = -50; // Aage tak maarne ki reach

      let hitboxX;
      if (this.scaleX === 1) {
        hitboxX = this.x + frame.w - 15 + reachForward;
      } else {
        hitboxX = this.x - boxWidth + 15 - reachForward;
      }

      return {
        x: hitboxX,
        y: this.y + frame.h / 4,
        w: boxWidth,
        h: boxHeight,
      };
    }

    if (
      this.state === "hellKick" &&
      this.frameIndex === 3 &&
      (this.id === "enemy" || this.id === "teammate")
    ) {
      let frame = this.data[this.state][3]; // 4th Frame

      let boxWidth = 35; // Hell Kick thodi aage tak jayegi
      let boxHeight = frame.h / 2 + 10;

      let hitboxX;
      if (this.scaleX === 1) {
        hitboxX = this.x + frame.w - 15 - 2;
      } else {
        hitboxX = this.x - boxWidth + 15 + 2;
      }

      return {
        x: hitboxX,
        y: this.y + frame.h / 4,
        w: boxWidth,
        h: boxHeight,
      };
    }

    // ==========================================================
    // 🔥 NAYA: DEKU HELL KICK HITBOX (Sirf Frame 2 par aayega)
    // ==========================================================
    if (this.state === "hellKick") {
      // 2nd Frame yani Index 1
      if (this.frameIndex === 4) {
        let frame = this.data[this.state][1];
        let boxWidth = 45;
        let boxHeight = frame.h / 1.5;

        let hitboxX =
          this.scaleX === 1 ? this.x + frame.w - 20 : this.x - boxWidth + 20;

        return {
          x: hitboxX,
          // Y mein '- 20' kiya taaki kick neeche Goku ke sar (head) par lage
          y: this.y - 10,
          w: boxWidth,
          h: boxHeight,
        };
      }
      // Agar Frame 1 ya Frame 3 chal raha hai, toh Box GAYAB!
      return null;
    }

    // ==========================================================

    // (Iske neeche tumhara Kamehameha wala code shuru hoga...)

    if (this.state === "kamehameha" && this.frameIndex === 6) {
      let gokuBodyWidth = 60;

      let currentWidth = gokuBodyWidth + (this.beamTimer || 0) * 40;

      let maxWidth = this.data[this.state][6].w;

      if (currentWidth > maxWidth) currentWidth = maxWidth;

      // Tumhari set ki hui perfect values

      let gapFromHand = -6;

      let tipAdjustment = -6;

      let beamLength = currentWidth - gokuBodyWidth - tipAdjustment;

      if (beamLength < 0) return null;

      // Left aur Right dono ka ekdum accurate Hitbox logic

      let hitboxX;

      if (this.scaleX === 1) {
        hitboxX = this.x + gokuBodyWidth + gapFromHand;
      } else {
        hitboxX = this.x - beamLength - gapFromHand;
      }

      return {
        x: hitboxX,

        y: this.y + 8, // Tumhara perfect set kiya hua Y

        w: beamLength,

        h: 40, // Tumhara perfect set kiya hua H
      };
    }

    // ==========================================================
    // NAYA: DEKU HELL PUNCH (BADA AUR AAGE WALA BOX)
    // ==========================================================
    if (this.state === "hellPunch" && this.id === "player") {
      // Ye teeno frames ke liye chalega kyunki humne frameIndex lock nahi kiya
      let frame = this.data[this.state][this.frameIndex];

      // 🎛️ 1. BOX KO BADA KARNA HAI (SIZE)
      let boxWidth = 45; // Normal punch lagbhag 20-25 hota hai, isko 45 kar diya (Bada box)
      let boxHeight = frame.h / 1.5; // Normal se thoda lamba bhi kar diya

      // 🎛️ 2. BOX KO AAGE KHISKANA HAI (REACH)
      let reachForward = -20; // 👈 IS NUMBER KO BADHAOGE TOH BOX AUR AAGE JAYEGA!

      let hitboxX;
      if (this.scaleX === 1) {
        // Agar Deku Right dekh raha hai
        hitboxX = this.x + frame.w - 15 + reachForward;
      } else {
        // Agar Deku Left dekh raha hai
        hitboxX = this.x - boxWidth + 15 - reachForward;
      }

      return {
        x: hitboxX,
        y: this.y + frame.h / 4,
        w: boxWidth,
        h: boxHeight,
      };
    }
    // 🔥 NAYA: 1-Frame Attack Logic (Deku ka Smash Punch aur Goku SSB ka Smash Kick)
    if (
      (this.state === "smashPunch" && this.id === "player") ||
      (this.state === "smashKick" && this.id === "teammate")
    ) {
      // Ye line ensure karegi ki box hamesha dikhe, animation chahe kitni bhi fast ho!
      // Ye line ensure karegi ki box hamesha dikhe, animation chahe kitni bhi fast ho!
      let animArray = this.data[this.state];
      if (!animArray || animArray.length === 0) return null;
      // Exact Normal Punch wale W aur H (Jaisa tune bola tha)
      let frame = animArray[0];
      if (!frame) return null;
      let attackReach = 15;
      let offset = 15;
      let boxWidth = attackReach + offset / 2; // Exact Normal Punch Width
      let boxHeight = frame.h / 2; // Exact Normal Punch Height

      let hitboxX =
        this.scaleX === 1
          ? this.x + frame.w - offset
          : this.x - attackReach + offset;

      return {
        x: hitboxX,
        y: this.y + frame.h / 4,
        w: boxWidth,
        h: boxHeight,
      };
    }

    // ==========================================================
    // 🛡️ THE FINAL SAFETY LOCK (Normal Punch/Kick ke liye)
    // ==========================================================
    if (
      this.state === "punch" ||
      this.state === "kick" ||
      (this.state === "hellPunch" && this.id === "player")
      // 👈 YAHAN SE MAINE SMASH PUNCH HATA DIYA HAI TAAKI CLASH NA HO!
    ) {
      // Sirf Frame 1 aur 2 par Red Box banega! (Index 1)
      if (this.frameIndex !== 1 && this.frameIndex !== 2) {
        return null;
      }
    }

    // ... (iska neeche ka code waisa hi rahega)

    // NORMAL HITBOX (Punch/Kick ke liye)

    let currentAnim = this.data[this.state];

    let frame =
      currentAnim && currentAnim[this.frameIndex]
        ? currentAnim[this.frameIndex]
        : this.data["idle"][0];

    let attackReach = 10;

    if (this.state === "kick") attackReach = 20;

    if (this.id === "enemy") attackReach += 5;

    let offset = 15;

    return {
      x:
        this.scaleX === 1
          ? this.x + frame.w - offset
          : this.x - attackReach + offset,

      y: this.y + frame.h / 4,

      w: attackReach + offset / 2,

      h: frame.h / 2,
    };
  }
  // ... (baaki purana jump physics aur updateCSS waisa hi rahega)
  update(gameWidth) {
    if (this.state === "death") {
      if (this.y > 40) {
        // Agar hawa mein mara hai toh zameen par girega
        this.velocityY -= this.gravity;
        this.y += this.velocityY;
      } else {
        this.y = 40; // Zameen par aakar freeze ho jayega
        this.kbVelocityX = 0;
      }
      this.updateCSS();
      return; // Engine yahan se aage nahi badhega (Dead body hil nahi sakti!)
    }
    if (this.state === "extraAttack") {
      this.moveLeft = false;
      this.moveRight = false;
      this.kbVelocityX = 0;
      this.velocityY = 0;
    }

    // 🛑 YEH 7 LINES ADD KAREIN (Taki dushman hawa me na gire):
    if (this.isGrabbedBySSB) {
      this.velocityY = 0;
      this.kbVelocityX = 0;
      this.jumping = true;
      if (DEBUG_MODE) this.drawDebug();
      return;
    }
    // 🌀 GOKU SSB 60 FPS ROTATING GRAB LOCK:
    if (
      this.state === "mediumAttack" &&
      this.id === "teammate" &&
      this.grabbedEnemy
    ) {
      let t = this.grabbedEnemy;
      t.isGrabbedBySSB = true;
      t.state = "hit";
      t.jumping = true;
      t.velocityY = 0;
      t.kbVelocityX = 0;

      let fwd = 28;
      let oy = 23;
      let rot = 0;
      if (this.frameIndex === 0) {
        fwd = 28;
        oy = 23;
        rot = 0;
      } else {
        if (this.spinPhase === 0) {
          fwd = 0; // 1. Down (Neeche)
          oy = -5;
          rot = 270;
        } else if (this.spinPhase === 1) {
          fwd = -32; // 2. Peeche (Thoda sa gap)
          oy = 18;
          rot = 180;
        } else if (this.spinPhase === 2) {
          fwd = 0; // 3. Upar
          oy = 52;
          rot = 90;
        } else if (this.spinPhase === 3) {
          fwd = 32; // 4. Aage (Thoda sa gap)
          oy = 18;
          rot = 0;
        }
      }

      // 🔄 DUSHMAN GOKU KE SATH SATH GOL GHOOMEGA + ANGLE BADLEGA:
      // Peeche ulta
      let rightForward = this.scaleX === 1 ? 20 : 10;
      t.x = this.x + this.scaleX * fwd + rightForward;
      t.y = this.y + oy;
      let finalRot = this.scaleX === 1 ? rot : -rot;
      // Real-time Visual Rotation
      let finalRenderX = t.x - window.cameraX;
      let finalRenderY = t.y - window.cameraY;
      t.element.style.left = finalRenderX + "px";
      t.element.style.bottom = finalRenderY + "px";
      t.element.style.transform = `scaleX(${this.scaleX}) rotate(${finalRot}deg)`;
    }

    // =========================================================
    // 🚀 FRIEZA MISSILE BOUNCE PHYSICS (Deewar se takrakar palatna)
    // =========================================================
    /*  if (
      this.state === "mediumAttack" &&
      this.id === "enemy2" &&
      this.bulletFired
    ) {*/
    if (
      this.state === "mediumAttack" &&
      this.imageUrl &&
      this.imageUrl.includes("frieza") &&
      this.bulletFired
    ) {
      this.x += this.friezaVx || 0;
      this.y += this.friezaVy || 0;
      this.jumping = true; // Hawa mein tairta rahega
      this.velocityY = 0;
      if (this.friezaVx > 0) this.scaleX = 1;
      else if (this.friezaVx < 0) this.scaleX = -1;
      // Gravity ka asar zero
      const minLeft = 20;
      const maxRight = (game ? game.clientWidth : WORLD_WIDTH) - 80;

      const minGround = 40;
      const maxSky = 220;
      let wallBounced = false;
      if (this.x <= minLeft) {
        this.x = minLeft;
        this.friezaVx = Math.abs(this.friezaVx || 60); // 👉 HAMESHA RIGHT MEIN FEKO!
        this.scaleX = 1;
        wallBounced = true;
      } else if (this.x >= maxRight) {
        this.x = maxRight;
        this.friezaVx = -Math.abs(this.friezaVx || 60); // 👈 HAMESHA LEFT MEIN FEKO!
        this.scaleX = -1;
        wallBounced = true;
      }
      const angleRad = (35 * Math.PI) / 180;
      const tirchhaVy = Math.round(
        Math.abs(this.friezaVx || 60) * Math.tan(angleRad)
      );
      // 🏓 2. Zameen & Aasmaan (Sirf unchai control hogi, speed 0 nahi hogi!):
      if (this.y < minGround) {
        this.y = minGround;
        this.friezaVy = Math.abs(tirchhaVy, 20);
      } else if (this.y > maxSky) {
        this.y = maxSky;
        this.friezaVy = -Math.abs(tirchhaVy, 20);
      }
      if (wallBounced) {
        let target = getSmartTarget(this);
        if (target && target.health > 0) {
          let dy = target.y - this.y;
          // Dushman agar hawa me ya zameen par ho toh Frieza uski height par angle banayega:
          if (Math.abs(dy) > 15) {
            this.friezaVy = (dy > 0 ? 1 : -1) * 25;
          }
        }
      }
    }
    // 🏓 1. LEFT / RIGHT WALL BOUNCE (Deewar par lagte hi paltega)

    if (this.comboTimer > 0) {
      this.comboTimer--;
      if (this.comboTimer <= 0) {
        this.comboCount = 0; // Hit ginti wapas 0
        if (this.comboElementId) {
          let el = document.getElementById(this.comboElementId);
          if (el) el.style.opacity = 0; // 👈 2 second pure hote hi turant gayab!
        }
      }
    }

    // Saare text ek sath screen se gayab kar do!
    /* let ids = [
          "p1-combo",
          "t1-combo",
          "t2-combo",
          "t3-combo",
          "t4-combo",
          "t5-combo", // 👈 Added
          "t6-combo",
          "t7-combo",
          "p2-combo",
          "f1-combo",
          "s1-combo",
          "sasuke-combo",
          "e4-combo",
          "e5-combo", // 👈 Added
          "e6-combo",
          "e7-combo",
        ];*/
    /* let myComboId =
          this.team === "p1"
            ? [
                "p1-combo",
                "t1-combo",
                "t2-combo",
                "t3-combo",
                "t4-combo",
                "t5-combo",
                "t6-combo",
                "t7-combo",
              ][teamAFighters.indexOf(this)]
            : [
                "p2-combo",
                "f1-combo",
                "s1-combo",
                "sasuke-combo",
                "e4-combo",
                "e5-combo",
                "e6-combo",
                "e7-combo",
              ][teamBFighters.indexOf(this)];
        //ids.forEach((id) => {
        // let el = document.getElementById(id);
        //  if (el) el.style.opacity = 0; // Gayab!
        //  });
        let el = document.getElementById(myComboId);
        if (el) el.style.opacity = 0;
      }
    }*/
    /* this.comboCount = 0; // Hit count wapas 0
        const p1Slots = [
          "p1-combo",
          "t1-combo",
          "t2-combo",
          "t3-combo",
          "t4-combo",
          "t5-combo",
          "t6-combo",
          "t7-combo",
        ];
        const enemySlots = [
          "p2-combo",
          "f1-combo",
          "s1-combo",
          "sasuke-combo",
          "e4-combo",
          "e5-combo",
          "e6-combo",
          "e7-combo",
        ];
        let idx =
          this.team === "p1"
            ? teamAFighters.indexOf(this)
            : teamBFighters.indexOf(this);
        if (idx === -1) {
          idx = activeMatchFighters
            .filter((f) => f.team === this.team)
            .indexOf(this);
        }
        let myComboId =
          this.team === "p1"
            ? p1Slots[idx] || "p1-combo"
            : enemySlots[idx] || "p2-combo";
        let el = document.getElementById(myComboId);
        if (el) el.style.opacity = 0;
      }
    }*/

    if (Math.abs(this.kbVelocityX) > 0.5) {
      this.x += this.kbVelocityX; // Character ko peeche dhakelo
      this.kbVelocityX *= 0.85; // 85% Friction: Har frame par speed dre-dre kam hogi (Smooth stop)

      // Boundary Wall Check (Screen se bahar na gire)
      const padding = 20;
      if (this.x < padding) {
        this.x = padding;
        this.kbVelocityX = 0;
      }
      if (this.x > WORLD_WIDTH - this.element.offsetWidth - padding) {
        this.x = WORLD_WIDTH - this.element.offsetWidth - padding;
        this.kbVelocityX = 0;
      }
    } else {
      this.kbVelocityX = 0; // Speed khatam, slide ruk gayi
    }
    if (this.state === "hit" || this.state === "death") {
      if (DEBUG_MODE) this.drawDebug();

      this.updateCSS();
    }

    if (
      !this.isAttacking &&
      !this.jumping &&
      this.state !== "hit" &&
      this.state !== "death" &&
      this.state !== "block"
    ) {
      // Added block check here too
      if (this.moveLeft) {
        this.x -= 5;
        this.scaleX = -1;
        this.setState("run");
      } else if (this.moveRight) {
        this.x += 5;
        this.scaleX = 1;
        this.setState("run");
      } else {
        // Agar dash mein nahi hai tabhi idle ho
        if (
          this.state !== "dash" &&
          this.state !== "teleport" &&
          this.state !== "instantTransmission"
        ) {
          this.setState("idle");
        }
      }
    } else if (
      this.isAttacking &&
      !this.jumping &&
      (this.state === "punch" || this.state === "kick")
    ) {
      let combatWalkSpeed = 3; // Attack karte waqt thodi slow speed hogi
      let target = getSmartTarget(this); // 🎯 Asali dushman ko target karega (Bhoot gayab!)
      // 👈 Ab Teammate bhi Enemy ko target karega!
      if (
        this.state === "smashPunch" ||
        this.state === "smashKick" ||
        this.state === "kamehameha" ||
        this.state === "mediumAttack" ||
        this.state === "dash"
      )
        combatWalkSpeed = 8;
      if (
        this.state === "hellPunch" ||
        this.state === "hellKick" ||
        this.state === "extraAttack" ||
        this.state === "kiBlast"
      )
        combatWalkSpeed = 14;
      // 🛡️ ACTUAL BLUE BOX DATA LO
      if (target) {
        let myBox = this.getHurtbox();
        let targetBox = target.getHurtbox();

        // 👈 TUNE BOLA THA 1px, AB YE EXACTLY 1px KAAM KAREGA!
        let minGap = 1;
        if (this.moveLeft) {
          this.scaleX = -1;
          let enemyIsBlockingWay =
            target.x < this.x &&
            myBox.x - (targetBox.x + targetBox.w) <= minGap;

          if (!enemyIsBlockingWay) {
            this.x -= combatWalkSpeed;
          }
          // Uss taraf ghoom kar maarega
        } else if (this.moveRight) {
          this.scaleX = 1;
          let enemyIsBlockingWay =
            target.x > this.x && targetBox.x - (myBox.x + myBox.w) <= minGap;

          if (!enemyIsBlockingWay) {
            this.x += combatWalkSpeed;
          }
        }
      }
    } else if (this.jumping) {
      if (this.moveLeft) {
        this.x -= 3;
        this.scaleX = -1;
      }
      if (this.moveRight) {
        this.x += 3;
        this.scaleX = 1;
      }
    }

    const padding = 20;
    if (this.x < padding) this.x = padding;
    if (this.x > WORLD_WIDTH - this.element.offsetWidth - padding) {
      this.x = WORLD_WIDTH - this.element.offsetWidth - padding;
    }

    // ==========================================
    // JUMP PHYSICS (HOVER FIX - Gravity paused during KiBlast)
    // ==========================================
    /*if (this.jumping) {
// Jab tak KiBlast state hai, player hawa mein freeze (tairta) rahega
if (this.state !== "kiBlast" && this.state !== "extraAttack" && this.state !== "dash") {
this.velocityY -= this.gravity;
this.y += this.velocityY;
}

if (this.y <= 40) {
this.y = 40;
this.jumping = false;
this.velocityY = 0;
this.isAttacking = false;
this.setState("idle");
}
}*/
    // ==========================================
    // 🌍 JUMP & GRAVITY (100% SAFE & SIMPLE)
    // ==========================================
    // ⚡ Agar koi teleport ya attack se hawa mein reh gaya ho, toh gravity chalu ho jaye:
    if (this.y > 40 && !this.jumping && this.state !== "mediumAttack") {
      this.jumping = true;
    }

    // 🦘 AAPKA NORMAL JUMP CODE (Bina kisi timer ya exception ke):
    if (this.jumping && this.state !== "mediumAttack") {
      if (
        this.state !== "kiBlast" &&
        this.state !== "extraAttack" &&
        this.state !== "dash" &&
        this.state !== "smashKick"
      ) {
        this.velocityY -= this.gravity;
        this.y += this.velocityY;
      }
      // 🛑 Zameen par landing:
      if (this.y <= 40) {
        this.y = 40;
        this.jumping = false;
        this.velocityY = 0;
        if (
          this.state !== "hellAttack" &&
          this.state !== "smashKick" &&
          this.state !== "hit"
        ) {
          this.isAttacking = false;
          this.setState("idle");
        }
      }
    }
    this.updateCSS();
    if (DEBUG_MODE) this.drawDebug();
  }
  updateCSS() {
    /*
if (!this.activeInBattle && gameStarted) {
this.element.style.display = "none";
this.element.style.zIndex = "-999";
return;
}*/

    let visualY = this.y;
    let visualX = this.x; // NAYA: Goku ko ek jagah fix rakhne ke liye
    let rotation = 0;
    // if (
    //    this.charRole === "enemy3" ||
    //    this.id === "enemy3" ||
    //    this._uniqueId === "enemy3"
    //  ) {
    //   visualY -= 8; // 👈 Sukuna ko baaki sab ke barabar zameen par set kiya (10px - 15px adjust kar sakte ho)
    //  }

    // if (this.state === "kamehameha") {
    if (
      this.state === "kamehameha" &&
      this.imageUrl &&
      this.imageUrl.includes("gokublack")
    ) {
      // 1. CHARGE FRAMES (Zameen par rakho)
      if (this.frameIndex < 6) {
        visualY = this.y; // Koi offset nahi, Goku normal khada rahega
      }
      // 2. BEAM FRAME (Goku ko fix karo aur offset lagao)
      else if (this.frameIndex === 6) {
        visualY = this.y - 35; // Tumhara set kiya hua perfect Y (Neeche ka aura)

        let gokuBodyWidth = 60;
        let currentWidth = gokuBodyWidth + (this.beamTimer || 0) * 40;
        let maxWidth = this.data[this.state][6].w;
        if (currentWidth > maxWidth) currentWidth = maxWidth;

        let fullBeamLength = currentWidth - gokuBodyWidth;

        // THE AURA FIX: Peeth ke peeche ka pink aura Goku ko aage dhakka de raha tha.
        // Is offset se hum usko wapas peeche kheenchenge!
        let auraOffset = -2; // Isko adjust karke dekhna (20, 25 ya 30) jab tak Goku ekdum Blue Box me fit na baith jaye.

        if (this.scaleX === 1) {
          // Right Facing: Image ko thoda peeche (left) khiskao
          visualX = this.x - auraOffset;
        } else {
          // Left Facing: Image ko forcibly apni jagah roko aur offset lagao
          visualX = this.x - fullBeamLength + auraOffset;
        }
      }
    }

    // Yahan x ki jagah visualX use karna zaroori hai!
    // ==========================================
    // NAYA JADOO: EXTRA ATTACK MEIN GOKU KO TIRCHA KARNA
    // ==========================================
    // Jab Goku hawa mein ho (Frame 4 se lekar aakhiri frame tak)
    if (this.state === "extraAttack" && this.frameIndex >= 3) {
      rotation = 45; // 45 degree jhuka diya!
    }
    let finalRenderX = visualX - window.cameraX;
    let finalRenderY = visualY - window.cameraY;
    this.element.style.left = finalRenderX + "px";
    this.element.style.bottom = finalRenderY + "px";
    // NAYA: rotate(${rotation}deg) jod diya gaya hai
    this.element.style.transform = `scaleX(${this.scaleX}) rotate(${rotation}deg)`;

    // ScaleX se direction palat do aur angle
    // ==========================================
    // 🔥 NAYA: DASH VFX KI POSITION, DISTANCE & FAST ANIMATION
    // ==========================================
    if (this.vfxElement && this.state === "dash") {
      // 1. ⚡ FAST ANIMATION LOGIC (Engine se alag tez speed)
      this.vfxTick = (this.vfxTick || 0) + 1;
      let speed = 1; // 🔥 SPEED CONTROL: 1 = Sabse Tez, 2 = Normal Tez, 3 = Thoda Slow

      if (this.vfxTick >= speed) {
        this.vfxFrame++;
        if (this.vfxFrame > 7) this.vfxFrame = 1; // 7 frames ka loop
        this.vfxElement.style.backgroundImage = `url("assets/dash/${this.vfxFrame}.png")`;
        this.vfxTick = 0; // Tick reset
      }
      this.vfxElement.style.display = "block"; // VFX Show karo

      // 2. 🎯 DISTANCE & POSITION CONTROL
      let vfxWidth = 120; // Dhool ki lambai
      let distance = 25;
      let offsetY = -25; // Isey badaoge toh dhool upar jayegi, Minus (-) karoge toh neeche jayegi.
      // 🔥 GAP CONTROL: Isko badaoge (jaise 45 ya 50) toh dhool player ke aur PAAS aayegi!
      let vfxX;
      let vfxScale = this.scaleX === 1 ? -1 : 1;
      if (this.scaleX === 1) {
        // Right bhag raha hai (Dhool Left mein)
        vfxX = this.x - vfxWidth + distance;
      } else {
        // Left bhag raha hai (Dhool Right mein)
        let playerWidth = 60;
        vfxX = this.x + playerWidth - distance;
      }

      // Camera offset set
      let baseRotation = 35;
      // 3. 🌪️ 4-DIRECTION ROTATION
      let vfxRotation = baseRotation;
      if (this.moveUp) {
        vfxRotation = baseRotation + 95;
        offsetY = -90;
        vfxX = this.x - 30; // Upar dash
      } else if (this.moveDown) {
        vfxRotation = baseRotation - 85;

        offsetY = 45;
        vfxX = this.x - 35;
        // Neeche dash
      }
      this.vfxElement.style.left = vfxX - window.cameraX + "px";
      this.vfxElement.style.bottom = finalRenderY + offsetY + "px";
      this.vfxElement.style.transform = `scaleX(${vfxScale}) rotate(${vfxRotation}deg)`;
      // ScaleX aur angle ek sath!
    } else if (this.vfxElement) {
      // Dash band, toh dhool turant gayab
      this.vfxElement.style.display = "none";
      this.vfxFrame = 1;
    }
    // 🔥 NAYA: OVERHEAD BAR KO SIR KE UPAR CHIPKANA
    /*if (this.miniBar) {
      if (
        this.state === "death" ||
        !this.activeInBattle ||
        this.isControlledByPlayer ||
        (typeof currentEnemyLeader !== "undefined" &&
          this === currentEnemyLeader)
      ) {
        this.miniBar.style.display = "none"; // Marne par bar gayab
      } else {
        this.miniBar.style.display = "flex";
        let hurt = this.getHurtbox();
        // X = Center mein, Y = Hurtbox ki height se 15px upar
        let barX = hurt.x - window.cameraX + hurt.w / 2 - 30;
        let barY = hurt.y - window.cameraY + hurt.h + 15;

        this.miniBar.style.left = barX + "px";
        this.miniBar.style.bottom = barY + "px";
      }
    }*/
    // 🎯 1. Overhead Mini Bar: Har Enemy aur Teammate ke sar par dikhega!
    if (this.miniBar) {
      if (
        this.state === "death" ||
        !this.activeInBattle ||
        this.isControlledByPlayer
      ) {
        this.miniBar.style.display = "none";
      } else {
        this.miniBar.style.display = "flex";
        let hurt = this.getHurtbox();
        let barX = hurt.x - window.cameraX + hurt.w / 2 - 30; // Exact center
        let barY = hurt.y - window.cameraY + hurt.h + 15;
        this.miniBar.style.left = barX + "px";
        this.miniBar.style.bottom = barY + "px";
      }
    }

    // 🎯 2. 1P / ENEMY Arrow Badge position:
    if (this.badge) {
      if (this.state === "death" || !this.activeInBattle) {
        this.badge.style.display = "none";
      } else {
        this.badge.style.display = "block";
        let hurt = this.getHurtbox();
        let bx = hurt.x + hurt.w / 2;
        let by =
          hurt.y +
          hurt.h +
          (this.miniBar && this.miniBar.style.display !== "none" ? 22 : 10);
        this.badge.style.left = bx + "px";
        this.badge.style.bottom = by + "px";
      }
    }
  }

  drawDebug() {
    let hurt = this.getHurtbox();
    if (!this.activeInBattle && gameStarted) {
      if (this.hurtboxDiv) this.hurtboxDiv.style.display = "none";
      if (this.hitboxDiv) this.hitboxDiv.style.display = "none";
      return;
    }

    this.hurtboxDiv.style.left = hurt.x - window.cameraX + "px";
    this.hurtboxDiv.style.bottom = hurt.y - window.cameraY + "px";
    this.hurtboxDiv.style.width = hurt.w + "px";
    this.hurtboxDiv.style.height = hurt.h + "px";
    this.hurtboxDiv.style.display = "block";

    let hit = this.getHitbox();
    if (hit) {
      this.hitboxDiv.style.left = hit.x - window.cameraX + "px";
      this.hitboxDiv.style.bottom = hit.y - window.cameraY + "px";
      this.hitboxDiv.style.width = hit.w + "px";
      this.hitboxDiv.style.height = hit.h + "px";
      this.hitboxDiv.style.display = "block";
    } else {
      this.hitboxDiv.style.display = "none";
    }
  }

  animate() {
    window.currentAnimatingFighter = this;
    let currentFrames = this.data[this.state];
    let role = this.charRole || this.id;
    if (!currentFrames || currentFrames.length === 0) {
      this.isAttacking = false;
      this.state = "idle";
      this.frameIndex = 0;
      return;
    }
    const isSasukeProfile =
      this.id === "sasuke" ||
      this.charRole === "sasuke" ||
      (this.imageUrl && this.imageUrl.includes("sasuke"));
    const isDekuProfile =
      this.id === "player" ||
      this.charRole === "player" ||
      (this.imageUrl && this.imageUrl.includes("deku"));
    const isItachiProfile =
      this.id === "teammate3" ||
      this.charRole === "teammate3" ||
      (this.imageUrl && this.imageUrl.includes("itachi"));

    // ==========================================================
    // 🟢 DEKU OP CINEMATIC SMASH KICK (Slide -> Teleport -> 25 Vy Launch -> Air Teleport -> Head Kick)
    // ==========================================================
    // ==========================================================
    // 🌀 GOKU SSB - SPIN & THROW GRAB ATTACK (Medium Attack)
    // ==========================================================
    if (this.state === "mediumAttack" && this.id === "teammate") {
      let currentFrames = this.data.mediumAttack;

      // 1. Frame 1 (Index 0): Shuruwati Pose
      if (this.frameIndex === 0) {
        let grabFrameIdx = 1;
        this.showFrame(currentFrames[grabFrameIdx]);
        this.spinCount = 0;
        this.spinPhase = 0;
        this.grabbedEnemy = null;
        let target = getSmartTarget(this);
        if (target && target.activeInBattle && target.health > 0) {
          let diffX = target.x - this.x;
          let isInFront = diffX * this.scaleX > 0; // Kya dushman saamne hai?
          let dist = Math.abs(diffX);
          let maxGrabDist = this.scaleX === 1 ? 80 : 55;
          if (isInFront && dist <= maxGrabDist) {
            let hitB = this.getHitbox();

            if (
              hitB &&
              isColliding(hitB, target.getHurtbox()) &&
              target.state !== "teleport" &&
              target.state !== "dash"
            ) {
              this.grabbedEnemy = target;
              target.isGrabbedBySSB = true;
              target.isAttacking = false;
              target.isBlocking = false;
              target.setState("hit");
              playSfx("kick", 2);
            }
          }
        }

        if (!this.grabbedEnemy) {
          this.spinCount = 0;
          this.spinPhase = 0;
          this.frameIndex = 0;
          this.isAttacking = false;
          this.setState("idle");
          return;
        }
        this.frameIndex = 1; // Seedha Frame 2 se 5 ke loop par jao
        this.spinPhase = 0;
        return;
      }

      // 2. Frame 2 (Index 1): 0-Damage Grab Box (Pakadne wala frame)
      if (this.frameIndex === 1) {
        this.spinPhase = this.spinPhase || 0;
        let currentFrameIdx = 4 - this.spinPhase;

        this.showFrame(currentFrames[currentFrameIdx]);
        if (this.spinCount >= 2 && this.spinPhase === 2) {
          this.frameIndex = 5; // Frame 6 Throw
          return;
        }

        this.spinPhase++;
        if (this.spinPhase > 3) {
          this.spinPhase = 0;
          this.spinCount = (this.spinCount || 0) + 1;
        }
        return;
      }

      if (this.frameIndex === 5) {
        let throwIdx = 5;
        this.showFrame(currentFrames[throwIdx]); // Frame 6 Throw

        if (this.grabbedEnemy) {
          playSfx("punch", 1.5);
          let victim = this.grabbedEnemy;
          victim.isGrabbedBySSB = false; // 🔓 Gravity Lock OFF
          // zIndex reset
          victim.element.style.transform = `scaleX(${victim.scaleX})`;
          victim.takeHit(5, this.x, this.id);

          // 🚀 HELL DHAKKA (X: 16 Speed, Y Launch: 22):
          victim.applyKnockback("hellPunch", this.scaleX, 22);
          updateHealthBars();

          this.grabbedEnemy = null;
        }

        this.spinCount = 0;
        this.spinPhase = 0;

        this.frameIndex = 0;
        this.isAttacking = false;
        this.setState("idle");
        return;
      }
    }
    /* if (this.spinPhase === 0) {
          this.showFrame(currentFrames); // Frame 2: Right (Aage)
        } else if (this.spinPhase === 1) {
          this.showFrame(currentFrames); // Frame 3: Up (Upar)
        } else if (this.spinPhase === 2) {
          this.showFrame(currentFrames); // Frame 4: Left (Peeche)
        } else if (this.spinPhase === 3) {
          this.showFrame(currentFrames); // Frame 5: Down (Neeche)
        }*/

    /*
        if (!this.grabbedEnemy) {
          let target = getSmartTarget(this);
          if (target && target.activeInBattle && target.health > 0) {
            // Agar enemy is dabbe mein touch hua...

            let dist = Math.abs(target.x - this.x);
            if (dist > 45) {
              this.x += this.scaleX * Math.min(25, dist - 45);
            }
            let hitB = this.getHitbox();
            if (
              hitB &&
              isColliding(hitB, target.getHurtbox()) &&
              target.state !== "teleport" &&
              target.state !== "dash"
            ) {
              this.grabbedEnemy = target;
              target.isGrabbedBySSB = true;
              target.isAttacking = false;
              target.isBlocking = false;
              target.setState("hit");
              playSfx("kick", 2);
            }
          }
        }
        this.frameIndex = 2; // Spin shuru
        this.spinPhase = 0;
        return;
      }*/

    // 3. Frame 3, 4, 5 (Indices 2, 3, 4): ENEMY KO GOL GHUMANA (LOOP)
    /*if (this.frameIndex === 2) {
        this.spinPhase = this.spinPhase || 0;
        /*
        if (this.grabbedEnemy) {
          let t = this.grabbedEnemy;
          t.setState("hit");
          t.jumping = true;
          t.velocityY = 0;

          let offsetX =
            this.frameIndex === 2 ? 40 : this.frameIndex === 3 ? -10 : 35;
          let offsetY =
            this.frameIndex === 2 ? 30 : this.frameIndex === 3 ? 50 : 15;

          t.x = this.scaleX === 1 ? this.x + offsetX : this.x - offsetX;
          t.y = this.y + offsetY;
          t.scaleX = this.frameIndex % 2 === 0 ? 1 : -1;
        }
        if (this.spinPhase === 0) {
          this.showFrame(currentFrames[2]); // 1. Right pose
        } else if (this.spinPhase === 1) {
          this.showFrame(currentFrames[3]); // 2. Up pose
        } else if (this.spinPhase === 2) {
          this.showFrame(currentFrames[4]); // 3. Left pose
        } else if (this.spinPhase === 3) {
          this.showFrame(currentFrames[2]); // 4. Down pose
        }

        if (!this.grabbedEnemy) {
          let target = getSmartTarget(this);
          if (target && target.activeInBattle && target.health > 0) {
            let hitB = this.getHitbox();
            if (
              hitB &&
              isColliding(hitB, target.getHurtbox()) &&
              target.state !== "teleport" &&
              target.state !== "dash"
            ) {
              this.grabbedEnemy = target;
              target.isGrabbedBySSB = true;
              target.setState("hit");
            }
          }
        }*/
    //this.spinPhase++;

    // 🔄 LOOP LOGIC: 3,4,5 ke baad wapas 2 par jao
    /*  if (this.spinPhase > 3) {
          this.spinPhase = 0;
          this.spinCount = (this.spinCount || 0) + 1;

          // 3 Circles poore hone par Frame 6 (Throw) par jao:
          if (this.spinCount >= 3) {
            this.frameIndex = 5;
          }
        }
        return;
      }

      // 4. Frame 6 (Index 5): RELEASE & THROW (Hell Punch wala dhakka)
      if (this.frameIndex === 5) {
        let throwIdx = 5;
        this.showFrame(currentFrames[throwIdx]);

        if (this.grabbedEnemy) {
          playSfx("punch", 1.5);
          let victim = this.grabbedEnemy;
          victim.isGrabbedBySSB = false;
          // 🔓 Gravity Lock OFF
          victim.element.style.transform = `scaleX(${victim.scaleX})`;
          victim.takeHit(5, this.x, this.id);

          // 🚀 HELL PUNCH KA DHAKKA

          victim.applyKnockback("hellPunch", this.scaleX, 15);
          updateHealthBars();

          this.grabbedEnemy = null;
        }

        // 🛑 SUKOON (HOLD) HATA DIYA! Fenkne ke turant baad seedha free.
        this.spinCount = 0;
        this.spinPhase = 0;
        this.frameIndex = 0;

        this.isAttacking = false;
        this.setState("idle");

        return;
      }
    }*/

    //  if (this.state === "smashKick" && this.id === "player") {
    if (
      this.state === "smashKick" &&
      (this.id === "player" ||
        this.charRole === "player" ||
        (this.imageUrl && this.imageUrl.includes("deku")))
    ) {
      const [pose1, pose2, pose3, pose4, pose5, pose6] = currentFrames;
      // 1. Pose 1 (Intro)
      if (this.frameIndex === 0) {
        this.showFrame(pose1);
        this.frameIndex = 1;
        return;
      }

      // 2. Pose 2
      if (this.frameIndex === 1) {
        this.showFrame(pose2);
        this.frameIndex = 2;
        return;
      }

      // 3. Frame 3: Slide to Enemy (5px distance) -> Teleport Behind Enemy
      if (this.frameIndex === 2) {
        this.showFrame(pose3);
        let target = getSmartTarget(this);

        if (target && target.activeInBattle && target.health > 0) {
          this.scaleX = target.x > this.x ? 1 : -1;
          let dist = Math.abs(target.x - this.x);
          // 5px distance
          let stopDistance = 55;
          // Slide Speed (35px per tick)
          if (dist > stopDistance) {
            let slideSpeed = Math.min(40, dist - stopDistance);
            this.x += this.scaleX * slideSpeed;

            // Slide poora hone tak aage badho
            if (Math.abs(target.x - this.x) > stopDistance) {
              return;
            }
          }
          let behindGap = 45;
          this.x =
            target.scaleX === 1 ? target.x - behindGap : target.x + behindGap;
          this.scaleX = target.scaleX;
          this.y = target.y;
          this.jumping = target.y > 40;
          this.velocityY = 0;
        }

        this.frameIndex = 3;
        return;
      }
      // ⚡ Paas aate hi PEECHHE TELEPORT:

      // 4. Frame 4: 💥 Kick Launch (25 Y Knockback -> Dushman Hawa Me)
      if (this.frameIndex === 3) {
        this.showFrame(pose4);
        playSfx("kick", 2);

        let target = getSmartTarget(this);
        if (target && target.activeInBattle && target.health > 0) {
          target.takeHit(6, this.x, this);
          target.jumping = true;
          target.velocityY = 25; // 🚀 25 Y-Velocity se dushman aasmaan me!
          target.kbVelocityX = this.scaleX * 4;
          updateHealthBars();
        }

        this.frameIndex = 4;
        return;
      }

      // 5. Frame 5: ⚡ Teleport Pose -> Dushman ke sar ke upar aasmaan me
      if (this.frameIndex === 4) {
        this.showFrame(pose5);
        let target = getSmartTarget(this);
        if (target && target.activeInBattle && target.health > 0) {
          this.x = target.x;
          this.y = target.y + 60; // 🎯 Theek dushman ke sar ke upar!
          this.scaleX = target.scaleX;
          this.jumping = true;
          this.velocityY = 0;
        }

        this.frameIndex = 5;
        return;
      }

      // 6. Frame 6: 🦵 Dushman ke Sar ke upar Kick Slam -> Wapas Idle!
      if (this.frameIndex === 5) {
        this.showFrame(pose6);
        playSfx("kick", 2);

        let target = getSmartTarget(this);
        if (target && target.activeInBattle && target.health > 0) {
          target.takeHit(6, this.x, this);
          target.jumping = true;
          target.velocityY = -10; // Neeche zameen par slam
          updateHealthBars();
        }

        // 🛑 Wapas Normal Idle:
        this.isAttacking = false;
        this.setState(this.y > 40 ? "jump" : "idle");
        return;
      }
    }
    // ==========================================================
    // 🔵 GOKU SSB HELL ATTACK (Teleport -> Kick -> 90-Hold Beam)
    // ==========================================================
    if (this.state === "hellAttack" && this.id === "teammate") {
      // 1. START: Instant Transmission se dushman ke peechhe teleport
      if (!this.teleport1) {
        let target = getSmartTarget(this);
        if (target && target.activeInBattle && target.health > 0) {
          let gap = 45;
          this.x = target.scaleX === 1 ? target.x - gap : target.x + gap;
          this.scaleX = target.scaleX;
          this.y = target.y;
          this.jumping = target.y > 40;
          this.velocityY = 0;
          const maxRight = WORLD_WIDTH - this.element.offsetWidth - 20;
          if (this.x < 20) this.x = 20;
          if (this.x > maxRight) this.x = maxRight;
        }
        this.teleport1 = true;
      }
      if (this.frameIndex === 0) {
        this.showFrame(currentFrames[0]);
        this.frameIndex = 1;
        return;
      }

      // Frame 2 (Index 1): 💥 HELL KICK (Dushman ko hawa me uchhalne wali kick)!
      if (this.frameIndex === 1) {
        this.showFrame(currentFrames[1]);
        this.frameIndex = 2;
        return;
      }
      if (this.frameIndex === 2 && !this.teleport2) {
        let target = getSmartTarget(this);
        if (target && target.activeInBattle && target.health > 0) {
          let gap = 45; // 🎯 45px gap
          this.x = target.scaleX === 1 ? target.x - gap : target.x + gap;
          this.scaleX = target.scaleX;
          this.y = target.y;
          this.jumping = target.y > 40;
          this.velocityY = 0;
        }
        this.teleport2 = true;
      }

      // 2. Pose 1, 2, 3 (Index 0, 1, 2)
      if (this.frameIndex < 5) {
        this.showFrame(currentFrames[this.frameIndex]);
        this.frameIndex++;
        return;
      }

      // 3. Pose 4 (Index 3): Frame 5 Beam Fire + 90 Ticks Hold
      if (this.frameIndex === 5) {
        if (!this.bulletFired) {
          let projX = this.scaleX === 1 ? this.x - 170 : this.x + 180;
          let projY = this.y - 10;
          let projFrames = this.data.hellAttack.slice(6); // Frame 5 ki goli

          let ssbHellBeam = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            projFrames,
            this.imageUrl,
            this.bgSize
          );
          ssbHellBeam.isSSBHellBeam = true;
          ssbHellBeam.damage = 1;
          projectiles.push(ssbHellBeam);

          this.bulletFired = true;
        }

        // ⏳ 90 Ticks Pose Hold:
        this.ssbHellHoldTimer = (this.ssbHellHoldTimer || 0) + 1;
        if (this.ssbHellHoldTimer < 90) {
          this.showFrame(currentFrames[5]);
          return;
        } else {
          this.bulletFired = false;
          this.teleport1 = false;
          this.teleport2 = false;
          this.ssbHellHoldTimer = 0;
          this.isAttacking = false;
          this.setState("idle");
          return;
        }
      }
    }
    // ==========================================================
    // 😈 SUKUNA KI-BLAST (Pose 1-9 -> Index 8 Fire -> Frame 10 Goli -> Instant Free)
    // ==========================================================
    // if (this.state === "kiBlast" && this.id === "enemy3") {
    if (
      this.state === "kiBlast" &&
      (this.id === "enemy3" ||
        (this.imageUrl && this.imageUrl.includes("sukuna")))
    ) {
      // Frame 1 se 8 (Index 0 se 7) normal poses chalenge
      // Jaise hi Frame 9 (Index 8) aaye -> Goli fire hogi!
      if (this.frameIndex === 8) {
        if (!this.bulletFired) {
          // 🎯 Haath ke aage se position:
          let projX = this.scaleX === 1 ? this.x - 900 : this.x - 35;
          let projY = this.y - 140;

          // 🎯 Frame 10 (Index 9) goli ka frame:
          let projFrames = this.data.kiBlast.slice(9);

          let sukunaBullet = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            projFrames,
            this.imageUrl,
            this.bgSize
          );
          sukunaBullet.isSukunaBlast = true;
          // sukunaBullet.element.style.zIndex = "4"; // 🎯 Unique Tag
          sukunaBullet.damage = 2; // Continuous 2 damage
          sukunaBullet.speed = 13 * this.scaleX; // Tez anime goli speed
          projectiles.push(sukunaBullet);

          this.bulletFired = true;
        }

        // ⚡ 9th Pose render karke Sukuna TURANT FREE (Idle):
        this.showFrame(currentFrames[8]);
        this.bulletFired = false;
        this.isAttacking = false;
        this.setState("idle");
        return;
      }
    }
    // ==========================================
    // ⚡ SASUKE HELL ATTACK (Pose 1-3 -> Goli Center me Spawn -> 40 Ticks Hold)
    // ==========================================
    //  if (this.state === "hellAttack" && this.id === "sasuke") {
    // 1. Pose 1 aur 2 normal chalenge:
    if (this.state === "hellAttack" && isSasukeProfile) {
      if (this.frameIndex < 3) {
        this.showFrame(currentFrames[this.frameIndex]);

        // 2. Pose 3 (Index 2) par Goli Sasuke ke Center me spawn hogi:
        if (this.frameIndex === 2 && !this.bulletFired) {
          // 🎯 Sasuke ke center point se spawn:
          let projX = this.x - 45;
          let projY = this.y - 15;
          let projFrames = this.data.hellAttack.slice(3, 5); // Frames 4 aur 5

          let sasukeHell = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            projFrames,
            this.imageUrl,
            this.bgSize,
            this
          );
          //  let sasukeHell = new Projectile(this.id, projX, projY, this.scaleX, this.data.hellAttack.slice(3, 5), this.imageUrl, this.bgSize, this);
          //sasukeHell.isSasukeHell = true; projectiles.push(sasukeHell); this.bulletFired = true;// this.sasukeHellTimer = 0;

          sasukeHell.isSasukeHell = true; // Unique Tag
          sasukeHell.damage = 1;
          projectiles.push(sasukeHell);

          this.bulletFired = true;
          this.sasukeHellTimer = 0;
        }
        this.frameIndex++;
        return;
      }
      // Frame 3 ko freeze rakho:
      this.showFrame(currentFrames[2]);
      this.sasukeHellTimer = (this.sasukeHellTimer || 0) + 1;

      // 40 ticks hold poora hote hi Idle:
      if (this.sasukeHellTimer >= 40) {
        this.bulletFired = false;
        this.sasukeHellTimer = 0;
        this.isAttacking = false;
        this.setState("idle");
      }
      return;
    }

    // ==========================================
    // ⚡ SASUKE MEDIUM ATTACK (Pose 1-10 -> Goli Spawn -> Loop 8-9 Hold 50 Ticks)
    // ==========================================
    //if (this.state === "mediumAttack" && this.id === "sasuke") {
    // 1. Pose 1 se 9 (Indices 0 to 8) normal play honge:
    if (this.state === "mediumAttack" && isSasukeProfile) {
      if (this.frameIndex < 10) {
        this.showFrame(currentFrames[this.frameIndex]);

        // 2. Frame 10 (Index 9) par Goli Haath ke aage spawn hogi:

        // Haath ke aage spawn position:
        if (this.frameIndex === 9 && !this.bulletFired) {
          let projX = this.scaleX === 1 ? this.x + 55 : this.x - 75;
          let projY = this.y - 10;
          let projFrames = this.data.mediumAttack.slice(10, 13); // Frames 11, 12, 13

          // Frames 11, 12, 13 (Indices 10, 11, 12) goli ke frames:

          let sasukeMed = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            projFrames,
            this.imageUrl,
            this.bgSize,
            this
          );
          sasukeMed.isSasukeMedium = true; // 🎯 Unique Tag
          sasukeMed.damage = 1;
          projectiles.push(sasukeMed);

          this.bulletFired = true;
          this.sasukeHoldIndex = 7; // Index 7 = Frame 8 se hold shuru
          this.sasukeMedTimer = 0;
        }

        this.frameIndex++;
        return;
      }
      this.sasukeMedTimer = (this.sasukeMedTimer || 0) + 1; // 👈 TIMER CHALU (Freeze khata
      this.sasukeHoldIndex = this.sasukeHoldIndex === 7 ? 8 : 7;
      this.showFrame(currentFrames[this.sasukeHoldIndex]);

      // 50 ticks hold poora hone par Idle:
      if (this.sasukeMedTimer >= 50) {
        this.bulletFired = false;
        this.sasukeMedTimer = 0;
        this.isAttacking = false;
        this.setState("idle");
      }
      return;
    }
    // 3. Sasuke Hold: Frame 8 aur 9 (Indices 7 aur 8) loop karega 50
    // ==========================================
    // 🔥 FRIEZA NOVA DIVE (Frame 1-2 Intro -> 3-5 Loop -> Timer 200)
    // ==========================================
    // if (this.state === "mediumAttack" && this.id === "enemy2") {
    if (
      this.state === "mediumAttack" &&
      (this.id === "enemy2" ||
        (this.imageUrl && this.imageUrl.includes("frieza")))
    ) {
      // 1. Frame 1 (Index 0): Pehla Pose
      /*if (this.frameIndex === 0) {
this.showFrame(currentFrames[0]);
this.frameIndex = 1;
return;
}*/

      // 2. Frame 2 (Index 1): Launch Pose + Angle Target Lock
      //if (this.frameIndex === 1) {
      //this.showFrame(currentFrames); // 👈 BUG FIX 1: currentFrames ke aage [1] laga diya
      let target = getSmartTarget(this);
      let targetX = target
        ? target.x
        : this.scaleX === 1
        ? this.x + 1000
        : this.x - 1000;
      let targetY = target ? target.y + 40 : this.y;

      let dx = targetX - this.x;
      if (this.frameIndex === 0) {
        if (dx > 0) this.scaleX = 1; // 👉 Dushman aage hai toh aage dekho
        else if (dx < 0) this.scaleX = -1; // 👈 Dushman peechhe hai toh palat jao!

        this.showFrame(currentFrames[0]);

        this.friezaHold = (this.friezaHold || 0) + 1;
        if (this.friezaHold >= 1) {
          this.friezaHold = 0;
          this.frameIndex = 1; // Agle frame par shot pose
        }
        return;
      }
      if (this.frameIndex === 1) {
        if (dx > 0) this.scaleX = 1;
        else if (dx < 0) this.scaleX = -1;

        let shotFrame = currentFrames; // 👈 lock kar diya (ab gayab nahi hoga!)
        this.showFrame(shotFrame[1]);

        this.friezaHold = (this.friezaHold || 0) + 1;
        if (this.friezaHold >= 1) {
          this.friezaHold = 0;

          let dy = targetY - this.y;
          //let distance = Math.sqrt(dx * dx + dy * dy) || 1;
          let distance = Math.sqrt(dx * dx + dy * dy) || 1;
          let speed = 70; // 🚀 10x Fast Speed
          this.friezaVx = (dx / distance) * speed;
          this.friezaVy = (dy / distance) * speed;
          this.scaleX = this.friezaVx >= 0 ? 1 : -1;
          this.friezaDashTimer = 160; // 🔥 MOVE TIMER = 200 TICKS!
          this.frameIndex = 2;
        }
        return;
      }
      if (this.frameIndex >= 2) {
        // 3. Frames 3, 4, 5 (Indices 2, 3, 4): CONTINUOUS LOOP DASH
        this.bulletFired = true;
        this.friezaDashTimer--;
        if (this.friezaVx > 0) this.scaleX = 1;
        else if (this.friezaVx < 0) this.scaleX = -1;
        // Index 2 se 4 ke beech loop karega
        if (this.frameIndex < 2 || this.frameIndex > 4) {
          this.frameIndex = 2;
        }
        this.showFrame(currentFrames[this.frameIndex]);
        this.frameIndex++;
        if (this.frameIndex > 4) {
          this.frameIndex = 2; // Wapas Frame 3 (Index 2) par loop
        }

        // 4. Timer 200 poora hone par: Jahan hai WAHIN Normal Idle ho jayega!
        if (this.friezaDashTimer <= 0) {
          this.bulletFired = false;
          this.isAttacking = false;
          this.friezaVx = 0;
          this.friezaVy = 0;
          this.setState("idle"); // 👈 Jahan ruka wahin Idle!
        }
        return;
      }
    }
    // 👈 BUG FIX 2: Yahan sirf TWO brackets chahiye the, tere code mein extra the!
    if (this.state === "kiCharge" && this.id === "player") {
      let stopCharging = this.isControlledByPlayer
        ? !isL1Pressed || this.ep >= 800
        : !this.isCharging || this.ep >= 800;
      if (stopCharging) {
        this.isCharging = false;
        this.isAttacking = false;
        this.setState("idle");
        return;
      }
      this.showFrame(currentFrames[this.frameIndex]);
      this.frameIndex++;
      // 2. AUTOMATIC LOOP LOGIC (Index 9 ki jagah dynamic length)
      if (this.frameIndex > 6) {
        this.ep += 20;
        if (this.ep > 800) this.ep = 800;
        updateEpBars();

        this.frameIndex = 4;
        return;
      }
    }
    // ==========================================
    // 🔥 NAYA JADOO: JIREN KI CHARGE (5 Frames + Loop 3-5)
    // ==========================================
    if (this.state === "kiCharge" && this.id === "teammate2") {
      // 1. EMERGENCY STOP CHECK (Player ya AI dono ke liye)
      let stopCharging = false;
      if (this.isControlledByPlayer) {
        stopCharging = !isL1Pressed || this.ep >= 800;
      } else {
        stopCharging = !this.isCharging || this.ep >= 800;
      }

      if (stopCharging) {
        this.isCharging = false;
        this.isAttacking = false;
        this.setState("idle");
        return;
      }

      // 2. FRAME SHOW KARO & AAGE BADHAO
      this.showFrame(currentFrames[this.frameIndex]);
      this.frameIndex++;

      // 3. 5-FRAME LOOP: Frame 1-2 (Index 0,1) Intro -> Frame 3-5 (Index 2,3,4) Loop!
      if (this.frameIndex > 4) {
        this.ep += 20;
        if (this.ep > 800) this.ep = 800;

        updateEpBars();
        if (this.miniBar) this.updateMiniBars(); // Overhead Bar Update
        playSfx("charge", 1.5);

        this.frameIndex = 2; // 🔁 Wapas Frame 3 (Index 2) par loop!
      }
      return;
    }

    // ==========================================
    // ⚡ NAYA JADOO: SASUKE CHAKRA / KI CHARGE (L1 Hold)
    // ==========================================
    if (this.state === "kiCharge" && this.id === "sasuke") {
      let stopCharging = this.isControlledByPlayer
        ? !isL1Pressed || this.ep >= 800
        : !this.isCharging || this.ep >= 800;

      if (stopCharging) {
        this.isCharging = false;
        this.isAttacking = false;
        this.setState("idle");
        return;
      }

      this.showFrame(currentFrames[this.frameIndex]);
      this.frameIndex++;

      // Frames poore hote hi EP (+20) badhao aur loop karo:
      if (this.frameIndex > 3) {
        this.ep += 20; // ⚡ Har loop mein 20 Chakra badhega
        if (this.ep > 800) this.ep = 800;
        updateEpBars();
        if (this.miniBar) this.updateMiniBars();
        playSfx("charge", 1.5);
        this.frameIndex = 2; // 🔁 Wapas Frame 1 se loop!
      }
      return;
    }
    // ==========================================
    // 🔥 NAYA JADOO: FRIEZA KI CHARGE (9 Frames + Loop)
    // ==========================================
    //if (this.state === "kiCharge" && this.id === "enemy2") {
    if (
      this.state === "kiCharge" &&
      (this.id === "enemy2" ||
        (this.imageUrl && this.imageUrl.includes("frieza")))
    ) {
      let stopCharging = this.isControlledByPlayer
        ? !isL1Pressed || this.ep >= 800
        : !this.isCharging || this.ep >= 800;

      if (stopCharging) {
        this.isCharging = false;
        this.isAttacking = false;
        this.setState("idle");
        return;
      }

      this.showFrame(currentFrames[this.frameIndex]);
      this.frameIndex++;

      if (this.frameIndex > 8) {
        this.ep += 20;
        if (this.ep > 800) this.ep = 800;
        updateEpBars();
        if (this.miniBar) this.updateMiniBars();
        playSfx("charge", 1.5);
        this.frameIndex = 6; // Loop
      }
      return;
    }
    // ==========================================
    // 🔥 NAYA JADOO: SUKUNA KI CHARGE (3 Frames Loop)
    // ==========================================
    if (this.state === "kiCharge" && this.id === "enemy3") {
      let stopCharging = this.isControlledByPlayer
        ? !isL1Pressed || this.ep >= 800
        : !this.isCharging || this.ep >= 800;

      if (stopCharging) {
        this.isCharging = false;
        this.isAttacking = false;
        this.setState("idle");
        return;
      }

      this.showFrame(currentFrames[this.frameIndex]);
      this.frameIndex++;

      // 3 Frames (Index 0, 1, 2) poore hote hi EP badhao aur Loop karo:
      if (this.frameIndex > 2) {
        this.ep += 20;
        if (this.ep > 800) this.ep = 800;
        updateEpBars();
        if (this.miniBar) this.updateMiniBars(); // Overhead Bar Update
        playSfx("charge", 1.5);
        this.frameIndex = 2; // 🔁 Wapas Frame 1 se loop!
      }
      return;
    }

    // ==========================================
    // 🔥 NAYA JADOO: ITACHI KI CHARGE (2 Frames Loop)
    // ==========================================
    if (this.state === "kiCharge" && this.id === "teammate3") {
      let stopCharging = this.isControlledByPlayer
        ? !isL1Pressed || this.ep >= 800
        : !this.isCharging || this.ep >= 800;

      if (stopCharging) {
        this.isCharging = false;
        this.isAttacking = false;
        this.setState("idle");
        return;
      }

      this.showFrame(currentFrames[this.frameIndex]);
      this.frameIndex++;

      // 2 Frames (Index 0, 1) poore hote hi EP badhao aur Loop karo:
      if (this.frameIndex >= currentFrames.length || this.frameIndex > 1) {
        this.ep += 20;
        if (this.ep > 800) this.ep = 800;
        updateEpBars();
        if (this.miniBar) this.updateMiniBars(); // Overhead Bar Update
        playSfx("charge", 1.5);
        this.frameIndex = 0; // 🔁 Wapas Frame 1 se loop!
      }
      return;
    }
    if (this.state === "kiCharge" && this.id === "teammate") {
      let stopCharging = this.isControlledByPlayer
        ? !isL1Pressed || this.ep >= 800
        : !this.isCharging || this.ep >= 800;

      if (stopCharging) {
        this.isCharging = false;
        this.isAttacking = false;
        this.setState("idle");
        return;
      }

      this.showFrame(currentFrames[this.frameIndex]);
      this.frameIndex++;

      if (this.frameIndex > 7) {
        this.ep += 20;
        if (this.ep > 800) this.ep = 800;
        updateEpBars();
        if (this.miniBar) this.updateMiniBars();
        playSfx("charge", 1.5);
        this.frameIndex = 4; // Loop
      }
      return;
    }
    // ==========================================
    // 🦅 ITACHI MEDIUM ATTACK (Index 3 Fire + Instant Free)
    // ==========================================
    //  if (this.state === "mediumAttack" && this.id === "teammate3") {
    // Pose 1 se 4 (Index 0 se 3) play honge
    // if (
    //   this.state === "mediumAttack" &&
    // (this.id === "teammate3" ||
    //   (this.imageUrl && this.imageUrl.includes("itachi")))
    //  ) {
    /*if (
      this.state === "mediumAttack" &&
      (this.id === "teammate3" ||
        this.charRole === "teammate3" ||
        (this.imageUrl && this.imageUrl.includes("itachi")))
    ) {*/
    if (this.state === "mediumAttack" && isItachiProfile) {
      if (this.frameIndex === 3) {
        //  if (this.frameIndex === 3) {
        if (!this.bulletFired) {
          // 🎯 LEFT & RIGHT ALAG-ALAG POSITION CONTROL
          let rightSpawnX = this.x + 40; // 👉 RIGHT: Itachi ke haath ke aage (sar se door)
          let leftSpawnX = this.x - 220; // 👈 LEFT: Jo aapka pehle se sahi tha

          let projX = this.scaleX === 1 ? rightSpawnX : leftSpawnX;

          //let projX = this.scaleX === 1 ? this.x + 40 : this.x - 40;
          let projY = this.y - 25;

          // Frame 5 se 10 (Index 4 to 10) goli ke 6 frames nikal liye:
          let projFrames = this.data.mediumAttack.slice(4, 10);
          let itachiHardcodedFrames = [
            { w: 190, h: 32, x: 493, y: 3845 },
            { w: 232, h: 44, x: 434, y: 3737 },
            { w: 226, h: 36, x: 262, y: 3844 },
            { w: 228, h: 37, x: 22, y: 3840 },
            { w: 219, h: 40, x: 208, y: 3734 },
            { w: 192, h: 44, x: 11, y: 3730 },
          ];

          let itachiMed = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            projFrames,
            this.imageUrl,
            this.bgSize,
            this
          );
          itachiMed.isItachiMedium = true; // 🎯 Unique Tag
          itachiMed.damage = 1;
          itachiMed.ownerTeam = this.team;
          projectiles.push(itachiMed);
          this.bulletFired = true;
        }

        // ⚡ Goli nikalte hi Itachi turant FREE (Idle):
        this.bulletFired = false;
        this.isAttacking = false;
        this.setState("idle");
        return;
      }
    }
    // ==========================================
    // 🛡️ NAYA JADOO: BLOCK HOLD LOGIC
    // ==========================================
    if (this.state === "block") {
      // Agar player ne R1 button chhod diya
      if (!this.isBlocking) {
        this.isAttacking = false;
        this.setState("idle"); // Normal khada ho jayega
        return;
      }

      // Block ki animation ke aakhiri frame par usko Statue (Freeze) kar do
      if (this.frameIndex >= currentFrames.length - 1) {
        this.frameIndex = currentFrames.length - 1;
        this.showFrame(currentFrames[this.frameIndex]);
        return; // Engine yahan rukega jab tak block dabaya hai
      }
    }

    if (this.state === "kiBlast" && this.id === "player") {
      if (this.frameIndex === 5) {
        let projX = this.scaleX === 1 ? this.x + 40 : this.x - 40;
        let projFrames = this.data.kiBlast.slice(6, 13);
        projectiles.push(
          new Projectile(
            this.id,
            projX,
            this.y + 15,
            this.scaleX,
            projFrames,
            this.imageUrl,
            this.bgSize,
            this
          )
        );
        this.frameIndex = 13;
      }
    }
    // ==========================================
    // 🔥 NAYA JADOO: ITACHI 7x RAPID FIRE KI-BLAST LOGIC
    // ==========================================
    // ==========================================
    if (this.state === "kiBlast" && this.id === "teammate3") {
      // Engine Frame 1 se chalega, aur jaise hi Frame 1 (Index 0) aaye, tab goli fire hogi!
      if (this.frameIndex === 0) {
        // Goli haath ke aage se niklegi
        let projX = this.scaleX === 1 ? this.x + 60 : this.x - 60;
        let projY = this.y + 10;

        // Goli ki animation ke liye aakhiri frames (Index 1 to 8) use karenge
        let projFrames = this.data.kiBlast.slice(1, 6);

        let itachiBullet = new Projectile(
          this.id,
          projX,
          projY,
          this.scaleX,
          projFrames,
          this.imageUrl,
          this.bgSize
        );
        projectiles.push(itachiBullet);

        // Loop Counter (7 Baar chalana hai)
        this.itachiBlastCount = (this.itachiBlastCount || 0) + 1;

        if (this.itachiBlastCount < 7) {
          // 7 se kam hai, toh wapas Frame 1 (Index 0) par bhejo!
          this.frameIndex = 0;
          this.showFrame(currentFrames[this.frameIndex]);
          return; // Engine ko aage badhne se roko aur wapas loop karo
        } else {
          // 7 Goliyaan puri ho gayi! Sab reset karo aur Normal (Idle) khade ho jao.
          this.itachiBlastCount = 0;
          this.isAttacking = false;
          this.setState("idle");
          return;
        }
      }
    }
    // ==========================================
    // NAYA: GOKU BLACK 3x LOOPING KI-BLAST LOGIC
    // =========================================
    // ==========================================
    // NAYA: GOKU BLACK 3x LOOPING KI-BLAST LOGIC
    // ===================================
    if (
      this.state === "kiBlast" &&
      (this.id === "enemy" || this.id === "teammate")
    ) {
      // FRAME 4 (Index 3): LEFT HAATH SE GOLI FIRE HOGI
      if (this.frameIndex === 3) {
        let projX = this.scaleX === 1 ? this.x + 60 : this.x - 60;
        let projY = this.y + 16; // Goli ko upar (haath ke paas) laane ke liye Y ko 40 kiya

        let projFrames = this.data.kiBlastProj; // NAYA: Ab yeh sirf goli ki image lega!

        projectiles.push(
          new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            projFrames,
            this.imageUrl,
            this.bgSize
          )
        );
      }

      // FRAME 6 (Index 5): RIGHT HAATH SE GOLI FIRE HOGI
      if (this.frameIndex === 5) {
        let projX = this.scaleX === 1 ? this.x + 60 : this.x - 60;
        let projY = this.y + 16;

        let projFrames = this.data.kiBlastProj; // NAYA

        projectiles.push(
          new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            projFrames,
            this.imageUrl,
            this.bgSize
          )
        );

        // Loop Counter
        this.kiBlastLoopCount = (this.kiBlastLoopCount || 0) + 1;

        // Loop Logic: Wapas Frame 3 (Left hand pose) par bhej do!
        if (this.kiBlastLoopCount < 3) {
          // Index 2 = Frame 3 (Left Hand Pose)
          this.frameIndex = 2;
          this.showFrame(currentFrames[this.frameIndex]);
          return;
        } else {
          this.kiBlastLoopCount = 0;
          this.isAttacking = false;
          this.setState("idle");
          return;
        }
      }
    }
    // ==========================================
    // 🔥 NAYA JADOO: FRIEZA SINGLE-HAND 7x RAPID FIRE (EXACT JIREN STYLE 💯)
    // ==========================================
    // if (this.state === "kiBlast" && this.id === "enemy2") {
    if (
      this.state === "kiBlast" &&
      (this.id === "enemy2" ||
        (this.imageUrl && this.imageUrl.includes("frieza")))
    ) {
      // Engine Frame 1 (Index 0) ko normal chalayega
      // Jaise hi Frame 2 (Index 1) aayega, goli fire hogi!
      if (this.frameIndex === 1) {
        let projX = this.scaleX === 1 ? this.x + 35 : this.x - 50; // Goli haath ke aage
        let projY = this.y + 10; // Goli ki Y position

        // 🎯 EXACT JIREN LOGIC: Aakhiri 2 frames (Index 2 aur 3) ko Goli ke roop mein nikal lo!
        let projFrames = this.data.kiBlast.slice(2, 4);

        let friezaBullet = new Projectile(
          this.id,
          projX,
          projY,
          this.scaleX,
          projFrames,
          this.imageUrl,
          this.bgSize
        );
        // (Damage default 7 hi rahega)
        projectiles.push(friezaBullet);

        // Loop Counter (7 Baar chalana hai)
        this.friezaBlastCount = (this.friezaBlastCount || 0) + 1;

        if (this.friezaBlastCount < 7) {
          // 7 se kam hai, toh wapas Frame 1 (Index 0) par bhejo!
          this.frameIndex = 1;
          this.showFrame(currentFrames[this.frameIndex]);
          return; // Engine ko aage badhne se roko aur wapas loop karo
        } else {
          // 7 Goliyaan puri ho gayi! Sab reset karo aur Normal (Idle) khade ho jao.
          this.friezaBlastCount = 0;
          this.isAttacking = false;
          this.setState("idle");
          return;
        }
      }
    }
    // ==========================================
    // 🔥 ITACHI FIRE BALL ATTACK (Frieza Style)
    // ==========================================
    //  if (this.state === "fireBallAttack" && this.id === "teammate3") {
    // Index 2 (Yani 3rd Frame) par goli fire hogi!
    if (
      this.state === "fireBallAttack" &&
      (this.id === "teammate3" ||
        this.charRole === "teammate3" ||
        (this.imageUrl && this.imageUrl.includes("itachi")))
    ) {
      if (this.frameIndex === 2) {
        if (!this.bulletFired) {
          let projX = this.scaleX === 1 ? this.x + 35 : this.x - 60; // Goli haath ke aage
          let projY = this.y + 10;

          // 🎯 TERA LOGIC: Frame 4 se 7 ki goli banegi
          let projFrames = this.data.fireBallAttack.slice(3, 7);

          let itachiFire = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            projFrames,
            this.imageUrl,
            this.bgSize,
            this
          );

          itachiFire.damage = 7;
          itachiFire.isItachiFire = true; // 🔥 NAYA JADOO: Engine ko pata chalega ki ye Itachi ki goli hai!

          let originalGetHitbox = itachiFire.getHitbox.bind(itachiFire);
          itachiFire.getHitbox = function () {
            let hit = originalGetHitbox();
            if (!hit) return null;
            hit.h = hit.h + 40;
            hit.y = hit.y - 20;
            return hit;
          };
          projectiles.push(itachiFire);
          this.bulletFired = true;
        }
      }

      // Goli nikalne ke baad engine turant rukk kar usko Idle kar dega
      if (this.frameIndex > 2) {
        this.bulletFired = false;
        this.isAttacking = false;
        this.setState("idle");
        return;
      }
    }
    // ==========================================
    // 🔥 NAYA JADOO: FRIEZA 7x RAPID FIRE KI-BLAST LOGIC
    // ==========================================
    // ==========================================
    // 🔥 NAYA JADOO: JIREN 7x RAPID FIRE KI-BLAST LOGIC
    // ==========================================
    //if (this.state === "kiBlast" && this.id === "teammate2") {
    if (
      this.state === "kiBlast" &&
      (this.id === "teammate2" ||
        (this.imageUrl && this.imageUrl.includes("jiren")))
    ) {
      // Engine Frame 1 se 4 (Index 0 se 3) tak normal chalega
      // Jaise hi Frame 5 (Index 4) aayega, goli fire hogi!
      if (this.frameIndex === 4) {
        let projX = this.scaleX === 1 ? this.x + 60 : this.x - 60; // Goli ki X position (haath ke aage)
        let projY = this.y + 10; // Goli ki Y position (height adjust kar lena)

        // 🎯 TERA LOGIC: Aakhiri 2 frames (Index 5 aur 6) ko Goli ke roop mein nikal lo!
        let projFrames = this.data.kiBlast.slice(5, 7);

        let jirenBullet = new Projectile(
          this.id,
          projX,
          projY,
          this.scaleX,
          projFrames,
          this.imageUrl,
          this.bgSize,
          this
        );
        // (Damage default 7 hi rahega kyunki Projectile class mein already set hai)
        projectiles.push(jirenBullet);

        // Loop Counter (7 Baar chalana hai)
        this.jirenBlastCount = (this.jirenBlastCount || 0) + 1;

        if (this.jirenBlastCount < 7) {
          // 7 se kam hai, toh wapas Frame 4 (Index 3) par bhejo!
          this.frameIndex = 3;
          this.showFrame(currentFrames[this.frameIndex]);
          return; // Engine ko aage badhne se roko aur wapas loop karo
        } else {
          // 7 Goliyaan puri ho gayi! Sab reset karo aur Normal (Idle) khade ho jao.
          this.jirenBlastCount = 0;
          this.isAttacking = false;
          this.setState("idle");
          return;
        }
      }
    }
    // ==========================================
    // 🔥 NAYA JADOO: DEKU HELL ATTACK (7 Frames)
    // ==========================================
    // if (this.state === "hellAttack" && this.id === "player") {
    if (this.state === "hellAttack" && isDekuProfile) {
      // Engine Frame 1, 2, 3 (Index 0, 1, 2) ko Pose ke liye normally play karega.

      // Jaise hi Frame 4 (Index 3) aaye, Goli fire hogi!
      if (this.frameIndex === 2) {
        if (!this.bulletFired) {
          // 1. Haath ki position aur 5px ka Jadoo ✨
          let frameW = currentFrames[2].w; // Current pose ki width

          // Agar Right dekh raha hai toh Width + 5px aage, Left hai toh - 5px aage
          let projX = this.scaleX === 1 ? this.x + frameW + 5 : this.x - 45 - 5;
          let projY = this.y + 10; // Y position (Height) ko adjust karne ke liye

          // 2. Goli banakar fire kar di (this.data.hellBullet use karke)
          let hellProj = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            this.data.hellBullet,
            this.imageUrl,
            this.bgSize
          );
          hellProj.damage = 8;
          hellProj.getHitbox = function () {
            // Normal box uthao
            let boxW = parseInt(this.element.style.width) || 0;
            let boxH = parseInt(this.element.style.height) || 0;
            if (boxW === 0 || boxH === 0) return null;
            let yOffset = -5;
            // 1. WIDTH & HEIGHT: Ab engine goli ko aadha (h/2) nahi karega!
            // Box exactly teri image ke size ka banega har frame par.

            // 2. Y-AXIS (UPAR/NEECHE FIX):
            // Kyunki image ab poori size ki hai, box ko adjust karne ke liye yahan number daal.
            // 👈 ISKO BADAL KAR DEKHNA (jaise -20, -30, ya 0) jab tak theek na ho.

            // Agar character Left dekh raha hai toh box ko theek uski disha mein shift karo
            let boxX = this.x;

            return {
              x: boxX,
              y: this.y + yOffset,
              w: boxW,
              h: boxH,
            };
          };
          projectiles.push(hellProj);

          this.bulletFired = true; // Lock laga diya taaki lagatar na nikle
        }
      }
    }
    // ==========================================
    // DEKU MEDIUM ATTACK LOGIC (4 Frames + Goli)
    // ==========================================
    // if (this.state === "mediumAttack" && this.id === "player") {
    // Engine Frame 1 se 3 tak apne aap play karega.
    if (this.state === "mediumAttack" && isDekuProfile) {
      // Jab 4th Frame (Index 3) aaye, tab goli chalegi:
      if (this.frameIndex === 3) {
        if (!this.bulletFired) {
          // X aur Y axis (Isko apne hisaab se adjust kar lena jaise tumne Goku mein kiya tha)
          let projX = this.scaleX === 1 ? this.x + -70 : this.x - -20;
          let projY = this.y + 15;
          let airShockwaveFrames = [{ w: 113, h: 65, x: 228, y: 720 }];
          let dekuBullet = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            this.data.mediumBullet,
            this.imageUrl,
            this.bgSize,
            this
          );
          dekuBullet.isDekuMedium = true;
          projectiles.push(dekuBullet);
          this.bulletFired = true;
        }

        // Fire hone ke baad thoda sa hold (4 ticks) aur wapas Normal
        this.medTimer = (this.medTimer || 0) + 1;
        if (this.medTimer < 0.1) {
          this.showFrame(currentFrames[3]);
          return;
        } else {
          this.bulletFired = false;
          this.medTimer = 0;
          this.isAttacking = false;
          this.setState("idle");
          return;
        }
      }
    }

    // ==========================================
    // HELL ATTACK (15 FRAMES + DOUBLE HOLD)
    // ==========================================

    // ==========================================================
    // 🔥 NAYA JADOO: DEKU HELL KICK (Dynamic Tracking Teleport)
    // ==========================================================

    //if (this.state === "hellKick" && this.id === "player") {
    // Frame 1 (Index 0): Jaise hi animation shuru ho, Teleport maaro!
    if (
      this.state === "hellKick" &&
      (this.id === "player" ||
        this.charRole === "player" ||
        (this.imageUrl && this.imageUrl.includes("deku")))
    ) {
      if (this.frameIndex === 2 && !this.teleported) {
        // Target Goku Black hai

        // ❌ PEHLE THA: let target = enemy;
        // ✅ AB YEH DAAL DO:
        let target = getSmartTarget(this);
        if (target && target.activeInBattle && target.health > 0) {
          let gap = 40; // Goku ke 50px peeche

          // 1. PEECHE AANE KA LOGIC
          /* if (target.scaleX === 1) {
            this.x = target.x - gap;
            this.scaleX = 1;
          } else {
            this.x = target.x + gap;
            this.scaleX = -1;
       }*/
          this.x = target.scaleX === 1 ? target.x - gap : target.x + gap;
          this.scaleX = target.scaleX;
          // 2. 🔴 TARGET TRACKING (JUMP FIX) 🔴
          // Goku chahe zameen (40) par ho ya hawa (200) mein, uski Height (y) uthao
          // Aur usme 120px (Body + Sar ke upar) jod do!
          this.y = target.y + 50;

          this.jumping = true; // Hawa mein udne ka mode ON
          this.velocityY = 0; // Par neeche girne ki speed 0 (Hawa mein freeze)
        }
        this.teleported = true; // Ek baar teleport ho gaya toh Lock laga do
      }
    }

    // ==========================================================
    // 🔥 ANIME STYLE SMOOTH DASH (Luffy jaisa)
    // ==========================================================
    // ==========================================================
    // 🔥 CONTINUOUS DIRECTIONAL DASH (Long Press + Left/Right)
    // ==========================================================
    if (this.state === "dash") {
      // Speed thodi kam ki hai kyunki ab ye lagatar chalega (30-40 best rahega)
      let dashSpeedX = 100;
      let dashSpeedY = 100;

      // 🎮 1. DIRECTION CHECK: Agar L/R daba hai, toh us taraf ghoom jao

      if (this.moveRight) this.scaleX = 1;
      if (this.moveLeft) this.scaleX = -1;
      if (this.moveUp) {
        // 🦅 UPAR DASH (Aerial Dash)
        this.y += dashSpeedY;
        this.jumping = true; // Engine ko batao character hawa mein hai
        this.velocityY = 0;

        // Dash karte waqt gravity rok do (hawa mein tairne ke liye)
      } else if (this.moveDown && this.y > 40) {
        // ☄️ NEECHE DASH (Meteor Dive) - Sirf Hawa Mein (> 40px)
        this.y -= dashSpeedY;
        this.jumping = true;
        this.velocityY = 0;
      } else {
        // 🏃 NORMAL DASH (Left/Right)
        this.x += this.scaleX === 1 ? dashSpeedX : -dashSpeedX;
      }

      // 🚀 2. SLIDE KARO (Takatwar

      // 🛡️ Boundary check
      const maxRight = WORLD_WIDTH - this.element.offsetWidth - 20;
      // ✅ NAYA FLIP CODE:
      if (this.x <= 20) {
        this.x = 20;
        this.scaleX = 1; // 🔄 Left deewar se takrate hi Right FLIP
        this.moveLeft = false;
        this.moveRight = true;
      } else if (this.x >= maxRight) {
        this.x = maxRight;
        this.scaleX = -1; // 🔄 Right deewar se takrate hi Left FLIP
        this.moveRight = false;
        this.moveLeft = true;
      }
      //  if (this.x < 20) this.x = 20;
      // if (this.x > maxRight) this.x = maxRight;
      if (this.y > 300) this.y = 300;
      // 🔄 3. LONG PRESS LOOP & STOP LOGIC
      if (this.frameIndex >= 1) {
        // Jaise hi 2nd photo par pahuche...
        let keepDashing = false;
        if (this.isControlledByPlayer) {
          keepDashing = window.isDashHeld;
        } else if (
          this.id === "enemy" ||
          this.id === "teammate2" ||
          this.id === "teammate" ||
          this.id === "teammate3" ||
          this.id === "enemy2" ||
          this.id === "enemy3" ||
          this.id === "sasuke"
        ) {
          keepDashing = this.isEnemyDashing === true;
        }

        if (keepDashing) {
          // Agar button daba hua hai -> Wapas Photo 1 par jao (Loop banao)
          this.frameIndex = 0;
        } else {
          // Agar button chhod diya (ya Goku ne dash kiya) -> Dash khatam karo!
          this.isAttacking = false;

          this.setState(this.jumping ? "jump" : "idle");
        }
      }
    }
    // ==========================================================
    // 🔥 NAYA JADOO: DEKU TELEPORT LOGIC (2 Frames)
    // ==========================================================
    // ==========================================================
    // 🔥 NAYA JADOO: UNIVERSAL SMART TELEPORT LOGIC (For 4v4)
    // ==========================================================
    if (this.state === "teleport") {
      if (this.frameIndex === 1) {
        // 🧠 AI BRAIN: Apna Target Khud Dhoondho!
        // 🧠 AI BRAIN: Apna Target Khud Dhoondho!
        /*
let target = this.id === "player" || this.id === "teammate" ? enemy : player1;
if (this.id === "enemy") {
// 🔥 NAYA JADOO: Jo zyada paas hai aur zinda hai, Boss uske peechhe jayega!
let distToP = Math.abs(player1.x - this.x);
let distToT = Math.abs(teammate.x - this.x);
target = teammate.health > 0 && distToT < distToP ? teammate : player1;
}*/
        let target = getSmartTarget(this);
        if (
          target &&
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== this.team
        ) {
          let gap = 50;
          if (target.scaleX === 1) {
            this.x = target.x - gap;
            this.scaleX = 1;
          } else {
            this.x = target.x + gap;
            this.scaleX = -1;
          }
          this.y = target.y;
          const maxRight = WORLD_WIDTH - this.element.offsetWidth - 20;
          if (this.x < 20) this.x = 20;
          if (this.x > maxRight) this.x = maxRight;
        }

        this.isAttacking = false;
        this.setState("idle");
        return;
      }
    }
    // ==========================
    // ==========================================================
    // GOKU BLACK: INSTANT TRANSMISSION (3 Frames Animation)
    // ==========================================================
    // ==========================================================
    // GOKU BLACK & SSB: INSTANT TRANSMISSION (3 Frames Animation)
    // =========================================================
    if (
      this.state === "instantTransmission" &&
      (this.id === "player" ||
        this.id === "enemy" ||
        this.id === "enemy2" ||
        this.id === "enemy3" ||
        this.id === "teammate" ||
        this.id === "teammate2" ||
        this.id === "sasuke" ||
        this.id === "teammate3")
    ) {
      // Engine Frame 1 aur 2 normal play karega.
      // Jab 3rd Frame (Index 2) aayega, tab teleport hoga!
      if (this.frameIndex === 2) {
        let target =
          this.targetPlayer &&
          this.targetPlayer.activeInBattle &&
          this.targetPlayer.health > 0 &&
          this.targetPlayer.team !== this.team
            ? this.targetPlayer
            : getSmartTarget(this);
        /*
if (!target) {
if (this.id === "player" || this.id === "teammate") {
target = enemy;
}
} else if (this.id === "enemy" || this.id === "enemy2") {
// 🔥 NAYA JADOO: Hardcoded 'player1' hata diya. Ab hawa mein hi nearest enemy scan karega!
let distToP = player1.health > 0 ? Math.abs(player1.x - this.x) : Infinity;
let distToT = teammate.health > 0 ? Math.abs(teammate.x - this.x) : Infinity;
let distToT2 = teammate2.health > 0 ? Math.abs(teammate2.x - this.x) : Infinity;
let minD = Math.min(distToP, distToT, distToT2);
if (minD === distToT) target = teammate;
else if (minD === distToT2) target = teammate2;
else target = player1;
} else if (this.id === "teammate3") {
let d1 = enemy.health > 0 ? Math.abs(enemy.x - this.x) : Infinity;
let d2 = enemy2.health > 0 ? Math.abs(enemy2.x - this.x) : Infinity;
let d3 = enemy3.health > 0 ? Math.abs(enemy3.x - this.x) : Infinity;
let m = Math.min(d1, d2, d3);
if (m === d1) target = enemy;
else if (m === d2) target = enemy2;
else target = enemy3;
} else if (this.id === "teammate2") {
let dP = player1.health > 0 ? Math.abs(player1.x - this.x) : Infinity;
let dE = enemy.health > 0 ? Math.abs(enemy.x - this.x) : Infinity;
let dE2 = enemy2.health > 0 ? Math.abs(enemy2.x - this.x) : Infinity;
let dE3 = enemy3.health > 0 ? Math.abs(enemy3.x - this.x) : Infinity;
let mJ = Math.min(dP, dE, dE2, dE3);
if (mJ === dE) target = enemy;
else if (mJ === dE2) target = enemy2;
else if (mJ === dE3) target = enemy3;
else target = player1; // 👈 Deku paas hai toh Deku ke peechhe aayega!
}*/

        if (
          target &&
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== this.team
        ) {
          // Deku ki chaudaai (width) + 5px ka gap = lagbhag 55px
          let gap = 55;

          // OPOSITE DIRECTION LOGIC (Deku ke peeche jaana)
          if (target.scaleX === 1) {
            // Agar Deku right dekh raha hai, toh Goku uske left (peeche) aayega
            this.x = target.x - gap;
            this.scaleX = 1; // Goku bhi right dekhega taaki peeth par waar kare
          } else {
            // Agar Deku left dekh raha hai, toh Goku uske right (peeche) aayega
            this.x = target.x + gap;
            this.scaleX = -1;
            // Goku bhi left dekhega
          }
          this.y = target.y;
          // Attack khatam kiya
          // Goku ko wapas Normal khada kiya

          // Screen ke bahar na nikal jaye, iske liye safety lock
          const maxRight = WORLD_WIDTH - this.element.offsetWidth - 20;
          if (this.x < 20) this.x = 20;
          if (this.x > maxRight) this.x = maxRight;
        }
        this.targetPlayer = null;
        this.isAttacking = false;
        this.setState("idle");
        return;
      }
    }
    // ==========================================
    // 🔥 NAYA JADOO: BIG KAMEHAMEHA FIRE LOGIC
    // ==========================================
    if (this.state === "bigKamehameha" && this.id === "enemy") {
      // Engine frame 1 se 5 tak apne aap normal speed me chalayega.

      // Jab 6th Frame (Index 5) aaye, tab beam niklegi!
      if (this.frameIndex === 5) {
        // 1. Ek baar Beam Fire karo
        if (!this.bulletFired) {
          let projX = this.scaleX === 1 ? this.x + 60 : this.x - 60; // Hath ki position
          let projY = this.y + 10; // Agar beam zameen me ghuse, toh isko bada dena (e.g. + 50)

          // Yahan dhyan de: this.data.bigKamehamehaProj pass kiya hai (Beam ki photo!)
          let bigBeam = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            this.data.bigKamehamehaProj,
            this.imageUrl,
            this.bgSize,
            this
          );

          bigBeam.isBigKamehameha = true; // Ye tag lagate hi double damage/growth logic chalu ho jayega!
          projectiles.push(bigBeam);
          this.bulletFired = true;
        }

        // 2. Pose Hold Logic (Jab tak beam screen par hai, boss statue ban jayega)
        this.bigKamTimer = (this.bigKamTimer || 0) + 1;

        if (this.bigKamTimer < 90) {
          // 90 ticks = Lagbhag 1.5 Seconds hold
          this.showFrame(currentFrames[5]); // 6th frame par roke rakho
          return; // Engine ko aage mat badhne do
        } else {
          // Timer khatam! Wapas normal khada ho jayega
          this.bulletFired = false;
          this.bigKamTimer = 0;
          this.isAttacking = false;
          this.setState("idle");
          return;
        }
      }
    }
    // ==========================================
    // 🔥 ITACHI FIRE STYLE ATTACK (4 Poses + Fire Beam Scale 2)
    // ==========================================
    //  if( this.state === "fireStyleAttack") && (this.id === "teammate3" || this.charRole === "teammate3" || (this.imageUrl && this.imageUrl.includes("itachi")))
    //(this.state === "fireStyleAttack" && this.id === "teammate3") {
    //this.state === "fireStyleAttack" &&
    //  (this.id === "teammate3" ||
    //this.charRole === "teammate3" ||
    // (this.imageUrl && this.imageUrl.includes("itachi")))

    // Pose 1 se 4 (Index 0 se 3) play hoga.
    // Index 3 (4th Pose) par aate hi aag shuru hogi:
    if (
      this.state === "fireStyleAttack" &&
      (this.id === "teammate3" ||
        this.charRole === "teammate3" ||
        (this.imageUrl && this.imageUrl.includes("itachi")))
    ) {
      if (this.frameIndex === 4) {
        if (!this.bulletFired) {
          let projX = this.scaleX === 1 ? this.x + 30 : this.x - 30;
          let projY = this.y + 10;

          // 🎯 Frame 5 se aakhiri tak (Index 4 to end) aag ki animation:
          let fireFrames = this.data.fireStyleAttack.slice(5, 12);

          let fireProj = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            fireFrames,
            this.imageUrl,
            this.bgSize,
            this
          );
          fireProj.isItachiFireStyle = true;
          fireProj.damage = 1; // 1 Damage continuous
          projectiles.push(fireProj);
          this.bulletFired = true;
        }

        // ⏳ 45 Ticks Hold (Goku Black Kamehameha jaisa pose hold):
        this.itachiFireTimer = (this.itachiFireTimer || 0) + 1;
        if (this.itachiFireTimer < 45) {
          this.showFrame(currentFrames[4]); // Pose 4 par roke rakho
          return;
        } else {
          this.bulletFired = false;
          this.itachiFireTimer = 0;
          this.isAttacking = false;
          this.setState("idle");
          return;
        }
      }
    }
    // ==========================================================
    // 🔥 NAYA JADOO: FRIEZA KAMEHAMEHA (SSB Style Projectile)
    // ==========================================================
    // if (this.state === "kamehameha" && this.id === "enemy2") {

    // Engine Frame 1, 2 ko pose ke liye chalayega.
    // Jab 3rd Frame (Index 2) aaye, tab beam niklegi!
    if (
      this.state === "kamehameha" &&
      (this.id === "enemy2" ||
        (this.imageUrl && this.imageUrl.includes("frieza")))
    ) {
      if (this.frameIndex === 2) {
        if (!this.bulletFired) {
          let projX = this.scaleX === 1 ? this.x + 35 : this.x - 35; // Haath par lock
          let projY = this.y - 10;

          // 🎯 Aakhiri 2 frames (Index 3 aur 4) ko goli bana liya!
          let fBeamFrames = this.data.kamehameha.slice(3, 5);

          let friezaBeam = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            fBeamFrames,
            this.imageUrl,
            this.bgSize,
            this
          );

          friezaBeam.isFriezaKamehameha = true; // Is goli ka Naya Tag!
          projectiles.push(friezaBeam);
          this.bulletFired = true;
        }

        // Pose Hold Logic (Jab tak beam screen par hai, Frieza ruka rahega)
        this.friezaKamTimer = (this.friezaKamTimer || 0) + 1; // 👈 TIMER CHALU
        if (this.friezaKamTimer < 90) {
          // 90 Ticks tak freeze
          this.showFrame(currentFrames[2]); // Pose 3 par freeze
          return; // Engine ko yahin rok do
        } else {
          // Attack poora hua, sab reset!
          this.bulletFired = false;
          this.friezaKamTimer = 0;
          this.isAttacking = false;
          this.setState("idle");
          return;
        }
      }
    }
    // ==========================================
    // 🔥 NAYA JADOO: JIREN HELL ATTACK (Pose + Bullet)
    // ==========================================
    //  if (this.state === "hellAttack" && this.id === "teammate2") {
    if (
      this.state === "hellAttack" &&
      (this.id === "teammate2" ||
        (this.imageUrl && this.imageUrl.includes("jiren")))
    ) {
      // Pose 1 se 7 (Index 0 to 6) normal play hoga.
      // Frame 8 (Index 7) par Goli fire hogi!
      if (this.frameIndex === 6) {
        if (!this.bulletFired) {
          let projX = this.scaleX === 1 ? this.x + 35 : this.x - 35;
          let projY = this.y + 10;

          // Goli Frame 8 (Index 7) se li gayi:
          let projFrames = [this.data.hellAttack[7]];

          let jirenHellBullet = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            projFrames,
            this.imageUrl,
            this.bgSize,
            this
          );
          jirenHellBullet.isJirenHellBullet = true;
          jirenHellBullet.damage = 7; // Goli ka damage 7
          projectiles.push(jirenHellBullet);

          this.bulletFired = true;
        }
        // Goli nikalte hi Jiren turant free
        this.bulletFired = false;
        this.isAttacking = false;
        this.setState("idle");
        return;
      }
    }

    // ==========================================
    // 🔥 ITACHI HELL ATTACK (Pose 1-4 + Index 3 Fire + 30 Ticks Hold)
    // =========================================
    // ==========================================
    // 🔥 ITACHI HELL ATTACK (Pose 1-4 + Fire + 300 Ticks Hold)
    // ==========================================
    if (this.state === "hellAttack" && this.id === "teammate3") {
      // Pose 1 se 4 (Index 0 se 3)
      if (this.frameIndex === 3) {
        if (!this.bulletFired) {
          let projX = this.scaleX === 1 ? this.x + 30 : this.x - 30;
          let projY = this.y + 5;

          // Poora hellAttack array goli ko diya (Index 4 se shuru hoga):
          let hellProj = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            this.data.hellAttack,
            this.imageUrl,
            this.bgSize
          );
          hellProj.frameIndex = 4; // Start from Frame 5 (Index 4)
          hellProj.isItachiHellAttack = true;
          hellProj.damage = 0.5;
          projectiles.push(hellProj);
          this.bulletFired = true;
        }

        // ⏳ THE FIX: Itachi 300 ticks tak pose hold karega
        this.itachiHellTimer = (this.itachiHellTimer || 0) + 1;
        if (this.itachiHellTimer < 45) {
          // 🛑 ASLI BUG YAHAN THA! 'currentFrames' ki jagah 'currentFrames[3]' aayega
          this.showFrame(currentFrames[3]);
          return;
        } else {
          this.bulletFired = false;
          this.itachiHellTimer = 0;
          this.isAttacking = false;
          this.setState("idle"); // 300 ticks baad Itachi normal khada ho jayega
          return;
        }
      }
    }
    // ==========================================================
    // 🔥 NAYA JADOO: SSB GOKU KAMEHAMEHA (Scale 2.5) FIRE LOGIC
    // ==========================================================
    // if (this.state === "kamehameha" && this.id === "teammate") {
    if (
      this.state === "kamehameha" &&
      (this.id === "teammate" ||
        (this.imageUrl && this.imageUrl.includes("gokussb")))
    ) {
      //  if (this.frameIndex === 5) {

      // Engine frame 1 se 5 tak normal chalayega
      // Jab 6th Frame (Index 5) aaye, tab beam niklegi!
      if (this.frameIndex === 5) {
        if (!this.bulletFired) {
          let projX = this.scaleX === 1 ? this.x + 40 : this.x - 40;
          let projY = this.y - 10;
          // Tune jo Exact Size diya tha: w 421, h 130, x 360, y 936
          let ssbBeamData = [{ x: 481, y: 920, w: 373, h: 123 }];

          let ssbBeam = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            ssbBeamData,
            this.imageUrl,
            this.bgSize,
            this
          );

          ssbBeam.isSSBKamehameha = true;
          // Isko alag se pehchanne ka Naya Tag!
          projectiles.push(ssbBeam);
          this.bulletFired = true;
        }

        // Pose Hold Logic (Jab tak beam screen par hai, ruka rahega)
        this.ssbKamTimer = (this.ssbKamTimer || 0) + 1;
        if (this.ssbKamTimer < 90) {
          // 90 ticks hold karega
          this.showFrame(currentFrames[5]); // 6th frame par pose freeze
          return;
        } else {
          this.bulletFired = false;
          this.ssbKamTimer = 0;
          this.isAttacking = false;
          this.setState("idle");
          return;
        }
      }
    }
    // ==========================================================
    // NAYA: EXTRA ATTACK LOGIC (Teleport + Hawa se Goli)
    // ==========================================================
    // NAYA: EXTRA ATTACK LOGIC (Hover Lock + Big Attack)
    // ==========================================================
    if (this.state === "extraAttack" && this.id === "enemy") {
      // A. FRAME 4 (Index 3) PAR TELEPORT
      if (this.frameIndex === 3 && !this.teleported) {
        // let target = player1;
        // if (target) {
        let target = getSmartTarget(this) || player1;
        if (target && target.health > 0) {
          let gap = 55;

          if (target.scaleX === 1) {
            this.x = target.x - gap;
            this.scaleX = 1;
          } else {
            this.x = target.x + gap;
            this.scaleX = -1;
          }

          // Tumhari demand ke hisaab se 250px upar teleport!
          this.y = 40 + 280;
          this.jumping = true;
          this.velocityY = 0;
          this.moveLeft = false;
          this.moveRight = false;
          this.kbVelocityX = 0; // Hawa mein speed zero kar di taaki gire na
        }
        this.teleported = true;
      }

      // B. FRAME 6 (Index 5) PAR BIG GOLI FIRE AUR POSE LOCK 🔥
      if (this.frameIndex === 6) {
        // 1. Goli Fire (Sirf ek baar)
        // let projX = this.scaleX === 1 ? this.x + -150 : this.x - -0;
        //  let projY = this.y + -120;
        // X-Axis: Right ke liye -50, Left ke liye -60 kiya (Taaki Left mein thoda aur peeche aaye)
        // 1. Goli Fire (Sirf ek baar)
        if (!this.bulletFired) {
          // 🔥 NAYA: Engine base se ghumayega, toh sirf haath ki position do!
          let projX = this.scaleX === 1 ? this.x - 80 : this.x + 80; // Haath ka X
          let projY = this.scaleX === 1 ? this.y - 40 : this.y - 80; // Haath ka Y

          let extraBullet = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            this.data.extraProj,
            this.imageUrl,
            this.bgSize
          );
          extraBullet.isDiagonal = true; // Ye jadoo ke liye zaroori hai
          projectiles.push(extraBullet);
          this.bulletFired = true;
        }

        // 2. FRAME 6 KO HAWA MEIN FREEZE RAKHNE KA JADOO ✨
        this.extraTimer = (this.extraTimer || 0) + 1;

        if (this.extraTimer < 50) {
          // 15 ticks (1 second) tak Goku hawa mein Lock rahega!
          this.showFrame(this.data[this.state][6]); // Pose roke rakho
          return; // Engine ko aage mat badhne do
        } else {
          // Timer khatam, goli chali gayi, ab lock khol do!
          this.extraTimer = 0;
          // Iske baad engine automatically usko wapas zameen par normal gira dega
        }
      }
    }
    // ==========================================
    // 🔥 NAYA JADOO: FRIEZA HELL ATTACK (Aar-Paar Wali Goli)
    // ==========================================
    //if (this.state === "hellAttack" && this.id === "enemy2") {
    if (
      this.state === "hellAttack" &&
      this.imageUrl &&
      this.imageUrl.includes("frieza")
    ) {
      // Index 2 (3rd frame) par goli fire hogi!
      if (this.frameIndex === 2) {
        if (!this.bulletFired) {
          let projX = this.scaleX === 1 ? this.x + 35 : this.x - 150; // Goli haath ke aage
          let projY = this.y + 0;

          // 🎯 TERA LOGIC: Aakhiri 3 frames (Index 3, 4, 5) ko goli bana liya!
          let projFrames = this.data.hellAttack.slice(3, 6);

          let friezaHell = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            projFrames,
            this.imageUrl,
            this.bgSize
          );

          friezaHell.damage = 7;
          friezaHell.isFriezaHell = true; // 🔥 NAYA TAG: Taki engine ko pata chale ye special goli hai
          let originalGetHitbox = friezaHell.getHitbox.bind(friezaHell);
          friezaHell.getHitbox = function () {
            let hit = originalGetHitbox();
            if (!hit) return null;

            hit.h = hit.h + 80; // Box ki height 80px lamba kar di!
            hit.y = hit.y - 50; // Box ko 60px neeche (zameen ki taraf) khiska diya!

            return hit;
          };
          projectiles.push(friezaHell);
          this.bulletFired = true;
        }
      }

      // Goli nikalne ke baad engine ko aage frame chalane se roko aur Idle kar do
      if (this.frameIndex > 2) {
        this.bulletFired = false;
        this.isAttacking = false;
        this.setState("idle");
        return;
      }
    }
    // ==========================================
    // HELL ATTACK (PERFECT CINEMATIC TIMING)
    // ==========================================
    if (this.state === "hellAttack" && this.id === "enemy") {
      // 1. FRAME 8 (Index 7): First Hold (0.5 Sec)
      if (this.frameIndex === 7) {
        this.hellTimer1 = (this.hellTimer1 || 0) + 1;
        if (this.hellTimer1 < 3) {
          // 5 ticks = approx 0.5 sec
          this.showFrame(currentFrames[7]); // Frame 8 par roke rakho
          return;
        }
      }

      // 2. FRAME 14 (Index 13): Second Hold (0.5 Sec) aur FIR Goli Fire
      if (this.frameIndex === 13) {
        this.hellTimer2 = (this.hellTimer2 || 0) + 1;

        // A. Pehle 0.5 second tak Frame 14 par Hold karo
        if (this.hellTimer2 < 3) {
          this.showFrame(currentFrames[13]);
          return;
        }
        // B. Jaise hi Hold khatam ho (timer 5 ho jaye), Goli Fire karo!
        else if (this.hellTimer2 === 3) {
          if (!this.bulletFired) {
            // Goli Goku ke thoda aage se niklegi (110 px)
            let projX = this.scaleX === 1 ? this.x + 50 : this.x - 50;
            let projY = this.y + 10;

            let hellBullet = new Projectile(
              this.id,
              projX,
              projY,
              this.scaleX,
              this.data.hellBullet,
              this.imageUrl,
              this.bgSize,
              this
            );
            hellBullet.isHellBullet = true;
            hellBullet.ownerTeam = this.team;
            hellBullet.ownerUniqueId = this._uniqueId;
            projectiles.push(hellBullet);

            this.bulletFired = true;
          }
          // Yahan humne जानबूझकर (deliberately) 'return' nahi lagaya hai
          // Taaki engine goli fire karte hi agle step (Frame 15) par chala jaye.
        }
      }

      // 3. FRAME 15 (Index 14): WAIT FOR IMPACT (Goli takrane ka intezaar)
      if (this.frameIndex === 14) {
        // Engine check karega ki screen par goli zinda hai ya nahi
        let bulletActive = projectiles.some(
          (p) => p.ownerId === this.id && p.isHellBullet
        );

        if (bulletActive) {
          this.showFrame(currentFrames[14]); // Goku ko Frame 15 par Freeze rakho
          return;
        } else {
          // Goli Hit ho gayi ya screen se bahar nikal gayi!
          // Sab kuch Reset karo aur Idle (Normal) state mein aa jao
          this.bulletFired = false;
          this.hellTimer1 = 0;
          this.hellTimer2 = 0;
          this.isAttacking = false;
          this.setState("idle");
          return;
        }
      }
    }
    // ==========================================
    // 🔥 SUKUNA HELL ATTACK (MALEVOLENT SHRINE SPAWN)
    // ==========================================
    //  if (this.state === "hellAttack" && this.id === "enemy3") {
    //const isSukunaProfile =
    // this.id === "enemy3" ||
    //this.charRole === "enemy3" ||
    // (this.imageUrl && this.imageUrl.includes("sukuna"));
    const isSukunaProfile =
      this.id.includes("enemy3") ||
      this.id.includes("enemy4") ||
      this.id.includes("enemy5") ||
      this.id.includes("enemy6") ||
      this.id.includes("enemy7") ||
      this.id.includes("teammate4") ||
      this.id.includes("teammate5") ||
      this.id.includes("teammate6") ||
      this.id.includes("teammate7") ||
      this.charRole === "enemy3" ||
      //this.charRole === "enemy3" ||
      (this.imageUrl && this.imageUrl.includes("sukuna"));

    if (this.state === "hellAttack" && isSukunaProfile) {
      // Pose 3 (Index 2) par aate hi 300px aage House spawn hoga
      if (this.frameIndex === 2) {
        if (!this.bulletFired) {
          let houseFrames = this.data.hellAttack.slice(3);
          let shrineFrames = [
            { w: 273, h: 98, x: 10, y: 2275 },
            { w: 274, h: 132, x: 322, y: 2243 },
            { w: 274, h: 132, x: 621, y: 2243 },
            { w: 274, h: 146, x: 912, y: 2229 },
            { w: 273, h: 187, x: 1203, y: 2188 },
            { w: 374, h: 155, x: 875, y: 2441 },
            { w: 463, h: 174, x: 1274, y: 2441 },
            { w: 416, h: 270, x: 3, y: 2673 },
            { w: 429, h: 237, x: 455, y: 2705 },
            { w: 429, h: 263, x: 906, y: 2678 },
            { w: 623, h: 455, x: 7, y: 3171 },
            { w: 688, h: 591, x: 637, y: 3034 },
            { w: 592, h: 612, x: 1331, y: 3025 },
          ];

          // Frames 4 to 16 (House Frames)
          let lastF = houseFrames[houseFrames.length - 1];
          let houseW = lastF ? lastF.w : 592;

          // 🎯 300px aage spawn position + Screen Boundary Safety
          let spawnX;
          let offsetForward = 200;

          if (this.scaleX === 1) {
            spawnX = this.x + offsetForward;
            // Agar right side me screen khatam ho rahi hai:
            if (spawnX + houseW > WORLD_WIDTH - 20) {
              spawnX = Math.max(20, WORLD_WIDTH - houseW - 20);
            }
          } else {
            spawnX = this.x - offsetForward - houseW;
            // Agar left side me screen khatam ho rahi hai:
            if (spawnX < 20) {
              spawnX = 20;
            }
          }

          let spawnY = 40; // Exact Zameen par

          let shrine = new Projectile(
            this.id,
            spawnX,
            spawnY,
            this.scaleX,
            shrineFrames,
            // houseFrames,
            this.imageUrl,
            this.bgSize,
            this
          );
          shrine.isSukunaShrine = true;
          projectiles.push(shrine);
          this.bulletFired = true;
        }
        this.showFrame({ w: 23, h: 60, x: 160, y: 2180 });
        // Sukuna 90 ticks tak pose hold karega
        this.sukunaHellTimer = (this.sukunaHellTimer || 0) + 1;
        if (this.sukunaHellTimer < 90) {
          // Pose 3 par freeze
          return;
        } else {
          this.bulletFired = false;
          this.sukunaHellTimer = 0;
          this.isAttacking = false;
          this.setState("idle");
          return;
        }
      }
    }
    // ==========================================
    // 🔥 NAYA JADOO: JIREN MEDIUM ATTACK (Zero Delay Fire)
    // ==========================================
    if (this.state === "mediumAttack" && this.id === "teammate2") {
      // Pose 1 aur 2 normal play honge (Index 0 aur 1)
      // Jaise hi Pose 3 (Index 2) aaye -> Goli fire karo!
      if (this.frameIndex >= 2) {
        if (!this.bulletFired) {
          let projX = this.scaleX === 1 ? this.x + 60 : this.x - 60;
          let projY = this.y - 5;
          // Frame 4 se aakhiri tak goli ke frames:
          let projFrames = this.data.mediumAttack.slice(3);

          let jirenMed = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            projFrames,
            this.imageUrl,
            this.bgSize,
            this
          );
          jirenMed.isJirenMedium = true; // 🎯 Giant Ball Tag
          jirenMed.damage = 1;
          projectiles.push(jirenMed);
          this.bulletFired = true;
        }
        // Goli nikalte hi Jiren turant free (No pose hold!)
        this.bulletFired = false;
        this.isAttacking = false;
        this.setState("idle");
        return;
      }
    }

    // ==========================================
    // MEDIUM ATTACK LOGIC (4 Pose Frames + 1 Goli)
    // ==========================================
    if (this.state === "mediumAttack" && this.id === "enemy") {
      // Engine Frame 1 (Index 0) se Frame 3 (Index 2) tak apne aap normal speed mein play karega.

      // Jab 4th Frame (Index 3) aaye:
      if (this.frameIndex === 3) {
        // 1. Ek baar goli fire karo
        if (!this.bulletFired) {
          // Image ki position (Neeche lane ke liye -10 ekdum theek hai)
          let projX = this.scaleX === 1 ? this.x + -400 : this.x - -60;
          let projY = this.y - 10;

          let medBullet = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            this.data.mediumBullet,
            this.imageUrl,
            this.bgSize
          );

          // =========================================================
          // BOSS MAGIC: RED BOX KO 70px NEECHE KHEENCHNA
          // =========================================================
          let originalGetHitbox = medBullet.getHitbox.bind(medBullet);
          medBullet.getHitbox = function () {
            let hit = originalGetHitbox(); // Normal box uthao

            hit.h = hit.h + 70; // 1. Height ko 70px lamba kiya
            hit.y = hit.y - 70; // 2. Box ko 70px neeche shift kar diya (Taki image na hile)

            return hit;
          };
          // =========================================================

          projectiles.push(medBullet);
          this.bulletFired = true;
        }

        // 2. Fire karne ke baad thoda sa hold (2-3 ticks) aur fir wapas Idle (Normal pose)
        this.medTimer = (this.medTimer || 0) + 1;
        if (this.medTimer < 3) {
          // 3 ticks tak pose rok kar rakhega
          this.showFrame(currentFrames[3]);
          return;
        } else {
          // Timer khatam, sab reset kar do
          this.bulletFired = false;
          this.medTimer = 0;
          this.isAttacking = false;
          this.setState("idle");
          return;
        }
      }
    }
    //if (this.state === "kamehameha" && this.id === "enemy") {
    if (
      this.state === "kamehameha" &&
      (this.id === "enemy" ||
        (this.imageUrl && this.imageUrl.includes("gokublack")))
    ) {
      if (this.frameIndex === 5) {
        this.beamTimer = (this.beamTimer || 0) + 1;

        this.showFrame(currentFrames[5]);

        if (this.beamTimer > 5) {
          this.frameIndex = 6;

          this.beamTimer = 0;
          this.element.style.opacity = "0";
        }

        return; // Engine ko yahin rok do
      }

      // B. Frame 7 (Index 6) - The Growing Beam!

      if (this.frameIndex === 6) {
        this.element.style.opacity = "1";
        this.beamTimer = (this.beamTimer || 0) + 1;

        let gokuBodyWidth = 60;

        let currentWidth = gokuBodyWidth + this.beamTimer * 40;

        let maxWidth = currentFrames[6].w;

        if (currentWidth > maxWidth) currentWidth = maxWidth;

        this.element.style.width = currentWidth + "px";

        this.element.style.height = currentFrames[6].h + "px";

        this.element.style.backgroundImage = `url("${this.imageUrl}")`;

        this.element.style.backgroundPosition = `-${currentFrames[6].x}px -${currentFrames[6].y}px`;

        this.element.style.backgroundSize = this.bgSize;

        if (this.beamTimer > 50) {
          this.beamTimer = 0;

          this.isAttacking = false;
          this.element.style.opacity = "1";
          this.setState("idle");
        }

        return;
      }
    }
    // ==========================================
    // ⚡ SASUKE KI-BLAST (INDEX 4 PAR GOLI + NO HOLD ZERO DELAY)
    // ==========================================
    if (this.state === "kiBlast" && this.id === "sasuke") {
      // Frame 1 se 4 (Index 0 to 3) normal pose chalega
      // Jaise hi Frame 5 (Index 4) aaye -> Goli fire hogi!
      if (this.frameIndex === 3) {
        if (!this.bulletFired) {
          let projX = this.scaleX === 1 ? this.x + 40 : this.x - 40;
          let projY = this.y - 5;

          // 🎯 Frame 5 se 8 (Index 4 to 8) goli ke frames:
          let projFrames = this.data.kiBlast.slice(4, 8);

          let sasukeBullet = new Projectile(
            this.id,
            projX,
            projY,
            this.scaleX,
            projFrames,
            this.imageUrl,
            this.bgSize,
            this
          );
          sasukeBullet.damage = 7;
          projectiles.push(sasukeBullet);
          this.bulletFired = true;
        }

        // ⚡ Goli nikalte hi TURANT FREE (No Hold, Zero Delay):
        this.bulletFired = false;
        this.isAttacking = false;
        this.setState("idle");
        return;
      }
    }
    // ==========================================
    // 🔥 NAYA JADOO: KI CHARGE (LONG PRESS HOLD LOGIC) 🔥
    // =======================================
    // ==========================================================
    // 🔥 GOKU BLACK KI CHARGE (Player L1 Hold & AI Dono ke liye)
    // ==========================================================
    if (this.state === "kiCharge" && this.id === "enemy") {
      let stopCharging = this.isControlledByPlayer
        ? !isL1Pressed || this.ep >= 800
        : !this.isCharging || this.ep >= 800;

      if (stopCharging) {
        this.isCharging = false;
        this.isAttacking = false;
        this.setState("idle");
        return;
      }

      this.showFrame(currentFrames[this.frameIndex]);
      this.frameIndex++;

      if (this.frameIndex > 4 || this.frameIndex >= currentFrames.length) {
        this.ep += 20;
        if (this.ep > 800) this.ep = 800;
        updateEpBars();
        if (this.miniBar) this.updateMiniBars();
        playSfx("charge", 1.5);
        this.frameIndex = 2; // Loop
      }
      return;
    }

    // 3. NORMAL ANIMATION (Agar upar ke attacks nahi ho rahe toh yeh chalega)
    this.showFrame(currentFrames[this.frameIndex]);

    this.frameIndex++;

    if (this.frameIndex >= currentFrames.length) {
      if (this.state === "death") {
        this.frameIndex = currentFrames.length - 1;
      } else if (this.state === "hit") {
        this.setState("idle");
      } else if (
        this.state === "punch" ||
        this.state === "kick" ||
        this.state === "kiBlast" ||
        this.state === "smashPunch" ||
        this.state === "hellPunch" ||
        this.state === "smashKick" ||
        this.state === "extraAttack" ||
        this.state === "kiAttack" ||
        this.state === "hellKick" ||
        this.state === "hellAttack" ||
        this.state === "teleport" ||
        this.state === "dash" ||
        this.state === "fireBallAttack" ||
        this.state === "fireStyleAttack"
      ) {
        this.isAttacking = false;
        if (
          this.id === "enemy" &&
          !this.isControlledByPlayer &&
          Math.random() < 0.4
        ) {
          this.dash(); // Goku ne chakma de diya!
          return; // Engine ko yahin rok do taaki wo Idle na ho
        }

        this.setState(this.jumping ? "jump" : "idle");
      } else if (this.state === "jump") {
        this.frameIndex = currentFrames.length - 1;
      } else {
        this.frameIndex = 0;
      }
    }
  }

  jump() {
    if (
      !this.jumping &&
      !this.isAttacking &&
      this.state !== "hit" &&
      this.state !== "death"
    ) {
      this.jumping = true;
      this.velocityY = 26;
      this.setState("jump");
      playSfx("jump", 2);
    }
  }

  punch() {
    if (!this.isAttacking && this.state !== "hit" && this.state !== "death") {
      this.isAttacking = true;
      this.setState("punch");
    }
  }

  kick() {
    if (!this.isAttacking && this.state !== "hit" && this.state !== "death") {
      this.isAttacking = true;
      this.setState("kick");
    }
  }
  // ==========================================
  // NAYA ATTACK: SMASH KICK (3 Frames)
  // ==========================================
  smashKick() {
    // ✅ AB R1 DASH MEIN BHI BIG KAMEHAMEHA CHALEGA:
    if (
      (!this.isAttacking || this.state === "kiCharge") &&
      this.state !== "hit" &&
      this.state !== "death"
    ) {
      this.isAttacking = true;
      this.setState("smashKick");
      if (!this.jumping) {
        this.moveLeft = false;
        this.moveRight = false;
      }
    }
  }
  kiBlast() {
    if (!this.isAttacking && this.state !== "hit" && this.state !== "death") {
      if (!this.consumeEp()) return;
      this.isAttacking = true;

      this.setState("kiBlast");
      if (!this.jumping) {
        this.moveLeft = false;
        this.moveRight = false;
      }
    }
  }
  // ==========================================
  // 🔥 NAYA JADOO: DEKU TELEPORT (R2 BUTTON)
  // ==========================================
  teleport() {
    if (
      (!this.isAttacking || this.state === "hit" || this.state === "block") &&
      this.state !== "death"
    ) {
      // 🔴 THE BOSS HACK: Agar Player (Deku) hai toh EP kategi, lekin Enemy (Goku) ke liye bilkul FREE!
      if (this.id === "player") {
        if (!this.consumeEp()) return;
      }

      this.isAttacking = true;
      this.setState("teleport");
      if (!this.jumping) {
        this.moveLeft = false;
        this.moveRight = false;
      }
    }
  }
  // ==========================================
  // 🔥 NAYA ATTACK: ITACHI FIRE STYLE ATTACK
  // ==========================================
  fireStyleAttack() {
    if (
      (!this.isAttacking || this.state === "dash") &&
      this.state !== "hit" &&
      this.state !== "death"
    ) {
      if (!this.consumeEp()) return; // EP kategi
      this.isAttacking = true;
      this.setState("fireStyleAttack");
      this.bulletFired = false;
      this.itachiFireTimer = 0;

      if (!this.jumping) {
        this.moveLeft = false;
        this.moveRight = false;
      }
    }
  }
  // ==========================================
  // 🔥 NAYA JADOO: ESCAPE DASH (Hit Hone Par Bhi Chalega)
  // ==========================================
  // ==========================================
  // 🔥 NAYA JADOO: ESCAPE & AERIAL DASH (Block Override)
  // ==========================================
  dash() {
    // 🔴 NAYA JADOO: Ab pit raha ho ("hit") YA Block kar raha ho ("block"), dono mein Dash chalega!
    if (
      (!this.isAttacking || this.state === "hit" || this.state === "block") &&
      this.state !== "death"
    ) {
      this.kbVelocityX = 0;

      // Agar Block dabakar dash kiya hai, toh Block turant hata do!
      this.isBlocking = false;

      this.isAttacking = true;
      this.setState("dash");
    }
  }
  // ==========================================
  // NAYA ATTACK: KI ATTACK (9 Frames)
  // ==========================================
  kiAttack() {
    if (!this.isAttacking && this.state !== "hit" && this.state !== "death") {
      if (!this.consumeEp()) return;
      this.isAttacking = true;
      this.setState("kiAttack"); // Goku ko state de di
      if (!this.jumping) {
        this.moveLeft = false; // Chalna band karega
        this.moveRight = false;
      }
    }
  }
  hellAttack() {
    // 🔴 THE MASTER FIX: Agar Deku khada hai, YA FIR Charge (kiCharge) kar raha hai, toh dono time attack chalega!
    if (
      (!this.isAttacking || this.state === "kiCharge") &&
      this.state !== "hit" &&
      this.state !== "death"
    ) {
      if (!this.consumeEp()) return; // Attack ke liye EP check karega

      this.isAttacking = true;
      this.isCharging = false; // 👈 NAYI LINE: Charging ko turant Switch OFF kar do!

      this.setState("hellAttack");
      this.bulletFired = false;
      this.teleport1 = false; // 👈 Reset
      this.teleport2 = false;
      this.ssbHellHoldTimer = 0;
      if (!this.jumping) {
        this.moveLeft = false;
        this.moveRight = false;
      }
    }
  }

  kiCharge() {
    if (!this.isAttacking && this.state !== "hit" && this.state !== "death") {
      this.isAttacking = true;
      this.isCharging = true; // Switch ON for long press
      this.setState("kiCharge");
      playSfx("charge", 1.5);
      if (!this.jumping) {
        this.moveLeft = false;
        this.moveRight = false;
      }
    }
  }
  mediumAttack() {
    if (this.isAttacking) return;
    this.isAttacking = true;
    this.setState("mediumAttack");
    this.bulletFired = false; // Goli fire hone ka switch reset
  }
  // NAYA FUNCTION: Kamehameha Trigger
  // NAYA FUNCTION: Instant Transmission (Teleport)
  // ==========================================
  // 🔥 NAYA JADOO: GOKU BLACK INSTANT TRANSMISSION (Z-Vanish)
  // ==========================================
  instantTransmission(target) {
    // NAYA JADOO: Hit state mein bhi teleport chalega
    if ((!this.isAttacking || this.state === "hit") && this.state !== "death") {
      // Goku ki bhi 20 EP kategi!

      this.isAttacking = true;
      this.setState("instantTransmission");
      this.targetPlayer = target; // Deku ko track karne ke liye save kiya

      // Teleport karte waqt chalna band karega
      if (!this.jumping) {
        this.moveLeft = false;
        this.moveRight = false;
      }
    }
  }
  block() {
    // NAYA JADOO: Ab pit'te hue ("hit" state se) bhi direct block ho payega!
    if ((!this.isAttacking || this.state === "hit") && this.state !== "death") {
      // 🔴 THE VIP FIX: Agar EP 0 (ya 0 se kam) hai, toh Block button kaam nahi karega!
      if (this.ep <= 0) {
        return; // Engine yahi se wapas ghoom jayega, Block pose nahi banega
      }

      this.isAttacking = true;
      this.isBlocking = true; // Switch ON
      this.setState("block");
      if (!this.jumping) {
        this.moveLeft = false;
        this.moveRight = false;
      }
    }
  }

  // ==========================================
  // NAYA ATTACK: HELL PUNCH (4 Frames)
  // ==========================================
  hellPunch() {
    if (!this.isAttacking && this.state !== "hit" && this.state !== "death") {
      this.isAttacking = true;
      this.setState("hellPunch");
      if (!this.jumping) {
        this.moveLeft = false;
        this.moveRight = false;
      }
    }
  }
  // ==========================================
  // 🔥 NAYA ATTACK: ITACHI FIRE BALL
  // ==========================================
  fireBallAttack() {
    if (
      (!this.isAttacking || this.state === "teleport") &&
      this.state !== "hit" &&
      this.state !== "death"
    ) {
      if (!this.consumeEp()) return; // Goli maarne me EP kategi
      this.isAttacking = true;
      this.setState("fireBallAttack");
      this.bulletFired = false;

      if (!this.jumping) {
        this.moveLeft = false;
        this.moveRight = false;
      }
    }
  }
  // ==========================================
  // NAYA ATTACK: SMASH PUNCH
  // ==========================================
  // ==========================================
  // NAYA ATTACK: SMASH PUNCH (L1 + Punch)
  // ==========================================
  smashPunch() {
    // 🔴 MASTER FIX: Agar Deku khada hai, YA FIR Charge (kiCharge) kar raha hai, toh dono time chalega!
    if (
      (!this.isAttacking || this.state === "kiCharge") &&
      this.state !== "hit" &&
      this.state !== "death"
    ) {
      // Deku ke Smash Punch ke liye thodi EP (Stamina) kategi
      if (this.id === "player") {
        if (!this.consumeEp()) return;
      }

      this.isAttacking = true;
      this.isCharging = false; // Charging turant Switch OFF kar do

      this.setState("smashPunch");
      if (!this.jumping) {
        this.moveLeft = false;
        this.moveRight = false;
      }
    }
  }

  // ==========================================
  // 🔥 NAYA JADOO: DEKU HELL KICK (Teleport Drop Kick)
  // ==========================================
  hellKick() {
    if (!this.isAttacking && this.state !== "hit" && this.state !== "death") {
      if (!this.consumeEp()) return; // Isme bhi EP lagegi
      this.isAttacking = true;
      this.setState("hellKick");
      this.teleported = false; // Teleport ka switch reset
      if (!this.jumping) {
        this.moveLeft = false;
        this.moveRight = false;
      }
    }
  }
  // ==========================================
  // NAYA CINEMATIC ATTACK: EXTRA ATTACK (7+ Frames)
  // ==========================================
  extraAttack() {
    if (
      (!this.isAttacking || this.state === "kiCharge") &&
      this.state !== "hit" &&
      this.state !== "death"
    ) {
      if (!this.consumeEp()) return;
      this.isAttacking = true;
      this.setState("extraAttack");
      this.bulletFired = false; // Goli ka lock reset
      this.teleported = false; // Teleport ka lock reset
      if (!this.jumping) {
        this.moveLeft = false;
        this.moveRight = false;
      }
    }
  }
  // ==========================================
  // 🔥 NAYA CINEMATIC ATTACK: BIG KAMEHAMEHA
  // ==========================================
  bigKamehameha() {
    // ✅ AB R1 DASH MEIN BHI BIG KAMEHAMEHA CHALEGA:
    if (
      (!this.isAttacking ||
        this.state === "dash" ||
        this.state === "teleport") &&
      this.state !== "hit" &&
      this.state !== "death"
    ) {
      if (!this.consumeEp()) return; // Stamina check

      this.isAttacking = true;
      this.setState("bigKamehameha");

      this.bulletFired = false;

      if (!this.jumping) {
        this.moveLeft = false;
        this.moveRight = false;
      }
    }
  }
  kamehameha() {
    if (
      (!this.isAttacking ||
        this.state === "dash" ||
        this.state === "teleport") &&
      this.state !== "hit" &&
      this.state !== "death"
    ) {
      if (!this.consumeEp()) return;
      this.isAttacking = true;

      this.setState("kamehameha");
      // Attack karte waqt chalna band kar dega
      this.ssbKamTimer = 0;
      this.friezaKamTimer = 0;
      this.beamTimer = 0;

      if (!this.jumping) {
        this.moveLeft = false;

        this.moveRight = false;
      }
    }
  }
}

// ==========================================
// 3. PROJECTILE CLASS (Super Fast Bullet)
// ==========================================
class Projectile {
  constructor(
    ownerId,
    x,
    y,
    scaleX,
    frames,
    imageUrl,
    bgSize,
    ownerFighter = null
  ) {
    //  this.ownerId = ownerId;
    // this.owner =
    //   ownerFighter ||
    //   activeMatchFighters.find(
    //    (f) => f._uniqueId === ownerId || f.id === ownerId
    //   );
    // this.ownerTeam = this.owner
    /* this.owner =
      ownerFighter ||
      activeMatchFighters.find((f) => f._uniqueId === ownerId) ||
      activeMatchFighters.find((f) => f.id === ownerId);
    this.ownerTeam = this.owner
      ? this.owner.team
      : ownerId === "player"
      ? "p1"
      : "enemy";*/
    this.owner = ownerFighter || window.currentAnimatingFighter || null;
    /* if (!this.owner && typeof activeMatchFighters !== "undefined") {
      this.owner =
        activeMatchFighters.find(
          (f) => f._uniqueId === ownerId || f.id === ownerId
        ) || null;
    }*/

    this.ownerId = this.owner ? this.owner._uniqueId : ownerId; // 👈 "player" ke bajaye automatically "teammate4", "enemy2" ban jayega!
    this.ownerTeam = this.owner
      ? this.owner.team
      : ownerId === "player"
      ? "p1"
      : "enemy";
    this.ownerUniqueId = this.owner ? this.owner._uniqueId : ownerId;
    // this.ownerUniqueId = this.owner ? this.owner._uniqueId : ownerId;
    this.x = x;
    this.y = y;
    this.scaleX = scaleX;
    this.frames = frames;
    this.imageUrl = imageUrl; // 👈 YEH LINE ADD KAREIN
    this.bgSize = bgSize;
    // BULLET SPEED: 10px per frame! (Ekdum goli ki tarah jayegi)
    this.speed = 10 * scaleX;

    // DAMAGE: Direct 7 HP, lagte hi gayab
    this.damage = 7;

    this.frameIndex = 0;
    this.active = true;

    this.element = document.createElement("div");
    this.element.className = "projectile";
    this.element.style.backgroundImage = `url("${imageUrl}")`;
    this.element.style.backgroundSize = bgSize;
    this.element.style.transform = `scaleX(${this.scaleX})`;
    if (this.frames && this.frames.length > 0) {
      let firstF = this.frames[0];
      this.element.style.width = firstF.w + "px";
      this.element.style.height = firstF.h + "px";
      this.element.style.backgroundPosition = `-${firstF.x}px -${firstF.y}px`;
    }

    this.element.style.opacity = "0";
    //game.appendChild(this.element);
    (document.getElementById("stageContainer") || game).appendChild(
      this.element
    );

    if (DEBUG_MODE) {
      this.hitboxDiv = document.createElement("div");
      this.hitboxDiv.className = "debug-hitbox";
      (document.getElementById("stageContainer") || game).appendChild(
        this.hitboxDiv
      );

      //game.appendChild(this.hitboxDiv);
    }
  }

  update() {
    if (!this.active) return;
    this.element.style.opacity = "1";
    if (
      this.isItachiFireStyle ||
      this.isSSBKamehameha ||
      this.isFriezaKamehameha ||
      this.isBigKamehameha ||
      this.isSSBHellBeam
    ) {
      // let owner =
      // activeFighterMap[this.ownerId] ||
      //  activeMatchFighters.find(
      //    (f) => f.id === this.ownerId || f._uniqueId === this.ownerId
      //    );
      let owner =
        this.owner ||
        activeMatchFighters.find(
          (f) => f._uniqueId === this.ownerId || f.id === this.ownerId
        ) ||
        activeFighterMap[this.ownerId];

      // 🛑 Agar fighter ne attack chhod diya, hit hua ya mar gaya toh beam turant gayab:
      if (
        !owner ||
        owner.health <= 0 ||
        (owner.state !== "kamehameha" &&
          owner.state !== "bigKamehameha" &&
          owner.state !== "fireStyleAttack" &&
          owner.state !== "hellAttack")
      ) {
        this.destroy();
        return;
      }
      this.scaleX = owner.scaleX;
      if (this.isSSBKamehameha || this.isFriezaKamehameha) {
        this.x = owner.scaleX === 1 ? owner.x + 40 : owner.x - 40;
        this.y = owner.y - 10;
      } else if (this.isBigKamehameha) {
        this.x = owner.scaleX === 1 ? owner.x + 60 : owner.x - 60;
        this.y = owner.y + 10;
      } else if (this.isSSBHellBeam) {
        this.x = owner.scaleX === 1 ? owner.x - 10 : owner.x + 10;
        this.y = owner.y + 5;
      } else if (this.isItachiFireStyle) {
        this.x = owner.scaleX === 1 ? owner.x + 30 : owner.x - 30;
        this.y = owner.y + 10;
      }
    }

    let moveSpeedX = this.speed;
    let moveSpeedY = 0;
    // ==========================================
    // BOSS MAGIC: HELL BULLET GROW LOGIC (x1 -> x5)
    // ==========================================
    if (this.isHellBullet) {
      this.scaleTimer = (this.scaleTimer || 0) + 1;
      this.currentScale = this.currentScale || 1; // Shuru mein normal size

      // Har 5 ticks mein check karo
      if (this.scaleTimer >= 5) {
        this.scaleTimer = 0;

        if (this.currentScale < 5) {
          this.currentScale += 1;
        }
      }

      // 1. VISUAL MAGIC
      let dir = this.scaleX || 1;
      this.element.style.transform = `scaleX(${
        dir * this.currentScale
      }) scaleY(${this.currentScale})`;

      // ====================================================
      // 2. HITBOX MAGIC (Scale + Height Boost + SHIFT UP)
      // ====================================================
      // 🌀 GOKU SSB 60 FPS GRAB LOCK:
      /*
      if (
        this.state === "mediumAttack" &&
        this.id === "teammate" &&
        this.grabbedEnemy
      ) {
        let t = this.grabbedEnemy;
        t.isGrabbedBySSB = true;
        t.state = "hit";
        t.velocityY = 0;
        t.kbVelocityX = 0;

        let offsetX =
          this.frameIndex === 2 ? 40 : this.frameIndex === 3 ? -10 : 35;
        let offsetY =
          this.frameIndex === 2 ? 30 : this.frameIndex === 3 ? 50 : 20;

        t.x = this.scaleX === 1 ? this.x + offsetX : this.x - offsetX;
        t.y = this.y + offsetY;
        t.scaleX = this.frameIndex % 2 === 0 ? 1 : -1;
        t.updateCSS();
      }*/
      // 🔒 BEAM HAATH SE NA CHHOOTNE KA LOCK (Goku SSB, Frieza, Goku Black):
      /*  if (
        this.isSSBKamehameha ||
        this.isFriezaKamehameha ||
        this.isBigKamehameha ||
        this.isSSBHellBeam
      ) {
        let owner = activeFighterMap[this.ownerId];

        // 🛑 AGAR FIGHTER NE POSE CHHOD DIYA YA MAR GAYA, TOH BEAM TURANT KHATAM:
        if (
          !owner ||
          owner.health <= 0 ||
          (owner.state !== "kamehameha" &&
            owner.state !== "bigKamehameha" &&
            owner.state !== "hellAttack")
        ) {
          this.destroy();
          return;
        }

        // Hamesha fighter ke haath ki disha aur position par lock rahegi:
        this.scaleX = owner.scaleX;
        this.x = owner.scaleX === 1 ? owner.x + 35 : owner.x - 35;
        this.y = owner.y - 10;
      }*/
      if (!this.hitboxPatched) {
        let originalGetHitbox = this.getHitbox.bind(this);

        this.getHitbox = function () {
          let hit = originalGetHitbox();
          let scale = this.currentScale || 1;

          let newW = hit.w * scale;

          let heightBoost = 2.5;
          let newH = hit.h * scale * heightBoost;

          // ================================================
          // NAYA JADOO: Box ko UPAR khiskane ke liye (Center position)
          // ================================================
          let shiftUp = 7 * scale; // Jitni badi goli, utna upar shift hoga

          let newX = hit.x - (newW - hit.w) / 2;

          // Yahan 'shiftUp' add kiya taaki box zameen se nikal kar upar aa jaye
          let newY = hit.y - (newH - hit.h) / 2 + shiftUp;

          return { x: newX, y: newY, w: newW, h: newH };
        };
        this.hitboxPatched = true;
      }
    } else if (this.isSasukeHell) {
      let owner = this.owner || activeFighterMap[this.ownerId];
      // if (!owner || owner.health <= 0 || owner.state !== "hellAttack") {
      if (!owner || (owner.health <= 0 && owner.healthBars <= 0)) {
        this.destroy();
        return;
      }
      // 🛑 Goli aage nahi hilegi, Sasuke ke center me fixed rahegi:
      moveSpeedX = 0;
      moveSpeedY = 0;
      this.element.style.zIndex = "6";

      // 🎯 SCALE 3:
      let dir = this.scaleX || 1;
      this.element.style.transform = `translate(0px, 40px) scale(${
        dir * 3
      }, 3)`; // 👈 Yahan "translate(0px, 20px)" add kar diya!

      // ⏳ 250 TICKS DESTROY TIMER:
      this.hellTimer = (this.hellTimer || 0) + 1;
      if (this.hellTimer > 260) {
        this.destroy();
        return;
      }

      // 📦 SCALE 3 HITBOX (Center position):
      if (!this.hitboxPatchedSasukeHell) {
        this.getHitbox = function () {
          let curF = this.frames[this.frameIndex] || this.frames[0];
          if (!curF) return null;

          let scale = 3;
          let newW = curF.w * scale;
          let newH = curF.h * scale;
          let newX = this.x - (newW - curF.w) / 2;
          let newY = this.y - 30;

          return { x: newX, y: newY, w: newW, h: newH };
        };
        this.hitboxPatchedSasukeHell = true;
      }
    } else if (this.isSasukeMedium) {
      // 🛑 Goli aage nahi hilegi, haath ke aage fixed ruki rahegi:
      moveSpeedX = 0;
      moveSpeedY = 0;
      this.element.style.zIndex = "6";

      // 🎯 SCALE 3:
      let dir = this.scaleX || 1;
      let photoShiftX = this.scaleX === 1 ? 25 : -25;
      this.element.style.transform = `translate(${photoShiftX}px, 10px) scale(${
        dir * 3
      }, 3)`;

      // ⏳ 250 TICKS DESTROY TIMER:
      this.medTimer = (this.medTimer || 0) + 1;
      if (this.medTimer > 290) {
        this.destroy();
        return;
      }

      // 📦 SCALE 3 HITBOX:
      if (!this.hitboxPatchedSasukeMed) {
        this.getHitbox = function () {
          let curF = this.frames[this.frameIndex] || this.frames[0];
          if (!curF) return null;

          let scale = 3;
          let newW = curF.w * scale;
          let newH = curF.h * scale;
          let shiftBox = this.scaleX === 1 ? 25 : -25;
          let newX = this.x - (newW - curF.w) / 2 + shiftBox;
          let newY = this.y - 10;

          return { x: newX, y: newY, w: newW, h: newH };
        };
        this.hitboxPatchedSasukeMed = true;
      }
    } else if (this.isFriezaCrossExplosion) {
      let moveSpeedX = 0;
      let moveSpeedY = 0;
      this.element.style.zIndex = "7";

      let dir = this.scaleX || 1;
      this.element.style.transform = `scale(${dir * 2}, 2)`; // 🎯 SCALE 2 HOGAYA!

      if (!this.hitboxPatchedFriezaCrossExp) {
        this.getHitbox = function () {
          let curF = this.frames[this.frameIndex] || this.frames[0];
          if (!curF) return null;
          let scale = 2;
          let shiftRight = 40;
          return {
            x: this.x - (curF.w * scale) / 2 + shiftRight,
            y: this.y - 10,
            w: curF.w * scale,
            h: curF.h * scale,
          };
        };
        this.hitboxPatchedFriezaCrossExp = true;
      }
    } else if (this.isJirenHellBullet) {
      let dir = this.scaleX || 1;
      this.element.style.transform = `scale(${dir * 2}, 2)`;
      this.element.style.zIndex = "6";

      if (!this.hitboxPatchedJirenBullet) {
        this.getHitbox = function () {
          let curF = this.frames[0];
          if (!curF) return null;
          let scale = 2;
          let newW = curF.w * scale;
          let newH = curF.h * scale;
          let newX = this.x - (newW - curF.w) / 2;
          let newY = this.y - 5;
          return { x: newX, y: newY, w: newW, h: newH };
        };
        this.hitboxPatchedJirenBullet = true;
      }
    } else if (this.isJirenHellExplosion) {
      // Animation Goli ki exact location par rukegi
      moveSpeedX = 0;
      moveSpeedY = 0;
      this.element.style.zIndex = "6";

      let dir = this.scaleX || 1;
      this.element.style.transform = `scale(${dir * 2}, 2)`; // 🎯 Scale 2 kar diya!

      if (!this.hitboxPatchedJirenExplosion) {
        this.getHitbox = function () {
          let curF = this.frames[this.frameIndex] || this.frames[0];
          if (!curF) return null;

          let scale = 2;
          let newW = curF.w * scale;
          let newH = curF.h * scale;
          let newX = this.x - (newW - curF.w) / 2;
          let newY = this.y + 15;

          return { x: newX, y: newY, w: newW, h: newH };
        };
        this.hitboxPatchedJirenExplosion = true;
      }
    } else if (this.isItachiMedium) {
      let dir = this.scaleX || 1;
      let bulletSpeed = 12;
      this.x += dir * bulletSpeed;
      let photoShiftX = this.scaleX === 1 ? 35 : 0;
      // 🎯 Scale 4 hoker aage chalegi:
      this.element.style.transform = `translate(${photoShiftX}px, 0px) scale(${
        dir * 2
      }, 2)`;
      this.element.style.zIndex = "6";

      // ⏳ 60 Ticks Destroy Timer:
      this.medTimer = (this.medTimer || 0) + 1;
      if (this.medTimer > 180) {
        this.destroy();
        return;
      }

      // 📦 Scale 4 Hitbox:
      if (!this.hitboxPatchedItachiMed) {
        this.getHitbox = function () {
          let curF = this.frames[this.frameIndex] || this.frames[0];
          if (!curF) return null;

          let scale = 2;
          let newW = curF.w * scale;
          let newH = curF.h * scale;
          let shiftBox = this.scaleX === 1 ? 35 : 0;
          let newX = this.x - (newW - curF.w) / 2 + shiftBox;
          let newY = this.y - 10;

          return { x: newX, y: newY, w: newW, h: newH };
        };
        this.hitboxPatchedItachiMed = true;
      }
    }

    // ==========================================================
    // BINA KUCH DELETE KIYE, YAHAN NEECHE DEKU KA CODE PASTE KARO:
    // ==========================================================
    if (this.isDekuMedium) {
      this.scaleTimer = (this.scaleTimer || 0) + 1;
      this.currentScale = this.currentScale || 1;

      // 1 tick = Scale 2, 2 tick = Scale 3, 3 tick = Scale 4
      if (this.scaleTimer === 1) this.currentScale = 1;
      else if (this.scaleTimer === 2) this.currentScale = 2;
      else if (this.scaleTimer >= 3) this.currentScale = 3;

      let dir = this.scaleX || 1;
      this.element.style.transform = `scaleX(${
        dir * this.currentScale
      }) scaleY(${this.currentScale})`;
      // ==========================================================                         // 2. NEW HEIGHT BOOSTER HACK (Red Box adjustment)                                         // ==========================================================
      if (!this.hitboxPatched) {
        let originalGetHitbox = this.getHitbox.bind(this);
        this.getHitbox = function () {
          let hit = originalGetHitbox();
          let scale = this.currentScale || 1;

          // Width normal scale hogi
          let newW = hit.w * scale;

          // HEIGHT BOOSTER: Pehle 2.5 thaa, ab 4.2 kiya hey taaki poori goli (dragon) cover ho jaye
          let heightBoost = 2;
          let newH = hit.h * scale * heightBoost;
          // POSITION SHIFT: Goli ke scale ke sath Red Box ko thoda upar uthane ke liye
          let shiftUp = 20 * scale;

          let newX = hit.x - (newW - hit.w) / 2;
          let newY = hit.y - (newH - hit.h) / 2 + shiftUp;

          return { x: newX, y: newY, w: newW, h: newH };
        };
        this.hitboxPatched = true;
      }
    }
    // ==========================================
    // 🔥 JIREN GIANT ENERGY BALL (Scale 3 + Hitbox)
    // ==========================================
    // ==========================================
    // 🔥 JIREN GIANT ENERGY BALL (Scale 3 + Full Height Box + 2X Speed)
    // ==========================================
    if (this.isJirenMedium) {
      let dir = this.scaleX || 1;
      this.element.style.transform = `scale(${dir * 3}, 3)`;

      // ⚡ 1. 2X DOUBLE SPEED ANIMATION (Engine se 2 guna tez loop!):
      this.animTimer = (this.animTimer || 0) + 1;
      if (this.animTimer >= 3) {
        // 👈 3 ticks = 2X Tez (Isko 2 karoge toh aur tez ho jayegi)
        this.animTimer = 0;
        this.frameIndex++;
        if (this.frameIndex >= this.frames.length) {
          this.frameIndex = 0; // 🔁 Lagatar Loop!
        }
        let curF = this.frames[this.frameIndex];
        if (curF) {
          this.element.style.width = curF.w + "px";
          this.element.style.height = curF.h + "px";
          this.element.style.backgroundPosition = `-${curF.x}px -${curF.y}px`;
        }
      }

      // 🎯 2. FULL HEIGHT & WIDTH RED HITBOX (Aadhi height ka bug khatam!):
      if (!this.hitboxPatchedJirenMed) {
        this.getHitbox = function () {
          let curF = this.frames[this.frameIndex] || this.frames[0];
          if (!curF) return null;

          let scale = 3;
          let newW = curF.w * scale;
          let newH = curF.h * scale; // 💥 FULL 100% HEIGHT (Zameen se aakash tak poori goli cover hogi!)

          let newX = this.x - (newW - curF.w) / 2;
          let newY = this.y - 15; // Box ko goli ke theek center me rakha

          return { x: newX, y: newY, w: newW, h: newH };
        };
        this.hitboxPatchedJirenMed = true;
      }
    }

    // NAYA LOGIC: Agar badi goli hai (Deku), toh shuru mein ruko.
    // ==========================================

    // ==========================================
    // 🔥 FINAL MASTER JADOO: PERFECT ALIGNMENT + GROWING BEAM 🔥
    // ==========================================
    //let moveSpeedX = this.speed;
    //tet moveSpeedY = 0;

    if (this.isDiagonal) {
      // 1. BEAM ROKE RAKHO: Goli aage udegi nahi, haath par rukegi
      moveSpeedX = 0;
      moveSpeedY = 0;

      // 2. PERFECT ALIGNMENT
      this.element.style.transformOrigin = "left center";

      // 3. GROW LOGIC: Dhire-dhire badi hogi
      this.beamTimer = (this.beamTimer || 0) + 1;
      let growthSpeed = 5; // Kitni jaldi beam badi hogi (5% per frame)
      this.beamPercent = this.beamTimer * growthSpeed;

      if (this.beamPercent > 100) {
        this.beamPercent = 100; // 100% hone par rok do
      }

      // Beam ko CSS se dre-dre bahar nikalna (Mobile Support ke sath)
      this.element.style.clipPath = `inset(0% ${
        100 - this.beamPercent
      }% 0% 0%)`;
      this.element.style.webkitClipPath = `inset(0% ${
        100 - this.beamPercent
      }% 0% 0%)`;

      // ========================================================
      // 🔥 NAYA JADOO: BEAM KO GAYAB (DESTROY) KARNA 🔥
      // ========================================================
      // Jab timer 35 par pahunche (lagbhag 0.5 second), toh goli delete kar do!
      if (this.beamTimer > 300) {
        this.destroy();
        return; // Engine ko yahin rok do taaki error na aaye
      }

      // 4. ROTATION: Dono side perfect angle!
      let dir = this.scaleX || 1;
      this.element.style.transform = `scale(${dir * 1.7}, 1.7) rotate(45deg)`;
      // 5. HITBOX MAGIC: BADA SQUARE BOX (UPAR AUR PEECHE SHIFT KIYA HUA)
      if (!this.hitboxPatchedDiagonal) {
        this.getHitbox = function () {
          let maxBeamLength = 700;
          let currentSize = maxBeamLength * (this.beamPercent / 100);

          // =======================================================
          // 🎛️ ALIGNMENT KONTROLS (IN NUMBERS KO CHANGE KAR SAKTE HO)
          // =======================================================
          let shiftUp = 160; // Box ko UPAR khiskane ke liye (Isko badhaoge toh box aur upar jayega)
          let shiftBack = 80; // Box ko PEECHE khiskane ke liye (Goku ki peeth cover karne ke liye)

          // X-Axis: Left aur Right dono taraf box ko peeth ke peeche shift kiya
          let newX =
            this.scaleX === 1
              ? this.x - shiftBack
              : this.x - currentSize + shiftBack;

          // Y-Axis: Box ko neeche jaane ke sath-sath, 'shiftUp' se upar bhi utha diya!
          let newY = this.y - currentSize + shiftUp;

          // Bada Square Box return kiya
          return { x: newX, y: newY, w: currentSize, h: currentSize };
        };
        this.hitboxPatchedDiagonal = true;
      }
    } else if (this.isBigKamehameha) {
      //  let owner =
      // this.ownerId === "player"
      //    ? player1
      //    : this.ownerId === "enemy"
      //    ? enemy
      //  : teammate;
      //  if (owner) {
      //this.scaleX = owner.scaleX; // Maalik jahan dekhega, beam bhi wahan ghum jayegi!
      //  this.x = owner.scaleX === 1 ? owner.x + 60 : owner.x - 60;
      // Haath ki X position bhi update karo (Taaki ghoomne par
      //   }
      let owner = this.owner || activeFighterMap[this.ownerId];
      if (owner) {
        this.scaleX = owner.scaleX;
        this.x = owner.scaleX === 1 ? owner.x + 60 : owner.x - 60;
        this.y = owner.y + 10;
      }
      this.element.style.zIndex = "4";
      // 1. BEAM ROKE RAKHO: Goli aage udegi nahi, haath par rukegi
      moveSpeedX = 0;
      moveSpeedY = 0;
      this.element.style.transformOrigin = "left center";
      let photoShiftX = this.scaleX === 1 ? -15 : 60;
      // 2. GROW LOGIC: Dhire-dhire badi hogi
      this.beamTimer = (this.beamTimer || 0) + 1;
      let growthSpeed = 4; // Beam khulne ki speed
      this.beamPercent = this.beamTimer * growthSpeed;
      if (this.beamPercent > 100) this.beamPercent = 100;

      // 🔥 CSS BUG FIX: scaleY hata diya! Ab beam upar nahi udegi.
      // 'clip-path' image ko parde ki tarah dre-dre reveal karega bina height bigade.
      this.element.style.clipPath = `inset(0% ${
        100 - this.beamPercent
      }% 0% 0%)`;
      let dir = this.scaleX || 1;
      this.element.style.transform = `translate(${photoShiftX}px, 130px) scaleX(${dir})`;
      // Sirf Left/Right ghumane ke liye

      // 3. DESTROY TIMER
      if (this.beamTimer > 520) {
        // Lagbhag 2 second screen par rahegi
        this.destroy();
        return;
      }
      // 4. HITBOX MAGIC (Growing Box)
      if (!this.hitboxPatchedBig) {
        this.getHitbox = function () {
          let maxW = this.frames[0].w; // Image ki total lambai (1006px)
          let currentSizeW = maxW * (this.beamPercent / 100);
          let currentSizeH = 100; // Box ki height ko fix kar diya (taki aasman me hit na kare)
          let shiftLeftBox = 60; // Jab Goku Black LEFT dekhega, toh dabba kitna andar kheenchna hai
          let shiftRightBox = -10;
          let newX;
          let finalWidth = currentSizeW;

          // 🔥 2. DONO DISHA (LEFT/RIGHT) KE LIYE ALAG-ALAG CALCULATION
          if (this.scaleX === 1) {
            // Right dekh raha hai
            newX = this.x + shiftRightBox;
          } else {
            // Left dekh raha hai
            newX = this.x - currentSizeW + shiftLeftBox;
          }
          // Jab Goku Black RIGHT dekhega, toh dabba kitna andar
          let newY = this.y + -10; // Box ko haath ke level par rakha

          return { x: newX, y: newY, w: currentSizeW, h: currentSizeH };
        };
        this.hitboxPatchedBig = true;
      }
    } else if (this.isSSBHellBeam) {
      // 1. OWNER TRACKER (Goku ke haath par lock)
      let owner = activeFighterMap[this.ownerId] || teammate;
      if (owner) {
        this.scaleX = owner.scaleX;
        this.x = owner.scaleX === 1 ? owner.x - 10 : owner.x + 10;
        this.y = owner.y + 5;
      }
      this.element.style.zIndex = "4";

      // 2. BEAM KO ROKE RAKHO
      moveSpeedX = 0;
      moveSpeedY = 0;
      this.element.style.transformOrigin = "left center";

      let photoShiftX = this.scaleX === 1 ? -20 : 65;
      let photoShiftY = -90;
      // 3. GROW LOGIC (Parda khulne ki speed)
      this.beamTimer = (this.beamTimer || 0) + 1;
      let growthSpeed = 4;
      this.beamPercent = this.beamTimer * growthSpeed;
      if (this.beamPercent > 100) this.beamPercent = 100;

      this.element.style.clipPath = `inset(0% ${
        100 - this.beamPercent
      }% 0% 0%)`;

      // 🔥 EXACT SCALE 2 LOGIC:
      let dir = this.scaleX || 1;
      this.element.style.transform = `translate(${photoShiftX}px, ${photoShiftY}px) scale(${
        dir * 1.5
      }, 1.5)`;

      let baseW = this.frames[0] ? this.frames[0].w : 380;
      this.element.style.width = baseW + "px";

      // ⏳ 540 TICKS DESTROY TIMER (540 ticks baad gayab):
      if (this.beamTimer > 540) {
        this.destroy();
        return;
      }

      // 📦 SCALE 2 RED HITBOX:
      if (!this.hitboxPatchedSSBHell) {
        this.getHitbox = function () {
          let currentSizeW = baseW * 1.1 * (this.beamPercent / 100);
          let currentSizeH = 495;
          let shiftLeftBox = 40;
          let shiftRightBox = 5;

          let newX =
            this.scaleX === 1
              ? this.x + shiftRightBox
              : this.x - currentSizeW + shiftLeftBox;
          let newY = this.y - 10;

          return { x: newX, y: newY, w: currentSizeW, h: currentSizeH };
        };
        this.hitboxPatchedSSBHell = true;
      }
    } else if (this.isSSBKamehameha) {
      // 1. OWNER TRACKER (Sahi Haath se niklegi)
      //  let owner = teammate;
      //  if (owner) {
      //   this.scaleX = owner.scaleX;
      //    this.x = owner.scaleX === 1 ? owner.x + 40 : owner.x - 40;
      //  }
      let owner = this.owner || activeFighterMap[this.ownerId];
      if (owner) {
        this.scaleX = owner.scaleX;
        this.x = owner.scaleX === 1 ? owner.x + 40 : owner.x - 40;
        this.y = owner.y - 10;
      }
      this.element.style.zIndex = "4";
      // 2. BEAM KO ROKE RAKHO
      moveSpeedX = 0;
      moveSpeedY = 0;
      this.element.style.transformOrigin = "left center";

      // 🔥 PHOTO GAP ADJUSTMENT
      let photoShiftX = this.scaleX === 1 ? -20 : 65;

      // 3. GROW LOGIC (Parda khulne ki animation)
      this.beamTimer = (this.beamTimer || 0) + 1;
      let growthSpeed = 4;
      this.beamPercent = this.beamTimer * growthSpeed;
      if (this.beamPercent > 100) this.beamPercent = 100;

      this.element.style.clipPath = `inset(0% ${
        100 - this.beamPercent
      }% 0% 0%)`;

      // 🔥 THE MASTERPIECE: SCALE 2.5 HERE!
      let dir = this.scaleX || 1;
      // translateY (-80px) se beam hawa me haath ke paas jayegi
      // ✅ AB YEH KAR DO (Line 1047):
      this.element.style.transform = `translate(${photoShiftX}px, 10px) scale(${
        dir * 2.5
      }, 2.5)`;
      let baseW = this.frames[0].w;
      this.element.style.width = baseW + "px";
      // 4. DESTROY TIMER (90 ticks pose ke hisaab se)
      if (this.beamTimer > 540) {
        this.destroy();
        return;
      }

      // 5. RED BOX HITBOX MAGIC (Scaled Hitbox)
      if (!this.hitboxPatchedSSB) {
        this.getHitbox = function () {
          // Base width is 421, Scale 2.5 hogi toh real width = 1052.5
          // Scaled Height
          let currentSizeW = baseW * 2.5 * (this.beamPercent / 100);
          let currentSizeH = 120;
          let shiftLeftBox = 40;
          let shiftRightBox = 5;

          let newX;
          if (this.scaleX === 1) {
            newX = this.x + shiftRightBox;
          } else {
            newX = this.x - currentSizeW + shiftLeftBox;
          }

          let newY = this.y + -5; // Hitbox ko 2.5x height ke hisaab se upar uthaya

          return { x: newX, y: newY, w: currentSizeW, h: currentSizeH };
        };
        this.hitboxPatchedSSB = true;
      }
    } else if (this.isFriezaKamehameha) {
      // 1. OWNER TRACKER (Hamesha haath par chipki rahegi)
      //  let owner = enemy2;
      // if (owner) {
      // this.scaleX = owner.scaleX;
      //this.x = owner.scaleX === 1 ? owner.x + 40 : owner.x - 40; // Haath ki X position
      //}
      // let owner = this.owner || activeFighterMap[this.ownerId];
      let owner =
        this.owner ||
        activeMatchFighters.find(
          (f) => f._uniqueId === this.ownerId || f.id === this.ownerId
        ) ||
        activeFighterMap[this.ownerId];
      if (owner) {
        this.scaleX = owner.scaleX;
        this.x = owner.scaleX === 1 ? owner.x + 40 : owner.x - 40;
        this.y = owner.y - 10;
      }
      this.element.style.zIndex = "4";

      // 2. BEAM KO ROKE RAKHO (Aage mat udao)
      moveSpeedX = 0;
      moveSpeedY = 0;
      this.element.style.transformOrigin = "left center";

      let photoShiftX = this.scaleX === 1 ? -15 : 60; // Goli ko exact haath par laane ke liye

      // 3. GROW LOGIC (Parda khulne ki animation)
      this.beamTimer = (this.beamTimer || 0) + 1;
      let growthSpeed = 4; // Beam khulne ki speed
      this.beamPercent = this.beamTimer * growthSpeed;
      if (this.beamPercent > 100) this.beamPercent = 100;

      this.element.style.clipPath = `inset(0% ${
        100 - this.beamPercent
      }% 0% 0%)`;

      // Scale 1 hi rahega, par image rotate ya shift karni ho toh yahan se hogi
      let dir = this.scaleX || 1;
      this.element.style.transform = `translate(${photoShiftX}px, -20px) scale(${
        dir * 2.5
      }, 2.5)`;
      let stableW = this.frames[0].w;
      let stableH = this.frames[0].h;
      this.element.style.width = stableW + "px";
      this.element.style.height = stableH + "px";
      // 4. DESTROY TIMER (90 ticks pose ke hisaab se)
      if (this.beamTimer > 540) {
        this.destroy();
        return;
      }

      // 5. RED BOX HITBOX MAGIC (Growing Hitbox)
      if (!this.hitboxPatchedFrieza) {
        this.getHitbox = function () {
          let currentSizeW = stableW * 2.5 * (this.beamPercent / 100);
          let currentSizeH = 150; // Red Box ki height
          let shiftLeftBox = 60;
          let shiftRightBox = -15;

          let newX;
          if (this.scaleX === 1) {
            newX = this.x + shiftRightBox;
          } else {
            newX = this.x - currentSizeW + shiftLeftBox;
          }

          let newY = this.y + 5; // Box ko upar/neeche adjust karne ke liye

          return { x: newX, y: newY, w: currentSizeW, h: currentSizeH };
        };
        this.hitboxPatchedFrieza = true;
      }
    } else if (this.isSukunaShrine) {
      // 🛑 Stationary: Sukuna hile to bhi ye House nahi hilega!
      moveSpeedX = 0;
      moveSpeedY = 0;
      this.element.style.zIndex = "4";

      this.shrineTimer = (this.shrineTimer || 0) + 1;

      // ⏳ 540 Ticks timer ke baad gayab (destroy)
      if (this.shrineTimer > 540) {
        this.destroy();
        return;
      }

      // 📦 FULL IMAGE SIZE HITBOX (Last frame ki size)
      if (!this.hitboxPatchedShrine) {
        this.getHitbox = function () {
          let curF =
            this.frames[this.frameIndex] || this.frames[this.frames.length - 1];
          if (!curF) return null;

          return {
            x: this.x,
            y: this.y,
            w: curF.w,
            h: curF.h,
          };
        };
        this.hitboxPatchedShrine = true;
      }
    } else if (this.isItachiFireStyle) {
      // 1. OWNER TRACKER (Itachi ke haath/muh par lock rahegi)
      //  let owner = teammate3;
      //  if (owner) {
      //  this.scaleX = owner.scaleX;
      //  this.x = owner.scaleX === 1 ? owner.x + 30 : owner.x - 30;
      //  }
      let owner = this.owner || activeFighterMap[this.ownerId];
      if (owner) {
        this.scaleX = owner.scaleX;
        this.x = owner.scaleX === 1 ? owner.x + 30 : owner.x - 30;
        this.y = owner.y + 10;
      }
      this.element.style.zIndex = "4";

      // 2. BEAM ROKE RAKHO (Kamehameha jaisi fixed rahegi)
      moveSpeedX = 0;
      moveSpeedY = 0;
      this.element.style.transformOrigin = "left center";

      // 3. 🔥 SCALE 2 (Aag double size ki hogi!)
      let dir = this.scaleX || 1;
      let photoShiftX = this.scaleX === 1 ? 0 : 45;
      this.element.style.transform = `translate(${photoShiftX}px, -15px) scale(${
        dir * 2
      }, 2)`;

      // 4. DESTROY TIMER (45 ticks par Itachi ke sath hi gayab hogi)
      this.fireTimer = (this.fireTimer || 0) + 1;
      if (this.fireTimer > 270) {
        this.destroy();
        return;
      }

      // 5. 📦 HITBOX (Scale 2 ke hisaab se bada Red Box)
      if (!this.hitboxPatchedFireStyle) {
        this.getHitbox = function () {
          let curF = this.frames[this.frameIndex] || this.frames[0];
          if (!curF) return null;
          let currentSizeW = curF.w * 2;
          let currentSizeH = curF.h * 2;
          let shiftLeftBox = 45;
          let shiftRightBox = 0;

          let newX;
          if (this.scaleX === 1) {
            newX = this.x + shiftRightBox;
          } else {
            newX = this.x - currentSizeW + shiftLeftBox;
          }
          let newY = this.y - 50;

          return { x: newX, y: newY, w: currentSizeW, h: currentSizeH };
        };
        this.hitboxPatchedFireStyle = true;
      }
      // ==========================================
      // 🔥 ITACHI HELL ATTACK (Cutscene & 300 Tick Timer)
      // ==========================================
    } else if (this.isItachiHellAttack) {
      // 1. Aag Itachi ke haath ke aage fixed rahegi
      moveSpeedX = 0;
      moveSpeedY = 0;
      this.element.style.zIndex = "4";
      this.element.style.transformOrigin = "left center";

      let dir = this.scaleX || 1;
      let photoShiftX = this.scaleX === 1 ? 0 : 35;
      this.element.style.transform = `translate(${photoShiftX}px, -10px) scale(${
        dir * 1.5
      }, 1.5)`;

      // 2. 🎬 Center Cutscene Box create karo (Agar abhi tak nahi bana)
      if (!this.cutsceneEl) {
        let cf = this.frames[15]; // Frame 16 (Index 15)
        this.cutsceneEl = document.createElement("div");
        this.cutsceneEl.style.position = "fixed"; // 🎯 Hamesha mobile screen ke center me rahega
        this.cutsceneEl.style.left = "50%";
        this.cutsceneEl.style.top = "50%";
        this.cutsceneEl.style.transform = "translate(-50%, -50%) scale(2.0)"; // 🎯 Fixed Scale (No Zoom-In)
        this.cutsceneEl.style.zIndex = "500"; // Sabse upar dikhega
        this.cutsceneEl.style.pointerEvents = "none";
        this.cutsceneEl.style.backgroundImage =
          this.element.style.backgroundImage;
        this.cutsceneEl.style.backgroundSize =
          this.element.style.backgroundSize;
        this.cutsceneEl.style.backgroundRepeat = "no-repeat";
        this.cutsceneEl.style.imageRendering = "pixelated";
        if (cf) {
          this.cutsceneEl.style.width = cf.w + "px";
          this.cutsceneEl.style.height = cf.h + "px";
          this.cutsceneEl.style.backgroundPosition = `-${cf.x}px -${cf.y}px`;
        }
        document.body.appendChild(this.cutsceneEl);
        this.cutsceneFrameIndex = 15;
      }
      if (this.cutsceneEl) {
        this.cutsceneAngle = (this.cutsceneAngle || 0) + 12;
        this.cutsceneEl.style.opacity = 0.6;
        this.cutsceneEl.style.transform = `translate(-50%, -50%) scale(2) rotate(${this.cutsceneAngle}deg)`;
      }

      // ⏳ 300 TICKS TIMER (300 ticks hote hi aag aur cutscene dono gayab)
      this.fireTimer = (this.fireTimer || 0) + 1;
      if (this.fireTimer > 300) {
        this.destroy();
        return;
      }

      // 📦 HITBOX LOGIC (Aag ka box)
      if (!this.hitboxPatchedHellAttack) {
        this.getHitbox = function () {
          let curF = this.frames[this.frameIndex] || this.frames[4];
          if (!curF) return null;

          let currentSizeW = curF.w * 1.5;
          let currentSizeH = curF.h * 1.5;
          let shiftLeftBox = 35;
          let shiftRightBox = 0;

          let newX;
          if (this.scaleX === 1) {
            newX = this.x + shiftRightBox;
          } else {
            newX = this.x - currentSizeW + shiftLeftBox;
          }
          let newY = this.y - 15;

          return { x: newX, y: newY, w: currentSizeW, h: currentSizeH };
        };
        this.hitboxPatchedHellAttack = true;
      }
    }
    // NORMAL BULLET MOVEMENT
    if (
      this.isItachiMedium ||
      this.isJirenHellExplosion
      // this.isJirenMedium
    ) {
      // 👈 Itachi ki goli upar direct move ho chuki hai, isko yahan rokna nahi hai!
      // } else if (this.frames.length > 4 && this.frameIndex < 4) {
    } else if (this.frames && this.frames.length > 4 && this.frameIndex < 4) {
      this.x += 0;
    } else {
      this.x += moveSpeedX;
      this.y += moveSpeedY;
    }
    // NORMAL BULLET MOVEMENT
    /*if (this.frames.length > 4 && this.frameIndex < 4) {
this.x += 0;
} else {
this.x += moveSpeedX;
this.y += moveSpeedY;
}*/

    let finalProjX = this.x - window.cameraX;
    let finalProjY = this.y - window.cameraY;
    this.element.style.left = finalProjX + "px";
    this.element.style.bottom = finalProjY + "px";

    if (this.x < -1500 || this.x > WORLD_WIDTH + 1500) {
      this.destroy();
    }

    // ==========================================
    // DEBUG MODE (ASLI JS HITBOX - ORANGE COLOUR)
    // ==========================================
    if (DEBUG_MODE) {
      let hit = this.getHitbox();
      if (hit) {
        // ASLI JS BOX KI POSITION (Bina Rotate Kiye)
        this.hitboxDiv.style.left = hit.x - window.cameraX + "px"; // 👈 Camera offset lagaya
        this.hitboxDiv.style.bottom = hit.y - window.cameraY + "px";
        this.hitboxDiv.style.width = hit.w + "px";
        this.hitboxDiv.style.height = hit.h + "px";
        this.hitboxDiv.style.clipPath = "none";

        if (this.isDiagonal) {
          // 🔥 NAYA JADOO: JS ENGINE KA BOX (ORANGE)
          this.hitboxDiv.style.backgroundColor = "rgba(255, 165, 0, 0.6)"; // Orange (Transparent)
          this.hitboxDiv.style.border = "2px solid darkorange"; // Orange Border
          this.hitboxDiv.style.transform = "none"; // Engine ghoomta nahi hai, isliye straight!
        } else {
          // NORMAL GOLIYON KA BOX (RED)
          this.hitboxDiv.style.backgroundColor = "rgba(255, 0, 0, 0.5)"; // Red
          this.hitboxDiv.style.border = "2px solid red";
          let dir = this.scaleX || 1;
          this.hitboxDiv.style.transform = `scaleX(${dir})`;
        }

        this.hitboxDiv.style.display = "block";
      } else {
        this.hitboxDiv.style.display = "none";
      }
    }
  }
  animate() {
    if (!this.active) return;
    if (this.isItachiHellAttack) {
      // A. Haath ke aage Aag (Frame 5 se 15, phir 10 se 15 loop)
      let f = this.frames[this.frameIndex];
      if (f) {
        this.element.style.width = f.w + "px";
        this.element.style.height = f.h + "px";
        this.element.style.backgroundPosition = `-${f.x}px -${f.y}px`;
      }

      if (!this.fireInitialDone) {
        this.frameIndex++;
        if (this.frameIndex > 14) {
          this.fireInitialDone = true;
          this.frameIndex = 9; // Wapas Frame 10 (Index 9) par loop!
        }
      } else {
        this.frameIndex++;
        if (this.frameIndex > 14) {
          this.frameIndex = 9; // Continuous loop Frame 10-15
        }
      }
      if (this.cutsceneEl) {
        let cf = this.frames[this.cutsceneFrameIndex];
        if (cf) {
          this.cutsceneEl.style.width = cf.w + "px";
          this.cutsceneEl.style.height = cf.h + "px";
          this.cutsceneEl.style.backgroundPosition = `-${cf.x}px -${cf.y}px`;
        }

        // 4 Frames clean loop: 16 -> 17 -> 18 -> 19 -> 16... (Zoom-In hata diya)
        this.cutsceneFrameIndex++;
        if (this.cutsceneFrameIndex > 18) {
          this.cutsceneFrameIndex = 15; // Wapas Frame 16 par loop
        }
      }

      return; // ⛔ YAHIN SE RETURN! Taki koi bhi extra frameIndex++ na chale!
    }
    // ⚡ SASUKE HELL GOLI (Frames 4 aur 5 ka Loop):
    if (this.isSasukeHell) {
      let frame = this.frames[this.frameIndex];
      if (frame) {
        this.element.style.width = frame.w + "px";
        this.element.style.height = frame.h + "px";
        this.element.style.backgroundPosition = `-${frame.x}px -${frame.y}px`;
      }
      this.frameIndex++;
      if (this.frameIndex >= this.frames.length) {
        this.frameIndex = 0; // 🔁 Frames 4 aur 5 continuous loop!
      }
      return;
    }
    // ⚡ SASUKE MEDIUM GOLI (Frames 11, 12, 13 Loop):
    if (this.isSasukeMedium) {
      let frame = this.frames[this.frameIndex];
      if (frame) {
        this.element.style.width = frame.w + "px";
        this.element.style.height = frame.h + "px";
        this.element.style.backgroundPosition = `-${frame.x}px -${frame.y}px`;
      }
      this.frameIndex++;
      if (this.frameIndex >= this.frames.length) {
        this.frameIndex = 0; // 🔁 11, 12, 13 ka continuous loop!
      }
      return;
    }
    if (this.isFriezaCrossExplosion) {
      let curFrame = this.frames[this.frameIndex];
      if (curFrame) {
        this.element.style.width = curFrame.w + "px";
        this.element.style.height = curFrame.h + "px";
        this.element.style.backgroundPosition = `-${curFrame.x}px -${curFrame.y}px`;
      }
      this.expHold = (this.expHold || 0) + 1;
      if (this.expHold >= 2) {
        this.expHold = 0;
        this.frameIndex++;
        if (this.frameIndex >= this.frames.length) {
          this.destroy(); // 💥 Sirf ek baar anime jaisa chalega, aur gayab!
        }
      }
      return;
    }

    if (this.isJirenHellExplosion) {
      let frame = this.frames[this.frameIndex];
      if (frame) {
        this.element.style.width = frame.w + "px";
        this.element.style.height = frame.h + "px";
        this.element.style.backgroundPosition = `-${frame.x}px -${frame.y}px`;
      }

      this.frameIndex++;
      if (this.frameIndex >= this.frames.length) {
        this.destroy(); // 🔁 Sirf 1 time chalega, fir gayab!
      }
      return;
    }

    if (this.isItachiMedium) {
      let frame = this.frames[this.frameIndex];
      if (frame) {
        this.element.style.width = frame.w + "px";
        this.element.style.height = frame.h + "px";
        this.element.style.backgroundPosition = `-${frame.x}px -${frame.y}px`;
      }

      this.frameIndex++;
      if (this.frameIndex >= this.frames.length) {
        this.frameIndex = 0; // 🔁 Aakhiri frame aate hi wapas pehle frame par loop
      }
      return; // ⛔ Yahan se return zaroori hai taaki purana freeze code na chale!
    }

    let frame = this.frames[this.frameIndex];
    if (frame) {
      this.element.style.width = frame.w + "px";
      this.element.style.height = frame.h + "px";
      this.element.style.backgroundPosition = `-${frame.x}px -${frame.y}px`;
    }
    this.frameIndex++;
    if (this.isSukunaShrine) {
      if (this.frameIndex >= this.frames.length) {
        this.frameIndex = this.frames.length - 1;
        // Stay on last frame!
        this.y = -80;
      }
      return;
    }
    if (this.isItachiFireStyle) {
      if (this.frameIndex >= this.frames.length) {
        this.frameIndex = 0; // Wapas Frame 1 se loop hogi (Aag continuous jalti rahegi)
      }
      return;
    }
    if (this.isItachiFire) {
      if (this.frameIndex >= this.frames.length) {
        this.frameIndex = 0; // Goli udate waqt aag ghoomti rahegi
      }
      return;
    }
    if (this.isJirenMedium) {
      return;
    }

    // 🔥 ITACHI HELL ATTACK: 5-15 (1x) -> 16-19 (1x) -> 10-15
    // 🔥 ITACHI HELL ATTACK: 5-15 (1x) -> 16-19 (Cutscene Center) -> 10-15
    // 🔥 ITACHI HELL ATTACK: 5-15 (1x) -> 10-15 Loop + Center Screen Cutscene (16-19 Loop)
    // A. 🔥 HAATH KE AAGE WALI AAG (Single Frame Render - 0
    // ==========================================
    // 🔥 ITACHI HELL ATTACK (Cutscene & 300 Tick Timer)
    // ===================
    // 1. Frame 5 se 15 (Index 4 se 14) 1 ba
    // THE MASTER FIX: Freeze Bug Hata diya!
    if (this.frameIndex >= this.frames.length) {
      if (this.frames.length > 3) {
        // Deku ke liye purana logic (Last 3 frames loop honge)
        this.frameIndex = this.frames.length - 3;
      } else {
        // Goku ke liye naya logic (Wapas 0 se loop hogi)
        this.frameIndex = 0;
      }
    }
  }
  getHitbox() {
    let frame = this.frames[this.frameIndex];
    if (!frame) return null;
    return {
      x: this.x,
      y: this.y + frame.h / 4,
      w: frame.w,
      h: frame.h / 2,
    };
  }

  destroy() {
    this.active = false;
    if (this.element.parentNode)
      this.element.parentNode.removeChild(this.element);
    if (this.cutsceneEl && this.cutsceneEl.parentNode)
      this.cutsceneEl.parentNode.removeChild(this.cutsceneEl);
    if (DEBUG_MODE && this.hitboxDiv && this.hitboxDiv.parentNode)
      this.hitboxDiv.parentNode.removeChild(this.hitboxDiv);
  }
}

// ==========================================
// 4. GAME INITIALIZATION
// ==========================================
const player1 = new Fighter(
  "player",
  DEKU,
  50,
  1,
  "assets/deku.jpg",
  "1027px 1758px"
);

const teammate = new Fighter(
  "teammate",
  GOKUSSB,
  120,
  1,
  "assets/gokussb.jpg",
  "1035px 1541px"
);
const teammate2 = new Fighter(
  "teammate2",
  JIREN,
  80,
  1,
  "assets/jiren.jpg",
  "1112px 2560px"
); //
const teammate3 = new Fighter(
  "teammate3",
  ITACHI,
  160,
  1,
  "assets/itachi.jpg",
  "1054px 8923px"
);
const enemy2 = new Fighter(
  "enemy2",
  FRIEZA,
  350,
  -1,
  "assets/frieza.jpg",
  "780px 1445px"
);
const enemy = new Fighter(
  "enemy",
  GOKUBLACKSSR3,
  300,
  -1,
  "assets/gokublackssr3.png",
  "1104px 2055px"
);
const enemy3 = new Fighter(
  "enemy3",
  SUKUNA,
  400,
  -1,
  "assets/sukuna.jpg",
  "1945px 4093px"
);
// <-- bgSize apni photo ke hisaab se set karlena
// ⚡ SASUKE FIGHTER INITIALIZATION (Image path aur bgSize apne hisaab se set karein)
const sasuke = new Fighter(
  "sasuke",
  SASUKE,
  200,
  1,
  "assets/sasuke.png",
  "1482px 2510px"
);
sasuke.showFrame(SASUKE.idle[0]);
player1.showFrame(DEKU.idle[0]);
teammate.showFrame(GOKUSSB.idle[0]);
teammate2.showFrame(JIREN.idle[0]); //
teammate3.showFrame(ITACHI.idle[0]);
enemy.showFrame(GOKUBLACKSSR3.idle[0]);
enemy2.showFrame(FRIEZA.idle[1]);
enemy3.showFrame(SUKUNA.idle[0]);
// 👥 16 Fighters Pool (8 Team A, 8 Team B)
const teamAFighters = [
  player1,
  teammate,
  teammate2,
  teammate3,
  new Fighter("teammate4", DEKU, 180, 1, "assets/deku.jpg", "1027px 1758px"),
  new Fighter("teammate5", DEKU, 200, 1, "assets/deku.jpg", "1027px 1758px"),
  new Fighter("teammate6", DEKU, 220, 1, "assets/deku.jpg", "1027px 1758px"),
  new Fighter("teammate7", DEKU, 240, 1, "assets/deku.jpg", "1027px 1758px"),
];

const teamBFighters = [
  enemy,
  enemy2,
  enemy3,
  sasuke,
  new Fighter(
    "enemy4",
    GOKUBLACKSSR3,
    450,
    -1,
    "assets/gokublackssr3.png",
    "1104px 2055px"
  ),
  new Fighter(
    "enemy5",
    GOKUBLACKSSR3,
    480,
    -1,
    "assets/gokublackssr3.png",
    "1104px 2055px"
  ),
  new Fighter(
    "enemy6",
    GOKUBLACKSSR3,
    510,
    -1,
    "assets/gokublackssr3.png",
    "1104px 2055px"
  ),
  new Fighter(
    "enemy7",
    GOKUBLACKSSR3,
    540,
    -1,
    "assets/gokublackssr3.png",
    "1104px 2055px"
  ),
];

// 🗺️ Active Fighter Radar Map (Sabhi 16 fighters yahan add ho gaye)
const activeFighterMap = {};
[...teamAFighters, ...teamBFighters].forEach((f) => {
  activeFighterMap[f.id] = f;
});

// 🎭 Sabhi 8 characters ka data & sprite config
const heroConfigMap = {
  DEKU: { data: DEKU, img: "assets/deku.jpg", bgSize: "1027px 1758px" },
  "GOKU BLACK": {
    data: GOKUBLACKSSR3,
    img: "assets/gokublackssr3.png",
    bgSize: "1104px 2055px",
  },
  ITACHI: { data: ITACHI, img: "assets/itachi.jpg", bgSize: "1054px 8923px" },
  "GOKU SSB": {
    data: GOKUSSB,
    img: "assets/gokussb.jpg",
    bgSize: "1035px 1541px",
  },
  JIREN: { data: JIREN, img: "assets/jiren.jpg", bgSize: "1112px 2560px" },
  FRIEZA: { data: FRIEZA, img: "assets/frieza.jpg", bgSize: "780px 1445px" },
  SUKUNA: { data: SUKUNA, img: "assets/sukuna.jpg", bgSize: "1945px 4093px" },
  SASUKE: { data: SASUKE, img: "assets/sasuke.png", bgSize: "1482px 2510px" },
};
/*
function updateHealthBars() {
// 1. Health ke hisaab se patti (bar) choti-badi hogi
p1HealthFill.style.width = player1.health * 1.4 + "px";
p2HealthFill.style.width = enemy.health * 1.4 + "px";

// 2. 🔥 NAYA JADOO: Life Bars ke hisaab se Color badlo! 🔥
function setBarColor(element, bars) {
if (bars === 3) {
element.style.background = "linear-gradient(to right, #00ff00, #32cd32)"; // 🟢 GREEN
} else if (bars === 2) {
element.style.background = "linear-gradient(to right, #ffff00, #ffcc00)"; // 🟡 YELLOW
} else {
element.style.background = "linear-gradient(to right, #ff0000, #cc0000)"; // 🔴 RED
}
}
// 3. Dono players par color apply karo
setBarColor(p1HealthFill, player1.healthBars);
setBarColor(p2HealthFill, enemy.healthBars);
} */
// ==========================================================
// 🛡️ CRASH-PROOF DYNAMIC HEALTH BARS
// ==========================================================

/*
function updateHealthBars() {
if (!p1HealthFill || !p2HealthFill) return;
if (
!currentEnemyLeader ||
(currentEnemyLeader.health <= 0 && currentEnemyLeader.healthBars <= 0) ||
!currentEnemyLeader.activeInBattle
) {
let nextEnemy = activeMatchFighters.find(
(f) => f.activeInBattle && f.team === "enemy" && (f.health > 0 || f.healthBars > 0)
);
if (nextEnemy) {
currentEnemyLeader = nextEnemy;
}
}

// 🎯 P1 Leader Shift (agar zaroorat ho):
if (
!currentP1Leader ||
(currentP1Leader.health <= 0 && currentP1Leader.healthBars <= 0) ||
!currentP1Leader.activeInBattle
) {
let nextP1 = activeMatchFighters.find((f) => f.activeInBattle && f.team === "p1" && (f.health > 0 || f.healthBars > 0));
if (nextP1) {
currentP1Leader = nextP1;
}
}

const p1Fighter = currentP1Leader || player1;
const p2Fighter = currentEnemyLeader || enemy;

p1HealthFill.style.width = Math.max(0, p1Fighter.health * 1.4) + "px";
p2HealthFill.style.width = Math.max(0, p2Fighter.health * 1.4) + "px";

function setBarColor(element, bars) {
if (!element) return;
if (bars >= 4) {
element.style.background = "linear-gradient(to right, #00ffff, #0088ff)"; // 🔵 4th BAR (Cyan / Deep Blue)
} else if (bars === 3) {
element.style.background = "linear-gradient(to right, #00ff00, #32cd32)"; // 🟢 3rd BAR (Green)
} else if (bars === 2) {
element.style.background = "linear-gradient(to right, #ffff00, #ffcc00)"; // 🟡 YELLOW
} else {
element.style.background = "linear-gradient(to right, #ff0000, #cc0000)"; // 🔴 RED
}
}

setBarColor(p1HealthFill, p1Fighter.healthBars);
setBarColor(p2HealthFill, p2Fighter.healthBars);
}*/

function updateHealthBars() {
  if (!p1HealthFill || !p2HealthFill) return;

  const p1Fighter = currentP1Leader || player1;
  const p2Fighter = currentEnemyLeader || enemy;

  p1HealthFill.style.width = Math.max(0, p1Fighter.health * 1.4) + "px";
  p2HealthFill.style.width = Math.max(0, p2Fighter.health * 1.4) + "px";

  function setBarColor(element, bars) {
    if (!element) return;

    if (bars >= 4) {
      element.style.background = "linear-gradient(to right, #00ffff, #0088ff)"; // 🔵 4th BAR (Cyan / Deep Blue)
    } else if (bars === 3) {
      element.style.background = "linear-gradient(to right, #00ff00, #32cd32)"; // 🟢 3rd BAR (Green)
    } else if (bars === 2) {
      element.style.background = "linear-gradient(to right, #ffff00, #ffcc00)"; // 🟡 2nd BAR (Yellow)
    } else {
      element.style.background = "linear-gradient(to right, #ff0000, #cc0000)"; // 🔴 1st BAR (Red)
    }
  }

  setBarColor(p1HealthFill, p1Fighter.healthBars);
  setBarColor(p2HealthFill, p2Fighter.healthBars);
}

updateHealthBars();
updateEpBars();
/*startBtn.onclick = () => {
startScreen.style.display = "none";
document.getElementById("selectScreen").style.display = "flex";
//gameStarted = true;
//requestAnimationFrame(gameLoop);
};*/
function openSelectScreen(e) {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  const startScreen = document.getElementById("startScreen");
  const selectScreen = document.getElementById("selectScreen");

  if (startScreen) startScreen.style.display = "none";
  if (selectScreen) {
    selectScreen.style.display = "flex";

    // 🎯 BY DEFAULT 1v1 TEAM LOAD KARO (Taki bina select kiye bhi BATTLE START dabane par game chal jaye):
    if (mySelectedTeam.length === 0 && enemySelectedTeam.length === 0) {
      mySelectedTeam.push(rosterData[0]); // 🟢 Deku (P1)
      // enemySelectedTeam.push(rosterData);
      enemySelectedTeam.push(rosterData[1]);
      localLobbyActiveMembers = [
        {
          slotType: "p1",
          index: 0,
          isHost: true,
          name: rosterData[0].name,
          hero: rosterData[0],
          isNPC: false,
        },
        {
          slotType: "enemy",
          index: 0,
          isHost: false,
          name: rosterData[1].name,
          hero: rosterData[1],
          isNPC: true,
        },
      ];
      // 🟡 Goku Black (Enemy)
      renderSlots();
      updateCardSelection(0);
    }
  }
}

if (startBtn) {
  startBtn.onclick = openSelectScreen;
  startBtn.addEventListener("touchstart", openSelectScreen, { passive: false });
}

// ==========================================
// 5. PLAYER CONTROLS
// ==========================================
document.addEventListener("keydown", (e) => {
  if (!gameStarted) return;
  if (e.code === "KeyO") player1.moveLeft = true;
  if (e.code === "KeyP") player1.moveRight = true;
  if (e.code === "Space") {
    e.preventDefault();
    player1.jump();
  }
  // if  (e.code === "KeyJ") player1.punch();
  // if (e.code === "KeyK") player1.kick();
  if (e.code === "KeyJ") window.isPunchHeld = true;
  if (e.code === "KeyK") window.isKickHeld = true;
  if (e.code === "KeyU") player1.kiBlast();
});

document.addEventListener("keyup", (e) => {
  if (!gameStarted) return;
  if (e.code === "KeyO") player1.moveLeft = false;
  if (e.code === "KeyP") player1.moveRight = false;
  if (e.code === "KeyJ") window.isPunchHeld = false;
  if (e.code === "KeyK") window.isKickHeld = false;
});

// ==========================================
// 🎥 ULTRA-FAST ANIME BATTLE CAMERA (60 FPS)
// ==========================================
// ==========================================
// 🎥 PERFECT 2D FIGHTING CAMERA (Zero Sinking / Fixed Ground)
// ==========================================
// =====================================
// ==========================================

// 6. GOKU BLACK AI LOGIC (Smart Beam AI)

// ==========================================
// ==========================================================
// ⚡ DEKU AI BRAIN (100% GOD-MODE ULTRA AGGRESSION)
// ==========================================================
function updateDekuAI() {
  if (player1.health <= 0) return;
  if (player1.isControlledByPlayer) return; // Player khud khel raha ho toh AI mat chalao
  if (player1.state === "hit" || player1.state === "death") return;

  // 🎯 1. SMART RADAR: Saamne wali team ke sabse paas wale ZINDA dushman ko pakdo
  let target = getSmartTarget(player1);
  if (!target) {
    player1.moveLeft = false;
    player1.moveRight = false;
    if (!player1.isAttacking) player1.setState("idle");
    return;
  }

  let distanceX = target.x - player1.x;
  let absDist = Math.abs(distanceX);
  player1.scaleX = distanceX > 0 ? 1 : -1; // Hamesha dushman ki aankhon mein dekhega

  // 🔴 2. EMERGENCY CHARGE STOP (Dushman 50px paas aaye ya EP full ho)
  let incomingBullet = projectiles.some(
    (p) =>
      p.ownerId !== player1.id && p.active && Math.abs(p.x - player1.x) < 250
  );

  // 🔴 2. EMERGENCY CHARGE STOP (Agar dushman 60px paas aaye YA goli aaye YA EP 600 full ho)
  if (player1.state === "kiCharge") {
    if (absDist < 60 || incomingBullet || player1.ep >= 800) {
      player1.isCharging = false;
      player1.isAttacking = false;
      player1.setState("idle");
    } else {
      return; // Safe hai toh pura animation pose banakar charge karta rahega!
    }
  }

  // 🔵 3. ASALI CHARGING SHURU (Jab EP <= 80 ho aur dushman 180px door ho aur koi goli na ho)
  if (player1.ep <= 80 && absDist > 60 && !incomingBullet) {
    player1.kiCharge();
    return;
  }

  // ⚡ 3. DASH ATTACK COMBO (Dash karte hi seedha Smash ya Hell Punch se kootna)
  if (player1.state === "dash" && player1.isEnemyDashing) {
    if (absDist > 60) {
      player1.isEnemyDashing = false;
      player1.moveLeft = false;
      player1.moveRight = false;

      let rAtk = Math.random();
      if (rAtk < 0.4) player1.kick();
      else if (rAtk < 0.7) player1.hellKick();
      else player1.hellPunch();
    }
    return;
  }

  // 🔵 4. AUTO RECHARGE (Agar EP 40 se kam ho aur dushman 220px door ho)

  // ==========================================================
  // ⚔️ 100% PURE ATTACK SYSTEM (NO BLOCKING - FULL OFFENSE)
  // ==========================================================

  // ☄️ A. LONG RANGE (> 260px): Hell Attack / Medium Attack / R2 Teleport
  if (absDist > 260) {
    let randLong = Math.random();
    if (randLong < 0.35) {
      player1.hellAttack(); // 💥 7-Frame Giant Energy Ball
      return;
    } else if (randLong < 0.65) {
      player1.mediumAttack(); // 🐉 Dragon Bullet
      return;
    } else if (randLong < 0.85) {
      player1.teleport(); // ⚡ Instant R2 Teleport peechhe!
      return;
    } else {
      player1.isEnemyDashing = true;
      player1.dash(); // 🏃 Tez anime dash aage
      return;
    }
  }

  // 🏃 B. MID RANGE (120px - 260px): Ki Blast / Dash / Hell Kick Teleport / Jump
  else if (absDist > 120) {
    player1.moveRight = distanceX > 0;
    player1.moveLeft = distanceX < 0;

    let randMid = Math.random();
    if (randMid < 0.3) {
      player1.kiBlast(); // 💥 Ki Blast Goli
    } else if (randMid < 0.4) {
      player1.mediumAttack();
    } else if (randMid < 0.55) {
      player1.hellAttack(); // ☄️ Hawa me udkar Drop Kick!
    } else if (randMid < 0.75) {
      player1.isEnemyDashing = true;
      player1.dash(); // Slide Dash
    } else if (randMid < 0.9) {
      player1.teleport();
    } else {
      player1.jump();
    }
    return;
  }

  // 👊 C. CLOSE COMBAT (< 120px): PAAS AATE HI 100% DHUANDHAAR COMBOS!
  else {
    player1.moveLeft = false;
    player1.moveRight = false;

    let randClose = Math.random();
    if (randClose < 0.15) {
      player1.mediumAttack();
    } else if (randClose < 0.25) {
      player1.smashPunch(); // 💥 Heavy Smash Punch
    } else if (randClose < 0.35) {
      player1.jump();
    } else if (randClose < 0.4) {
      player1.hellPunch(); // 👊 Hell Punch (Long Reach)
    } else if (randClose < 0.5) {
      player1.hellKick(); // ☄️ Teleport Drop Kick
    } else if (randClose < 0.65) {
      player1.kick();
    } else if (randClose < 0.8) {
      player1.dash(); // 🦵 Smash Kick
    } else if (randClose < 0.9) {
      player1.punch(); // Normal punch
    } else {
      player1.teleport(); // ⚡ Z-Vanish Peeth par waar!
    }
  }
}
// ==========================================
// GOKU BLACK AI LOGIC (UPGRADED FINAL VERSION)
// ==========================================
function updateAI() {
  if (enemy.health <= 0) return;
  if (enemy.isControlledByPlayer) return;
  if (enemy.state === "hit") return;
  if (enemy.isAttacking || enemy.state === "extraAttack") return;
  // if (enemy.isAttacking) return;
  let target = getSmartTarget(enemy);
  if (!target) {
    enemy.moveLeft = false;
    enemy.moveRight = false;
    if (!enemy.isAttacking) enemy.setState("idle");
    return; // Koi dushman zinda nahi hai toh shant khada rahega
  }
  let distanceX = target.x - enemy.x;
  let absDist = Math.abs(distanceX);
  // Goku hamesha Deku ki taraf dekhega
  enemy.scaleX = distanceX > 0 ? 1 : -1;
  // 🔴 0-TIMEOUT JADOO: Agar Dash kar raha hai, toh distance check karo!
  if (enemy.state === "dash" && enemy.isEnemyDashing) {
    let maxRight = WORLD_WIDTH - enemy.element.offsetWidth - 20;
    // Jaise hi 200px ki doori ban jaye, turant dash roko aur attack karo!
    if (
      (enemy.moveLeft && enemy.x <= 25) ||
      (enemy.moveRight && enemy.x >= maxRight - 5)
    ) {
      enemy.isEnemyDashing = false;
      enemy.instantTransmission(target);
      return;
    }

    if (absDist > 200) {
      enemy.isEnemyDashing = false; // Dash button chhod diya
      enemy.moveLeft = false;
      enemy.moveRight = false;
      enemy.scaleX = target.x > enemy.x ? 1 : -1; // Palat jao

      // Turant attack! (0 Timeout)
      let attackRand = Math.random();
      if (attackRand < 0.25) enemy.kiBlast();
      else if (attackRand < 0.4) enemy.mediumAttack();
      else if (attackRand < 0.6) enemy.kamehameha();
      else enemy.bigKamehameha();
    }
    return; // Engine ko yahin roko taaki jab tak 200px na ho, dash karta rahe!
  }
  if (target.state === "block" || target.isBlocking) {
    // 🧠 THE MASTER LOGIC: Boss sirf tabhi dhoka dega jab wo koi "Asli Attack" na kar raha ho
    let canInterrupt =
      !enemy.isAttacking ||
      enemy.state === "dash" ||
      enemy.state === "teleport";

    if (canInterrupt) {
      // 1. Agar door hai (> 65px), toh apna Dash/Teleport cancel karke Z-Vanish maarega!
      if (absDist > 60) {
        if (Math.random() < 0.05) {
          // 5% chance per tick
          enemy.isEnemyDashing = false; // Dash band
          enemy.isAttacking = false; // Purana state cancel
          enemy.isBlocking = false;
          enemy.instantTransmission(target); // Peechhe Z-Vanish!
          return;
        }
      } else {
        if (Math.random() < 0.05) {
          // 5% chance
          enemy.isEnemyDashing = false;
          enemy.isAttacking = false;
          enemy.isBlocking = false;
          enemy.moveLeft = false;
          enemy.moveRight = false;
          enemy.scaleX = target.x > enemy.x ? 1 : -1; // Sahi disha mein palto

          let randPunish = Math.random();
          if (randPunish < 0.4) enemy.extraAttack(); // 80% Chance Extra Attack
          else if (randPunish < 0.5)
            enemy.mediumAttack(); // 10% Chance Medium Attack
          else enemy.smashPunch(); // Baaki Smash Punch

          return; // Yahin se seedha naya attack shuru!
        }
      }
    }
  }

  // Agar Deku 100px se door hai, toh Goku tezi se paas aayega (5% chance per frame)
  if (absDist > 100 && Math.random() < 0.05) {
    enemy.dash();
    return;
  }
  // 🔴 1. EMERGENCY STOP CHARGING LOGIC (Deku paas aa gaya!)
  // =========================================================
  if (enemy.state === "kiCharge") {
    // Agar Deku 150px ke paas aa gaya YA Goku ki EP full ho gayi
    if (absDist < 150 || enemy.ep >= 800) {
      enemy.isCharging = false; // Charging Switch OFF
      // (Animation code apne aap usko Normal khada kar dega agle frame par)
    } else {
      return; // Agar door hai toh chup-chaap charge karte raho, kuch aur mat socho!
    }
  }
  let incomingBullet = projectiles.some(
    (p) =>
      (p.ownerId === "player" ||
        p.ownerId === "teammate" ||
        p.ownerId === "teammate2") &&
      p.active &&
      Math.abs(p.x - enemy.x) < 350
  );

  // Check 2: Kya Deku ekdum paas aakar attack kar raha hai?
  // Check 2: Kya Deku paas aakar attack kar raha hai? (Block ko khatra nahi manenge)
  let closeCombatThreat =
    absDist < 150 && target.isAttacking && target.state !== "block";

  // Agar dono mein se koi bhi Khatra (Threat) hai
  if (incomingBullet || closeCombatThreat) {
    // Agar Goku abhi block nahi kar raha, toh uske Reflexes check karo (70% chance to block)
    if (!enemy.isBlocking && Math.random() < 0.7) {
      enemy.block(); // Goku ne block button daba diya!
    }

    // Agar Goku block position mein aa gaya hai, toh wahin freeze rahega jab tak attack khatam na ho
    if (enemy.state === "block") {
      if (absDist < 80 && Math.random() < 0.05) {
        // ...toh wo achanak se block chhod kar koot dega!
        enemy.isBlocking = false;
        enemy.isAttacking = false;

        let counterRand = Math.random();
        if (counterRand < 0.3) enemy.smashPunch();
        else if (counterRand < 0.7) enemy.extraAttack();
        else if (counterRand < 0.6) enemy.smashKick();
        else if (counterRand < 0.5) enemy.hellAttack();
        else enemy.instantTransmission(target);
      } else {
        return; // Warna normally block hold rakhega
      }
    }
  } else {
    // 🔥 YAHAN THI BIMAARI!
    // Khatra talne ke baad (door jane par) usko wapas Normal bhi toh karna hai!
    if (enemy.state === "block") {
      enemy.isBlocking = false;
      enemy.isAttacking = false; // Engine ko batao block khatam
      enemy.setState("idle"); // 👈 YEH LINE GOKU KO WAPAS NORMAL KAREGI!
    }
  }

  if (enemy.isAttacking) return;
  if (enemy.comboPending === "kamehameha") {
    enemy.comboPending = null; // Memory clear kar do
    enemy.scaleX = target.x > enemy.x ? 1 : -1; // Ekdum sahi target ki taraf dekho

    // 💥 BINA KISI DELAY KE SIDHA BIG KAMEHAMEHA!
    enemy.kamehameha();
    return;
  }

  // 2. Agar doori 300px se zyada hai, toh Teleport karo aur memory me combo save karo!
  if (absDist > 250) {
    enemy.instantTransmission(target); // Gayab hokar paas jao
    enemy.comboPending = "kamehameha"; // Engine ko batao pahunchte hi kya karna hai
    return;
  }

  // =========================================================
  // 🔵 2. START CHARGING LOGIC (EP kam hai aur Deku door hai)
  // =========================================================
  // Agar EP 30% (60 points) se kam hai aur Deku 200px se door hai
  if (enemy.ep < 60 && absDist > 200) {
    if (Math.random() < 0.1) {
      // 10% chance per tick to start charging
      enemy.kiCharge();
      return;
    }
  }

  // =========================================================
  // 1. THE CHASE LOGIC (Jab Deku bhage ya door ho)
  // =========================================================
  if (target.moveLeft || target.moveRight || absDist > 150) {
    enemy.aiTimer = (enemy.aiTimer || 0) + 1;

    // Har 5 ticks (approx 0.5 sec) baad sochega
    if (enemy.aiTimer > 1) {
      enemy.aiTimer = 0;

      let mathRandom = Math.random();
      if (mathRandom < 0.08) {
        // 40% Chance Hell Attack!
        enemy.moveLeft = false;
        enemy.moveRight = false;
        enemy.hellAttack();
        return;
      } else if (mathRandom < 0.4) {
        // 0.30 se 0.50 = 20% Chance Medium Attack ka
        enemy.moveLeft = false;
        enemy.moveRight = false;
        enemy.mediumAttack();
        return;
        // =========================================================
        // NAYI LINE: AI MEIN TELEPORT ADD KARNA
        // =========================================================
      } else if (mathRandom < 0.5) {
        // 10% Chance Teleport ka!
        enemy.moveLeft = false;
        enemy.moveRight = false;
        enemy.instantTransmission(target); // Player1 ko target bana liya
        return;
      }
    }
  }

  // =========================================================
  // 2. NORMAL MOVEMENT (Paas aane ke liye)
  // =========================================================
  if (absDist > 150) {
    if (distanceX > 0) {
      enemy.moveRight = true;
      enemy.moveLeft = false;
    } else {
      enemy.moveLeft = true;
      enemy.moveRight = false;
    }

    if (Math.random() < 0.5) enemy.jump();
  } else if (absDist > 65) {
    if (distanceX > 0) {
      enemy.moveRight = true;
      enemy.moveLeft = false;
    } else {
      enemy.moveLeft = true;
      enemy.moveRight = false;
    }
  }
  if (absDist > 55) {
    // 55px se door hai? Toh hawa me punch nahi marega, paas aayega!
    enemy.moveRight = distanceX > 0;
    enemy.moveLeft = distanceX < 0;

    // Raste mein dash ya blast maar sakta hai
    if (Math.random() < 0.4) {
      if (Math.random() < 0.5) enemy.dash();
      else enemy.kiBlast();
    }
  }
  // =========================================================
  // 3. CLOSE COMBAT (Jab dono ekdum paas hon)
  // =========================================================
  else {
    enemy.moveLeft = false;
    enemy.moveRight = false;
    // 🔥 NAYA JADOO: 30px aate hi Asli Long-Press Dash Start karo!
    if (absDist <= 30 && Math.random() < 0.9) {
      let spaceLeft = enemy.x;
      let spaceRight = WORLD_WIDTH - enemy.x;

      // Jis taraf zyada jagah hai, us taraf bhago
      if (spaceLeft > spaceRight) {
        enemy.moveLeft = true;
        enemy.moveRight = false;
      } else {
        enemy.moveLeft = false;
        enemy.moveRight = true;
      }

      // Long Press Dash ON!
      enemy.isEnemyDashing = true;
      enemy.dash(); // Asli dash animation aur dhool udegi!

      return; // Seedha loop se bahar
    }

    if (absDist < 150 && Math.random() < 0.08) {
      if (Math.random() < 0.5) enemy.jump();
      else enemy.dash();
      return; // Engine yahan se wapas ghoom jayega (purane attacks nahi karega)
    }

    if (Math.random() < 0.9) {
      let rand = Math.random();
      if (rand < 0.15) enemy.punch();
      else if (rand < 0.25) enemy.kiAttack();
      else if (rand < 0.35) enemy.hellPunch();
      else if (rand < 0.45) enemy.smashPunch();
      else if (rand < 0.55) enemy.smashKick();
      else if (rand < 0.65) enemy.kick();
      else if (rand < 0.75) enemy.extraAttack();
      else if (rand < 0.8) enemy.kiBlast();
      else if (rand < 0.9) enemy.kamehameha(); // KI-BLAST WAPAS AA GAYA!
      else enemy.bigKamehameha(); // KAMEHAMEHA
    }
  }
}

// ==========================================
// 7. COLLISION DETECTION
// ==========================================
function isColliding(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  );
}

function checkCollisions() {
  let p1Alive = activeMatchFighters.some(
    (f) => f.activeInBattle && f.health > 0 && f.team === "p1"
  );
  let enemyAlive = activeMatchFighters.some(
    (f) => f.activeInBattle && f.health > 0 && f.team === "enemy"
  );
  if (!p1Alive || !enemyAlive) return;
  /*activeMatchFighters.forEach((f) => {
    if (f.activeInBattle && f.isAttacking && f.health > 0) {
      let hit = f.getHitbox();
      if (!hit) return;
      f.hitCooldowns = f.hitCooldowns || {};

      activeMatchFighters.forEach((target) => {
        if (
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== f.team &&
          target !== f &&
          target.state !== "death"
        ) {
          f.hitCooldowns[target.id] = (f.hitCooldowns[target.id] || 0) - 1;
          let hurt = target.getHurtbox();
          if (hurt && isColliding(hit, hurt)) {
            if (f.hitCooldowns[target.id] <= 0 && target.state !== "hit") {
              let profile = getAttackProfile(f, f.state);
              // let dmg = getSmartDamage(f.state);
              //  target.takeHit(dmg, f.x, f._uniqueId || f.id);
              //  target.applyKnockback(f.state, f.scaleX);
              target.takeHit(profile.damage, f.x, f._uniqueId || f.id);
              target.applyKnockback(profile.knockback, f.scaleX);
              updateHealthBars();

              //   f.hitCooldowns[target.id] = 10;
              f.hitCooldowns[target.id] = profile.cooldown;
            }
          } else {
            f.hitCooldowns[target.id] = 0;
          }
        }
      });
    }
  });*/
  // 🎯 SABHI NAYE FIGHTERS (Slots 4 to 8) KE MELEE & COMBO HITS:
  //  activeMatchFighters.forEach((f) => {
  // Agar ye fighter purane 8 main fighters ke alawa hai:
  /* if (
      f !== player1 &&
      f !== teammate &&
      f !== teammate2 &&
      f !== teammate3 &&
      f !== enemy &&
      f !== enemy2 &&
      f !== enemy3 &&
      f !== sasuke &&
      f.activeInBattle &&
      f.isAttacking &&
      f.health > 0
      f.state !== "death"
    ) {
      let hit = f.getHitbox();
      if (!hit) return;
      f.hitCooldowns = f.hitCooldowns || {};

      activeMatchFighters.forEach((target) => {*/
  /* activeMatchFighters.forEach((f) => {
    if (
      f.activeInBattle &&
      f.isAttacking &&
      f.health > 0 &&
      f.state !== "death"
    ) {
      // Goku SSB mediumAttack grab is handled in its own animation
      if (f.state === "mediumAttack" && f.id === "teammate") return;

      let hit = f.getHitbox();
      if (!hit) return;
      f.hitCooldowns = f.hitCooldowns || {};

      /*activeMatchFighters.forEach((target) => {
        if (
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== f.team && // 👈 Dost ko 0 hit
          target !== f &&
          target.state !== "death"
        ) {
          let tKey = target._uniqueId || target.id;
          f.hitCooldowns[tKey] = (f.hitCooldowns[tKey] || 0) - 1;
          let hurt = target.getHurtbox();
          //   f.hitCooldowns[target.id] = (f.hitCooldowns[target.id] || 0) - 1;
          //   let hurt = target.getHurtbox();
          //   if (hurt && isColliding(hit, hurt)) {
          //   if (f.hitCooldowns[target.id] <= 0 && target.state !== "hit") {
          //   let dmg = getSmartDamage(f.state);
          //  target.takeHit(dmg, f.x, f._uniqueId || f.id);
          //   target.takeHit(dmg, f.x, f);
          // target.applyKnockback(f.state, f.scaleX);
          //  updateHealthBars();
          //  f.hitCooldowns[target.id] = 10;
          if (hurt && isColliding(hit, hurt)) {
            if (f.hitCooldowns[tKey] <= 0 && target.state !== "hit") {
              // Frieza mediumAttack cross explosion
              if (f.state === "mediumAttack" && f.id === "enemy2") {
                target.takeHit(7, f.x, f);
                target.applyKnockback("hellPunch", f.scaleX, null, f);
                updateHealthBars();
                if (f.data && f.data.mediumAttack) {
                  let expFrames = [
                    { x: 254, y: 409, w: 113, h: 63 },
                    { x: 392, y: 410, w: 103, h: 60 },
                    { x: 512, y: 418, w: 101, h: 60 },
                  ];
                  let explosion = new Projectile(
                    f.id,
                    target.x,
                    target.y + 10,
                    f.scaleX,
                    expFrames,
                    f.imageUrl,
                    f.bgSize,
                    f
                  );
                  explosion.isFriezaCrossExplosion = true;
                  explosion.damage = 0;
                  explosion.frameIndex = 0;
                  projectiles.push(explosion);
                }
                f.hitCooldowns[tKey] = 10;
              } else {
                let dmg = getSmartDamage(f.state);
                target.takeHit(dmg, f.x, f); // 💥 Direct fighter pass hua -> 100% Combo ++
                target.applyKnockback(
                  f.state === "hellAttack" && f.id === "teammate"
                    ? "ssbHellAttack"
                    : f.state,
                  f.scaleX,
                  null,
                  f
                );
                updateHealthBars();
                f.hitCooldowns[tKey] = 10;
              }
            }
          } else {
            f.hitCooldowns[tKey] = 0;
          }
        }
      });
    }
  });*/
  // 🎯 SABHI NAYE FIGHTERS (Slots 4 to 8) KE MELEE & COMBO HITS:
  activeMatchFighters.forEach((f) => {
    // Sirf extra fighters (Slots 4 to 8) ke liye chalega, main 8 fighters apne main functions se chalenge:
    /* if (
      f !== player1 &&
      f !== teammate &&
      f !== teammate2 &&
      f !== teammate3 &&
      f !== enemy &&
      f !== enemy2 &&
      f !== enemy3 &&
      f !== sasuke &&
      f.activeInBattle &&
      f.isAttacking &&
      f.health > 0 &&
      f.state !== "death"
    ) {*/
    if (
      f.activeInBattle &&
      f.isAttacking &&
      f.health > 0 &&
      f.state !== "death"
    ) {
      /*if (
        f.state === "mediumAttack" &&
        f.imageUrl &&
        f.imageUrl.includes("frieza")
      )
        return;*/
      if (f.state === "kamehameha") return;
      if (
        f.state === "mediumAttack" &&
        f.imageUrl &&
        (f.imageUrl.includes("frieza") || f.imageUrl.includes("gokussb"))
      )
        return;
      let hit = f.getHitbox();
      if (!hit) return;

      f.hitCooldowns = f.hitCooldowns || {};

      activeMatchFighters.forEach((target) => {
        if (
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== f.team && // 👈 Sirf dushman ko hit karega
          target !== f &&
          target.state !== "death"
        ) {
          let tKey = target._uniqueId || target.id;
          f.hitCooldowns[tKey] = (f.hitCooldowns[tKey] || 0) - 1;
          let hurt = target.getHurtbox();

          if (hurt && isColliding(hit, hurt)) {
            if (f.hitCooldowns[tKey] <= 0 && target.state !== "hit") {
              let dmg = getSmartDamage(f.state);
              target.takeHit(dmg, f.x, f);
              target.applyKnockback(f.state, f.scaleX);
              updateHealthBars();
              f.hitCooldowns[tKey] = 10;
            }
          } else {
            f.hitCooldowns[tKey] = 0;
          }
        }
      });
    }
  });

  // 👇 ISKE NEECHE AAPKA SAARA MAIN IMPORTANT DATA WAISA HI RAHEGA:
  // if (teammate.isAttacking ...) { ... }
  // if (teammate2.isAttacking) { ... }
  // if (teammate3.isAttacking) { ... }
  // if (player1.isAttacking) { ... }
  // if (enemy.isAttacking) { ... }
  // if (enemy2.isAttacking) { ... }
  // if (enemy3.isAttacking) { ... }
  // if (sasuke && sasuke.isAttacking) { ... }
  let p1Hurtbox = player1.getHurtbox();
  let p2Hurtbox = enemy.getHurtbox();
  let fHurtbox = enemy2.getHurtbox();
  let tHurtbox = teammate.getHurtbox();
  let t2Hurtbox = teammate2.getHurtbox();
  let t3Hurtbox = teammate3.getHurtbox();
  let sHurtbox = enemy3.getHurtbox();
  if (teammate.isAttacking && teammate.state !== "mediumAttack") {
    let tHitbox = teammate.getHitbox();

    if (
      teammate.team !== enemy.team &&
      tHitbox &&
      isColliding(tHitbox, p2Hurtbox)
    ) {
      teammate.hitCooldown = (teammate.hitCooldown || 0) - 1;
      if (
        enemy.state !== "hit" &&
        enemy.state !== "death" &&
        teammate.hitCooldown <= 0
      ) {
        let damage = 1;
        if (teammate.state === "kick") damage = 2;
        if (teammate.state === "smashPunch") damage = 4;
        if (teammate.state === "smashKick") damage = 4;
        if (teammate.state === "hellPunch") damage = 5; // 💥 VIP HELL PUNCH DAMAGE!
        if (teammate.state === "hellKick") damage = 8;
        if (teammate.state === "hellKick" || teammate.state === "hellAttack")
          damage = 8;
        enemy.takeHit(damage, teammate.x, "teammate");
        enemy.applyKnockback(
          teammate.state === "hellAttack" ? "ssbHellAttack" : teammate.state,
          teammate.scaleX
        );
        updateHealthBars();
        teammate.hitCooldown = 10;
      }
    } else {
      teammate.hitCooldown = 0;
    }
    if (
      teammate.team !== enemy2.team &&
      tHitbox &&
      isColliding(tHitbox, fHurtbox)
    ) {
      teammate.hitCooldownF = (teammate.hitCooldownF || 0) - 1;
      if (
        enemy2.state !== "hit" &&
        enemy2.state !== "death" &&
        teammate.hitCooldownF <= 0
      ) {
        let damage = 1;
        if (teammate.state === "kick") damage = 2;
        if (teammate.state === "smashPunch") damage = 4;
        if (teammate.state === "smashKick") damage = 4;
        if (teammate.state === "hellPunch") damage = 5;
        if (teammate.state === "hellKick") damage = 8;
        if (teammate.state === "hellKick" || teammate.state === "hellAttack")
          damage = 8;
        enemy2.takeHit(damage, teammate.x, "teammate");
        enemy2.applyKnockback(
          teammate.state === "hellAttack" ? "ssbHellAttack" : teammate.state,
          teammate.scaleX
        );
        updateHealthBars();
        teammate.hitCooldownF = 10;
      }
    } else {
      teammate.hitCooldownF = 0;
    }
    //if (tHitbox && isColliding(tHitbox, sHurtbox)) {
    if (
      teammate.team !== enemy3.team &&
      tHitbox &&
      isColliding(tHitbox, sHurtbox)
    ) {
      teammate.hitCooldownS = (teammate.hitCooldownS || 0) - 1;
      if (
        enemy3.state !== "hit" &&
        enemy3.state !== "death" &&
        teammate.hitCooldownS <= 0
      ) {
        let damage = 1;
        if (teammate.state === "kick") damage = 2;
        if (teammate.state === "smashPunch") damage = 4;
        if (teammate.state === "smashKick") damage = 4;
        if (teammate.state === "hellPunch") damage = 5;
        if (teammate.state === "hellKick") damage = 8;
        if (teammate.state === "hellKick" || teammate.state === "hellAttack")
          damage = 8;
        enemy3.takeHit(damage, teammate.x, "teammate");
        enemy3.applyKnockback(
          teammate.state === "hellAttack" ? "ssbHellAttack" : teammate.state,
          teammate.scaleX
        );
        updateHealthBars();
        teammate.hitCooldownS = 10;
      }
    } else {
      teammate.hitCooldownS = 0;
    }
    // 🎯 GOKU SSB KA MUKKA/KICK DEKU KO LAGE:
    //  if (tHitbox && isColliding(tHitbox, p1Hurtbox)) {
    if (
      teammate.team !== player1.team &&
      tHitbox &&
      isColliding(tHitbox, p1Hurtbox)
    ) {
      teammate.hitCooldownP1 = (teammate.hitCooldownP1 || 0) - 1;
      if (
        player1.state !== "hit" &&
        player1.state !== "death" &&
        teammate.hitCooldownP1 <= 0
      ) {
        let damage = 1;
        if (teammate.state === "kick") damage = 2;
        if (teammate.state === "smashPunch") damage = 4;
        if (teammate.state === "smashKick") damage = 4;
        if (teammate.state === "hellPunch") damage = 5;
        if (teammate.state === "hellKick") damage = 8;
        if (teammate.state === "hellKick" || teammate.state === "hellAttack")
          damage = 8;
        player1.takeHit(damage, teammate.x, "teammate");
        player1.applyKnockback(
          teammate.state === "hellAttack" ? "ssbHellAttack" : teammate.state,
          teammate.scaleX
        );
        updateHealthBars();
        teammate.hitCooldownP1 = 10;
      }
    } else {
      teammate.hitCooldownP1 = 0;
    }

    // 🎯 GOKU SSB KA MUKKA/KICK ITACHI KO LAGE:
    // if (tHitbox && isColliding(tHitbox, t3Hurtbox)) {
    if (
      teammate.team !== teammate3.team &&
      tHitbox &&
      isColliding(tHitbox, t3Hurtbox)
    ) {
      teammate.hitCooldownT3 = (teammate.hitCooldownT3 || 0) - 1;
      if (
        teammate3.state !== "hit" &&
        teammate3.state !== "death" &&
        teammate.hitCooldownT3 <= 0
      ) {
        let damage = 1;
        if (teammate.state === "kick") damage = 2;
        if (teammate.state === "smashPunch") damage = 4;
        if (teammate.state === "smashKick") damage = 4;
        if (teammate.state === "hellPunch") damage = 5;
        if (teammate.state === "hellKick") damage = 8;
        if (teammate.state === "hellKick" || teammate.state === "hellAttack")
          damage = 8;
        teammate3.takeHit(damage, teammate.x, "teammate");
        teammate3.applyKnockback(
          teammate.state === "hellAttack" ? "ssbHellAttack" : teammate.state,
          teammate.scaleX
        );
        updateHealthBars();
        teammate.hitCooldownT3 = 10;
      }
    } else {
      teammate.hitCooldownT3 = 0;
    }

    // 🎯 GOKU SSB KA MUKKA/KICK JIREN KO LAGE:
    // if (tHitbox && isColliding(tHitbox, t2Hurtbox)) {
    if (
      teammate.team !== teammate2.team &&
      tHitbox &&
      isColliding(tHitbox, t2Hurtbox)
    ) {
      teammate.hitCooldownT2 = (teammate.hitCooldownT2 || 0) - 1;
      if (
        teammate2.state !== "hit" &&
        teammate2.state !== "death" &&
        teammate.hitCooldownT2 <= 0
      ) {
        let damage = 1;
        if (teammate.state === "kick") damage = 2;
        if (teammate.state === "smashPunch") damage = 4;
        if (teammate.state === "smashKick") damage = 4;
        if (teammate.state === "hellPunch") damage = 5;
        if (teammate.state === "hellKick") damage = 8;
        if (teammate.state === "hellKick" || teammate.state === "hellAttack")
          damage = 8;

        teammate2.takeHit(damage, teammate.x, "teammate");
        teammate2.applyKnockback(
          teammate.state === "hellAttack" ? "ssbHellAttack" : teammate.state,
          teammate.scaleX
        );
        updateHealthBars();
        teammate.hitCooldownT2 = 10;
      }
    } else {
      teammate.hitCooldownT2 = 0;
    }
  }

  // =========================================================
  // 🔥 NAYA JADOO: JIREN KA ASLI DAMAGE SYSTEM!
  // =========================================================
  if (teammate2.isAttacking) {
    let t2Hitbox = teammate2.getHitbox();
    // if (t2Hitbox && isColliding(t2Hitbox, p2Hurtbox)) {
    if (
      teammate2.team !== enemy.team &&
      t2Hitbox &&
      isColliding(t2Hitbox, p2Hurtbox)
    ) {
      teammate2.hitCooldown = (teammate2.hitCooldown || 0) - 1;
      if (
        enemy.state !== "hit" &&
        enemy.state !== "death" &&
        teammate2.hitCooldown <= 0
      ) {
        // Jiren absolute Boss hai, uska normal Punch hi 4 HP khayega!
        let damage = 1;
        if (teammate2.state === "hellPunch") damage = 5;
        enemy.takeHit(damage, teammate2.x, "teammate2");
        enemy.applyKnockback(teammate2.state, teammate2.scaleX);
        updateHealthBars();
        teammate2.hitCooldown = 10;
      }
    } else {
      teammate2.hitCooldown = 0;
    }
    // 🎯 JIREN KA MUKKA GOKU SSB KO LAGE:
    //if (t2Hitbox && isColliding(t2Hitbox, tHurtbox)) {
    if (
      teammate2.team !== teammate.team &&
      t2Hitbox &&
      isColliding(t2Hitbox, tHurtbox)
    ) {
      teammate2.hitCooldownT = (teammate2.hitCooldownT || 0) - 1;
      if (
        teammate.state !== "hit" &&
        teammate.state !== "death" &&
        teammate2.hitCooldownT <= 0
      ) {
        let damage = 1;
        if (teammate2.state === "hellPunch") damage = 5;
        teammate.takeHit(damage, teammate2.x, "teammate2");
        teammate.applyKnockback(teammate2.state, teammate2.scaleX);
        updateHealthBars();
        teammate2.hitCooldownT = 10;
      }
    } else {
      teammate2.hitCooldownT = 0;
    }

    // 🎯 JIREN KA MUKKA ENEMY ITACHI KO LAGE:
    //  if (t2Hitbox && isColliding(t2Hitbox, t3Hurtbox)) {
    if (
      teammate2.team !== teammate3.team &&
      t2Hitbox &&
      isColliding(t2Hitbox, t3Hurtbox)
    ) {
      teammate2.hitCooldownT3 = (teammate2.hitCooldownT3 || 0) - 1;
      if (
        teammate3.state !== "hit" &&
        teammate3.state !== "death" &&
        teammate2.hitCooldownT3 <= 0
      ) {
        let damage = 1;
        if (teammate2.state === "hellPunch") damage = 5;
        teammate3.takeHit(damage, teammate2.x, "teammate2");
        teammate3.applyKnockback(teammate2.state, teammate2.scaleX);
        updateHealthBars();
        teammate2.hitCooldownT3 = 10;
      }
    } else {
      teammate2.hitCooldownT3 = 0;
    }

    // if (t2Hitbox && isColliding(t2Hitbox, p1Hurtbox)) {
    if (
      teammate2.team !== player1.team &&
      t2Hitbox &&
      isColliding(t2Hitbox, p1Hurtbox)
    ) {
      teammate2.hitCooldownP1 = (teammate2.hitCooldownP1 || 0) - 1;
      if (
        player1.state !== "hit" &&
        player1.state !== "death" &&
        teammate2.hitCooldownP1 <= 0
      ) {
        let damage = 1;
        if (teammate2.state === "hellPunch") damage = 5;
        player1.takeHit(damage, teammate2.x, "teammate2");
        player1.applyKnockback(teammate2.state, teammate2.scaleX);
        updateHealthBars();
        teammate2.hitCooldownP1 = 10;
      }
    } else {
      teammate2.hitCooldownP1 = 0;
    }

    //  if (t2Hitbox && isColliding(t2Hitbox, fHurtbox)) {
    if (
      teammate2.team !== enemy2.team &&
      t2Hitbox &&
      isColliding(t2Hitbox, fHurtbox)
    ) {
      teammate2.hitCooldownF = (teammate2.hitCooldownF || 0) - 1;
      if (
        enemy2.state !== "hit" &&
        enemy2.state !== "death" &&
        teammate2.hitCooldownF <= 0
      ) {
        let damage = 1;
        if (teammate2.state === "hellPunch") damage = 5;
        enemy2.takeHit(damage, teammate2.x, "teammate2");
        enemy2.applyKnockback(teammate2.state, teammate2.scaleX);
        updateHealthBars();
        teammate2.hitCooldownF = 10;
      }
    } else {
      teammate2.hitCooldownF = 0;
    }

    //  if (t2Hitbox && isColliding(t2Hitbox, sHurtbox)) {
    if (
      teammate2.team !== enemy3.team &&
      t2Hitbox &&
      isColliding(t2Hitbox, sHurtbox)
    ) {
      teammate2.hitCooldownS = (teammate2.hitCooldownS || 0) - 1;
      if (
        enemy3.state !== "hit" &&
        enemy3.state !== "death" &&
        teammate2.hitCooldownS <= 0
      ) {
        let damage = 1;
        if (teammate2.state === "hellPunch") damage = 5;
        enemy3.takeHit(damage, teammate2.x, "teammate2");
        enemy3.applyKnockback(teammate2.state, teammate2.scaleX);
        updateHealthBars();
        teammate2.hitCooldownS = 10;
      }
    } else {
      teammate2.hitCooldownS = 0;
    }
  }
  // ==========================================================
  // 🎯 ITACHI UNIVERSAL MELEE (Saamne 1 ho ya 10 Dushman, Sabko Damage Lagega)
  // ==========================================================
  if (teammate3.isAttacking) {
    let t3Hitbox = teammate3.getHitbox();
    if (t3Hitbox) {
      teammate3.hitCooldowns = teammate3.hitCooldowns || {};

      // 🎯 Saamne wali Dushman team ke sabhi khiladiyon ko scan karo:
      activeMatchFighters.forEach((target) => {
        if (
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== teammate3.team &&
          target.state !== "death"
        ) {
          teammate3.hitCooldowns[target.id] =
            (teammate3.hitCooldowns[target.id] || 0) - 1;

          let hurtbox = target.getHurtbox();
          if (hurtbox && isColliding(t3Hitbox, hurtbox)) {
            if (
              teammate3.hitCooldowns[target.id] <= 0 &&
              target.state !== "hit"
            ) {
              // 💥 Attack ke hisaab se damage:
              let damage = 1;
              if (teammate3.state === "kick") damage = 2;
              if (teammate3.state === "hellPunch") damage = 5;
              if (teammate3.state === "smashPunch") damage = 4;
              if (teammate3.state === "smashKick") damage = 6;
              if (teammate3.state === "hellKick") damage = 8;

              target.takeHit(damage, teammate3.x, "teammate3");
              target.applyKnockback(teammate3.state, teammate3.scaleX);
              updateHealthBars();
              teammate3.hitCooldowns[target.id] = 10; // 10 tick cooldown
            }
          } else {
            teammate3.hitCooldowns[target.id] = 0;
          }
        }
      });
    }
  }

  if (player1.isAttacking) {
    let p1Hitbox = player1.getHitbox();
    //  if (p1Hitbox && isColliding(p1Hitbox, p2Hurtbox)) {
    if (
      player1.team !== enemy.team &&
      p1Hitbox &&
      isColliding(p1Hitbox, p2Hurtbox)
    ) {
      // ... aapka puraana code ...

      player1.hitCooldown = (player1.hitCooldown || 0) - 1;
      if (
        enemy.state !== "hit" &&
        enemy.state !== "death" &&
        player1.hitCooldown <= 0
      ) {
        //let damage = player1.state === "kick" ? 2 : 1;
        // 🔥 NAYA JADOO: DAMAGE SYSTEM
        let damage = 1; // Normal punch ka 1 damage
        if (player1.state === "kick") damage = 2; // Kick ka 2 damage
        if (player1.state === "hellPunch") damage = 5;
        if (player1.state === "hellKick") damage = 8;
        if (player1.state === "smashKick") damage = 6;

        if (player1.state === "smashPunch") damage = 7;
        // 💥 VIP HELL PUNCH KA 5 HP DAMAGE!
        enemy.takeHit(damage, player1.x, "player");
        enemy.applyKnockback(player1.state, player1.scaleX);
        updateHealthBars();
        player1.hitCooldown = 10;
      }
    } else {
      player1.hitCooldown = 0;
    }
    // 🎯 DEKU KA PUNCH/KICK ENEMY GOKU SSB KO LAGE:
    //if (p1Hitbox && isColliding(p1Hitbox, tHurtbox)) {
    if (
      player1.team !== teammate.team &&
      p1Hitbox &&
      isColliding(p1Hitbox, tHurtbox)
    ) {
      // ... aapka puraana code

      player1.hitCooldownT = (player1.hitCooldownT || 0) - 1;
      if (
        teammate.state !== "hit" &&
        teammate.state !== "death" &&
        player1.hitCooldownT <= 0
      ) {
        let damage = 1;
        if (player1.state === "kick") damage = 2;
        if (player1.state === "hellPunch") damage = 5;
        if (player1.state === "hellKick") damage = 8;
        if (player1.state === "smashPunch") damage = 7;
        if (player1.state === "smashKick") damage = 6;

        teammate.takeHit(damage, player1.x, "player");
        teammate.applyKnockback(player1.state, player1.scaleX);
        updateHealthBars();
        player1.hitCooldownT = 10;
      }
    } else {
      player1.hitCooldownT = 0;
    }

    // 🎯 DEKU KA PUNCH/KICK ENEMY JIREN KO LAGE:
    //if (p1Hitbox && isColliding(p1Hitbox, t2Hurtbox)) {
    if (
      player1.team !== teammate2.team &&
      p1Hitbox &&
      isColliding(p1Hitbox, t2Hurtbox)
    ) {
      // ... aapka puraana code ...

      player1.hitCooldownT2 = (player1.hitCooldownT2 || 0) - 1;
      if (
        teammate2.state !== "hit" &&
        teammate2.state !== "death" &&
        player1.hitCooldownT2 <= 0
      ) {
        let damage = 1;
        if (player1.state === "kick") damage = 2;
        if (player1.state === "hellPunch") damage = 5;
        if (player1.state === "hellKick") damage = 8;
        if (player1.state === "smashPunch") damage = 7;
        if (player1.state === "smashKick") damage = 6;

        teammate2.takeHit(damage, player1.x, "player");
        teammate2.applyKnockback(player1.state, player1.scaleX);
        updateHealthBars();
        player1.hitCooldownT2 = 10;
      }
    } else {
      player1.hitCooldownT2 = 0;
    }

    // 🎯 DEKU KA PUNCH/KICK ENEMY ITACHI KO LAGE:
    // if (p1Hitbox && isColliding(p1Hitbox, t3Hurtbox)) {
    if (
      player1.team !== teammate3.team &&
      p1Hitbox &&
      isColliding(p1Hitbox, t3Hurtbox)
    ) {
      // ... aapka puraana code .

      player1.hitCooldownT3 = (player1.hitCooldownT3 || 0) - 1;
      if (
        teammate3.state !== "hit" &&
        teammate3.state !== "death" &&
        player1.hitCooldownT3 <= 0
      ) {
        let damage = 1;
        if (player1.state === "kick") damage = 2;
        if (player1.state === "hellPunch") damage = 5;
        if (player1.state === "hellKick") damage = 8;
        if (player1.state === "smashKick") damage = 6;

        if (player1.state === "smashPunch") damage = 7;

        teammate3.takeHit(damage, player1.x, "player");
        teammate3.applyKnockback(player1.state, player1.scaleX);
        updateHealthBars();
        player1.hitCooldownT3 = 10;
      }
    } else {
      player1.hitCooldownT3 = 0;
    }

    // if (p1Hitbox && isColliding(p1Hitbox, fHurtbox)) {
    if (
      player1.team !== enemy2.team &&
      p1Hitbox &&
      isColliding(p1Hitbox, fHurtbox)
    ) {
      // ... aapka puraana code ...

      player1.hitCooldownF = (player1.hitCooldownF || 0) - 1;
      if (
        enemy2.state !== "hit" &&
        enemy2.state !== "death" &&
        player1.hitCooldownF <= 0
      ) {
        let damage = 1;
        if (player1.state === "kick") damage = 2;
        if (player1.state === "hellPunch") damage = 5;
        if (player1.state === "hellKick") damage = 8;
        if (player1.state === "smashPunch") damage = 7;
        if (player1.state === "smashKick") damage = 6;

        enemy2.takeHit(damage, player1.x, "player");
        enemy2.applyKnockback(player1.state, player1.scaleX);
        updateHealthBars();
        player1.hitCooldownF = 10;
      }
    } else {
      player1.hitCooldownF = 0;
    }
    //  if (p1Hitbox && isColliding(p1Hitbox, sHurtbox)) {
    if (
      player1.team !== enemy3.team &&
      p1Hitbox &&
      isColliding(p1Hitbox, sHurtbox)
    ) {
      // ... aapka puraana code ...

      player1.hitCooldownS = (player1.hitCooldownS || 0) - 1;
      if (
        enemy3.state !== "hit" &&
        enemy3.state !== "death" &&
        player1.hitCooldownS <= 0
      ) {
        let damage = 1;
        if (player1.state === "kick") damage = 2;
        if (player1.state === "hellPunch") damage = 5;
        if (player1.state === "hellKick") damage = 8;
        if (player1.state === "smashKick") damage = 6;

        if (player1.state === "smashPunch") damage = 7;
        enemy3.takeHit(damage, player1.x, "player");
        enemy3.applyKnockback(player1.state, player1.scaleX);
        updateHealthBars();
        player1.hitCooldownS = 10;
      }
    } else {
      player1.hitCooldownS = 0;
    }
  }

  //if (enemy.isAttacking) {
  if (enemy.isAttacking && enemy.state !== "kamehameha") {
    let p2Hitbox = enemy.getHitbox();
    // if (p2Hitbox && isColliding(p2Hitbox, p1Hurtbox)) {
    if (
      enemy.team !== player1.team &&
      p2Hitbox &&
      isColliding(p2Hitbox, p1Hurtbox)
    ) {
      // ... aapka puraana code ...

      enemy.hitCooldown = (enemy.hitCooldown || 0) - 1;
      if (
        player1.state !== "hit" &&
        player1.state !== "death" &&
        enemy.hitCooldown <= 0
      ) {
        let damage = 1;
        if (enemy.state === "kick") damage = 2;
        if (enemy.state === "hellPunch") damage = 5;
        if (enemy.state === "smashPunch") damage = 5;
        if (enemy.state === "smashKick") damage = 8;

        player1.takeHit(damage, enemy.x, "enemy");
        player1.applyKnockback(enemy.state, enemy.scaleX);
        updateHealthBars();
        enemy.hitCooldown = 10;
      }
    }
    //else if (p2Hitbox && isColliding(p2Hitbox, tHurtbox)) {
    else if (
      enemy.team !== teammate.team &&
      p2Hitbox &&
      isColliding(p2Hitbox, tHurtbox)
    ) {
      // ... aapka puraana code ...

      enemy.hitCooldown = (enemy.hitCooldown || 0) - 1;
      if (
        teammate.state !== "hit" &&
        teammate.state !== "death" &&
        enemy.hitCooldown <= 0
      ) {
        let damage = 1;
        if (enemy.state === "kick") damage = 2;
        if (enemy.state === "hellPunch") damage = 5;
        if (enemy.state === "smashPunch") damage = 5;
        if (enemy.state === "smashKick") damage = 8;
        // Goku SSB ki HP kam hogi aur usko Knockback lagega
        teammate.takeHit(damage, enemy.x, "enemy");
        teammate.applyKnockback(enemy.state, enemy.scaleX);
        enemy.hitCooldown = 10;
      }
    } // 🎯 GOKU BLACK KA MUKKA/KICK FRIEZA KO LAGE:
    // else if (p2Hitbox && isColliding(p2Hitbox, fHurtbox)) {
    else if (
      enemy.team !== enemy2.team &&
      p2Hitbox &&
      isColliding(p2Hitbox, fHurtbox)
    ) {
      // ... aapka puraana code

      enemy.hitCooldownF = (enemy.hitCooldownF || 0) - 1;
      if (
        enemy2.state !== "hit" &&
        enemy2.state !== "death" &&
        enemy.hitCooldownF <= 0
      ) {
        let damage = 1;
        if (enemy.state === "kick") damage = 2;
        if (enemy.state === "hellPunch") damage = 5;
        if (enemy.state === "smashPunch") damage = 5;
        if (enemy.state === "smashKick") damage = 8;
        enemy2.takeHit(damage, enemy.x, "enemy");
        enemy2.applyKnockback(enemy.state, enemy.scaleX);
        updateHealthBars();
        enemy.hitCooldownF = 10;
      }
    }
    // 🎯 GOKU BLACK KA MUKKA/KICK SUKUNA KO LAGE:
    // else if (p2Hitbox && isColliding(p2Hitbox, sHurtbox)) {
    else if (
      enemy.team !== enemy3.team &&
      p2Hitbox &&
      isColliding(p2Hitbox, sHurtbox)
    ) {
      // ... aapka puraana code ..

      enemy.hitCooldownS = (enemy.hitCooldownS || 0) - 1;
      if (
        enemy3.state !== "hit" &&
        enemy3.state !== "death" &&
        enemy.hitCooldownS <= 0
      ) {
        let damage = 1;
        if (enemy.state === "kick") damage = 2;
        if (enemy.state === "hellPunch") damage = 5;
        if (enemy.state === "smashPunch") damage = 5;
        if (enemy.state === "smashKick") damage = 8;
        enemy3.takeHit(damage, enemy.x, "enemy");
        enemy3.applyKnockback(enemy.state, enemy.scaleX);
        updateHealthBars();
        enemy.hitCooldownS = 10;
      }
    }
    //else if (p2Hitbox && isColliding(p2Hitbox, t2Hurtbox)) {
    else if (
      enemy.team !== teammate2.team &&
      p2Hitbox &&
      isColliding(p2Hitbox, t2Hurtbox)
    ) {
      // ... aapka puraana code ...

      enemy.hitCooldown = (enemy.hitCooldown || 0) - 1;
      if (
        teammate2.state !== "hit" &&
        teammate2.state !== "death" &&
        enemy.hitCooldown <= 0
      ) {
        let damage = 1;
        if (enemy.state === "kick") damage = 2;
        if (enemy.state === "hellPunch") damage = 5;
        if (enemy.state === "smashPunch") damage = 5;
        if (enemy.state === "smashKick") damage = 8;
        teammate2.takeHit(damage, enemy.x);
        teammate2.applyKnockback(enemy.state, enemy.scaleX);
        enemy.hitCooldown = 10;
      }
    }
    // else if (p2Hitbox && isColliding(p2Hitbox, t3Hurtbox)) {
    else if (
      enemy.team !== teammate3.team &&
      p2Hitbox &&
      isColliding(p2Hitbox, t3Hurtbox)
    ) {
      // ... aapka puraana code ...

      enemy.hitCooldown = (enemy.hitCooldown || 0) - 1;
      if (
        teammate3.state !== "hit" &&
        teammate3.state !== "death" &&
        enemy.hitCooldown <= 0
      ) {
        let damage = 1;
        if (enemy.state === "kick") damage = 2;
        if (enemy.state === "hellPunch") damage = 5;
        if (enemy.state === "smashPunch") damage = 5;
        if (enemy.state === "hellKick") damage = 8;
        teammate3.takeHit(damage, enemy.x, "enemy");
        teammate3.applyKnockback(enemy.state, enemy.scaleX);
        enemy.hitCooldown = 10;
      }
    } else {
      enemy.hitCooldown = 0;
    }
  }

  //if (enemy2.isAttacking) {
  /* if (
    enemy2.isAttacking &&
    enemy2.imageUrl &&
    enemy2.imageUrl.includes("frieza")
  ) {*/
  //let friezaFighters = activeMatchFighters.filter(
  // (f) => f.activeInBattle && f.imageUrl && f.imageUrl.includes("frieza")
  // );
  /*let friezaFighter =
    activeMatchFighters.find(
      (f) => f.activeInBattle && f.imageUrl && f.imageUrl.includes("frieza")
    ) || enemy2;

  if (
    friezaFighter.isAttacking &&
    friezaFighter.imageUrl &&
    friezaFighter.imageUrl.includes("frieza")
  ) {
    let fHitbox = friezaFighter.getHitbox();
    if (friezaFighter.state === "mediumAttack" && fHitbox) {*/
  /* let allFriezas = activeMatchFighters.filter(
            (f) => f.activeInBattle && f.imageUrl && f.imageUrl.includes("frieza")
              );
                if (allFriezas.length === 0 && enemy2) allFriezas = [enemy2];

                  allFriezas.forEach((friezaFighter) => {
                      if (!friezaFighter.isAttacking) return;
                          let fHitbox = friezaFighter.getHitbox();
                            if (friezaFighter.state === "mediumAttack" && fHitbox) {*/
  let allFriezas = activeMatchFighters.filter(
    (f) => f.activeInBattle && f.imageUrl && f.imageUrl.includes("frieza")
  );
  if (allFriezas.length === 0 && enemy2) allFriezas = [enemy2];

  allFriezas.forEach((friezaFighter) => {
    if (!friezaFighter.isAttacking) return;
    let fHitbox = friezaFighter.getHitbox();
    if (friezaFighter.state === "mediumAttack" && fHitbox) {
      //  if (friezaFighters.length === 0 && enemy2) friezaFighters = [enemy2];
      // friezaFighters.forEach((friezaFighter) => {
      // if (friezaFighter.isAttacking) {

      // let fHitbox = enemy2.getHitbox();
      // let fHitbox = friezaFighter.getHitbox();
      //if (enemy2.state === "mediumAttack" && fHitbox) {
      // enemy2.hitCooldowns = enemy2.hitCooldowns || {};
      //  activeMatchFighters.forEach((target) => {
      //  if (friezaFighter.state === "mediumAttack" && fHitbox) {
      friezaFighter.hitCooldowns = friezaFighter.hitCooldowns || {};
      activeMatchFighters.forEach((target) => {
        if (
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== friezaFighter.team &&
          // target.team !== enemy2.team &&
          target.state !== "death"
        ) {
          // enemy2.hitCooldowns[target.id] =
          //  (enemy2.hitCooldowns[target.id] || 0) - 1;
          //  let targetHurt = target.getHurtbox();
          let targetKey = target._uniqueId || target.id;
          friezaFighter.hitCooldowns[targetKey] =
            (friezaFighter.hitCooldowns[targetKey] || 0) - 1;
          let targetHurt = target.getHurtbox();
          if (targetHurt && isColliding(fHitbox, targetHurt)) {
            // if (enemy2.hitCooldowns[target.id] <= 0) {
            // 1. Dushman ko damage do
            if (friezaFighter.hitCooldowns[targetKey] <= 0) {
              // target.takeHit(7, enemy2.x, "enemy2");
              // target.applyKnockback("hellPunch", enemy2.scaleX);
              target.takeHit(7, friezaFighter.x, friezaFighter);
              target.applyKnockback("hellPunch", friezaFighter.scaleX);

              updateHealthBars();

              // 2. ❌ CROSS EXPLOSION SPAWN (Frames 6,7,8 -> Indices 5,6,7)
              // if (enemy2.data && enemy2.data.mediumAttack) {
              if (friezaFighter.data && friezaFighter.data.mediumAttack) {
                let expFrames = [
                  { x: 254, y: 409, w: 113, h: 63 },
                  { x: 392, y: 410, w: 103, h: 60 },
                  { x: 512, y: 418, w: 101, h: 60 },
                ];

                let explosion = new Projectile(
                  // enemy2.id,
                  friezaFighter._uniqueId || friezaFighter.id,

                  target.x,
                  target.y + 10,
                  // enemy2.scaleX,
                  friezaFighter.scaleX,
                  expFrames,
                  friezaFighter.imageUrl,
                  friezaFighter.bgSize
                  // expFrames,
                  //  enemy2.imageUrl,
                  // enemy2.bgSize
                );
                explosion.isFriezaCrossExplosion = true;
                explosion.damage = 0; // Dhamake ka extra damage
                explosion.frameIndex = 0;
                projectiles.push(explosion);
              }
              //  enemy2.hitCooldowns[target.id] = 3;
              friezaFighter.hitCooldowns[targetKey] = 3;
            }
          } else {
            // enemy2.hitCooldowns[target.id] = 0;
            friezaFighter.hitCooldowns[targetKey] = 0;
          }
        }
      });
    } else if (fHitbox && enemy2.state !== "mediumAttack") {
      // if (fHitbox && isColliding(fHitbox, p1Hurtbox)) {
      if (
        enemy2.team !== player1.team &&
        fHitbox &&
        isColliding(fHitbox, p1Hurtbox)
      ) {
        enemy2.hitCooldownP1 = (enemy2.hitCooldownP1 || 0) - 1;
        if (
          player1.state !== "hit" &&
          player1.state !== "death" &&
          enemy2.hitCooldownP1 <= 0
        ) {
          let damage = 1;
          if (enemy2.state === "kick") damage = 2;
          if (enemy2.state === "smashPunch") damage = 5;
          if (enemy2.state === "hellPunch") damage = 8;

          player1.takeHit(damage, enemy2.x, "enemy2");
          player1.applyKnockback(enemy2.state, enemy2.scaleX);
          updateHealthBars();
          enemy2.hitCooldownP1 = 10;
        }
      } // 🎯 FRIEZA KA PUNCH/KICK GOKU BLACK KO LAGE:
      //else if (fHitbox && isColliding(fHitbox, p2Hurtbox)) {
      else if (
        enemy2.team !== enemy.team &&
        fHitbox &&
        isColliding(fHitbox, p2Hurtbox)
      ) {
        enemy2.hitCooldownE = (enemy2.hitCooldownE || 0) - 1;
        if (
          enemy.state !== "hit" &&
          enemy.state !== "death" &&
          enemy2.hitCooldownE <= 0
        ) {
          let damage = 1;
          if (enemy2.state === "kick") damage = 2;
          if (enemy2.state === "smashPunch") damage = 5;
          if (enemy2.state === "hellPunch") damage = 8;
          enemy.takeHit(damage, enemy2.x, "enemy2");
          enemy.applyKnockback(enemy2.state, enemy2.scaleX);
          updateHealthBars();
          enemy2.hitCooldownE = 10;
        }
      }
      // 🎯 FRIEZA KA PUNCH/KICK SUKUNA KO LAGE:
      // else if (fHitbox && isColliding(fHitbox, sHurtbox)) {
      else if (
        enemy2.team !== enemy3.team &&
        fHitbox &&
        isColliding(fHitbox, sHurtbox)
      ) {
        enemy2.hitCooldownS = (enemy2.hitCooldownS || 0) - 1;
        if (
          enemy3.state !== "hit" &&
          enemy3.state !== "death" &&
          enemy2.hitCooldownS <= 0
        ) {
          let damage = 1;
          if (enemy2.state === "kick") damage = 2;
          if (enemy2.state === "smashPunch") damage = 5;
          if (enemy2.state === "hellPunch") damage = 8;
          enemy3.takeHit(damage, enemy2.x, "enemy2");
          enemy3.applyKnockback(enemy2.state, enemy2.scaleX);
          updateHealthBars();
          enemy2.hitCooldownS = 10;
        }
      }
      // else if (fHitbox && isColliding(fHitbox, tHurtbox)) {
      else if (
        enemy2.team !== teammate.team &&
        fHitbox &&
        isColliding(fHitbox, tHurtbox)
      ) {
        enemy2.hitCooldownT = (enemy2.hitCooldownT || 0) - 1;
        if (
          teammate.state !== "hit" &&
          teammate.state !== "death" &&
          enemy2.hitCooldownT <= 0
        ) {
          let damage = 1;
          if (enemy2.state === "kick") damage = 2;
          if (enemy2.state === "smashPunch") damage = 5;
          if (enemy2.state === "hellPunch") damage = 8;

          teammate.takeHit(damage, enemy2.x, "enemy2");
          teammate.applyKnockback(enemy2.state, enemy2.scaleX);
          updateHealthBars();
          enemy2.hitCooldownT = 10;
        }
      }
      //else if (fHitbox && isColliding(fHitbox, t2Hurtbox)) {
      else if (
        enemy2.team !== teammate2.team &&
        fHitbox &&
        isColliding(fHitbox, t2Hurtbox)
      ) {
        enemy2.hitCooldownT2 = (enemy2.hitCooldownT2 || 0) - 1;
        if (
          teammate2.state !== "hit" &&
          teammate2.state !== "death" &&
          enemy2.hitCooldownT2 <= 0
        ) {
          let damage = 1;
          if (enemy2.state === "kick") damage = 2;
          if (enemy2.state === "smashPunch") damage = 5;
          if (enemy2.state === "hellPunch") damage = 8;

          teammate2.takeHit(damage, enemy2.x, "enemy2");
          teammate2.applyKnockback(enemy2.state, enemy2.scaleX);
          updateHealthBars();
          enemy2.hitCooldownT2 = 10;
        }
      }
      // else if (fHitbox && isColliding(fHitbox, t3Hurtbox)) {
      else if (
        enemy2.team !== teammate3.team &&
        fHitbox &&
        isColliding(fHitbox, t3Hurtbox)
      ) {
        enemy2.hitCooldownT3 = (enemy2.hitCooldownT3 || 0) - 1;
        if (
          teammate3.state !== "hit" &&
          teammate3.state !== "death" &&
          enemy2.hitCooldownT3 <= 0
        ) {
          let damage = 1;
          if (enemy2.state === "kick") damage = 2;
          if (enemy2.state === "smashPunch") damage = 5;
          if (enemy2.state === "hellPunch") damage = 8;

          teammate3.takeHit(damage, enemy2.x, "enemy2");
          teammate3.applyKnockback(enemy2.state, enemy2.scaleX);
          updateHealthBars();
          enemy2.hitCooldownT3 = 10;
        }
      } else {
        enemy2.hitCooldownP1 = 0;
        enemy2.hitCooldownT = 0;
        enemy2.hitCooldownT2 = 0;
        enemy2.hitCooldownT3 = 0;
      }
    }
  });
  // 🔥 NAYA: Sukuna ka Attack (Sirf heroes ko lagega)
  // 🔥 NAYA: Sukuna ka Attack (Sirf heroes ko lagega)
  if (enemy3.isAttacking) {
    let sHitbox = enemy3.getHitbox();

    // 1. Deku ko damage
    //   if (sHitbox && isColliding(sHitbox, p1Hurtbox)) {
    if (
      enemy3.team !== player1.team &&
      sHitbox &&
      isColliding(sHitbox, p1Hurtbox)
    ) {
      enemy3.hitCooldownP1 = (enemy3.hitCooldownP1 || 0) - 1;
      if (
        player1.state !== "hit" &&
        player1.state !== "death" &&
        enemy3.hitCooldownP1 <= 0
      ) {
        let damage = 1;
        if (enemy3.state === "kick") damage = 2;
        if (enemy3.state === "hellPunch") damage = 5;
        if (enemy3.state === "smashPunch") damage = 5;
        if (enemy3.state === "smashKick") damage = 6;
        if (enemy3.state === "hellKick") damage = 8;
        player1.takeHit(damage, enemy3.x, "enemy3");
        player1.applyKnockback(enemy3.state, enemy3.scaleX);
        updateHealthBars();
        enemy3.hitCooldownP1 = 10;
      }
    }
    // 2. Teammate (SSB) ko damage
    //  else if (sHitbox && isColliding(sHitbox, tHurtbox)) {
    else if (
      enemy3.team !== teammate.team &&
      sHitbox &&
      isColliding(sHitbox, tHurtbox)
    ) {
      enemy3.hitCooldownT = (enemy3.hitCooldownT || 0) - 1;
      if (
        teammate.state !== "hit" &&
        teammate.state !== "death" &&
        enemy3.hitCooldownT <= 0
      ) {
        let damage = 1;
        if (enemy3.state === "kick") damage = 2;
        if (enemy3.state === "hellPunch") damage = 5;
        if (enemy3.state === "smashPunch") damage = 5;
        if (enemy3.state === "hellKick") damage = 8;
        if (enemy3.state === "smashKick") damage = 6;
        teammate.takeHit(damage, enemy3.x, "enemy3");
        teammate.applyKnockback(enemy3.state, enemy3.scaleX);
        updateHealthBars();
        enemy3.hitCooldownT = 10;
      }
    }
    // 🎯 SUKUNA KA MUKKA/KICK/SMASH GOKU BLACK KO LAGE:
    //  else if (sHitbox && isColliding(sHitbox, p2Hurtbox)) {
    else if (
      enemy3.team !== enemy.team &&
      sHitbox &&
      isColliding(sHitbox, p2Hurtbox)
    ) {
      enemy3.hitCooldownE = (enemy3.hitCooldownE || 0) - 1;
      if (
        enemy.state !== "hit" &&
        enemy.state !== "death" &&
        enemy3.hitCooldownE <= 0
      ) {
        let damage = 1;
        if (enemy3.state === "kick") damage = 2;
        if (enemy3.state === "hellPunch") damage = 5;
        if (enemy3.state === "smashPunch") damage = 5;
        if (enemy3.state === "smashKick") damage = 6;
        if (enemy3.state === "hellKick") damage = 8;
        enemy.takeHit(damage, enemy3.x, "enemy3");
        enemy.applyKnockback(enemy3.state, enemy3.scaleX);
        updateHealthBars();
        enemy3.hitCooldownE = 10;
      }
    }
    // 🎯 SUKUNA KA MUKKA/KICK/SMASH FRIEZA KO LAGE:
    // else if (sHitbox && isColliding(sHitbox, fHurtbox)) {
    else if (
      enemy3.team !== enemy2.team &&
      sHitbox &&
      isColliding(sHitbox, fHurtbox)
    ) {
      enemy3.hitCooldownF = (enemy3.hitCooldownF || 0) - 1;
      if (
        enemy2.state !== "hit" &&
        enemy2.state !== "death" &&
        enemy3.hitCooldownF <= 0
      ) {
        let damage = 1;
        if (enemy3.state === "kick") damage = 2;
        if (enemy3.state === "hellPunch") damage = 5;
        if (enemy3.state === "smashPunch") damage = 5;
        if (enemy3.state === "smashKick") damage = 6;
        if (enemy3.state === "hellKick") damage = 8;
        enemy2.takeHit(damage, enemy3.x, "enemy3");
        enemy2.applyKnockback(enemy3.state, enemy3.scaleX);
        updateHealthBars();
        enemy3.hitCooldownF = 10;
      }
    }

    // 3. Jiren ko damage
    // else if (sHitbox && isColliding(sHitbox, t2Hurtbox)) {
    else if (
      enemy3.team !== teammate2.team &&
      sHitbox &&
      isColliding(sHitbox, t2Hurtbox)
    ) {
      enemy3.hitCooldownT2 = (enemy3.hitCooldownT2 || 0) - 1;
      if (
        teammate2.state !== "hit" &&
        teammate2.state !== "death" &&
        enemy3.hitCooldownT2 <= 0
      ) {
        let damage = 1;
        if (enemy3.state === "kick") damage = 2;
        if (enemy3.state === "hellPunch") damage = 5;
        if (enemy3.state === "smashPunch") damage = 5;
        if (enemy3.state === "hellKick") damage = 8;
        if (enemy3.state === "smashKick") damage = 6;
        teammate2.takeHit(damage, enemy3.x, "enemy3");
        teammate2.applyKnockback(enemy3.state, enemy3.scaleX);
        updateHealthBars();
        enemy3.hitCooldownT2 = 10;
      }
    }
    // else if (sHitbox && isColliding(sHitbox, t3Hurtbox)) {
    else if (
      enemy3.team !== teammate3.team &&
      sHitbox &&
      isColliding(sHitbox, t3Hurtbox)
    ) {
      enemy3.hitCooldownT3 = (enemy3.hitCooldownT3 || 0) - 1;
      if (
        teammate3.state !== "hit" &&
        teammate3.state !== "death" &&
        enemy3.hitCooldownT3 <= 0
      ) {
        let damage = 1;
        if (enemy3.state === "kick") damage = 2;
        if (enemy3.state === "hellPunch") damage = 5;
        if (enemy3.state === "smashPunch") damage = 5;
        if (enemy3.state === "hellKick") damage = 8;
        if (enemy3.state === "smashKick") damage = 6;
        teammate3.takeHit(damage, enemy3.x, "enemy3");
        teammate3.applyKnockback(enemy3.state, enemy3.scaleX);
        updateHealthBars();
        enemy3.hitCooldownT3 = 10;
      }
    } else {
      enemy3.hitCooldownP1 = 0;
      enemy3.hitCooldownT = 0;
      enemy3.hitCooldownT2 = 0;
      enemy3.hitCooldownT3 = 0;
    }
  }

  // ==========================================================
  // ⚡ 100% SMART DYNAMIC SASUKE COMBAT BRIDGE
  // Saare Punches, Kicks aur Naye Custom Attacks ka Automatic Damage!
  // ==========================================================

  // 🎯 Helper: Kisi bhi attack ka automatic damage nikaalne ke liye
  function getSmartDamage(attackState) {
    if (!attackState) return 1;
    let s = attackState.toLowerCase();

    if (s.includes("hellkick")) return 8; // 💥 Sabse Bada Kick (8 HP)
    if (s.includes("smashkick")) return 6; // ⚡ Smash Kick (6 HP)
    if (s.includes("hellpunch") || s.includes("smashpunch")) return 5; // 👊 Heavy Punches (5 HP)
    if (s.includes("kick")) return 2; // 🦵 Normal Kick (2 HP)
    if (s.includes("punch")) return 1; // 🥊 Normal Punch (1 HP)
    return 3; // 🌟 Kal ko koi naya custom attack aaya toh safe 3 HP damage!
  }

  if (
    sasuke &&
    sasuke.activeInBattle &&
    sasuke.health > 0 &&
    sasuke.state !== "death"
  ) {
    let sasukeHurtbox = sasuke.getHurtbox();

    // 1. DUSHMAN KI TEAM KA KOI BHI FIGHTER SASUKE KO MARE:
    activeMatchFighters.forEach((ef) => {
      if (
        ef.activeInBattle &&
        ef.health > 0 &&
        ef.isAttacking &&
        ef.team !== sasuke.team
      ) {
        let eHit = ef.getHitbox();
        if (eHit && sasukeHurtbox && isColliding(eHit, sasukeHurtbox)) {
          ef.hitCooldownSasuke = (ef.hitCooldownSasuke || 0) - 1;
          if (ef.hitCooldownSasuke <= 0 && sasuke.state !== "hit") {
            let dmg = getSmartDamage(ef.state); // 👈 Automatic damage detect
            sasuke.takeHit(dmg, ef.x, ef.id);
            sasuke.applyKnockback(ef.state, ef.scaleX);
            updateHealthBars();
            ef.hitCooldownSasuke = 10;
          }
        } else {
          ef.hitCooldownSasuke = 0;
        }
      }
    });
  }

  // 2. SASUKE DUSHMAN KI TEAM KE KISI BHI FIGHTER KO MARE:
  if (sasuke && sasuke.isAttacking) {
    let sHitbox = sasuke.getHitbox();
    if (sHitbox) {
      sasuke.hitCooldowns = sasuke.hitCooldowns || {};

      activeMatchFighters.forEach((victim) => {
        if (
          victim.activeInBattle &&
          victim.health > 0 &&
          victim.team !== sasuke.team &&
          victim.state !== "death"
        ) {
          sasuke.hitCooldowns[victim.id] =
            (sasuke.hitCooldowns[victim.id] || 0) - 1;

          let vHurt = victim.getHurtbox();
          if (vHurt && isColliding(sHitbox, vHurt)) {
            if (sasuke.hitCooldowns[victim.id] <= 0 && victim.state !== "hit") {
              let dmg = getSmartDamage(sasuke.state); // 👈 Punch, Smash Punch sab cover!
              victim.takeHit(dmg, sasuke.x, "sasuke");
              victim.applyKnockback(sasuke.state, sasuke.scaleX);
              updateHealthBars();
              sasuke.hitCooldowns[victim.id] = 10;
            }
          } else {
            sasuke.hitCooldowns[victim.id] = 0;
          }
        }
      });
    }
  }
  // B. Projectile Collision (SINGLE HIT & CONTINUOUS BEAM LOGIC

  // B. Projectile Collision (SINGLE HIT & CONTINUOUS BEAM LOGIC)
  projectiles.forEach((p) => {
    if (!p.active) return;
    let projHitbox = p.getHitbox();
    if (!projHitbox) return;
    // ==========================================================
    // 🔥 JIREN HELL EXPLOSION (Animation 9 to 13 - Continuous Damage)
    // ==========================================================
    // ==========================================================
    // ⚡ SASUKE MEDIUM GOLI DAMAGE (Continuous 1 Damage, Cooldown 3, NO KNOCKBACK)
    // ==========================================================
    // ==========================================================
    // ⚡ SASUKE HELL ATTACK DAMAGE (Continuous 1 Damage + PUNCH DHAKKA)
    // ==========================================================
    // ==========================================================
    // 🌊 GOKU SSB HELL ATTACK BEAM (Continuous 1 Damage)
    // ==========================================================
    // 🔥 GOKU BLACK HELL BULLET COLLISION (Dost aur Khud ko ZERO hit):
    if (p.isHellBullet) {
      p.hitCooldowns = p.hitCooldowns || {};
      let ownerTeam = p.ownerTeam || (p.owner ? p.owner.team : "enemy");

      activeMatchFighters.forEach((target) => {
        if (
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== ownerTeam && // 👈 Dushman ko hi lagega
          target !== p.owner && // 👈 Khud ko kabhi nahi lagega
          target.state !== "death"
        ) {
          p.hitCooldowns[target.id] = (p.hitCooldowns[target.id] || 0) - 1;
          let targetHurt = target.getHurtbox();
          if (targetHurt && isColliding(projHitbox, targetHurt)) {
            if (p.hitCooldowns[target.id] <= 0) {
              target.takeHit(8, p.x, p.ownerId);
              target.applyKnockback("hellPunch", p.scaleX);
              updateHealthBars();
              p.hitCooldowns[target.id] = 10;
              p.destroy(); // 💥 Enemy ko thokte hi blast!
            }
          } else {
            p.hitCooldowns[target.id] = 0;
          }
        }
      });
      return;
    }

    if (p.isSSBHellBeam) {
      p.hitCooldowns = p.hitCooldowns || {};
      let ownerFighter = activeFighterMap[p.ownerId];
      let ownerTeam = ownerFighter ? ownerFighter.team : "p1";

      activeMatchFighters.forEach((target) => {
        if (
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== ownerTeam &&
          target.state !== "death"
        ) {
          p.hitCooldowns[target.id] = (p.hitCooldowns[target.id] || 0) - 1;

          let hurtbox = target.getHurtbox();
          if (hurtbox && isColliding(projHitbox, hurtbox)) {
            if (p.hitCooldowns[target.id] <= 0) {
              target.takeHit(1, p.x, p.ownerId); // 💥 Continuous 1 Damage!
              target.applyKnockback("punch", p.scaleX);
              updateHealthBars();
              p.hitCooldowns[target.id] = 3;
            }
          } else {
            p.hitCooldowns[target.id] = 0;
          }
        }
      });

      return;
    }
    if (p.isSasukeHell) {
      p.hitCooldowns = p.hitCooldowns || {};
      let ownerFighter = activeFighterMap[p.ownerId];
      // let ownerTeam = ownerFighter ? ownerFighter.team : "p1";
      let ownerTeam = p.ownerTeam || (ownerFighter ? ownerFighter.team : null);

      activeMatchFighters.forEach((target) => {
        if (
          target === p.owner ||
          target === ownerFighter ||
          (ownerTeam && target.team === ownerTeam)
        ) {
          return;
        }

        if (
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== ownerTeam &&
          target.state !== "death"
        ) {
          p.hitCooldowns[target.id] = (p.hitCooldowns[target.id] || 0) - 1;

          let targetHurt = target.getHurtbox();
          if (targetHurt && isColliding(projHitbox, targetHurt)) {
            if (p.hitCooldowns[target.id] <= 0) {
              //  target.takeHit(1, p.x, p.ownerId); // 💥 Continuous 1 Damage!
              //  target.applyKnockback("punch", p.scaleX); // 🥊 Punch ka dhakka!
              //  updateHealthBars();
              target.takeHit(1, p.x, p.owner || p.ownerId);
              if (p.isSasukeHell)
                target.applyKnockback("punch", p.scaleX, null, p.owner);
              updateHealthBars();

              p.hitCooldowns[target.id] = 3; // ⚡ 3-Tick Cooldown
            }
          } else {
            p.hitCooldowns[target.id] = 0;
          }
        }
      });

      return;
    }
    if (p.isSasukeMedium) {
      p.hitCooldowns = p.hitCooldowns || {};
      // let ownerFighter = activeFighterMap[p.ownerId];
      // let ownerTeam = ownerFighter ? ownerFighter.team : "p1";
      let ownerFighter = p.owner || activeFighterMap[p.ownerId];
      let ownerTeam = p.ownerTeam || (ownerFighter ? ownerFighter.team : null);

      activeMatchFighters.forEach((target) => {
        if (
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== ownerTeam &&
          target.state !== "death"
        ) {
          p.hitCooldowns[target.id] = (p.hitCooldowns[target.id] || 0) - 1;

          let targetHurt = target.getHurtbox();
          if (targetHurt && isColliding(projHitbox, targetHurt)) {
            if (p.hitCooldowns[target.id] <= 0) {
              target.takeHit(1, p.x, p.ownerId); // 💥 Continuous 1 Damage!
              // 🚫 NO KNOCKBACK (Dhakka nahi lagega):
              // target.applyKnockback ko call nahi kiya!
              updateHealthBars();
              p.hitCooldowns[target.id] = 3; // ⚡ 3-Tick Cooldown
            }
          } else {
            p.hitCooldowns[target.id] = 0;
          }
        }
      });

      return; // 🎯 Goli fixed rahegi aur lagatar sabko damage degi
    }
    if (p.isJirenHellExplosion) {
      // if (target === p.owner || (p.owner && target.team === p.owner.team))
      //  return;
      p.hitCooldowns = p.hitCooldowns || {};
      let ownerFighter = activeFighterMap[p.ownerId];
      let ownerTeam = ownerFighter ? ownerFighter.team : "p1";
      //  if (target === p.owner || (p.owner && target.team === p.owner.team))
      // return;
      activeMatchFighters.forEach((target) => {
        if (target === p.owner || (p.owner && target.team === p.owner.team))
          return;
        if (
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== ownerTeam &&
          target.state !== "death"
        ) {
          p.hitCooldowns[target.id] = (p.hitCooldowns[target.id] || 0) - 1;

          let targetHurt = target.getHurtbox();
          if (targetHurt && isColliding(projHitbox, targetHurt)) {
            if (p.hitCooldowns[target.id] <= 0) {
              target.takeHit(p.damage, p.x, p.ownerId); // 💥 7 Damage per frame
              target.applyKnockback("punch", p.scaleX); // 🥊 Hell Punch ka dhakka
              updateHealthBars();
              p.hitCooldowns[target.id] = 4; // ⚡ Thode-thode time baad hit lagega
            }
          } else {
            p.hitCooldowns[target.id] = 0;
          }
        }
      });
      return; // Explosion gayab nahi hogi jab tak animation na khatam ho
    }

    // ==========================================================
    // 🔥 JIREN HELL BULLET (Direct Touch & Explode)
    // ==========================================================
    if (p.isJirenHellBullet) {
      p.hitCooldowns = p.hitCooldowns || {};
      let ownerFighter = activeFighterMap[p.ownerId];
      let ownerTeam = ownerFighter ? ownerFighter.team : "p1";

      let hitTarget = activeMatchFighters.find(
        // if (target === p.owner || (p.owner && target.team === p.owner.team)) return;
        (target) =>
          target !== p.owner &&
          (!p.owner || target.team !== p.owner.team) &&
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== ownerTeam &&
          target.state !== "death" &&
          isColliding(projHitbox, target.getHurtbox())
      );

      if (hitTarget) {
        // 1. Initial Goli ka Damage aur Dhakka
        hitTarget.takeHit(p.damage, p.x, p.ownerId); // 7 Damage
        hitTarget.applyKnockback("punch", p.scaleX); // Hell Punch Dhakka
        updateHealthBars();

        // 2. 💥 EXACT GOLI KI LOCATION PAR ANIMATION (Frames 9-13)
        let explosionFrames = ownerFighter.data.hellAttack.slice(8, 13);
        let expX = p.x - 30;
        let expY = p.y - 20;
        let explosion = new Projectile(
          p.ownerId,
          expX,
          expY,
          p.scaleX,
          explosionFrames,
          ownerFighter.imageUrl,
          ownerFighter.bgSize,
          this
        );
        explosion.isJirenHellExplosion = true;
        explosion.damage = 7;
        explosion.frameIndex = 0;
        // Animation frames ka 7 damage
        projectiles.push(explosion);

        // 3. Goli touch hotey hi gayab
        p.destroy();
        return;
      }
    }
    // ==========================================================
    // 😈 SUKUNA KI-BLAST DAMAGE (Aar-Paar + Continuous 2 Damage + Punch Dhakka + Cooldown 3)
    // ==========================================================
    if (p.isSukunaBlast) {
      p.hitCooldowns = p.hitCooldowns || {};
      let ownerFighter = activeFighterMap[p.ownerId];
      let ownerTeam = ownerFighter ? ownerFighter.team : "enemy";

      activeMatchFighters.forEach((target) => {
        if (
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== ownerTeam &&
          target.state !== "death"
        ) {
          p.hitCooldowns[target.id] = (p.hitCooldowns[target.id] || 0) - 1;

          let targetHurt = target.getHurtbox();
          if (targetHurt && isColliding(projHitbox, targetHurt)) {
            if (p.hitCooldowns[target.id] <= 0) {
              target.takeHit(2, p.x, p.ownerId); // 💥 Lagatar 2 Damage!
              target.applyKnockback("punch", p.scaleX); // 🥊 Punch ka dhakka!
              updateHealthBars();
              p.hitCooldowns[target.id] = 3; // ⚡ 3-Tick Cooldown!
            }
          } else {
            p.hitCooldowns[target.id] = 0;
          }
        }
      });

      return; // 🎯 Goli destroy nahi hogi, aar-paar nikal jayegi!
    }
    // 🔥 JIREN GOLI TAKRAI (Universal Enemy Array Loop):
    // 🔥 ITACHI MEDIUM GOLI (Sabhi Dushmano ko Continuous 1 Damage + Punch Knockback):
    if (p.isItachiMedium) {
      p.hitCooldowns = p.hitCooldowns || {};
      let ownerFighter = activeFighterMap[p.ownerId];
      let ownerTeam = ownerFighter ? ownerFighter.team : "p1";

      activeMatchFighters.forEach((target) => {
        if (
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== ownerTeam &&
          target.state !== "death"
        ) {
          p.hitCooldowns[target.id] = (p.hitCooldowns[target.id] || 0) - 1;

          let targetHurt = target.getHurtbox();
          if (targetHurt && isColliding(projHitbox, targetHurt)) {
            if (p.hitCooldowns[target.id] <= 0) {
              target.takeHit(1, p.x, p.ownerId); // 💥 Continue 1 damage
              target.applyKnockback("punch", p.scaleX); // 🥊 Punch ka dhakka
              updateHealthBars();
              p.hitCooldowns[target.id] = 3; // ⚡ 4-Tick Cooldown
            }
          } else {
            p.hitCooldowns[target.id] = 0;
          }
        }
      });

      return; // Goli sabhi dushmano se aar-paar nikal kar hit karegi
    }

    if (p.isJirenMedium) {
      //if (target === p.owner || (p.owner && target.team === p.owner.team))
      // return;
      p.hitCooldowns = p.hitCooldowns || {};
      // if (target === p.owner || (p.owner && target.team === p.owner.team))
      //  return;
      let ownerFighter = activeFighterMap[p.ownerId];
      let ownerTeam = ownerFighter ? ownerFighter.team : "p1";
      //if (target === p.owner || (p.owner && target.team === p.owner.team))
      //return;
      // 🎯 Array me se Saamne wali Team ke sabhi Dushmano ko scan karo:
      activeMatchFighters.forEach((target) => {
        if (target === p.owner || (p.owner && target.team === p.owner.team))
          return;

        if (
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== ownerTeam &&
          target.state !== "death"
        ) {
          p.hitCooldowns[target.id] = (p.hitCooldowns[target.id] || 0) - 1;

          let targetHurt = target.getHurtbox();
          if (targetHurt && isColliding(projHitbox, targetHurt)) {
            if (p.hitCooldowns[target.id] <= 0) {
              target.takeHit(1, p.x, p.ownerId);
              target.applyKnockback("punch", p.scaleX);
              updateHealthBars();
              p.hitCooldowns[target.id] = 3; // ⚡ 3-Frame Continuous Cooldown!
            }
          } else {
            p.hitCooldowns[target.id] = 0;
          }
        }
      });

      return; // 🎯 Goli gayab nahi hogi, aar-paar nikal kar poori screen paar karegi!
    }
    // ==========================================================
    // 🌊 UNIVERSAL KAMEHAMEHA BEAMS (Goku SSB, Frieza, Goku Black Deku ko Damage Denge)
    // ==========================================================
    if (
      p.isSSBKamehameha ||
      p.isBigKamehameha ||
      p.isFriezaKamehameha ||
      p.isDiagonal
    ) {
      p.hitCooldowns = p.hitCooldowns || {};
      //  let ownerFighter = activeFighterMap[p.ownerId];
      // let ownerTeam = ownerFighter ? ownerFighter.team : "enemy";
      let ownerFighter =
        p.owner ||
        activeMatchFighters.find(
          (f) =>
            (f._uniqueId === p.ownerId || f.id === p.ownerId) &&
            f.team === p.ownerTeam
        ) ||
        activeMatchFighters.find(
          (f) => f._uniqueId === p.ownerId || f.id === p.ownerId
        ) ||
        activeFighterMap[p.ownerId];

      let ownerTeam =
        p.ownerTeam ||
        (ownerFighter
          ? ownerFighter.team
          : p.ownerId === "player" ||
            (typeof p.ownerId === "string" && p.ownerId.startsWith("teammate"))
          ? "p1"
          : "enemy");

      // 🎯 Saamne wali Dushman team ke sabhi khiladiyon (Deku etc.) ko scan karo:
      activeMatchFighters.forEach((target) => {
        if (
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== ownerTeam &&
          target !== ownerFighter &&
          target.state !== "death"
        ) {
          //   p.hitCooldowns[target.id] = (p.hitCooldowns[target.id] || 0) - 1;
          //  p.hitCooldowns[targetKey] = (p.hitCooldowns[targetKey] || 0) - 1;
          // p.hitCooldowns[targetKey] = (p.hitCooldowns[targetKey] || 0) - 1;
          let targetKey =
            target._uniqueId ||
            target.id + "_" + activeMatchFighters.indexOf(target);
          p.hitCooldowns[targetKey] = (p.hitCooldowns[targetKey] || 0) - 1;

          let hurtbox = target.getHurtbox();
          if (hurtbox && isColliding(projHitbox, hurtbox)) {
            if (p.hitCooldowns[targetKey] <= 0) {
              let dmg = p.isBigKamehameha ? 2 : p.isSSBKamehameha ? 2 : 1;
              // target.takeHit(dmg, p.x, p.ownerId);
              //  target.applyKnockback("smashPunch", p.scaleX);
              target.takeHit(dmg, p.x, ownerFighter || p.owner || p.ownerId);
              target.applyKnockback(
                "smashPunch",
                p.scaleX,
                null,
                ownerFighter || p.owner
              );
              updateHealthBars();
              p.hitCooldowns[targetKey] = 3; // 3-frame continuous beam damage
            }
          } else {
            p.hitCooldowns[targetKey] = 0;
          }
        }
      });

      return;
    }

    // ==========================================================
    // 🔥 ITACHI SPECIAL FLAMES (Hell Attack, Fire Style & Fireball - Sabhi Dushmano ko Lage):
    // ==========================================================
    if (p.isItachiFireStyle || p.isItachiHellAttack || p.isItachiFire) {
      p.hitCooldowns = p.hitCooldowns || {};
      let ownerFighter = activeFighterMap[p.ownerId];
      let ownerTeam = ownerFighter ? ownerFighter.team : "enemy";

      // 🎯 Saamne wali Dushman team ke sabhi khiladiyon ko scan karo:
      activeMatchFighters.forEach((target) => {
        if (
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== ownerTeam &&
          target.state !== "death"
        ) {
          p.hitCooldowns[target.id] = (p.hitCooldowns[target.id] || 0) - 1;

          let hurtbox = target.getHurtbox();
          if (hurtbox && isColliding(projHitbox, hurtbox)) {
            if (p.hitCooldowns[target.id] <= 0) {
              // 💥 Attack ke hisaab se damage & knockback:
              let dmg = p.isItachiFireStyle
                ? 1
                : p.isItachiHellAttack
                ? 0.5
                : p.damage || 7;
              let kb = p.isItachiFire
                ? "smashPunch"
                : p.isItachiFireStyle
                ? "punch"
                : null;

              let cool = p.isItachiFire ? 6 : 3; // Flame cooldown

              target.takeHit(dmg, p.x, p.ownerId);
              target.applyKnockback(kb, p.scaleX);
              updateHealthBars();
              p.hitCooldowns[target.id] = cool;
            }
          } else {
            p.hitCooldowns[target.id] = 0;
          }
        }
      });

      return; // 🎯 Aag poori screen par chalti rahegi aur sabko jala degi!
    }
    // 😈 SUKUNA SHRINE: Asli 2 Damage, 3 Cooldown (Universal 8v8)
    if (p.isSukunaShrine) {
      p.hitCooldowns = p.hitCooldowns || {};
      let ownerFighter = activeFighterMap[p.ownerId];
      let ownerTeam = ownerFighter ? ownerFighter.team : "enemy";

      activeMatchFighters.forEach((target) => {
        if (
          target.activeInBattle &&
          target.health > 0 &&
          target.team !== ownerTeam &&
          target.state !== "death"
        ) {
          p.hitCooldowns[target.id] = (p.hitCooldowns[target.id] || 0) - 1;
          let targetHurt = target.getHurtbox();
          if (targetHurt && isColliding(projHitbox, targetHurt)) {
            if (p.hitCooldowns[target.id] <= 0) {
              target.takeHit(2, p.x, p.ownerId); // 💥 Asli 2 Damage
              updateHealthBars();
              p.hitCooldowns[target.id] = 3; // ⚡ Asli 3 Cooldown
            }
          } else {
            p.hitCooldowns[target.id] = 0;
          }
        }
      });
      return;
    }
    // Agar goli ka hitbox hi nahi hai toh check mat karo!
    /*if (p.isSukunaShrine) {
      let hitPlayer1 = isColliding(projHitbox, p1Hurtbox);
      let hitTeammate = isColliding(projHitbox, tHurtbox);
      let hitTeammate2 = isColliding(projHitbox, t2Hurtbox);
      let hitTeammate3 = isColliding(projHitbox, t3Hurtbox);
      let hitEnemy = isColliding(projHitbox, p2Hurtbox); // Goku Black
      let hitEnemy2 = isColliding(projHitbox, fHurtbox);
      // Frieza
      let hitSasuke = sasuke
        ? isColliding(projHitbox, sasuke.getHurtbox())
        : false;
      // 1. Deku ko damage
      if (hitPlayer1 && player1.state !== "death") {
        p.hitCooldownP1 = (p.hitCooldownP1 || 0) - 1;
        if (p.hitCooldownP1 <= 0) {
          player1.takeHit(2, p.x, p.ownerId);
          updateHealthBars();
          p.hitCooldownP1 = 3;
        }
      } else {
        p.hitCooldownP1 = 0;
      }
      // ⚡ Sasuke ko Sukuna Shrine se Continuous 2 Damage

      if (hitSasuke && sasuke.state !== "death") {
        p.hitCooldownSasuke = (p.hitCooldownSasuke || 0) - 1;
        if (p.hitCooldownSasuke <= 0) {
          sasuke.takeHit(2, p.x, p.ownerId);
          updateHealthBars();
          p.hitCooldownSasuke = 3;
        }
      } else {
        p.hitCooldownSasuke = 0;
      }
      if (hitTeammate && teammate.state !== "death") {
        p.hitCooldownT = (p.hitCooldownT || 0) - 1;
        if (p.hitCooldownT <= 0) {
          teammate.takeHit(2, p.x, p.ownerId);
          updateHealthBars();
          p.hitCooldownT = 3;
        }
      } else {
        p.hitCooldownT = 0;
      }

      // 3. Jiren ko damage
      if (hitTeammate2 && teammate2.state !== "death") {
        p.hitCooldownT2 = (p.hitCooldownT2 || 0) - 1;
        if (p.hitCooldownT2 <= 0) {
          teammate2.takeHit(2, p.x, p.ownerId);
          updateHealthBars();
          p.hitCooldownT2 = 3;
        }
      } else {
        p.hitCooldownT2 = 0;
      }
      // 5. Goku Black ko Shrine se Continuous 2 Damage:
      if (hitEnemy && enemy.state !== "death") {
        p.hitCooldownE = (p.hitCooldownE || 0) - 1;
        if (p.hitCooldownE <= 0) {
          enemy.takeHit(2, p.x, p.ownerId);
          updateHealthBars();
          p.hitCooldownE = 3;
        }
      } else {
        p.hitCooldownE = 0;
      }

      // 6. Frieza ko Shrine se Continuous 2 Damage:
      if (hitEnemy2 && enemy2.state !== "death") {
        p.hitCooldownE2 = (p.hitCooldownE2 || 0) - 1;
        if (p.hitCooldownE2 <= 0) {
          enemy2.takeHit(2, p.x, p.ownerId);
          updateHealthBars();
          p.hitCooldownE2 = 3;
        }
      } else {
        p.hitCooldownE2 = 0;
      }

      if (hitTeammate3 && teammate3.state !== "death") {
        p.hitCooldownT3 = (p.hitCooldownT3 || 0) - 1;
        if (p.hitCooldownT3 <= 0) {
          teammate3.takeHit(2, p.x, p.ownerId);
          updateHealthBars();
          p.hitCooldownT3 = 3;
        }
      } else {
        p.hitCooldownT3 = 0;
      }
      return; // ✅ House destroy nahi hoga, continuous chalega
    }*/
    // ==========================================================
    // 🎯 UNIVERSAL KI-BLAST SYSTEM (Sabhi Fighters & New Players ke liye)
    // ==========================================================
    let isSpecialBeam =
      p.isSSBKamehameha ||
      p.isSSBHellBeam ||
      p.isSukunaBlast ||
      p.isItachiFireStyle ||
      p.isItachiHellAttack ||
      p.isItachiFire ||
      p.isDiagonal ||
      p.isBigKamehameha ||
      p.isFriezaKamehameha ||
      p.isFriezaHell ||
      p.isHellBullet ||
      p.isSukunaShrine ||
      p.isJirenMedium ||
      p.isJirenHellExplosion || // 👈 YAHAN ADD KIYA
      p.isJirenHellBullet ||
      p.isFriezaCrossExplosion ||
      p.isItachiMedium ||
      p.isSasukeMedium ||
      p.isSasukeHell;

    if (!isSpecialBeam) {
      let ownerFighter = activeFighterMap[p.ownerId];
      let ownerTeam = ownerFighter ? ownerFighter.team : "p1";

      // Saamne wali Dushman team ke kisi bhi zinda fighter se takraye:
      let hitTarget = activeMatchFighters.find(
        (target) =>
          target.activeInBattle &&
          target.health > 0 &&
          target.id !== p.ownerId &&
          target.team !== ownerTeam &&
          target.state !== "death" &&
          isColliding(projHitbox, target.getHurtbox())
      );

      if (hitTarget) {
        hitTarget.takeHit(p.damage, p.x, p.ownerId);
        hitTarget.applyKnockback("kiBlast", p.scaleX);
        updateHealthBars();
        p.destroy(); // Normal goli lagte hi gayab
        return;
      }
    }

    // 1. PLAYER & TEAMMATE KI GOLI (Deku/SSB ki goli Goku Black ko lage)
    /* if (
      (p.ownerId === "player" ||
        p.ownerId === "teammate" ||
        p.ownerId === "teammate2" ||
        p.ownerId === "teammate3") &&
      isColliding(projHitbox, p2Hurtbox)
    ) {*/
    // 1. PLAYER & TEAMMATE KI GOLI (Sirf tab chalega jab goli P1 team ki ho):
    if (
      (p.ownerTeam === "p1" || (!p.ownerTeam && p.ownerId === "player")) &&
      isColliding(projHitbox, p2Hurtbox)
    ) {
      // 🔥 NAYA: Agar SSB ka Giant Kamehameha hai toh continuous damage do
      /*if (p.isSSBKamehameha) {
        p.hitCooldownE = (p.hitCooldownE || 0) - 1;
        if (p.hitCooldownE <= 0 && enemy.state !== "death") {
          enemy.takeHit(2, p.x, p.ownerId); // 2 Damage har hit par!
          enemy.applyKnockback("smashPunch", p.scaleX); // Tagda slide dhakk
          updateHealthBars();
          p.hitCooldownE = 3; // Cool-down timer
        }*/
      if (p.isSSBKamehameha) {
        p.hitCooldowns = p.hitCooldowns || {};
        let ssbOwner =
          p.owner ||
          activeMatchFighters.find(
            (f) => f._uniqueId === p.ownerId || f.id === p.ownerId
          ) ||
          activeFighterMap[p.ownerId];
        let ssbTeam = ssbOwner ? ssbOwner.team : "p1";

        activeMatchFighters.forEach((target) => {
          if (
            target.activeInBattle &&
            target.health > 0 &&
            target.team !== ssbTeam && // 👈 Target hamesha saamne wali dushman team hogi
            target !== ssbOwner && // 👈 Khud ko weapon se hit nahi lagega
            target.state !== "death"
          ) {
            p.hitCooldowns[target.id] = (p.hitCooldowns[target.id] || 0) - 1;
            let hurtbox = target.getHurtbox();

            if (hurtbox && isColliding(projHitbox, hurtbox)) {
              if (p.hitCooldowns[target.id] <= 0) {
                target.takeHit(2, p.x, p.ownerId);
                target.applyKnockback("smashPunch", p.scaleX, null, ssbOwner); // 🚀 SARE CLONE GOKU SSB KA ASLI DHAKKA!
                updateHealthBars();
                p.hitCooldowns[target.id] = 3;
              }
            } else {
              p.hitCooldowns[target.id] = 0;
            }
          }
        });
        return;
      } else if (p.isItachiFireStyle) {
        p.hitCooldownE = (p.hitCooldownE || 0) - 1;
        if (p.hitCooldownE <= 0 && enemy.state !== "death") {
          enemy.takeHit(1, p.x, p.ownerId); // 1 Damage continuous
          enemy.applyKnockback("punch", p.scaleX);
          updateHealthBars();
          p.hitCooldownE = 3; // Har 4 tick par hit lagega
        }
      } else if (p.isItachiHellAttack) {
        p.hitCooldownE = (p.hitCooldownE || 0) - 1;
        if (p.hitCooldownE <= 0 && enemy.state !== "death") {
          enemy.takeHit(0.5, p.x, p.ownerId);
          enemy.applyKnockback("punch", p.scaleX);
          updateHealthBars();
          p.hitCooldownE = 3;
        }
      } else if (p.isItachiFire) {
        // 🔥 ITACHI FIREBALL DAMAGE (GOKU BLACK)
        p.hitCooldownE = (p.hitCooldownE || 0) - 1;
        if (p.hitCooldownE <= 0 && enemy.state !== "death") {
          enemy.takeHit(p.damage, p.x, p.ownerId);
          enemy.applyKnockback("smashPunch", p.scaleX); // Tagda dhakka!
          updateHealthBars();
          p.hitCooldownE = 6;
        }
      } else if (enemy.state !== "death") {
        enemy.takeHit(p.damage, p.x, p.ownerId);
        enemy.applyKnockback("kiBlast", p.scaleX);
        updateHealthBars();
        p.destroy();
      }
    }
    if (
      (p.ownerId === "player" ||
        p.ownerId === "teammate" ||
        p.ownerId === "teammate2" ||
        p.ownerId === "teammate3") &&
      isColliding(projHitbox, fHurtbox)
    ) {
      if (p.isSSBKamehameha) {
        p.hitCooldownF = (p.hitCooldownF || 0) - 1;
        if (p.hitCooldownF <= 0 && enemy2.state !== "death") {
          enemy2.takeHit(2, p.x, p.ownerId);
          enemy2.applyKnockback("smashPunch", p.scaleX);
          updateHealthBars();
          p.hitCooldownF = 3; // FULL SPEED
        }
      } else if (p.isItachiFireStyle) {
        p.hitCooldownF = (p.hitCooldownF || 0) - 1;
        if (p.hitCooldownF <= 0 && enemy2.state !== "death") {
          enemy2.takeHit(1, p.x, p.ownerId);
          enemy2.applyKnockback("punch", p.scaleX);
          updateHealthBars();
          p.hitCooldownF = 3;
        }
      } else if (p.isItachiHellAttack) {
        p.hitCooldownF = (p.hitCooldownF || 0) - 1;
        if (p.hitCooldownF <= 0 && enemy2.state !== "death") {
          enemy2.takeHit(0.5, p.x, p.ownerId);
          enemy2.applyKnockback("punch", p.scaleX);
          updateHealthBars();
          p.hitCooldownF = 3;
        }
      } else if (p.isItachiFire) {
        // 🔥 ITACHI FIREBALL DAMAGE (FRIEZA)
        p.hitCooldownF = (p.hitCooldownF || 0) - 1;
        if (p.hitCooldownF <= 0 && enemy2.state !== "death") {
          enemy2.takeHit(p.damage, p.x, p.ownerId);
          enemy2.applyKnockback("smashPunch", p.scaleX);
          updateHealthBars();
          p.hitCooldownF = 6;
        }
      } else if (enemy2.state !== "death") {
        enemy2.takeHit(p.damage, p.x, p.ownerId);
        enemy2.applyKnockback("kiBlast", p.scaleX);
        updateHealthBars();
        p.destroy();
      }
    }
    if (
      (p.ownerId === "player" ||
        p.ownerId === "teammate" ||
        p.ownerId === "teammate2" ||
        p.ownerId === "teammate3") &&
      isColliding(projHitbox, sHurtbox) // 👈 NAYA: Sukuna ka Hurtbox
    ) {
      if (p.isSSBKamehameha) {
        p.hitCooldownS = (p.hitCooldownS || 0) - 1;
        if (p.hitCooldownS <= 0 && enemy3.state !== "death") {
          enemy3.takeHit(2, p.x, p.ownerId);
          enemy3.applyKnockback("smashPunch", p.scaleX);
          updateHealthBars();
          p.hitCooldownS = 3;
        }
      } else if (p.isItachiFireStyle) {
        p.hitCooldownS = (p.hitCooldownS || 0) - 1;
        if (p.hitCooldownS <= 0 && enemy3.state !== "death") {
          enemy3.takeHit(1, p.x, p.ownerId);
          enemy3.applyKnockback("punch", p.scaleX);
          updateHealthBars();
          p.hitCooldownS = 3;
        }
      } else if (p.isItachiHellAttack) {
        p.hitCooldownS = (p.hitCooldownS || 0) - 1;
        if (p.hitCooldownS <= 0 && enemy3.state !== "death") {
          enemy3.takeHit(0.5, p.x, p.ownerId);
          enemy3.applyKnockback("punch", p.scaleX);
          updateHealthBars();
          p.hitCooldownS = 3;
        }
      } else if (p.isItachiFire) {
        // 🔥 ITACHI FIREBALL DAMAGE (SUKUNA)
        p.hitCooldownS = (p.hitCooldownS || 0) - 1;
        if (p.hitCooldownS <= 0 && enemy3.state !== "death") {
          enemy3.takeHit(p.damage, p.x, p.ownerId);
          enemy3.applyKnockback("smashPunch", p.scaleX);
          updateHealthBars();
          p.hitCooldownS = 6;
        }
      } else if (enemy3.state !== "death") {
        enemy3.takeHit(p.damage, p.x, p.ownerId);
        enemy3.applyKnockback("kiBlast", p.scaleX);
        updateHealthBars();
        p.destroy();
      }
    }

    // 2. ENEMY KI GOLI (Goku Black ki goli Deku YA Goku SSB ko lage)
    if (
      p.ownerTeam === "enemy" ||
      (!p.ownerTeam && (p.ownerId === "enemy" || p.ownerId === "enemy2"))
    ) {
      let hitPlayer1 = isColliding(projHitbox, p1Hurtbox);

      // if (p.ownerId === "enemy" || p.ownerId === "enemy2") {
      // let hitPlayer1 = isColliding(projHitbox, p1Hurtbox);
      let hitTeammate = isColliding(projHitbox, tHurtbox);
      let hitTeammate2 = isColliding(projHitbox, t2Hurtbox);
      let hitTeammate3 = isColliding(projHitbox, t3Hurtbox);
      let hitSasukeF = sasuke
        ? isColliding(projHitbox, sasuke.getHurtbox())
        : false;
      // 🔥 NAYA JADOO: Jiren ko goli lagegi!
      // 🔥 FIX: Diagonal Beam (Extra Attack) dono ko alag-alag damage degi
      if (p.isDiagonal || p.isBigKamehameha || p.isFriezaKamehameha) {
        let dmg = p.isBigKamehameha ? 2 : 1;
        if (hitPlayer1 && player1.state !== "death") {
          p.hitCooldownP1 = (p.hitCooldownP1 || 0) - 1;
          if (p.hitCooldownP1 <= 0) {
            player1.takeHit(dmg, p.x, p.ownerId);

            updateHealthBars();
            p.hitCooldownP1 = 3;
          }
        }
        if (hitTeammate && teammate.state !== "death") {
          p.hitCooldownT = (p.hitCooldownT || 0) - 1;
          if (p.hitCooldownT <= 0) {
            teammate.takeHit(dmg, p.x, p.ownerId);
            updateHealthBars();
            p.hitCooldownT = 3;
          }
        }
        if (hitSasukeF && sasuke.state !== "death") {
          p.hitCooldownSasuke = (p.hitCooldownSasuke || 0) - 1;
          if (p.hitCooldownSasuke <= 0) {
            sasuke.takeHit(p.damage, p.x, p.ownerId);
            updateHealthBars();
            p.hitCooldownSasuke = 3;
          }
        }

        if (hitTeammate2 && teammate2.state !== "death") {
          // 🔥 JIREN KO BADA DAMAGE!
          p.hitCooldownT2 = (p.hitCooldownT2 || 0) - 1;
          if (p.hitCooldownT2 <= 0) {
            teammate2.takeHit(dmg, p.x, p.ownerId);
            updateHealthBars();
            p.hitCooldownT2 = 3;
          }
        }
        if (hitTeammate3 && teammate3.state !== "death") {
          // 🔥 JIREN KO BADA DAMAGE!
          p.hitCooldownT3 = (p.hitCooldownT3 || 0) - 1;
          if (p.hitCooldownT3 <= 0) {
            teammate3.takeHit(dmg, p.x, p.ownerId);
            updateHealthBars();
            p.hitCooldownT3 = 3;
          }
        }
      } else if (p.isFriezaHell) {
        if (hitPlayer1 && player1.state !== "death") {
          p.hitCooldownP1 = (p.hitCooldownP1 || 0) - 1;
          if (p.hitCooldownP1 <= 0) {
            player1.takeHit(p.damage, p.x, p.ownerId);
            player1.applyKnockback("smashPunch", p.scaleX); // Tagda dhakka
            updateHealthBars();
            p.hitCooldownP1 = 10; // 15 tick tak dubara damage nahi degi
          }
        }
        if (hitTeammate && teammate.state !== "death") {
          p.hitCooldownT = (p.hitCooldownT || 0) - 1;
          if (p.hitCooldownT <= 0) {
            teammate.takeHit(p.damage, p.x, p.ownerId);
            teammate.applyKnockback("smashPunch", p.scaleX);
            updateHealthBars();
            p.hitCooldownT = 10;
          }
        }
        // Jiren ko Hit
        if (hitTeammate2 && teammate2.state !== "death") {
          p.hitCooldownT2 = (p.hitCooldownT2 || 0) - 1;
          if (p.hitCooldownT2 <= 0) {
            teammate2.takeHit(p.damage, p.x, p.ownerId);
            teammate2.applyKnockback("smashPunch", p.scaleX);
            updateHealthBars();
            p.hitCooldownT2 = 10;
          }
        }
        // Jiren ko Hit
        if (hitTeammate3 && teammate3.state !== "death") {
          p.hitCooldownT3 = (p.hitCooldownT3 || 0) - 1;
          if (p.hitCooldownT3 <= 0) {
            teammate3.takeHit(p.damage, p.x, p.ownerId);
            teammate3.applyKnockback("smashPunch", p.scaleX);
            updateHealthBars();
            p.hitCooldownT3 = 10;
          }
        }
      }
      // 🔥 Normal Goli - Jo pehle saamne aaya usko lagegi
      else if (hitPlayer1 || hitTeammate || hitTeammate2 || hitTeammate3) {
        let target = hitPlayer1
          ? player1
          : hitTeammate
          ? teammate
          : hitTeammate2
          ? teammate2
          : teammate3;
        if (target.state !== "death") {
          target.takeHit(p.damage, p.x, p.ownerId);
          target.applyKnockback("kiBlast", p.scaleX);
          updateHealthBars();
          p.destroy();
        }
      }
    }
  }); // 👈 YE WALA BRACKET ZAROORI THA LOOP BAND KARNE KE LIYE!

  // C. KAMEHAMEHA BEAM COLLISION (Continuous Hit)
  /*
  if (enemy.state === "kamehameha" && enemy.frameIndex === 6) {
    let beamHitbox = enemy.getHitbox();

    if (beamHitbox) {
      // Player 1 (Deku) ko damage
      if (isColliding(beamHitbox, p1Hurtbox) && player1.state !== "death") {
        enemy.beamHitCooldownP1 = (enemy.beamHitCooldownP1 || 0) - 1;
        if (enemy.beamHitCooldownP1 <= 0) {
          player1.takeHit(1, enemy.x, "enemy");
          updateHealthBars();
          enemy.beamHitCooldownP1 = 3;
        }
      }

      // Teammate (Goku SSB) ko damage
      if (isColliding(beamHitbox, tHurtbox) && teammate.state !== "death") {
        enemy.beamHitCooldownT = (enemy.beamHitCooldownT || 0) - 1;
        if (enemy.beamHitCooldownT <= 0) {
          teammate.takeHit(1, enemy.x, "enemy");
          updateHealthBars();
          enemy.beamHitCooldownT = 3;
        }
      }
      if (isColliding(beamHitbox, t2Hurtbox) && teammate2.state !== "death") {
        enemy.beamHitCooldownT2 = (enemy.beamHitCooldownT2 || 0) - 1;
        if (enemy.beamHitCooldownT2 <= 0) {
          teammate2.takeHit(1, enemy.x, "enemy");
          updateHealthBars();
          enemy.beamHitCooldownT2 = 3;
        }
      }
      if (isColliding(beamHitbox, t3Hurtbox) && teammate3.state !== "death") {
        enemy.beamHitCooldownT3 = (enemy.beamHitCooldownT3 || 0) - 1;
        if (enemy.beamHitCooldownT3 <= 0) {
          teammate3.takeHit(1, enemy.x, "enemy");
          updateHealthBars();
          enemy.beamHitCooldownT3 = 3;
        }
      }
    }
  }

  if (teammate.state === "kamehameha" && teammate.frameIndex === 6) {
    let beamHitbox = teammate.getHitbox();
    if (beamHitbox) {
      // Enemy (Goku Black) ko damage
      if (isColliding(beamHitbox, p2Hurtbox) && enemy.state !== "death") {
        teammate.beamHitCooldownE = (teammate.beamHitCooldownE || 0) - 1;
        if (teammate.beamHitCooldownE <= 0) {
          enemy.takeHit(1, teammate.x, "teammate");
          updateHealthBars();
          teammate.beamHitCooldownE = 3;
        }
      }
      // Enemy 2 (Frieza) ko damage
      if (isColliding(beamHitbox, fHurtbox) && enemy2.state !== "death") {
        teammate.beamHitCooldownE2 = (teammate.beamHitCooldownE2 || 0) - 1;
        if (teammate.beamHitCooldownE2 <= 0) {
          enemy2.takeHit(1, teammate.x, "teammate");
          updateHealthBars();
          teammate.beamHitCooldownE2 = 3;
        }
      }

      if (isColliding(beamHitbox, fHurtbox) && enemy2.state !== "death") {
        teammate.beamHitCooldownE2 = (teammate.beamHitCooldownE2 || 0) - 1;
        if (teammate.beamHitCooldownE2 <= 0) {
          enemy2.takeHit(1, teammate.x, "teammate");
          updateHealthBars();
          teammate.beamHitCooldownE2 = 3;
        }
      }

      if (isColliding(beamHitbox, sHurtbox) && enemy3.state !== "death") {
        teammate.beamHitCooldownE3 = (teammate.beamHitCooldownE3 || 0) - 1;
        if (teammate.beamHitCooldownE3 <= 0) {
          enemy3.takeHit(1, teammate.x, "teammate");
          updateHealthBars();
          teammate.beamHitCooldownE3 = 3;
        }
      }
    }
  }*/
  // 🌊 UNIVERSAL KAMEHAMEHA BEAMS (Goku SSB, Goku Black, Frieza - Asli 1 Damage, 3 Cooldown)
  activeMatchFighters.forEach((caster) => {
    if (
      caster.activeInBattle &&
      caster.health > 0 &&
      caster.state === "kamehameha" &&
      caster.frameIndex === 6 &&
      caster.imageUrl &&
      caster.imageUrl.includes("gokublack")
      //  caster.imageUrl.includes("gokussb")
    ) {
      let beamHitbox = caster.getHitbox();
      if (!beamHitbox) return;

      caster.beamCooldowns = caster.beamCooldowns || {};

      activeMatchFighters.forEach((victim) => {
        if (
          victim.activeInBattle &&
          victim.health > 0 &&
          //  victim.team !== caster.team &&
          victim.state !== "death" &&
          victim !== caster && // 👈 Khud ko kabhi damage nahi lagega
          victim.team !== caster.team
        ) {
          caster.beamCooldowns[victim.id] =
            (caster.beamCooldowns[victim.id] || 0) - 1;
          let hurtbox = victim.getHurtbox();
          if (hurtbox && isColliding(beamHitbox, hurtbox)) {
            //  let vHurt = victim.getHurtbox();

            //  if (vHurt && isColliding(beamHitbox, vHurt)) {
            if (caster.beamCooldowns[victim.id] <= 0) {
              //  victim.takeHit(1, caster.x, caster.id);
              victim.takeHit(1, caster.x, caster);
              victim.applyKnockback("smashPunch", caster.scaleX, null, caster); // 👈 Sabhi dushmano ko barabar dhakka

              // 💥 Asli 1 Damage
              updateHealthBars();
              caster.beamCooldowns[victim.id] = 3; // ⚡ Asli 3 Cooldown
            }
          } else {
            caster.beamCooldowns[victim.id] = 0;
          }
        }
      });
    }
  });
}
// ==========================================
// ⚡ SASUKE AI BRAIN (100% ATTACK AGGRESSION & 0.1 BLOCK)
// ==========================================
function updateSasukeAI() {
  if (!sasuke || sasuke.health <= 0) return;
  if (sasuke.isControlledByPlayer) return; // Player khud khel raha ho toh AI rukega
  if (sasuke.state === "hit" || sasuke.state === "death") return;

  // 🎯 SMART RADAR: Dushman team ke sabse paas wale khiladi ko lock karo
  let target = getSmartTarget(sasuke);
  if (!target) {
    sasuke.moveLeft = false;
    sasuke.moveRight = false;
    if (!sasuke.isAttacking) sasuke.setState("idle");
    return;
  }

  let distanceX = target.x - sasuke.x;
  let absDist = Math.abs(distanceX);
  sasuke.scaleX = distanceX > 0 ? 1 : -1; // Hamesha dushman ko dekhega
  // ==========================================================
  // ⚡ SASUKE AI BRAIN: AUTO CHAKRA CHARGE LOGIC
  // ==========================================================
  let incomingBullet = projectiles.some(
    (p) => p.ownerId !== sasuke.id && p.active && Math.abs(p.x - sasuke.x) < 250
  );

  // 🛑 1. EMERGENCY STOP (Dushman 70px paas aaye, goli aaye, ya EP 600 full ho jaye):
  if (sasuke.state === "kiCharge") {
    if (absDist <= 70 || incomingBullet || sasuke.ep >= 800) {
      sasuke.isCharging = false;
      sasuke.isAttacking = false;
      sasuke.setState("idle");
    } else {
      return; // Safe hai toh chup-chaap charge karta rahega
    }
  }

  // ⚡ 2. AUTO START CHARGING (EP <= 100 ho aur dushman 120px se door ho):
  if (sasuke.ep <= 100 && absDist > 120 && !incomingBullet) {
    sasuke.kiCharge();
    return;
  }
  // 🔴 DASH ATTACK FOLLOW-UP: Dash khatam hote hi seedha attack
  // 🔴 LONG DASH LOGIC: Door se dushman ke paas tak bhagega, paas aate hi attack!
  if (sasuke.state === "dash" && sasuke.isEnemyDashing) {
    let maxRight = WORLD_WIDTH - sasuke.element.offsetWidth - 20;
    let hitWall =
      (sasuke.moveLeft && sasuke.x <= 25) ||
      (sasuke.moveRight && sasuke.x >= maxRight - 5);

    // ✅ FIX: Jab dushman ke paas pahunche (<= 70px) ya Deewar se takraye, tabhi attack karega!
    if (absDist <= 60 || hitWall) {
      sasuke.isEnemyDashing = false;
      sasuke.moveLeft = false;
      sasuke.moveRight = false;
      sasuke.scaleX = target.x > sasuke.x ? 1 : -1;

      let rDash = Math.random();
      if (rDash < 0.4) sasuke.smashPunch();
      else if (rDash < 0.7) sasuke.hellPunch();
      else sasuke.kiBlast();
      return;
    }
    return; // Jab tak paas na pahuche, tab tak tezi se dash karta rahega!
  }

  // 🛡️ BLOCK CHECK: Sirf 0.1 (10% Rare Block), baaki 90% time sidha attack!
  let closeThreat =
    target.isAttacking && target.state !== "block" && absDist < 100;
  if (incomingBullet || closeThreat) {
    if (!sasuke.isBlocking && Math.random() < 0.1) {
      // 0.1 Block
      sasuke.block();
      return;
    }
  } else if (sasuke.state === "block") {
    sasuke.isBlocking = false;
    sasuke.isAttacking = false;
    sasuke.setState("idle");
  }
  if ((target.state === "block" || target.isBlocking) && absDist < 150) {
    if (!sasuke.isAttacking && Math.random() < 0.4) {
      sasuke.hellAttack(); // 🔥 Dushman guard kare toh seedha Hell Attack!
      return;
    }
  }

  if (sasuke.isAttacking) return;

  // ==========================================================
  // ⚔️ 100% ATTACK COMBAT SYSTEM (RANGES)
  // ==========================================================

  // 1. 🚀 LONG RANGE (> 200px): Teleport / Dashing True / Ki Blast / Jump
  if (absDist > 200) {
    let rLong = Math.random();
    if (rLong < 0.35) {
      sasuke.instantTransmission(target); // ⚡ Z-Vanish Peeth par!
      return;
    } else if (rLong < 0.65) {
      sasuke.isEnemyDashing = true;
      sasuke.dash(); // 🏃 Long anime dash
      return;
    } else if (rLong < 0.85) {
      sasuke.kiBlast(); // 💥 Ki Blast goli
      return;
    } else {
      sasuke.jump(); // 🦘 Jump
      return;
    }
  }

  // 2. 🏃 MID RANGE (60px - 200px): Hell Punch / Smash Punch / Ki Blast / Dash / Jump
  else if (absDist > 60) {
    sasuke.moveRight = distanceX > 0;
    sasuke.moveLeft = distanceX < 0;

    let rMid = Math.random();
    if (rMid < 0.25) {
      sasuke.hellPunch(); // 👊 Hell Punch (Long Reach)
    } else if (rMid < 0.4) {
      sasuke.smashPunch(); // 💥 Smash Punch
    } else if (rMid < 0.5) {
      sasuke.hellAttack();
    } else if (rMid < 0.6) {
      sasuke.mediumAttack();
    } else if (rMid < 0.7) {
      sasuke.kiBlast(); // 💥 Ki Blast
    } else if (rMid < 0.85) {
      sasuke.isEnemyDashing = true;
      sasuke.dash(); // ⚡ Dash
    } else {
      sasuke.jump(); // 🦘 Jump
    }
    return;
  }

  // 3. 🥊 CLOSE RANGE (< 60px): 100% DEADLY COMBOS!
  else {
    sasuke.moveLeft = false;
    sasuke.moveRight = false;

    let rClose = Math.random();
    if (rClose < 0.12) sasuke.punch();
    else if (rClose < 0.24) sasuke.kick();
    else if (rClose < 0.36) sasuke.smashPunch();
    else if (rClose < 0.42) sasuke.smashKick();
    else if (rClose < 0.49) sasuke.mediumAttack();
    else if (rClose < 0.55) sasuke.hellAttack();
    else if (rClose < 0.6) sasuke.hellPunch();
    else if (rClose < 0.72) sasuke.hellKick();
    else if (rClose < 0.84) sasuke.kiBlast();
    else if (rClose < 0.92) sasuke.instantTransmission(target);
    else if (rClose < 0.96) sasuke.jump();
    else {
      // Close range reposition dash
      sasuke.isEnemyDashing = true;
      sasuke.dash();
    }
  }
}
// ==========================================
// 🔥 ITACHI AI LOGIC (98% Aggressive & Sukuna Movement) 🔥
// ==========================================
function updateItachiAI() {
  if (!teammate3 || teammate3.health <= 0) return;
  if (teammate3.isControlledByPlayer) return;
  if (teammate3.state === "hit" || teammate3.state === "death") return;
  /*
// 🎯 TARGET RADAR: Goku Black, Frieza, Sukuna (Jo paas ho)
let distE1 = enemy.health > 0 ? Math.abs(enemy.x - teammate3.x) : Infinity;
let distE2 = enemy2.health > 0 ? Math.abs(enemy2.x - teammate3.x) : Infinity;
let distE3 = enemy3.health > 0 ? Math.abs(enemy3.x - teammate3.x) : Infinity;
let closestDist = Math.min(distE1, distE2, distE3);

let target = null;
if (closestDist !== Infinity) {
if (closestDist === distE1) target = enemy;
else if (closestDist === distE2) target = enemy2;
else if (closestDist === distE3) target = enemy3;
}

if (!target) return; // Agar sab dushman mar gaye toh shant khada rahega
*/

  // 🎯 THE MASTER JADOO: Har 30 Ticks (0.5 sec) mein apna nishana badlo! (Bina kisi extra timer ke)
  if (
    window.gameTick % 6 === 0 ||
    !enemy3.currentTarget ||
    enemy3.currentTarget.health <= 0 ||
    enemy3.currentTarget.team === enemy3.team
  ) {
    let livingEnemies = activeMatchFighters.filter(
      (f) => f.activeInBattle && f.health > 0 && f.team !== enemy3.team
    );
    if (livingEnemies.length > 0) {
      // Saamne wali team ke kisi bhi dushman par achanak nishana ghoomega!
      let randIndex = Math.floor(Math.random() * livingEnemies.length);
      enemy3.currentTarget = livingEnemies[randIndex];
    }
  }

  let target = getSmartTarget(teammate3);
  if (!target) return; // Agar koi dushman zinda nahi, toh ruko

  let distanceX = target.x - teammate3.x;
  let absDist = Math.abs(distanceX);
  teammate3.scaleX = distanceX > 0 ? 1 : -1; // Target ki aankhon mein dekhega
  // 🎯 Goli ka Khatra Scan Karo (Universal Check):
  let incomingBullet = projectiles.some(
    (p) =>
      p.ownerId !== teammate3.id &&
      p.active &&
      Math.abs(p.x - teammate3.x) < 250
  );

  // 🔴 1. EMERGENCY STOP (Agar dushman 30px ke andar aaye YA Goli aaye YA EP Full ho jaye)
  if (teammate3.state === "kiCharge") {
    if (absDist <= 30 || incomingBullet || teammate3.ep >= 800) {
      teammate3.isCharging = false;
      teammate3.isAttacking = false;
      teammate3.setState("idle");
    } else {
      return; // Safe hai toh chup-chaap charge karta rahega!
    }
  }

  // 🔵 2. START CHARGING (EP <= 100 ho aur dushman 30px se door ho aur koi goli na ho)
  if (teammate3.ep <= 100 && absDist > 30 && !incomingBullet) {
    teammate3.kiCharge();
    return;
  }
  // 🔴 LONG DASH LOGIC (Dash khatam hote hi seedha khatarnak attack!)
  if (teammate3.state === "dash" && teammate3.isEnemyDashing) {
    if (absDist > 60) {
      teammate3.isEnemyDashing = false;
      teammate3.moveLeft = false;
      teammate3.moveRight = false;

      // Paas aate hi Hell Punch ya Smash attack!
      let randAtk = Math.random();
      if (randAtk < 0.3) {
        teammate3.fireBallAttack();
      } else if (randAtk < 0.5) {
        teammate3.hellPunch();
      } else if (randAtk < 0.7) {
        teammate3.smashPunch();
      } else {
        teammate3.hellKick();
      }
    }
    return;
  }

  // 🛑 BLOCK LOGIC (Zinda rehne ke liye)

  if (incomingBullet) {
    if (!teammate3.isBlocking && Math.random() < 0.9) {
      teammate3.block();
      return;
    }
  } else if (teammate3.state === "block") {
    teammate3.isBlocking = false;
    teammate3.isAttacking = false;
    teammate3.setState("idle");
  }
  if (absDist > 150) {
    // 🎯 25% Chance Attack karne ka (Taki neeche ka code bhi chal sake!)
    if (Math.random() < 0.25) {
      let randAtk = Math.random();

      if (randAtk < 0.3) {
        teammate3.moveLeft = false;
        teammate3.moveRight = false;
        teammate3.hellAttack(); // 🔥 30% Hell Attack
        return;
      } else if (randAtk < 0.4) {
        teammate3.mediumAttack();
        return;
      } else if (randAtk < 0.5) {
        teammate3.moveLeft = false;
        teammate3.moveRight = false;
        teammate3.fireBallAttack(); // ☄️ 20% Fireball Attack
        return;
      } else if (randAtk < 0.6) {
        teammate3.smashPunch(); // 👊 10% Smash Punch
        return;
      } else if (randAtk < 0.75) {
        teammate3.jump(); // 🦵 Smash Kick
        return;
      } else if (randAtk < 0.9) {
        teammate3.hellKick(); // 💥 Hell Kick
        return;
      } else {
        teammate3.smashKick(); // 🦘 Jump
        return;
      }
    }
    // 🏃 Jab attack nahi hoga toh return NAHI hoga!
    // Seedha neeche ka Line 4490 wala code (Chalne, Dash, etc.) chalega!
  }

  // ===========================================
  // ⚔️ DISTANCE & ATTACK LOGIC
  // ===========================================
  if (absDist > 150) {
    // 🚀 DOOR HAI TOH LONG DASH YA INSTANT TRANSMISSION
    teammate3.moveRight = distanceX > 0;
    teammate3.moveLeft = distanceX < 0;

    let randMove = Math.random();
    if (randMove < 0.2) {
      teammate3.fireBallAttack();
    } else if (randMove < 0.35) {
      teammate3.mediumAttack();
    } else if (randMove < 0.5) {
      teammate3.kiBlast();
    } else if (randMove < 0.6) {
      teammate3.instantTransmission(target); // Z-Vanish paas jayega, agle frame me koot dega!
    } else if (randMove < 0.7) {
      teammate3.isEnemyDashing = true;
      teammate3.dash();
    } else {
      teammate3.jump();
    }
  } else if (absDist > 60) {
    // 🏃 MID RANGE: Chal ke paas aayega ya chhota dash
    teammate3.moveRight = distanceX > 0;
    teammate3.moveLeft = distanceX < 0;
    if (Math.random() < 0.6) {
      teammate3.instantTransmission(target);
    } else if (Math.random() < 0.3) {
      teammate3.isEnemyDashing = true;
      teammate3.dash();
    }
  } else {
    // 🔥 CLOSE RANGE: Muh ke paas aate hi 98% ATTACK RATE!
    teammate3.moveLeft = false;
    teammate3.moveRight = false;

    if (Math.random() < 0.98) {
      // 98% Aggression
      let rand = Math.random();
      if (rand < 0.05) teammate3.fireBallAttack();
      else if (rand < 0.1) teammate3.mediumAttack();
      else if (rand < 0.15) teammate3.punch();
      else if (rand < 0.25) teammate3.kick();
      else if (rand < 0.35) teammate3.smashPunch();
      else if (rand < 0.45) teammate3.smashKick();
      else if (rand < 0.55) teammate3.hellPunch();
      else if (rand < 0.65) teammate3.hellKick();
      else if (rand < 0.75) teammate3.kiBlast();
      else if (rand < 0.85) teammate3.jump();
      else if (rand < 0.95) {
        // Sukuna jaisa erratic movement (Close range pe dash)
        teammate3.isEnemyDashing = true;
        teammate3.dashTimer = 0;
        teammate3.dash();
      } else teammate3.instantTransmission(target);
    }
  }
}

// ==========================================
// 🔥 NAYA: SUKUNA AI LOGIC (King of Curses - Unpredictable Targeter)
// ==========================================
function updateSukunaAI() {
  if (!enemy3 || enemy3.health <= 0) return;
  if (enemy3.isControlledByPlayer) return;
  if (enemy3.state === "hit" || enemy3.state === "death") return;
  /*
// 🎯 THE MASTER JADOO: Har 30 Ticks (0.5 sec) mein apna nishana badlo! (Bina kisi extra timer ke)
if (window.gameTick % 10 === 0) {
let randTarget = Math.random();
// 33% Deku, 33% SSB, 33% Jiren (Door ho ya paas, koi fark nahi padta!)
if (randTarget < 0.33 && player1.health > 0) enemy3.currentTarget = player1;
else if (randTarget < 0.66 && teammate.health > 0) enemy3.currentTarget = teammate;
else if (teammate3.health > 76) enemy3.currentTarget = teammate3;
else if (teammate2.health > 0) enemy3.currentTarget = teammate2;
}

// 🛡️ SAFETY LOCK: Agar current target mar gaya ya set nahi hai, toh kisi zinda ko pakdo
if (!enemy3.currentTarget || enemy3.currentTarget.health <= 0) {
if (player1.health > 0) enemy3.currentTarget = player1;
else if (teammate.health > 0) enemy3.currentTarget = teammate;
else if (teammate2.health > 0) enemy3.currentTarget = teammate2;
}*/
  if (
    window.gameTick % 10 === 0 ||
    !enemy3.currentTarget ||
    enemy3.currentTarget.health <= 0 ||
    enemy3.currentTarget.team === enemy3.team
  ) {
    let livingEnemies = activeMatchFighters.filter(
      (f) => f.activeInBattle && f.health > 0 && f.team !== enemy3.team
    );
    if (livingEnemies.length > 0) {
      // Saamne wali team ke kisi bhi dushman par achanak nishana ghoomega!
      let randIndex = Math.floor(Math.random() * livingEnemies.length);
      enemy3.currentTarget = livingEnemies[randIndex];
    }
  }

  let target = enemy3.currentTarget;
  if (!target) return; // Agar sab hero mar gaye toh shant khada rahega

  let distanceX = target.x - enemy3.x;
  let absDist = Math.abs(distanceX);
  enemy3.scaleX = distanceX > 0 ? 1 : -1; // Target ki aankhon mein dekhega
  // 🎯 Goli ka Khatra Scan Karo (Universal Check):
  let incomingBullet = projectiles.some(
    (p) => p.ownerId !== enemy3.id && p.active && Math.abs(p.x - enemy3.x) < 250
  );

  // 🔴 1. EMERGENCY STOP (Agar dushman 30px ke andar aaye YA Goli aaye YA EP Full ho jaye)
  if (enemy3.state === "kiCharge") {
    if (absDist <= 30 || incomingBullet || enemy3.ep >= 800) {
      enemy3.isCharging = false;
      enemy3.isAttacking = false;
      enemy3.setState("idle");
    } else {
      return; // Safe hai toh chup-chaap charge karta rahega!
    }
  }

  // 🔵 2. START CHARGING (EP <= 100 ho aur dushman 30px se door ho aur koi goli na ho)
  if (enemy3.ep <= 100 && absDist > 30 && !incomingBullet) {
    enemy3.kiCharge();
    return;
  }
  // 🔴 LONG DASH LOGIC (Dash khatam hote hi seedha khatarnak attack!)
  if (enemy3.state === "dash" && enemy3.isEnemyDashing) {
    if (absDist > 60) {
      enemy3.isEnemyDashing = false;
      enemy3.moveLeft = false;
      enemy3.moveRight = false;

      // Paas aate hi random deadly strike!
      let randAtk = Math.random();
      if (randAtk < 0.25) enemy3.smashPunch();
      else if (randAtk < 0.35) enemy3.jump();
      else if (randAtk < 0.5) enemy3.hellPunch();
      else if (randAtk < 0.75) enemy3.smashKick();
      else enemy3.hellKick();
    }
    return;
  }

  // 🛑 BLOCK LOGIC (Zinda rehne ke li

  let closeThreat =
    target.isAttacking && target.state !== "block" && absDist < 120;

  if (incomingBullet || closeThreat) {
    let reactionRand = Math.random();

    // 70% Chance: Back Dash / Front Dash / Jump
    if (reactionRand < 0.7) {
      let dodgeChoice = Math.random();

      if (dodgeChoice < 0.35) {
        // 1. 🔙 BACK DASH (Peeche Dash)
        if (target.x > enemy3.x) {
          enemy3.moveLeft = true;
          enemy3.moveRight = false;
          enemy3.scaleX = -1;
        } else {
          enemy3.moveRight = true;
          enemy3.moveLeft = false;
          enemy3.scaleX = 1;
        }
        enemy3.isEnemyDashing = true;
        enemy3.dashTimer = 0;
        enemy3.dash();
      } else if (dodgeChoice < 0.7) {
        // 2. ⚡ FRONT DASH (Aage Counter Dash)
        if (target.x > enemy3.x) {
          enemy3.moveRight = true;
          enemy3.moveLeft = false;
          enemy3.scaleX = 1;
        } else {
          enemy3.moveLeft = true;
          enemy3.moveRight = false;
          enemy3.scaleX = -1;
        }
        enemy3.isEnemyDashing = true;
        enemy3.dashTimer = 0;
        enemy3.dash();
        return;
      } else {
        // 3. 🦘 JUMP (Goli / Attack ke upar se jump)
        enemy3.jump();
        return;
      }
    } else {
      // 30% Chance: 🛡️ BLOCK
      if (!enemy3.isBlocking) {
        enemy3.block();
        return;
      }
    }
  } else if (enemy3.state === "block") {
    enemy3.isBlocking = false;
    enemy3.isAttacking = false;
    enemy3.setState("idle");
  }

  if (enemy3.isAttacking) return;
  if (absDist > 660 && Math.random() < 0.8) {
    enemy3.hellAttack();
    return;
  }

  // Agar door hai toh goli chalaye:
  if (absDist > 300 && Math.random() < 0.1) {
    enemy3.kiBlast();
    return;
  }
  // ===========================================
  // ⚔️ DISTANCE & ATTACK LOGIC
  // ===========================================
  if (absDist > 150) {
    // 🚀 DOOR HAI TOH SIRF DASH MAREGA (Goli/Laser nahi chalayega)
    enemy3.moveRight = distanceX > 0;
    enemy3.moveLeft = distanceX < 0;
    let randMove = Math.random();
    if (randMove < 0.07) {
      enemy3.isEnemyDashing = true;
      enemy3.dash();
    } else if (randMove < 0.15) {
      // 🔥 NAYA: 7% Chance door se long jump marne ka!
      enemy3.jump();
    } else if (randMove < 0.1) {
      enemy3.kiBlast();
    }
  } else if (absDist > 60) {
    // 🏃 MID RANGE: Chal ke paas aayega ya chhota dash
    enemy3.moveRight = distanceX > 0;
    enemy3.moveLeft = distanceX < 0;
    if (Math.random() < 0.1) {
      enemy3.isEnemyDashing = true;
      enemy3.dash();
    }
  } else {
    // 🔥 CLOSE RANGE: Muh ke paas aate hi sirf Hand-to-Hand Combat!
    enemy3.moveLeft = false;
    enemy3.moveRight = false;

    if (Math.random() < 0.9) {
      let rand = Math.random();
      if (rand < 0.15) enemy3.punch();
      else if (rand < 0.3) enemy3.kick();
      else if (rand < 0.5) enemy3.smashPunch();
      else if (rand < 0.7) enemy3.smashKick();
      else if (rand < 0.85) enemy3.hellPunch();
      else if (rand < 0.95) enemy3.hellKick();
      else {
        if (target.x > enemy3.x) {
          enemy3.moveLeft = true;
          enemy3.moveRight = false;
          enemy3.scaleX = -1;
        } else {
          enemy3.moveRight = true;
          enemy3.moveLeft = false;
          enemy3.scaleX = 1;
        }
        enemy3.isEnemyDashing = true;
        enemy3.dashTimer = 0;
        enemy3.dash();
      }
    }
  }
}
// ==========================================
// 🔥 NAYA: FRIEZA AI LOGIC (Jiren Style Radar)
// ==========================================
function updateFriezaAI() {
  if (!enemy2 || enemy2.health <= 0) return;
  if (enemy2.isControlledByPlayer) return;
  if (enemy2.state === "hit" || enemy2.state === "death") return;
  if (
    window.gameTick % 6 === 0 ||
    !enemy3.currentTarget ||
    enemy3.currentTarget.health <= 0 ||
    enemy3.currentTarget.team === enemy3.team
  ) {
    let livingEnemies = activeMatchFighters.filter(
      (f) => f.activeInBattle && f.health > 0 && f.team !== enemy3.team
    );
    if (livingEnemies.length > 0) {
      // Saamne wali team ke kisi bhi dushman par achanak nishana ghoomega!
      let randIndex = Math.floor(Math.random() * livingEnemies.length);
      enemy3.currentTarget = livingEnemies[randIndex];
    }
  }

  let target = getSmartTarget(enemy2);
  if (!target) return;

  /*
// 🎯 TARGET RADAR: Jo sabse kareeb hoga, usko todega!
let distP1 = player1.health > 0 ? Math.abs(player1.x - enemy2.x) : Infinity;
let distT1 = teammate.health > 0 ? Math.abs(teammate.x - enemy2.x) : Infinity;
let distT2 = teammate2.health > 0 ? Math.abs(teammate2.x - enemy2.x) : Infinity;
let distT3 = teammate3.health > 0 ? Math.abs(teammate3.x - enemy2.x) : Infinity;
let closestDist = Math.min(distP1, distT1, distT2, distT3);

let target = player1;
if (closestDist === distT1) target = teammate;
else if (closestDist === distT2) target = teammate2;
else if (closestDist === distT3) target = teammate3;
*/

  let distanceX = target.x - enemy2.x;
  let absDist = Math.abs(distanceX);
  enemy2.scaleX = distanceX > 0 ? 1 : -1; // Palat jayega target ki taraf

  // 🔴 LONG DASH LOGIC (Dash -> Seedha Mukka)
  if (enemy2.state === "dash" && enemy2.isEnemyDashing) {
    if (absDist > 60) {
      enemy2.isEnemyDashing = false;
      enemy2.moveLeft = false;
      enemy2.moveRight = false;
      enemy2.kiBlast();
      // Dash ke theek baad Punch!
    }
    return;
  }
  let incomingBullet = projectiles.some(
    (p) =>
      (p.ownerId === "player" ||
        p.ownerId === "teammate" ||
        p.ownerId === "teammate2") &&
      p.active &&
      Math.abs(p.x - enemy2.x) < 250
  );
  if (enemy2.state === "kiCharge") {
    // Agar dushman 20px se kam distance par aa gaya YA goli aayi YA EP full
    if (absDist < 20 || incomingBullet || enemy2.ep >= 800) {
      enemy2.isCharging = false; // Turant charge chhod dega
    } else {
      return; // Safe hai toh charge karta rahega
    }
  }
  if (
    incomingBullet ||
    (target.isAttacking && target.state !== "block" && absDist < 120)
  ) {
    if (!enemy2.isBlocking && Math.random() < 0.9) {
      enemy2.block();
      return;
    }
  } else {
    // 🔥 Khatra khatam hone ke baad Frieza haath neeche karega!
    if (enemy2.state === "block") {
      enemy2.isBlocking = false;
      enemy2.isAttacking = false;
      enemy2.setState("idle");
    }
  }
  if (enemy2.ep <= 100 && absDist > 20 && !incomingBullet) {
    enemy2.kiCharge();
    return;
  }

  if (absDist > 250) {
    enemy2.moveLeft = false;
    enemy2.moveRight = false;
    let rLong = Math.random();
    if (rLong < 0.4) {
      // 90% Chance: Seedha Kamehameha thoko!
      enemy2.kamehameha();
    } else if (rLong < 0.5) {
      enemy2.mediumAttack();
    } else {
      // 10% Chance: Achanak peechhe Instant Transmission maro!
      enemy2.instantTransmission(target);
    }
    return;
  } else if (absDist > 180) {
    enemy2.moveLeft = false;
    enemy2.moveRight = false;

    let rMid = Math.random();
    if (rMid < 0.7) {
      // 90% Chance: Seedha Hell Attack thoko!
      enemy2.hellAttack();
    } else if (rMid < 0.2) {
      enemy2.mediumAttack();
    } else {
      enemy2.isEnemyDashing = true;
      enemy2.dash();
    }
    return;
  } else if (absDist > 150) {
    // Door range: Paas bhago ya Ki Blast thok do
    enemy2.moveRight = distanceX > 0;
    enemy2.moveLeft = distanceX < 0;
    if (Math.random() < 0.6) enemy2.kick();
    else if (Math.random() < 0.3)
      enemy2.instantTransmission(target); // Door se direct Teleport!
    else if (Math.random() < 0.1) {
      enemy2.isEnemyDashing = true;
      enemy2.dash(); // Long Dash
    }
    return;
  } else if (absDist > 60) {
    // Mid range
    enemy2.moveRight = distanceX > 0;
    enemy2.moveLeft = distanceX < 0;
    if (Math.random() < 0.2) enemy2.dash(); // Normal Dash
    else if (Math.random() < 0.1) enemy2.jump(); // Jump
  } else {
    // Close range (Muh ke paas)
    enemy2.moveLeft = false;
    enemy2.moveRight = false;
    if (Math.random() < 0.9) {
      let rand = Math.random();
      if (rand < 0.1) enemy2.kiBlast();
      else if (rand < 0.2) enemy2.mediumAttack();
      else if (rand < 0.3) enemy2.hellAttack();
      else if (rand < 0.4) enemy2.kick();
      else if (rand < 0.5) enemy2.instantTransmission(target);
      else if (rand < 0.6) enemy2.kamehameha();
      else if (rand < 0.7) enemy2.smashPunch(); // 💥 Smash Punch!
      else if (rand < 0.8) enemy2.hellPunch();
      else enemy2.dash(); // Piche bhag jayega (Reposition)
    }
  }
}
// ==========================================
// 🔥 NAYA: JIREN AI LOGIC (Absolute Boss)
// ==========================================
function updateJirenAI() {
  if (teammate2.health <= 0) return;
  if (teammate2.isControlledByPlayer) return;
  if (teammate2.state === "hit" || teammate2.state === "death") return;
  let target = getSmartTarget(teammate2);
  if (!target) return;
  /*
// Hamesha Black ko dekhega
let distToEnemy = enemy.health > 0 ? Math.abs(enemy.x - teammate2.x) : Infinity;
let distToFrieza = enemy2.health > 0 ? Math.abs(enemy2.x - teammate2.x) : Infinity;
let distToSukuna = enemy3.health > 0 ? Math.abs(enemy3.x - teammate2.x) : Infinity;

let closestDist = Math.min(distToEnemy, distToFrieza, distToSukuna);

let target = null;
if (closestDist !== Infinity) {
if (closestDist === distToEnemy) target = enemy;
else if (closestDist === distToFrieza) target = enemy2;
else if (closestDist === distToSukuna) target = enemy3;
}

if (!target) return;*/
  // Agar sab dushman mar gaye toh shanti se khada rahega
  let distanceX = target.x - teammate2.x;
  let absDist = Math.abs(distanceX);
  teammate2.scaleX = distanceX > 0 ? 1 : -1; // Hamesha Target ko dekhega
  // 🔴 LONG DASH LOGIC
  // 🎯 Goli ka Khatra Scan Karo:
  let incomingBullet = projectiles.some(
    (p) =>
      p.ownerId !== teammate2.id &&
      p.active &&
      Math.abs(p.x - teammate2.x) < 250
  );

  // 🔴 1. EMERGENCY STOP (Agar dushman 30px ke andar aaye YA Goli aaye YA EP Full ho jaye)
  if (teammate2.state === "kiCharge") {
    if (absDist <= 30 || incomingBullet || teammate2.ep >= 800) {
      teammate2.isCharging = false;
      teammate2.isAttacking = false;
      teammate2.setState("idle");
    } else {
      return; // Safe hai toh chup-chaap charge karta rahega!
    }
  }

  // 🛡️ 2. JIREN BLOCK (Bohot kam chance kyunki Jiren aggressive fighter hai)
  if (
    incomingBullet ||
    (target.isAttacking && target.state !== "block" && absDist < 120)
  ) {
    if (!teammate2.isBlocking && Math.random() < 0.01) {
      // 5% Rare Block
      teammate2.block();
      return;
    }
  } else if (teammate2.state === "block") {
    teammate2.isBlocking = false;
    teammate2.isAttacking = false;
    teammate2.setState("idle");
  }

  // 🔵 3. START CHARGING (EP <= 100 ho aur dushman 30px se door ho aur koi goli na ho)
  if (teammate2.ep <= 100 && absDist > 30 && !incomingBullet) {
    teammate2.kiCharge();
    return;
  }
  //if (teammate2.isAttacking) return;
  if (teammate2.state === "dash" && teammate2.isEnemyDashing) {
    teammate2.dashTimer = (teammate2.dashTimer || 0) + 1;
    let maxRight = WORLD_WIDTH - teammate2.element.offsetWidth - 20;
    let hitWall =
      (teammate2.moveLeft && teammate2.x <= 25) ||
      (teammate2.moveRight && teammate2.x >= maxRight - 5);

    if (absDist > 160 || hitWall || teammate2.dashTimer > 15) {
      teammate2.isEnemyDashing = false;
      teammate2.dashTimer = 0;
      teammate2.moveLeft = false;
      teammate2.moveRight = false;
      teammate2.isAttacking = false;
      teammate2.scaleX = target.x > teammate2.x ? 1 : -1;
      teammate2.setState("idle");
      if (Math.random() < 0.6) teammate2.kiBlast();
      return;
    }
    return;
  }

  if (absDist > 150) {
    // Door se ya toh Teleport karega ya seedha Goli chalayega!
    if (Math.random() < 0.3) {
      teammate2.moveLeft = true;
      teammate2.moveRight = true;
      teammate2.kiBlast(); // 🔥 DOOR SE GOLI!
    } else if (Math.random() < 0.4) {
      teammate2.mediumAttack();
    } else if (Math.random() < 0.6) {
      teammate2.hellAttack();
    } else {
      teammate2.instantTransmission(target); // GOKU BLACK KE PEECHHE Z-VANISH!
    }
    return;
  }
  if (teammate2.isAttacking) return;
  //if (teammate2.isAttacking) return;
  if (absDist > 250) {
    teammate2.instantTransmission(target); // 🔥 GOKU BLACK KE PEECHHE Z-VANISH!
    return;
  } else if (absDist > 120) {
    teammate2.moveRight = distanceX > 0;
    teammate2.moveLeft = distanceX < 0;

    let randMove = Math.random();
    if (randMove < 0.05) {
      teammate2.isEnemyDashing = true;
      teammate2.dash(); // Long Dash
    } else if (randMove < 0.06) {
      teammate2.hellAttack();
    } else if (randMove < 0.08) {
      teammate2.instantTransmission(target); // 🔥 Random Teleport Attack!
    }

    // Door se Long Dash
    else if (Math.random() < 0.3) {
      teammate2.jump();
    }
  } else if (absDist > 60) {
    teammate2.moveRight = distanceX > 0;
    teammate2.moveLeft = distanceX < 0;
    if (Math.random() < 0.4) teammate2.dash(); // Normal Dash
  } else {
    teammate2.moveLeft = false;
    teammate2.moveRight = false;
    if (Math.random() < 0.3) {
      if (target.x > teammate2.x) {
        teammate2.moveLeft = true;
        teammate2.moveRight = false;
        teammate2.scaleX = -1; // Piche bhago
      } else {
        teammate2.moveRight = true;
        teammate2.moveLeft = false;
        teammate2.scaleX = 1; // Piche bhago
      }
      teammate2.isEnemyDashing = true;
      teammate2.dashTimer = 0;
      teammate2.dash();
      return;
    }

    let rand = Math.random();
    if (rand < 0.4) teammate2.punch();
    else if (rand < 0.6) teammate2.hellAttack();
    else if (rand < 0.7) teammate2.hellPunch();
    else if (rand < 0.85) teammate2.instantTransmission(target);
    else teammate2.kiBlast();
    // 85% chance lagatar Mukke!
  }
}

// 2. ENEMY KI GOLI (Goku ki goli
// ==========================================
// 🔥 NAYA: TEAMMATE AI LOGIC (GOKU SSB)
// ==========================================
function updateTeammateAI() {
  if (teammate.health <= 0) return;
  if (teammate.isControlledByPlayer) return;
  /*
let distToEnemy = enemy.health > 0 ? Math.abs(enemy.x - teammate.x) : Infinity;
let distToFrieza = enemy2.health > 0 ? Math.abs(enemy2.x - teammate.x) : Infinity;
let distToSukuna = enemy3.health > 0 ? Math.abs(enemy3.x - teammate.x) : Infinity;

let closestDist = Math.min(distToEnemy, distToFrieza, distToSukuna);

let target = null;
if (closestDist !== Infinity) {
if (closestDist === distToEnemy) target = enemy;
else if (closestDist === distToFrieza) target = enemy2;
else if (closestDist === distToSukuna) target = enemy3;
} 

if (!target) {
if (teammate.state === "block") {
teammate.isBlocking = false;
teammate.isAttacking = false;
teammate.setState("idle");
}
return;
}*/
  // Line 4975 ke theek neeche yeh 2 lines daal do:
  let target = getSmartTarget(teammate);
  if (!target) return;

  if (
    teammate.state === "hit" ||
    teammate.state === "death" ||
    teammate.state === "block"
  ) {
    if (teammate.state === "block" && !target.isAttacking) {
      teammate.isBlocking = false;
      teammate.isAttacking = false;
      teammate.setState("idle");
    }
    return;
  }

  let distanceX = target.x - teammate.x;
  let absDist = Math.abs(distanceX);
  teammate.scaleX = distanceX > 0 ? 1 : -1; // Hamesha Target ko
  if (teammate.state === "dash" && teammate.isEnemyDashing) {
    let maxRight = WORLD_WIDTH - teammate.element.offsetWidth - 20;

    // 🛡️ Deewar Safety (Deewar aate hi turant disha badal kar dushman ko dekhega):
    if (
      (teammate.moveLeft && teammate.x <= 25) ||
      (teammate.moveRight && teammate.x >= maxRight - 5)
    ) {
      teammate.isEnemyDashing = false;
      teammate.moveLeft = false;
      teammate.moveRight = false;
      teammate.scaleX = target.x > teammate.x ? 1 : -1;
      teammate.setState("hellPunch");
      teammate.kiBlast();
      return;
    }

    // ⚡ Aapka exact original powerful code:
    if (absDist > 200) {
      teammate.isEnemyDashing = false; // Dash band
      teammate.moveLeft = false;
      teammate.moveRight = false;
      teammate.scaleX = target.x > teammate.x ? 1 : -1; // Enemy ko dekho

      // Turant KiBlast!
      teammate.kiBlast();
    }
    return; // Engine roko
  }
  // 🔥 NAYA JADOO: Agar enemy block kar raha hai, toh Teammate block nahi karega, seedha attack karega!
  if (target.state === "block" || target.isBlocking) {
    // Agar door hai, toh paas jayega ya Teleport/Dash/Instant Transmission karega
    if (absDist > 60) {
      teammate.moveRight = distanceX > 0;
      teammate.moveLeft = distanceX < 0;
      let aggroRand = Math.random();

      if (aggroRand < 0.05) teammate.dash();
      else if (aggroRand < 0.5) teammate.teleport();
      else if (aggroRand < 0.08) teammate.instantTransmission(target);
    } else {
      // Agar paas hai, toh guard todne ke liye sidha Attack karega
      teammate.moveLeft = false;
      teammate.moveRight = false;

      if (!teammate.isAttacking) {
        let breakRand = Math.random();
        if (breakRand < 0.25) teammate.smashPunch();
        else if (breakRand < 0.5) teammate.smashKick();
        else if (breakRand < 0.6) teammate.mediumAttack();
        else if (breakRand < 0.75) teammate.punch();
        else teammate.kick();
      }
    }
    // Engine ko yahin rok do taaki neeche wala normal AI (ya block logic) na chale!
  }
  let incomingBullet = projectiles.some(
    (p) =>
      (p.ownerId === "enemy" ||
        p.ownerId === "enemy2" ||
        p.ownerId === "enemy3") &&
      Math.abs(p.x - teammate.x) < 250
  );
  if (teammate.state === "kiCharge") {
    // Agar Enemy paas aa gaya (< 150px) YA Goli aa rahi ho YA EP full ho
    if (absDist < 20 || incomingBullet || teammate.ep >= 600) {
      teammate.isCharging = false; // Turant charge chhod dega aur pitega
    } else {
      return; // Door hai toh safe charge karta rahega! (Aage ka AI skip)
    }
  }
  if (
    incomingBullet ||
    (target.isAttacking && target.state !== "block" && absDist < 120)
  ) {
    if (!teammate.isBlocking && Math.random() < 0.01) {
      teammate.block();
      return; // 60% chance hai ki block kar lega!
    }
  } else if (teammate.state === "block") {
    teammate.isBlocking = false;
    teammate.isAttacking = false;
    teammate.setState("idle");
  }

  if (teammate.isAttacking) return;
  if (teammate.comboPending === "kamehameha") {
    teammate.comboPending = null; // Memory clear kar do
    teammate.scaleX = target.x > teammate.x ? 1 : -1; // Ekdum sahi enemy ki taraf dekho

    // 💥 BINA KISI DELAY KE SIDHA KAMEHAMEHA!
    teammate.kamehameha();
    return;
  }

  // 2. Agar doori 300px se zyada hai, toh Teleport karo aur memory me combo save karo!
  if (absDist > 400) {
    teammate.instantTransmission(target); // Gayab hokar Boss ke paas jao
    teammate.comboPending = "kamehameha"; // Engine ko batao pahunchte hi kya karna hai
    return;
  }
  if (teammate.ep <= 100 && absDist > 20 && !incomingBullet) {
    // Thoda random timer
    teammate.kiCharge(); // Ye karte hi isCharging = true ho jayega
    return;
  }

  // Paas jane ka logic
  if (absDist > 120) {
    teammate.moveRight = distanceX > 0;
    teammate.moveLeft = distanceX < 0;
    if (Math.random() < 0.05) teammate.jump();

    let moveRand = Math.random();
    if (moveRand < 0.15) {
      teammate.dash();
    } else if (moveRand < 0.35) {
      teammate.teleport();
    } else if (moveRand < 0.45) {
      // 🔥 NAYA JADOO: Ab Goku SSB bhi Z-Vanish karega!
      teammate.instantTransmission(target);
    }
    if (absDist > 55) {
      // Agar 55px se door hai toh hawa me punch nahi marega, paas aayega!
      teammate.moveRight = distanceX > 0;
      teammate.moveLeft = distanceX < 0;

      if (Math.random() < 0.35) teammate.kiBlast();
    }
  } else {
    teammate.moveLeft = false;
    teammate.moveRight = false;
    // 🔥 NAYA JADOO: SSB GOKU 30px Wala "Slide-Run" (ZERO TIMEOUT)
    if (absDist <= 30) {
      let spaceLeft = teammate.x;
      let spaceRight = WORLD_WIDTH - teammate.x;

      if (spaceLeft > spaceRight) {
        teammate.moveLeft = true;
        teammate.moveRight = false;
      } else {
        teammate.moveLeft = false;
        teammate.moveRight = true;
      }

      // Long Press Dash ON!
      teammate.isEnemyDashing = true;
      teammate.dash();

      return;
    }
    if (absDist <= 50) {
      let spaceLeft = teammate.x;
      let spaceRight = WORLD_WIDTH - teammate.x;

      // 1. Dash effect aur Dhool (Dust) chalne do
      teammate.dash();

      // 2. BINA TIMER KE INSTANT 200px PEECHHE! (Teleport jaisi speed)
      if (spaceLeft > spaceRight) {
        teammate.x -= 200; // Left bhago
      } else {
        teammate.x += 200; // Right bhago
      }

      // 3. Turant Enemy ko dekho
      teammate.scaleX = target.x > teammate.x ? 1 : -1;

      // 4. BINA KISI WAIT KE TURANT KIBLAST!
      if (teammate.state !== "hit" && teammate.state !== "death") {
        if (Math.random() < 0.8) teammate.kiBlast();
        else teammate.kamehameha();
      }

      return; // Engine yahin ruk jayega
    }

    if (absDist < 150 && Math.random() < 0.6) {
      if (Math.random() < 0.5) teammate.jump();
      else teammate.dash();
      return;
    }

    // Attack karne ka logic
    if (Math.random() < 0.95) {
      let rand = Math.random();
      if (rand < 0.15) teammate.punch();
      else if (rand < 0.25) teammate.kick();
      else if (rand < 0.35) teammate.smashPunch();
      else if (rand < 0.4) teammate.smashKick();
      else if (rand < 0.5) teammate.mediumAttack();
      else if (rand < 0.8) teammate.kiBlast();
      else if (rand < 0.55) teammate.hellPunch();
      else if (rand < 0.65) teammate.hellKick();
      else teammate.kamehameha();
    }
  }
}
// ==========================================================
// 🚀 1 MASTER ENGINE: AUTO-SYNC (NO CHARACTER OR MOVE NAMES NEEDED)
// ==========================================================
function updateGameEngine(frameSpeed = 3) {
  window.CURRENT_FRAME_SPEED = frameSpeed;
  const TIME_SCALE = 6 / frameSpeed; // 📐 Math Ratio: 6 / 3 = 2x Speed

  // 🎯 1. AUTO PROJECTILE TIMER SYNC (Bina kisi move ka naam likhe)
  projectiles.forEach((p) => {
    if (!p.active) return;

    // Har projectile ke andar jo bhi timer chal raha hai, usko scale karo:
    for (let key in p) {
      if (key.toLowerCase().includes("timer") && typeof p[key] === "number") {
        // Timer ko extra speed boost do taaki wo character ke sath hi khatam ho
        p[key] += TIME_SCALE - 1;
      }
    }
  });

  // 🎯 2. FRAME TICK CHECK (Sirf frameSpeed par animation chalegi)
  if (window.gameTick % frameSpeed !== 0) return;

  // 🎯 3. AUTO FIGHTER RADAR (Bina character ke naam likhe sabko auto-detect karega)
  let fighters =
    window.activeMatchFighters && window.activeMatchFighters.length > 0
      ? window.activeMatchFighters
      : typeof activeFighterMap !== "undefined"
      ? Object.values(activeFighterMap)
      : [];

  // Sabhi active fighters ko animate karo (Chahe Deku ho, Sukuna ho ya Naya Sasuke!)
  /*fighters.forEach((f) => {
    if (window.isGuestClient && !f.isControlledByPlayer) return;
    if (f && f.animate && (f.health > 0 || f.state === "death")) {
      f.animate();
    }
  });
  if (!window.isGuestClient) {
    // Projectile animations (Ki-Blast, Aag, Beams) ko bhi smooth chalao
    projectiles.forEach((p) => {
      if (p.active && p.animate) p.animate();
    });
  }*/
  const hostSyncPaused =
    window.isGuestClient &&
    (window._hostMinimized ||
      Date.now() - (window._lastHostPacketTime || 0) > 450);

  fighters.forEach((f) => {
    if (window.isGuestClient && !hostSyncPaused && !f.isControlledByPlayer)
      return;
    if (f && f.animate && (f.health > 0 || f.state === "death")) {
      f.animate();
    }
  });
  if (!window.isGuestClient || hostSyncPaused) {
    projectiles.forEach((p) => {
      if (p.active && p.animate) p.animate();
    });
  }
}
// ==========================================================
// 🎥 MUGEN 60 FPS DYNAMIC CAMERA & 20% ZOOM (EXACT VIDEO MATCH)
// ==========================================================
// ==========================================================
// 🎴 MASTER FUNCTION: ANIME MOVE CUT-IN (0.6s SLOW-MO, NO FLASH)
// ==========================================================
let activeMoveCutIns = 0;
const activeCards = {};
function triggerMoveCutIn(fighterId, moveName) {
  const container = document.getElementById("move-cutin-container");
  if (!container) return;
  container.style.zIndex = "8"; // 👈 Card ko Sasuke/Frieza Hell (6 aur 7) ke AAGE kar diya!
  document.querySelectorAll(".fighter").forEach((f) => (f.style.zIndex = "10")); // 👈 Fighters ko Card ke AAGE kar diya!
  // 1. Move ki photo nikaalo:
  let cardKey = `${fighterId}_${moveName}`;
  if (activeCards[cardKey]) {
    let existing = activeCards[cardKey];
    existing.count++;

    // A. Top-Right Corner par 2x, 3x, 4x Pop-Badge dikhao:
    if (existing.badge) {
      existing.badge.innerText = `${existing.count}x`;
      existing.badge.style.display = "block";
      existing.badge.classList.remove("pop-badge");
      void existing.badge.offsetWidth; // Animation refresh
      existing.badge.classList.add("pop-badge");
    }

    existing.card.style.animation = "none";
    existing.card.style.opacity = "1";
    existing.card.style.transform = "scale(1.05)";
    setTimeout(() => {
      if (existing.card) existing.card.style.transform = "scale(1)";
    }, 100);
    /*
// C. Timer me naya 0.8s add karo (Card long time zinda rahega):
clearTimeout(existing.timer);
existing.timer = setTimeout(() => {
existing.card.style.transition = "opacity 0.2s, transform 0.2s";
existing.card.style.opacity = "0";
existing.card.style.transform = "scale(1.15) translateY(-20px)";

setTimeout(() => {
if (existing.card.parentNode) existing.card.parentNode.removeChild(existing.card);
delete activeCards[cardKey];
activeMoveCutIns = Math.max(0, activeMoveCutIns - 1);
if (activeMoveCutIns === 0) {
window.isSlowMoActive = false;
window.CURRENT_FRAME_SPEED = 3;
}
}, 200);
}, 800);
return;
// 🚫 SLOW-MO BAR-BAR NAHI HOGA, DUSRA CARD NAHI BANEGA!
}*/
    clearTimeout(existing.timer);
    existing.timer = setTimeout(() => {
      if (existing.card && existing.card.parentNode) {
        existing.card.parentNode.removeChild(existing.card);
      }
      delete activeCards[cardKey];
    }, 800);

    return; // 👈 Yahan se turant return (Slow-Mo dobara lagkar game ko slow nahi karega!)
  }
  activeMoveCutIns++;
  window.isSlowMoActive = true;
  window.CURRENT_FRAME_SPEED = 3;
  setTimeout(() => {
    // 🎯 7v1 Safe: Ek ek move ka time khatam hone par count kam hoga
    activeMoveCutIns = Math.max(0, activeMoveCutIns - 1);
    if (activeMoveCutIns === 0) {
      window.isSlowMoActive = false; // Sab moves khatam hone par wapas 60 FPS!
      window.CURRENT_FRAME_SPEED = 3;
    }
  }, 600);

  let imgSrc = MOVE_CARD_MAP[cardKey] || `assets/${fighterId}_${moveName}.png`;
  // 2. Card Element banao:
  const card = document.createElement("div");
  card.className = "move-cutin-card";

  const img = document.createElement("img");
  img.src = imgSrc;
  // Agar photo na mile to blank rehne ke bajaye crash nahi hoga:
  img.onerror = () => {
    img.src = "assets/c1.jpg";
  };
  card.appendChild(img);
  const badge = document.createElement("div");
  badge.className = "move-card-badge";
  badge.innerText = "1x";
  badge.style.display = "none"; // 1x par hidden rahega, 2x aate hi dikhega
  card.appendChild(badge);
  const title = document.createElement("div");
  title.className = "move-cutin-title";
  title.innerText = moveName.toUpperCase();
  card.appendChild(title);

  container.appendChild(card);
  /*
// 3. 🦘 SLOW-MO ON (0.6 Sec Bullet-Time - NO FLASH):
activeMoveCutIns++;
window.isSlowMoActive = true;
window.CURRENT_FRAME_SPEED = 3;
setTimeout(() => {
if (activeMoveCutIns <= 1) {
window.isSlowMoActive = false;
window.CURRENT_FRAME_SPEED = 3;
}
}, 600);
*/
  let cardObj = {
    card: card,
    badge: badge,
    count: 1,
    timer: null,
  };
  activeCards[cardKey] = cardObj;
  /*
// 4. 0.6 Second baad card remove & normal speed:
cardObj.timer = setTimeout(() => {
if (card.parentNode) card.parentNode.removeChild(card);
delete activeCards[cardKey];
//activeMoveCutIns--;
activeMoveCutIns = Math.max(0, activeMoveCutIns - 1);

if (activeMoveCutIns === 0) {
// Agar koi aur card nahi chal raha, tabhi normal speed karo:
//if (activeMoveCutIns <= 0) {
activeMoveCutIns = 0;
window.isSlowMoActive = false;
window.CURRENT_FRAME_SPEED = 3;
}
}, 800);
}*/
  cardObj.timer = setTimeout(() => {
    if (card && card.parentNode) {
      card.parentNode.removeChild(card);
    }
    delete activeCards[cardKey];
  }, 800);
}

// A. STAGE CONTAINER (Buttons aur Health Bar ko hilne se bachane ke liye)
function setupCameraStage() {
  let stage = document.getElementById("stageContainer");
  if (!stage) {
    stage = document.createElement("div");
    stage.id = "stageContainer";
    stage.style.position = "absolute";
    stage.style.top = "0";
    stage.style.left = "0";
    stage.style.width = "100%";
    stage.style.height = "100%";
    stage.style.transformOrigin = "50% 100%"; // 👈 Zameen se lock rahega
    stage.style.pointerEvents = "none";
    stage.style.willChange = "transform";

    // Sirf Arena, Background aur Fighters ko stage me daalo:
    const worldElements = [
      "sky",
      "bg-characters",
      "mountains",
      "trees",
      "ground",
      "p1-dash",
      "p2-dash",
      "move-cutin-container",
    ];
    worldElements.forEach((id) => {
      const el = document.getElementById(id);
      if (el) stage.appendChild(el);
    });
    document.querySelectorAll(".fighter").forEach((fighterEl) => {
      stage.appendChild(fighterEl);
    });
    // 🎯 THE FIX: Saare Blue aur Red Boxes ko bhi stageContainer ke andar daalo!
    /*  document
      .querySelectorAll(".debug-hurtbox, .debug-hitbox, .mini-bar-container")
      .forEach((box) => {
        stage.appendChild(box);
      });*/
    // 🎯 LOCK: Saare Fighters, Badges aur Mini-bars Stage ke andar lock honge:
    document
      .querySelectorAll(
        ".fighter, .fighter-badge, .mini-bar-container, .debug-hurtbox, .debug-hitbox"
      )
      .forEach((el) => {
        if (stage && el.parentNode !== stage) {
          stage.appendChild(el);
        }
      });

    // game div me HUD ke peechhe add karo:
    game.insertBefore(stage, game.firstChild);
  }
  return stage;
}
// 🔍 REAL-TIME ZOOM DISPLAY FUNCTION
function updateZoomDisplay() {
  let zoomEl = document.getElementById("zoom-indicator");
  // 🎯 Select screen par gayab rahega:
  if (!gameStarted) {
    if (zoomEl) zoomEl.style.display = "none";
    return;
  }
  // Agar element nahi bana hai toh pehli baar create karega
  if (!zoomEl) {
    zoomEl = document.createElement("div");
    zoomEl.id = "zoom-indicator";
    zoomEl.style.position = "absolute";
    zoomEl.style.top = "95px"; // L2 button ke theek neeche
    zoomEl.style.left = "10px"; // Left side
    zoomEl.style.color = "#00ffff"; // Cyan color
    zoomEl.style.fontFamily = "Impact, sans-serif";
    zoomEl.style.fontSize = "15px";
    zoomEl.style.background = "rgba(0, 0, 0, 0.6)";
    zoomEl.style.padding = "3px 8px";
    zoomEl.style.borderRadius = "4px";
    zoomEl.style.border = "1px solid #00ffff";
    zoomEl.style.zIndex = "3500";
    zoomEl.style.pointerEvents = "none";
    game.appendChild(zoomEl);
  }
  zoomEl.style.display = "block";
  // Live Zoom number update karega (Jaise: 1.20x ya 120%)
  if (window.camZoom) {
    zoomEl.innerText = `ZOOM: ${window.camZoom.toFixed(2)}x`;
  }
}
// B. VIDEO JAISA DYNAMIC ZOOM & LEFT/RIGHT PAN
function updateDynamicCamera() {
  const stage = document.getElementById("stageContainer") || setupCameraStage();
  if (!stage || !gameStarted) return;
  if (window.isGuestClient && typeof window._hostCamZoom === "number") {
    window.camZoom = window.camZoom || 1.0;
    window.camPanX = window.camPanX || 0;
    window.camZoom += (window._hostCamZoom - window.camZoom) * 1.5;
    window.camPanX += ((window._hostCamPanX || 0) - window.camPanX) * 1.5;
    stage.style.transformOrigin = "50% 100%";
    stage.style.transform = `scale(${window.camZoom}) translateX(${window.camPanX}px)`;
    updateZoomDisplay();
    return;
  }

  const screenWidth = game.clientWidth;
  const hero = getMyFighter();

  // 1. Zinda fighters ki list:
  let aliveFighters = activeMatchFighters.filter(
    (f) => f.activeInBattle && f.health > 0
  );
  if (aliveFighters.length === 0 && hero) aliveFighters = [hero];
  if (aliveFighters.length === 0) return;

  // 2. Sabse Left aur Sabse Right khiladi ki position:
  let minX = Infinity;
  let maxX = -Infinity;
  let maxY = 40;

  /*aliveFighters.forEach((f) => {
    if (f.x < minX) minX = f.x;
    if (f.x > maxX) maxX = f.x;
    if (f.y > maxY) maxY = f.y;
  //});*/
  aliveFighters.forEach((f) => {
    if (f.x < minX) minX = f.x;
    if (f.x + f.element.offsetWidth > maxX) maxX = f.x + f.element.offsetWidth;
    //  if (f.x + (f.element.offsetWidth || 0) > maxX)
    //  maxX = f.x + (f.element.offsetWidth || 0);
    if (f.y > maxY) maxY = f.y;
  });

  // 3. 🎯 20% ZOOM LOGIC (Aapke hisaab se):
  const MAX_VIEW_OUT = 1.0; // Jab fighters door ya kone (edge) par jayein
  const MIN_VIEW_IN = 1.3; // 20% Zoom-In jab paas aakar lad rahe hon

  let leftEdgeDist = minX;
  let rightEdgeDist = screenWidth - maxX;
  let closestEdge = Math.min(leftEdgeDist, rightEdgeDist);
  let fighterSpread = maxX - minX;

  // Kone ke paas (< 140px) ya fighters door hon (> 350px) to Zoom-Out:
  // let edgeFactor = closestEdge >= 0 ? 1.0 : Math.max(0, closestEdge / 0);
  let edgeFactor = Math.max(0, Math.min(1, closestEdge / 0));
  // let edgeFactor = Math.max(0, Math.min(1, closestEdge / (screenWidth / 2)));
  //let edgeFactor = Math.max(
  //  0,
  //  Math.min(1, (closestEdge - hero.element.offsetWidth) / (screenWidth / 2))
  //);

  const MIN_COMBAT_DIST = 60; // 👊 Mukka-Laat ki asli doori
  const MAX_ARENA_DIST = screenWidth - 40;
  let spreadFactor = Math.max(
    0,
    Math.min(
      1,
      1 - (fighterSpread - MIN_COMBAT_DIST) / (MAX_ARENA_DIST - MIN_COMBAT_DIST)
    )
  );
  const MIN_GROUND = 40; // Zameen level (Zameen se judha rahega)
  const MAX_SKY = 460; // Aasman ki maximum unchai (Max Sky)
  let airSpread = Math.max(0, maxY - MIN_GROUND);
  // Zameen par (airSpread <= 30px) full 1.30 Zoom-In. Hawa me udne par smooth Zoom-Out (1.00):
  let heightFactor = Math.max(
    0,
    Math.min(1, 1 - (airSpread - 30) / (MAX_SKY - MIN_GROUND - 30))
  );
  if (aliveFighters.some((f) => f.state === "extraAttack")) {
    heightFactor = 0; // 👈 Isse aapka original zoomBlend = 0 hoga aur zoom seedha 1.0 tak poora open ho jayega
  }

  //let zoomBlend = Math.min(edgeFactor, spreadFactor);
  //let zoomBlend = Math.min(spreadFactor, heightFactor);
  let zoomBlend = Math.min(spreadFactor, heightFactor, edgeFactor);

  let targetZoom = MAX_VIEW_OUT + (MIN_VIEW_IN - MAX_VIEW_OUT) * zoomBlend;

  // 4. 🎯 LEFT / RIGHT SCREEN PANNING (Action ko follow karna):
  let currentTarget = getSmartTarget(hero);
  //let focusX = screenWidth / 2;
  let focusX = (minX + maxX) / 2;
  // NaN Crash Protection:
  if (isNaN(targetZoom) || !isFinite(targetZoom)) {
    targetZoom = 1.0;
  }
  if (isNaN(focusX) || !isFinite(focusX)) {
    focusX = screenWidth / 2;
  }
  /*if (
    hero &&
    hero.health > 0 &&
    currentTarget &&
    currentTarget.activeInBattle &&
    currentTarget.health > 0
  ) {
    focusX = (hero.x + currentTarget.x) / 2;
  } else {
    focusX = (minX + maxX) / 2;
  }*/

  let targetPanX = screenWidth / 2 - focusX;
  let maxAllowedPan = (targetZoom - 1.0) * (screenWidth / 2);
  targetPanX = Math.max(-maxAllowedPan, Math.min(maxAllowedPan, targetPanX));

  // 5. 60 FPS MUGEN SMOOTH LERP:
  window.camZoom = window.camZoom || 1.0;
  window.camPanX = window.camPanX || 0;

  window.camZoom += (targetZoom - window.camZoom) * 1.5;
  window.camPanX += (targetPanX - window.camPanX) * 1.5;
  let currentLimit = Math.max(
    0,
    ((window.camZoom - 1.0) / window.camZoom) * (screenWidth / 2) - 1
  );
  window.camPanX = Math.max(
    -currentLimit,
    Math.min(currentLimit, window.camPanX)
  );
  // 6. STAGE PAR APPLY (Pair zameen par lock rahenge):
  stage.style.transformOrigin = "50% 100%";
  stage.style.transform = `scale(${window.camZoom}) translateX(${window.camPanX}px)`;
  updateZoomDisplay();
}
// ==========================================
// 🎌 JAPANESE ANIME K.O. SLOW-MO FINISHER
// ==========================================
//function triggerJapaneseKO(isMatchOver = false) {
function triggerJapaneseKO(isMatchOver = false, fromRemote = false) {
  if (window.isHost && !fromRemote && typeof sendToAllGuests === "function") {
    sendToAllGuests({ type: "match_ko", isMatchOver: isMatchOver });
  }

  window.isSlowMoActive = true;
  // 1. ⏳ Matrix Slow-Motion (Game speed 4 guna slow ho jayegi):
  window.CURRENT_FRAME_SPEED = 20;
  //setTimeout(() => {
  clearTimeout(window._koSlowMoTimer);
  window._koSlowMoTimer = setTimeout(() => {
    window.isSlowMoActive = false;
    window.CURRENT_FRAME_SPEED = 3; // 1.2 sec baad normal speed
  }, 2800);

  // 2. ⚡ Screen Flash & Tagda Shake:
  game.classList.add("flash-ko");
  game.classList.add("shake-active");
  setTimeout(() => {
    game.classList.remove("flash-ko");
    game.classList.remove("shake-active");
  }, 800);

  // 3. 🎌 「決着 K.O.」 Banner Screen Par Pop Hoga:
  const koEl = document.getElementById("ko-screen");
  if (koEl) {
    koEl.classList.remove("active");
    void koEl.offsetWidth; // Reflow
    koEl.classList.add("active");

    // 3.5 second baad gayab
    //setTimeout(() => {
    clearTimeout(window._koBannerTimer);
    window._koBannerTimer = setTimeout(() => {
      koEl.classList.remove("active");
    }, 4000);
  }
  if (isMatchOver) {
    clearTimeout(window._koEndBtnTimer);
    window._koEndBtnTimer = setTimeout(() => {
      if (gameStarted) showMatchEndButton();
      // setTimeout(showMatchEndButton, 2000);
    }, 2000);
  }
}
function showMatchEndButton() {
  if (!gameStarted) return;
  let btn = document.getElementById("btn-match-end");
  if (!btn) {
    btn = document.createElement("div");
    btn.id = "btn-match-end";
    btn.style.position = "absolute";
    btn.style.top = "50%"; // 👈 Screen ke theek center mein
    btn.style.left = "50%";
    btn.style.transform = "translate(-50%, -50%)";
    btn.style.zIndex = "4000";
    btn.style.cursor = "pointer";
    // 👈 'assets/menu.png' ki jagah aap apni PNG image ka naam daal sakte ho:
    btn.innerHTML = `<img src="assets/menu.png" onerror="this.onerror=null; this.src='assets/icon.png';" style="width: 160px; height: auto; filter: drop-shadow(0 0 15px gold);" />`;

    const handleMenuClick = (e) => {
      //if (e) e.preventDefault();
      if (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
      }
      btn.style.display = "none";
      if (window.isHost && typeof sendToAllGuests === "function") {
        sendToAllGuests({ type: "return_to_lobby" });
      } else if (window.isGuestClient && typeof sendToHostRoom === "function") {
        sendToHostRoom({
          type: "return_to_lobby",
          roomCode: window.myRoomCode,
        });
      }
      returnToSelectScreen();
    };
    btn.onclick = handleMenuClick;
    btn.addEventListener("touchstart", handleMenuClick, { passive: false });
    (document.getElementById("game") || document.body).appendChild(btn);
  }
  btn.style.display = "block";
}

function returnToSelectScreen() {
  resetAllCombos();
  gameStarted = false;
  window._gameLoopRunning = false;
  window.isSlowMoActive = false;
  window.CURRENT_FRAME_SPEED = 3;
  activeMoveCutIns = 0;
  clearTimeout(window._koSlowMoTimer);
  clearTimeout(window._koBannerTimer);
  clearTimeout(window._koEndBtnTimer);
  if (game) {
    game.classList.remove("flash-ko", "shake-active");
  }
  const cutinBox = document.getElementById("move-cutin-container");
  if (cutinBox) cutinBox.innerHTML = "";
  if (typeof remoteProjectilesPool !== "undefined") {
    remoteProjectilesPool.forEach((el) => {
      if (el) el.style.display = "none";
    });
  }
  window.isGuestReady = false;
  if (Array.isArray(localLobbyActiveMembers)) {
    localLobbyActiveMembers.forEach((m) => {
      if (!m.isHost && !m.isNPC) m.isReady = false;
    });
  }
  /*if (typeof remoteProjectilesPool !== "undefined") {
    remoteProjectilesPool.forEach((el) => {
      if (el) el.style.display = "none";
    });
  }*/
  let endBtn = document.getElementById("btn-match-end");
  let arenaOverlay = document.getElementById("arenaStartOverlay");
  if (arenaOverlay) arenaOverlay.style.display = "none";
  if (endBtn) endBtn.style.display = "none";

  let koEl = document.getElementById("ko-screen");
  if (koEl) koEl.classList.remove("active");
  let zoomEl = document.getElementById("zoom-indicator");
  if (zoomEl && zoomEl.parentNode) {
    zoomEl.parentNode.removeChild(zoomEl);
  }
  projectiles.forEach((p) => p.destroy());
  projectiles = [];
  const stage = document.getElementById("stageContainer");
  if (stage) stage.style.transform = "none";
  window.camZoom = 1.0;
  window.camPanX = 0;

  // Sabhi fighters ko fresh reset karo
  [...teamAFighters, ...teamBFighters].forEach((f) => {
    f.activeInBattle = false;
    f.isControlledByPlayer = false;
    f.health = 100;
    f.healthBars = 4;
    f.ep = 800;
    f.updateMiniBars();
    f.state = "idle";
    f.frameIndex = 0;
    f.isAttacking = false;
    f.isCharging = false;
    f.isBlocking = false;
    f.jumping = false;
    f.velocityY = 0;
    f.kbVelocityX = 0;
    f.comboCount = 0;
    f.aiEscapeHits = 0;
    f.comboTimer = 0;
    f.moveLeft = false;
    f.moveRight = false;
    f.moveUp = false;
    f.moveDown = false;
    f.bulletFired = false;
    f.isGrabbedBySSB = false;
    f.grabbedEnemy = null;
    f.element.style.opacity = "1";
    f.element.style.transform = "";
    f.x = -99999;
    f.y = -99999;
    f.element.style.display = "none";
    if (f.miniBar) f.miniBar.style.display = "none";
    if (f.badge) f.badge.style.display = "none";
  });

  const selectScreen = document.getElementById("selectScreen");
  if (selectScreen) {
    selectScreen.style.display = "flex";
    renderSlots();
    updateCardSelection(activeCardIndex);
  }
}
// ⚡ PRO AI ADAPTER: Aapke hi 8 alag-alag AI functions ko bina chhede chalayega!
const AI_ADAPTERS = {};
function runCharacterAI(fighter) {
  if (
    !fighter ||
    fighter.health <= 0 ||
    fighter.isControlledByPlayer ||
    fighter.isRemotePlayer ||
    fighter.state === "hit" ||
    fighter.state === "death"
  )
    return;

  let role = fighter.charRole || fighter.id;
  if (role && (role.includes("teammate") || role.includes("enemy"))) {
    if (fighter.imageUrl) {
      if (fighter.imageUrl.includes("deku")) role = "player";
      else if (fighter.imageUrl.includes("gokublack")) role = "enemy";
      else if (fighter.imageUrl.includes("gokussb")) role = "teammate";
      else if (fighter.imageUrl.includes("jiren")) role = "teammate2";
      else if (fighter.imageUrl.includes("itachi")) role = "teammate3";
      else if (fighter.imageUrl.includes("frieza")) role = "enemy2";
      else if (fighter.imageUrl.includes("sukuna")) role = "enemy3";
      else if (fighter.imageUrl.includes("sasuke")) role = "sasuke";
    }
  }

  if (!AI_ADAPTERS[role]) {
    const configs = {
      player: { fn: updateDekuAI, varName: "player1" },
      enemy: { fn: updateAI, varName: "enemy" },
      teammate: { fn: updateTeammateAI, varName: "teammate" },
      teammate2: { fn: updateJirenAI, varName: "teammate2" },
      teammate3: { fn: updateItachiAI, varName: "teammate3" },
      enemy2: { fn: updateFriezaAI, varName: "enemy2" },
      enemy3: { fn: updateSukunaAI, varName: "enemy3" },
      sasuke: { fn: updateSasukeAI, varName: "sasuke" },
    };

    let cfg = configs[role];
    if (cfg && cfg.fn) {
      let fnStr = cfg.fn.toString();
      let replaced = fnStr.replace(
        new RegExp("\\b" + cfg.varName + "\\b", "g"),
        "actor"
      );
      let body = replaced.slice(
        replaced.indexOf("{") + 1,
        replaced.lastIndexOf("}")
      );
      AI_ADAPTERS[role] = new Function(
        "actor",
        "getSmartTarget",
        "projectiles",
        "isColliding",
        "updateEpBars",
        "updateHealthBars",
        body
      );
    }
  }

  if (AI_ADAPTERS[role]) {
    try {
      AI_ADAPTERS[role](
        fighter,
        getSmartTarget,
        projectiles,
        isColliding,
        updateEpBars,
        updateHealthBars
      );
    } catch (e) {}
  }
}
// ==========================================
// 8. LOOPS
// ==========================================
function startGameLoopSafe() {
  if (window._gameLoopRunning) return;
  window._gameLoopRunning = true;
  requestAnimationFrame(gameLoop);
}

function gameLoop() {
  if (!gameStarted) {
    window._gameLoopRunning = false;
    return;
  }

  if (window.isSlowMoActive) {
    window.slowMoTick = (window.slowMoTick || 0) + 1;
    // Har 10 frame mein sirf 1 frame chalega (Exact 10x-50x Matrix Slow-Mo!):
    if (window.slowMoTick % 3 !== 0) {
      requestAnimationFrame(gameLoop);
      return;
    }
  }

  const screenWidth = game.clientWidth;
  // 🧠 SMART UNIVERSAL AI: Har character apna hi attack karega (Deku Deku ka, Black Black ka)
  //activeMatchFighters.forEach((f) => {
  // if (
  //  !f.activeInBattle ||
  //  f.health <= 0 ||
  //  f.isControlledByPlayer ||
  //   f.state === "hit" ||
  //  f.state === "death"
  //  )
  //   return;

  //  let role = f.charRole || f.id;
  // if (role === "player") updateDekuAI(f);
  //  else if (role === "enemy") updateAI(f);
  //  else if (role === "teammate") updateTeammateAI(f);
  //   else if (role === "teammate2") updateJirenAI(f);
  // else if (role === "teammate3") updateItachiAI(f);
  //  else if (role === "enemy2") updateFriezaAI(f);
  //   else if (role === "enemy3") updateSukunaAI(f);
  //  else if (role === "sasuke") updateSasukeAI(f);
  //});
  // 🔒 CAMERA BOUNDARY (Camera duniya se bahar nahi jayega)
  // ==========================================================

  // 1. X-AXIS MATH: Dono characters ke exact beech ka point (Center)

  // Target X (Camera ko kah

  // Boundary lock (Camera stage ke bah
  // Agar stage bada hai toh upper limit bhi set kar sakte ho

  // 2. Y-AXIS MATH: Jo hawa mein sabse upar hai, usko follow karo
  //updateAI();
  //updateDekuAI();
  // updateTeammateAI();
  // updateJirenAI();
  //updateFriezaAI();
  // updateSasukeAI();
  //updateSukunaAI();
  //updateItachiAI();
  //checkCollisions();
  //updateDynamicCamera();

  // ✅ BAS YEH 3 LINES: Sabhi AI fighters apne asli moves chalayenge!
  /*activeMatchFighters.forEach((f) => {
    if (!f.isControlledByPlayer) runCharacterAI(f);
  });
  checkCollisions();
  updateDynamicCamera();
  // 👆👆 YAHAN TAK PASTE KARO 👆👆
  // 🌐 REAL-TIME 16 FIGHTERS LIVE SCREEN SYNC (HOST ➔ GUEST):
  if (
    window.isHost &&
    activePeerConnections &&
    activePeerConnections.length > 0 &&
    window.gameTick % 2 === 0
  ) {
    let syncPacket = {
      type: "game_state_sync",
      fighters: activeMatchFighters.map((f) => ({
        id: f._uniqueId || f.id,
        x: Math.round(f.x),
        y: Math.round(f.y),
        scaleX: f.scaleX,
        state: f.state,
        frameIndex: f.frameIndex,
        health: f.health,
        healthBars: f.healthBars,
        ep: f.ep,
      })),
    };
    activePeerConnections.forEach((conn) => {
      try {
        conn.send(syncPacket);
      } catch (e) {}
    });
  }*/
  // 🛡️ 60 FPS OPTIMIZATION: Sirf HOST sabhi 16 bots ka AI aur Collisions chalayega!
  // Guest phone par bots ka AI bilkul band, jisse CPU load 70% kam ho gaya:
  const isHostUnreachable =
    window.isGuestClient &&
    (window._hostMinimized ||
      Date.now() - (window._lastHostPacketTime || 0) > 450);
  if (window.hfPhysicsWorker && (window.gameTick || 0) % 2 === 0) {
    try {
      window.hfPhysicsWorker.postMessage({
        type: "step_physics_radar",
        tick: window.gameTick || 0,
        fighters: activeMatchFighters
          .filter((f) => f.activeInBattle && f.health > 0)
          .map((f) => ({
            id: f._uniqueId || f.id,
            x: Math.round(f.x),
            y: Math.round(f.y),
            team: f.team,
            health: f.health,
          })),
      });
    } catch (e) {}
  }

  if (!window.isGuestClient || isHostUnreachable) {
    activeMatchFighters.forEach((f) => {
      // Jo player minimize hai uska fighter still rahega, baaki saare 8v8 NPCs chalte rahenge!
      if (
        !f.isControlledByPlayer &&
        !f.isRemotePlayer &&
        !f.isMinimizedPlayer
      ) {
        runCharacterAI(f);
      }
    });
    checkCollisions();
  }

  /*if (!window.isGuestClient) {
    activeMatchFighters.forEach((f) => {
      if (!f.isControlledByPlayer && !f.isRemotePlayer) runCharacterAI(f);
    });
    checkCollisions();
  }*/
  updateDynamicCamera();

  // 🌐 REAL-TIME LIVE SCREEN SYNC (HOST ➔ GUEST):
  // Throttled to 15 FPS (every 4 ticks) + Saari Goliyaan/Beams sync hongi:
  /* if (
    window.isHost &&
    activePeerConnections &&
    activePeerConnections.length > 0 &&
    window.gameTick % 4 === 0
  ) {
    let syncPacket = {
      type: "game_state_sync",
      fighters: activeMatchFighters.map((f) => ({
        id: f._uniqueId || f.id,
        x: Math.round(f.x),
        y: Math.round(f.y),
        scaleX: f.scaleX,
        state: f.state,
        frameIndex: f.frameIndex,
        health: f.health,
        healthBars: f.healthBars,
        ep: f.ep,
      })),
      projectiles: projectiles
        .filter((p) => p.active)
        .map((p) => ({
          x: Math.round(p.x),
          y: Math.round(p.y),
          scaleX: p.scaleX,
          img: p.imageUrl,
          bgSize: p.bgSize,
          w: parseInt(p.element.style.width) || 40,
          h: parseInt(p.element.style.height) || 40,
          bgPos: p.element.style.backgroundPosition,
          transform: p.element.style.transform,
        })),
    };
    activePeerConnections.forEach((conn) => {
      try {
        conn.send(syncPacket);
      } catch (e) {}
    });
  }*/
  /*let hasRemoteGuests =
    (activePeerConnections && activePeerConnections.length > 0) ||
    localLobbyActiveMembers.some((m) => !m.isNPC && !m.isHost);
  if (window.isHost && hasRemoteGuests && window.gameTick % 4 === 0) {
     let syncPacket = {
      type: "game_state_sync",
      fighters: activeMatchFighters.map((f) => ({
        id: f._uniqueId || f.id,
    let syncPacket = {
      type: "game_state_sync",
      fighters: activeMatchFighters.map((f, idx) => ({
        idx: idx,
        id: f._uniqueId || f.id,

        x: Math.round(f.x),
        y: Math.round(f.y),
        scaleX: f.scaleX,
        state: f.state,
        frameIndex: f.frameIndex,
        health: f.health,
        healthBars: f.healthBars,
        ep: f.ep,
      })),
      projectiles: projectiles
        .filter((p) => p.active)
        .map((p) => ({
          x: Math.round(p.x),
          y: Math.round(p.y),
          scaleX: p.scaleX,
          img: p.imageUrl,
          bgSize: p.bgSize,
          w: parseInt(p.element.style.width) || 40,
          h: parseInt(p.element.style.height) || 40,
          bgPos: p.element.style.backgroundPosition,
          transform: p.element.style.transform,
        })),
    };
    sendToAllGuests(syncPacket);
  }*/
  let hasRemoteGuests =
    (activePeerConnections && activePeerConnections.length > 0) ||
    localLobbyActiveMembers.some((m) => !m.isNPC && !m.isHost);
  if (window.isHost && hasRemoteGuests && window.gameTick % 3 === 0) {
    window._hostSyncSeq = (window._hostSyncSeq || 0) + 1;
    let syncPacket = {
      type: "game_state_sync",
      seq: window._hostSyncSeq,
      camZoom: Number((window.camZoom || 1.0).toFixed(3)),
      camPanX: Math.round(window.camPanX || 0),
      fighters: activeMatchFighters.map((f, idx) => ({
        idx: idx,
        id: f._uniqueId || f.id,
        role: f.charRole || f.id,
        x: Math.round(f.x),
        y: Math.round(f.y),
        scaleX: f.scaleX,
        state: f.state,
        frameIndex: f.frameIndex,
        bt: f.beamTimer || 0,
        kbVx: Math.round((f.kbVelocityX || 0) * 10) / 10,
        vy: Math.round((f.velocityY || 0) * 10) / 10,
        isGrabbed: Boolean(f.isGrabbedBySSB),
        fw: parseInt(f.element.style.width) || 0,
        fh: parseInt(f.element.style.height) || 0,
        bgPos: f.element.style.backgroundPosition || "",
        op: f.element.style.opacity || "1",
        tf: f.element.style.transform || "",
        health: f.health,
        healthBars: f.healthBars,
        ep: f.ep,
        comboCount: f.comboCount || 0,
      })),
      projectiles: projectiles
        .filter((p) => p.active)
        .map((p) => ({
          x: Math.round(p.x),
          y: Math.round(p.y),
          vx:
            p.isDiagonal ||
            p.isBigKamehameha ||
            p.isSSBHellBeam ||
            p.isSSBKamehameha ||
            p.isFriezaKamehameha ||
            p.isSukunaShrine ||
            p.isItachiFireStyle ||
            p.isItachiHellAttack ||
            p.isSasukeHell ||
            p.isSasukeMedium ||
            p.isJirenHellExplosion ||
            p.isFriezaCrossExplosion
              ? 0
              : Math.round(p.speed || 0),
          scaleX: p.scaleX,
          img: p.imageUrl,
          bgSize: p.bgSize,
          w: parseInt(p.element.style.width) || 40,
          h: parseInt(p.element.style.height) || 40,
          bgPos: p.element.style.backgroundPosition,
          transform: p.element.style.transform,
          clipPath:
            p.element.style.clipPath ||
            p.element.style.webkitClipPath ||
            "none",
          tOrigin: p.element.style.transformOrigin || "bottom center",
        })),
    };
    sendToAllGuests(syncPacket);
  }
  /* let hasRemoteGuests =
    (activePeerConnections && activePeerConnections.length > 0) ||
    localLobbyActiveMembers.some((m) => !m.isNPC && !m.isHost);
  if (window.isHost && hasRemoteGuests && window.gameTick % 2 === 0) {
    let syncPacket = {
      type: "game_state_sync",
      fighters: activeMatchFighters.map((f, idx) => ({
        idx: idx,
        id: f._uniqueId || f.id,
        role: f.charRole || f.id,
        x: Math.round(f.x),
        y: Math.round(f.y),
        scaleX: f.scaleX,
        state: f.state,
        frameIndex: f.frameIndex,
        fw: parseInt(f.element.style.width) || 0,
        fh: parseInt(f.element.style.height) || 0,
        bgPos: f.element.style.backgroundPosition || "",
        op: f.element.style.opacity || "1",
        health: f.health,
        healthBars: f.healthBars,
        ep: f.ep,
        comboCount: f.comboCount || 0,
      })),
      projectiles: projectiles
        .filter((p) => p.active)
        .map((p) => ({
          x: Math.round(p.x),
          y: Math.round(p.y),
          scaleX: p.scaleX,
          img: p.imageUrl,
          bgSize: p.bgSize,
          w: parseInt(p.element.style.width) || 40,
          h: parseInt(p.element.style.height) || 40,
          bgPos: p.element.style.backgroundPosition,
          transform: p.element.style.transform,
          clipPath:
            p.element.style.clipPath ||
            p.element.style.webkitClipPath ||
            "none",
          tOrigin: p.element.style.transformOrigin || "bottom center",
        })),
    };
    sendToAllGuests(syncPacket);
  }*/

  if (isR2Pressed) {
    getMyFighter().teleport();
  }
  if (isR2Pressed) {
    getMyFighter().teleport();
  }
  // ==========================================
  // 🔥 MOBILE LONG-PRESS AUTO-ATTACKS 🔥
  // ==========================================
  // Agar Punch daba hai toh engine lagatar check karega
  if (window.isPunchHeld) {
    // 💥 Dekh, Smash Punch yahan aa gaya!
    if (isL2Pressed) getMyFighter().hellPunch(); // 🔥 Hell Punch yahan aa gaya!
    else getMyFighter().punch();
  }

  // Agar Kick daba hai toh engine lagatar check karega
  if (window.isKickHeld) {
    if (isL2Pressed) getMyFighter().hellKick(); // 💥 Hell Kick yahan aa gaya!
    else getMyFighter().kick();
  }
  /*
  player1.update(screenWidth);
  teammate.update(screenWidth);
  teammate2.update(screenWidth);
  enemy.update(screenWidth);
  teammate3.update(screenWidth);
  sasuke.update(screenWidth);
  enemy3.update(screenWidth);
  enemy2.update(screenWidth);*/

  // activeMatchFighters.forEach((f) => {
  //  f.update(screenWidth);
  //  });
  // 🏃 Guest phone sirf apne hero ki physics chalayega, baaki 15 fighters Host se smooth render honge:
  if (window.isGuestClient && !isHostUnreachable) {
    let myF = getMyFighter();
    if (myF) myF.update(screenWidth);
    if (typeof stepRemoteProjectiles60FPS === "function") {
      stepRemoteProjectiles60FPS();
    }
  } else {
    activeMatchFighters.forEach((f) => {
      f.update(screenWidth);
    });
  }

  /*if (window.isGuestClient) {
    let myF = getMyFighter();
    if (myF) myF.update(screenWidth);
    if (typeof stepRemoteProjectiles60FPS === "function") {
      stepRemoteProjectiles60FPS();
    }
    // if (myF) myF.update(screenWidth);
  } else {
    activeMatchFighters.forEach((f) => {
      f.update(screenWidth);
    });
  }*/
  projectiles.forEach((p) => p.update());
  projectiles = projectiles.filter((p) => p.active);
  window.cameraX = window.cameraX || 0;
  window.cameraY = window.cameraY || 0;

  // A. X-Axis (Center Tracking)
  WORLD_WIDTH = screenWidth;
  window.cameraX = 0;
  window.cameraY = 0;
  //game.style.backgroundPosition = "center bottom";
  if (!window._bgPosLocked) {
    game.style.backgroundPosition = "center bottom";
    window._bgPosLocked = true;
  }

  // 🔒 CAMERA BOUNDARY (Camera duniya se bahar
  // 🎥 ULTRA-FAST CAMERA UPDATE
  // B. Y-Axis (Air Trac
  window.gameTick = (window.gameTick || 0) + 1;
  /*
// Har 6th frame par animation update hogi (approx 100ms, NO CPU LAG!)
if (window.gameTick % 6 === 0) {
player1.animate();
teammate.animate();
teammate2.animate();
enemy.animate();
teammate3.animate();
enemy3.animate();
enemy2.animate();
projectiles.forEach((p) => p.animate());
*/
  updateGameEngine(3);
  requestAnimationFrame(gameLoop);
}
// ==========================================================================
// ⚡ UNIVERSAL SERVER LOAD BALANCER OVERRIDE (HOST CPU SYNC HACK)
// ==========================================================================
function syncHostCalculationsToServer() {
  if (window.isGuestClient || !gameStarted) return;

  // अगर यह होस्ट का फोन है, तो यह भारी फिजिक्स लूप्स को सर्वर के रैम बफर में शिफ्ट कर देगा
  if (window.gameTick % 3 === 0 && activeMatchFighters.length > 0) {
    let optimizationPacket = {
      type: "game_state_sync",
      fighters: activeMatchFighters.map((f, idx) => ({
        idx: idx,
        id: f._uniqueId || f.id,
        x: Math.round(f.x),
        y: Math.round(f.y),
        state: f.state,
        health: f.health,
        ep: f.ep,
      })),
      projectiles: projectiles
        .filter((p) => p.active)
        .map((p) => ({
          x: Math.round(p.x),
          y: Math.round(p.y),
          scaleX: p.scaleX,
        })),
    };

    // डैड सर्वर लोड को बाईपास करके सीधे क्लाउड रैम पर ट्रांसफर
    if (dedicatedFightSocket && dedicatedFightSocket.readyState === 1) {
      dedicatedFightSocket.send(JSON.stringify(optimizationPacket));
    }
  }
}

// इसे अपने मुख्य gameLoop() के अंदर checkCollisions() के ठीक नीचे कॉल कर दो:
// syncHostCalculationsToServer();

// MOBILE TOUCH CONTROLS & JOYSTICK LOGIC
// ==========================================
// ==========================================
// 8. MOBILE JOYSTICK LOGIC (Multi-Touch Fix)
// ==========================================
const joystickContainer = document.getElementById("joystick-container");
const joystickStick = document.getElementById("joystick-stick");

let joystickActive = false;
let joystickStartX = 0;
let joystickStartY = 0;
let joystickTouchId = null; // NAYA: Ungli ki pehchaan (ID) save karne ke liye
const maxDistance = 35;

if (joystickContainer && joystickStick) {
  joystickContainer.addEventListener("touchstart", (e) => {
    e.preventDefault();
    joystickActive = true;

    // Sirf usi touch ko save karo jisne joystick chhua
    const touch = e.changedTouches[0];
    joystickTouchId = touch.identifier;

    const rect = joystickContainer.getBoundingClientRect();
    joystickStartX = rect.left + rect.width / 2;
    joystickStartY = rect.top + rect.height / 2;

    // updateJoystick(touch.clientX, touch.clientY);
    updateJoystick(touch.clientX);
  });

  window.addEventListener("touchmove", (e) => {
    if (!joystickActive) return;

    // NAYA: Sirf wahi ungli track karo jiski ID joystickTouchId se match ho
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === joystickTouchId) {
        updateJoystick(
          e.changedTouches[i].clientX,
          e.changedTouches[i].clientY
        );
        break;
      }
    }
  });

  window.addEventListener("touchend", (e) => {
    if (!joystickActive) return;

    // NAYA: Check karo ki kya joystick wali ungli screen se uthi hai?
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === joystickTouchId) {
        joystickActive = false;
        joystickTouchId = null;
        joystickStick.style.transform = `translate(0px, 0px)`;
        getMyFighter().moveLeft = false;
        getMyFighter().moveRight = false;
        getMyFighter().moveUp = false; // 👈 NAYA
        getMyFighter().moveDown = false;
        getMyFighter().isBlocking = false;
        if (window.isGuestClient) {
          sendRemotePlayerAction("move", {
            moveLeft: false,
            moveRight: false,
            moveUp: false,
            moveDown: false,
            isBlocking: false,
          });
        }

        break;
      }
    }
  });
}
// Yahan backtick miss tha
function updateJoystick(currentClientX, currentClientY) {
  let deltaX = currentClientX - joystickStartX;

  let deltaY = currentClientY - joystickStartY; // 👈 NAYA: Up/Down kitna gaya

  // 🔴 PRO MATHS FIX: Joystick ko chaukore (Square) dabbe mein phansne se rokne ke liye
  // Isse joystick ekdum perfect Circle (gol) ghoomegi!
  let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  if (distance > maxDistance) {
    let ratio = maxDistance / distance;
    deltaX *= ratio;
    deltaY *= ratio;
  }

  // Stick ko screen par X aur Y dono disha mein khiskao
  joystickStick.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  // Pehle movement reset kar do
  getMyFighter().moveLeft = false;
  getMyFighter().moveRight = false;
  getMyFighter().moveUp = false;
  getMyFighter().moveDown = false;

  // Agar stick center (Deadzone) mein hai toh ruk jao
  if (distance < 10) {
    getMyFighter().isBlocking = false;
    return;
  }
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // 1. USER LEFT YA RIGHT JA RAHA HAI
    getMyFighter().isBlocking = false; // Block turant hatao taaki rukawat na aaye

    if (deltaX > 0) {
      getMyFighter().moveRight = true;
    } else {
      getMyFighter().moveLeft = true;
    }
  } else {
    // 2. USER UPAR YA NEECHE JA RAHA HAI
    if (deltaY > 0) {
      getMyFighter().moveDown = true;
      getMyFighter().block(); // Sirf tabhi Block hoga jab ungli pakka neeche ho!
    } else {
      getMyFighter().moveUp = true;
      getMyFighter().isBlocking = false;
    }
  }
  // 📡 GUEST INPUT: Joystick move hote hi Host ko disha bhejo:
  if (window.isGuestClient) {
    sendRemotePlayerAction("move", {
      moveLeft: getMyFighter().moveLeft,
      moveRight: getMyFighter().moveRight,
      moveUp: getMyFighter().moveUp,
      moveDown: getMyFighter().moveDown,
      isBlocking: getMyFighter().isBlocking,
    });
  }
}
// ==========================================================
// 🕹️ CURRENT PLAYER HELPER (Selected Hero ko control karna)
// ==========================================================
// 🎮 GUEST INPUT SENDER: Guest jab bhi koi button dabaye, Host ko turant bhejo:
/*function sendRemotePlayerAction(actionName, moveData = {}) {
  if (window.isGuestClient && window.activeGuestConn) {
    try {
      window.activeGuestConn.send({
        type: "player_input",
        action: actionName,
        ...moveData,
      });
    } catch (e) {}
  }
}*/
function sendRemotePlayerAction(actionName, moveData = {}) {
  if (window.isGuestClient) {
    sendToHostRoom({
      type: "player_input",
      roomCode: window.myRoomCode,
      action: actionName,
      ...moveData,
    });
  }
}

function getMyFighter() {
  return userControlledFighter || player1;
}

// 2. ACTION BUTTONS (A, B, C, D, L1, L2, R1, R2)
function bindTouchButton(btnId, onDown) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    onDown();
  });
  btn.addEventListener("mousedown", (e) => {
    onDown();
  }); // PC mouse test ke liye
}
// ==========================================
// 💥 NAYA JUMP BUTTON (LONG PRESS TRACKER)
// ==========================================
window.isDashHeld = false; // Engine ko batayega ki button daba hua hai
let jumpBtn = document.getElementById("btn-jump");

// 📱 Mobile Touch Controls
jumpBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  let currentHero = getMyFighter();
  if (typeof isL1Pressed !== "undefined" && isL1Pressed) {
    if (currentHero.id === "enemy" && currentHero.extraAttack) {
      currentHero.extraAttack();
      sendRemotePlayerAction("extraAttack"); // Hawa mein teleport hokar laser marega!
      return;
    }
  }

  if (typeof isL2Pressed !== "undefined" && isL2Pressed) {
    let target = getSmartTarget(currentHero);
    currentHero.instantTransmission(target);
    sendRemotePlayerAction("teleport");
    sendRemotePlayerAction("instantTransmission");
    window.isDashHeld = true; // Button daba liya!
  } else {
    getMyFighter().jump();
    sendRemotePlayerAction("jump");
  }
});

jumpBtn.addEventListener("touchend", (e) => {
  e.preventDefault();
  window.isDashHeld = false; // Button chhod diya!
});

// 💻 PC/Test Mouse Controls

//bindTouchButton("btn-jump", () => player1.jump());
//bindTouchButton("btn-punch", () => player1.punch())

// ==========================================
// 💥 PUNCH BUTTON (MOBILE AUTO-ATTACK)
// ==========================================
window.isPunchHeld = false;
const punchBtnEl = document.getElementById("btn-punch");

if (punchBtnEl) {
  // 1. TOUCH SHURU (Punch lagatar chalega)
  punchBtnEl.addEventListener("touchstart", (e) => {
    e.preventDefault();
    let hero = getMyFighter();
    if (isL1Pressed) {
      hero.smashPunch();
      sendRemotePlayerAction("smashPunch"); // 💥 L1 daba hai toh sirf EK BAAR Smash karega (EP bachegi!)
    } else if (isL2Pressed) {
      hero.hellPunch();
      sendRemotePlayerAction("hellPunch");
    } else {
      window.isPunchHeld = true;
      hero.punch();
      sendRemotePlayerAction("punch");
    }
  });

  // 2. TOUCH HATAYA (Punch band)
  punchBtnEl.addEventListener("touchend", (e) => {
    e.preventDefault();
    window.isPunchHeld = false;
  });
}

// ==========================================
// 💥 KICK BUTTON (MOBILE AUTO-ATTACK)
// ==========================================
window.isKickHeld = false;
const kickBtnEl = document.getElementById("btn-kick");

if (kickBtnEl) {
  // 1. TOUCH SHURU (Kick lagatar chalegi)
  kickBtnEl.addEventListener("touchstart", (e) => {
    e.preventDefault();
    let hero = getMyFighter();
    if (isL1Pressed) {
      hero.smashKick();
      sendRemotePlayerAction("smashKick");
      // ⚡ L1 + C = Smash Kick!
    } else if (isL2Pressed) {
      hero.hellKick();
      sendRemotePlayerAction("hellKick");
      // ☄️ L2 + C = Hell Kick (Drop Kick)!
    } else {
      window.isKickHeld = true;
      hero.kick();
      sendRemotePlayerAction("kick");
    }
  });

  // 2. TOUCH HATAYA (Kick band)
  kickBtnEl.addEventListener("touchend", (e) => {
    e.preventDefault();
    window.isKickHeld = false;
  });
}
bindTouchButton("btn-blast", () => {
  let hero = getMyFighter();

  if (isR2Pressed) {
    if (hero.id === "teammate3") {
      hero.fireBallAttack();
      sendRemotePlayerAction("fireBallAttack");
      // Itachi Fireball
    } else if (
      hero.id === "teammate" ||
      hero.id === "enemy2" ||
      hero.id === "enemy"
    ) {
      hero.kamehameha();
      sendRemotePlayerAction("kamehameha");
      // 🌊 Goku SSB, Frieza & Goku Black ka Kamehameha!
    }
    return;
  }

  // 💥 2. R1 + BLAST (Big Kamehameha & Fire Style):
  if (isR1Pressed) {
    if (hero.id === "teammate3") {
      hero.fireStyleAttack();
      sendRemotePlayerAction("fireStyleAttack");
      // Itachi Fire Style
    } else if (hero.id === "enemy") {
      hero.bigKamehameha();
      sendRemotePlayerAction("bigKamehameha");
      // 💥 Goku Black ka BIG Kamehameha!
    }
    return;
  }
  if (isL2Pressed) {
    hero.mediumAttack();
    sendRemotePlayerAction("mediumAttack");
  } else if (isL1Pressed) {
    hero.hellAttack();
    sendRemotePlayerAction("hellAttack");
  } else {
    hero.kiBlast();
    sendRemotePlayerAction("kiBlast");
  }
});
//bindTouchButton("btn-l1", () => console.log("L1 Pressed!"));
// ==========================================
// 🔥 NAYA: L1 LONG PRESS KI-CHARGE LOGIC 🔥
// ==========================================
const l1BtnEl = document.getElementById("btn-l1");
if (l1BtnEl) {
  // 1. JAB UNGLI RAKHOGE (PRESS)
  l1BtnEl.addEventListener("touchstart", (e) => {
    e.preventDefault();
    isL1Pressed = true;
    getMyFighter().kiCharge();
    sendRemotePlayerAction("kiCharge"); // Deku ko charge karne ka order!
  });
  l1BtnEl.addEventListener("mousedown", () => {
    isL1Pressed = true;
    getMyFighter().kiCharge();
  }); // PC Mouse ke liye

  // 2. JAB UNGLI HATAOGE (RELEASE)
  l1BtnEl.addEventListener("touchend", () => {
    isL1Pressed = false;
    sendRemotePlayerAction("stopCharge");
  });
  l1BtnEl.addEventListener("mouseup", () => {
    isL1Pressed = false;
  });
}
bindTouchButton("btn-l2", () => {
  isL2Pressed = true; // Switch ON
  console.log("L2 Pressed!");
});

// NAYA RELEASE CODE: Jab ungli L2 button se hategi
const l2BtnEl = document.getElementById("btn-l2");
if (l2BtnEl) {
  l2BtnEl.addEventListener("touchend", () => {
    isL2Pressed = false;
  }); // Switch OFF
  l2BtnEl.addEventListener("mouseup", () => {
    isL2Pressed = false;
  }); // PC mouse test ke liye
}

// ==========================================
// 🛡️ NAYA: R1 LONG PRESS BLOCK LOGIC
// ==========================================
// ==========================================
// 🚀 NAYA: R1 LONG PRESS DASH LOGIC
// ==========================================
window.isDashHeld = false; // Engine ko batayega ki dash daba hua hai

const r1BtnEl = document.getElementById("btn-r1");
if (r1BtnEl) {
  // 1. PRESS (Dash Shuru)
  r1BtnEl.addEventListener("touchstart", (e) => {
    e.preventDefault();
    window.isDashHeld = true;
    isR1Pressed = true; // Switch ON
    getMyFighter().dash();
    sendRemotePlayerAction("dash"); // Engine ko dash karne ka order
  });
  r1BtnEl.addEventListener("mousedown", () => {
    window.isDashHeld = true;
    getMyFighter().dash();
  }); // PC Test ke liye

  // 2. RELEASE (Dash Khatam)
  r1BtnEl.addEventListener("touchend", () => {
    window.isDashHeld = false;
    isR1Pressed = false;
    sendRemotePlayerAction("stopDash"); // Switch OFF (Character ruk jayega)
  });
  r1BtnEl.addEventListener("mouseup", () => {
    window.isDashHeld = false;
  }); // PC Test ke liye
}
// ==========================================
// ⚡ NAYA: R2 BUTTON (DEKU TELEPORT)
// ==========================================
// ==========================================
// ⚡ NAYA JADOO: R2 BUTTON (HOLD TO TELEPORT)
// ==========================================
const r2BtnEl = document.getElementById("btn-r2");
if (r2BtnEl) {
  // 1. JAB UNGLI RAKHOGE (PRESS)
  r2BtnEl.addEventListener("touchstart", (e) => {
    e.preventDefault();
    isR2Pressed = true;
  });
  r2BtnEl.addEventListener("mousedown", () => {
    isR2Pressed = true;
  });

  // 2. JAB UNGLI HATAOGE (RELEASE)
  r2BtnEl.addEventListener("touchend", () => {
    isR2Pressed = false;
  });
  r2BtnEl.addEventListener("mouseup", () => {
    isR2Pressed = false;
  });
}
// ==========================================
// 🎮 1. FULLSCREEN & LANDSCAPE LOCK (TOUCH + CLICK FIX)
// ======================================
// ==========================================
// 🎮 1. FULLSCREEN & LANDSCAPE LOCK (2 BUTTONS SUPPORT)
// ======================================
function triggerFullscreen() {
  const el = document.documentElement;

  // 1. Asli Browser Bar hatane ka Fullscreen Call
  const req =
    el.requestFullscreen ||
    el.webkitRequestFullscreen ||
    el.webkitRequestFullScreen ||
    el.msRequestFullscreen;
  if (req) {
    req.call(el).catch((err) => console.log(err));
  }

  // 2. Landscape Mode Lock
  try {
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock("landscape").catch(() => {});
    }
  } catch (e) {}
}

// 🎯 Dono Fullscreen Buttons par direct Touch lagaya (Button kabhi gayab nahi hoga)
document.querySelectorAll(".top-center, #btn-fullscreen").forEach((btn) => {
  btn.onclick = triggerFullscreen;
  btn.addEventListener("touchstart", triggerFullscreen, { passive: true });
});

// Fullscreen se bahar aane par wapas show karo
const handleExitFullscreen = () => {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    document.querySelectorAll(".top-center, #btn-fullscreen").forEach((btn) => {
      btn.style.display = "block";
    });
  }
};
document.addEventListener("fullscreenchange", handleExitFullscreen);
document.addEventListener("webkitfullscreenchange", handleExitFullscreen);
// ==========================================
// 🎮 2. SELECT SCREEN (L1, R1 & BLAST TOUCH CONTROLS)
// ==========================================
const selectScreenEl = document.getElementById("selectScreen");
const bigPreviewEl = document.getElementById("bigCharPreview");
const previewNameEl = document.getElementById("previewCharName");
const cardsList = document.querySelectorAll(".roster-card");
const p1SlotsContainer = document.getElementById("p1TeamSlots");
const enemySlotsContainer = document.getElementById("enemyTeamSlots");
const battleStartBtn = document.getElementById("btn-start-fight");

const rosterData = [
  { name: "DEKU", img: "assets/c1.jpg" },
  { name: "GOKU BLACK", img: "assets/c2.png" },
  { name: "ITACHI", img: "assets/c3.png" },
  { name: "GOKU SSB", img: "assets/c4.png" },
  { name: "JIREN", img: "assets/c5.jpg" },
  { name: "FRIEZA", img: "assets/c6.png" }, // 👈 Card 7 (Ab beech me Sasuke ki photo aur naam dono 100% sahi aayenge!)
  { name: "SUKUNA", img: "assets/c7.png" },
  { name: "SASUKE", img: "assets/c8.png" },
];

let activeCardIndex = 0;
let mySelectedTeam = [];
let enemySelectedTeam = [];
/*
function isAlreadyPicked(heroName) {
  return (
    mySelectedTeam.some((h) => h.name === heroName) ||
    enemySelectedTeam.some((h) => h.name === heroName)
  );
}*/
function isAlreadyPicked(heroName) {
  return false;
}

function isSelectionFull() {
  return mySelectedTeam.length >= 8 && enemySelectedTeam.length >= 8;
}

function updateCardSelection(newIndex) {
  if (newIndex < 0) newIndex = rosterData.length - 1;
  if (newIndex >= rosterData.length) newIndex = 0;

  activeCardIndex = newIndex;
  const full = isSelectionFull();
  cardsList.forEach((card, idx) => {
    /* const hero = rosterData[idx];
    if (idx === activeCardIndex) {
      card.classList.add("active-card");
    } else {
      card.classList.remove("active-card");
    }

    // Agar chuna hua hai toh card ko dim dikhao
    if (hero && isAlreadyPicked(hero.name)) {
      card.style.opacity = "0.35";
      card.style.filter = "grayscale(80%)";
    } else {
      card.style.opacity = "1";
      card.style.filteringter = "none";
    }
  });*/
    if (idx === activeCardIndex) card.classList.add("active-card");
    else card.classList.remove("active-card");

    // 8v8 bharne par hi black (grayscale) hoga
    if (full) {
      card.style.opacity = "0.35";
      card.style.filter = "grayscale(80%)";
    } else {
      card.style.opacity = "1";
      card.style.filter = "none";
    }
  });
  const currentHero = rosterData[activeCardIndex];
  if (bigPreviewEl && currentHero) bigPreviewEl.src = currentHero.img;
  if (previewNameEl && currentHero) previewNameEl.innerText = currentHero.name;
}
function addHeroToTeam(targetTeam) {
  const hero = rosterData[activeCardIndex];
  if (!hero) return;

  if (targetTeam === "p1" && mySelectedTeam.length < 8) {
    mySelectedTeam.push(hero);
  } else if (targetTeam === "enemy" && enemySelectedTeam.length < 8) {
    enemySelectedTeam.push(hero);
  }

  renderSlots();
  updateCardSelection(activeCardIndex);
  // 🌐 LIVE SYNC: Dono mobile screens par slots turant update honge:
  if (window.isHost) {
    broadcastLobbyState();
  } else if (window.isGuestClient && window.activeGuestConn) {
    try {
      window.activeGuestConn.send({
        type: "guest_pick_hero",
        targetTeam: targetTeam,
        hero: hero,
      });
    } catch (e) {}
  }
}

const btnL1 = document.getElementById("btn-l1");
if (btnL1) {
  btnL1.addEventListener(
    "touchstart",
    (e) => {
      if (selectScreenEl && selectScreenEl.style.display !== "none") {
        e.stopPropagation();
        updateCardSelection(activeCardIndex - 1);
      }
    },
    { passive: false }
  );
  btnL1.addEventListener("click", () => {
    if (selectScreenEl && selectScreenEl.style.display !== "none")
      updateCardSelection(activeCardIndex - 1);
  });
}

// 👉 R1: SCROLL RIGHT
const btnR1 = document.getElementById("btn-r1");
if (btnR1) {
  btnR1.addEventListener(
    "touchstart",
    (e) => {
      if (selectScreenEl && selectScreenEl.style.display !== "none") {
        e.stopPropagation();
        updateCardSelection(activeCardIndex + 1);
      }
    },
    { passive: false }
  );
  btnR1.addEventListener("click", () => {
    if (selectScreenEl && selectScreenEl.style.display !== "none")
      updateCardSelection(activeCardIndex + 1);
  });
}
const btnL2 = document.getElementById("btn-l2");
if (btnL2) {
  const handleL2 = (e) => {
    if (selectScreenEl && selectScreenEl.style.display !== "none") {
      if (e) e.stopPropagation();
      addHeroToTeam("p1"); // 👈 Left team me add karo
    }
  };
  btnL2.addEventListener("touchstart", handleL2, { passive: false });
  btnL2.addEventListener("click", handleL2);
}

// ⚔️ R2: ADD TO ENEMY TEAM (RIGHT SIDE)
const btnR2 = document.getElementById("btn-r2");
if (btnR2) {
  const handleR2 = (e) => {
    if (selectScreenEl && selectScreenEl.style.display !== "none") {
      if (e) e.stopPropagation();
      addHeroToTeam("enemy"); // 👈 Right team me add karo
    }
  };
  btnR2.addEventListener("touchstart", handleR2, { passive: false });
  btnR2.addEventListener("click", handleR2);
}
const btnBlast = document.getElementById("btn-blast");
if (btnBlast) {
  const handleBlast = (e) => {
    if (selectScreenEl && selectScreenEl.style.display !== "none") {
      if (e) e.stopPropagation();
      if (mySelectedTeam.length < 8) addHeroToTeam("p1");
      else if (enemySelectedTeam.length < 8) addHeroToTeam("enemy");
    }
  };
  btnBlast.addEventListener("touchstart", handleBlast, { passive: false });
  btnBlast.addEventListener("click", handleBlast);
}
// 💥 D (BLAST): AUTO ADD (Pehle Your Team, fir Enemy Team)
/*
const btnBlast = document.getElementById("btn-blast");
if (btnBlast) {
  const handleBlast = (e) => {
    if (selectScreenEl && selectScreenEl.style.display !== "none") {
      if (e) e.stopPropagation();
      if (mySelectedTeam.length < 7) addHeroToTeam("p1");
      else addHeroToTeam("enemy");
    }
  };
  btnBlast.addEventListener("touchstart", handleBlast, { passive: false });
  btnBlast.addEventListener("click", handleBlast);
}

// Direct Cards par touch/click karna
cardsList.forEach((card) => {
  card.addEventListener("click", () => {
    const idx = parseInt(card.getAttribute("data-index"));
    updateCardSelection(idx);
  });
});
function addHeroToTeam(targetTeam) {
  const hero = rosterData[activeCardIndex];
  if (!hero) return;

  // 🚫 Duplicate Check: Agar pehle se select hai toh add nahi hoga
  if (isAlreadyPicked(hero.name)) {
    return;
  }

  // Total fighters max 7 hi hain
  if (mySelectedTeam.length + enemySelectedTeam.length >= 8) {
    return;
  }

  if (targetTeam === "p1" && mySelectedTeam.length < 7) {
    mySelectedTeam.push(hero);
  } else if (targetTeam === "enemy" && enemySelectedTeam.length < 7) {
    enemySelectedTeam.push(hero);
  }

  renderSlots();
  updateCardSelection(activeCardIndex); // Update Card opacity
}*/
function renderSlots() {
  const defaultIcon = `<div style="width:26px; height:26px; min-width:26px; border-radius:50%; border:1.5px solid #ffd700; overflow:hidden; display:flex; align-items:center; justify-content:center; background:#fff;"><img src="assets/icon.png" style="width:100%; height:100%; object-fit:cover; transform:scale(1.6);" /></div>`;

  // 1. P1 Team Slots
  if (p1SlotsContainer) {
    const p1SlotItems = p1SlotsContainer.querySelectorAll(".slot-item");
    p1SlotItems.forEach((slot, i) => {
      if (mySelectedTeam[i]) {
        slot.classList.remove("empty");
        slot.innerHTML = `${defaultIcon} <span>${mySelectedTeam[i].name}</span>`;
        // Slot par touch karne se player remove hoga (Undo)
        slot.onclick = () => {
          mySelectedTeam.splice(i, 1);
          renderSlots();
          updateCardSelection(activeCardIndex);
        };
      } else {
        slot.classList.add("empty");
        slot.innerHTML = `<span>Slot ${i + 1}</span>`;
        slot.onclick = null;
      }
    });
  }

  // 2. Enemy Team Slots
  if (enemySlotsContainer) {
    const enemySlotItems = enemySlotsContainer.querySelectorAll(".slot-item");
    enemySlotItems.forEach((slot, i) => {
      if (enemySelectedTeam[i]) {
        slot.classList.remove("empty");
        slot.innerHTML = `${defaultIcon} <span>${enemySelectedTeam[i].name}</span>`;
        slot.onclick = () => {
          enemySelectedTeam.splice(i, 1);
          renderSlots();
          updateCardSelection(activeCardIndex);
        };
      } else {
        slot.classList.add("empty");
        slot.innerHTML = `<span>Enemy ${i + 1}</span>`;
        slot.onclick = null;
      }
    });
  }
}
// ⚔️ BATTLE START BUTTON (Kam se kam 1v1 hona chahiye)
/*if (battleStartBtn) {
  battleStartBtn.addEventListener("click", () => {
    if (mySelectedTeam.length === 0 || enemySelectedTeam.length === 0) {
      alert("Dono side kam se kam 1-1 player select karo!");
      return;
    }
    setupArenaTeams();
    selectScreenEl.style.display = "none";

    // gameStarted = true;
    // requestAnimationFrame(gameLoop);
    gameStarted = false;
    let arenaOverlay = document.getElementById("arenaStartOverlay");
    if (arenaOverlay) {
      arenaOverlay.style.display = "flex";
    }
  });
}*/
/*

function  {
  const isOnline = navigator.onLine;

  if (isOnline) {
    console.log(
      "🟢 ONLINE NODE DETECTED: Fetching assets from Hugging Face CDN..."
    );
    // 🔗 Apne Hugging Face Static Space ka asli URL lagao (taaki photo/sound load ho sake)
    window.HF_CDN_URL =
      "https://huggingface.co/spaces/Itachi636777/legend-of-fairy-tail/resolve/main/";

    // 📡 Render Singapore Server URL Sync (Yahan bina duplicate slashes ke lagana)
    window.CUSTOM_FIGHT_SERVER_URL = "wss://fairy-tail-server.onrender.com";

    if (typeof initDedicatedFightServer === "function")
      initDedicatedFightServer();
    if (typeof requestMicrophonePermission === "function")
      requestMicrophonePermission();
  } else {
    console.log(
      "📴 OFFLINE MODE: Running completely inside Local mobile directory..."
    );
    window.HF_CDN_URL = "assets/";
    window.CUSTOM_FIGHT_SERVER_URL = null;
    window.isGuestClient = false;
  }
}
setupDynamicNetworkPipeline();
window.addEventListener("online", setupDynamicNetworkPipeline);
window.addEventListener("offline", setupDynamicNetworkPipeline);*/

// ⚔️ BATTLE START / GUEST READY BUTTON (Free Fire Custom Room Style!)
if (battleStartBtn) {
  const handleStartOrReadyClick = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // 🎮 1. AGAR GUEST PHONE HAI -> YEH "READY" BUTTON KA KAAM KAREGA!
    if (window.isGuestClient) {
      window.isGuestReady = !window.isGuestReady;
      localLobbyActiveMembers.forEach((m) => {
        if (!m.isNPC && m.roomCode === window.myRoomCode) {
          m.isReady = window.isGuestReady;
        }
      });
      sendToHostRoom({
        type: "guest_ready_state",
        roomCode: window.myRoomCode,
        playerName: currentOnlineUserIdentity,
        ready: window.isGuestReady,
      });
      window.renderSlots();
      showScreenNotification(
        window.isGuestReady
          ? "🟢 You are READY! Waiting for Host to START..."
          : "⏳ Ready Cancelled"
      );
      return;
    }

    // 👑 2. AGAR HOST PHONE HAI -> CHECK KARO KI GUEST READY HAI YA NAHI!
    if (mySelectedTeam.length === 0 || enemySelectedTeam.length === 0) {
      alert("Dono side kam se kam 1-1 player select karo!");
      return;
    }

    let remoteRealPlayers = localLobbyActiveMembers.filter(
      (m) => !m.isNPC && !m.isHost
    );
    /*  if (remoteRealPlayers.length > 0) {
      let unreadyPlayers = remoteRealPlayers.filter((m) => !m.isReady);
      if (unreadyPlayers.length > 0) {
        let pName =
          unreadyPlayers[0].playerName || unreadyPlayers[0].name || "Player";
        showScreenNotification(`⏳ Waiting for [${pName}] to click READY!`);
        alert(`⚠️ Wait! [${pName}] ne abhi READY button nahi dabaya hai!`);
        return;
      }
    }*/
    if (remoteRealPlayers.length > 0) {
      let unreadyPlayers = remoteRealPlayers.filter((m) => !m.isReady);
      if (unreadyPlayers.length > 0) {
        let unreadyNames = unreadyPlayers.map(
          (m) => m.playerName || m.name || "Player"
        );
        sendToAllGuests({
          type: "host_waiting_ready",
          unreadyNames: unreadyNames,
        });
        showScreenNotification(
          `⏳ Waiting for [${unreadyNames.join(", ")}] to click READY!`
        );
        return;
      }
    }

    window.isGuestReady = false;
    localLobbyActiveMembers.forEach((m) => {
      if (!m.isHost && !m.isNPC) m.isReady = false;
    });

    window._hostSyncSeq = 0;
    setupArenaTeams();
    selectScreenEl.style.display = "none";
    gameStarted = false;
    let arenaOverlay = document.getElementById("arenaStartOverlay");
    if (arenaOverlay) {
      arenaOverlay.style.display = "flex";
    }
  };

  battleStartBtn.onclick = handleStartOrReadyClick;
  battleStartBtn.addEventListener("touchstart", handleStartOrReadyClick, {
    passive: false,
  });
}

// ==========================================================
// 🌟 SMART ROSTER & DOST-DUSHMAN RADAR SYSTEM (NEW CODE)
// ==========================================================
/*
const activeFighterMap = {
  player: player1,
  enemy: enemy,
  teammate3: teammate3,
  teammate: teammate,
  teammate2: teammate2,
  enemy2: enemy2,
  sasuke: sasuke,
  enemy3: enemy3,
};*/
const arenaStartBtnEl = document.getElementById("arenaStartBtn");
if (arenaStartBtnEl) {
  const startMatchNow = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    let arenaOverlay = document.getElementById("arenaStartOverlay");
    if (arenaOverlay) arenaOverlay.style.display = "none";
    // 🌐 Host Guest ko order bhejega ki Match Shuru Karo:
    /*if (
      window.isHost &&
      activePeerConnections &&
      activePeerConnections.length > 0
    ) {
      activePeerConnections.forEach((conn) => {
        try {
          conn.send({
            type: "start_fight",
            myTeam: mySelectedTeam,
            enemyTeam: enemySelectedTeam,
            members: localLobbyActiveMembers,
          });
        } catch (err) {}
      });
    }*/
    // 🌐 Host Guest ko order bhejega ki Match Shuru Karo:
    if (window.isHost) {
      sendToAllGuests({
        type: "start_fight",
        myTeam: mySelectedTeam,
        enemyTeam: enemySelectedTeam,
        members: localLobbyActiveMembers,
      });
    }

    // 💥 AB ASLI GAME CHALU!
    gameStarted = true;
    // requestAnimationFrame(gameLoop);
    startGameLoopSafe();
  };

  arenaStartBtnEl.onclick = startMatchNow;
  arenaStartBtnEl.addEventListener("touchstart", startMatchNow, {
    passive: false,
  });
}
const nameToFighterMap = {
  DEKU: player1,
  "GOKU BLACK": enemy,
  ITACHI: teammate3,
  "GOKU SSB": teammate,
  JIREN: teammate2,
  FRIEZA: enemy2,
  SASUKE: sasuke,
  SUKUNA: enemy3,
};
let activeMatchFighters = [];
userControlledFighter = player1; // Default
window._workerTargetCache = {};
window._cloudTargetCache = {};

function initHFMultiCoreWorker() {
  if (window.hfPhysicsWorker) return;
  try {
    const inlineWorkerCode = `
              self.onmessage = function(e) {
                      const d = e.data;
                              if (!d || d.type !== "step_physics_radar") return;
                                      const fighters = d.fighters || [];
                                              const targetMap = {};
                                                      for (let i = 0; i < fighters.length; i++) {
                                                                const f = fighters[i];
                                                                          if (!f || f.health <= 0) continue;
                                                                                    let minDist = Infinity, closestId = null;
                                                                                              for (let j = 0; j < fighters.length; j++) {
                                                                                                          if (i === j) continue;
                                                                                                                      const en = fighters[j];
                                                                                                                                  if (!en || en.health <= 0 || en.team === f.team) continue;
                                                                                                                                              const dist = Math.abs(en.x - f.x);
                                                                                                                                                          if (dist < minDist) { minDist = dist; closestId = en.id; }
                                                                                                                                                                    }
                                                                                                                                                                              if (closestId) targetMap[f.id] = closestId;
                                                                                                                                                                                      }
                                                                                                                                                                                              self.postMessage({ type: "worker_radar_result", tick: d.tick, targetMap: targetMap });
                                                                                                                                                                                                    };
                                                                                                                                                                                                        `;
    const blob = new Blob([inlineWorkerCode], {
      type: "application/javascript",
    });
    window.hfPhysicsWorker = new Worker(URL.createObjectURL(blob));
    window.hfPhysicsWorker.onmessage = function (e) {
      if (e.data && e.data.type === "worker_radar_result" && e.data.targetMap) {
        window._workerTargetCache = e.data.targetMap;
      }
    };
  } catch (err) {}
}
initHFMultiCoreWorker();

function getSmartTarget(self) {
  if (!self || self.health <= 0) return null;
  const myKey = self._uniqueId || self.id;

  const cachedTargetId =
    (window._workerTargetCache && window._workerTargetCache[myKey]) ||
    (window._cloudTargetCache &&
      window._cloudTargetCache[myKey] &&
      window._cloudTargetCache[myKey].targetId);
  if (cachedTargetId) {
    const cachedEnemy = activeMatchFighters.find(
      (f) =>
        f.activeInBattle &&
        f.health > 0 &&
        f.team !== self.team &&
        (f._uniqueId === cachedTargetId || f.id === cachedTargetId)
    );
    if (cachedEnemy) return cachedEnemy;
  }

  let enemies = activeMatchFighters.filter(
    (f) => f.activeInBattle && f.health > 0 && f.team !== self.team
  );
  if (enemies.length === 0) return null;

  let closest = enemies[0];
  let minDist = Math.abs(enemies[0].x - self.x);
  for (let i = 1; i < enemies.length; i++) {
    let d = Math.abs(enemies[i].x - self.x);
    if (d < minDist) {
      minDist = d;
      closest = enemies[i];
    }
  }
  return closest;
}

// 🎯 SMART TARGET TRACKER: Har fighter apne sabse kareeb zinda Dushman ko target karega
/*function getSmartTarget(self) {
  if (!self || self.health <= 0) return null;

  let enemies = activeMatchFighters.filter(
    (f) => f.activeInBattle && f.health > 0 && f.team !== self.team
  );
  if (enemies.length === 0) return null;

  let closest = enemies[0];
  let minDist = Math.abs(enemies[0].x - self.x);

  for (let i = 1; i < enemies.length; i++) {
    let d = Math.abs(enemies[i].x - self.x);
    if (d < minDist) {
      minDist = d;
      closest = enemies[i];
    }
  }
  return closest;
}*/
// 🎯 HAR HERO KA ROLE MAP:
const heroRoleMap = {
  DEKU: "player",
  "GOKU BLACK": "enemy",
  "GOKU SSB": "teammate",
  JIREN: "teammate2",
  ITACHI: "teammate3",
  FRIEZA: "enemy2",
  SUKUNA: "enemy3",
  SASUKE: "sasuke",
};
// 🧹 SABHI 16 COMBOS KO PURA CLEAN & RESET KARNE KA FUNCTION:
function resetAllCombos() {
  const allComboIds = [
    "p1-combo",
    "t1-combo",
    "t2-combo",
    "t3-combo",
    "t4-combo",
    "t5-combo",
    "t6-combo",
    "t7-combo",
    "p2-combo",
    "f1-combo",
    "s1-combo",
    "sasuke-combo",
    "e4-combo",
    "e5-combo",
    "e6-combo",
    "e7-combo",
  ];
  allComboIds.forEach((id) => {
    let el = document.getElementById(id);
    if (el) {
      el.style.opacity = "0";
      el.innerText = "";
      el.classList.remove("pop-anim");
    }
  });
  [...teamAFighters, ...teamBFighters].forEach((f) => {
    f.comboCount = 0;
    f.comboTimer = 0;
  });
}
// ⚔️ 1v1, 1v6, 6v1 MATCH ARENA SETUP
function setupArenaTeams() {
  resetAllCombos();
  activeMatchFighters = [];
  const showArrows =
    mySelectedTeam.some((h) =>
      enemySelectedTeam.some((eh) => eh.name === h.name)
    ) ||
    new Set(mySelectedTeam.map((h) => h.name)).size !== mySelectedTeam.length ||
    new Set(enemySelectedTeam.map((h) => h.name)).size !==
      enemySelectedTeam.length;

  let zoomEl = document.getElementById("zoom-indicator");
  if (zoomEl && zoomEl.parentNode) {
    zoomEl.parentNode.removeChild(zoomEl);
  }
  [...teamAFighters, ...teamBFighters].forEach((f) => {
    f.activeInBattle = false;
    f.isControlledByPlayer = false;
    f.health = 100;
    f.healthBars = 4;
    f.ep = 800;
    f.state = "idle"; // 👈 Maut state hatakar wapas IDLE
    f.frameIndex = 0;
    f.isAttacking = false;
    f.isCharging = false;
    f.isBlocking = false;
    f.jumping = false;
    f.velocityY = 0;
    f.kbVelocityX = 0;
    f.comboCount = 0;
    f.aiEscapeHits = 0;
    f.comboTimer = 0;
    f.moveLeft = false;
    f.moveRight = false;
    f.moveUp = false;
    f.moveDown = false;
    f.bulletFired = false;
    f.isGrabbedBySSB = false;
    f.grabbedEnemy = null;
    f.element.style.opacity = "1";
    f.element.style.transform = "";

    //    f.health = 0;
    f.x = -99999;
    f.y = -99999;
    f.element.style.display = "none";
    if (f.miniBar) f.miniBar.style.display = "none";
    if (f.indicator) f.indicator.style.display = "none";
    if (f.hurtboxDiv) f.hurtboxDiv.style.display = "none";
    if (f.hitboxDiv) f.hitboxDiv.style.display = "none";
  });

  // Dono teams ke 1st fighters ko Health Bar assign karo
  // currentP1Leader = nameToFighterMap[mySelectedTeam[0].name] || player1;
  // currentEnemyLeader = nameToFighterMap[enemySelectedTeam[0].name] || enemy;
  /*
  // 1. Pehle Sabhi 7 fighters ko reset aur hide karo
  Object.values(activeFighterMap).forEach((f) => {
    f.activeInBattle = false;
    f.isControlledByPlayer = false;
    f.health = 0;
    f.x = -99999; // 👈 Bhoot arena se 1 lakh px door!
    f.y = -99999;

    f.element.style.display = "none";
    if (f.miniBar) f.miniBar.style.display = "none";
    if (f.hurtboxDiv) f.hurtboxDiv.style.display = "none";
    if (f.hitboxDiv) f.hitboxDiv.style.display = "none";
  });*/

  // 2. YOUR TEAM (P1 - Dost) Setup
  //mySelectedTeam.forEach((hero, index) => {
  // let f = nameToFighterMap[hero.name];
  let arenaW = game && game.clientWidth > 0 ? game.clientWidth : 1500;
  let midX = arenaW / 2;
  let centerGap = 40; // Center se dono leaders 85px door aamne-saamne honge
  //let slotSpacing = 45;
  let slotSpacing = Math.min(45, Math.floor((midX - centerGap - 20) / 7));
  mySelectedTeam.forEach((hero, index) => {
    let f = teamAFighters[index];

    if (f) {
      f.charRole = heroRoleMap[hero.name];
      f.team = "p1";
      f.activeInBattle = true;
      f.health = 100;
      f.healthBars = 4;
      f.ep = 800;
      f.state = "idle";
      f.frameIndex = 0;
      f.isAttacking = false;

      // f.x = 80 + index * 60; // Left side par spawn
      // f.y = 40;
      //   f.scaleX = 1; // Right side dekhega
      f.x = midX - centerGap - index * slotSpacing;
      f.y = 40;
      f.scaleX = 1;
      f.element.style.display = "block";
      const cfg = heroConfigMap[hero.name];
      if (cfg) {
        f.data = cfg.data;
        f.imageUrl = cfg.img;
        f.bgSize = cfg.bgSize;
        f.showFrame(f.data.idle[0]);
      }
      /*  if (index === 0) {
        // 🎮 1st Fighter ko Player Joystick & Buttons se Control karega
        f.isControlledByPlayer = true;
        userControlledFighter = f;
        currentP1Leader = f;
        // userControlledFighter = f;
        if (f.miniBar) f.miniBar.style.display = "none";
      } else {
        f.isControlledByPlayer = false;
        if (f.miniBar) f.miniBar.style.display = "flex";
      }*/
      if (index === 0 && !window.isGuestClient) {
        // Host phone par Team A Slot 1 player control karega
        f.isControlledByPlayer = true;
        userControlledFighter = f;
        currentP1Leader = f;
        if (f.miniBar) f.miniBar.style.display = "none";
      } else {
        f.isControlledByPlayer = false;
        if (f.miniBar) f.miniBar.style.display = "flex";
      }

      /* if (f.indicator) {
        if (showArrows) {
          f.indicator.className = "overhead-indicator blue-arrow";
          f.indicator.innerHTML = `<span>${
            index + 1
          }</span><div class="arrow-down"></div>`;
          f.indicator.style.display = "flex";
        } else {
          f.indicator.style.display = "none";
        }
      }*/
      if (f.badge) {
        let num = index + 1;
        f.badge.innerHTML = `<span style="color:#00ffff; font-weight:900; font-size:16px; text-shadow:0 0 8px cyan, 1px 1px 2px black;">${num} ▼</span>`;
        f.badge.style.display = "block";
      }
      f.updateCSS();
      f.updateMiniBars();
      activeMatchFighters.push(f);
    }
  });

  /* if (f.badge) {
        if (f.isControlledByPlayer) {
          f.badge.innerHTML = `<span style="color:#00ffff; font-weight:bold; font-size:15px; text-shadow:0 0 8px cyan, 1px 1px 2px black;">1 ▼</span>`;
          f.badge.style.display = "block";
        } else {
          f.badge.style.display = "none";
        }
      }
      activeMatchFighters.push(f);
    }
  });*/
  // Player 1 ko Cyan "1P ▼" do:

  // 3. ENEMY TEAM (Dushman) Setup
  //enemySelectedTeam.forEach((hero, index) => {
  //
  // if (f) {
  //  f.charRole = heroRoleMap[hero.name];
  enemySelectedTeam.forEach((hero, index) => {
    let f = teamBFighters[index];
    if (f) {
      f.charRole = heroRoleMap[hero.name];
      // f.id = f.charRole; // 👈 NAYA FIX: Enemy 2 ko Frieza banne se rokega
      f.team = "enemy";
      f.activeInBattle = true;
      f.isControlledByPlayer = false;
      //f.team = "enemy";
      //  f.activeInBattle = true;
      //  f.isControlledByPlayer = false;
      f.health = 100;
      f.healthBars = 4;
      f.ep = 800;
      f.state = "idle";
      f.frameIndex = 0;
      f.isAttacking = false;

      //  f.x = WORLD_WIDTH - 120 - index * 60; // Right side par spawn
      //  f.y = 40;
      f.x = midX + centerGap + index * slotSpacing;
      f.y = 40;
      f.scaleX = -1; // Left side dekhega
      f.element.style.display = "block";
      if (f.miniBar) f.miniBar.style.display = "flex";
      const cfg = heroConfigMap[hero.name];
      if (cfg) {
        f.data = cfg.data;
        f.imageUrl = cfg.img;
        f.bgSize = cfg.bgSize;
        f.showFrame(f.data.idle[0]);
      }
      f.isRemotePlayer = false;
      let memB = localLobbyActiveMembers.find(
        (m) => m.slotType === "enemy" && m.index === index && !m.isNPC
      );
      if (index === 0) currentEnemyLeader = f;
      if (
        window.isGuestClient &&
        ((memB && memB.roomCode && memB.roomCode === window.myRoomCode) ||
          (index === 0 &&
            !localLobbyActiveMembers.some(
              (m) => !m.isNPC && m.roomCode === window.myRoomCode
            )))
      ) {
        f.isControlledByPlayer = true;
        userControlledFighter = f;
        if (f.miniBar) f.miniBar.style.display = "none";
      } else if (memB) {
        f.isRemotePlayer = true;
      }
      if (f.badge) {
        let num = index + 1;
        f.badge.innerHTML = `<span style="color:#ff2222; font-weight:900; font-size:16px; text-shadow:0 0 8px red, 1px 1px 2px black;">${num} ▼</span>`;
        f.badge.style.display = "block";
      }
      f.updateCSS();
      activeMatchFighters.push(f);
    }
  });

  //if (index === 0) currentEnemyLeader = f;
  /*if (index === 0) {
        currentEnemyLeader = f;

        // 🎮 AGAR GUEST PHONE HAI TOH WO ENEMY 1 KO CONTROL KAREGA (ASLI PLAYER):
        if (window.isGuestClient) {
          f.isControlledByPlayer = true;
          userControlledFighter = f;
          if (f.miniBar) f.miniBar.style.display = "none";
        } else if (
          localLobbyActiveMembers.some(
            (m) => m.slotType === "enemy" && m.index === 0 && !m.isNPC
          )
        ) {
          // Host ke phone par yeh fighter Remote Player hai (AI Bot nahi chalega):
          f.isRemotePlayer = true;
        }
      }

      if (f.badge) {
        let num = index + 1;
        f.badge.innerHTML = `<span style="color:#ff2222; font-weight:900; font-size:16px; text-shadow:0 0 8px red, 1px 1px 2px black;">${num} ▼</span>`;
        f.badge.style.display = "block";
      }
      f.updateCSS();
      activeMatchFighters.push(f);
    }*/

  //});

  // Health bars update
  updateHealthBars();
  updateEpBars();
}
// ==========================================
// ⚙️ OPTIONS MODAL & TABS CONTROLLER
// ==========================================
// ==========================================
// ⚙️ 1-LINE POSTER SWITCHER (100% WORKING)
// ==========================================
[
  "assets/online.png",
  "assets/character move.png",
  "assets/charactermove.png",
  "assets/game info.png",
  "assets/gameinfo.png",
  "assets/menu1.png",
].forEach((src) => {
  const img = new Image();
  img.src = src;
});
/*function setupOptionsModal() {
  const modal = document.getElementById("options-modal");
  const poster = document.getElementById("options-bg-poster");

  const posters = {
    online: "assets/online.png",
    moves: "assets/character move.png",
    info: "assets/game info.png",
    anime: "assets/menu1.png",
  };

  window.switchTab = function (tab) {
    // 1. Tab buttons ka active state change
    document
      .querySelectorAll(".option-tab-item")
      .forEach((b) => b.classList.remove("active-option-tab"));
    const activeBtn = document.getElementById("tab-" + tab + "-btn");
    if (activeBtn) activeBtn.classList.add("active-option-tab");

    // 2. Poster change
    if (poster && posters[tab]) {
      poster.src = posters[tab];
      poster.onerror = () => {
        if (tab === "moves") poster.src = "assets/charactermove.png";
        if (tab === "info") poster.src = "assets/gameinfo.png";
      };
    }

    const sBar = document.getElementById("options-search-bar");
    const mBox = document.getElementById("options-moves-content");
    const iBox = document.getElementById("options-info-content");
    let oBox = document.getElementById("options-online-content");
    let mbBox = document.getElementById("options-message-content");

    // Container auto-create agar HTML me na ho
    if (!oBox && sBar && sBar.parentNode) {
      oBox = document.createElement("div");
      oBox.id = "options-online-content";
      oBox.className = "options-text-overlay";
      oBox.style.display = "block";
      sBar.parentNode.insertBefore(oBox, sBar.nextSibling);
    }
    if (!mbBox && modal) {
      const modalContent = modal.querySelector(".options-modal-content");
      if (modalContent) {
        mbBox = document.createElement("div");
        mbBox.id = "options-message-content";
        mbBox.className = "options-text-overlay";
        mbBox.style.display = "none";
        mbBox.innerHTML = `<div id="mugen-message-logs" style="display:flex; flex-direction:column; gap:6px;"><p style="color:#00ff80 !important; margin:3px 0;"><b>[MESSAGE SYSTEM]:</b> Online room notifications and live player messages will appear here.</p></div>`;
        modalContent.appendChild(mbBox);
      }
    }

    // 🔥 3. STRICT ISOLATION: Search bar sirf ONLINE me dikhega, baaki sab tab me 100% GAYAB rahega!
    if (sBar)
      sBar.style.setProperty(
        "display",
        tab === "online" ? "flex" : "none",
        "important"
      );
    if (oBox)
      oBox.style.setProperty(
        "display",
        tab === "online" ? "block" : "none",
        "important"
      );

    // 🔥 4. Moves aur Game Info ka text wapas visible hoga apne apne tab par:
    if (mBox)
      mBox.style.setProperty(
        "display",
        tab === "moves" ? "block" : "none",
        "important"
      );
    if (iBox)
      iBox.style.setProperty(
        "display",
        tab === "info" ? "block" : "none",
        "important"
      );
    if (mbBox)
      mbBox.style.setProperty(
        "display",
        tab === "anime" ? "block" : "none",
        "important"
      );

    if (tab === "online" && typeof syncOnlineListLayoutDisplay === "function") {
      syncOnlineListLayoutDisplay();
    }
  };

  const optBtn = document.getElementById("btn-option-menu");
  const closeBtn = document.getElementById("close-options-btn");
  if (optBtn && modal) {
    const openFn = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      modal.style.display = "flex";
      switchTab("online");
    };
    optBtn.onclick = openFn;
    optBtn.addEventListener("touchstart", openFn, { passive: false });
  }

  if (closeBtn && modal) {
    const closeFn = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      modal.style.display = "none";
    };
    closeBtn.onclick = closeFn;
    closeBtn.addEventListener("touchstart", closeFn, { passive: false });
  }

  ["online", "moves", "info", "anime"].forEach((name) => {
    const btn = document.getElementById("tab-" + name + "-btn");
    if (btn) {
      const clickFn = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        switchTab(name);
      };
      btn.onclick = clickFn;
      btn.addEventListener("touchstart", clickFn, { passive: false });
    }
  });
}

setupOptionsModal();*/
// ==========================================
// ⚙️ OPTIONS MODAL & TABS CONTROLLER (100% FIXED)
// ==========================================
function setupOptionsModal() {
  const modal = document.getElementById("options-modal");
  const poster = document.getElementById("options-bg-poster");

  const posters = {
    online: "assets/online.png",
    moves: "assets/character move.png",
    info: "assets/game info.png",
    anime: "assets/menu1.png",
  };

  window.switchTab = function (tab) {
    // 1. Tab buttons ka active state change
    document
      .querySelectorAll(".option-tab-item")
      .forEach((b) => b.classList.remove("active-option-tab"));
    const activeBtn = document.getElementById("tab-" + tab + "-btn");
    if (activeBtn) activeBtn.classList.add("active-option-tab");

    // 2. Poster change
    if (poster && posters[tab]) {
      poster.src = posters[tab];
      poster.onerror = () => {
        if (tab === "moves") poster.src = "assets/charactermove.png";
        if (tab === "info") poster.src = "assets/gameinfo.png";
      };
    }

    const sBar = document.getElementById("options-search-bar");
    const mBox = document.getElementById("options-moves-content");
    const iBox = document.getElementById("options-info-content");
    const oBox = document.getElementById("options-online-content");
    const mbBox = document.getElementById("options-message-content");

    // Strict tab visibility
    if (sBar) sBar.style.display = tab === "online" ? "flex" : "none";
    if (oBox) {
      oBox.style.display = tab === "online" ? "block" : "none";
      if (tab === "online") {
        syncOnlineListLayoutDisplay(); // 👈 1-Line Crown Card turant render hoga
        // fetchRealLiveLocation(); // 👈 Chrome ka live GPS permission popup trigger karega
      }
    }
    if (mBox) mBox.style.display = tab === "moves" ? "block" : "none";
    if (iBox) iBox.style.display = tab === "info" ? "block" : "none";
    if (mbBox) mbBox.style.display = tab === "anime" ? "block" : "none";
  };

  // Open & Close Buttons
  const optBtn = document.getElementById("btn-option-menu");
  const closeBtn = document.getElementById("close-options-btn");
  if (optBtn && modal) {
    const openFn = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      modal.style.display = "flex";
      switchTab("online");
      fetchRealLiveLocation();
      requestMicrophonePermission(); // 👈 Option button tap karte hi permission dialog aayega
    };
    optBtn.onclick = openFn;
    optBtn.addEventListener("touchstart", openFn, { passive: false });
  }

  if (closeBtn && modal) {
    const closeFn = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      modal.style.display = "none";
    };
    closeBtn.onclick = closeFn;
    closeBtn.addEventListener("touchstart", closeFn, { passive: false });
  }

  ["online", "moves", "info", "anime"].forEach((name) => {
    const btn = document.getElementById("tab-" + name + "-btn");
    if (btn) {
      const clickFn = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        switchTab(name);
      };
      btn.onclick = clickFn;
      btn.addEventListener("touchstart", clickFn, { passive: false });
    }
  });

  // 🔍 Live Search Box Typing & Search Button Click
  const searchInput = document.getElementById("online-search-input");
  if (searchInput) {
    searchInput.oninput = (e) => {
      syncOnlineListLayoutDisplay(e.target.value);
    };
  }
  const searchBtn = document.querySelector(".search-submit-btn");
  if (searchBtn) {
    searchBtn.onclick = (e) => {
      if (e) e.preventDefault();
      const val = searchInput ? searchInput.value : "";
      syncOnlineListLayoutDisplay(val);
      //  fetchRealLiveLocation();
    };
  }
}

setupOptionsModal();

/*function setupOptionsModal() {
  const modal = document.getElementById("options-modal");
  const poster = document.getElementById("options-bg-poster");
  const searchBar = document.getElementById("options-search-bar");
  const movesBox = document.getElementById("options-moves-content");
  const infoBox = document.getElementById("options-info-content");

  // Har button ke liye photo ka link
  const posters = {
    online: "assets/online.png",
    moves: "assets/character move.png",
    info: "assets/game info.png",
    anime: "assets/menu1.png",
  };

  window.switchTab = function (tab) {
    // Button ka red active color badlo
    document
      .querySelectorAll(".option-tab-item")
      .forEach((b) => b.classList.remove("active-option-tab"));
    const activeBtn = document.getElementById("tab-" + tab + "-btn");
    if (activeBtn) activeBtn.classList.add("active-option-tab");

    // 🖼️ Poster change karo
    if (poster && posters[tab]) {
      poster.src = posters[tab];
      // Fallback agar naam me space ka farak ho
      poster.onerror = () => {
        if (tab === "moves") poster.src = "assets/charactermove.png";
        if (tab === "info") poster.src = "assets/gameinfo.png";
      };
    }
    const onlineBox = document.getElementById("options-online-content");
    let msgBox = document.getElementById("options-message-content");
    if (searchBar) searchBar.style.display = tab === "online" ? "flex" : "none";
    if (onlineBox) {
      onlineBox.style.display = tab === "online" ? "block" : "none";
      if (
        tab === "online" &&
        typeof compileDensitySortedNetwork === "function"
      ) {
        // compileDensitySortedNetwork("Jodhpur");
        syncOnlineListLayoutDisplay();
      }
    }
    if (movesBox) movesBox.style.display = tab === "moves" ? "block" : "none";
    if (infoBox) infoBox.style.display = tab === "info" ? "block" : "none";
    if (msgBox) msgBox.style.display = tab === "anime" ? "block" : "none";*/
// Search bar sirf online me dikhega
//if (searchBar) searchBar.style.display = tab === "online" ? "flex" : "none";
//if (movesBox) movesBox.style.display = tab === "moves" ? "block" : "none";
//if (infoBox) infoBox.style.display = tab === "info" ? "block" : "none";
/*const oBox = document.getElementById("options-online-content") || onlineBox;
    const mBox = document.getElementById("options-moves-content") || movesBox;
    const iBox = document.getElementById("options-info-content") || infoBox;
    const mbBox = document.getElementById("options-message-content") || msgBox;
    const sBar = document.getElementById("options-search-bar") || searchBar;

    if (sBar) sBar.style.display = tab === "online" ? "flex" : "none";
    if (oBox) oBox.style.display = tab === "online" ? "block" : "none";
    if (mBox) mBox.style.display = tab === "moves" ? "block" : "none";
    if (iBox) iBox.style.display = tab === "info" ? "block" : "none";
    if (mbBox) mbBox.style.display = tab === "anime" ? "block" : "none";

    if (tab === "online" && typeof syncOnlineListLayoutDisplay === "function") {
      syncOnlineListLayoutDisplay();
    }
  };

  /*
  // Open & Close
  const optBtn = document.getElementById("btn-option-menu");
  const closeBtn = document.getElementById("close-options-btn");
  if (optBtn)
    optBtn.onclick = () => {
      modal.style.display = "flex";
      switchTab("online");
    };
  if (closeBtn)
    closeBtn.onclick = () => {
      modal.style.display = "none";
    };

  // 4 Buttons Touch & Click
  ["online", "moves", "info", "anime"].forEach((name) => {
    const btn = document.getElementById("tab-" + name + "-btn");
    if (btn) {
      btn.onclick = () => switchTab(name);
      btn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        switchTab(name);
      });
    }
  });
}

  // Open & Close
  const optBtn = document.getElementById("btn-option-menu");
  const closeBtn = document.getElementById("close-options-btn");
  if (optBtn && modal) {
    const openFn = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      modal.style.display = "flex";
      switchTab("online");
    };
    optBtn.onclick = openFn;
    optBtn.addEventListener("touchstart", openFn, { passive: false });
  }

  if (closeBtn && modal) {
    const closeFn = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      modal.style.display = "none";
    };
    closeBtn.onclick = closeFn;
    closeBtn.addEventListener("touchstart", closeFn, { passive: false });
  }

  ["online", "moves", "info", "anime"].forEach((name) => {
    const btn = document.getElementById("tab-" + name + "-btn");
    if (btn) {
      const clickFn = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        switchTab(name);
      };
      btn.onclick = clickFn;
      btn.addEventListener("touchstart", clickFn, { passive: false });
    }
  });
}

setupOptionsModal();*/
const searchInput = document.getElementById("online-search-input");
if (searchInput) {
  searchInput.addEventListener("focus", (e) => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
}
// Initialize on script load
// ==========================================================
// 🚄 OPTIMIZED BATTLEFIELD RAM PRELOADER (CORE ASSETS ONLY)
// ==========================================================
const ESSENTIAL_FIGHT_IMAGES = [
  // 🥋 Main Fighter Sprite Sheets
  "assets/deku.jpg",
  "assets/gokussb.jpg",
  "assets/jiren.jpg",
  "assets/itachi.jpg",
  "assets/frieza.jpg",
  "assets/gokublackssr3.png",
  "assets/sukuna.jpg",
  "assets/sasuke.png",

  // 🌆 Core Stage Parallax Elements
  "assets/bg.png",
  "assets/bg2.png",
  "assets/sky.png",
  "assets/mountains.jpg",
  "assets/trees.jpg",

  // 🎴 Live Move Cards (Malevolent Shrine / House Included)
  "assets/sukunamove1.png",
  "assets/sukunamove2.png",
  "assets/dekumove1.png",
  "assets/dekumove2.png",
  "assets/dekumove3.png",
  "assets/gokublackmove1.png",
  "assets/gokublackmove2.png",
  "assets/gokublackmove3.png",
  "assets/gokublackmove4.png",
  "assets/gokublackmove5.png",
  "assets/gokublackmove6.png",
  "assets/gokussbmove1.png",
  "assets/gokussbmove2.png",
  "assets/gokussbmove3.png",
  "assets/gokussbmove4.png",
  "assets/jirenmove1.png",
  "assets/jirenmove2.png",
  "assets/jirenmove3.png",
  "assets/itachimove1.png",
  "assets/itachimove2.png",
  "assets/itachimove3.png",
  "assets/itachimove4.png",
  "assets/itachimove5.png",
  "assets/friezamove1.png",
  "assets/friezamove2.png",
  "assets/friezamove3.png",
  "assets/friezamove4.png",
  "assets/sasukemove1.png",
  "assets/sasukemove2.jpg",
  "assets/sasukemove3.png",
];
/*
function lockFightAssetsInRam() {
  console.log("Loading core battlefield assets to GPU...");
  ESSENTIAL_FIGHT_IMAGES.forEach((src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      // 1x1 canvas buffer drawing tricks the WebView to hold pixel data in VRAM permanently
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 1;
      canvas.height = 1;
      try {
        ctx.drawImage(img, 0, 0, 1, 1);
      } catch (e) {
        console.log("RAM Lock bypassed for: " + src);
      }
    };
  });
}

// Automatic safe call without overlapping other execution loops
lockFightAssetsInRam();*/
// ==========================================================
// 🚄 PERMANENT GPU CACHE LOCK (NO MORE BLACK SCREEN BLINK)
// ==========================================================
function lockFightAssetsInRam() {
  console.log("Locking elite battlefield graphics to VRAM permanently...");
  ESSENTIAL_FIGHT_IMAGES.forEach((src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      // WebView ko force karke images ka internal raw bitmap create karein
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 1;
      canvas.height = 1;
      try {
        ctx.drawImage(img, 0, 0, 1, 1);
      } catch (e) {
        console.log("RAM Buffer skip for: " + src);
      }
    };
  });
}

// Global window trigger bina loops ko heavy kiye
lockFightAssetsInRam();
// ==========================================================================
// 🌐 REAL-TIME NATIVE GEOLOCATION, USER IDENTITY SEARCH & MULTI-LOBBY SYNC
// ==========================================================================
/*et currentOnlineUserIdentity = "Detecting Device...";
let globalNetworkPlayersDatabase = [];
let localLobbyActiveMembers = [];
let voiceMuteStateTracker = {};

// 1. Fetch Real Device Name and Physical Geolocation securely
async function fetchAndRegisterNetworkIdentity() {
  let deviceModel = "Mobile Device";
  const agent = navigator.userAgent;
  if (agent.includes("iPhone")) deviceModel = "iPhone 15";
  else if (agent.includes("Vivo")) deviceModel = "Vivo Y31";
  else if (agent.includes("Samsung")) deviceModel = "Samsung S12";
  else if (agent.includes("Oppo")) deviceModel = "Oppo Japan";
  else deviceModel = "Android Mobile";

  let detectedCity = "Jodhpur";
  try {
    const response = await fetch("https://ipapi.co/json/");
    //const response = await fetch("https://ipapi.co");
    const parsedData = await response.json();
    if (parsedData && parsedData.city) {
      detectedCity = parsedData.city;
    }
  } catch (e) {
    console.log("Network signal adjusted to regional base.");
  }

  // 🎯 TOP PROFILE LOCK: Aapki apni live ID locked
  currentOnlineUserIdentity = `${deviceModel} (${detectedCity})`;
  console.log("Your Lobby Active Node Identity:", currentOnlineUserIdentity);

  // Initial Host registration: Yellow Text bug removed, sets clean native name
  localLobbyActiveMembers.push({
    slotType: "p1",
    index: 0,
    isHost: true,
    name: "DEKU", // 👈 🔥 Ajib Yellow Text Bug Fixed: Ab seedha normal fighter name dikhega
    isNPC: false,
  });

  compileDensitySortedNetwork(detectedCity);
  if (typeof renderSlots === "function") window.renderSlots();
}

// 2. Advanced Density Sorter (Highest Active Players Always On TOP)
function compileDensitySortedNetwork(userCurrentCity) {
  globalNetworkPlayersDatabase = [];

  // Local device profile pushes directly to the absolute top of the index room
  globalNetworkPlayersDatabase.push({
    id: currentOnlineUserIdentity + " (You) 🟢",
    searchTag: userCurrentCity.toLowerCase(),
    rawLocation: userCurrentCity,
    isLocalUser: true,
  });

  const densityMatrix = [
    {
      city: "Japan",
      count: 25,
      devices: ["Iphone 15", "Oppo Japan", "Sony Xperia"],
    },
    {
      city: "Jodhpur",
      count: 12,
      devices: ["Vivo Y31", "Samsung S12", "Realme Pro"],
    },
    { city: "Jaipur", count: 8, devices: ["OnePlus", "Samsung S12", "Vivo"] },
    { city: "Gujarat", count: 6, devices: ["Iphone 14", "Oppo", "Mi"] },
    { city: "Pakistan", count: 4, devices: ["Vivo", "Redmi", "Samsung"] },
    {
      city: "Bihar",
      count: 2,
      devices: ["Oppo Mobile", "Vivo New", "Realme C2"],
    },
  ];

  densityMatrix.sort((a, b) => b.count - a.count);
  densityMatrix.forEach((hub) => {
    for (let i = 0; i < hub.count; i++) {
      let randDevice =
        hub.devices[Math.floor(Math.random() * hub.devices.length)];
      let playerUniqueId = `#${Math.floor(1000 + Math.random() * 9000)}`;
      globalNetworkPlayersDatabase.push({
        id: `${randDevice} (${hub.city})${playerUniqueId}`,
        searchTag: hub.city.toLowerCase(),
        rawLocation: hub.city,
        isLocalUser: false,
      });
    }
  });

  syncOnlineListLayoutDisplay();
}
/*
function syncOnlineListLayoutDisplay(searchFilterWord = "") {
  const overlayBox =
    document.getElementById("options-moves-content") ||
    document.querySelector(".options-text-overlay");
  if (!overlayBox) return;

  let wrapper = document.getElementById("mugen-online-scroller-panel");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "mugen-online-scroller-panel";
    wrapper.style.cssText =
      "display:flex; flex-direction:column; gap:6px; width:100%; max-height:210px; overflow-y:auto; padding:4px;";
    overlayBox.appendChild(wrapper);
  }

  wrapper.innerHTML = "";
  let queryTag = searchFilterWord.toLowerCase().trim();

  globalNetworkPlayersDatabase.forEach((player) => {
    if (
      queryTag !== "" &&
      !player.searchTag.includes(queryTag) &&
      !player.id.toLowerCase().includes(queryTag)
    )
      return;

    const rowElement = document.createElement("div");
    rowElement.style.cssText = player.isLocalUser
      ? "display:flex; justify-content:space-between; align-items:center; background:rgba(0,255,255,0.15); border:1.5px solid #00ffff; padding:6px 12px; border-radius:8px; margin-bottom:2px; box-shadow: 0 0 10px rgba(0,255,255,0.2);"
      : "display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.6); border:1px solid rgba(255,23,64,0.4); padding:6px 12px; border-radius:8px; margin-bottom:2px;";

    rowElement.innerHTML = `
                                                                                                                                                                                                                                                                                                                            <p style="margin:0; font-size:13px !important; color:#fff !important; font-family:Arial, sans-serif; text-shadow:1px 1px 2px #000;">🌐 ${player.id}</p>
                                                                                                                                                                                                                                                                                                                                  <button class="t-btn round-btn" style="width:28px !important; height:28px !important; min-width:28px !important; border-radius:50% !important; background:linear-gradient(135deg, #00ff80, #00b359) !important; color:black !important; font-size:16px !important; font-weight:bold !important; cursor:pointer !important; border:1px solid #fff !important; display:flex; align-items:center; justify-content:center;">+</button>
                                                                                                                                                                                                                                                                                                                                      `;

    const triggerAddBtn = rowElement.querySelector("button");
    if (player.isLocalUser) {
      triggerAddBtn.style.display = "none";
    } else {
      triggerAddBtn.onclick = (event) => {
        event.preventDefault();
        executeLobbyInviteJoin(player.id);
        triggerAddBtn.disabled = true;
        triggerAddBtn.style.background = "#444 !important";
        triggerAddBtn.innerText = "✓";
      };
    }

    wrapper.appendChild(rowElement);
  });
}*/

/* densityMatrix.forEach((hub) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
// 4. Multi-Lobby Client Request Injection Engine
function executeLobbyInviteJoin(incomingPlayerID) {
  let placed = false;

  // Find open index across grid pools
  for (let i = 0; i < 8; i++) {
    if (
      !localLobbyActiveMembers.some((m) => m.slotType === "p1" && m.index === i)
    ) {
      localLobbyActiveMembers.push({
        slotType: "p1",
        index: i,
        isHost: false,
        name: "SQUAD_PLAYER",
        isNPC: false,
      });
      placed = true;
      break;
    }
  }
  if (!placed) {
    for (let i = 0; i < 8; i++) {
      if (
        !localLobbyActiveMembers.some(
          (m) => m.slotType === "enemy" && m.index === i
        )
      ) {
        localLobbyActiveMembers.push({
          slotType: "enemy",
          index: i,
          isHost: false,
          name: "ENEMY_PLAYER",
          isNPC: false,
        });
        placed = true;
        break;
      }
    }
  }

  if (placed) {
    const msgBoxContainer =
      document.getElementById("options-info-content") ||
      document.getElementById("tab-info-content");
    if (msgBoxContainer) {
      const logNode = document.createElement("p");
      logNode.style.cssText =
        "border-bottom:1px solid rgba(0,255,128,0.2); padding:4px 0; margin-bottom:4px; color:#00ff80 !important;";
      logNode.innerHTML = `📩 Request processed! [<b>${incomingPlayerID}</b>] linked to selection room matrix sync channel.`;
      msgBoxContainer.appendChild(logNode);
    }
    window.renderSlots();
    buildDynamicMicMatrixLayout();
  } else {
    alert("Lobby bounds filled! Capacity reached.");
  }
}

// 5. Dynamic 8v8 Mic Matrix Controller (2, 2, 2, 2 Layout Balance)
function buildDynamicMicMatrixLayout() {
  const oldLeft = document.getElementById("mugen-left-mic-grid");
  const oldRight = document.getElementById("mugen-right-mic-grid");
  if (oldLeft) oldLeft.parentNode.removeChild(oldLeft);
  if (oldRight) oldRight.parentNode.removeChild(oldRight);

  const leftAnchor =
    document.getElementById("p1TeamSlots") ||
    document.querySelector(".team-panel");
  const rightAnchor =
    document.getElementById("enemyTeamSlots") ||
    document.querySelectorAll(".team-panel")[1];
  if (!leftAnchor || !rightAnchor) return;

  const leftGrid = document.createElement("div");
  leftGrid.id = "mugen-left-mic-grid";
  leftGrid.className = "mugen-mic-matrix-container left-side-matrix";

  const rightGrid = document.createElement("div");
  rightGrid.id = "mugen-right-mic-grid";
  rightGrid.className = "mugen-mic-matrix-container right-side-matrix";

  for (let row = 0; row < 4; row++) {
    const leftRowPair = document.createElement("div");
    leftRowPair.style.cssText =
      "display:flex; gap:6px; justify-content:flex-start; margin-bottom:4px;";

    const rightRowPair = document.createElement("div");
    rightRowPair.style.cssText =
      "display:flex; gap:6px; justify-content:flex-end; margin-bottom:4px;";

    for (let col = 0; col < 2; col++) {
      let idx = row * 2 + col;
      let leftPlayer = localLobbyActiveMembers.find(
        (m) => m.slotType === "p1" && m.index === idx && !m.isNPC
      );
      if (leftPlayer) {
        const lMic = document.createElement("div");
        lMic.id = `mic-target-left-${idx + 1}`;
        lMic.className = voiceMuteStateTracker[`p1_${idx}`]
          ? "mugen-live-mic-node muted-mic-off"
          : "mugen-live-mic-node active-mic-on";
        lMic.innerHTML = voiceMuteStateTracker[`p1_${idx}`]
          ? `🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span>`
          : `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">T${
              idx + 1
            }</span>`;
        bindMicToggleAction(lMic, `p1_${idx}`, idx + 1, "T");
        leftRowPair.appendChild(lMic);
      }

      let rightPlayer = localLobbyActiveMembers.find(
        (m) => m.slotType === "enemy" && m.index === idx && !m.isNPC
      );
      if (rightPlayer) {
        const rMic = document.createElement("div");
        rMic.id = `mic-target-right-${idx + 1}`;
        rMic.className = voiceMuteStateTracker[`enemy_${idx}`]
          ? "mugen-live-mic-node muted-mic-off"
          : "mugen-live-mic-node active-mic-on";
        rMic.innerHTML = voiceMuteStateTracker[`enemy_${idx}`]
          ? `🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span>`
          : `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">E${
              idx + 1
            }</span>`;
        bindMicToggleAction(rMic, `enemy_${idx}`, idx + 1, "E");
        //  rMic.className = voiceMuteStateTracker[enemy_${idx}] ? "mugen-live-mic-node muted-mic-off" : "mugen-live-mic-node active-mic-on";
        //   rMic.innerHTML = voiceMuteStateTracker[enemy_${idx}] ? 🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span> : 🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">E${idx + 1}</span>;
        // bindMicToggleAction(rMic, enemy_${idx}, idx + 1, "E");
        rightRowPair.appendChild(rMic);
      }
    }
    if (leftRowPair.children.length > 0) leftGrid.appendChild(leftRowPair);
    if (rightRowPair.children.length > 0) rightGrid.appendChild(rightRowPair);
  }
  leftAnchor.parentNode.insertBefore(leftGrid, leftAnchor.nextSibling);
  rightAnchor.parentNode.insertBefore(rightGrid, rightAnchor.nextSibling);
}
// 6. Real-time Voice Toggle Engine
function bindMicToggleAction(micElement, uniqueTargetKey, numId, prefix) {
  const performMuteToggle = (e) => {
    if (e) e.preventDefault();
    let isCurrentlyMuted = voiceMuteStateTracker[uniqueTargetKey] || false;
    if (!isCurrentlyMuted) {
      voiceMuteStateTracker[uniqueTargetKey] = true;
      micElement.className = "mugen-live-mic-node muted-mic-off";
      micElement.innerHTML = `🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span>`;
      //  micElement.innerHTML = `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">${prefix}${numId}</span>`;

      //  micElement.innerHTML = 🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span>;
    } else {
      voiceMuteStateTracker[uniqueTargetKey] = false;
      micElement.className = "mugen-live-mic-node active-mic-on";
      // micElement.innerHTML = `🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span>`;
      micElement.innerHTML = `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">${prefix}${numId}</span>`;

      //  micElement.innerHTML = 🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">${prefix}${numId}</span>;
    }
  };
  micElement.onclick = performMuteToggle;
}*/
// 7. Modded Slot Interaction: Protect Host selection, Allow Bot addition, Trigger Kick System
/*function overrideRosterSlotSystem() {
  window.handleSlotInteraction = function (type, i) {
    let slotMatch = localLobbyActiveMembers.find(
      (m) => m.slotType === type && m.index === i
    );
    if (slotMatch) {
      if (slotMatch.isHost) {
        alert("⚠️ ALERT: Cannot modify Host Selection!");
        return;
      }
      if (!slotMatch.isNPC) {
        let confirmKick = confirm(
          `Do you want to Kick player [${slotMatch.name}] from the arena room?`
        );

        //  let confirmKick = confirm(Do you want to Kick player [${slotMatch.name}] from the arena room?);
        if (confirmKick) {
          localLobbyActiveMembers = localLobbyActiveMembers.filter(
            (m) => !(m.slotType === type && m.index === i)
          );
          alert("Player kicked out successfully.");
          window.renderSlots();
          buildDynamicMicMatrixLayout();
        }
        return;
      } else {
        localLobbyActiveMembers = localLobbyActiveMembers.filter(
          (m) => !(m.slotType === type && m.index === i)
        );
        window.renderSlots();
        return;
      }
    }
    let addBot = confirm(
      "This slot is empty. Do you want to inject an NPC Bot fighter here?"
    );
    if (addBot) {
      localLobbyActiveMembers.push({
        slotType: type,
        index: i,
        isHost: false,
        name: botHero.name,
        isNPC: true,
      });
      window.renderSlots();
    }
  };
}*/
// 🚀 OP CODESANDBOX / HUGGING FACE HYBRID CONNECTION MANAGER
/*function setupDynamicNetworkPipeline() {
  const isOnline = navigator.onLine;

  if (isOnline) {
    console.log(
      "🟢 ONLINE NODE DETECTED: Fetching assets from Hugging Face CDN..."
    );
    // 🔗 Apne Hugging Face Static Space ka link yahan daal dena
    window.HF_CDN_URL = "https://hf.space";

    // 📡 Render Singapore Server URL Sync
    window.CUSTOM_FIGHT_SERVER_URL = "wss://://onrender.com";

    // Auto-trigger online server and permissions
    if (typeof initDedicatedFightServer === "function")
      initDedicatedFightServer();
    if (typeof requestMicrophonePermission === "function")
      requestMicrophonePermission();
  } else {
    console.log(
      "📴 OFFLINE MODE: Running completely inside Local mobile directory..."
    );
    window.HF_CDN_URL = "assets/"; // Local Mobile Storage path for AppMint APK
    window.CUSTOM_FIGHT_SERVER_URL = null; // No server load offline

    // Offline match me safe rakhne ke liye remote sync band kardo
    window.isGuestClient = false;
  }
}

// Game open hote hi aur network change hote hi auto-switch
setupDynamicNetworkPipeline();
window.addEventListener("online", setupDynamicNetworkPipeline);
window.addEventListener("offline", setupDynamicNetworkPipeline);*/

// ==========================================================================
// 🌐 REAL LIVE LOCATION, MESSAGE NOTIFICATIONS & P2P REAL BACKEND
// ==========================================================================
// ==========================================================================
// 🌐 REAL LIVE LOCATION, MESSAGE NOTIFICATIONS & P2P REAL BACKEND
// ==========================================================================
function getDeviceBrand() {
  const ua = navigator.userAgent || "";
  if (ua.includes("iPhone")) return "iPhone";
  if (ua.includes("iPad")) return "iPad";
  if (ua.includes("Vivo")) return "Vivo";
  if (ua.includes("Samsung")) return "Samsung";
  if (ua.includes("Oppo")) return "Oppo";
  if (ua.includes("OnePlus")) return "OnePlus";
  if (ua.includes("Redmi") || ua.includes("Xiaomi")) return "Redmi";
  if (ua.includes("Realme")) return "Realme";
  if (ua.includes("Android")) return "Android Mobile";
  return "Player Device";
}

let currentOnlineUserCity = "Detecting Location...";
let currentOnlineUserIdentity = `${getDeviceBrand()} (Detecting Location...)`;
window.myRoomCode =
  window.myRoomCode || String(Math.floor(1000 + Math.random() * 9000));
let localLobbyActiveMembers = [];
let peerNode = null;
let activePeerConnections = [];
// 🚀 APNA RENDER.COM SERVER LINK YAHAN DAALO (https ki jagah wss lagana):
window.CUSTOM_FIGHT_SERVER_URL = "wss://fairy-tail-server.onrender.com";
window.connectedHostRoomCode = null;
let dedicatedFightSocket = null;

function initDedicatedFightServer() {
  if (!window.CUSTOM_FIGHT_SERVER_URL) return;
  if (
    dedicatedFightSocket &&
    (dedicatedFightSocket.readyState === 0 ||
      dedicatedFightSocket.readyState === 1)
  )
    return;
  try {
    dedicatedFightSocket = new WebSocket(window.CUSTOM_FIGHT_SERVER_URL);
    dedicatedFightSocket.onopen = () => {
      if (window.isHost) {
        dedicatedFightSocket.send(
          JSON.stringify({
            type: "host_create_room",
            roomCode: window.myRoomCode,
            myTeam: mySelectedTeam,
            enemyTeam: enemySelectedTeam,
            members: localLobbyActiveMembers,
          })
        );
      }
    };
    dedicatedFightSocket.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        if (data && data.type === "cloud_coprocessor_sync") {
          if (data.targetMap) window._cloudTargetCache = data.targetMap;
          return;
        }

        if (window.isHost) {
          handleHostReceivedData(
            { peer: data.guestId || data.roomCode || "ws_guest" },
            data
          );
        } else if (window.isGuestClient) {
          handleGuestReceivedData(data);
        }
      } catch (e) {}
    };
    dedicatedFightSocket.onclose = () => {
      setTimeout(initDedicatedFightServer, 3000);
    };
  } catch (e) {}
}

/*function sendToHostRoom(packet) {
  if (dedicatedFightSocket && dedicatedFightSocket.readyState === 1) {
    try {
      let wsPacket = { ...packet };
      if (wsPacket.type === "join_request") {
        wsPacket.type = "guest_join_request";
        wsPacket.roomCode = window.connectedHostRoomCode;
      }
      dedicatedFightSocket.send(JSON.stringify(wsPacket));
    } catch (e) {}
  }
  if (
    lobbyMqttClient &&
    lobbyMqttClient.connected &&
    window.connectedHostRoomCode
  ) {
    try {
      lobbyMqttClient.publish(
        "legend_of_fairy_tail/room/" +
          window.connectedHostRoomCode +
          "/to_host",
        JSON.stringify(packet)
      );
    } catch (e) {}
  }
  if (window.activeGuestConn && window.activeGuestConn.open) {
    try {
      window.activeGuestConn.send(packet);
    } catch (e) {}
  }
}

function sendToAllGuests(packet) {
  if (dedicatedFightSocket && dedicatedFightSocket.readyState === 1) {
    try {
      dedicatedFightSocket.send(JSON.stringify(packet));
    } catch (e) {}
  }
  if (lobbyMqttClient && lobbyMqttClient.connected && window.myRoomCode) {
    try {
      lobbyMqttClient.publish(
        "legend_of_fairy_tail/room/" + window.myRoomCode + "/to_guests",
        JSON.stringify(packet)
      );
    } catch (e) {}
  }
  if (activePeerConnections && activePeerConnections.length > 0) {
    activePeerConnections.forEach((conn) => {
      try {
        if (conn && conn.open) conn.send(packet);
      } catch (e) {}
    });
  }
}*/
window._seenPktIds = new Set();
function makeUniquePkt(packet) {
  window._pktSeq = (window._pktSeq || 0) + 1;
  return {
    ...packet,
    pktId: window.myRoomCode + "_" + Date.now() + "_" + window._pktSeq,
  };
}
function isDuplicatePkt(data) {
  if (!data || !data.pktId) return false;
  if (window._seenPktIds.has(data.pktId)) return true;
  window._seenPktIds.add(data.pktId);
  if (window._seenPktIds.size > 400) {
    const first = window._seenPktIds.values().next().value;
    window._seenPktIds.delete(first);
  }
  return false;
}

function sendToHostRoom(packet) {
  const pkt = makeUniquePkt({ ...packet, guestId: window.myRoomCode });
  if (pkt.type === "player_input") {
    if (window.activeGuestConn && window.activeGuestConn.open) {
      try {
        window.activeGuestConn.send(pkt);
        return;
      } catch (e) {}
    }
    if (dedicatedFightSocket && dedicatedFightSocket.readyState === 1) {
      try {
        dedicatedFightSocket.send(JSON.stringify(pkt));
        return;
      } catch (e) {}
    }
    if (
      lobbyMqttClient &&
      lobbyMqttClient.connected &&
      window.connectedHostRoomCode
    ) {
      try {
        lobbyMqttClient.publish(
          "legend_of_fairy_tail/room/" +
            window.connectedHostRoomCode +
            "/to_host",
          JSON.stringify(pkt)
        );
      } catch (e) {}
    }
    return;
  }

  if (dedicatedFightSocket && dedicatedFightSocket.readyState === 1) {
    try {
      let wsPacket = { ...pkt };
      // if (wsPacket.type === "join_request") {
      //wsPacket.type = "guest_join_request";
      if (
        wsPacket.type === "join_request" ||
        wsPacket.type === "rejoin_match_request"
      ) {
        wsPacket.senderRoomCode = window.myRoomCode;
        if (wsPacket.type === "join_request")
          wsPacket.type = "guest_join_request";

        wsPacket.roomCode = window.connectedHostRoomCode;
      }
      dedicatedFightSocket.send(JSON.stringify(wsPacket));
    } catch (e) {}
  }
  if (
    lobbyMqttClient &&
    lobbyMqttClient.connected &&
    window.connectedHostRoomCode
  ) {
    try {
      lobbyMqttClient.publish(
        "legend_of_fairy_tail/room/" +
          window.connectedHostRoomCode +
          "/to_host",
        JSON.stringify(pkt)
      );
    } catch (e) {}
  }
  if (window.activeGuestConn && window.activeGuestConn.open) {
    try {
      window.activeGuestConn.send(pkt);
    } catch (e) {}
  }
}

function sendToAllGuests(packet) {
  const pkt = makeUniquePkt(packet);
  if (pkt.type === "game_state_sync") {
    let openPeers = (activePeerConnections || []).filter((c) => c && c.open);
    if (openPeers.length > 0) {
      openPeers.forEach((conn) => {
        try {
          conn.send(pkt);
        } catch (e) {}
      });
      return;
    }
    if (dedicatedFightSocket && dedicatedFightSocket.readyState === 1) {
      try {
        dedicatedFightSocket.send(JSON.stringify(pkt));
        return;
      } catch (e) {}
    }
    if (lobbyMqttClient && lobbyMqttClient.connected && window.myRoomCode) {
      try {
        lobbyMqttClient.publish(
          "legend_of_fairy_tail/room/" + window.myRoomCode + "/to_guests",
          JSON.stringify(pkt)
        );
      } catch (e) {}
    }
    return;
  }

  if (dedicatedFightSocket && dedicatedFightSocket.readyState === 1) {
    try {
      dedicatedFightSocket.send(JSON.stringify(pkt));
    } catch (e) {}
  }
  if (lobbyMqttClient && lobbyMqttClient.connected && window.myRoomCode) {
    try {
      lobbyMqttClient.publish(
        "legend_of_fairy_tail/room/" + window.myRoomCode + "/to_guests",
        JSON.stringify(pkt)
      );
    } catch (e) {}
  }
  if (activePeerConnections && activePeerConnections.length > 0) {
    activePeerConnections.forEach((conn) => {
      try {
        if (conn && conn.open) conn.send(pkt);
      } catch (e) {}
    });
  }
}

// 📩 Real Messages Only (Faltu Text Deleted):
function addRoomMessageLog(text) {
  let container = document.getElementById("options-message-content");
  if (!container) return;
  const p = document.createElement("p");
  p.style.cssText =
    "border-bottom:1px solid rgba(0,255,128,0.25); padding:6px 0; margin:4px 0; color:#00ff80 !important; font-size:13px; font-family:Arial, sans-serif; text-shadow:1px 1px 2px #000;";
  p.innerHTML = text;
  container.appendChild(p);
}
/*function addRoomMessageLog(text) {
  let container = document.getElementById("mugen-message-logs");
  if (!container) {
    let msgBox = document.getElementById("options-message-content");
    if (msgBox) {
      container = document.createElement("div");
      container.id = "mugen-message-logs";
      container.style.cssText = "display:flex; flex-direction:column; gap:6px;";
      msgBox.appendChild(container);
    }
  }
  if (container) {
    const p = document.createElement("p");
    p.style.cssText =
      "border-bottom:1px solid rgba(0,255,128,0.25); padding:6px 0; margin:4px 0; color:#00ff80 !important; font-size:13px; font-family:Arial, sans-serif; text-shadow:1px 1px 2px #000;";
    p.innerHTML = text;
    container.appendChild(p);
  }
}*/
async function fetchRealLiveLocation() {
  let liveLoc = "";

  if (navigator.geolocation) {
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 30000,
        });
      });
      if (pos && pos.coords) {
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`
        );
        const geo = await res.json();
        if (geo && (geo.city || geo.locality)) {
          liveLoc = geo.city || geo.locality;
        }
      }
    } catch (e) {}
  }

  if (!liveLoc) {
    try {
      const res = await fetch("https://ipwho.is/");
      const d = await res.json();
      if (d && d.success && d.city) {
        if (d.city === "Jaipur" && d.region === "Rajasthan") {
          liveLoc = "Jodhpur, Rajasthan";
        } else {
          liveLoc = `${d.city}, ${d.region || d.country}`;
        }
      }
    } catch (e) {
      try {
        const res2 = await fetch("https://ipapi.co/json/");
        const d2 = await res2.json();
        if (d2 && d2.city) {
          liveLoc =
            d2.city === "Jaipur" && d2.region === "Rajasthan"
              ? "Jodhpur, Rajasthan"
              : `${d2.city}, ${d2.region || d2.country_name || ""}`.trim();
        }
      } catch (err) {}
    }
  }

  if (!liveLoc) liveLoc = "Jodhpur, Rajasthan";
  currentOnlineUserCity = liveLoc;
  currentOnlineUserIdentity = `${getDeviceBrand()} (${liveLoc})`;

  // High-entropy Client Hints for exact phone name:
  if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
    navigator.userAgentData
      .getHighEntropyValues(["model"])
      .then((ua) => {
        if (ua && ua.model && ua.model.trim()) {
          currentOnlineUserIdentity = `${ua.model.trim()} (${currentOnlineUserCity})`;
          syncOnlineListLayoutDisplay();
        }
      })
      .catch(() => {});
  }

  syncOnlineListLayoutDisplay();
  return liveLoc;
}

/*async function fetchRealLiveLocation() {
  let liveLoc = "";

  if (navigator.geolocation) {
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 3000,
          maximumAge: 60000,
        });
      });
      if (pos && pos.coords) {
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`
        );
        const geo = await res.json();
        if (geo && (geo.city || geo.locality || geo.countryName)) {
          liveLoc = geo.city || geo.locality || geo.countryName;
        }
      }
    } catch (e) {}
  }

  if (!liveLoc) {
    try {
      const res = await fetch("https://ipwho.is/");
      const d = await res.json();
      if (d && d.success && d.city) liveLoc = `${d.city}, ${d.country}`;
    } catch (e) {
      try {
        const res2 = await fetch("https://ipapi.co/json/");
        const d2 = await res2.json();
        if (d2 && d2.city)
          liveLoc = `${d2.city}, ${d2.country_name || ""}`.trim();
      } catch (err) {}
    }
  }

  if (!liveLoc) {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) {
        if (tz.includes("Tokyo")) liveLoc = "Tokyo, Japan";
        else if (tz.includes("Kolkata")) liveLoc = "India";
        else liveLoc = tz.split("/")[1] || tz;
      }
    } catch (e) {}
  }

  if (!liveLoc) liveLoc = "Online Node";
  currentOnlineUserCity = liveLoc;
  currentOnlineUserIdentity = `${getDeviceBrand()} (${liveLoc})`;
  syncOnlineListLayoutDisplay();
  return liveLoc;
}*/
// 🎤 Real Microphone Access Engine (Chrome & AppMint APK Support)
async function requestMicrophonePermission() {
  if (window.localAudioStream) return window.localAudioStream;
  if (window._micRequestInProgress) return null;
  window._micRequestInProgress = true;

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: { ideal: true },
          noiseSuppression: { ideal: true },
          autoGainControl: { ideal: false }, // 👈 False rakhne se fan aur room ki hawa amplify nahi hogi!
          channelCount: 1,
        },
      });

      // Default Mic OFF rakho taaki bina bole room ka fan/ghost sound kabhi na jaye:
      stream.getAudioTracks().forEach((track) => {
        track.enabled = false;
      });
      voiceMuteStateTracker["p1_0"] = true;
      voiceMuteStateTracker["enemy_0"] = true;

      window.localAudioStream = stream;
      if (!window._micMsgLoggedOnce) {
        window._micMsgLoggedOnce = true;
        addRoomMessageLog(
          "🎤 <b>Microphone Ready:</b> Noise Block ON (Tap 🎤 icon on screen to speak)."
        );
      }
      window._micRequestInProgress = false;
      return stream;
    } catch (err) {
      window._micRequestInProgress = false;
    }
  }
  return null;
}

/*async function requestMicrophonePermission() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      window.localAudioStream = stream;
      addRoomMessageLog("🎤 <b>Microphone:</b> Voice chat access enabled.");
      return stream;
    } catch (err) {
      console.log("Microphone access declined or unavailable:", err);
    }
  }
  return null;
}*/
/*
async function requestMicrophonePermission() {
  if (window.localAudioStream) return window.localAudioStream;
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const rawStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false,
          channelCount: 1,
          sampleRate: 16000,
        },
      });

      let finalStream = rawStream;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const source = ctx.createMediaStreamSource(rawStream);

          const highPass = ctx.createBiquadFilter();
          highPass.type = "highpass";
          highPass.frequency.value = 350; // Pankhe ka sound 100% cut

          const lowPass = ctx.createBiquadFilter();
          lowPass.type = "lowpass";
          lowPass.frequency.value = 3000; // Machhar / room hiss cut

          const analyser = ctx.createAnalyser();
          // analyser.fftSize = 256;
          analyser.fftSize = 128;
          const gateGain = ctx.createGain();
          gateGain.gain.value = 0;

          source.connect(highPass);
          highPass.connect(lowPass);
          lowPass.connect(analyser);
          lowPass.connect(gateGain);

          const dest = ctx.createMediaStreamDestination();
          gateGain.connect(dest);

          const pcmData = new Uint8Array(analyser.frequencyBinCount);
          if (window._micGateInterval) clearInterval(window._micGateInterval);
          window._micGateInterval = setInterval(() => {
            analyser.getByteFrequencyData(pcmData);
            let sum = 0;
            for (let i = 0; i < pcmData.length; i++) sum += pcmData[i];
            let avg = sum / pcmData.length;
            gateGain.gain.setTargetAtTime(
              avg > 15 ? 1.0 : 0.0,
              ctx.currentTime,
              0.02
            );
          }, 30);

          finalStream = dest.stream;
        }
      } catch (e) {
        console.log("WebAudio optimization bypassed, using safe mono stream.");
      }

      window.localAudioStream = finalStream;
      addRoomMessageLog(
        "🎤 <b>Microphone:</b> Close-Range Voice Filter ON (Fan & Room Noise Blocked)."
      );
      return finalStream;
    } catch (err) {
      console.log("Microphone access declined or unavailable:", err);
    }
  }
  return null;
}*/

/*async function requestMicrophonePermission() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      window.localAudioStream = stream;
      addRoomMessageLog(
        "🎤 <b>Microphone:</b> Voice chat access enabled (Echo-Cancellation ON)."
      );
      return stream;
    } catch (err) {
      console.log("Microphone access declined or unavailable:", err);
    }
  }
  return null;
}*/

// 🔔 1. Screen Floating Notification
function showScreenNotification(text) {
  let toast = document.getElementById("game-screen-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "game-screen-toast";
    toast.style.cssText =
      "position:fixed; top:20px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.92); border:2px solid #00ff80; color:#fff; font-family:Arial, sans-serif; font-size:13px; font-weight:bold; padding:8px 20px; border-radius:24px; box-shadow:0 0 20px #00ff80; z-index:99999; pointer-events:none; transition:all 0.3s ease; text-align:center; text-shadow:1px 1px 2px #000;";
    document.body.appendChild(toast);
  }
  toast.innerHTML = text;
  toast.style.display = "block";
  toast.style.opacity = "1";
  clearTimeout(window.screenToastTimer);
  window.screenToastTimer = setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      if (toast) toast.style.display = "none";
    }, 300);
  }, 4000);
}

// 🔊 Remote Audio Stream (Per-Player Local Mute Support)
/*
function attachRemoteAudioStream(peerId, remoteStream) {
  let audio = document.getElementById("remoteAudio_" + peerId);
  if (!audio) {
    audio = document.createElement("audio");
    audio.id = "remoteAudio_" + peerId;
    audio.autoplay = true;
    document.body.appendChild(audio);
  }
  audio.srcObject = remoteStream;
  audio.muted = false;
  audio.play().catch(() => {});
}*/
/*
function attachRemoteAudioStream(peerId, remoteStream) {
  let audio = document.getElementById("remoteAudio_" + peerId);
  if (!audio) {
    audio = document.createElement("audio");
    audio.id = "remoteAudio_" + peerId;
    audio.autoplay = true;
    document.body.appendChild(audio);
  }
  audio.srcObject = remoteStream;
  audio.volume = 0.3; // 👈 3x kam speaker volume (No horror feedback loop!)
  audio.muted = false;
  audio.play().catch(() => {});
}*/
// 📍 Location: script.js (Line ~14845)
window.masterVoiceVolume = 1.0;
function attachRemoteAudioStream(peerId, remoteStream) {
  if (!remoteStream) return;
  let audio = document.getElementById("remoteAudio_" + peerId);
  if (!audio) {
    audio = document.createElement("audio");
    audio.id = "remoteAudio_" + peerId;
    audio.autoplay = true;
    audio.playsInline = true;
    document.body.appendChild(audio);
  }
  audio.srcObject = remoteStream;
  audio.volume = window.masterVoiceVolume;
  audio.muted = window.masterVoiceVolume <= 0.01;

  // 🔊 WebAudio Media Routing (Taaki Phone ke Volume Down button se 100% 0 आवाज band ho sake!):
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx && !audio._gainNode) {
      const ctx =
        window._sharedVoiceCtx || (window._sharedVoiceCtx = new AudioCtx());
      if (ctx.state === "suspended") ctx.resume();
      const src = ctx.createMediaStreamSource(remoteStream);
      const gain = ctx.createGain();
      gain.gain.value = window.masterVoiceVolume;
      src.connect(gain);
      gain.connect(ctx.destination);
      audio._gainNode = gain;
      audio.muted = true; // Raw WebRTC call speaker band, ab Media Speaker se chalega!
    }
  } catch (e) {}

  const startPlay = () => {
    if (
      window._sharedVoiceCtx &&
      window._sharedVoiceCtx.state === "suspended"
    ) {
      window._sharedVoiceCtx.resume();
    }
    audio.play().catch(() => {});
  };
  startPlay();
  document.addEventListener("touchstart", startPlay, { once: true });
}

// 🔉 Phone Volume Up/Down Key Interceptor (Volume kam karte hi 0% par poori aawaz band hogi):
window.addEventListener("keydown", (e) => {
  if (e.key === "AudioVolumeDown" || e.keyCode === 174) {
    window.masterVoiceVolume = Math.max(
      0,
      (window.masterVoiceVolume || 1) - 0.2
    );
    if (window.masterVoiceVolume <= 0.05) window.masterVoiceVolume = 0; // 🔇 100% Mute!
    document.querySelectorAll("audio[id^='remoteAudio_']").forEach((a) => {
      a.volume = window.masterVoiceVolume;
      a.muted = window.masterVoiceVolume === 0;
      if (a._gainNode) a._gainNode.gain.value = window.masterVoiceVolume;
    });
  } else if (e.key === "AudioVolumeUp" || e.keyCode === 175) {
    window.masterVoiceVolume = Math.min(
      1,
      (window.masterVoiceVolume || 0) + 0.2
    );
    document.querySelectorAll("audio[id^='remoteAudio_']").forEach((a) => {
      a.volume = window.masterVoiceVolume;
      a.muted = false;
      if (a._gainNode) a._gainNode.gain.value = window.masterVoiceVolume;
    });
  }
});
//ync function requestMicrophonePermission()
function initRealPeerNetwork() {
  if (typeof Peer === "undefined") {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js";
    script.onload = () => initRealPeerNetwork();
    document.head.appendChild(script);
    return;
  }
  if (peerNode) return;

  const hostPeerRoomId = "mugen-room-" + window.myRoomCode;
  try {
    peerNode = new Peer(hostPeerRoomId);
    peerNode.on("open", () => {
      addRoomMessageLog(
        `🟢 <b>[SYSTEM NODE]:</b> Lobby Active | Room Code: <b>#${window.myRoomCode}</b> | P2P Ready`
      );
      syncOnlineListLayoutDisplay();
    });

    peerNode.on("connection", (conn) => {
      activePeerConnections.push(conn);
      conn.on("data", (data) => handleHostReceivedData(conn, data));
      conn.on("close", () => {
        activePeerConnections = activePeerConnections.filter((c) => c !== conn);
        addRoomMessageLog(`⚠️ Remote player disconnected.`);
      });
    });

    peerNode.on("call", (call) => {
      call.answer(window.localAudioStream || null);
      call.on("stream", (remoteStream) => {
        attachRemoteAudioStream(call.peer, remoteStream);
      });
    });

    peerNode.on("error", (err) => {
      if (err.type === "unavailable-id") {
        window.myRoomCode = String(Math.floor(1000 + Math.random() * 9000));
        peerNode = null;
        initRealPeerNetwork();
      }
    });
  } catch (e) {}
}

// 📡 HOST: Join Request Handler (16 Member Full Check, Bot Replace, Separate Slots)
function handleHostReceivedData(conn, data) {
  //if (!data) return;
  if (!data || isDuplicatePkt(data)) return;
  //if (data.type === "join_request") {
  if (data.type === "join_request" || data.type === "rejoin_match_request") {
    let pLabel = data.playerName || "Friend";
    let rCode = data.roomCode ? ` (Room #${data.roomCode})` : "";

    // 🛡️ 1. LOBBY 16 MEMBER FULL CHECK (NO POPUP, ONLY MESSAGE LOG):
    let realMembersCount = localLobbyActiveMembers.filter(
      (m) => !m.isNPC
    ).length;
    let isFull = realMembersCount >= 16;

    if (isFull) {
      addRoomMessageLog(
        `📩 <b>[${pLabel}]</b>${rCode} tried to join, but your lobby is FULL (16/16).`
      );
      try {
        conn.send({
          type: "room_full",
          message: "⚠️ Lobby is FULL (16/16 Slots)! You cannot join right now.",
        });
      } catch (e) {}
      return;
    }
    // 📍 Location: script.js (Line ~14975 - inside join_request before gameStarted block)
    let returningFighter = localLobbyActiveMembers.find(
      (m) =>
        !m.isNPC &&
        (m.roomCode === data.roomCode || m.playerName === data.playerName)
    );
    if (gameStarted && returningFighter) {
      conn.send({
        type: "rejoin_active_match",
        message: "⚔️ Your match is still in progress! Entering battlefield...",
        myTeam: mySelectedTeam,
        enemyTeam: enemySelectedTeam,
        members: localLobbyActiveMembers,
      });
      return;
    }

    // 🛑 2. IN-GAME MATCH PROTECTION:
    if (typeof gameStarted !== "undefined" && gameStarted) {
      showScreenNotification(
        `📢 [${pLabel}]${rCode} tried to join, but you are in battle!`
      );
      addRoomMessageLog(
        `📢 <b>[${pLabel}]</b>${rCode} wants to join, but your match is in progress.`
      );
      try {
        conn.send({
          type: "host_in_game",
          message:
            "⚠️ Host is currently in a battle! Please wait for them to finish.",
        });
      } catch (e) {}
      return;
    }

    // 🛡️ 3. ANTI-DUPLICATE CHECK:
    let existingMember = localLobbyActiveMembers.find(
      (m) =>
        (data.peerId && m.peerId === data.peerId) ||
        (data.roomCode && m.roomCode === data.roomCode) ||
        (data.playerName && m.playerName === data.playerName)
    );

    if (existingMember) {
      conn.send({
        type: "join_accepted",
        assignedSlot: existingMember.index,
        assignedTeam: existingMember.slotType,
        myTeam: mySelectedTeam,
        enemyTeam: enemySelectedTeam,
        members: localLobbyActiveMembers,
      });
      return;
    }

    // 🎯 4. SMART SLOT ALLOCATION (Enemy first, Bot Replacement, Separate Slots 1 to 8):
    let placed = false,
      targetTeam = "enemy",
      targetIdx = -1;

    // A. Khali Enemy slot dhoondho (1 to 8):
    for (let i = 0; i < 8; i++) {
      if (!enemySelectedTeam[i]) {
        targetTeam = "enemy";
        targetIdx = i;
        placed = true;
        break;
      }
    }

    // B. Agar khali na ho par Enemy mein BOT ho, toh BOT ko replace karo:
    if (!placed) {
      for (let i = 0; i < 8; i++) {
        let isBot = localLobbyActiveMembers.some(
          (m) => m.slotType === "enemy" && m.index === i && m.isNPC
        );
        if (isBot) {
          localLobbyActiveMembers = localLobbyActiveMembers.filter(
            (m) => !(m.slotType === "enemy" && m.index === i)
          );
          targetTeam = "enemy";
          targetIdx = i;
          placed = true;
          break;
        }
      }
    }

    // C. Agar Enemy Team 8 real players se full ho, toh Team A (Dost team) me slot do:
    if (!placed) {
      for (let i = 1; i < 8; i++) {
        if (!mySelectedTeam[i]) {
          targetTeam = "p1";
          targetIdx = i;
          placed = true;
          break;
        }
      }
    }

    // D. Agar Team A mein BOT ho toh Team A ke BOT ko replace karo:
    if (!placed) {
      for (let i = 1; i < 8; i++) {
        let isBot = localLobbyActiveMembers.some(
          (m) => m.slotType === "p1" && m.index === i && m.isNPC
        );
        if (isBot) {
          localLobbyActiveMembers = localLobbyActiveMembers.filter(
            (m) => !(m.slotType === "p1" && m.index === i)
          );
          targetTeam = "p1";
          targetIdx = i;
          placed = true;
          break;
        }
      }
    }

    if (placed) {
      const hero = data.hero || rosterData[1] || rosterData[0];
      if (targetTeam === "p1") mySelectedTeam[targetIdx] = hero;
      else enemySelectedTeam[targetIdx] = hero;

      localLobbyActiveMembers.push({
        slotType: targetTeam,
        index: targetIdx,
        isHost: false,
        name: hero.name,
        playerName: data.playerName || "Friend",
        city: data.city || "Online",
        peerId: conn.peer,
        roomCode: data.roomCode || "",
        isNPC: false,
      });

      addRoomMessageLog(
        `📩 <b>[${pLabel}]</b>${rCode} joined <b>${
          targetTeam === "p1" ? "Team A" : "Team B"
        } Slot #${targetIdx + 1}</b>!`
      );
      showScreenNotification(`⚔️ [${pLabel}]${rCode} Joined Room!`);

      window.renderSlots();
      buildDynamicMicMatrixLayout();
      syncOnlineListLayoutDisplay();

      if (window.localAudioStream && peerNode) {
        let call = peerNode.call(conn.peer, window.localAudioStream);
        if (call) {
          call.on("stream", (remoteStream) => {
            attachRemoteAudioStream(conn.peer, remoteStream);
          });
        }
      }

      conn.send({
        type: "join_accepted",
        assignedSlot: targetIdx,
        assignedTeam: targetTeam,
        myTeam: mySelectedTeam,
        enemyTeam: enemySelectedTeam,
        members: localLobbyActiveMembers,
      });

      broadcastLobbyState();
    }
  } else if (data.type === "guest_lobby_update") {
    if (Array.isArray(data.myTeam)) mySelectedTeam = data.myTeam;
    if (Array.isArray(data.enemyTeam)) enemySelectedTeam = data.enemyTeam;
    if (Array.isArray(data.members)) localLobbyActiveMembers = data.members;
    window.renderSlots();
    updateCardSelection(activeCardIndex);
    buildDynamicMicMatrixLayout();
    broadcastLobbyState();
  } else if (data.type === "guest_pick_hero") {
    if (data.targetTeam === "enemy" && enemySelectedTeam.length < 8)
      enemySelectedTeam.push(data.hero);
    else if (data.targetTeam === "p1" && mySelectedTeam.length < 8)
      mySelectedTeam.push(data.hero);
    window.renderSlots();
    broadcastLobbyState();
  } /*else if (data.type === "player_input") {
    let targetFighter = teamBFighters[0];
    if (!targetFighter || targetFighter.health <= 0) return;
    if (data.action === "punch") targetFighter.punch();
    else if (data.action === "kick") targetFighter.kick();
    else if (data.action === "jump") targetFighter.jump();
    else if (data.action === "kiBlast") targetFighter.kiBlast();
    else if (data.action === "move") {
      targetFighter.moveLeft = data.moveLeft || false;
      targetFighter.moveRight = data.moveRight || false;
      targetFighter.moveUp = data.moveUp || false;
      targetFighter.moveDown = data.moveDown || false;
      if (data.isBlocking) targetFighter.block();
    }
  }*/ else if (data.type === "guest_ready_state") {
    /* else if (data.type === "player_input") {
    let member = localLobbyActiveMembers.find((m) => m.peerId === conn.peer);
    let targetFighter = null;
    if (member) {
      targetFighter =
        member.slotType === "p1"
          ? teamAFighters[member.index]
          : teamBFighters[member.index];
    }
    if (!targetFighter) targetFighter = teamBFighters[0];
    if (!targetFighter || targetFighter.health <= 0) return;

    if (data.action === "punch") targetFighter.punch();
    else if (data.action === "kick") targetFighter.kick();
    else if (data.action === "jump") targetFighter.jump();
    else if (data.action === "kiBlast") targetFighter.kiBlast();
    else if (data.action === "smashPunch") targetFighter.smashPunch();
    else if (data.action === "hellPunch") targetFighter.hellPunch();
    else if (data.action === "smashKick") targetFighter.smashKick();
    else if (data.action === "hellKick") targetFighter.hellKick();
    else if (data.action === "mediumAttack") targetFighter.mediumAttack();
    else if (data.action === "hellAttack") targetFighter.hellAttack();
    else if (data.action === "kamehameha") targetFighter.kamehameha();
    else if (data.action === "bigKamehameha") targetFighter.bigKamehameha();
    else if (data.action === "fireBallAttack") targetFighter.fireBallAttack();
    else if (data.action === "fireStyleAttack") targetFighter.fireStyleAttack();
    else if (data.action === "extraAttack") targetFighter.extraAttack();
    else if (data.action === "dash") targetFighter.dash();
    else if (data.action === "teleport") targetFighter.teleport();
    else if (data.action === "block") targetFighter.block();
    else if (data.action === "kiCharge") targetFighter.kiCharge();
    else if (data.action === "move") {
      targetFighter.moveLeft = data.moveLeft || false;
      targetFighter.moveRight = data.moveRight || false;
      targetFighter.moveUp = data.moveUp || false;
      targetFighter.moveDown = data.moveDown || false;
      if (data.isBlocking) targetFighter.block();
    }
  }*/
    let gCode = data.roomCode || data.guestId || "";
    let member = localLobbyActiveMembers.find(
      (m) =>
        !m.isNPC &&
        !m.isHost &&
        (m.peerId === conn.peer || (gCode && m.roomCode === gCode))
    );
    if (!member) {
      member = localLobbyActiveMembers.find((m) => !m.isNPC && !m.isHost);
    }
    if (member) {
      member.isReady = Boolean(data.ready);
      let pLabel = member.playerName || data.playerName || "Player";
      showScreenNotification(
        member.isReady
          ? `🟢 [${pLabel}] is READY! Click START to begin!`
          : `⏳ [${pLabel}] is selecting fighters...`
      );
      window.renderSlots();
      broadcastLobbyState();
    }
  } else if (data.type === "return_to_lobby") {
    sendToAllGuests({ type: "return_to_lobby" });
    returnToSelectScreen();
  } else if (data.type === "player_input") {
    let gCode = data.roomCode || data.guestId || "";
    let member = localLobbyActiveMembers.find(
      (m) =>
        !m.isNPC &&
        !m.isHost &&
        (m.peerId === conn.peer || (gCode && m.roomCode === gCode))
    );
    let targetFighter = null;
    if (member) {
      targetFighter =
        member.slotType === "p1"
          ? teamAFighters[member.index]
          : teamBFighters[member.index];
    }
    if (!targetFighter) targetFighter = teamBFighters[0];
    if (!targetFighter || targetFighter.health <= 0) return;

    if (data.action === "punch") targetFighter.punch();
    else if (data.action === "kick") targetFighter.kick();
    else if (data.action === "jump") targetFighter.jump();
    else if (data.action === "kiBlast") targetFighter.kiBlast();
    else if (data.action === "smashPunch") targetFighter.smashPunch();
    else if (data.action === "hellPunch") targetFighter.hellPunch();
    else if (data.action === "smashKick") targetFighter.smashKick();
    else if (data.action === "hellKick") targetFighter.hellKick();
    else if (data.action === "mediumAttack") targetFighter.mediumAttack();
    else if (data.action === "hellAttack") targetFighter.hellAttack();
    else if (data.action === "kamehameha") targetFighter.kamehameha();
    else if (data.action === "bigKamehameha") targetFighter.bigKamehameha();
    else if (data.action === "fireBallAttack") targetFighter.fireBallAttack();
    else if (data.action === "fireStyleAttack") targetFighter.fireStyleAttack();
    else if (data.action === "extraAttack") targetFighter.extraAttack();
    else if (data.action === "dash") {
      targetFighter.isEnemyDashing = true;
      targetFighter.dash();
    } else if (data.action === "stopDash") {
      targetFighter.isEnemyDashing = false;
      if (targetFighter.state === "dash") {
        targetFighter.isAttacking = false;
        targetFighter.setState(targetFighter.jumping ? "jump" : "idle");
      }
    } else if (data.action === "teleport") {
      targetFighter.teleport();
    } else if (data.action === "instantTransmission") {
      let t = getSmartTarget(targetFighter);
      targetFighter.instantTransmission(t);
    } else if (data.action === "block") {
      targetFighter.block();
    } else if (data.action === "kiCharge") {
      targetFighter.kiCharge();
    } else if (data.action === "stopCharge") {
      targetFighter.isCharging = false;
      if (targetFighter.state === "kiCharge") {
        targetFighter.isAttacking = false;
        targetFighter.setState("idle");
      }
    } else if (data.action === "move") {
      targetFighter.moveLeft = data.moveLeft || false;
      targetFighter.moveRight = data.moveRight || false;
      targetFighter.moveUp = data.moveUp || false;
      targetFighter.moveDown = data.moveDown || false;
      targetFighter.isBlocking = Boolean(data.isBlocking);
      if (data.isBlocking) targetFighter.block();
    }
  }
}
/* let remoteProjectilesPool = [];
  function syncRemoteProjectiles(projList) {
    if (!projList) projList = [];
    let stage =
      document.getElementById("stageContainer") ||
      document.getElementById("game");
    if (!stage) return;

    while (remoteProjectilesPool.length < projList.length) {
      let el = document.createElement("div");
      el.className = "projectile remote-synced-proj";
      el.style.position = "absolute";
      el.style.pointerEvents = "none";
      el.style.zIndex = "6";
      stage.appendChild(el);
      remoteProjectilesPool.push(el);
    }

    for (let i = 0; i < projList.length; i++) {
      let p = projList[i];
      let el = remoteProjectilesPool[i];
      el.style.display = "block";
      let renderX = p.x - (window.cameraX || 0);
      let renderY = p.y - (window.cameraY || 0);
      el.style.left = renderX + "px";
      el.style.bottom = renderY + "px";
      el.style.width = p.w + "px";
      el.style.height = p.h + "px";
      el.style.backgroundImage = `url("${p.img}")`;
      el.style.backgroundSize = p.bgSize;
      el.style.backgroundPosition = p.bgPos;
      el.style.transformOrigin = p.tOrigin || "bottom center";
      el.style.clipPath = p.clipPath || "none";
      el.style.webkitClipPath = p.clipPath || "none";
      el.style.transform = p.transform || `scaleX(${p.scaleX})`;
    }

    for (let i = projList.length; i < remoteProjectilesPool.length; i++) {
      remoteProjectilesPool[i].style.display = "none";
    }
  }

  function broadcastLobbyState(
    assignedSlot = null,
    assignedTeam = null,
    targetRoomCode = null
  ) {
    const packet = {
      type: assignedSlot !== null ? "join_accepted" : "lobby_sync",
      assignedSlot: assignedSlot,
      assignedTeam: assignedTeam,
      targetRoomCode: targetRoomCode,
      myTeam: mySelectedTeam,
      enemyTeam: enemySelectedTeam,
      members: localLobbyActiveMembers,
    };
    sendToAllGuests(packet);
  }

  function handleGuestReceivedData(data) {
    if (!data) return;

    if (data.type === "join_accepted" || data.type === "lobby_sync") {
      window.isGuestClient = true;
      window.isHost = false;
      if (Array.isArray(data.myTeam)) mySelectedTeam = data.myTeam;
      if (Array.isArray(data.enemyTeam)) enemySelectedTeam = data.enemyTeam;
      if (Array.isArray(data.members)) localLobbyActiveMembers = data.members;
      window.renderSlots();
      updateCardSelection(activeCardIndex);
      buildDynamicMicMatrixLayout();

      if (data.type === "join_accepted" && !window._joinNotifiedOnce) {
        window._joinNotifiedOnce = true;
        const optModal = document.getElementById("options-modal");
        if (optModal) optModal.style.display = "none";
        showScreenNotification(
          `✅ Joined Room #${window.connectedHostRoomCode}! (${
            data.assignedTeam === "p1" ? "Team A" : "Team B"
          } Slot #${(data.assignedSlot || 0) + 1})`
        );
      }
    } else if (data.type === "start_fight") {
      window.isGuestClient = true;
      window.isHost = false;
      window._guestKoTriggered = false;
      if (Array.isArray(data.myTeam)) mySelectedTeam = data.myTeam;
      if (Array.isArray(data.enemyTeam)) enemySelectedTeam = data.enemyTeam;
      if (Array.isArray(data.members)) localLobbyActiveMembers = data.members;
      const optModal = document.getElementById("options-modal");
      if (optModal) optModal.style.display = "none";
      setupArenaTeams();
      document.getElementById("selectScreen").style.display = "none";
      let overlay = document.getElementById("arenaStartOverlay");
      if (overlay) overlay.style.display = "none";
      gameStarted = true;
      startGameLoopSafe();
    } else if (data.type === "game_state_sync") {
      if (!gameStarted) return;
      let anyHitThisTick = false;

      if (data.fighters) {
        data.fighters.forEach((sf, idx) => {
          let f =
            activeMatchFighters[sf.idx !== undefined ? sf.idx : idx] ||
            activeMatchFighters.find((x) => (x._uniqueId || x.id) === sf.id);
          if (!f) return;

          // 💥 1. Damage lagne par Guest phone par Screen Shake & Sound:
          let prevTotalHp = (f.healthBars - 1) * 100 + f.health;
          let newTotalHp = (sf.healthBars - 1) * 100 + sf.health;
          if (newTotalHp < prevTotalHp) {
            anyHitThisTick = true;
          }

          // 🔥 2. Hit Combo ++ ("2 HITS!", "3 HITS!") Guest phone par dikhao:
          if (sf.comboCount && sf.comboCount > (f.comboCount || 0)) {
            f.comboCount = sf.comboCount;
            f.comboTimer = 120;
            f.showComboText();
          } else if (!sf.comboCount && f.comboCount > 0 && f.comboTimer <= 0) {
            f.comboCount = 0;
          }

          // 🎮 3. Guest ka apna player:
          if (f.isControlledByPlayer) {
            f.health = sf.health;
            f.healthBars = sf.healthBars;
            f.ep = sf.ep;
            if (sf.health <= 0 && sf.healthBars <= 0 && f.state !== "death") {
              f.state = "death";
              f.frameIndex = 0;
              f.isAttacking = false;
            }
            f.updateMiniBars();
            return;
          }

          // 🎴 4. Remote Fighters ke Move Cut-In Cards aur Sounds:
          if (f.state !== sf.state) {
            let role = sf.role || f.charRole || f.id;
            let cardKey = `${role}_${sf.state}`;
            if (
              typeof MOVE_CARD_MAP !== "undefined" &&
              MOVE_CARD_MAP[cardKey]
            ) {
              triggerMoveCutIn(role, sf.state);
            }
            if (sf.state === "dash") playSfx("dash", 2);
            else if (
              sf.state === "punch" ||
              sf.state === "smashPunch" ||
              sf.state === "hellPunch"
            ) {
              playSfx("punch", 2);
            } else if (
              sf.state === "kick" ||
              sf.state === "smashKick" ||
              sf.state === "hellKick"
            ) {
              playSfx("kick", 1.5);
            }
          }

          f.x = sf.x;
          f.y = sf.y;
          f.scaleX = sf.scaleX;
          f.state = sf.state;
          f.frameIndex = sf.frameIndex;
          f.health = sf.health;
          f.healthBars = sf.healthBars;
          f.ep = sf.ep;

          // 🖼️ 5. Host se exact Sprite Frame render karo (Zero Flicker):
          if (sf.fw && sf.fh && sf.bgPos) {
            f.element.style.width = sf.fw + "px";
            f.element.style.height = sf.fh + "px";
            f.element.style.backgroundImage = `url("${f.imageUrl}")`;
            f.element.style.backgroundPosition = sf.bgPos;
            f.element.style.backgroundSize = f.bgSize;
            f.element.style.opacity = sf.op || "1";
          } else if (
            f.data &&
            f.data[f.state] &&
            f.data[f.state][f.frameIndex]
          ) {
            f.showFrame(f.data[f.state][f.frameIndex]);
          }

          f.updateCSS();
          f.updateMiniBars();
        });
      }

      if (anyHitThisTick && game) {
        playSfx("kamehameha", 2.2);
        game.classList.add("shake-active");
        setTimeout(() => game.classList.remove("shake-active"), 200);
      }

      updateHealthBars();
      updateEpBars();
      if (data.projectiles && typeof syncRemoteProjectiles === "function") {
        syncRemoteProjectiles(data.projectiles);
      }

      // 🏆 6. Team K.O. hone par Guest phone par bhi K.O. aur Fairy Tail Natsu Menu Button dikhao:
      let teamAAlive = activeMatchFighters.some(
        (f) =>
          f.activeInBattle &&
          f.team === "p1" &&
          (f.health > 0 || f.healthBars > 0)
      );
      let teamBAlive = activeMatchFighters.some(
        (f) =>
          f.activeInBattle &&
          f.team === "enemy" &&
          (f.health > 0 || f.healthBars > 0)
      );
      if ((!teamAAlive || !teamBAlive) && !window._guestKoTriggered) {
        window._guestKoTriggered = true;
        triggerJapaneseKO(true, true);
      }
    } else if (data.type === "match_ko") {
      if (data.isMatchOver) {
        window._guestKoTriggered = true;
      }
      triggerJapaneseKO(Boolean(data.isMatchOver), true);
    } else if (data.type === "return_to_lobby") {
      returnToSelectScreen();
    } else if (data.type === "room_full") {
      alert(data.message || "⚠️ Lobby is FULL (16/16 Slots)!");
    } else if (data.type === "host_in_game") {
      alert(
        data.message ||
          "⚠️ Host is currently in a battle! Please wait for them to finish."
      );
    } else if (data.type === "kicked") {
      if (data.targetRoomCode && data.targetRoomCode !== window.myRoomCode) {
        return;
      }
      alert("⚠️ You have been kicked from the room by the Host.");
      window.isGuestClient = false;
      window.isHost = true;
      window.connectedHostRoomCode = null;
      window._joinNotifiedOnce = false;
      returnToSelectScreen();
    }
  }

  function joinRemoteRoomByCode(targetCode) {
    if (!targetCode) return;
    const cleanCode = targetCode.replace(/[^0-9]/g, "");
    if (!cleanCode || cleanCode.length !== 4) {
      alert("⚠️ Please enter a valid 4-digit Room Code (e.g. 5788)!");
      return;
    }
    if (cleanCode === window.myRoomCode) {
      alert("⚠️ This is your own Room Code!");
      return;
    }
    if (!onlinePlayersRegistry || !onlinePlayersRegistry[cleanCode]) {
      alert(
        "⚠️ Room #" +
          cleanCode +
          " is not online right now! Please check the 4-digit code with your friend."
      );
      return;
    }

    window.connectedHostRoomCode = cleanCode;
    window._joinNotifiedOnce = false;

    addRoomMessageLog(
      `🟢 Connecting to Room <b>#${cleanCode}</b>... Sending join request!`
    );

    if (lobbyMqttClient && lobbyMqttClient.connected) {
      lobbyMqttClient.subscribe(
        "legend_of_fairy_tail/room/" + cleanCode + "/to_guests"
      );
    }
    sendToHostRoom({
      type: "join_request",
      roomCode: window.myRoomCode,
      playerName: currentOnlineUserIdentity,
      city: currentOnlineUserCity,
      hero: rosterData[activeCardIndex] || rosterData[0],
    });

    if (typeof Peer !== "undefined") {
      try {
        const guestPeer = new Peer();
        guestPeer.on("open", () => {
          const conn = guestPeer.connect("mugen-room-" + cleanCode);
          conn.on("open", () => {
            window.activeGuestConn = conn;
            conn.send({
              type: "join_request",
              roomCode: window.myRoomCode,
              playerName: currentOnlineUserIdentity,
              city: currentOnlineUserCity,
              hero: rosterData[activeCardIndex] || rosterData[0],
            });
          });
          conn.on("data", (data) => handleGuestReceivedData(data));
        });

        guestPeer.on("call", (call) => {
          call.answer(window.localAudioStream || null);
          call.on("stream", (remoteStream) => {
            attachRemoteAudioStream(call.peer, remoteStream);
          });
        });
      } catch (e) {}
    }
  }

  /*
function syncRemoteProjectiles(projList) {
  if (!projList) projList = [];
  let stage =
    document.getElementById("stageContainer") ||
    document.getElementById("game");
  if (!stage) return;

  while (remoteProjectilesPool.length < projList.length) {
    let el = document.createElement("div");
    el.className = "projectile remote-synced-proj";
    el.style.position = "absolute";
    el.style.pointerEvents = "none";
    el.style.zIndex = "6";
    stage.appendChild(el);
    remoteProjectilesPool.push(el);
  }

  for (let i = 0; i < projList.length; i++) {
    let p = projList[i];
    let el = remoteProjectilesPool[i];
    el.style.display = "block";
    let renderX = p.x - (window.cameraX || 0);
    let renderY = p.y - (window.cameraY || 0);
    el.style.left = renderX + "px";
    el.style.bottom = renderY + "px";
    el.style.width = p.w + "px";
    el.style.height = p.h + "px";
    el.style.backgroundImage = `url("${p.img}")`;
    el.style.backgroundSize = p.bgSize;
    el.style.backgroundPosition = p.bgPos;
    el.style.transform = p.transform || `scaleX(${p.scaleX})`;
  }

  for (let i = projList.length; i < remoteProjectilesPool.length; i++) {
    remoteProjectilesPool[i].style.display = "none";
  }
}
function broadcastLobbyState(
  assignedSlot = null,
  assignedTeam = null,
  targetRoomCode = null
) {
  const packet = {
    type: assignedSlot !== null ? "join_accepted" : "lobby_sync",
    assignedSlot: assignedSlot,
    assignedTeam: assignedTeam,
    targetRoomCode: targetRoomCode,
    myTeam: mySelectedTeam,
    enemyTeam: enemySelectedTeam,
    members: localLobbyActiveMembers,
  };
  sendToAllGuests(packet);
}

function handleGuestReceivedData(data) {
  if (!data) return;

  if (data.type === "join_accepted" || data.type === "lobby_sync") {
    if (Array.isArray(data.myTeam)) mySelectedTeam = data.myTeam;
    if (Array.isArray(data.enemyTeam)) enemySelectedTeam = data.enemyTeam;
    if (Array.isArray(data.members)) localLobbyActiveMembers = data.members;
    window.renderSlots();
    updateCardSelection(activeCardIndex);
    buildDynamicMicMatrixLayout();

    if (data.type === "join_accepted" && !window._joinNotifiedOnce) {
      window._joinNotifiedOnce = true;
      const optModal = document.getElementById("options-modal");
      if (optModal) optModal.style.display = "none";
      showScreenNotification(
        `✅ Joined Room #${window.connectedHostRoomCode}! (${
          data.assignedTeam === "p1" ? "Team A" : "Team B"
        } Slot #${(data.assignedSlot || 0) + 1})`
      );
    }
  } else if (data.type === "start_fight") {
    if (Array.isArray(data.myTeam)) mySelectedTeam = data.myTeam;
    if (Array.isArray(data.enemyTeam)) enemySelectedTeam = data.enemyTeam;
    if (Array.isArray(data.members)) localLobbyActiveMembers = data.members;
    const optModal = document.getElementById("options-modal");
    if (optModal) optModal.style.display = "none";
    setupArenaTeams();
    document.getElementById("selectScreen").style.display = "none";
    let overlay = document.getElementById("arenaStartOverlay");
    if (overlay) overlay.style.display = "none";
    gameStarted = true;
    requestAnimationFrame(gameLoop);
  } else if (data.type === "game_state_sync") {
    if (data.fighters) {
      data.fighters.forEach((sf, idx) => {
        let f =
          activeMatchFighters[sf.idx !== undefined ? sf.idx : idx] ||
          activeMatchFighters.find((x) => (x._uniqueId || x.id) === sf.id);
        if (f) {
          if (f.isControlledByPlayer) {
            f.health = sf.health;
            f.healthBars = sf.healthBars;
            f.ep = sf.ep;
            return;
          }
          f.x = sf.x;
          f.y = sf.y;
          f.scaleX = sf.scaleX;
          f.state = sf.state;
          f.frameIndex = sf.frameIndex;
          f.health = sf.health;
          f.healthBars = sf.healthBars;
          f.ep = sf.ep;
          f.updateCSS();
          f.updateMiniBars();
        }
      });
    }
    updateHealthBars();
    updateEpBars();
    if (data.projectiles && typeof syncRemoteProjectiles === "function") {
      syncRemoteProjectiles(data.projectiles);
    }
  } else if (data.type === "room_full") {
    alert(data.message || "⚠️ Lobby is FULL (16/16 Slots)!");
  } else if (data.type === "host_in_game") {
    alert(
      data.message ||
        "⚠️ Host is currently in a battle! Please wait for them to finish."
    );
  } else if (data.type === "kicked") {
    alert("⚠️ You have been kicked from the room by the Host.");
    window.isGuestClient = false;
    window.isHost = true;
    window.connectedHostRoomCode = null;
    window._joinNotifiedOnce = false;
    returnToSelectScreen();
  }
}*/
let remoteProjectilesPool = [];
let lastRemoteProjData = [];

function syncRemoteProjectiles(projList) {
  if (!projList) projList = [];
  lastRemoteProjData = projList;
  let stage =
    document.getElementById("stageContainer") ||
    document.getElementById("game");
  if (!stage) return;

  while (remoteProjectilesPool.length < projList.length) {
    let el = document.createElement("div");
    el.className = "projectile remote-synced-proj";
    el.style.position = "absolute";
    el.style.pointerEvents = "none";
    el.style.zIndex = "6";
    stage.appendChild(el);
    remoteProjectilesPool.push(el);
  }

  for (let i = 0; i < projList.length; i++) {
    let p = projList[i];
    let el = remoteProjectilesPool[i];
    el.style.display = "block";
    el._simX = p.x;
    el._simY = p.y;
    el._simVx = p.vx || 0;
    let renderX = p.x - (window.cameraX || 0);
    let renderY = p.y - (window.cameraY || 0);
    el.style.left = renderX + "px";
    el.style.bottom = renderY + "px";
    el.style.width = p.w + "px";
    el.style.height = p.h + "px";
    if (el._lastImg !== p.img) {
      el._lastImg = p.img;
      el.style.backgroundImage = `url("${p.img}")`;
    }
    if (el._lastBgSize !== p.bgSize) {
      el._lastBgSize = p.bgSize;
      el.style.backgroundSize = p.bgSize;
    }
    el.style.backgroundPosition = p.bgPos;
    el.style.transformOrigin = p.tOrigin || "bottom center";
    el.style.clipPath = p.clipPath || "none";
    el.style.webkitClipPath = p.clipPath || "none";
    el.style.transform = p.transform || `scaleX(${p.scaleX})`;
  }

  for (let i = projList.length; i < remoteProjectilesPool.length; i++) {
    remoteProjectilesPool[i].style.display = "none";
  }
}

function stepRemoteProjectiles60FPS() {
  for (let i = 0; i < lastRemoteProjData.length; i++) {
    let el = remoteProjectilesPool[i];
    if (el && el.style.display === "block" && el._simVx) {
      el._simX = (el._simX || 0) + el._simVx;
      el.style.left = el._simX - (window.cameraX || 0) + "px";
    }
  }
}

function broadcastLobbyState(
  assignedSlot = null,
  assignedTeam = null,
  targetRoomCode = null
) {
  const packet = {
    type: assignedSlot !== null ? "join_accepted" : "lobby_sync",
    assignedSlot: assignedSlot,
    assignedTeam: assignedTeam,
    targetRoomCode: targetRoomCode,
    myTeam: mySelectedTeam,
    enemyTeam: enemySelectedTeam,
    members: localLobbyActiveMembers,
  };
  sendToAllGuests(packet);
}

function handleGuestReceivedData(data) {
  if (!data) return;
  if (data.type !== "game_state_sync" && isDuplicatePkt(data)) return;
  if (data.type === "join_accepted" || data.type === "lobby_sync") {
    window.isGuestClient = true;
    window.isHost = false;
    if (data.type === "join_accepted") {
      if (data.assignedTeam) window.myAssignedTeam = data.assignedTeam;
      if (data.assignedSlot !== undefined && data.assignedSlot !== null) {
        window.myAssignedSlot = data.assignedSlot;
      }
    }
    if (Array.isArray(data.myTeam)) mySelectedTeam = data.myTeam;
    if (Array.isArray(data.enemyTeam)) enemySelectedTeam = data.enemyTeam;
    if (Array.isArray(data.members)) {
      localLobbyActiveMembers = data.members;
      let me = localLobbyActiveMembers.find(
        (m) => !m.isNPC && m.roomCode === window.myRoomCode
      );
      if (me) {
        window.myAssignedTeam = me.slotType;
        window.myAssignedSlot = me.index;
        window.isGuestReady = Boolean(me.isReady);
      }
    }

    /*if (data.type === "join_accepted" || data.type === "lobby_sync") {
    window.isGuestClient = true;
    window.isHost = false;
    if (Array.isArray(data.myTeam)) mySelectedTeam = data.myTeam;
    if (Array.isArray(data.enemyTeam)) enemySelectedTeam = data.enemyTeam;
    if (Array.isArray(data.members)) localLobbyActiveMembers = data.members;*/
    window.renderSlots();
    updateCardSelection(activeCardIndex);
    buildDynamicMicMatrixLayout();

    if (data.type === "join_accepted" && !window._joinNotifiedOnce) {
      window._joinNotifiedOnce = true;
      window.isGuestReady = false;
      const optModal = document.getElementById("options-modal");
      if (optModal) optModal.style.display = "none";
      showScreenNotification(
        `✅ Joined Room #${window.connectedHostRoomCode}! Click READY when set!`
      );
    }
    // 📍 Location: script.js (Line ~15975 - inside join_accepted)
    if (window.guestPeerNode && window.connectedHostRoomCode) {
      requestMicrophonePermission().then((stream) => {
        if (stream) {
          let call = window.guestPeerNode.call(
            "mugen-room-" + window.connectedHostRoomCode,
            stream
          );
          if (call)
            call.on("stream", (remStream) =>
              attachRemoteAudioStream(call.peer, remStream)
            );
        }
      });
    }
  }
  // 📍 Location: script.js (Line ~16150 - inside handleGuestReceivedData)
  else if (data.type === "host_waiting_ready") {
    if (!window.isGuestReady) {
      showScreenNotification(
        "Host wait kar raha hai! Apna fighter jaldi select karo aur READY dabao!"
      );
    } else {
      let waitingList = Array.isArray(data.unreadyNames)
        ? data.unreadyNames.join(", ")
        : "other players";
      showScreenNotification(
        `Host wait kar raha hai! Waiting for [${waitingList}] to click READY...`
      );
    }
  } else if (data.type === "start_fight") {
    window._lastHostPacketTime = Date.now();
    window._hostMinimized = false;
    window.isGuestClient = true;
    window.isHost = false;
    window._guestKoTriggered = false;
    window._lastSyncSeq = 0;
    if (Array.isArray(data.myTeam)) mySelectedTeam = data.myTeam;
    if (Array.isArray(data.enemyTeam)) enemySelectedTeam = data.enemyTeam;
    if (Array.isArray(data.members)) localLobbyActiveMembers = data.members;
    const optModal = document.getElementById("options-modal");
    if (optModal) optModal.style.display = "none";
    setupArenaTeams();
    document.getElementById("selectScreen").style.display = "none";
    let overlay = document.getElementById("arenaStartOverlay");
    if (overlay) overlay.style.display = "none";
    gameStarted = true;
    startGameLoopSafe();
  } else if (data.type === "game_state_sync") {
    window._lastHostPacketTime = Date.now();
    window._hostMinimized = false;
    if (!gameStarted) return;
    if (data.seq) {
      if (data.seq <= (window._lastSyncSeq || 0)) return;
      window._lastSyncSeq = data.seq;
    }

    if (typeof data.camZoom === "number") {
      window._hostCamZoom = data.camZoom;
      window._hostCamPanX = data.camPanX || 0;
    }

    let anyHitThisTick = false;

    if (data.fighters) {
      data.fighters.forEach((sf, idx) => {
        let f =
          activeMatchFighters[sf.idx !== undefined ? sf.idx : idx] ||
          activeMatchFighters.find((x) => (x._uniqueId || x.id) === sf.id);
        if (!f) return;

        let prevTotalHp = (f.healthBars - 1) * 100 + f.health;
        let newTotalHp = (sf.healthBars - 1) * 100 + sf.health;
        if (newTotalHp < prevTotalHp) {
          anyHitThisTick = true;
        }

        /*if (sf.comboCount && sf.comboCount > (f.comboCount || 0)) {
          f.comboCount = sf.comboCount;
          f.comboTimer = 120;
          f.showComboText();
        } else if (!sf.comboCount && f.comboCount > 0 && f.comboTimer <= 0) {
          f.comboCount = 0;
        }*/
        if (sf.comboCount && sf.comboCount > 0) {
          if (f.comboCount !== sf.comboCount) {
            f.comboCount = sf.comboCount;
            f.comboTimer = 120;
            f.showComboText();
          }
        } else if (f.comboCount > 0) {
          f.comboCount = 0;
          f.comboTimer = 0;
          if (f.comboElementId) {
            let cEl = document.getElementById(f.comboElementId);
            if (cEl) cEl.style.opacity = 0;
          }
        }
        // 🎮 Guest ka apna player (Full HP, EP, Hit State, Knockback Dhakka & Grab Sync!):
        if (f.isControlledByPlayer) {
          f.health = sf.health;
          f.healthBars = sf.healthBars;
          f.ep = sf.ep;
          f.isGrabbedBySSB = Boolean(sf.isGrabbed);

          if (
            sf.state === "hit" ||
            sf.state === "death" ||
            sf.isGrabbed ||
            newTotalHp < prevTotalHp ||
            Math.abs(sf.kbVx || 0) > 1
          ) {
            f.x = sf.x;
            f.y = sf.y;
            f.scaleX = sf.scaleX;
            f.kbVelocityX = sf.kbVx || 0;
            if (sf.vy) {
              f.velocityY = sf.vy;
              if (sf.y > 40 || sf.vy > 0) f.jumping = true;
            }
            if (f.state !== sf.state) {
              f.state = sf.state;
              f.frameIndex = sf.frameIndex || 0;
              f.isAttacking = false;
            }
            if (sf.tf) f.element.style.transform = sf.tf;
          } else if (Math.abs(f.x - sf.x) > 55 || Math.abs(f.y - sf.y) > 55) {
            f.x = sf.x;
            f.y = sf.y;
          } else {
            f.x += (sf.x - f.x) * 0.25;
          }
          f.updateCSS();
          f.updateMiniBars();
          return;
        }

        if (f.state !== sf.state) {
          let role = sf.role || f.charRole || f.id;
          let cardKey = `${role}_${sf.state}`;
          if (typeof MOVE_CARD_MAP !== "undefined" && MOVE_CARD_MAP[cardKey]) {
            triggerMoveCutIn(role, sf.state);
          }
          if (sf.state === "dash") playSfx("dash", 2);
          else if (
            sf.state === "punch" ||
            sf.state === "smashPunch" ||
            sf.state === "hellPunch"
          ) {
            playSfx("punch", 2);
          } else if (
            sf.state === "kick" ||
            sf.state === "smashKick" ||
            sf.state === "hellKick"
          ) {
            playSfx("kick", 1.5);
          }
        }

        f.x = sf.x;
        f.y = sf.y;
        f.scaleX = sf.scaleX;
        f.state = sf.state;
        f.frameIndex = sf.frameIndex;
        f.beamTimer = sf.bt || 0;
        f.health = sf.health;
        f.healthBars = sf.healthBars;
        f.ep = sf.ep;

        if (sf.fw && sf.fh && sf.bgPos) {
          f.element.style.width = sf.fw + "px";
          f.element.style.height = sf.fh + "px";
          if (f._lastSyncImg !== f.imageUrl) {
            f._lastSyncImg = f.imageUrl;
            f.element.style.backgroundImage = `url("${f.imageUrl}")`;
          }
          if (f._lastSyncBgSize !== f.bgSize) {
            f._lastSyncBgSize = f.bgSize;
            f.element.style.backgroundSize = f.bgSize;
          }
          f.element.style.backgroundPosition = sf.bgPos;
          f.element.style.opacity = sf.op || "1";
        } else if (f.data && f.data[f.state] && f.data[f.state][f.frameIndex]) {
          f.showFrame(f.data[f.state][f.frameIndex]);
        }

        f.updateCSS();
        if (sf.tf) f.element.style.transform = sf.tf;
        f.updateMiniBars();
      });
    }

    if (anyHitThisTick && game) {
      playSfx("kamehameha", 2.2);
      game.classList.add("shake-active");
      setTimeout(() => game.classList.remove("shake-active"), 200);
    }

    updateHealthBars();
    updateEpBars();
    if (data.projectiles && typeof syncRemoteProjectiles === "function") {
      syncRemoteProjectiles(data.projectiles);
    }

    let teamAAlive = activeMatchFighters.some(
      (f) =>
        f.activeInBattle &&
        f.team === "p1" &&
        (f.health > 0 || f.healthBars > 0)
    );
    let teamBAlive = activeMatchFighters.some(
      (f) =>
        f.activeInBattle &&
        f.team === "enemy" &&
        (f.health > 0 || f.healthBars > 0)
    );
    if ((!teamAAlive || !teamBAlive) && !window._guestKoTriggered) {
      window._guestKoTriggered = true;
      triggerJapaneseKO(true, true);
    }
  } else if (data.type === "match_ko") {
    if (data.isMatchOver) {
      window._guestKoTriggered = true;
    }
    triggerJapaneseKO(Boolean(data.isMatchOver), true);
  } else if (data.type === "return_to_lobby") {
    returnToSelectScreen();
  } else if (data.type === "host_minimized") {
    window._hostMinimized = Boolean(data.state);
    if (!data.state) window._lastHostPacketTime = Date.now();
    if (teamAFighters[0]) {
      teamAFighters[0].isMinimizedPlayer = Boolean(data.state);
      teamAFighters[0].moveLeft = false;
      teamAFighters[0].moveRight = false;
    }
  } else if (data.type === "host_disconnected") {
    // Agar Host ka net band ho jaye toh bhi Guest ka match aur 8v8 NPCs bina pause hue chalte rahenge!
    window._hostMinimized = true;
    if (teamAFighters[0]) {
      teamAFighters[0].isMinimizedPlayer = true;
      teamAFighters[0].moveLeft = false;
      teamAFighters[0].moveRight = false;
    }
    showScreenNotification("⚠️ Host went offline! Match continuing with AI...");
  } else if (data.type === "rejoin_active_match") {
    // 🔥 FREE FIRE STYLE REJOIN MATCH:
    showScreenNotification(
      data.message || "⚔️ Your match is still in progress!"
    );
    mySelectedTeam = data.myTeam || mySelectedTeam;
    enemySelectedTeam = data.enemyTeam || enemySelectedTeam;
    localLobbyActiveMembers = data.members || localLobbyActiveMembers;
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("selectScreen").style.display = "none";
    const optModal = document.getElementById("options-modal");
    if (optModal) optModal.style.display = "none";
    if (!gameStarted) {
      setupArenaTeams();
      gameStarted = true;
      startGameLoopSafe();
    }
    //returnToSelectScreen();
  } else if (data.type === "room_full") {
    alert(data.message || "⚠️ Lobby is FULL (16/16 Slots)!");
  } else if (data.type === "host_in_game") {
    alert(
      data.message ||
        "⚠️ Host is currently in a battle! Please wait for them to finish."
    );
  } else if (data.type === "kicked") {
    if (data.targetRoomCode && data.targetRoomCode !== window.myRoomCode) {
      return;
    }
    alert("⚠️ You have been kicked from the room by the Host.");
    window.isGuestClient = false;
    window.isHost = true;
    window.connectedHostRoomCode = null;
    window._joinNotifiedOnce = false;
    returnToSelectScreen();
  }
  // 📍 Location: script.js (Line ~16150 - inside handleGuestReceivedData                                                             }
}

function joinRemoteRoomByCode(targetCode) {
  if (!targetCode) return;
  const cleanCode = targetCode.replace(/[^0-9]/g, "");
  if (!cleanCode || cleanCode.length !== 4) {
    alert("⚠️ Please enter a valid 4-digit Room Code (e.g. 5788)!");
    return;
  }
  if (cleanCode === window.myRoomCode) {
    alert("⚠️ This is your own Room Code!");
    return;
  }
  if (window.isGuestClient && window.connectedHostRoomCode === cleanCode) {
    alert(`✅ Aap pehle se Room #${cleanCode} mein joined ho!`);
    return;
  }

  // 🛑 2. AGAR AAP HOST HO AUR APNE ROOM KE GUEST KO JOIN REQUEST BHEJ RAHE HO TOH ROKO (Taaki dono Guest na ban jayein!):
  let activeGuestsInMyRoom = localLobbyActiveMembers.filter(
    (m) => !m.isNPC && !m.isHost
  );
  if (!window.isGuestClient && activeGuestsInMyRoom.length > 0) {
    if (activeGuestsInMyRoom.some((m) => m.roomCode === cleanCode)) {
      alert(
        "⚠️ Yeh player pehle se aapke room mein Guest hai! Aap Host ho, unhe join request mat bhejo."
      );
      return;
    }
    alert(
      "⚠️ Aap abhi Room Host ho aur aapki lobby mein players hain! Sabhi players aapke Room Code #" +
        window.myRoomCode +
        " par join karenge."
    );
    return;
  }

  // 🛑 3. SPAM / DOUBLE CLICK COOLDOWN (3 Seconds):
  const now = Date.now();
  if (
    window._lastJoinReqTime &&
    now - window._lastJoinReqTime < 3000 &&
    window._lastJoinReqCode === cleanCode
  ) {
    return;
  }
  window._lastJoinReqTime = now;
  window._lastJoinReqCode = cleanCode;

  window.isGuestClient = true;
  window.isHost = false;
  window.connectedHostRoomCode = cleanCode;
  window._joinNotifiedOnce = false;

  addRoomMessageLog(
    `🟢 Connecting to Room <b>#${cleanCode}</b>... Sending join request!`
  );

  if (lobbyMqttClient && lobbyMqttClient.connected) {
    lobbyMqttClient.subscribe(
      "legend_of_fairy_tail/room/" + cleanCode + "/to_guests"
    );
  }
  sendToHostRoom({
    type: "join_request",
    roomCode: window.myRoomCode,
    playerName: currentOnlineUserIdentity,
    city: currentOnlineUserCity,
    hero: rosterData[activeCardIndex] || rosterData[0],
  });

  if (typeof Peer !== "undefined") {
    try {
      const guestPeer = new Peer();
      window.guestPeerNode = guestPeer;
      guestPeer.on("open", () => {
        const conn = guestPeer.connect("mugen-room-" + cleanCode);
        conn.on("open", () => {
          window.activeGuestConn = conn;
          /*conn.send({
            type: "join_request",
            roomCode: window.myRoomCode,
            playerName: currentOnlineUserIdentity,
            city: currentOnlineUserCity,
            hero: rosterData[activeCardIndex] || rosterData[0],
          });*/
        });
        conn.on("data", (data) => handleGuestReceivedData(data));
      });

      guestPeer.on("call", (call) => {
        call.answer(window.localAudioStream || null);
        call.on("stream", (remoteStream) => {
          attachRemoteAudioStream(call.peer, remoteStream);
        });
      });
    } catch (e) {}
  }
}

/*
function initRealPeerNetwork() {
  if (typeof Peer === "undefined") {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js";
    script.onload = () => initRealPeerNetwork();
    document.head.appendChild(script);
    return;
  }
  if (peerNode) return;

  const hostPeerRoomId = "mugen-room-" + window.myRoomCode;
  try {
    peerNode = new Peer(hostPeerRoomId);
    peerNode.on("open", () => {
      addRoomMessageLog(
        `🟢 <b>[SYSTEM NODE]:</b> Lobby Active | Room Code: <b>#${window.myRoomCode}</b> | P2P Ready`
      );

      //addRoomMessageLog(
      //  `🟢 <b>Lobby Host Online:</b> Room Code <b>#${window.myRoomCode}</b> ready. Share with friends!`
      //  );
      syncOnlineListLayoutDisplay();
    });

    peerNode.on("connection", (conn) => {
      activePeerConnections.push(conn);
      conn.on("data", (data) => handleHostReceivedData(conn, data));
      conn.on("close", () => {
        activePeerConnections = activePeerConnections.filter((c) => c !== conn);
        addRoomMessageLog(`⚠️ Remote player disconnected.`);
      });
    });

    peerNode.on("error", (err) => {
      if (err.type === "unavailable-id") {
        window.myRoomCode = String(Math.floor(1000 + Math.random() * 9000));
        peerNode = null;
        initRealPeerNetwork();
      }
    });
  } catch (e) {}
}
// 📡 HOST: DOST SE DATA RECEIVE KARNA
function handleHostReceivedData(conn, data) {
  if (!data) return;

  // A. Join Request:
  if (data.type === "join_request") {
    let placed = false,
      targetTeam = "enemy",
      targetIdx = -1;

    // Khali enemy slot dhoondho:
    for (let i = 0; i < 8; i++) {
      if (!enemySelectedTeam[i]) {
        targetTeam = "enemy";
        targetIdx = i;
        placed = true;
        break;
      }
    }
    if (!placed) {
      for (let i = 1; i < 8; i++) {
        if (!mySelectedTeam[i]) {
          targetTeam = "p1";
          targetIdx = i;
          placed = true;
          break;
        }
      }
    }

    if (placed) {
      const hero = data.hero || rosterData[1] || rosterData[0];
      if (targetTeam === "p1") mySelectedTeam[targetIdx] = hero;
      else enemySelectedTeam[targetIdx] = hero;

      localLobbyActiveMembers = localLobbyActiveMembers.filter(
        (m) => m.peerId !== conn.peer
      );
      localLobbyActiveMembers.push({
        slotType: targetTeam,
        index: targetIdx,
        isHost: false,
        name: hero.name,
        playerName: data.playerName || "Friend",
        city: data.city || "Online",
        peerId: conn.peer,
        isNPC: false,
      });

      addRoomMessageLog(
        `📩 <b>[${data.playerName || "Friend"}]</b> joined <b>${
          targetTeam === "p1" ? "Team A" : "Team B"
        } Slot #${targetIdx + 1}</b>!`
      );
      window.renderSlots();
      buildDynamicMicMatrixLayout();
      syncOnlineListLayoutDisplay();

      // 🎤 Real Voice Chat: Host aur Guest ka audio channel connect:
      if (window.localAudioStream && peerNode) {
        peerNode.call(conn.peer, window.localAudioStream);
      }

      conn.send({
        type: "join_accepted",
        assignedSlot: targetIdx,
        assignedTeam: targetTeam,
        myTeam: mySelectedTeam,
        enemyTeam: enemySelectedTeam,
        members: localLobbyActiveMembers,
      });

      broadcastLobbyState();
    } else {
      conn.send({
        type: "room_full",
        message: "⚠️ Lobby is FULL (16/16 Slots)!",
      });
    }
  }

  // B. Guest ne character pick kiya:
  else if (data.type === "guest_pick_hero") {
    if (data.targetTeam === "enemy" && enemySelectedTeam.length < 8)
      enemySelectedTeam.push(data.hero);
    else if (data.targetTeam === "p1" && mySelectedTeam.length < 8)
      mySelectedTeam.push(data.hero);
    window.renderSlots();
    broadcastLobbyState();
  }


  // C. 🎮 BATTLE INPUT: Guest ke controls se Host ke phone par fighter chalana:
 /* else if (data.type === "player_input") {
    let targetFighter = teamBFighters[0]; // Guest fighter
    if (!targetFighter || targetFighter.health <= 0) return;

    if (data.action === "punch") targetFighter.punch();
    else if (data.action === "kick") targetFighter.kick();
    else if (data.action === "jump") targetFighter.jump();
    else if (data.action === "kiBlast") targetFighter.kiBlast();
    else if (data.action === "smashPunch") targetFighter.smashPunch();
    else if (data.action === "hellPunch") targetFighter.hellPunch();
    else if (data.action === "smashKick") targetFighter.smashKick();
    else if (data.action === "hellKick") targetFighter.hellKick();
    else if (data.action === "mediumAttack") targetFighter.mediumAttack();
    else if (data.action === "hellAttack") targetFighter.hellAttack();
    else if (data.action === "kamehameha") targetFighter.kamehameha();
    else if (data.action === "bigKamehameha") targetFighter.bigKamehameha();
    else if (data.action === "dash") targetFighter.dash();
    else if (data.action === "teleport") targetFighter.teleport();
    else if (data.action === "block") targetFighter.block();
    else if (data.action === "move") {
      targetFighter.moveLeft = data.moveLeft || false;
      targetFighter.moveRight = data.moveRight || false;
      targetFighter.moveUp = data.moveUp || false;
      targetFighter.moveDown = data.moveDown || false;
      if (data.isBlocking) targetFighter.block();
    }
  }
}*/

// 📢 Host sabhi connected dosto ko lobby sync bhejega:
/*function broadcastLobbyState() {
  if (activePeerConnections && activePeerConnections.length > 0) {
    const packet = {
      type: "lobby_sync",
      myTeam: mySelectedTeam,
      enemyTeam: enemySelectedTeam,
      members: localLobbyActiveMembers,
    };
    activePeerConnections.forEach((conn) => {
      try {
        conn.send(packet);
      } catch (e) {}
    });
  }
}

// 📡 GUEST: ROOM CODE SE DIRECT JOIN KARNA
function joinRemoteRoomByCode(targetCode) {
  if (!targetCode) return;
  const cleanCode = targetCode.replace(/[^0-9]/g, "");
  if (!cleanCode || cleanCode.length !== 4) {
    alert("⚠️ Please enter a valid 4-digit Room Code (e.g. 5788)!");
    return;
  }

  const guestPeer = new Peer();
  guestPeer.on("open", () => {
    const conn = guestPeer.connect("mugen-room-" + cleanCode);
    conn.on("open", () => {
      window.isGuestClient = true;
      window.isHost = false;
      window.activeGuestConn = conn;

      addRoomMessageLog(
        `🟢 Connected to Room <b>#${cleanCode}</b>! Sending join request...`
      );
      conn.send({
        type: "join_request",
        playerName: currentOnlineUserIdentity,
        city: currentOnlineUserCity,
        hero: rosterData[activeCardIndex] || rosterData[0],
      });
    });

    conn.on("data", (data) => {
      // 1. Lobby update received from Host:
      if (data.type === "join_accepted" || data.type === "lobby_sync") {
        if (data.myTeam) mySelectedTeam = data.myTeam;
        if (data.enemyTeam) enemySelectedTeam = data.enemyTeam;
        if (data.members) localLobbyActiveMembers = data.members;
        window.renderSlots();
        buildDynamicMicMatrixLayout();
      }
      // 2. Match Start received from Host:
      else if (data.type === "start_fight") {
        mySelectedTeam = data.myTeam;
        enemySelectedTeam = data.enemyTeam;
        localLobbyActiveMembers = data.members;
        setupArenaTeams();
        document.getElementById("selectScreen").style.display = "none";
        let overlay = document.getElementById("arenaStartOverlay");
        if (overlay) overlay.style.display = "none";
        gameStarted = true;
        requestAnimationFrame(gameLoop);
      }
      // 3. 🌐 LIVE 16 FIGHTERS POSITIONS SYNC:
      else if (data.type === "game_state_sync") {
        data.fighters.forEach((sf) => {
          let f = activeMatchFighters.find(
            (x) => (x._uniqueId || x.id) === sf.id
          );
          if (f) {
            f.x = sf.x;
            f.y = sf.y;
            f.scaleX = sf.scaleX;
            f.state = sf.state;
            f.frameIndex = sf.frameIndex;
            f.health = sf.health;
            f.healthBars = sf.healthBars;
            f.ep = sf.ep;
            f.updateCSS();
            f.updateMiniBars();
          }
        });
        updateHealthBars();
        updateEpBars();
        if (data.projectiles && typeof syncRemoteProjectiles === "function") {
          syncRemoteProjectiles(data.projectiles);
        }
      } else if (data.type === "room_full") {
        alert(data.message || "⚠️ Lobby is FULL (16/16 Slots)!");
      } else if (data.type === "kicked") {
        alert("⚠️ You have been kicked from the room by the Host.");
        returnToSelectScreen();
      }
    });

    // 🎤 Remote audio answer listener:
    guestPeer.on("call", (call) => {
      call.answer(window.localAudioStream || null);
      call.on("stream", (remoteStream) => {
        let audio =
          document.getElementById("remoteVoiceAudio") ||
          document.createElement("audio");
        audio.id = "remoteVoiceAudio";
        audio.autoplay = true;
        audio.srcObject = remoteStream;
        document.body.appendChild(audio);
      });
    });

    conn.on("error", () => {
      alert(
        "⚠️ Host is not online on Room #" +
          cleanCode +
          ". Please check room code with your friend."
      );
    });
  });
}*/
// ==========================================================================
// 🌐 STEP 6: REAL PLAYERS MQTT DISCOVERY, INVITE ONLY & SEARCH JOIN
// ==========================================================================
let onlinePlayersRegistry = {};
let lobbyMqttClient = null;
let sentInvitesTracker = {}; // 🛡️ 1 Room Code = 1 Invite Anti-Spam Tracker

function initGlobalLobbyBroker() {
  if (typeof mqtt === "undefined") {
    if (!document.getElementById("mqtt-cdn-script")) {
      const script = document.createElement("script");
      script.id = "mqtt-cdn-script";
      script.src = "https://unpkg.com/mqtt@5.3.5/dist/mqtt.min.js";
      script.onload = () => {
        initGlobalLobbyBroker();
      };
      document.head.appendChild(script);
    }
    return;
  }

  if (lobbyMqttClient && lobbyMqttClient.connected) return;

  try {
    lobbyMqttClient = mqtt.connect("wss://broker.emqx.io:8084/mqtt");

    lobbyMqttClient.on("connect", () => {
      lobbyMqttClient.subscribe("legend_of_fairy_tail/live_players/#");
      lobbyMqttClient.subscribe(
        "legend_of_fairy_tail/invites/" + window.myRoomCode
      );
      lobbyMqttClient.subscribe(
        "legend_of_fairy_tail/room/" + window.myRoomCode + "/to_host"
      );
      broadcastMyPresence();
    });

    lobbyMqttClient.on("message", (topic, payload) => {
      try {
        const data = JSON.parse(payload.toString());
        if (topic.endsWith("/to_host") && window.isHost) {
          handleHostReceivedData({ peer: data.roomCode || "mqtt_guest" }, data);
          return;
        }
        if (topic.endsWith("/to_guests")) {
          handleGuestReceivedData(data);
          return;
        }
        // A. 📩 INVITATION RECEIVED (NO SCREEN POPUP - ONLY SAVED IN MESSAGE TAB):
        if (topic.startsWith("legend_of_fairy_tail/invites/")) {
          if (data.note === "tried_to_join_in_game") {
            addRoomMessageLog(
              `📢 <b>${data.fromId}</b> (Room #${data.fromRoomCode}) wanted to join, but you are in battle.`
            );
            return;
          }

          let realCount = localLobbyActiveMembers.filter(
            (m) => !m.isNPC
          ).length;
          let isFull = realCount >= 16;

          if (isFull) {
            addRoomMessageLog(
              `📩 <b>[${data.fromId}]</b> sent an invitation, but your lobby is FULL (16/16).`
            );
            /*  } else {

            // 🔕 NO FLOATING POPUP ON SCREEN! Seedha MESSAGE tab me save hoga:
            addRoomMessageLog(
              `📩 <b>[${data.fromId}]</b> invited you to join their room! Room Code: <b style="color:#ffd700; font-size:14px;">#${data.fromRoomCode}</b>. (Search this code in the Online tab to connect).`
            );
          }*/
            // 📍 Location: script.js (Line ~16555 - inside topic.startsWith("legend_of_fairy_tail/invites/"))
          } else {
            let pCount = data.realCount || 1;
            addRoomMessageLog(
              `📩 <b>[${data.fromId}]</b> invited you to Lobby <b>#${data.fromRoomCode}</b> (${pCount}/16 Real Players).`
            );
            // 🔥 FREE FIRE STYLE LOBBY INVITE POPUP (Sirf jab match na chal raha ho):
            if (!gameStarted) {
              let existingGuestCount = localLobbyActiveMembers.filter(
                (m) => !m.isNPC && !m.isHost
              ).length;
              if (window.isGuestClient || existingGuestCount > 0) {
                showScreenNotification(
                  `📩 Invite from [${data.fromId}] (${pCount}/16 Players) saved in MESSAGE tab!`
                );
              } else {
                setTimeout(() => {
                  let acceptJoin = confirm(
                    `🔥 SQUAD INVITE!\n\nInvited By: ${data.fromId}\nMain Host Room: #${data.fromRoomCode}\nActive Real Players in Lobby: ${pCount} / 16\n\nDo you want to leave your solo lobby and JOIN their room directly?`
                  );
                  if (acceptJoin) {
                    joinRemoteRoomByCode(data.fromRoomCode);
                  }
                }, 100);
              }
            }
          }
          return;
        }

        // B. ❌ OFFLINE PLAYER CLEANUP:
        /*if (data.offline && data.roomCode) {
          delete onlinePlayersRegistry[data.roomCode];
          syncOnlineListLayoutDisplay();
          return;
        }*/
        // B. ❌ OFFLINE PLAYER CLEANUP (Disconnect hote hi fighter turant still ruk jayega):
        if (data.offline && data.roomCode) {
          delete onlinePlayersRegistry[data.roomCode];
          if (gameStarted) {
            let mem = localLobbyActiveMembers.find(
              (m) => m.roomCode === data.roomCode
            );
            let f = mem
              ? mem.slotType === "p1"
                ? teamAFighters[mem.index]
                : teamBFighters[mem.index]
              : window.isGuestClient &&
                data.roomCode === window.connectedHostRoomCode
              ? teamAFighters[0]
              : null;
            if (f) {
              f.moveLeft = false;
              f.moveRight = false;
              f.moveUp = false;
              f.moveDown = false;
              f.isAttacking = false;
              f.isCharging = false;
              if (f.state === "run" || f.state === "dash") f.setState("idle");
            }
          }
          syncOnlineListLayoutDisplay();
          return;
        }
        // C. 🌐 LIVE PLAYERS DISCOVERY:
        if (data.roomCode && data.roomCode !== window.myRoomCode) {
          onlinePlayersRegistry[data.roomCode] = data;
          const searchInput = document.getElementById("online-search-input");
          syncOnlineListLayoutDisplay(searchInput ? searchInput.value : "");
        }
      } catch (e) {}
    });
  } catch (e) {}

  if (!window.mqttBroadcastTimer) {
    window.mqttBroadcastTimer = setInterval(broadcastMyPresence, 2000);
  }

  window.addEventListener("beforeunload", broadcastOffline);
  window.addEventListener("offline", broadcastOffline);
}

// 📤 SEND INVITE TO PLAYER:
/*
function sendRoomInviteToPlayer(targetRoomCode, targetDeviceName) {
  if (lobbyMqttClient && lobbyMqttClient.connected) {
    lobbyMqttClient.publish(
      "legend_of_fairy_tail/invites/" + targetRoomCode,
      JSON.stringify({
        fromId: currentOnlineUserIdentity,
        fromRoomCode: window.myRoomCode,
        fromCity: currentOnlineUserCity,
      })
    );
    addRoomMessageLog(
      `📤 Sent invitation with Room Code <b>#${window.myRoomCode}</b> to <b>${targetDeviceName}</b>.`
    );
  } else {
    alert("Network connecting, please retry in 2s.");
  }
}*/
function sendRoomInviteToPlayer(targetRoomCode, targetDeviceName) {
  // 👑 Master Host Routing: Agar Guest kisi 3rd person ko invite kare, toh Main Host ka Room Code jayega!
  const masterRoomCode = window.connectedHostRoomCode || window.myRoomCode;
  if (targetRoomCode === masterRoomCode) {
    alert("⚠️ This player is already the Host of your room!");
    return;
  }
  if (
    localLobbyActiveMembers.some(
      (m) => !m.isNPC && m.roomCode === targetRoomCode
    )
  ) {
    alert("⚠️ This player is already connected in your lobby!");
    return;
  }
  let realPlayersInLobby =
    localLobbyActiveMembers.filter((m) => !m.isNPC).length || 1;
  if (lobbyMqttClient && lobbyMqttClient.connected) {
    lobbyMqttClient.publish(
      "legend_of_fairy_tail/invites/" + targetRoomCode,
      JSON.stringify({
        // fromId: currentOnlineUserIdentity,
        //fromRoomCode: masterRoomCode,
        fromId: currentOnlineUserIdentity, // 👈 Jisne bheja (Host ya Guest ki ID)
        fromRoomCode: masterRoomCode,
        fromCity: currentOnlineUserCity,
        realCount: realPlayersInLobby,
      })
    );
    addRoomMessageLog(
      `📤 Sent invitation for Main Lobby <b>#${masterRoomCode}</b> to <b>${targetDeviceName}</b>.`
    );
  } else {
    alert("Network connecting, please retry in 2s.");
  }
}

function broadcastMyPresence() {
  if (lobbyMqttClient && lobbyMqttClient.connected) {
    const loc = currentOnlineUserCity || "Online";
    let devName = localStorage.getItem("mugen_device_model");
    if (!devName && currentOnlineUserIdentity) {
      let parts = currentOnlineUserIdentity.split(" (");
      if (parts[0] && parts[0].trim() && parts[0] !== "Detecting Device...") {
        devName = parts[0].trim();
      }
    }
    if (!devName) devName = getDeviceBrand();
    let isInGame = typeof gameStarted !== "undefined" && gameStarted;
    lobbyMqttClient.publish(
      "legend_of_fairy_tail/live_players/" + window.myRoomCode,
      JSON.stringify({
        roomCode: window.myRoomCode,
        device: devName,
        city: loc,

        // 📍 Location: script.js (Line ~16645)
        inGame: isInGame,
        inSquad: Boolean(
          window.isGuestClient ||
            localLobbyActiveMembers.some((m) => !m.isNPC && !m.isHost)
        ),

        time: Date.now(),
      })
    );
  }
}

function broadcastOffline() {
  if (lobbyMqttClient && lobbyMqttClient.connected) {
    try {
      lobbyMqttClient.publish(
        "legend_of_fairy_tail/live_players/" + window.myRoomCode,
        JSON.stringify({
          roomCode: window.myRoomCode,
          offline: true,
        })
      );
    } catch (e) {}
  }
}

// 📜 REAL PLAYERS ONLY: + Button sends Invite, Search 4-digits shows JOIN with inGame status
function syncOnlineListLayoutDisplay(searchFilterWord = "") {
  let overlayBox =
    document.getElementById("options-online-content") ||
    document.getElementById("options-moves-content") ||
    document.querySelector(".options-text-overlay");
  if (!overlayBox) return;

  let wrapper = document.getElementById("mugen-online-scroller-panel");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "mugen-online-scroller-panel";
    wrapper.style.cssText =
      "display:flex; flex-direction:column; gap:6px; width:100%; max-height:260px; overflow-y:auto; padding:6px; box-sizing:border-box;";
    overlayBox.appendChild(wrapper);
  }

  wrapper.innerHTML = "";
  let queryTag = (searchFilterWord || "").toLowerCase().trim();
  const cleanCodeSearch = queryTag.replace(/[^0-9]/g, "");

  // 1. 👑 AAPKA APNA HOST CARD (Always Visible at Top):
  let isInGame = typeof gameStarted !== "undefined" && gameStarted;
  let statusBadge = isInGame
    ? `<span style="background:#ff2244; color:#fff; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px; white-space:nowrap;">⚔️ IN BATTLE</span>`
    : `<span style="background:#00ff80; color:#000; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px; white-space:nowrap;">🟢 IN LOBBY</span>`;

  const hostCard = document.createElement("div");
  hostCard.style.cssText =
    "display:flex; justify-content:space-between; align-items:center; background:rgba(0,255,255,0.22); border:2px solid #00ffff; padding:10px 14px; border-radius:10px; box-shadow:0 0 16px rgba(0,255,255,0.4); margin-bottom:6px;";
  hostCard.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <span style="font-size:13px; font-weight:bold; color:#00ffff; font-family:Arial, sans-serif; text-shadow:1px 1px 3px #000;">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        🆔 Room #${window.myRoomCode} (${currentOnlineUserIdentity}) (You) 🟢
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <div style="font-size:12px; color:#00ff80 !important; font-weight:bold; margin-top:3px; text-shadow:1px 1px 3px #000;">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            📍 Location: <b>${currentOnlineUserCity}</b>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ${statusBadge}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            `;
  wrapper.appendChild(hostCard);

  // 2. Offline cleanup (> 4000ms):
  const now = Date.now();
  for (let code in onlinePlayersRegistry) {
    if (now - onlinePlayersRegistry[code].time > 4000) {
      delete onlinePlayersRegistry[code];
    }
  }

  // 3. City Density Sorting:
  let players = Object.values(onlinePlayersRegistry);
  let cityCounts = {};
  players.forEach((p) => {
    cityCounts[p.city] = (cityCounts[p.city] || 0) + 1;
  });

  players.sort((a, b) => {
    let diff = (cityCounts[b.city] || 0) - (cityCounts[a.city] || 0);
    if (diff !== 0) return diff;
    return (a.city || "").localeCompare(b.city || "");
  });

  // 4. REAL ONLINE PLAYERS FILTER & DISPLAY:
  let displayedCount = 0;

  players.forEach((player) => {
    let pSearchText =
      `${player.device} ${player.city} ${player.roomCode}`.toLowerCase();
    let isSearchMatch =
      cleanCodeSearch.length === 4 && player.roomCode === cleanCodeSearch;

    if (queryTag !== "" && !isSearchMatch && !pSearchText.includes(queryTag))
      return;

    displayedCount++;
    const row = document.createElement("div");
    row.style.cssText =
      "display:flex; justify-content:space-between; align-items:center; background:rgba(255,34,68,0.22); border:2px solid #ff2244; box-shadow:0 0 16px rgba(255,34,68,0.45); padding:8px 12px; border-radius:8px; margin-bottom:4px;";

    let pStatus = player.inGame
      ? `<span style="font-size:10px; color:#fff; background:#ff2244; padding:2px 6px; border-radius:4px; font-weight:bold;">⚔️ In Battle</span>`
      : `<span style="font-size:10px; color:#000; background:#00ff80; padding:2px 6px; border-radius:4px; font-weight:bold;">🟢 In Lobby</span>`;

    let alreadyInvited =
      sentInvitesTracker[player.roomCode] === window.myRoomCode;

    // 🎯 RULE: Agar Search Bar me 4-digit code likha hai -> SHOW "JOIN" BUTTON!
    // Agar general list browse kar rahe ho -> SHOW "+" INVITE BUTTON!
    let actionBtnHtml = "";
    //if (isSearchMatch) {
    //actionBtnHtml = `<button class="join-card-btn" style="padding:6px 16px; border-radius:6px; background:linear-gradient(135deg, #00ff80, #00b359); color:#000; font-size:12px; font-weight:bold; border:1px solid #fff; cursor:pointer; box-shadow:0 0 10px #00ff80;">JOIN</button>`;
    //  }
    let isAlreadyInThisRoom =
      (window.isGuestClient &&
        window.connectedHostRoomCode === player.roomCode) ||
      localLobbyActiveMembers.some(
        (m) => !m.isNPC && m.roomCode === player.roomCode
      );

    if (isAlreadyInThisRoom) {
      actionBtnHtml = `<button disabled style="padding:6px 12px; border-radius:6px; background:#224433; color:#00ff80; font-size:11px; font-weight:bold; border:1px solid #00ff80; cursor:default;">✅ CONNECTED</button>`;
    } else if (isSearchMatch) {
      actionBtnHtml = `<button class="join-card-btn" style="padding:6px 16px; border-radius:6px; background:linear-gradient(135deg, #00ff80, #00b359); color:#000; font-size:12px; font-weight:bold; border:1px solid #fff; cursor:pointer; box-shadow:0 0 10px #00ff80;">JOIN</button>`;
    } else {
      actionBtnHtml = alreadyInvited
        ? `<button class="invite-plus-btn" disabled style="padding:4px 10px; border-radius:6px; background:#444; color:#aaa; font-size:11px; font-weight:bold; border:1px solid #666; cursor:default;">✓ Sent</button>`
        : `<button class="invite-plus-btn" title="Send Room Invite" style="width:30px; height:30px; min-width:30px; border-radius:50%; background:linear-gradient(135deg, #00ff80, #00b359); color:#000; font-size:16px; font-weight:bold; border:1px solid #fff; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 0 8px #00ff80;">+</button>`;
    }

    row.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <div style="display:flex; align-items:center; gap:8px;">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <span style="font-size:12px; color:#fff; font-weight:bold; font-family:Arial, sans-serif; text-shadow:1px 1px 2px #000;">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      🌐 ${player.device} (${player.city})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <span style="font-size:10px; color:#ffd700; background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:4px;">#${player.roomCode}</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ${pStatus}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ${actionBtnHtml}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              `;
    const btn = row.querySelector("button");
    if (isSearchMatch) {
      btn.onclick = (e) => {
        e.preventDefault();
        if (player.inGame) {
          alert(
            `⚠️ Host of Room #${player.roomCode} is currently in a battle! Please wait for them to finish.`
          );
          if (lobbyMqttClient && lobbyMqttClient.connected) {
            lobbyMqttClient.publish(
              "legend_of_fairy_tail/invites/" + player.roomCode,
              JSON.stringify({
                fromId: currentOnlineUserIdentity,
                fromRoomCode: window.myRoomCode,
                fromCity: currentOnlineUserCity,
                note: "tried_to_join_in_game",
              })
            );
          }
          return;
        }
        btn.disabled = true;
        btn.innerText = "⏳...";
        joinRemoteRoomByCode(player.roomCode);
      };
    } else if (!alreadyInvited) {
      btn.onclick = (e) => {
        e.preventDefault();
        if (sentInvitesTracker[player.roomCode] === window.myRoomCode) {
          alert(`⚠️ You have already sent an invitation to ${player.device}!`);
          return;
        }
        sentInvitesTracker[player.roomCode] = window.myRoomCode;
        btn.disabled = true;
        btn.innerText = "✓ Sent";
        btn.style.background = "#444";
        btn.style.boxShadow = "none";
        sendRoomInviteToPlayer(player.roomCode, player.device);
      };
    }
    wrapper.appendChild(row);
  });

  // 5. Direct Connect if 4-digit code searched and not in MQTT list:
  /* if (
    cleanCodeSearch.length === 4 &&
    cleanCodeSearch !== window.myRoomCode &&
    displayedCount === 0
  ) {*/

  if (false) {
    const directJoinCard = document.createElement("div");
    directJoinCard.style.cssText =
      "display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.85); border:1.5px solid #00ff80; padding:10px 14px; border-radius:10px; margin-bottom:6px; box-shadow:0 0 12px rgba(0,255,128,0.3);";
    directJoinCard.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <p style="margin:0; font-size:13px; color:#00ff80; font-weight:bold;">⚔️ Connect to Room #${cleanCodeSearch}</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <span style="font-size:11px; color:#aaa;">P2P Direct Connect</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <button style="background:#00ff80; color:#000; border:none; padding:6px 16px; font-weight:bold; border-radius:6px; cursor:pointer;" onclick="joinRemoteRoomByCode('${cleanCodeSearch}')">JOIN</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              `;
    wrapper.appendChild(directJoinCard);
  }

  // 6. Notice if nothing found:
  //if (displayedCount === 0 && cleanCodeSearch.length !== 4) {
  if (displayedCount === 0) {
    const emptyNotice = document.createElement("div");
    // emptyNotice.style.cssText =
    // "padding:12px; background:rgba(0,0,0,0.65); border:1px dashed #00ffff; border-radius:10px; text-align:center; margin-top:4px;";
    emptyNotice.style.cssText =
      "padding:12px; background:rgba(255,255,255,0.12); border:1.5px dashed #00ffff; border-radius:10px; text-align:center; margin-top:4px; text-shadow:1px 1px 3px #000;";
    if (queryTag !== "") {
      emptyNotice.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <p style="margin:0 0 4px 0; color:#ff6688; font-size:12px; font-weight:bold;">⚠️ No players found for "${searchFilterWord}"</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <span style="color:#ccc; font-size:11px;">Enter a valid 4-digit Room Code to connect directly.</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      `;
    } else {
      emptyNotice.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <p style="margin:0 0 4px 0; color:#00ff80; font-size:12px; font-weight:bold;">🟢 P2P Network Node Ready</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <span style="color:#ccc; font-size:11px;">No other players found online.<br> Share your room code <b>#${window.myRoomCode}</b> with your friends!</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      `;
    }
    wrapper.appendChild(emptyNotice);
  }
}
// ==========================================================================
// 🌐 100% FREE LIVE GLOBAL PLAYER DISCOVERY (MQTT REALTIME DATABASE)
// ==========================================================================
/*
let onlinePlayersRegistry = {};
let lobbyMqttClient = null;

function initGlobalLobbyBroker() {
  // 1. Agar library load na hui ho toh auto-load karega:
  if (typeof mqtt === "undefined") {
    if (!document.getElementById("mqtt-cdn-script")) {
      const script = document.createElement("script");
      script.id = "mqtt-cdn-script";
      script.src = "https://unpkg.com/mqtt@5.3.5/dist/mqtt.min.js";
      script.onload = () => {
        initGlobalLobbyBroker();
      };
      document.head.appendChild(script);
    }
    return;
  }

  if (lobbyMqttClient && lobbyMqttClient.connected) return;

  try {
    // 2. Free Public Secure WebSocket Broker (Zero Server / Free Database):
    lobbyMqttClient = mqtt.connect("wss://broker.emqx.io:8084/mqtt");

    lobbyMqttClient.on("connect", () => {
      lobbyMqttClient.subscribe("legend_of_fairy_tail/live_players/#");
      broadcastMyPresence();
    });

    lobbyMqttClient.on("message", (topic, payload) => {
      try {
        const data = JSON.parse(payload.toString());
        // Doosre players ka live data save karo:
        if (data.roomCode && data.roomCode !== window.myRoomCode) {
          onlinePlayersRegistry[data.roomCode] = data;
          const searchInput = document.getElementById("online-search-input");
          syncOnlineListLayoutDisplay(searchInput ? searchInput.value : "");
        }
      } catch (e) {}
    });
  } catch (e) {}

  // 3. Har 3 second mein apni Live Location aur Room Code broadcast karo:
  if (!window.mqttBroadcastTimer) {
    window.mqttBroadcastTimer = setInterval(broadcastMyPresence, 3000);
  }
}

function broadcastMyPresence() {
  if (lobbyMqttClient && lobbyMqttClient.connected) {
    const loc = currentOnlineUserCity || "Online";
    lobbyMqttClient.publish(
      "legend_of_fairy_tail/live_players/" + window.myRoomCode,
      JSON.stringify({
        roomCode: window.myRoomCode,
        device: getDeviceBrand(),
        city: loc,
        time: Date.now(),
      })
    );
  }
}
// 📜 REAL PLAYERS ONLY: Zero Fake Rooms & Live Auto-Update
function syncOnlineListLayoutDisplay(searchFilterWord = "") {
  let overlayBox =
    document.getElementById("options-online-content") ||
    document.getElementById("options-moves-content") ||
    document.querySelector(".options-text-overlay");
  if (!overlayBox) return;

  let wrapper = document.getElementById("mugen-online-scroller-panel");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "mugen-online-scroller-panel";
    wrapper.style.cssText =
      "display:flex; flex-direction:column; gap:6px; width:100%; max-height:260px; overflow-y:auto; padding:6px; box-sizing:border-box;";
    overlayBox.appendChild(wrapper);
  }

  wrapper.innerHTML = "";
  let queryTag = (searchFilterWord || "").toLowerCase().trim();

  // 1. 👑 AAPKA APNA HOST CARD (Always Visible at Top):
  const hostCard = document.createElement("div");
  hostCard.style.cssText =
    "display:flex; justify-content:space-between; align-items:center; background:rgba(0,255,255,0.22); border:2px solid #00ffff; padding:10px 14px; border-radius:10px; box-shadow:0 0 16px rgba(0,255,255,0.4); margin-bottom:6px;";
  hostCard.innerHTML = `
                                                                <div>
                                                                      <span style="font-size:13px; font-weight:bold; color:#00ffff; font-family:Arial, sans-serif; text-shadow:1px 1px 3px #000;">
                                                                              🆔 Room #${window.myRoomCode} (${currentOnlineUserIdentity}) (You) 🟢
                                                                                    </span>
                                                                                          <div style="font-size:11px; color:#aaffdd; margin-top:2px;">
                                                                                                  📍 Location: <b>${currentOnlineUserCity}</b>
                                                                                                        </div>
                                                                                                            </div>
                                                                                                                <span style="background:#00ff80; color:#000; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px; white-space:nowrap;">P2P HOST</span>
                                                                                                                  `;
  wrapper.appendChild(hostCard);

  // 2. Jo players 8 second se offline hain unhe memory se hatao:
  const now = Date.now();
  for (let code in onlinePlayersRegistry) {
    if (now - onlinePlayersRegistry[code].time > 8000) {
      delete onlinePlayersRegistry[code];
    }
  }

  // 3. City Density Sorting (Jis shehar ke zyada players honge wo upar):
  let players = Object.values(onlinePlayersRegistry);
  let cityCounts = {};
  players.forEach((p) => {
    cityCounts[p.city] = (cityCounts[p.city] || 0) + 1;
  });

  players.sort((a, b) => {
    let diff = (cityCounts[b.city] || 0) - (cityCounts[a.city] || 0);
    if (diff !== 0) return diff;
    return (a.city || "").localeCompare(b.city || "");
  });

  // 4. REAL ONLINE PLAYERS FILTER & DISPLAY:
  let displayedCount = 0;

  players.forEach((player) => {
    let pSearchText =
      `${player.device} ${player.city} ${player.roomCode}`.toLowerCase();
    if (queryTag !== "" && !pSearchText.includes(queryTag)) return;

    displayedCount++;
    const row = document.createElement("div");
    row.style.cssText =
      "display:flex; justify-content:space-between; align-items:center; background:rgba(255,34,68,0.22); border:2px solid #ff2244; box-shadow:0 0 16px rgba(255,34,68,0.45); padding:8px 12px; border-radius:8px; margin-bottom:4px;";
    row.innerHTML = `
                                                                                                                                                                                                                        <div style="display:flex; align-items:center; gap:8px;">
                                                                                                                                                                                                                                <span style="font-size:12px; color:#fff; font-weight:bold; font-family:Arial, sans-serif; text-shadow:1px 1px 2px #000;">
                                                                                                                                                                                                                                          🌐 ${player.device} (${player.city})
                                                                                                                                                                                                                                                  </span>
                                                                                                                                                                                                                                                          <span style="font-size:10px; color:#ffd700; background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:4px;">#${player.roomCode}</span>
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                      <button style="width:28px; height:28px; min-width:28px; border-radius:50%; background:linear-gradient(135deg, #00ff80, #00b359); color:#000; font-size:16px; font-weight:bold; border:1px solid #fff; display:flex; align-items:center; justify-content:center; cursor:pointer;">+</button>
                                                                                                                                                                                                                                                                          `;

    const btn = row.querySelector("button");
    btn.onclick = (e) => {
      e.preventDefault();
      joinRemoteRoomByCode(player.roomCode);
    };
    wrapper.appendChild(row);
  });

  // 5. Warning Notice: SIRF TABHI AAYEGA JAB SCREEN PAR KOI BHI REAL PLAYER NA HO
  if (displayedCount === 0) {
    const emptyNotice = document.createElement("div");
    emptyNotice.style.cssText =
      "padding:12px; background:rgba(0,0,0,0.65); border:1px dashed #00ffff; border-radius:10px; text-align:center; margin-top:4px;";
    if (queryTag !== "") {
      emptyNotice.innerHTML = `
                                                                                                                                                                                                                                                                                                                                            <p style="margin:0 0 4px 0; color:#ff6688; font-size:12px; font-weight:bold;">⚠️ No players found for "${searchFilterWord}"</p>
                                                                                                                                                                                                                                                                                                                                                    <span style="color:#ccc; font-size:11px;"> no result found in this ariyaa or code </span>
                                                                                                                                                                                                                                                                                                                                                          `;
    } else {
      emptyNotice.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                            <p style="margin:0 0 4px 0; color:#00ff80; font-size:12px; font-weight:bold;">🟢 P2P Network Node Ready</p>
                                                                                                                                                                                                                                                                                                                                                                                    <span style="color:#ccc; font-size:11px;">No players found in this area and no room found with this code.<br> Please try a different location <b>#${window.myRoomCode}</b> and enter the correct 4-digit room code</span>
                                                                                                                                                                                                                                                                                                                                                                                          `;
    }
    wrapper.appendChild(emptyNotice);
  }
}*/
// 📜 Live Density-Sorted List (Highest Active City on TOP + Search Filter)
/*
function syncOnlineListLayoutDisplay(searchFilterWord = "") {
  let overlayBox =
    document.getElementById("options-online-content") ||
    document.getElementById("options-moves-content") ||
    document.querySelector(".options-text-overlay");
  if (!overlayBox) return;

  let wrapper = document.getElementById("mugen-online-scroller-panel");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "mugen-online-scroller-panel";
    wrapper.style.cssText =
      "display:flex; flex-direction:column; gap:6px; width:100%; max-height:260px; overflow-y:auto; padding:6px; box-sizing:border-box;";
    overlayBox.appendChild(wrapper);
  }

  wrapper.innerHTML = "";
  let queryTag = (searchFilterWord || "").toLowerCase().trim();
  const cleanCodeSearch = queryTag.replace(/[^0-9]/g, "");

  // 1. 👑 AAPKA APNA HOST CARD:
  const hostCard = document.createElement("div");
  hostCard.style.cssText =
    "display:flex; justify-content:space-between; align-items:center; background:rgba(0,255,255,0.22); border:2px solid #00ffff; padding:10px 14px; border-radius:10px; box-shadow:0 0 16px rgba(0,255,255,0.4); margin-bottom:6px;";
  hostCard.innerHTML = `
                                                                                                                                                                                                                                                                                                                                <div>
                                                                                                                                                                                                                                                                                                                                      <span style="font-size:13px; font-weight:bold; color:#00ffff; font-family:Arial, sans-serif; text-shadow:1px 1px 3px #000;">
                                                                                                                                                                                                                                                                                                                                              🆔 Room #${window.myRoomCode} (${currentOnlineUserIdentity}) (You) 🟢
                                                                                                                                                                                                                                                                                                                                                    </span>
                                                                                                                                                                                                                                                                                                                                                          <div style="font-size:11px; color:#aaffdd; margin-top:2px;">
                                                                                                                                                                                                                                                                                                                                                                  📍 Location: <b>${currentOnlineUserCity}</b>
                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                <span style="background:#00ff80; color:#000; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px; white-space:nowrap;">P2P HOST</span>
                                                                                                                                                                                                                                                                                                                                                                                  `;
  wrapper.appendChild(hostCard);

  // 2. ⚡ 4-Digit Room Code Direct Join Card:
  if (cleanCodeSearch.length === 4 && cleanCodeSearch !== window.myRoomCode) {
    const directJoinCard = document.createElement("div");
    directJoinCard.style.cssText =
      "display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.85); border:1.5px solid #00ff80; padding:10px 14px; border-radius:10px; margin-bottom:6px; box-shadow:0 0 12px rgba(0,255,128,0.3);";
    directJoinCard.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                <div>
                                                                                                                                                                                                                                                                                                                                                                                                                        <p style="margin:0; font-size:13px; color:#00ff80; font-weight:bold;">⚔️ Connect to Room #${cleanCodeSearch}</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                <span style="font-size:11px; color:#aaa;">P2P WebRTC Direct Connect...</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                            <button style="background:#00ff80; color:#000; border:none; padding:6px 16px; font-weight:bold; border-radius:6px; cursor:pointer;" onclick="joinRemoteRoomByCode('${cleanCodeSearch}')">JOIN</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                `;
    wrapper.appendChild(directJoinCard);
  }

// 3. Jo players 8s se offline hain unhe list se hatao:
const now = Date.now();
for (let code in onlinePlayersRegistry) {
  if (now - onlinePlayersRegistry[code].time > 8000) {
    delete onlinePlayersRegistry[code];
  }
}

// 4. City Density Count (Jis shehar ke zyada log honge, wo upar aayega):
let players = Object.values(onlinePlayersRegistry);
let cityCounts = {};
players.forEach((p) => {
  cityCounts[p.city] = (cityCounts[p.city] || 0) + 1;
});

players.sort((a, b) => {
  let diff = (cityCounts[b.city] || 0) - (cityCounts[a.city] || 0);
  if (diff !== 0) return diff;
  return (a.city || "").localeCompare(b.city || "");
});

// 5. Search Bar Filter (Jodhpur, Japan, ya Device name):
let displayedCount = 0;

players.forEach((player) => {
  let pSearchText =
    `${player.device} ${player.city} ${player.roomCode}`.toLowerCase();
  if (queryTag !== "" && !pSearchText.includes(queryTag)) return;

  displayedCount++;
  const row = document.createElement("div");
  row.style.cssText =
    "display:flex; justify-content:space-between; align-items:center; background:rgba(255,34,68,0.22); border:2px solid #ff2244; box-shadow:0 0 16px rgba(255,34,68,0.45); padding:8px 12px; border-radius:8px; margin-bottom:4px;";
  row.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <div style="display:flex; align-items:center; gap:8px;">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <span style="font-size:12px; color:#fff; font-weight:bold; font-family:Arial, sans-serif; text-shadow:1px 1px 2px #000;">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      🌐 ${player.device} (${player.city})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <span style="font-size:10px; color:#ffd700; background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:4px;">REAL</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <button style="width:28px; height:28px; min-width:28px; border-radius:50%; background:linear-gradient(135deg, #00ff80, #00b359); color:#000; font-size:16px; font-weight:bold; border:1px solid #fff; display:flex; align-items:center; justify-content:center; cursor:pointer;">+</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      `;

  const btn = row.querySelector("button");
  btn.onclick = (e) => {
    e.preventDefault();
    joinRemoteRoomByCode(player.roomCode); // 👈 Direct P2P connect bina room code maange!
  };
  wrapper.appendChild(row);
});

// 6. Jab koi player online na ho ya search na mile:
 if (displayedCount === 0 && cleanCodeSearch.length !== 4) {
//if (displayedCount === 0) {
  const emptyNotice = document.createElement("div");
  emptyNotice.style.cssText =
    "padding:12px; background:rgba(0,0,0,0.65); border:1px dashed #00ffff; border-radius:10px; text-align:center; margin-top:4px;";
  if (queryTag !== "") {
    emptyNotice.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <p style="margin:0 0 4px 0; color:#ff6688; font-size:12px; font-weight:bold;">⚠️ No players found for "${searchFilterWord}"</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <span style="color:#ccc; font-size:11px;">Is location ya code par abhi koi active nahi hai. Enter 4-digit code to connect.</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      `;
  } else {
    emptyNotice.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <p style="margin:0 0 4px 0; color:#00ff80; font-size:12px; font-weight:bold;">🟢 P2P Network Node Ready</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <span style="color:#ccc; font-size:11px;">No players found in this area and no room found with this code.<br> Please try a different location <b>#${window.myRoomCode}</b> and enter the correct 4-digit room code</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      `;
  }
  wrapper.appendChild(emptyNotice);
}
}*/
// ==========================================================================
// 🌐 100% FREE LIVE GLOBAL PLAYER DISCOVERY (NO FIREBASE / NO SQL NEEDED)
// ==========================================================================
/*
let onlinePlayersRegistry = {};
let lobbyMqttClient = null;

function initGlobalLobbyBroker() {
  if (typeof mqtt === "undefined") return;
  if (lobbyMqttClient) return;

  // Free Public Secure WebSocket Broker (Zero Config)
  lobbyMqttClient = mqtt.connect("wss://broker.emqx.io:8084/mqtt");

  lobbyMqttClient.on("connect", () => {
    lobbyMqttClient.subscribe("legend_of_fairy_tail/live_players/#");
  });

  lobbyMqttClient.on("message", (topic, payload) => {
    try {
      const data = JSON.parse(payload.toString());
      if (data.roomCode && data.roomCode !== window.myRoomCode) {
        onlinePlayersRegistry[data.roomCode] = data;
        const searchInput = document.getElementById("online-search-input");
        syncOnlineListLayoutDisplay(searchInput ? searchInput.value : "");
      }
    } catch (e) {}
  });

  // Har 3 second mein apni Live Location aur Room Code broadcast karo
  setInterval(() => {
    if (
      lobbyMqttClient &&
      lobbyMqttClient.connected &&
      currentOnlineUserCity !== "Detecting Location..."
    ) {
      lobbyMqttClient.publish(
        "legend_of_fairy_tail/live_players/" + window.myRoomCode,
        JSON.stringify({
          roomCode: window.myRoomCode,
          device: getDeviceBrand(),
          city: currentOnlineUserCity,
          time: Date.now(),
        })
      );
    }
  }, 3000);
}*/

// 📜 Live Density-Sorted List (Highest City on TOP + Search Filter + Exact Text)
/*
function syncOnlineListLayoutDisplay(searchFilterWord = "") {
  let overlayBox = document.getElementById("options-online-content");
  if (!overlayBox) return;

  let wrapper = document.getElementById("mugen-online-scroller-panel");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "mugen-online-scroller-panel";
    wrapper.style.cssText =
      "display:flex; flex-direction:column; gap:6px; width:100%; max-height:260px; overflow-y:auto; padding:6px; box-sizing:border-box;";
    overlayBox.appendChild(wrapper);
  }

  wrapper.innerHTML = "";

  // 1. Aapka Apna Host Card (Exact same text & cyan color):
  const hostCard = document.createElement("div");
  hostCard.style.cssText =
    "display:flex; justify-content:space-between; align-items:center; background:rgba(0,255,255,0.22); border:2px solid #00ffff; padding:10px 14px; border-radius:10px; box-shadow:0 0 16px rgba(0,255,255,0.4); margin-bottom:6px;";
  hostCard.innerHTML = `
                                                                                                                                                                                                                  <span style="font-size:13px; font-weight:bold; color:#00ffff; font-family:Arial, sans-serif; text-shadow:1px 1px 3px #000;">🆔 Room #${window.myRoomCode} (${currentOnlineUserIdentity}) (You) 🟢</span>
                                                                                                                                                                                                                      <span style="background:#00ff80; color:#000; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px; white-space:nowrap;">P2P HOST</span>
                                                                                                                                                                                                                        `;
  wrapper.appendChild(hostCard);

  // 2. Jo players 8s se offline hain unhe list se hatao
  const now = Date.now();
  for (let code in onlinePlayersRegistry) {
    if (now - onlinePlayersRegistry[code].time > 8000) {
      delete onlinePlayersRegistry[code];
    }
  }

  // 3. Location Density Count (Jis shehar ke zyada log, woh upar)
  let players = Object.values(onlinePlayersRegistry);
  let cityCounts = {};
  players.forEach((p) => {
    cityCounts[p.city] = (cityCounts[p.city] || 0) + 1;
  });

  // Sort: Pehle Shehar ke player count se, fir City name se
  players.sort((a, b) => {
    let diff = (cityCounts[b.city] || 0) - (cityCounts[a.city] || 0);
    if (diff !== 0) return diff;
    return a.city.localeCompare(b.city);
  });

  // 4. Search Bar Filter (Jodhpur, Pakistan ya Room Code)
  let queryTag = searchFilterWord.toLowerCase().trim();
  let displayedCount = 0;

  players.forEach((player) => {
    let pSearchText =
      `${player.device} ${player.city} ${player.roomCode}`.toLowerCase();
    if (queryTag !== "" && !pSearchText.includes(queryTag)) return;

    displayedCount++;
    const row = document.createElement("div");
    row.style.cssText =
      "display:flex; justify-content:space-between; align-items:center; background:rgba(255,34,68,0.22); border:2px solid #ff2244; box-shadow:0 0 16px rgba(255,34,68,0.45); padding:8px 12px; border-radius:8px; margin-bottom:4px;";
    row.innerHTML = `
                                                                                                                                                                                                                                                                                                                            <div style="display:flex; align-items:center; gap:8px;">
                                                                                                                                                                                                                                                                                                                                    <span style="font-size:12px; color:#fff; font-weight:bold; font-family:Arial, sans-serif; text-shadow:1px 1px 2px #000;">🌐 ${player.device} (${player.city})</span>
                                                                                                                                                                                                                                                                                                                                            <span style="font-size:10px; color:#ffd700; background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:4px;">REAL</span>
                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                        <button style="width:28px; height:28px; min-width:28px; border-radius:50%; background:linear-gradient(135deg, #00ff80, #00b359); color:#000; font-size:16px; font-weight:bold; border:1px solid #fff; display:flex; align-items:center; justify-content:center; cursor:pointer;">+</button>
                                                                                                                                                                                                                                                                                                                                                            `;

    const btn = row.querySelector("button");
    btn.onclick = (e) => {
      e.preventDefault();
      joinRemoteRoomByCode(player.roomCode); // Direct P2P connect bina room code maange!
    };
    wrapper.appendChild(row);
  });

  // 5. Jab koi online na ho tab tumhara exact notice:
  if (displayedCount === 0) {
    const emptyNotice = document.createElement("div");
    emptyNotice.style.cssText =
      "padding:12px; background:rgba(0,0,0,0.65); border:1px dashed #00ffff; border-radius:10px; text-align:center; margin-top:4px;";
    emptyNotice.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                      <p style="margin:0 0 4px 0; color:#00ff80; font-size:12px; font-weight:bold;">🟢 P2P Network Node Ready</p>
                                                                                                                                                                                                                                                                                                                                                                                                                            <span style="color:#ccc; font-size:11px;">No players found in this area and no room found with this code.<br> Please try a different location <b>#${window.myRoomCode}</b> and enter the correct 4-digit room code </span>
                                                                                                                                                                                                                                                                                                                                                                                                                                `;
    wrapper.appendChild(emptyNotice);
  }
}*/
// 📜 FAKE ROOM HATA DIYA: Sirf Aapka Card aur Real Connected Players Aayenge
/*function syncOnlineListLayoutDisplay(searchFilterWord = "") {
  let overlayBox = document.getElementById("options-online-content");
  if (!overlayBox) return;

  let wrapper = document.getElementById("mugen-online-scroller-panel");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "mugen-online-scroller-panel";
    wrapper.style.cssText =
      "display:flex; flex-direction:column; gap:6px; width:100%; max-height:260px; overflow-y:auto; padding:6px; box-sizing:border-box;";
    overlayBox.appendChild(wrapper);
  }

  wrapper.innerHTML = "";

  // 1. 👑 Aapka Real Host Card:
  const hostCard = document.createElement("div");
  hostCard.style.cssText =
    "display:flex; justify-content:space-between; align-items:center; background:rgba(0,255,255,0.22); border:2px solid #00ffff; padding:10px 14px; border-radius:10px; box-shadow:0 0 16px rgba(0,255,255,0.4); margin-bottom:6px;";
  hostCard.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <span style="font-size:13px; font-weight:bold; color:#00ffff; font-family:Arial, sans-serif; text-shadow:1px 1px 3px #000;">🆔 Room #${window.myRoomCode} (${currentOnlineUserIdentity}) (You) 🟢</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <span style="background:#00ff80; color:#000; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px; white-space:nowrap;">P2P HOST</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        `;
  wrapper.appendChild(hostCard);

  // 2. 🌐 ONLY REAL CONNECTED PLAYERS (Glowing Red Background & Red Shadow):
  let realConnectedPlayers = localLobbyActiveMembers.filter(
    (m) => !m.isNPC && !m.isHost && (m.playerName || m.name)
  );

  realConnectedPlayers.forEach((player) => {
    let pDisplayName = player.playerName || player.name || "Real Player";
    let pCity = player.city || "Online";

    const row = document.createElement("div");
    row.style.cssText =
      "display:flex; justify-content:space-between; align-items:center; background:rgba(255,34,68,0.22); border:2px solid #ff2244; box-shadow:0 0 16px rgba(255,34,68,0.45); padding:8px 12px; border-radius:8px; margin-bottom:4px;";
    row.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <div style="display:flex; align-items:center; gap:8px;">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <span style="font-size:12px; color:#fff; font-weight:bold; font-family:Arial, sans-serif; text-shadow:1px 1px 2px #000;">🌐 ${pDisplayName} (${pCity})</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <span style="font-size:10px; color:#ffd700; background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:4px;">REAL</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <button style="width:28px; height:28px; min-width:28px; border-radius:50%; background:linear-gradient(135deg, #00ff80, #00b359); color:#000; font-size:16px; font-weight:bold; border:1px solid #fff; display:flex; align-items:center; justify-content:center;">✓</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          `;
    wrapper.appendChild(row);
  });

  // 3. Status Notice (Jab tak doosra player na ho):
  if (realConnectedPlayers.length === 0) {
    const emptyNotice = document.createElement("div");
    emptyNotice.style.cssText =
      "padding:12px; background:rgba(0,0,0,0.65); border:1px dashed #00ffff; border-radius:10px; text-align:center; margin-top:4px;";
    emptyNotice.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <p style="margin:0 0 4px 0; color:#00ff80; font-size:12px; font-weight:bold;">🟢 P2P Network Node Ready</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <span style="color:#ccc; font-size:11px;">No players found in this area and no room found with this code.<br> Please try a different location <b>#${window.myRoomCode}</b> and enter the correct 4-digit room code </span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                `;

    wrapper.appendChild(emptyNotice);
  }
}*/

// 🎤 ACTIVE MIC MATRIX (Left: 4 aur 4 = 8, Right: 4 aur 4 = 8 Grid + 100% Working Mute/Unmute):
let voiceMuteStateTracker = {};

function buildDynamicMicMatrixLayout() {
  const oldLeft = document.getElementById("mugen-left-mic-grid");
  const oldRight = document.getElementById("mugen-right-mic-grid");
  if (oldLeft) oldLeft.remove();
  if (oldRight) oldRight.remove();

  const leftAnchor = document.getElementById("p1TeamSlots");
  const rightAnchor = document.getElementById("enemyTeamSlots");
  if (!leftAnchor || !rightAnchor) return;

  const leftGrid = document.createElement("div");
  leftGrid.id = "mugen-left-mic-grid";
  leftGrid.className = "mugen-mic-matrix-container left-side-matrix";

  const rightGrid = document.createElement("div");
  rightGrid.id = "mugen-right-mic-grid";
  rightGrid.className = "mugen-mic-matrix-container right-side-matrix";

  function createInteractiveMic(key, label, container) {
    const mic = document.createElement("div");
    let isMuted = voiceMuteStateTracker[key] || false;

    mic.className = isMuted
      ? "mugen-live-mic-node muted-mic-off"
      : "mugen-live-mic-node active-mic-on";
    mic.innerHTML = isMuted
      ? `🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span>`
      : `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">${label}</span>`;

    const handleToggleMute = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      isMuted = !isMuted;
      voiceMuteStateTracker[key] = isMuted;

      mic.className = isMuted
        ? "mugen-live-mic-node muted-mic-off"
        : "mugen-live-mic-node active-mic-on";
      mic.innerHTML = isMuted
        ? `🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span>`
        : `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">${label}</span>`;

      // 1. Agar ye AAPKA APNA MIC hai -> Microphone hardware transmit band karo:
      let isMyOwnMic =
        (!window.isGuestClient && key === "p1_0") ||
        (window.isGuestClient && key === "enemy_0");
      if (isMyOwnMic) {
        if (window.localAudioStream) {
          window.localAudioStream.getAudioTracks().forEach((track) => {
            track.enabled = !isMuted;
          });
        }
        return;
      }

      // 2. Agar ye KISI AUR KA MIC hai -> LOCAL MUTE (Sirf aapke phone par sound block hogi):
      let parts = key.split("_");
      let slotType = parts[0];
      let slotIdx = parseInt(parts[1]);

      let member = localLobbyActiveMembers.find(
        (m) => m.slotType === slotType && m.index === slotIdx
      );

      if (member && member.peerId) {
        let remoteAudio = document.getElementById(
          "remoteAudio_" + member.peerId
        );
        if (remoteAudio) {
          remoteAudio.muted = isMuted; // 👈 Only your phone is muted!
        }
      } else {
        let allRemoteAudios = document.querySelectorAll(
          "audio[id^='remoteAudio_']"
        );
        allRemoteAudios.forEach((aud) => {
          aud.muted = isMuted;
        });
      }
    };

    mic.onclick = handleToggleMute;
    mic.addEventListener("touchstart", handleToggleMute, { passive: false });
    container.appendChild(mic);
  }
  /*function createInteractiveMic(key, label, container) {
    const mic = document.createElement("div");
    let isMuted = voiceMuteStateTracker[key] || false;

    mic.className = isMuted
      ? "mugen-live-mic-node muted-mic-off"
      : "mugen-live-mic-node active-mic-on";
    mic.innerHTML = isMuted
      ? `🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span>`
      : `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">${label}</span>`;

    const handleToggleMute = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      isMuted = !isMuted;
      voiceMuteStateTracker[key] = isMuted;

      mic.className = isMuted
        ? "mugen-live-mic-node muted-mic-off"
        : "mugen-live-mic-node active-mic-on";
      mic.innerHTML = isMuted
        ? `🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span>`
        : `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">${label}</span>`;

      // 🎤 Agar mic stream chalu hai toh audio track mute/unmute karo:
      if (window.localAudioStream) {
        let track = window.localAudioStream.getAudioTracks()[0];
        if (track) track.enabled = !isMuted;
      }
      // 🔇 Remote dost ki aawaz mute/unmute karo:
      let remoteAudio = document.getElementById("remoteVoiceAudio");
      if (remoteAudio && key.startsWith("enemy")) {
        remoteAudio.muted = isMuted;
      }
    };

    mic.onclick = handleToggleMute;
    mic.addEventListener("touchstart", handleToggleMute, { passive: false });
    container.appendChild(mic);
  }*/

  /*for (let i = 0; i < 8; i++) {
    if (mySelectedTeam[i]) {
      createInteractiveMic(`p1_${i}`, `T${i + 1}`, leftGrid);
    }
    if (enemySelectedTeam[i]) {
      createInteractiveMic(`enemy_${i}`, `E${i + 1}`, rightGrid);
    }
  }*/
  for (let i = 0; i < 8; i++) {
    // 🎤 Team A: Sirf Real Player ka mic banega
    /*let isRealA =
      (i === 0 && !window.isGuestClient && mySelectedTeam[0]) ||
      localLobbyActiveMembers.some(
        (m) => m.slotType === "p1" && m.index === i && !m.isNPC
      );*/

    //if (isRealA) {
    // createInteractiveMic(`p1_${i}`, `T${i + 1}`, leftGrid);
    // }
    // let styleA = isRealA
    //  ? "color:#fff; font-size:11px; font-weight:900; text-shadow:0 0 5px #00ffff, 0 0 10px #bf00ff, 1px 1px 2px #000;"
    // : "color:#00ffff; font-size:11px;";

    //  slotA.innerHTML = `${defaultIcon} <span style="${styleA}">${heroAName}</span>`;

    // 🎤 Team B: Sirf Real Player ka mic banega

    /* let isRealB =
      // (i === 0 && window.isGuestClient && enemySelectedTeam[0]) ||
      localLobbyActiveMembers.some(
        (m) => m.slotType === "enemy" && m.index === i && !m.isNPC
      );*/
    let isRealA =
      (i === 0 && !window.isGuestClient && mySelectedTeam[0]) ||
      localLobbyActiveMembers.some(
        (m) =>
          m.slotType === "p1" &&
          m.index === i &&
          !m.isNPC &&
          !m.isHost &&
          Boolean(m.roomCode || m.peerId)
      );
    if (isRealA) {
      createInteractiveMic(`p1_${i}`, `T${i + 1}`, leftGrid);
    }

    let isRealB = localLobbyActiveMembers.some(
      (m) =>
        m.slotType === "enemy" &&
        m.index === i &&
        !m.isNPC &&
        Boolean(m.roomCode || m.peerId)
    );

    if (isRealB) {
      createInteractiveMic(`enemy_${i}`, `E${i + 1}`, rightGrid);
    }
  }
  /* let styleB = isRealB
      ? "color:#fff; font-size:11px; font-weight:900; text-shadow:0 0 5px #ff0055, 0 0 10px #bf00ff, 1px 1px 2px #000;"
      : "color:#ff3366; font-size:11px;";

    slotB.innerHTML = `${botIcon} <span style="${styleB}">${heroBName}</span>`;*/

  if (leftGrid.children.length > 0)
    leftAnchor.parentNode.insertBefore(leftGrid, leftAnchor.nextSibling);
  if (rightGrid.children.length > 0)
    rightAnchor.parentNode.insertBefore(rightGrid, rightAnchor.nextSibling);
}

// 🎤 ACTIVE MIC MATRIX (Dono side 🎤 T1, 🎤 E1 logos):
/*function buildDynamicMicMatrixLayout() {
  const oldLeft = document.getElementById("mugen-left-mic-grid");
  const oldRight = document.getElementById("mugen-right-mic-grid");
  if (oldLeft) oldLeft.remove();
  if (oldRight) oldRight.remove();

  const leftAnchor = document.getElementById("p1TeamSlots");
  const rightAnchor = document.getElementById("enemyTeamSlots");
  if (!leftAnchor || !rightAnchor) return;

  const leftGrid = document.createElement("div");
  leftGrid.id = "mugen-left-mic-grid";
  leftGrid.className = "mugen-mic-matrix-container left-side-matrix";

  const rightGrid = document.createElement("div");
  rightGrid.id = "mugen-right-mic-grid";
  rightGrid.className = "mugen-mic-matrix-container right-side-matrix";

  for (let i = 0; i < 8; i++) {
    if (mySelectedTeam[i]) {
      const lMic = document.createElement("div");
      lMic.className = "mugen-live-mic-node active-mic-on";
      lMic.innerHTML = `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">T${
        i + 1
      }</span>`;
      lMic.onclick = () => {
        if (window.localAudioStream) {
          let track = window.localAudioStream.getAudioTracks()[0];
          if (track) {
            track.enabled = !track.enabled;
            lMic.className = track.enabled
              ? "mugen-live-mic-node active-mic-on"
              : "mugen-live-mic-node muted-mic-off";
            lMic.innerHTML = track.enabled
              ? `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">T${
                  i + 1
                }</span>`
              : `🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span>`;
          }
        }
      };
      leftGrid.appendChild(lMic);
    }

    if (enemySelectedTeam[i]) {
      const rMic = document.createElement("div");
      rMic.className = "mugen-live-mic-node active-mic-on";
      rMic.innerHTML = `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">E${
        i + 1
      }</span>`;
      rMic.onclick = () => {
        if (window.localAudioStream) {
          let track = window.localAudioStream.getAudioTracks()[0];
          if (track) {
            track.enabled = !track.enabled;
            rMic.className = track.enabled
              ? "mugen-live-mic-node active-mic-on"
              : "mugen-live-mic-node muted-mic-off";
            rMic.innerHTML = track.enabled
              ? `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">E${
                  i + 1
                }</span>`
              : `🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span>`;
          }
        }
      };
      rightGrid.appendChild(rMic);
    }
  }

  if (leftGrid.children.length > 0)
    leftAnchor.parentNode.insertBefore(leftGrid, leftAnchor.nextSibling);
  if (rightGrid.children.length > 0)
    rightAnchor.parentNode.insertBefore(rightGrid, rightAnchor.nextSibling);
}*/

/*
function handleHostReceivedData(conn, data) {
  if (data && data.type === "join_request") {
    // 1. Check if 16 Slots are Full (8 in Team A, 8 in Team B):
    let occupiedCount = 0;
    for (let i = 0; i < 8; i++) {
      if (mySelectedTeam[i]) occupiedCount++;
      if (enemySelectedTeam[i]) occupiedCount++;
    }

    // 2. Find Open Slot (Team B first, then Team A):
    let placed = false,
      targetTeam = "enemy",
      targetIdx = -1;

    for (let i = 0; i < 8; i++) {
      if (
        !enemySelectedTeam[i] &&
        !localLobbyActiveMembers.some(
          (m) => m.slotType === "enemy" && m.index === i && !m.isNPC
        )
      ) {
        targetTeam = "enemy";
        targetIdx = i;
        placed = true;
        break;
      }
    }
    if (!placed) {
      for (let i = 1; i < 8; i++) {
        if (
          !mySelectedTeam[i] &&
          !localLobbyActiveMembers.some(
            (m) => m.slotType === "p1" && m.index === i && !m.isNPC
          )
        ) {
          targetTeam = "p1";
          targetIdx = i;
          placed = true;
          break;
        }
      }
    }

    // 3. Agar 16 slots poore bhare hain:
    if (!placed || occupiedCount >= 16) {
      conn.send({
        type: "room_full",
        message:
          "⚠️ Lobby is FULL (16/16 Slots)! You cannot join this room right now.",
      });
      addRoomMessageLog(
        `⚠️ <b>[${
          data.playerName || "Player"
        }]</b> tried to join, but Room is <b>FULL (16/16)</b>! Remove a bot to let them in.`
      );
      return;
    }

    // 4. Open slot me real player ko add karo:
    const hero = data.hero || rosterData[activeCardIndex] || rosterData[0];
    if (targetTeam === "p1") mySelectedTeam[targetIdx] = hero;
    else enemySelectedTeam[targetIdx] = hero;

    localLobbyActiveMembers = localLobbyActiveMembers.filter(
      (m) => m.peerId !== conn.peer
    );

    localLobbyActiveMembers.push({
      slotType: targetTeam,
      index: targetIdx,
      isHost: false,
      name: hero.name,
      playerName: data.playerName || "Real Player",
      city: data.city || "Online",
      peerId: conn.peer,
      isNPC: false,
    });

    addRoomMessageLog(
      `📩 Room joining request from <b>[${
        data.playerName || "Real Player"
      }]</b>: Joined <b>${targetTeam === "p1" ? "Team A" : "Team B"} Slot #${
        targetIdx + 1
      }</b>!`
    );
    window.renderSlots();
    buildDynamicMicMatrixLayout();
    syncOnlineListLayoutDisplay();

    conn.send({
      type: "join_accepted",
      assignedSlot: targetIdx,
      assignedTeam: targetTeam,
      myTeam: mySelectedTeam,
      enemyTeam: enemySelectedTeam,
    });
  }
}

function joinRemoteRoomByCode(targetCode) {
  if (!targetCode) return;
  const cleanCode = targetCode.replace(/[^0-9]/g, "");
  if (!cleanCode || cleanCode.length !== 4) {
    alert("⚠️ Please enter a valid 4-digit Room Code (e.g. 5788)!");
    return;
  }
  if (typeof Peer === "undefined") {
    alert("Connecting network, please retry in 2s.");
    return;
  }

  if (window.activeGuestConn && window.activeGuestTargetCode === cleanCode) {
    alert(`Already connected to Room #${cleanCode}!`);
    return;
  }

  const guestPeer = new Peer();
  guestPeer.on("open", () => {
    const conn = guestPeer.connect("mugen-room-" + cleanCode);
    conn.on("open", () => {
      window.isGuestClient = true;
      window.isHost = false;
      window.activeGuestConn = conn;
      window.activeGuestTargetCode = cleanCode;

      addRoomMessageLog(
        `🟢 Connected to Room <b>#${cleanCode}</b>! Sending join request...`
      );
      conn.send({
        type: "join_request",
        playerName: currentOnlineUserIdentity,
        city: currentOnlineUserCity,
        hero: rosterData[activeCardIndex] || rosterData[0],
      });
    });

    conn.on("data", (data) => {
      if (data.type === "join_accepted") {
        alert(
          `✅ Joined Room #${cleanCode}! (${
            data.assignedTeam === "p1" ? "Team A" : "Team B"
          } Slot #${data.assignedSlot + 1})`
        );
        addRoomMessageLog(
          `✅ Joined Room <b>#${cleanCode}</b>! (${
            data.assignedTeam === "p1" ? "Team A" : "Team B"
          } Slot #${data.assignedSlot + 1})`
        );
        if (data.myTeam) mySelectedTeam = data.myTeam;
        if (data.enemyTeam) enemySelectedTeam = data.enemyTeam;
        window.renderSlots();
        buildDynamicMicMatrixLayout();
      } else if (data.type === "room_full") {
        alert(
          data.message ||
            "⚠️ Lobby is FULL (16/16 Slots)! You cannot join this room right now."
        );
        addRoomMessageLog(
          `⚠️ Room #${cleanCode} is FULL (16/16 Slots)! Could not join.`
        );
      } else if (data.type === "kicked") {
        alert("⚠️ You have been kicked from the room by the Host.");
        window.isGuestClient = false;
        window.isHost = true;
        window.activeGuestConn = null;
        window.activeGuestTargetCode = null;
        returnToSelectScreen();
      } else if (data.type === "start_fight") {
        setupArenaTeams();
        document.getElementById("selectScreen").style.display = "none";
        let overlay = document.getElementById("arenaStartOverlay");
        if (overlay) overlay.style.display = "flex";
      }
    });

    conn.on("error", () => {
      alert(
        "⚠️ Host is not online on Room #" +
          cleanCode +
          ". Please check room code with your friend."
      );
    });
  });
}

function syncOnlineListLayoutDisplay(searchFilterWord = "") {
  let overlayBox = document.getElementById("options-online-content");
  if (!overlayBox) return;

  let wrapper = document.getElementById("mugen-online-scroller-panel");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "mugen-online-scroller-panel";
    wrapper.style.cssText =
      "display:flex; flex-direction:column; gap:6px; width:100%; max-height:260px; overflow-y:auto; padding:6px; box-sizing:border-box;";
    overlayBox.appendChild(wrapper);
  }

  wrapper.innerHTML = "";
  let queryTag = searchFilterWord ? searchFilterWord.toLowerCase().trim() : "";

  // 1. 👑 Host Card (Aapki Apni ID - Turquoise Glow):
  const hostCard = document.createElement("div");
  hostCard.style.cssText =
    "display:flex; justify-content:space-between; align-items:center; background:rgba(0,255,255,0.22); border:2px solid #00ffff; padding:10px 14px; border-radius:10px; box-shadow:0 0 16px rgba(0,255,255,0.4); margin-bottom:6px;";
  hostCard.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <span style="font-size:13px; font-weight:bold; color:#00ffff; font-family:Arial, sans-serif; text-shadow:1px 1px 3px #000;">🆔 Room #${window.myRoomCode} (${currentOnlineUserIdentity}) (You) 🟢</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <span style="background:#00ff80; color:#000; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px; white-space:nowrap;">P2P ONLINE</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                `;
  wrapper.appendChild(hostCard);

  // 2. ⚔️ Direct Connect Card (Jab 4-digit Room Code likha jaye):
  const cleanNum = queryTag.replace(/[^0-9]/g, "");
  if (cleanNum.length === 4) {
    const directJoinCard = document.createElement("div");
    directJoinCard.style.cssText =
      "display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.85); border:1.5px solid #00ff80; padding:10px 14px; border-radius:10px; margin-bottom:6px; box-shadow:0 0 12px rgba(0,255,128,0.3);";
    directJoinCard.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <p style="margin:0; font-size:13px; color:#00ff80; font-weight:bold;">⚔️ Room Joining Request: Room #${cleanNum}</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <span style="font-size:11px; color:#aaa;">Send join request with ID: [${currentOnlineUserIdentity}]</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <button style="background:#00ff80; color:#000; border:none; padding:6px 16px; font-weight:bold; border-radius:6px; cursor:pointer;" onclick="joinRemoteRoomByCode('${cleanNum}')">JOIN</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                `;
    wrapper.appendChild(directJoinCard);
  }

  // 3. 🌐 ONLY REAL CONNECTED PLAYERS (Glowing Red Background & Red Shadow):
  let realConnectedPlayers = localLobbyActiveMembers.filter(
    (m) => !m.isNPC && !m.isHost && (m.playerName || m.name)
  );

  let displayedCount = 0;
  realConnectedPlayers.forEach((player) => {
    let pDisplayName = player.playerName || player.name || "Real Player";
    let pCity = player.city || "Online";
    let pSearchText = `${pDisplayName} ${pCity}`.toLowerCase();

    if (
      queryTag !== "" &&
      cleanNum.length !== 4 &&
      !pSearchText.includes(queryTag)
    ) {
      return;
    }

    displayedCount++;
    const row = document.createElement("div");
    row.style.cssText =
      "display:flex; justify-content:space-between; align-items:center; background:rgba(255,34,68,0.22); border:2px solid #ff2244; box-shadow:0 0 16px rgba(255,34,68,0.45); padding:8px 12px; border-radius:8px; margin-bottom:4px;";

    row.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <div style="display:flex; align-items:center; gap:8px;">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <span style="font-size:12px; color:#fff; font-weight:bold; font-family:Arial, sans-serif; text-shadow:1px 1px 2px #000;">🌐 ${pDisplayName} (${pCity})</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <span style="font-size:10px; color:#ffd700; background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:4px;">REAL</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <button class="player-invite-btn" style="width:28px; height:28px; min-width:28px; border-radius:50%; background:linear-gradient(135deg, #00ff80, #00b359); color:#000; font-size:16px; font-weight:bold; border:1px solid #fff; display:flex; align-items:center; justify-content:center; cursor:pointer;">✓</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          `;

    wrapper.appendChild(row);
  });

  // 4. Status message when no players match or no one connected yet:
  if (displayedCount === 0 && cleanNum.length !== 4) {
    const emptyNotice = document.createElement("div");
    emptyNotice.style.cssText =
      "padding:12px; background:rgba(0,0,0,0.65); border:1px dashed #00ffff; border-radius:10px; text-align:center; margin-top:4px;";

    if (queryTag !== "") {
      emptyNotice.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <p style="margin:0 0 4px 0; color:#ff99aa; font-size:12px; font-weight:bold;">⚠️ No online players found for "<b>${searchFilterWord}</b>"</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <span style="color:#ccc; font-size:11px;">To connect with a friend, enter their 4-digit Room Code (e.g. 5788) above!</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  `;
    } else {
      emptyNotice.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <p style="margin:0 0 4px 0; color:#00ff80; font-size:12px; font-weight:bold;">🟢 P2P Network Node Ready</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <span style="color:#ccc; font-size:11px;">No players found in this area and no room found with this code <br> Please try a different location<b>#${window.myRoomCode}</b> and enter the correct 4-digit room code.</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  `;
    }
    wrapper.appendChild(emptyNotice);
  }
} */

/*
function handleHostReceivedData(conn, data) {
  if (data && data.type === "join_request") {
    let placed = false,
      targetTeam = "p1",
      targetIdx = -1;
    for (let i = 1; i < 8; i++) {
      if (
        !mySelectedTeam[i] &&
        !localLobbyActiveMembers.some(
          (m) => m.slotType === "p1" && m.index === i
        )
      ) {
        targetTeam = "p1";
        targetIdx = i;
        placed = true;
        break;
      }
    }
    if (!placed) {
      for (let i = 0; i < 8; i++) {
        if (
          !enemySelectedTeam[i] &&
          !localLobbyActiveMembers.some(
            (m) => m.slotType === "enemy" && m.index === i
          )
        ) {
          targetTeam = "enemy";
          targetIdx = i;
          placed = true;
          break;
        }
      }
    }

    if (placed) {
      const hero = data.hero || rosterData[1] || rosterData[0];
      if (targetTeam === "p1") mySelectedTeam[targetIdx] = hero;
      else enemySelectedTeam[targetIdx] = hero;

      localLobbyActiveMembers.push({
        slotType: targetTeam,
        index: targetIdx,
        isHost: false,
        name: hero.name,
        peerId: conn.peer,
      });

      addRoomMessageLog(
        `📩 <b>[${data.playerName || "Friend"}]</b> (${
          data.city || "Online"
        }) joined <b>${targetTeam === "p1" ? "Team A" : "Team B"} Slot #${
          targetIdx + 1
        }</b>!`
      );
      window.renderSlots();

      conn.send({
        type: "join_accepted",
        assignedSlot: targetIdx,
        assignedTeam: targetTeam,
        myTeam: mySelectedTeam,
        enemyTeam: enemySelectedTeam,
      });
    } else {
      conn.send({ type: "room_full" });
    }
  }
}

function joinRemoteRoomByCode(targetCode) {
  if (!targetCode) return;
  const cleanCode = targetCode.replace(/[^0-9]/g, "");
  if (!cleanCode) {
    alert("Enter valid 4-digit Room Code!");
    return;
  }
  if (typeof Peer === "undefined") {
    alert("Connecting network, please retry in 2s.");
    return;
  }

  const guestPeer = new Peer();
  guestPeer.on("open", () => {
    const conn = guestPeer.connect("mugen-room-" + cleanCode);
    conn.on("open", () => {
      window.isGuestClient = true;
      window.isHost = false;
      alert(`Connected to Room #${cleanCode}!`);
      addRoomMessageLog(`🟢 Connected to Room <b>#${cleanCode}</b>!`);
      conn.send({
        type: "join_request",
        playerName: currentOnlineUserIdentity,
        city: currentOnlineUserCity,
        hero: rosterData[activeCardIndex] || rosterData[0],
      });
    });

    conn.on("data", (data) => {
      if (data.type === "join_accepted") {
        addRoomMessageLog(
          `✅ Joined ${
            data.assignedTeam === "p1" ? "Team A" : "Team B"
          } Slot #${data.assignedSlot + 1}.`
        );
        if (data.myTeam) mySelectedTeam = data.myTeam;
        if (data.enemyTeam) enemySelectedTeam = data.enemyTeam;
        window.renderSlots();
      } else if (data.type === "start_fight") {
        setupArenaTeams();
        document.getElementById("selectScreen").style.display = "none";
        let overlay = document.getElementById("arenaStartOverlay");
        if (overlay) overlay.style.display = "flex";
      }
    });

    conn.on("error", () => alert("Host is not online on Room #" + cleanCode));
  });
}
let globalNetworkPlayersDatabase = [];

function compileDensitySortedNetwork(userCurrentCity = "Jodhpur") {
  globalNetworkPlayersDatabase = [];

  const densityMatrix = [
    {
      city: "Nepal",
      count: 600,
      devices: ["Redmi Note 12", "Samsung Galaxy", "Realme 9 Pro", "Poco X5"],
    },
    {
      city: "Japan",
      count: 300,
      devices: ["iPhone 15 Pro", "Sony Xperia 1", "Oppo Reno", "Sharp Aquos"],
    },
    {
      city: "Gujarat",
      count: 90,
      devices: ["OnePlus 11", "Vivo V27", "Samsung S21", "Realme GT"],
    },
    {
      city: "Pakistan",
      count: 40,
      devices: ["Infinix Note", "Tecno Camon", "Vivo Y20", "Redmi 10"],
    },
    {
      city: "Jodhpur",
      count: 10,
      devices: ["Vivo Y31", "Vivo V2521", "Samsung M32", "Realme Narzo"],
    },
  ];

  densityMatrix.sort((a, b) => b.count - a.count);

  densityMatrix.forEach((hub) => {
    const sampleSize = Math.min(hub.count, 10);
    for (let i = 0; i < sampleSize; i++) {
      let randDevice = hub.devices[i % hub.devices.length];
      let playerCode = String(1000 + ((i * 387 + hub.count * 17) % 9000));
      globalNetworkPlayersDatabase.push({
        id: `${randDevice} (${hub.city}) #${playerCode}`,
        roomCode: playerCode,
        city: hub.city,
        searchTag: hub.city.toLowerCase(),
      });
    }
  });
}

function executeLobbyInviteJoin(incomingPlayerID) {
  let placed = false,
    targetTeam = "p1",
    targetIdx = -1;

  for (let i = 1; i < 8; i++) {
    if (
      !mySelectedTeam[i] &&
      !localLobbyActiveMembers.some((m) => m.slotType === "p1" && m.index === i)
    ) {
      targetTeam = "p1";
      targetIdx = i;
      placed = true;
      break;
    }
  }
  if (!placed) {
    for (let i = 0; i < 8; i++) {
      if (
        !enemySelectedTeam[i] &&
        !localLobbyActiveMembers.some(
          (m) => m.slotType === "enemy" && m.index === i
        )
      ) {
        targetTeam = "enemy";
        targetIdx = i;
        placed = true;
        break;
      }
    }
  }

  if (placed) {
    let hero = rosterData[targetIdx % rosterData.length] || rosterData[0];
    if (targetTeam === "p1") mySelectedTeam[targetIdx] = hero;
    else enemySelectedTeam[targetIdx] = hero;

    localLobbyActiveMembers.push({
      slotType: targetTeam,
      index: targetIdx,
      isHost: false,
      name: incomingPlayerID.split(" ")[0] || hero.name,
      hero: hero,
      isNPC: true,
    });

    addRoomMessageLog(
      `📩 <b>[${incomingPlayerID}]</b> joined <b>${
        targetTeam === "p1" ? "Team A" : "Team B"
      } Slot #${targetIdx + 1}</b>!`
    );
    window.renderSlots();
  } else {
    alert("Lobby is fully packed! Max 16 Players allowed.");
  }
}
function syncOnlineListLayoutDisplay(searchFilterWord = "") {
  let overlayBox = document.getElementById("options-online-content");
  if (!overlayBox) return;

  let wrapper = document.getElementById("mugen-online-scroller-panel");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "mugen-online-scroller-panel";
    wrapper.style.cssText =
      "display:flex; flex-direction:column; gap:6px; width:100%; max-height:260px; overflow-y:auto; padding:6px; box-sizing:border-box;";
    overlayBox.appendChild(wrapper);
  }

  wrapper.innerHTML = "";
  let queryTag = searchFilterWord ? searchFilterWord.toLowerCase().trim() : "";

  // 1. 👑 Host Card (Aapka Device - Turquoise Glow):
  const hostCard = document.createElement("div");
  hostCard.style.cssText =
    "display:flex; justify-content:space-between; align-items:center; background:rgba(0,255,255,0.22); border:2px solid #00ffff; padding:10px 14px; border-radius:10px; box-shadow:0 0 16px rgba(0,255,255,0.4); margin-bottom:6px;";
  hostCard.innerHTML = `
                                                      <span style="font-size:13px; font-weight:bold; color:#00ffff; font-family:Arial, sans-serif; text-shadow:1px 1px 3px #000;">🆔 Room #${window.myRoomCode} (${currentOnlineUserIdentity}) (You) 🟢</span>
                                                          <span style="background:#00ff80; color:#000; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px; white-space:nowrap;">P2P ONLINE</span>
                                                            `;
  wrapper.appendChild(hostCard);

  // 2. ⚔️ 4-Digit Room Code Direct Connect Card:
  const cleanNum = queryTag.replace(/[^0-9]/g, "");
  if (cleanNum.length === 4) {
    const directJoinCard = document.createElement("div");
    directJoinCard.style.cssText =
      "display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.85); border:1.5px solid #00ff80; padding:10px 14px; border-radius:10px; margin-bottom:6px; box-shadow:0 0 12px rgba(0,255,128,0.3);";
    directJoinCard.innerHTML = `
                                                                                            <div>
                                                                                                    <p style="margin:0; font-size:13px; color:#00ff80; font-weight:bold;">⚔️ Connect to Room #${cleanNum}</p>
                                                                                                            <span style="font-size:11px; color:#aaa;">P2P WebRTC Direct Connect...</span>
                                                                                                                  </div>
                                                                                                                        <button style="background:#00ff80; color:#000; border:none; padding:6px 16px; font-weight:bold; border-radius:6px; cursor:pointer;" onclick="joinRemoteRoomByCode('${cleanNum}')">JOIN</button>
                                                                                                                            `;
    wrapper.appendChild(directJoinCard);
  }

  // 3. 🌐 ONLY REAL CONNECTED PLAYERS (Glowing Red Shadow):
  let realConnectedPlayers = localLobbyActiveMembers.filter(
    (m) => !m.isNPC && !m.isHost && (m.playerName || m.name)
  );

  let displayedCount = 0;
  realConnectedPlayers.forEach((player) => {
    let pDisplayName = player.playerName || player.name || "Real Player";
    let pCity = player.city || "Online";
    let pSearchText = `${pDisplayName} ${pCity}`.toLowerCase();

    if (
      queryTag !== "" &&
      cleanNum.length !== 4 &&
      !pSearchText.includes(queryTag)
    ) {
      return;
    }

    displayedCount++;
    const row = document.createElement("div");
    row.style.cssText =
      "display:flex; justify-content:space-between; align-items:center; background:rgba(255,34,68,0.22); border:2px solid #ff2244; box-shadow:0 0 16px rgba(255,34,68,0.45); padding:8px 12px; border-radius:8px; margin-bottom:4px;";

    row.innerHTML = `
                                                                                                                                                                                                      <div style="display:flex; align-items:center; gap:8px;">
                                                                                                                                                                                                              <span style="font-size:12px; color:#fff; font-weight:bold; font-family:Arial, sans-serif; text-shadow:1px 1px 2px #000;">🌐 ${pDisplayName} (${pCity})</span>
                                                                                                                                                                                                                      <span style="font-size:10px; color:#ffd700; background:rgba(0,0,0,0.5); padding:2px 6px; border-radius:4px;">REAL</span>
                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                  <button class="player-invite-btn" style="width:28px; height:28px; min-width:28px; border-radius:50%; background:linear-gradient(135deg, #00ff80, #00b359); color:#000; font-size:16px; font-weight:bold; border:1px solid #fff; display:flex; align-items:center; justify-content:center; cursor:pointer;">✓</button>
                                                                                                                                                                                                                                      `;

    wrapper.appendChild(row);
  });

  // 4. Jab tak koi doosra real player connected na ho:
  if (displayedCount === 0 && cleanNum.length !== 4) {
    const emptyNotice = document.createElement("div");
    emptyNotice.style.cssText =
      "padding:12px; background:rgba(0,0,0,0.65); border:1px dashed #00ffff; border-radius:10px; text-align:center; margin-top:4px;";
    emptyNotice.innerHTML = `
                                                                                                                                                                                                                                                                        <p style="margin:0 0 4px 0; color:#00ff80; font-size:12px; font-weight:bold;">🟢 P2P Network Node Ready</p>
                                                                                                                                                                                                                                                                              <span style="color:#ccc; font-size:11px;">No players found in this area and no room found with this code.<br>Please try a different location <b>#${window.myRoomCode}</b> and enter the correct 4-digit room code!</span>
                                                                                                                                                                                                                                                                                  `;
    wrapper.appendChild(emptyNotice);
  }
}*/

/*
function syncOnlineListLayoutDisplay(searchFilterWord = "") {
  let overlayBox = document.getElementById("options-online-content");
  if (!overlayBox) return;

  let wrapper = document.getElementById("mugen-online-scroller-panel");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "mugen-online-scroller-panel";
    wrapper.style.cssText =
      "display:flex; flex-direction:column; gap:6px; width:100%; max-height:260px; overflow-y:auto; padding:6px; box-sizing:border-box;";
    overlayBox.appendChild(wrapper);
  }

  wrapper.innerHTML = "";
  let queryTag = searchFilterWord ? searchFilterWord.toLowerCase().trim() : "";

  // 1. Host Card (Aapki Apni ID):
  const hostCard = document.createElement("div");
  hostCard.style.cssText =
    "display:flex; justify-content:space-between; align-items:center; background:rgba(0,255,255,0.22); border:2px solid #00ffff; padding:10px 14px; border-radius:10px; box-shadow:0 0 16px rgba(0,255,255,0.4); margin-bottom:6px;";
  hostCard.innerHTML = `
                                                                                                                                                                                                                                                                            <span style="font-size:13px; font-weight:bold; color:#00ffff; font-family:Arial, sans-serif; text-shadow:1px 1px 3px #000;">👑 Room #${window.myRoomCode} (${currentOnlineUserIdentity}) (You) 🟢</span>
                                                                                                                                                                                                                                                                                <span style="background:#00ff80; color:#000; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px; white-space:nowrap;">P2P ONLINE</span>
                                                                                                                                                                                                                                                                                  `;
  wrapper.appendChild(hostCard);

  // 2. 4-Digit Room Code Direct Connect Card:
  const cleanNum = queryTag.replace(/[^0-9]/g, "");
  if (cleanNum.length === 4) {
    const directJoinCard = document.createElement("div");
    directJoinCard.style.cssText =
      "display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.85); border:1.5px solid #00ff80; padding:10px 14px; border-radius:10px; margin-bottom:6px; box-shadow:0 0 12px rgba(0,255,128,0.3);";
    directJoinCard.innerHTML = `
                                                                                                                                                                                                                                                                                                            <div>
                                                                                                                                                                                                                                                                                                                    <p style="margin:0; font-size:13px; color:#00ff80; font-weight:bold;">⚔️ Connect to Room #${cleanNum}</p>
                                                                                                                                                                                                                                                                                                                            <span style="font-size:11px; color:#aaa;">P2P WebRTC Direct Connect...</span>
                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                        <button style="background:#00ff80; color:#000; border:none; padding:6px 16px; font-weight:bold; border-radius:6px; cursor:pointer;" onclick="joinRemoteRoomByCode('${cleanNum}')">JOIN</button>
                                                                                                                                                                                                                                                                                                                                            `;
    wrapper.appendChild(directJoinCard);
  }

  // 3. Density-Sorted Active Players List (Nepal, Japan, Gujarat, Jodhpur):
  if (globalNetworkPlayersDatabase.length === 0) {
    compileDensitySortedNetwork(currentOnlineUserCity || "Jodhpur");
  }

  let matchedCount = 0;
  globalNetworkPlayersDatabase.forEach((player) => {
    if (cleanNum.length === 4) {
      if (player.roomCode !== cleanNum) return;
    } else if (
      queryTag !== "" &&
      !player.searchTag.includes(queryTag) &&
      !player.id.toLowerCase().includes(queryTag) &&
      !player.roomCode.includes(queryTag)
    ) {
      return;
    }

    matchedCount++;
    const row = document.createElement("div");
    row.style.cssText =
      "display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.65); border:1px solid rgba(0,255,255,0.35); padding:8px 12px; border-radius:8px; margin-bottom:4px;";
    row.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                          <div style="display:flex; align-items:center; gap:8px;">
                                                                                                                                                                                                                                                                                                                                                                                                                                                  <span style="font-size:12px; color:#fff; font-family:Arial, sans-serif; text-shadow:1px 1px 2px #000;">🌐 ${player.id}</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                              <button class="player-invite-btn" style="width:28px; height:28px; min-width:28px; border-radius:50%; background:linear-gradient(135deg, #00ff80, #00b359); color:#000; font-size:16px; font-weight:bold; border:1px solid #fff; display:flex; align-items:center; justify-content:center; cursor:pointer;">+</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                  `;

    const btn = row.querySelector(".player-invite-btn");
    btn.onclick = (e) => {
      if (e) e.preventDefault();
      executeLobbyInviteJoin(player.id);
      btn.disabled = true;
      btn.style.background = "#555";
      btn.style.color = "#aaa";
      btn.style.borderColor = "#777";
      btn.innerText = "✓";
    };

    wrapper.appendChild(row);
  });

  if (queryTag !== "" && matchedCount === 0 && cleanNum.length !== 4) {
    const noMatch = document.createElement("div");
    noMatch.style.cssText =
      "padding:10px; background:rgba(0,0,0,0.6); border:1px solid #ff3366; border-radius:8px; color:#ff99aa; font-size:12px; text-align:center;";
    noMatch.innerHTML = `⚠️ No online players found for "<b>${searchFilterWord}</b>". Try searching <b>Nepal</b>, <b>Japan</b>, <b>Gujarat</b>, <b>Jodhpur</b>, or a 4-digit Room Code.`;
    wrapper.appendChild(noMatch);
  }
}*/

/*
function syncOnlineListLayoutDisplay(searchFilterWord = "") {
  let overlayBox = document.getElementById("options-online-content");
  if (!overlayBox) return;

  let wrapper = document.getElementById("mugen-online-scroller-panel");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "mugen-online-scroller-panel";
    wrapper.style.cssText =
      "display:flex; flex-direction:column; gap:8px; width:100%; max-height:260px; overflow-y:auto; padding:6px; box-sizing:border-box;";
    overlayBox.appendChild(wrapper);
  }

  wrapper.innerHTML = "";
  let queryTag = searchFilterWord ? searchFilterWord.toLowerCase().trim() : "";

  // 👑 Sirf 1 Line Card (Taaj ke saath):
  const hostCard = document.createElement("div");
  hostCard.style.cssText =
    "display:flex; justify-content:space-between; align-items:center; background:rgba(0,255,255,0.22); border:2px solid #00ffff; padding:10px 14px; border-radius:10px; box-shadow:0 0 16px rgba(0,255,255,0.4); margin-bottom:6px;";
  hostCard.innerHTML = `
                                                    <span style="font-size:14px; font-weight:bold; color:#00ffff; font-family:Arial, sans-serif; text-shadow:1px 1px 3px #000;">👑 Room #${window.myRoomCode} (${currentOnlineUserIdentity}) (You) 🟢</span>
                                                        <span style="background:#00ff80; color:#000; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px; white-space:nowrap;">P2P ONLINE</span>
                                                          `;
  wrapper.appendChild(hostCard);

  // Search / Join Box:
  if (queryTag !== "") {
    const searchCard = document.createElement("div");
    searchCard.style.cssText =
      "display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.7); border:1px solid #00ff80; padding:10px 14px; border-radius:10px;";
    searchCard.innerHTML = `
                                                                                        <div>
                                                                                                <p style="margin:0; font-size:13px; color:#fff; font-weight:bold;">🔍 Search Room Code [${searchFilterWord}]</p>
                                                                                                        <span style="font-size:11px; color:#aaa;">P2P WebRTC Direct Connect...</span>
                                                                                                              </div>
                                                                                                                    <button style="background:#00ff80; color:#000; border:none; padding:6px 14px; font-weight:bold; border-radius:6px; cursor:pointer;" onclick="joinRemoteRoomByCode('${searchFilterWord}')">JOIN</button>
                                                                                                                        `;
    wrapper.appendChild(searchCard);
  }
}*/

/*
function syncOnlineListLayoutDisplay(searchFilterWord = "") {
  let overlayBox = document.getElementById("options-online-content");
  if (!overlayBox) {
    const sBar = document.getElementById("options-search-bar");
    if (sBar && sBar.parentNode) {
      overlayBox = document.createElement("div");
      overlayBox.id = "options-online-content";
      overlayBox.className = "options-text-overlay";
      overlayBox.style.display = "block";
      sBar.parentNode.insertBefore(overlayBox, sBar.nextSibling);
    }
  }
  if (!overlayBox) return;

  let wrapper = document.getElementById("mugen-online-scroller-panel");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "mugen-online-scroller-panel";
    wrapper.style.cssText =
      "display:flex; flex-direction:column; gap:8px; width:100%; max-height:260px; overflow-y:auto; padding:6px; box-sizing:border-box;";
    overlayBox.appendChild(wrapper);
  }

  wrapper.innerHTML = "";
  let queryTag = searchFilterWord ? searchFilterWord.toLowerCase().trim() : "";
  const hostCard = document.createElement("div");
  hostCard.style.cssText =
    "display:flex; flex-direction:column; gap:5px; background:rgba(0,255,255,0.22); border:2px solid #00ffff; padding:10px 14px; border-radius:10px; box-shadow:0 0 16px rgba(0,255,255,0.4); margin-bottom:6px;";
  hostCard.innerHTML = `
               <div style="display:flex; justify-content:space-between; align-items:center;">
                     <span style="font-size:14px; font-weight:bold; color:#00ffff; font-family:Arial, sans-serif; text-shadow:1px 1px 3px #000;">🌐 Room #${window.myRoomCode} (${currentOnlineUserIdentity}) (You) 🟢</span>
                           <span style="background:#00ff80; color:#000; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px;">P2P ONLINE</span>
                               </div>
                                   <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
                                         <span style="font-size:12px; color:#ffffff; text-shadow:1px 1px 2px #000;">🗺️ Live Map Location: <b>${currentOnlineUserCity}</b></span>
                                               <span style="font-size:11px; color:#ffd700;">Ping: 12ms</span>
                                                   </div>
                                                       <p style="margin:4px 0 0 0; font-size:11px; color:#aaffdd; text-shadow:1px 1px 2px #000;">Apne dosto ko Room Code <b>#${window.myRoomCode}</b> share karo live battle room me aane ke liye.</p>
                                                         `;
  wrapper.appendChild(hostCard);
  if (queryTag !== "") {
    const searchCard = document.createElement("div");
    searchCard.style.cssText =
      "display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.7); border:1px solid #00ff80; padding:10px 14px; border-radius:10px;";
    searchCard.innerHTML = `
                              <div>
                                      <p style="margin:0; font-size:13px; color:#fff; font-weight:bold;">🔍 Search Room Code [${searchFilterWord}]</p>
                                              <span style="font-size:11px; color:#aaa;">P2P WebRTC Direct Connect...</span>
                                                    </div>
                                                          <button style="background:#00ff80; color:#000; border:none; padding:6px 14px; font-weight:bold; border-radius:6px; cursor:pointer;" onclick="joinRemoteRoomByCode('${searchFilterWord}')">JOIN</button>
                                                              `;
    wrapper.appendChild(searchCard);
  }
}*/
/*function syncOnlineListLayoutDisplay(searchFilterWord = "") {
  let overlayBox = document.getElementById("options-online-content");
  if (!overlayBox) return;

  let wrapper = document.getElementById("mugen-online-scroller-panel");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "mugen-online-scroller-panel";
    wrapper.style.cssText =
      "display:flex; flex-direction:column; gap:8px; width:100%; max-height:260px; overflow-y:auto; padding:6px; box-sizing:border-box;";
    overlayBox.appendChild(wrapper);
  }

  wrapper.innerHTML = "";
  let queryTag = searchFilterWord.toLowerCase().trim();

  const hostCard = document.createElement("div");
  hostCard.style.cssText =*/
/*function overrideRosterSlotSystem() {
  window.isHost =
    window.isHost !== undefined ? window.isHost : !window.isGuestClient;

  window.handleSlotInteraction = function (type, i) {
    let slotMatch = localLobbyActiveMembers.find(
      (m) => m.slotType === type && m.index === i
    );
    let isTeamSlotFilled =
      type === "p1"
        ? Boolean(mySelectedTeam[i])
        : Boolean(enemySelectedTeam[i]);

    // 1. Agar slot bhara hua hai:
    if (slotMatch || isTeamSlotFilled) {
      let isRealPerson =
        slotMatch &&
        !slotMatch.isNPC &&
        !slotMatch.isHost &&
        !slotMatch.isLocalUser;
      let isHostMember = slotMatch && slotMatch.isHost;

      // RULE A: Host ko koi kick nahi kar sakta
      // if (isHostMember) {
      //alert("⚠️ Cannot kick or remove the Host!");
      // return;
      // }
      // Guest host ko kick nahi kar sakta, lekin Host khud apna hero change kar sakta hai:
      if (window.isGuestClient && isHostMember) {
        alert("⚠️ You cannot kick the Host!");
        return;
      }
      if (window.isHost && isHostMember) {
        mySelectedTeam.splice(i, 1);
        localLobbyActiveMembers = localLobbyActiveMembers.filter(
          (m) => !(m.slotType === type && m.index === i)
        );
        window.renderSlots();
        updateCardSelection(activeCardIndex);
        buildDynamicMicMatrixLayout();
        return;
      }

      // RULE B: Guest real player ko kick nahi kar sakta
      if (window.isGuestClient && isRealPerson) {
        alert(
          "⚠️ You cannot kick another real person! Only the Host has permission to kick real players."
        );
        return;
      }

      // RULE C: Host real player ko confirmation popup ke sath kick karega
      if (window.isHost && isRealPerson) {
        let pName = slotMatch.playerName || slotMatch.name || "Real Player";
        let confirmKick = confirm(
          `⚠️ This is a Real Person [${pName}]. Are you sure you want to Kick them from the room?`
        );
        if (confirmKick) {
          localLobbyActiveMembers = localLobbyActiveMembers.filter(
            (m) => !(m.slotType === type && m.index === i)
          );
          if (type === "p1") mySelectedTeam.splice(i, 1);
          else enemySelectedTeam.splice(i, 1);
          localLobbyActiveMembers.forEach((m) => {
            if (m.slotType === type && m.index > i) m.index -= 1;
          });
          if (activePeerConnections) {
            activePeerConnections.forEach((conn) => {
              try {
                conn.send({ type: "kicked", slot: i, team: type });
              } catch (e) {}
            });
          }
          addRoomMessageLog(`⚠️ Kicked real player [${pName}] from the room.`);
          window.renderSlots();
          buildDynamicMicMatrixLayout();
          syncOnlineListLayoutDisplay();
        }
        return;
      }

      // RULE D: Bot ko bina popup ke turant remove karo
      if (type === "p1") mySelectedTeam.splice(i, 1);
      else enemySelectedTeam.splice(i, 1);

      localLobbyActiveMembers = localLobbyActiveMembers.filter(
        (m) => !(m.slotType === type && m.index === i)
      );
      localLobbyActiveMembers.forEach((m) => {
        if (m.slotType === type && m.index > i) m.index -= 1;
      });

      window.renderSlots();
      updateCardSelection(activeCardIndex);
      buildDynamicMicMatrixLayout();
      return;
    }

    // 2. Empty slot me bina popup ke Bot inject karo:
    let botHero = rosterData[activeCardIndex] || rosterData[0];
    if (type === "p1") {
      mySelectedTeam[i] = botHero;
      localLobbyActiveMembers.push({
        slotType: "p1",
        index: i,
        isHost: i === 0,
        name: botHero.name,
        hero: botHero,
        isNPC: true,
      });
    } else {
      enemySelectedTeam[i] = botHero;
      localLobbyActiveMembers.push({
        slotType: "enemy",
        index: i,
        isHost: false,
        name: botHero.name,
        hero: botHero,
        isNPC: true,
      });
    }
    window.renderSlots();
    updateCardSelection(activeCardIndex);
    buildDynamicMicMatrixLayout();
  };
}*/

/*function overrideRosterSlotSystem() {
  window.isHost =
    window.isHost !== undefined ? window.isHost : !window.isGuestClient;

  window.handleSlotInteraction = function (type, i) {
    let slotMatch = localLobbyActiveMembers.find(
      (m) => m.slotType === type && m.index === i
    );
    let isTeamSlotFilled =
      type === "p1"
        ? Boolean(mySelectedTeam[i])
        : Boolean(enemySelectedTeam[i]);

    if (slotMatch || isTeamSlotFilled) {
      let isAnotherRealPerson =
        slotMatch &&
        !slotMatch.isNPC &&
        !slotMatch.isHost &&
        !slotMatch.isLocalUser;

      if (window.isGuestClient && isAnotherRealPerson) {
        alert(
          "⚠️ You can only remove your own player, not another real person!"
        );
        return;
      }

      if (window.isHost && isAnotherRealPerson) {
        let confirmKick = confirm(
          `Do you want to Kick player [${slotMatch.name}] from the arena room?`
        );
        if (confirmKick) {
          localLobbyActiveMembers = localLobbyActiveMembers.filter(
            (m) => !(m.slotType === type && m.index === i)
          );
          if (type === "p1") mySelectedTeam.splice(i, 1);
          else enemySelectedTeam.splice(i, 1);
          localLobbyActiveMembers.forEach((m) => {
            if (m.slotType === type && m.index > i) m.index -= 1;
          });
          renderSlots();
        }
        return;
      }

      if (type === "p1") mySelectedTeam.splice(i, 1);
      else enemySelectedTeam.splice(i, 1);

      localLobbyActiveMembers = localLobbyActiveMembers.filter(
        (m) => !(m.slotType === type && m.index === i)
      );
      localLobbyActiveMembers.forEach((m) => {
        if (m.slotType === type && m.index > i) m.index -= 1;
      });

      renderSlots();
      updateCardSelection(activeCardIndex);
      return;
    }

    let addBot = confirm(
      "This slot is empty. Do you want to inject an NPC Bot fighter here?"
    );
    if (addBot) {
      let botHero =
        rosterData[activeCardIndex] ||
        rosterData[Math.floor(Math.random() * rosterData.length)];
      if (type === "p1") {
        mySelectedTeam[i] = botHero;
        localLobbyActiveMembers.push({
          slotType: "p1",
          index: i,
          isHost: i === 0,
          name: botHero.name,
          hero: botHero,
          isNPC: true,
        });
      } else {
        enemySelectedTeam[i] = botHero;
        localLobbyActiveMembers.push({
          slotType: "enemy",
          index: i,
          isHost: false,
          name: botHero.name,
          hero: botHero,
          isNPC: true,
        });
      }
      renderSlots();
      updateCardSelection(activeCardIndex);
    }
  };
}*/

/*function restoreNativeRosterSelectionControl() {
  window.addHeroToTeam = function (targetTeam) {
    const hero = rosterData[activeCardIndex];
    if (!hero) return;
    if (targetTeam === "p1" && mySelectedTeam.length < 8)
      mySelectedTeam.push(hero);
    else if (targetTeam === "enemy" && enemySelectedTeam.length < 8)
      enemySelectedTeam.push(hero);
    window.renderSlots();
    updateCardSelection(activeCardIndex);
  };

  cardsList.forEach((card) => {
    card.onclick = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const idx = parseInt(card.getAttribute("data-index")) || 0;
      updateCardSelection(idx);
    };
  });
}*/
function syncLobbyChangeAcrossScreens() {
  if (window.isHost) {
    broadcastLobbyState();
  } else if (window.isGuestClient) {
    sendToHostRoom({
      type: "guest_lobby_update",
      roomCode: window.myRoomCode,
      myTeam: mySelectedTeam,
      enemyTeam: enemySelectedTeam,
      members: localLobbyActiveMembers,
    });
  }
}
// ❌ PURANA overrideRosterSlotSystem() aur restoreNativeRosterSelectionControl() DELETE KARKE
// ✅ YEH NAYA CODE PASTE KARO:
function overrideRosterSlotSystem() {
  window.isHost =
    window.isHost !== undefined ? window.isHost : !window.isGuestClient;

  window.handleSlotInteraction = function (type, i) {
    let slotMatch = localLobbyActiveMembers.find(
      (m) => m.slotType === type && m.index === i
    );
    let isTeamSlotFilled =
      type === "p1"
        ? Boolean(mySelectedTeam[i])
        : Boolean(enemySelectedTeam[i]);

    // 🎮 Check: Kya yeh Guest ka APNA khud ka slot hai?
    let isMyOwnGuestSlot =
      window.isGuestClient &&
      ((slotMatch && slotMatch.roomCode === window.myRoomCode) ||
        (type === (window.myAssignedTeam || "enemy") &&
          i ===
            (window.myAssignedSlot !== undefined ? window.myAssignedSlot : 0)));

    if (slotMatch || isTeamSlotFilled) {
      let isRealPerson =
        slotMatch &&
        !slotMatch.isNPC &&
        !slotMatch.isHost &&
        !slotMatch.isLocalUser &&
        !isMyOwnGuestSlot;
      let isHostMember = slotMatch && slotMatch.isHost;

      if (window.isGuestClient && isHostMember) {
        alert("⚠️ You cannot kick the Host!");
        return;
      }

      // 🎮 Guest apne khud ke slot par tap kare toh card hat jayega (Bina Kick Alert ke!):
      if (window.isGuestClient && isMyOwnGuestSlot) {
        window.isGuestReady = false;
        if (type === "p1") mySelectedTeam[i] = null;
        else enemySelectedTeam[i] = null;
        if (slotMatch) {
          slotMatch.name = "";
          slotMatch.hero = null;
          slotMatch.isReady = false;
        }
        window.renderSlots();
        updateCardSelection(activeCardIndex);
        syncLobbyChangeAcrossScreens();
        return;
      }

      if (window.isHost && isHostMember) {
        mySelectedTeam.splice(i, 1);
        localLobbyActiveMembers = localLobbyActiveMembers.filter(
          (m) => !(m.slotType === type && m.index === i)
        );
        window.renderSlots();
        updateCardSelection(activeCardIndex);
        buildDynamicMicMatrixLayout();
        syncLobbyChangeAcrossScreens();
        return;
      }

      if (window.isGuestClient && isRealPerson) {
        alert(
          "⚠️ You cannot kick another real person! Only the Host has permission to kick real players."
        );
        return;
      }

      if (window.isHost && isRealPerson) {
        let pName = slotMatch.playerName || slotMatch.name || "Real Player";
        let confirmKick = confirm(
          `⚠️ This is a Real Person [${pName}]. Are you sure you want to Kick them from the room?`
        );
        if (confirmKick) {
          localLobbyActiveMembers = localLobbyActiveMembers.filter(
            (m) => !(m.slotType === type && m.index === i)
          );
          if (type === "p1") mySelectedTeam.splice(i, 1);
          else enemySelectedTeam.splice(i, 1);
          localLobbyActiveMembers.forEach((m) => {
            if (m.slotType === type && m.index > i) m.index -= 1;
          });
          sendToAllGuests({
            type: "kicked",
            slot: i,
            team: type,
            targetRoomCode: slotMatch.roomCode || "",
          });
          addRoomMessageLog(`⚠️ Kicked real player [${pName}] from the room.`);
          window.renderSlots();
          buildDynamicMicMatrixLayout();
          syncOnlineListLayoutDisplay();
          syncLobbyChangeAcrossScreens();
        }
        return;
      }

      if (type === "p1") mySelectedTeam.splice(i, 1);
      else enemySelectedTeam.splice(i, 1);

      localLobbyActiveMembers = localLobbyActiveMembers.filter(
        (m) => !(m.slotType === type && m.index === i)
      );
      localLobbyActiveMembers.forEach((m) => {
        if (m.slotType === type && m.index > i) m.index -= 1;
      });

      window.renderSlots();
      updateCardSelection(activeCardIndex);
      buildDynamicMicMatrixLayout();
      syncLobbyChangeAcrossScreens();
      return;
    }

    let pickedHero = rosterData[activeCardIndex] || rosterData[0];

    // 🎮 Agar Guest apne khali slot par tap karke naya card bhar raha hai:
    if (window.isGuestClient && isMyOwnGuestSlot) {
      if (type === "p1") mySelectedTeam[i] = pickedHero;
      else enemySelectedTeam[i] = pickedHero;
      let myMem = localLobbyActiveMembers.find(
        (m) =>
          m.roomCode === window.myRoomCode ||
          (m.slotType === type && m.index === i)
      );
      if (myMem) {
        myMem.name = pickedHero.name;
        myMem.hero = pickedHero;
        myMem.isNPC = false;
        myMem.roomCode = window.myRoomCode;
        myMem.playerName = currentOnlineUserIdentity;
      } else {
        localLobbyActiveMembers.push({
          slotType: type,
          index: i,
          isHost: false,
          name: pickedHero.name,
          hero: pickedHero,
          roomCode: window.myRoomCode,
          playerName: currentOnlineUserIdentity,
          city: currentOnlineUserCity,
          isReady: false,
          isNPC: false,
        });
      }
      window.renderSlots();
      updateCardSelection(activeCardIndex);
      buildDynamicMicMatrixLayout();
      syncLobbyChangeAcrossScreens();
      return;
    }

    if (type === "p1") {
      let insertIdx = mySelectedTeam.length;
      mySelectedTeam.push(pickedHero);
      localLobbyActiveMembers.push({
        slotType: "p1",
        index: insertIdx,
        isHost: insertIdx === 0 && !window.isGuestClient,
        name: pickedHero.name,
        hero: pickedHero,
        isNPC: insertIdx !== 0 || window.isGuestClient,
      });
    } else {
      let insertIdx = enemySelectedTeam.length;
      enemySelectedTeam.push(pickedHero);
      localLobbyActiveMembers.push({
        slotType: "enemy",
        index: insertIdx,
        isHost: false,
        name: pickedHero.name,
        hero: pickedHero,
        isNPC: true,
      });
    }
    window.renderSlots();
    updateCardSelection(activeCardIndex);
    buildDynamicMicMatrixLayout();
    syncLobbyChangeAcrossScreens();
  };
}

function restoreNativeRosterSelectionControl() {
  window.addHeroToTeam = function (targetTeam) {
    const hero = rosterData[activeCardIndex];
    if (!hero) return;

    // 🎮 Agar Guest L2 / R2 / D (Blast) dabaye aur uska apna slot khali ho, toh naya card seedha uske slot mein jayega:
    if (window.isGuestClient) {
      let myType = window.myAssignedTeam || "enemy";
      let myIdx =
        window.myAssignedSlot !== undefined ? window.myAssignedSlot : 0;
      let myTeamArr = myType === "p1" ? mySelectedTeam : enemySelectedTeam;
      if (!myTeamArr[myIdx]) {
        myTeamArr[myIdx] = hero;
        let myMem = localLobbyActiveMembers.find(
          (m) =>
            m.roomCode === window.myRoomCode ||
            (m.slotType === myType && m.index === myIdx)
        );
        if (myMem) {
          myMem.name = hero.name;
          myMem.hero = hero;
          myMem.isNPC = false;
          myMem.roomCode = window.myRoomCode;
          myMem.playerName = currentOnlineUserIdentity;
        } else {
          localLobbyActiveMembers.push({
            slotType: myType,
            index: myIdx,
            isHost: false,
            name: hero.name,
            hero: hero,
            roomCode: window.myRoomCode,
            playerName: currentOnlineUserIdentity,
            city: currentOnlineUserCity,
            isReady: false,
            isNPC: false,
          });
        }
        window.renderSlots();
        updateCardSelection(activeCardIndex);
        buildDynamicMicMatrixLayout();
        syncLobbyChangeAcrossScreens();
        return;
      }
    }

    if (targetTeam === "p1" && mySelectedTeam.length < 8) {
      let idx = mySelectedTeam.length;
      mySelectedTeam.push(hero);
      localLobbyActiveMembers.push({
        slotType: "p1",
        index: idx,
        isHost: idx === 0 && !window.isGuestClient,
        name: hero.name,
        hero: hero,
        isNPC: idx !== 0 || window.isGuestClient,
      });
    } else if (targetTeam === "enemy" && enemySelectedTeam.length < 8) {
      let idx = enemySelectedTeam.length;
      enemySelectedTeam.push(hero);
      localLobbyActiveMembers.push({
        slotType: "enemy",
        index: idx,
        isHost: false,
        name: hero.name,
        hero: hero,
        isNPC: true,
      });
    }
    window.renderSlots();
    updateCardSelection(activeCardIndex);
    buildDynamicMicMatrixLayout();
    syncLobbyChangeAcrossScreens();
  };

  cardsList.forEach((card) => {
    card.onclick = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const idx = parseInt(card.getAttribute("data-index")) || 0;
      updateCardSelection(idx);
    };
  });
}
function setupDynamicNetworkPipeline() {
  const isOnline = navigator.onLine;

  if (isOnline) {
    console.log(
      "🟢 ONLINE NODE DETECTED: Fetching assets from Hugging Face CDN..."
    );
    // 🔗 Apne Hugging Face Static Space ka asli URL lagao (taaki photo/sound load ho sake)
    window.HF_CDN_URL =
      "https://huggingface.co/spaces/Itachi636777/legend-of-fairy-tail/resolve/main/";

    // 📡 Render Singapore Server URL Sync (Yahan bina duplicate slashes ke lagana)
    window.CUSTOM_FIGHT_SERVER_URL = "wss://fairy-tail-server.onrender.com";

    if (typeof initDedicatedFightServer === "function")
      initDedicatedFightServer();
    if (typeof requestMicrophonePermission === "function")
      requestMicrophonePermission();
  } else {
    console.log(
      "📴 OFFLINE MODE: Running completely inside Local mobile directory..."
    );
    window.HF_CDN_URL = "assets/";
    window.CUSTOM_FIGHT_SERVER_URL = null;
    window.isGuestClient = false;
  }
}
// 📍 Location: script.js (Line ~17710 - setupDynamicNetworkPipeline ke niche)
window.addEventListener("online", () => {
  if (gameStarted && (window.connectedHostRoomCode || window.isHost)) {
    showScreenNotification(
      "⚔️ Your match is still in progress! Reconnecting..."
    );
    if (window.isGuestClient && window.connectedHostRoomCode) {
      sendToHostRoom({
        type: "rejoin_match_request",
        roomCode: window.myRoomCode,
        playerName: currentOnlineUserIdentity,
      });
    } else if (window.isHost) {
      sendToAllGuests({ type: "host_minimized", state: false });
    }
  }
});

setupDynamicNetworkPipeline();
window.addEventListener("online", setupDynamicNetworkPipeline);
window.addEventListener("offline", setupDynamicNetworkPipeline);
// ==========================================================================
// 🛡️ BACKGROUND MINIMIZE & ZERO-PAUSE MULTIPLAYER HANDLER
// ==========================================================================
document.addEventListener("visibilitychange", () => {
  if (!gameStarted) return;
  const myF = getMyFighter();

  if (document.hidden) {
    // 1. Jisne minimize kiya uske fighter ka movement/attack turant stop karo:
    if (myF) {
      myF.moveLeft = false;
      myF.moveRight = false;
      myF.moveUp = false;
      myF.moveDown = false;
      myF.isBlocking = false;
      myF.isCharging = false;
    }
    if (window.isGuestClient) {
      sendRemotePlayerAction("move", {
        moveLeft: false,
        moveRight: false,
        moveUp: false,
        moveDown: false,
        isBlocking: false,
      });
    } else if (window.isHost) {
      // 2. Agar Host ne minimize kiya, toh background interval chalu rakho taaki Guest ka game kabhi pause na ho!
      sendToAllGuests({ type: "host_minimized", state: true });
      if (myF) myF.isMinimizedPlayer = true;
      if (!window._bgHostLoopInterval) {
        window._bgHostLoopInterval = setInterval(() => {
          if (document.hidden && gameStarted && window.isHost) {
            gameLoop();
          } else {
            clearInterval(window._bgHostLoopInterval);
            window._bgHostLoopInterval = null;
          }
        }, 50);
      }
    }
  } else {
    // Wapas game kholne par:
    if (window.isHost) {
      if (myF) myF.isMinimizedPlayer = false;
      if (window._bgHostLoopInterval) {
        clearInterval(window._bgHostLoopInterval);
        window._bgHostLoopInterval = null;
      }
      sendToAllGuests({ type: "host_minimized", state: false });
      startGameLoopSafe();
    } else if (window.isGuestClient) {
      startGameLoopSafe();
    }
  }
});
/*
function overrideRosterSlotSystem() {
  window.isHost =
    window.isHost !== undefined ? window.isHost : !window.isGuestClient;

  window.handleSlotInteraction = function (type, i) {
    let slotMatch = localLobbyActiveMembers.find(
      (m) => m.slotType === type && m.index === i
    );
    let isTeamSlotFilled =
      type === "p1"
        ? Boolean(mySelectedTeam[i])
        : Boolean(enemySelectedTeam[i]);

    if (slotMatch || isTeamSlotFilled) {
      let isRealPerson =
        slotMatch &&
        !slotMatch.isNPC &&
        !slotMatch.isHost &&
        !slotMatch.isLocalUser;
      let isHostMember = slotMatch && slotMatch.isHost;

      if (window.isGuestClient && isHostMember) {
        alert("⚠️ You cannot kick the Host!");
        return;
      }
      if (window.isHost && isHostMember) {
        mySelectedTeam.splice(i, 1);
        localLobbyActiveMembers = localLobbyActiveMembers.filter(
          (m) => !(m.slotType === type && m.index === i)
        );
        window.renderSlots();
        updateCardSelection(activeCardIndex);
        buildDynamicMicMatrixLayout();
        syncLobbyChangeAcrossScreens();
        return;
      }

      if (window.isGuestClient && isRealPerson) {
        alert(
          "⚠️ You cannot kick another real person! Only the Host has permission to kick real players."
        );
        return;
      }

      if (window.isHost && isRealPerson) {
        let pName = slotMatch.playerName || slotMatch.name || "Real Player";
        let confirmKick = confirm(
          `⚠️ This is a Real Person [${pName}]. Are you sure you want to Kick them from the room?`
        );
        if (confirmKick) {
          localLobbyActiveMembers = localLobbyActiveMembers.filter(
            (m) => !(m.slotType === type && m.index === i)
          );
          if (type === "p1") mySelectedTeam.splice(i, 1);
          else enemySelectedTeam.splice(i, 1);
          localLobbyActiveMembers.forEach((m) => {
            if (m.slotType === type && m.index > i) m.index -= 1;
          });
          sendToAllGuests({ type: "kicked", slot: i, team: type });
          addRoomMessageLog(`⚠️ Kicked real player [${pName}] from the room.`);
          window.renderSlots();
          buildDynamicMicMatrixLayout();
          syncOnlineListLayoutDisplay();
          syncLobbyChangeAcrossScreens();
        }
        return;
      }

      if (type === "p1") mySelectedTeam.splice(i, 1);
      else enemySelectedTeam.splice(i, 1);

      localLobbyActiveMembers = localLobbyActiveMembers.filter(
        (m) => !(m.slotType === type && m.index === i)
      );
      localLobbyActiveMembers.forEach((m) => {
        if (m.slotType === type && m.index > i) m.index -= 1;
      });

      window.renderSlots();
      updateCardSelection(activeCardIndex);
      buildDynamicMicMatrixLayout();
      syncLobbyChangeAcrossScreens();
      return;
    }

    let botHero = rosterData[activeCardIndex] || rosterData[0];
    if (type === "p1") {
      let insertIdx = mySelectedTeam.length;
      mySelectedTeam.push(botHero);
      localLobbyActiveMembers.push({
        slotType: "p1",
        index: insertIdx,
        isHost: insertIdx === 0 && !window.isGuestClient,
        name: botHero.name,
        hero: botHero,
        isNPC: insertIdx !== 0,
      });
    } else {
      let insertIdx = enemySelectedTeam.length;
      enemySelectedTeam.push(botHero);
      localLobbyActiveMembers.push({
        slotType: "enemy",
        index: insertIdx,
        isHost: false,
        name: botHero.name,
        hero: botHero,
        isNPC: true,
      });
    }
    window.renderSlots();
    updateCardSelection(activeCardIndex);
    buildDynamicMicMatrixLayout();
    syncLobbyChangeAcrossScreens();
  };
}

function restoreNativeRosterSelectionControl() {
  window.addHeroToTeam = function (targetTeam) {
    const hero = rosterData[activeCardIndex];
    if (!hero) return;
    if (targetTeam === "p1" && mySelectedTeam.length < 8) {
      let idx = mySelectedTeam.length;
      mySelectedTeam.push(hero);
      localLobbyActiveMembers.push({
        slotType: "p1",
        index: idx,
        isHost: idx === 0 && !window.isGuestClient,
        name: hero.name,
        hero: hero,
        isNPC: idx !== 0,
      });
    } else if (targetTeam === "enemy" && enemySelectedTeam.length < 8) {
      let idx = enemySelectedTeam.length;
      enemySelectedTeam.push(hero);
      localLobbyActiveMembers.push({
        slotType: "enemy",
        index: idx,
        isHost: false,
        name: hero.name,
        hero: hero,
        isNPC: true,
      });
    }
    window.renderSlots();
    updateCardSelection(activeCardIndex);
    buildDynamicMicMatrixLayout();
    syncLobbyChangeAcrossScreens();
  };

  cardsList.forEach((card) => {
    card.onclick = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const idx = parseInt(card.getAttribute("data-index")) || 0;
      updateCardSelection(idx);
    };
  });
}*/

window.renderSlots = function () {
  // window.renderSlots ke andar slotA ke liye:
  /* let isRealA =
    (i === 0 && !window.isGuestClient && mySelectedTeam[0]) ||
    localLobbyActiveMembers.some(
      (m) => m.slotType === "p1" && m.index === i && !m.isNPC
    );
  let styleA = isRealA
    ? "color:#fff; font-size:11px; font-weight:900; text-shadow:0 0 5px #00ffff, 0 0 10px #bf00ff, 1px 1px 2px #000;"
    : "color:#00ffff; font-size:11px;";
  slotA.innerHTML = `${defaultIcon} <span style="${styleA}">${heroAName}</span>`;

  // slotB ke liye:
  let isRealB =
    (i === 0 && window.isGuestClient && enemySelectedTeam[0]) ||
    localLobbyActiveMembers.some(
      (m) => m.slotType === "enemy" && m.index === i && !m.isNPC
    );
  let styleB = isRealB
    ? "color:#fff; font-size:11px; font-weight:900; text-shadow:0 0 5px #ff0055, 0 0 10px #bf00ff, 1px 1px 2px #000;"
    : "color:#ff3366; font-size:11px;";
  slotB.innerHTML = `${botIcon} <span style="${styleB}">${heroBName}</span>`;*/

  const defaultIcon = `<div style="width:26px; height:26px; min-width:26px; border-radius:50%; border:1.5px solid #ffd700; overflow:hidden; display:flex; align-items:center; justify-content:center; background:#fff;"><img src="assets/icon.png" style="width:100%; height:100%; object-fit:cover; transform:scale(1.6);" /></div>`;
  const botIcon = `<div style="width:26px; height:26px; min-width:26px; border-radius:50%; border:1.5px solid #ff3366; overflow:hidden; display:flex; align-items:center; justify-content:center; background:#fff;"><img src="assets/icon.png" style="width:100%; height:100%; object-fit:cover; transform:scale(1.6);" /></div>`;

  for (let i = 0; i < 8; i++) {
    let slotA = document.getElementById("p1TeamSlots")
      ? document.getElementById("p1TeamSlots").querySelectorAll(".slot-item")[i]
      : null;
    if (slotA) {
      let heroA =
        mySelectedTeam[i] ||
        localLobbyActiveMembers.find(
          (m) => m.slotType === "p1" && m.index === i
        );
      // if (heroA) {
      if (
        heroA &&
        (typeof heroA === "string" ||
          heroA.name ||
          (heroA.hero && heroA.hero.name))
      ) {
        let heroAName =
          typeof heroA === "string"
            ? heroA
            : heroA.name || (heroA.hero && heroA.hero.name) || "DEKU";
        let isRealA =
          (i === 0 && !window.isGuestClient && mySelectedTeam[0]) ||
          localLobbyActiveMembers.some(
            (m) => m.slotType === "p1" && m.index === i && !m.isNPC
          );
        let styleA = isRealA
          ? "color:#fff; font-size:11px; font-weight:900; text-shadow:0 0 5px #00ffff, 0 0 10px #bf00ff, 1px 1px 2px #000;"
          : "color:#00ffff; font-size:11px;";
        slotA.classList.remove("empty");
        slotA.innerHTML = `${defaultIcon} <span style="${styleA}">${heroAName}</span>`;
        // slotA.innerHTML = `${defaultIcon} <span style="color:#00ffff; font-size:11px;">${heroAName}</span>`;
        slotA.onclick = () => window.handleSlotInteraction("p1", i);
      } else {
        slotA.classList.add("empty");

        slotA.innerHTML = `<span>Slot ${i + 1}</span>`;
        slotA.onclick = () => window.handleSlotInteraction("p1", i);
      }
    }

    let slotB = document.getElementById("enemyTeamSlots")
      ? document
          .getElementById("enemyTeamSlots")
          .querySelectorAll(".slot-item")[i]
      : null;
    if (slotB) {
      let heroB =
        enemySelectedTeam[i] ||
        localLobbyActiveMembers.find(
          (m) => m.slotType === "enemy" && m.index === i
        );
      //if (heroB) {
      if (
        heroB &&
        (typeof heroB === "string" ||
          heroB.name ||
          (heroB.hero && heroB.hero.name))
      ) {
        let heroBName =
          typeof heroB === "string"
            ? heroB
            : heroB.name || (heroB.hero && heroB.hero.name) || "GOKU BLACK";
        let isRealB =
          // (i === 0 && window.isGuestClient && enemySelectedTeam[0]) ||
          localLobbyActiveMembers.some(
            (m) => m.slotType === "enemy" && m.index === i && !m.isNPC
          );
        let styleB = isRealB
          ? "color:#fff; font-size:11px; font-weight:900; text-shadow:0 0 5px #ff0055, 0 0 10px #bf00ff, 1px 1px 2px #000;"
          : "color:#ff3366; font-size:11px;";
        slotB.classList.remove("empty");
        slotB.innerHTML = `${botIcon} <span style="${styleB}">${heroBName}</span>`;
        //  slotB.innerHTML = `${botIcon} <span style="color:#ff3366; font-size:11px;">${heroBName}</span>`;
        slotB.onclick = () => window.handleSlotInteraction("enemy", i);
      } else {
        slotB.classList.add("empty");
        slotB.innerHTML = `<span>Enemy ${i + 1}</span>`;
        slotB.onclick = () => window.handleSlotInteraction("enemy", i);
      }
    }
  }

  /* const hostStartBtn = document.getElementById("btn-start-fight");
  if (
    hostStartBtn &&
    (localLobbyActiveMembers.length > 0 ||
      mySelectedTeam.length > 0 ||
      enemySelectedTeam.length > 0)
  ) {
    hostStartBtn.style.boxShadow = "0 0 25px #00ff80, inset 0 0 10px #00ff80";
    hostStartBtn.style.border = "2px solid #00ff80";
  }
};*/
  const hostStartBtn = document.getElementById("btn-start-fight");
  if (hostStartBtn) {
    if (window.isGuestClient) {
      // 🎮 GUEST PHONE: Show READY / READY ✓ button
      if (window.isGuestReady) {
        hostStartBtn.innerText = "READY ✓";
        hostStartBtn.style.background =
          "linear-gradient(135deg, #00ff80, #00b359)";
        hostStartBtn.style.color = "#000";
        hostStartBtn.style.border = "2px solid #fff";
        hostStartBtn.style.boxShadow = "0 0 25px #00ff80, 0 0 40px #00ff80";
      } else {
        hostStartBtn.innerText = "READY";
        hostStartBtn.style.background =
          "linear-gradient(135deg, #ff0033, #b30024)";
        hostStartBtn.style.color = "#fff";
        hostStartBtn.style.border = "2px solid #ffd700";
        hostStartBtn.style.boxShadow = "0 0 15px rgba(255, 0, 50, 0.8)";
      }
    } else {
      // 👑 HOST PHONE: Show START button; Green Signal ONLY when Guest is READY!
      let remoteRealPlayers = localLobbyActiveMembers.filter(
        (m) => !m.isNPC && !m.isHost
      );
      let allGuestsReady =
        remoteRealPlayers.length > 0 &&
        remoteRealPlayers.every((m) => m.isReady);

      hostStartBtn.innerText = "START";
      if (allGuestsReady) {
        // 🟢 GREEN SIGNAL ON HOST START BUTTON WHEN GUEST CLICKS READY!
        hostStartBtn.style.background =
          "linear-gradient(135deg, #00ff80, #00b359)";
        hostStartBtn.style.color = "#000";
        hostStartBtn.style.border = "2px solid #ffffff";
        hostStartBtn.style.boxShadow =
          "0 0 28px #00ff80, 0 0 50px #00ff80, inset 0 0 12px #00ff80";
      } else {
        hostStartBtn.style.background =
          "linear-gradient(135deg, #ff0033, #b30024)";
        hostStartBtn.style.color = "#fff";
        hostStartBtn.style.border = "2px solid #ffd700";
        hostStartBtn.style.boxShadow = "0 0 15px rgba(255, 0, 50, 0.8)";
      }
    }
  }
};
function patchUIRuntimeSlots() {
  const p1SlotItems = document.getElementById("p1TeamSlots")
    ? document.getElementById("p1TeamSlots").querySelectorAll(".slot-item")
    : [];
  p1SlotItems.forEach((slot, i) => {
    slot.onclick = () => window.handleSlotInteraction("p1", i);
  });
  const enemySlotItems = document.getElementById("enemyTeamSlots")
    ? document.getElementById("enemyTeamSlots").querySelectorAll(".slot-item")
    : [];
  enemySlotItems.forEach((slot, i) => {
    slot.onclick = () => window.handleSlotInteraction("enemy", i);
  });
}

const networkSearchInputBox = document.getElementById("online-search-input");
if (networkSearchInputBox) {
  networkSearchInputBox.oninput = (event) => {
    syncOnlineListLayoutDisplay(event.target.value);
  };
}
const searchBtnNode = document.querySelector(".search-submit-btn");
if (searchBtnNode) {
  searchBtnNode.onclick = (e) => {
    if (e) e.preventDefault();
    const val = networkSearchInputBox ? networkSearchInputBox.value : "";
    syncOnlineListLayoutDisplay(val);
  };
}

overrideRosterSlotSystem();
restoreNativeRosterSelectionControl();
setTimeout(() => {
  patchUIRuntimeSlots();
  window.renderSlots();
}, 400);
syncOnlineListLayoutDisplay();
if (navigator.onLine) {
  // 📍 Game open hote hi automatic native permission pop-up trigger:
  fetchRealLiveLocation();
  requestMicrophonePermission();
  initDedicatedFightServer();
  initGlobalLobbyBroker();
  initRealPeerNetwork();
} else {
  currentOnlineUserCity = "Offline";
  currentOnlineUserIdentity = `${getDeviceBrand()} (Offline)`;
  syncOnlineListLayoutDisplay();
}
const searchInputEl = document.getElementById("online-search-input");
const modalContentEl = document.querySelector(".options-modal-content");

if (searchInputEl) {
  // Jab typing shuru ho, modal ko thoda upar shift karo
  //searchInputEl.addEventListener("focus", () => {
  // if (modalContentEl) modalContentEl.classList.add("keyboard-up");
  //});

  // Jab typing khatam ho, normal position par lao
  searchInputEl.addEventListener("blur", () => {
    if (modalContentEl) modalContentEl.classList.remove("keyboard-up");
  });

  // Enter dabane par keyboard turant hide ho jaye
  searchInputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchInputEl.blur(); // 👈 Mobile keyboard band kar dega
      syncOnlineListLayoutDisplay(searchInputEl.value);
    }
  });
}

const searchSubmitBtn = document.querySelector(".search-submit-btn");
if (searchSubmitBtn && searchInputEl) {
  searchSubmitBtn.addEventListener("click", (e) => {
    if (e) e.preventDefault();
    searchInputEl.blur(); // 👈 SEARCH dabate hi keyboard band
    syncOnlineListLayoutDisplay(searchInputEl.value);
  });
}

/*
syncOnlineListLayoutDisplay();
fetchRealLiveLocation();
initRealPeerNetwork();*/
/*
function getDeviceBrand() {
  const ua = navigator.userAgent || "";
  if (ua.includes("iPhone")) return "iPhone";
  if (ua.includes("iPad")) return "iPad";
  if (ua.includes("Vivo")) return "Vivo";
  if (ua.includes("Samsung")) return "Samsung";
  if (ua.includes("Oppo")) return "Oppo";
  if (ua.includes("OnePlus")) return "OnePlus";
  if (ua.includes("Redmi") || ua.includes("Xiaomi")) return "Redmi";
  if (ua.includes("Realme")) return "Realme";
  if (ua.includes("Android")) return "Android Mobile";
  return "Player Device";
}

let currentOnlineUserCity = "Detecting Location...";
let currentOnlineUserIdentity = `${getDeviceBrand()} (Detecting Location...)`;
window.myRoomCode =
  window.myRoomCode || String(Math.floor(1000 + Math.random() * 9000));
let localLobbyActiveMembers = [];
let peerNode = null;
let activePeerConnections = [];

// 📩 MESSAGE ROUTING: Sirf MESSAGE (anime) tab me dikhega
function addRoomMessageLog(text) {
  const container =
    document.getElementById("mugen-message-logs") ||
    document.getElementById("options-message-content");
  if (container) {
    const p = document.createElement("p");
    p.style.cssText =
      "border-bottom:1px solid rgba(0,255,128,0.25); padding:6px 0; margin:4px 0; color:#00ff80 !important; font-size:13px; font-family:Arial, sans-serif; text-shadow:1px 1px 2px #000;";
    p.innerHTML = text;
    container.appendChild(p);
  }
}

// 🌍 100% REAL LIVE LOCATION (Japan me Japan, Jaipur me Jaipur, Jodhpur me Jodhpur):
async function fetchRealLiveLocation() {
  let liveLoc = "";

  // 1. HTML5 Browser Geolocation (Exact GPS agar permission mile)
  if (navigator.geolocation) {
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 3000,
          maximumAge: 60000,
        });
      });
      if (pos && pos.coords) {
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`
        );
        const geo = await res.json();
        if (geo && (geo.city || geo.locality || geo.countryName)) {
          liveLoc = geo.city || geo.locality || geo.countryName;
        }
      }
    } catch (e) {}
  }

  // 2. Live IP API Check
  if (!liveLoc) {
    try {
      const res = await fetch("https://ipwho.is/");
      const d = await res.json();
      if (d && d.success && d.city) liveLoc = `${d.city}, ${d.country}`;
    } catch (e) {
      try {
        const res2 = await fetch("https://ipapi.co/json/");
        const d2 = await res2.json();
        if (d2 && d2.city)
          liveLoc = `${d2.city}, ${d2.country_name || ""}`.trim();
      } catch (err) {}
    }
  }

  // 3. System Timezone Fallback
  if (!liveLoc) {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) {
        if (tz.includes("Tokyo")) liveLoc = "Tokyo, Japan";
        else if (tz.includes("Kolkata")) liveLoc = "India";
        else liveLoc = tz.split("/")[1] || tz;
      }
    } catch (e) {}
  }

  if (!liveLoc) liveLoc = "Online Node";
  currentOnlineUserCity = liveLoc;
  currentOnlineUserIdentity = `${getDeviceBrand()} (${liveLoc})`;
  syncOnlineListLayoutDisplay();
  return liveLoc;
}

// 📡 REAL PEERJS WEBRTC P2P BACKEND (Free, Zero Server, Low Load)
function initRealPeerNetwork() {
  if (typeof Peer === "undefined") {
    setTimeout(initRealPeerNetwork, 1000);
    return;
  }
  if (peerNode) return;

  const hostPeerRoomId = "mugen-room-" + window.myRoomCode;
  try {
    peerNode = new Peer(hostPeerRoomId);
    peerNode.on("open", () => {
      addRoomMessageLog(
        `🟢 <b>Lobby Host Online:</b> Room Code <b>#${window.myRoomCode}</b> ready. Share with friends!`
      );
      syncOnlineListLayoutDisplay();
    });

    peerNode.on("connection", (conn) => {
      activePeerConnections.push(conn);
      conn.on("data", (data) => handleHostReceivedData(conn, data));
      conn.on("close", () => {
        activePeerConnections = activePeerConnections.filter((c) => c !== conn);
        addRoomMessageLog(`⚠️ Remote player disconnected.`);
      });
    });

    peerNode.on("error", (err) => {
      if (err.type === "unavailable-id") {
        window.myRoomCode = String(Math.floor(1000 + Math.random() * 9000));
        peerNode = null;
        initRealPeerNetwork();
      }
    });
  } catch (e) {}
}

function handleHostReceivedData(conn, data) {
  if (data && data.type === "join_request") {
    let placed = false,
      targetTeam = "p1",
      targetIdx = -1;
    for (let i = 1; i < 8; i++) {
      if (
        !mySelectedTeam[i] &&
        !localLobbyActiveMembers.some(
          (m) => m.slotType === "p1" && m.index === i
        )
      ) {
        targetTeam = "p1";
        targetIdx = i;
        placed = true;
        break;
      }
    }
    if (!placed) {
      for (let i = 0; i < 8; i++) {
        if (
          !enemySelectedTeam[i] &&
          !localLobbyActiveMembers.some(
            (m) => m.slotType === "enemy" && m.index === i
          )
        ) {
          targetTeam = "enemy";
          targetIdx = i;
          placed = true;
          break;
        }
      }
    }

    if (placed) {
      const hero = data.hero || rosterData[1] || rosterData[0];
      if (targetTeam === "p1") mySelectedTeam[targetIdx] = hero;
      else enemySelectedTeam[targetIdx] = hero;

      localLobbyActiveMembers.push({
        slotType: targetTeam,
        index: targetIdx,
        isHost: false,
        name: hero.name,
        peerId: conn.peer,
      });

      addRoomMessageLog(
        `📩 <b>[${data.playerName || "Friend"}]</b> (${
          data.city || "Online"
        }) joined <b>${targetTeam === "p1" ? "Team A" : "Team B"} Slot #${
          targetIdx + 1
        }</b>!`
      );
      window.renderSlots();

      conn.send({
        type: "join_accepted",
        assignedSlot: targetIdx,
        assignedTeam: targetTeam,
        myTeam: mySelectedTeam,
        enemyTeam: enemySelectedTeam,
      });
    } else {
      conn.send({ type: "room_full" });
    }
  }
}

function joinRemoteRoomByCode(targetCode) {
  if (!targetCode) return;
  const cleanCode = targetCode.replace(/[^0-9]/g, "");
  if (!cleanCode) {
    alert("Enter valid 4-digit Room Code!");
    return;
  }
  if (typeof Peer === "undefined") {
    alert("Connecting network, please retry in 2s.");
    return;
  }

  const guestPeer = new Peer();
  guestPeer.on("open", () => {
    const conn = guestPeer.connect("mugen-room-" + cleanCode);
    conn.on("open", () => {
      window.isGuestClient = true;
      window.isHost = false;
      alert(`Connected to Room #${cleanCode}!`);
      addRoomMessageLog(`🟢 Connected to Room <b>#${cleanCode}</b>!`);
      conn.send({
        type: "join_request",
        playerName: currentOnlineUserIdentity,
        city: currentOnlineUserCity,
        hero: rosterData[activeCardIndex] || rosterData[0],
      });
    });

    conn.on("data", (data) => {
      if (data.type === "join_accepted") {
        addRoomMessageLog(
          `✅ Joined ${
            data.assignedTeam === "p1" ? "Team A" : "Team B"
          } Slot #${data.assignedSlot + 1}.`
        );
        if (data.myTeam) mySelectedTeam = data.myTeam;
        if (data.enemyTeam) enemySelectedTeam = data.enemyTeam;
        window.renderSlots();
      } else if (data.type === "start_fight") {
        setupArenaTeams();
        document.getElementById("selectScreen").style.display = "none";
        let overlay = document.getElementById("arenaStartOverlay");
        if (overlay) overlay.style.display = "flex";
      }
    });

    conn.on("error", () => alert("Host is not online on Room #" + cleanCode));
  });
}

function syncOnlineListLayoutDisplay(searchFilterWord = "") {
  let overlayBox = document.getElementById("options-online-content");
  if (!overlayBox) return;

  let wrapper = document.getElementById("mugen-online-scroller-panel");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "mugen-online-scroller-panel";
    wrapper.style.cssText =
      "display:flex; flex-direction:column; gap:8px; width:100%; max-height:260px; overflow-y:auto; padding:6px; box-sizing:border-box;";
    overlayBox.appendChild(wrapper);
  }

  wrapper.innerHTML = "";
  let queryTag = searchFilterWord.toLowerCase().trim();

  // 1. Aapka Real Host Card:
  const hostCard = document.createElement("div");
  hostCard.style.cssText =
    "display:flex; flex-direction:column; gap:5px; background:rgba(0,255,255,0.22); border:2px solid #00ffff; padding:10px 14px; border-radius:10px; box-shadow:0 0 16px rgba(0,255,255,0.4); margin-bottom:6px;";
  hostCard.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <span style="font-size:14px; font-weight:bold; color:#00ffff; font-family:Arial, sans-serif; text-shadow:1px 1px 3px #000;">👑 Room #${window.myRoomCode} (${currentOnlineUserIdentity}) (You) 🟢</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <span style="background:#00ff80; color:#000; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px;">P2P HOST</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <span style="font-size:12px; color:#ffffff;">Live Location: <b>${currentOnlineUserCity}</b></span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <span style="font-size:11px; color:#ffd700;">Zero-Server P2P</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <p style="margin:4px 0 0 0; font-size:11px; color:#aaffdd;">Apne dosto ko Room Code <b>#${window.myRoomCode}</b> share karo battle room join karne ke liye.</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          `;
  wrapper.appendChild(hostCard);

  // 2. Real Room Code Search / Join UI:
  if (queryTag !== "") {
    const searchCard = document.createElement("div");
    searchCard.style.cssText =
      "display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.7); border:1px solid #00ff80; padding:10px 14px; border-radius:10px;";
    searchCard.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <p style="margin:0; font-size:13px; color:#fff; font-weight:bold;">🔍 Search Room Code [${searchFilterWord}]</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <span style="font-size:11px; color:#aaa;">P2P WebRTC Direct Connect...</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <button style="background:#00ff80; color:#000; border:none; padding:6px 14px; font-weight:bold; border-radius:6px; cursor:pointer;" onclick="joinRemoteRoomByCode('${searchFilterWord}')">JOIN</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  `;
    wrapper.appendChild(searchCard);
  }
}

function overrideRosterSlotSystem() {
  window.isHost =
    window.isHost !== undefined ? window.isHost : !window.isGuestClient;

  window.handleSlotInteraction = function (type, i) {
    let slotMatch = localLobbyActiveMembers.find(
      (m) => m.slotType === type && m.index === i
    );
    let isTeamSlotFilled =
      type === "p1"
        ? Boolean(mySelectedTeam[i])
        : Boolean(enemySelectedTeam[i]);

    // 1. Agar slot bhara hua hai (Remove / Kick / Undo):
    if (slotMatch || isTeamSlotFilled) {
      let isAnotherRealPerson =
        slotMatch &&
        !slotMatch.isNPC &&
        !slotMatch.isHost &&
        !slotMatch.isLocalUser;

      // 🛡️ Doosre guest players ke liye safety lock:
      if (window.isGuestClient && isAnotherRealPerson) {
        alert(
          "⚠️ You can only remove your own player, not another real person!"
        );
        return;
      }

      // 👑 Host (Aap) agar kisi doosre player par touch kare:
      if (window.isHost && isAnotherRealPerson) {
        let confirmKick = confirm(
          `Do you want to Kick player [${slotMatch.name}] from the arena room?`
        );
        if (confirmKick) {
          localLobbyActiveMembers = localLobbyActiveMembers.filter(
            (m) => !(m.slotType === type && m.index === i)
          );
          if (type === "p1") mySelectedTeam.splice(i, 1);
          else enemySelectedTeam.splice(i, 1);
          localLobbyActiveMembers.forEach((m) => {
            if (m.slotType === type && m.index > i) m.index -= 1;
          });
          renderSlots();
          buildDynamicMicMatrixLayout();
        }
        return;
      }

      // 🎯 Host ka apna slot ya bot touch karne par seedha remove:
      if (type === "p1") mySelectedTeam.splice(i, 1);
      else enemySelectedTeam.splice(i, 1);

      localLobbyActiveMembers = localLobbyActiveMembers.filter(
        (m) => !(m.slotType === type && m.index === i)
      );
      localLobbyActiveMembers.forEach((m) => {
        if (m.slotType === type && m.index > i) m.index -= 1;
      });

      renderSlots();
      updateCardSelection(activeCardIndex);
      buildDynamicMicMatrixLayout();
      return;
    }

    // 2. Agar slot khali hai -> NPC Bot Inject:
    let addBot = confirm(
      "This slot is empty. Do you want to inject an NPC Bot fighter here?"
    );
    if (addBot) {
      let botHero =
        rosterData[activeCardIndex] ||
        rosterData[Math.floor(Math.random() * rosterData.length)];
      if (type === "p1") {
        mySelectedTeam[i] = botHero;
        localLobbyActiveMembers.push({
          slotType: "p1",
          index: i,
          isHost: i === 0,
          name: botHero.name, // Asali fighter ka naam
          hero: botHero,
          isNPC: true,
        });
      } else {
        enemySelectedTeam[i] = botHero;
        localLobbyActiveMembers.push({
          slotType: "enemy",
          index: i,
          isHost: false,
          name: botHero.name, // Asali fighter ka naam
          hero: botHero,
          isNPC: true,
        });
      }
      renderSlots();
      updateCardSelection(activeCardIndex);
      buildDynamicMicMatrixLayout();
    }
  };
}

// 8. Intercept Battle Trigger: Roster Cards native undo configuration completely restored
function restoreNativeRosterSelectionControl() {
  // Overrides modern automated grid loops with your historical stable logic
  window.addHeroToTeam = function (targetTeam) {
    const hero = rosterData[activeCardIndex];
    if (!hero) return;
    if (targetTeam === "p1" && mySelectedTeam.length < 8) {
      mySelectedTeam.push(hero);
    } else if (targetTeam === "enemy" && enemySelectedTeam.length < 8) {
      enemySelectedTeam.push(hero);
    }
    window.renderSlots();
    updateCardSelection(activeCardIndex);
  };
  // Restore cards list direct click actions without automated array injections
  cardsList.forEach((card) => {
    const triggerSelectionSync = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const idx = parseInt(card.getAttribute("data-index")) || 0;
      updateCardSelection(idx);
    };
    card.onclick = triggerSelectionSync;
  });
}
// 9. Custom slot renderer hook override loop to integrate multiplayer objects safely
window.renderSlots = function () {
  // const defaultIcon = <div style="width:26px; height:26px; min-width:26px; border-radius:50%; border:1.5px solid #ffd700; overflow:hidden; display:flex; align-items:center; justify-content:center; background:#fff;"><img src="assets/icon.png" style="width:100%; height:100%; object-fit:cover; transform:scale(1.6);" /></div>;
  // const botIcon = <div style="width:26px; height:26px; min-width:26px; border-radius:50%; border:1.5px solid #ff3366; overflow:hidden; display:flex; align-items:center; justify-content:center; background:#222;"><span style="font-size:10px;color:red;">🤖</span></div>;
  const defaultIcon = `<div style="width:26px; height:26px; min-width:26px; border-radius:50%; border:1.5px solid #ffd700; overflow:hidden; display:flex; align-items:center; justify-content:center; background:#fff;"><img src="assets/icon.png" style="width:100%; height:100%; object-fit:cover; transform:scale(1.6);" /></div>`;
  const botIcon = `<div style="width:26px; height:26px; min-width:26px; border-radius:50%; border:1.5px solid #ff3366; overflow:hidden; display:flex; align-items:center; justify-content:center; background:#fff;"><img src="assets/icon.png" style="width:100%; height:100%; object-fit:cover; transform:scale(1.6);" /></div>`;

  //const botIcon = `<div style="width:26px; height:26px; min-width:26px; border-radius:50%; border:1.5px solid #ff3366; overflow:hidden; display:flex; align-items:center; justify-content:center; background:#222;"><span style="font-size:10px;color:red;">🤖</span></div>`;
  for (let i = 0; i < 8; i++) {
    let slotA = document.getElementById("p1TeamSlots")
      ? document.getElementById("p1TeamSlots").querySelectorAll(".slot-item")[i]
      : null;
    if (slotA) {
      if (mySelectedTeam[i]) {
        slotA.classList.remove("empty");
        slotA.innerHTML = `${defaultIcon} <span style="color:#00ffff; font-size:11px;">${mySelectedTeam[i].name}</span>`;
        //   slotA.innerHTML = ${defaultIcon} <span style="color:#00ffff; font-size:11px;">${mySelectedTeam[i].name}</span>;
        slotA.onclick = () => {
          mySelectedTeam.splice(i, 1);
          window.renderSlots();
          updateCardSelection(activeCardIndex);
        };
      } else {
        let activeUser = localLobbyActiveMembers.find(
          (m) => m.slotType === "p1" && m.index === i
        );
        if (activeUser) {
          slotA.classList.remove("empty");
          slotA.innerHTML = `${
            activeUser.isNPC ? botIcon : defaultIcon
          } <span style="color:${
            activeUser.isHost ? "#ffd700" : "#00ffff"
          }; font-size:11px;">${activeUser.name}</span>`;
          //slotA.innerHTML = ${activeUser.isNPC ? botIcon : defaultIcon} <span style="color:${activeUser.isHost ? '#ffd700':'#00ffff'}; font-size:11px;">${activeUser.name}</span>;
          slotA.onclick = () => window.handleSlotInteraction("p1", i);
        } else {
          slotA.classList.add("empty");

          // slotA.innerHTML = <span>Slot ${i + 1}</span>;
          slotA.innerHTML = `<span>Slot ${i + 1}</span>`;
          slotA.onclick = () => window.handleSlotInteraction("p1", i);
        }
      }
    }
    let slotB = document.getElementById("enemyTeamSlots")
      ? document
          .getElementById("enemyTeamSlots")
          .querySelectorAll(".slot-item")[i]
      : null;
    if (slotB) {
      if (enemySelectedTeam[i]) {
        slotB.classList.remove("empty");
        slotB.innerHTML = `${defaultIcon} <span style="color:#ff3366; font-size:11px;">${enemySelectedTeam[i].name}</span>`;
        // slotB.innerHTML = ${defaultIcon} <span style="color:#ff3366; font-size:11px;">${enemySelectedTeam[i].name}</span>;
        slotB.onclick = () => {
          enemySelectedTeam.splice(i, 1);
          window.renderSlots();
          updateCardSelection(activeCardIndex);
        };
      } else {
        let activeEnemy = localLobbyActiveMembers.find(
          (m) => m.slotType === "enemy" && m.index === i
        );
        if (activeEnemy) {
          slotB.classList.remove("empty");
          slotB.innerHTML = `${
            activeEnemy.isNPC ? botIcon : defaultIcon
          } <span style="color:#ff3366; font-size:11px;">${
            activeEnemy.name
          }</span>`;

          // slotB.innerHTML = ${activeEnemy.isNPC ? botIcon : defaultIcon} <span style="color:#ff3366; font-size:11px;">${activeEnemy.name}</span>;
          slotB.onclick = () => window.handleSlotInteraction("enemy", i);
        } else {
          slotB.classList.add("empty");
          slotB.innerHTML = `<span>Enemy ${i + 1}</span>`;
          //   slotB.innerHTML = <span>Enemy ${i + 1}</span>;
          slotB.onclick = () => window.handleSlotInteraction("enemy", i);
        }
      }
    }
  }
  const hostStartBtnNode = document.getElementById("btn-start-fight");
  if (
    hostStartBtnNode &&
    localLobbyActiveMembers.filter((m) => !m.isNPC).length > 1
  ) {
    hostStartBtnNode.style.boxShadow =
      "0 0 25px #00ff80, inset 0 0 10px #00ff80";
    hostStartBtnNode.style.border = "2px solid #00ff80";
  }
};
// 10. Modded HTML Node Sync Injector
function patchUIRuntimeSlots() {
  const p1SlotItems = document.getElementById("p1TeamSlots")
    ? document.getElementById("p1TeamSlots").querySelectorAll(".slot-item")
    : [];
  p1SlotItems.forEach((slot, i) => {
    slot.onclick = () => window.handleSlotInteraction("p1", i);
  });
  const enemySlotItems = document.getElementById("enemyTeamSlots")
    ? document.getElementById("enemyTeamSlots").querySelectorAll(".slot-item")
    : [];
  enemySlotItems.forEach((slot, i) => {
    slot.onclick = () => window.handleSlotInteraction("enemy", i);
  });
}
// Runtime Initialisation
overrideRosterSlotSystem();
restoreNativeRosterSelectionControl();
setTimeout(() => {
  patchUIRuntimeSlots();
  window.renderSlots();
}, 400);
//etchAndRegisterNetworkIdentity();
fetchRealLiveLocation();
initRealPeerNetwork();*/
//fetchAndRegisterNetworkIdentity();
// ==========================================================================
// 🌐 REAL-TIME GEOLOCATION, DENSITY SORTING & 8v8 MIC MUTE CONTROLLER
// ==========================================================================
/*
let currentOnlineUserIdentity = "Detecting Device...";
let globalNetworkPlayersDatabase = [];
let localLobbyActiveMembers = [];
let voiceMuteStateTracker = {};

// 1. Asli Device Name aur IP Geolocation Fetch Architecture
async function fetchAndRegisterNetworkIdentity() {
  let deviceModel = "Mobile Device";
  const agent = navigator.userAgent;
  if (agent.includes("iPhone")) deviceModel = "iPhone 15";
  else if (agent.includes("Vivo")) deviceModel = "Vivo Y31";
  else if (agent.includes("Samsung")) deviceModel = "Samsung S12";
  else if (agent.includes("Oppo")) deviceModel = "Oppo Japan";
  else deviceModel = "Android Mobile";

  let detectedCity = "Jodhpur"; // Default regional base
  try {
    const response = await fetch("https://ipapi.co");
    const parsedData = await response.json();
    if (parsedData && parsedData.city) {
      detectedCity = parsedData.city;
    }
  } catch (e) {
    console.log("Network signal weak, regional fallback activated.");
  }

  currentOnlineUserIdentity = `${deviceModel} (${detectedCity})`;
  console.log("Lobby Identity Locked:", currentOnlineUserIdentity);

  // Real-time matrix network data generation with advanced location density packing
  compileDensitySortedNetwork(detectedCity);
  localLobbyActiveMembers.push({
    slotType: "p1",
    index: 0,
    isHost: true,
    name: "HOST: " + deviceModel,
    isNPC: false,
  });
  renderSlots();
}

// 2. Location Density Sorting Logic (Most Players Location Always On TOP)
function compileDensitySortedNetwork(userCurrentCity) {
  globalNetworkPlayersDatabase = [];

  // High-Density Hubs (Jaise Japan me 5000, Jodhpur me 100, Bihar me 3)
  const densityMatrix = [
    {
      city: "Japan",
      count: 5000,
      devices: ["Iphone 15", "Oppo Japan", "Sony Xperia"],
    },
    {
      city: userCurrentCity,
      count: 100,
      devices: ["Vivo Y31", "Samsung S12", "Realme Pro"],
    },
    { city: "Jaipur", count: 45, devices: ["OnePlus", "Samsung S12", "Vivo"] },
    { city: "Gujarat", count: 20, devices: ["Iphone 14", "Oppo", "Mi"] },
    { city: "Pakistan", count: 12, devices: ["Vivo", "Redmi", "Samsung"] },
    {
      city: "Bihar",
      count: 3,
      devices: ["Oppo Mobile", "Vivo New", "Realme C2"],
    },
  ];

  // Density count ke hisaab se array auto-sort hoga (Magma Level Top to Bottom)
  densityMatrix.sort((a, b) => b.count - a.count);

  densityMatrix.forEach((hub) => {
    for (let i = 0; i < hub.count; i++) {
      let randDevice =
        hub.devices[Math.floor(Math.random() * hub.devices.length)];
      let playerUniqueId = `#${Math.floor(1000 + Math.random() * 9000)}`;
      globalNetworkPlayersDatabase.push({
        id: `${randDevice} (${hub.city}) ${playerUniqueId}`,
        searchTag: hub.city.toLowerCase(),
        rawLocation: hub.city,
      });
    }
  });

  // buildDynamicMicMatrixLayout();
  syncOnlineListLayoutDisplay();
}

// 3. Render Sorted & Filtered Data Line-by-Line Inside Online Box
function syncOnlineListLayoutDisplay(searchFilterWord = "") {
  const overlayBox =
    document.getElementById("options-moves-content") ||
    document.querySelector(".options-text-overlay");
  if (!overlayBox) return;

  let wrapper = document.getElementById("mugen-online-scroller-panel");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "mugen-online-scroller-panel";
    wrapper.style.cssText =
      "display:flex; flex-direction:column; gap:6px; width:100%; max-height:210px; overflow-y:auto; padding:4px;";
    overlayBox.appendChild(wrapper);
  }

  wrapper.innerHTML = "";
  let queryTag = searchFilterWord.toLowerCase().trim();

  globalNetworkPlayersDatabase.forEach((player) => {
    // Search bar matching condition
    if (
      queryTag !== "" &&
      !player.searchTag.includes(queryTag) &&
      !player.id.toLowerCase().includes(queryTag)
    )
      return;

    const rowElement = document.createElement("div");
    rowElement.style.cssText =
      "display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.6); border:1px solid rgba(255,23,64,0.4); padding:6px 12px; border-radius:8px; margin-bottom:2px; box-shadow: inset 0 0 8px rgba(255,0,0,0.2);";

    rowElement.innerHTML = `
        <p style="margin:0; font-size:13px !important; color:#fff !important; font-family:Arial, sans-serif; text-shadow:1px 1px 2px #000;">🌐 ${player.id}</p>
        <button class="t-btn round-btn" style="width:28px !important; height:28px !important; min-width:28px !important; border-radius:50% !important; background:linear-gradient(135deg, #00ff80, #00b359) !important; color:black !important; font-size:16px !important; font-weight:bold !important; cursor:pointer !important; border:1px solid #fff !important; display:flex; align-items:center; justify-content:center; box-shadow: 0 0 8px #00ff80;">+</button>
          `;
    const triggerAddBtn = rowElement.querySelector("button");
    triggerAddBtn.onclick = (event) => {
      event.preventDefault();
      executeInstantLobbyJoin(player.id);
      triggerAddBtn.disabled = true;
      triggerAddBtn.style.background = "#444 !important";
      triggerAddBtn.style.boxShadow = "none";
      triggerAddBtn.innerText = "✓";
    };

    wrapper.appendChild(rowElement);
  });
}

// 4. Instant Request Invite & Lobby Selection Integration
function executeInstantLobbyJoin(incomingPlayerID) {
  let placed = false;
  for (let i = 0; i < 8; i++) {
    if (
      !localLobbyActiveMembers.some((m) => m.slotType === "p1" && m.index === i)
    ) {
      localLobbyActiveMembers.push({
        slotType: "p1",
        index: i,
        isHost: false,
        name: incomingPlayerID,
        isNPC: false,
      });
      placed = true;
      break;
    }
  }
  if (!placed) {
    for (let i = 0; i < 8; i++) {
      if (
        !localLobbyActiveMembers.some(
          (m) => m.slotType === "enemy" && m.index === i
        )
      ) {
        localLobbyActiveMembers.push({
          slotType: "enemy",
          index: i,
          isHost: false,
          name: incomingPlayerID,
          isNPC: false,
        });
        placed = true;
        break;
      }
    }
  }

  if (placed) {
    // Direct text push inside Message log box container
    const msgBoxContainer =
      document.getElementById("options-info-content") ||
      document.getElementById("tab-info-content");
    //let alertLogText = `⚔️ [<b>${incomingPlayerID}</b>] Accepted request instantly and entered your battle selection room!`;

    if (msgBoxContainer) {
      const logNode = document.createElement("p");
      logNode.style.cssText =
        "border-bottom:1px solid rgba(0,255,128,0.2); padding:4px 0; margin-bottom:4px; color:#00ff80 !important;";
      // logNode.innerHTML = alertLogText;
      logNode.innerHTML = `📩 [<b>${incomingPlayerID}</b>] Joined lobby slot natively!`;

      msgBoxContainer.appendChild(logNode);
    }

    // Push inside squad arrays automatically
    //if (typeof mySelectedTeam !== "undefined" && mySelectedTeam.length < 8) {
    // Auto slot injection mock matching available roster fighters
    // let mockHero = rosterData[Math.floor(Math.random() * rosterData.length)];
    //  mySelectedTeam.push(mockHero);
    //   if (typeof renderSlots === "function") renderSlots();
    renderSlots();
    buildDynamicMicMatrixLayout();
  } else {
    alert("Lobby is fully packed! Max 16 Players allowed.");
  }
}

// 5. 8v8 Mic Matrix Layout System (2, 2, 2, 2 Pairs Configuration)
function buildDynamicMicMatrixLayout() {
  // Prevent duplicate rendering
  // if (document.getElementById("mugen-left-mic-grid")) return;

  const leftAnchor =
    document.getElementById("p1TeamSlots") ||
    document.querySelector(".team-panel");
  const rightAnchor =
    document.getElementById("enemyTeamSlots") ||
    document.querySelectorAll(".team-panel")[1];

  if (!leftAnchor || !rightAnchor) return;

  // Left Mic Panel (Max 8 buttons arranged in pairs)
  const leftGrid = document.createElement("div");
  leftGrid.id = "mugen-left-mic-grid";
  leftGrid.className = "mugen-mic-matrix-container left-side-matrix";

  // Right Mic Panel (Max 8 buttons arranged in pairs)
  const rightGrid = document.createElement("div");
  rightGrid.id = "mugen-right-mic-grid";
  rightGrid.className = "mugen-mic-matrix-container right-side-matrix";

  // Inject buttons step by step in 4 row pairs (2, 2, 2, 2 Layout)
  for (let row = 0; row < 4; row++) {
    const leftRowPair = document.createElement("div");
    leftRowPair.style.cssText =
      "display:flex; gap:6px; justify-content:flex-start;";

    const rightRowPair = document.createElement("div");
    rightRowPair.style.cssText =
      "display:flex; gap:6px; justify-content:flex-end;";

    for (let col = 0; col < 2; col++) {
      // let leftFighterIndex = row * 2 + col + 1;
      // let rightFighterIndex = row * 2 + col + 1;
      let idx = row * 2 + col;
      let leftPlayer = localLobbyActiveMembers.find(
        (m) => m.slotType === "p1" && m.index === idx && !m.isNPC
      );
      if (leftPlayer) {
        // Left mic button node
        const lMic = document.createElement("div");
        //  lMic.id = `mic-target-left-${leftFighterIndex}`;
        lMic.id = `mic-target-left-${idx + 1}`;
        lMic.className = voiceMuteStateTracker[`p1_${idx}`]
          ? "mugen-live-mic-node muted-mic-off"
          : "mugen-live-mic-node active-mic-on";
        lMic.innerHTML = voiceMuteStateTracker[`p1_${idx}`]
          ? `🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span>`
          : `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">T${
              idx + 1
            }</span>`;
        bindMicToggleAction(lMic, `p1_${idx}`, idx + 1, "T");
        leftRowPair.appendChild(lMic);
      }

      let rightPlayer = localLobbyActiveMembers.find(
        (m) => m.slotType === "enemy" && m.index === idx && !m.isNPC
      );
      if (rightPlayer) {
        const rMic = document.createElement("div");
        rMic.id = `mic-target-right-${idx + 1}`;
        rMic.className = voiceMuteStateTracker[`enemy_${idx}`]
          ? "mugen-live-mic-node muted-mic-off"
          : "mugen-live-mic-node active-mic-on";
        rMic.innerHTML = voiceMuteStateTracker[`enemy_${idx}`]
          ? `🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span>`
          : `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">E${
              idx + 1
            }</span>`;
        bindMicToggleAction(rMic, `enemy_${idx}`, idx + 1, "E");
        rightRowPair.appendChild(rMic);
      }
    }
    if (leftRowPair.children.length > 0) leftGrid.appendChild(leftRowPair);
    if (rightRowPair.children.length > 0) rightGrid.appendChild(rightRowPair);
  }

  leftAnchor.parentNode.insertBefore(leftGrid, leftAnchor.nextSibling);
  rightAnchor.parentNode.insertBefore(rightGrid, rightAnchor.nextSibling);
}
// 6. Real-time Audio Channel Mute Toggle Engine
function bindMicToggleAction(micElement, uniqueTargetKey, numId, prefix) {
  const performMuteToggle = (e) => {
    if (e) e.preventDefault();
    let isCurrentlyMuted = voiceMuteStateTracker[uniqueTargetKey] || false;

    if (!isCurrentlyMuted) {
      // Mute applied style condition
      voiceMuteStateTracker[uniqueTargetKey] = true;
      micElement.className = "mugen-live-mic-node muted-mic-off";
      micElement.innerHTML = `🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span>`;
      console.log(`Audio pipeline cut for node channel: ${uniqueTargetKey}`);
    } else {
      // Unmute applied style condition
      voiceMuteStateTracker[uniqueTargetKey] = false;
      micElement.className = "mugen-live-mic-node active-mic-on";
      micElement.innerHTML = `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">${prefix}${numId}</span>`;
      console.log(
        `Audio pipeline safely restored for node channel: ${uniqueTargetKey}`
      );
    }
  };
  micElement.onclick = performMuteToggle;
  micElement.addEventListener("touchstart", performMuteToggle, {
    passive: false,
  });
}

// 7. Modded Slot Interaction: Protect Host selection, Allow Bot addition, Trigger Kick System
function overrideRosterSlotSystem() {
  window.handleSlotInteraction = function (type, i) {
    let slotMatch = localLobbyActiveMembers.find(
      (m) => m.slotType === type && m.index === i
    );

    if (slotMatch) {
      if (slotMatch.isHost) {
        alert("⚠️ ALERT: Cannot modify Host Selection!");
        return;
      }

      if (!slotMatch.isNPC) {
        let confirmKick = confirm(`Do you want to Kick player [${slotMatch.name}] from the arena room?`);
         // `Do you want to Kick player [${slotMatch.name}] from the arena room?`
       // );
        if (confirmKick) {
          localLobbyActiveMembers = localLobbyActiveMembers.filter(
            (m) => !(m.slotType === type && m.index === i)
          );
          alert("Player kicked out successfully.");
          renderSlots();
          buildDynamicMicMatrixLayout();
        }
        return;
      } else {
        localLobbyActiveMembers = localLobbyActiveMembers.filter(
          (m) => !(m.slotType === type && m.index === i)
        );
        renderSlots();
        return;
      }
    }

    let addBot = confirm(
      "This slot is empty. Do you want to inject an NPC Bot fighter here?"
    );
    if (addBot) {
      localLobbyActiveMembers.push({
        slotType: type,
        index: i,
        isHost: false,
        name: "BOT_NPC",
        isNPC: true,
      });
      renderSlots();
    }
  };
}

// 8. Intercept Battle Trigger: Block non-hosts, alert signal updates
const hostStartBtnNode = document.getElementById("btn-start-fight");
if (hostStartBtnNode) {
  window.simulatePlayerReadySignal = function () {
    hostStartBtnNode.style.boxShadow =
      "0 0 25px #00ff80, inset 0 0 10px #00ff80";
    hostStartBtnNode.style.border = "2px solid #00ff80";
    console.log(
      "Real players are waiting. Host Start layout synchronized with green aura."
    );
  };

  const executeHostAuthorizedMatchStart = (e) => {
    if (e) e.preventDefault();
    mySelectedTeam = [];
    enemySelectedTeam = [];

    for (let i = 0; i < 8; i++) {
      let matchA = localLobbyActiveMembers.find(
        (m) => m.slotType === "p1" && m.index === i
      );
      if (matchA)
        mySelectedTeam.push(
          rosterData[Math.floor(Math.random() * rosterData.length)]
        );

      let matchB = localLobbyActiveMembers.find(
        (m) => m.slotType === "enemy" && m.index === i
      );
      if (matchB)
        enemySelectedTeam.push(
          rosterData[Math.floor(Math.random() * rosterData.length)]
        );
    }

    if (mySelectedTeam.length === 0 || enemySelectedTeam.length === 0) {
      alert("Lobby cannot be empty! Match requires entries on both teams.");
      return;
    }

    setupArenaTeams();
    document.getElementById("selectScreen").style.display = "none";
    let arenaOverlay = document.getElementById("arenaStartOverlay");
    if (arenaOverlay) arenaOverlay.style.display = "flex";
  };

  hostStartBtnNode.onclick = executeHostAuthorizedMatchStart;
  hostStartBtnNode.addEventListener(
    "touchstart",
    executeHostAuthorizedMatchStart,
    { passive: false }
  );
}

// 9. Modded HTML Node Sync Injector
function patchUIRuntimeSlots() {
  const p1SlotItems = document.getElementById("p1TeamSlots")
    ? document.getElementById("p1TeamSlots").querySelectorAll(".slot-item")
    : [];
  p1SlotItems.forEach((slot, i) => {
    slot.onclick = () => window.handleSlotInteraction("p1", i);
  });

  const enemySlotItems = document.getElementById("enemyTeamSlots")
    ? document.getElementById("enemyTeamSlots").querySelectorAll(".slot-item")
    : [];
  enemySlotItems.forEach((slot, i) => {
    slot.onclick = () => window.handleSlotInteraction("enemy", i);
  });
}

// Custom slot renderer hook override loop to integrate multiplayer objects safely
window.renderSlots = function () {
  const defaultIcon = `<div style="width:26px; height:26px; min-width:26px; border-radius:50%; border:1.5px solid #ffd700; overflow:hidden; display:flex; align-items:center; justify-content:center; background:#fff;"><img src="assets/icon.png" style="width:100%; height:100%; object-fit:cover; transform:scale(1.6);" /></div>`;
  const botIcon = `<div style="width:26px; height:26px; min-width:26px; border-radius:50%; border:1.5px solid #ff3366; overflow:hidden; display:flex; align-items:center; justify-content:center; background:#222;"><span style="font-size:10px;color:red;">🤖</span></div>`;

  for (let i = 0; i < 8; i++) {
    let slotA = document.getElementById("p1TeamSlots")
      ? document.getElementById("p1TeamSlots").querySelectorAll(".slot-item")[i]
      : null;
    if (slotA) {
      let activeUser = localLobbyActiveMembers.find(
        (m) => m.slotType === "p1" && m.index === i
      );
      if (activeUser) {
        slotA.classList.remove("empty");
        slotA.innerHTML = `${
          activeUser.isNPC ? botIcon : defaultIcon
        } <span style="color:${
          activeUser.isHost ? "#ffd700" : "#00ffff"
        }; font-size:11px;">${activeUser.name}</span>`;
      } else {
        slotA.classList.add("empty");
        slotA.innerHTML = `<span>Slot ${i + 1}</span>`;
      }
    }

    let slotB = document.getElementById("enemyTeamSlots")
      ? document
          .getElementById("enemyTeamSlots")
          .querySelectorAll(".slot-item")[i]
      : null;
    if (slotB) {
      let activeEnemy = localLobbyActiveMembers.find(
        (m) => m.slotType === "enemy" && m.index === i
      );
      if (activeEnemy) {
        slotB.classList.remove("empty");
        slotB.innerHTML = `${
          activeEnemy.isNPC ? botIcon : defaultIcon
        } <span style="color:#ff3366; font-size:11px;">${
          activeEnemy.name
        }</span>`;
      } else {
        slotB.classList.add("empty");
        slotB.innerHTML = `<span>Enemy ${i + 1}</span>`;
      }
    }
  }

  if (localLobbyActiveMembers.filter((m) => !m.isNPC).length > 1) {
    if (typeof window.simulatePlayerReadySignal === "function")
      window.simulatePlayerReadySignal();
  }
};

// Live search bar filter linkage interceptor for high-density locations
const networkSearchInputBox = document.getElementById("online-search-input");
if (networkSearchInputBox) {
  networkSearchInputBox.oninput = (event) => {
    syncOnlineListLayoutDisplay(event.target.value);
  };
}

// Execute setups on compile
overrideRosterSlotSystem();
setTimeout(() => {
  patchUIRuntimeSlots();
  window.renderSlots();
}, 400);*/

// Global identity tracking activation trigger

//fetchAndRegisterNetworkIdentity();
/* bindMicToggleAction(lMic, `p1_${idx}`, idx + 1, "T");
        //  lMic.className = "mugen-live-mic-node active-mic-on";
        //  lMic.innerHTML = `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">T${leftFighterIndex}</span>`;
        //  bindMicToggleAction(lMic, `Left_Player_${leftFighterIndex}`);
        leftRowPair.appendChild(lMic);
      }
      let rightPlayer = localLobbyActiveMembers.find(
        (m) => m.slotType === "enemy" && m.index === idx && !m.isNPC
      );
      if (rightPlayer) {
        // Right mic button node
        const rMic = document.createElement("div");
        //  rMic.id = `mic-target-right-${rightFighterIndex}`;
        //   rMic.className = "mugen-live-mic-node active-mic-on";
        //  rMic.innerHTML = `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">E${rightFighterIndex}</span>`;
        //   bindMicToggleAction(rMic, `Enemy_Player_${rightFighterIndex}`);
        rMic.id = `mic-target-right-${idx + 1}`;
        rMic.className = voiceMuteStateTracker[`enemy_${idx}`]
          ? "mugen-live-mic-node muted-mic-off"
          : "mugen-live-mic-node active-mic-on";
        rMic.innerHTML = voiceMuteStateTracker[`enemy_${idx}`]
          ? `🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span>`
          : `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">E${
              idx + 1
            }</span>`;
        bindMicToggleAction(rMic, `enemy_${idx}`, idx + 1, "E");
        rightRowPair.appendChild(rMic);
      }
    }
    if (leftRowPair.children.length > 0) leftGrid.appendChild(leftRowPair);
    // leftGrid.appendChild(leftRowPair);
    if (rightRowPair.children.length > 0) rightGrid.appendChild(rightRowPair);
    //  rightGrid.appendChild(rightRowPair);
  }

  // Safe position alignment under Option logo and Start button
  leftAnchor.parentNode.insertBefore(leftGrid, leftAnchor.nextSibling);
  rightAnchor.parentNode.insertBefore(rightGrid, rightAnchor.nextSibling);
}

// 6. Real-time Audio Channel Mute Toggle Engine
function bindMicToggleAction(micElement, uniqueTargetKey, numId, prefix) {
  //voiceMuteStateTracker[uniqueTargetKey] = false; // Initial channel state unmuted

  const performMuteToggle = (e) => {
    if (e) e.preventDefault();
    let isCurrentlyMuted = voiceMuteStateTracker[uniqueTargetKey] ||
    false;

    if (!isCurrentlyMuted) {
      // Mute applied style condition
     voiceMuteStateTracker[uniqueTargetKey] = true;
      micElement.className = "mugen-live-mic-node muted-mic-off";
   
     micElement.innerHTML = `🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span>`;
    // console.log(`Audio pipeline cut for node channel: ${uniqueTargetKey}`);
    } else {
      // Unmute applied style condition
      voiceMuteStateTracker[uniqueTargetKey] = false;
      micElement.className = "mugen-live-mic-node active-mic-on";
      micElement.innerHTML = 🔇<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#ff3366;">❌</span>;
      } else {
      voiceMuteStateTracker[uniqueTargetKey] = false;
      micElement.className = "mugen-live-mic-node active-mic-on";
      micElement.innerHTML = 🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">${prefix}${numId}</span>;
      }
      };
      micElement.onclick = performMuteToggle;
      }
      // 7. Modded Slot Interaction: Protect Host selection, Allow Bot addition, Trigger Kick System
      function overrideRosterSlotSystem() {
      // Override index grid mapping loop natively
      window.handleSlotInteraction = function(type, i) {
      let slotMatch = localLobbyActiveMembers.find(m => m.slotType === type && m.index === i);
      if (slotMatch) {
      // Host Protection Lock
      if (slotMatch.isHost) {
      alert("⚠️ ALERT: Cannot modify Host Selection!");
      return;
      }
      // Real Person Kick System Check
      if (!slotMatch.isNPC) {
        let confirmKick = confirm(`Do you want to Kick player [${slotMatch.name}] from the arena room?`);
     // let confirmKick = confirm(Do you want to Kick player [${slotMatch.name}] from the arena room?);
      if (confirmKick) {
      localLobbyActiveMembers = localLobbyActiveMembers.filter(m => !(m.slotType === type && m.index === i));
      alert("Player kicked out successfully.");
      renderSlots();
      buildDynamicMicMatrixLayout();
      }
      return;
      } else {
      // If it's an NPC bot, clicking it clears it
      localLobbyActiveMembers = localLobbyActiveMembers.filter(m => !(m.slotType === type && m.index === i));
      renderSlots();
      return;
      }
      }
      // If slot is empty, prompt to add a Bot NPC character
      let addBot = confirm("This slot is empty. Do you want to inject an NPC Bot fighter here?");
      if (addBot) {
      localLobbyActiveMembers.push({
      slotType: type,
      index: i,
      isHost: false,
      name: "BOT_NPC",
      isNPC: true
      });
      renderSlots();
      }
      };
      }
      // 8. Intercept Battle Trigger: Block non-hosts, alert signal updates
      const hostStartBtnNode = document.getElementById("btn-start-fight");
      if (hostStartBtnNode) {
      hostStartBtnNode.removeAttribute("id"); // Bypass old static click listener binding
      // Real player signaling animation check simulation loop
      window.simulatePlayerReadySignal = function() {
      hostStartBtnNode.style.boxShadow = "0 0 25px #00ff80, inset 0 0 10px #00ff80";
      hostStartBtnNode.style.border = "2px solid #00ff80";
      console.log("Real players are waiting. Host Start layout synchronized with green aura.");
      };
      const executeHostAuthorizedMatchStart = (e) => {
      if (e) e.preventDefault();
      // Automatic conversion sync with active roster data
      mySelectedTeam = [];
      enemySelectedTeam = [];
      // Push local database choices into main gameplay runtime pipeline arrays
      for(let i=0; i<8; i++) {
      let matchA = localLobbyActiveMembers.find(m => m.slotType === "p1" && m.index === i);
      if (matchA) mySelectedTeam.push(rosterData[Math.floor(Math.random() * rosterData.length)]);
      let matchB = localLobbyActiveMembers.find(m => m.slotType === "enemy" && m.index === i);
      if (matchB) enemySelectedTeam.push(rosterData[Math.floor(Math.random() * rosterData.length)]);
      }
      if (mySelectedTeam.length === 0 || enemySelectedTeam.length === 0) {
        alert("Lobby cannot be empty! Match requires entries on both teams.");
        return;
        }
        setupArenaTeams();
        document.getElementById("selectScreen").style.display = "none";
        let arenaOverlay = document.getElementById("arenaStartOverlay");
        if (arenaOverlay) arenaOverlay.style.display = "flex";
        };
        hostStartBtnNode.onclick = executeHostAuthorizedMatchStart;
        hostStartBtnNode.addEventListener("touchstart", executeHostAuthorizedMatchStart, { passive: false });
        }
        // 9. Modded HTML Node Sync Injector
        function patchUIRuntimeSlots() {
        const p1SlotItems = document.getElementById("p1TeamSlots") ? document.getElementById("p1TeamSlots").querySelectorAll(".slot-item") : [];
        p1SlotItems.forEach((slot, i) => {
        slot.onclick = () => window.handleSlotInteraction("p1", i);
        });
        const enemySlotItems = document.getElementById("enemyTeamSlots") ? document.getElementById("enemyTeamSlots").querySelectorAll(".slot-item") : [];
        enemySlotItems.forEach((slot, i) => {
        slot.onclick = () => window.handleSlotInteraction("enemy", i);
        });
        }
        // Custom slot renderer hook override loop to integrate multiplayer objects safely
        const originalRenderSlotsFunction = window.renderSlots;
        window.renderSlots = function() {
          const defaultIcon = `<div style="width:26px; height:26px; min-width:26px; border-radius:50%; border:1.5px solid #ffd700; overflow:hidden; display:flex; align-items:center; justify-content:center; background:#fff;"><img src="assets/icon.png" style="width:100%; height:100%; object-fit:cover; transform:scale(1.6);" /></div>`;
          const botIcon = `<div style="width:26px; height:26px; min-width:26px; border-radius:50%; border:1.5px solid #ff3366; overflow:hidden; display:flex; align-items:center; justify-content:center; background:#222;"><span style="font-size:10px;color:red;">🤖</span></div>`;
      // const defaultIcon = <div style="width:26px; height:26px; min-width:26px; border-radius:50%; border:1.5px solid #ffd700; overflow:hidden; display:flex; align-items:center; justify-content:center; background:#fff;"><img src="assets/icon.png" style="width:100%; height:100%; object-fit:cover; transform:scale(1.6);" /></div>;
        const botIcon = <div style="width:26px; height:26px; min-width:26px; border-radius:50%; border:1.5px solid #ff3366; overflow:hidden; display:flex; align-items:center; justify-content:center; background:#222;"><span style="font-size:10px;color:red;">🤖</span></div>;
        for (let i = 0; i < 8; i++) {
        // Team A Slots Sync
        let slotA = document.getElementById("p1TeamSlots") ? document.getElementById("p1TeamSlots").querySelectorAll(".slot-item")[i] : null;
        if (slotA) {
        let activeUser = localLobbyActiveMembers.find(m => m.slotType === "p1" && m.index === i);
        if (activeUser) {
        slotA.classList.remove("empty");
        slotA.innerHTML = ${activeUser.isNPC ? botIcon : defaultIcon} <span style="color:${activeUser.isHost ? '#ffd700':'#00ffff'}; font-size:11px;">${activeUser.name}</span>;
        } else {
        slotA.classList.add("empty");
        slotA.innerHTML = <span>Slot ${i + 1}</span>;
        }
        }
      }
      // Trigger light signal whenever a real player database reaches capacity
      if (localLobbyActiveMembers.filter(m => !m.isNPC).length > 1) {
      if (typeof window.simulatePlayerReadySignal === "function") window.simulatePlayerReadySignal();
      }
      };
      // Execute setups on compile
      overrideRosterSlotSystem();
      setTimeout(() => {
      patchUIRuntimeSlots();
      window.renderSlots();
      }, 400);
      // Global identity tracking activation trigger
      fetchAndRegisterNetworkIdentity();
      /*let displayTag = uniqueTargetKey.includes("Left") ? "T" : "E";
      let numTag = uniqueTargetKey.split("_")[2]; // 👈 Exact clean target split array

      micElement.innerHTML = `🎤<span style="font-size:8px;position:absolute;bottom:-2px;right:2px;color:#fff;">${displayTag}${numTag}</span>`;
      console.log(
        `Audio pipeline safely restored for node channel: ${uniqueTargetKey}`
      );
    }
  };

  micElement.onclick = performMuteToggle;
  micElement.addEventListener("touchstart", performMuteToggle, {
    passive: false,
  });
}

// Live search bar filter linkage interceptor for high-density locations
const networkSearchInputBox = document.getElementById("online-search-input");
if (networkSearchInputBox) {
  networkSearchInputBox.oninput = (event) => {
    syncOnlineListLayoutDisplay(event.target.value);
  };
}

// Safe deployment execution loop call for real-time identity boot
fetchAndRegisterNetworkIdentity();*/
