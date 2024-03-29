var captainShip = {
    hull: 20,
    firepower: 4,
    accuracy: 0.7,
};
var captainName;
var shipName;
var alienCount = 5;
var CAPTAIN_HIT_DIALOG = 'Yes! Direct Hit!';
var CAPTAIN_MISS_DIALOG = 'Rats! We missed!';
var CAPTAIN_DESTROY_DIALOG = 'Another one bites the dust!';
var GAME_WON_TITLE = 'Congratulations Captain';
var GAME_WON_SLOGAN = "Call me cocky, but if there's an alien out there I can't kill, I haven't met him and killed him yet.";
var GAME_LOST_TITLE = 'DOOOOOOOOMMMMMM!!!';
var GAME_RETREAT_TITLE = 'COWARD!';
var GAME_RETREAT_SLOGAN = 'My instincts are to hide in the barrel like the wiley fish.';
var OMICRON_HIT_DIALOG = 'Hit!! Soon you will meet your fate!';
var OMICRON_MISS_DIALOG = 'Miss? Unacceptable! Recalibrate lasers!';
var OMICRON_DESTROY_DIALOG = 'MUAH AHAH AH! Doooom!';
var backdrop = document.getElementById('backdrop');
var gameArea = document.getElementById('game-area');
var selectCaptainModal = document.getElementById('captain-modal');
var selectShipModal = document.getElementById('ship-modal');
var gameFinishModal = document.getElementById('game-finish-modal');
var selectCaptain = document.querySelector('.captain__container');
var selectShip = document.querySelector('.ship__container');
var captain = document.getElementById('captain');
var omicronShipCount = document.getElementById('ship-count');
var captainHull = document.getElementById('captain-hull');
var omicron = document.getElementById('omicron');
var omicronHull = document.getElementById('omicron-hull');
var captainHullTitle = document.getElementById('captain-hull-title');
var captainBubble = document.getElementById('captain-bubble');
var omicronBubble = document.getElementById('omicron-bubble');
var attackBtn = document.getElementById('attack-btn');
var retreatBtn = document.getElementById('retreat-btn');
var toggleBackdrop = function () {
    backdrop.classList.toggle('visible');
};
var toggleCaptainModal = function () {
    return selectCaptainModal.classList.remove('visible');
};
var toggleShipModal = function () {
    selectShipModal.classList.add('visible');
};
var selectCaptainHandler = function (e) {
    e.target instanceof HTMLButtonElement
        ? (captainName = e.target.id)
        : (captainName = 'leela-select');
    toggleCaptainModal();
    toggleShipModal();
};
var selectShipHandler = function (e) {
    e.target instanceof HTMLButtonElement
        ? (shipName = e.target.id)
        : (shipName = 'planet-express-select');
    if (captainName === 'zapp-select') {
        var captainImg = captain.children[0]
            .firstElementChild;
        captainImg.setAttribute('src', 'images/zapp-main.webp');
        captainImg.setAttribute('alt', 'Zapp');
    }
    if (shipName === 'nimbus-select') {
        var shipImg = captain.children[1].firstElementChild;
        shipImg.setAttribute('src', 'images/nimbus.webp');
        shipImg.setAttribute('alt', 'Nimbus');
        shipImg.style.height = '320px';
        captainHullTitle.textContent = 'Nimbus Hull';
        captainShip.hull = 30;
        captainShip.firepower = 6;
        captainShip.accuracy = 0.5;
    }
    selectShipModal.classList.toggle('visible');
    toggleBackdrop();
    gameArea.classList.remove('opacity');
    setOmicronHull(omicronFleet[omicronFleet.length - 1].hull);
};
var alienShipFactory = function (fleetCount) {
    var alienFleet = [];
    for (var i = 0; i < fleetCount; i++) {
        alienFleet.push({
            hull: Number(Math.floor(Math.random() * (7 - 5 + 1) + 5).toFixed(3)),
            firepower: Math.floor(Math.random() * (4 - 2 + 1) + 2),
            accuracy: (Math.random() * (8 - 6 + 1) + 6) / 10,
        });
    }
    return alienFleet;
};
var isHit = function (accuracy) {
    return accuracy > Math.random() ? true : false;
};
var setOmicronHull = function (hullValue) {
    omicronHull.max = hullValue;
    omicronHull.value = hullValue;
};
var speak = function (element, dialog) {
    element.textContent = dialog;
    element.style.opacity = '1';
    setTimeout(function () {
        element.style.opacity = '0';
    }, 2800);
};
var omicronFleet = alienShipFactory(alienCount);
var fireLasers = function (player, hit) {
    var ship = player.children[1].lastElementChild;
    ship.classList.add("".concat(hit));
    setTimeout(function () { return ship.classList.remove("".concat(hit)); }, 600);
};
var gameFinish = function (action) {
    var content = gameFinishModal.firstElementChild;
    var title = content.firstElementChild;
    var gameFinishImage = content.children[1];
    var slogan = content.children[2];
    if (action == 'retreat') {
        title.textContent = GAME_RETREAT_TITLE;
        gameFinishImage.setAttribute('src', 'images/zapp-fish-full.webp');
        gameFinishImage.setAttribute('alt', 'The Wiley Fish');
        slogan.textContent = GAME_RETREAT_SLOGAN;
        gameFinishModal.classList.toggle('visible');
    }
    else if (action == 'lose') {
        title.textContent = GAME_LOST_TITLE;
        gameFinishImage.setAttribute('src', 'images/lrrr-doom.webp');
        gameFinishImage.setAttribute('alt', 'Doooom!');
        gameFinishImage.style.width = '300px';
        slogan.textContent = '';
        gameFinishModal.classList.toggle('visible');
    }
    else {
        gameFinishModal.classList.toggle('visible');
    }
    toggleBackdrop();
};
var subtractDamage = function (offense, defense, defenseHull) {
    defense.hull -= offense.firepower;
    defenseHull.value = defense.hull;
    return defense.hull;
};
var omicronAttack = function () {
    if (isHit(omicronFleet[omicronFleet.length - 1].accuracy)) {
        fireLasers(omicron, 'hit');
        var enemyHull = subtractDamage(omicronFleet[omicronFleet.length - 1], captainShip, captainHull);
        enemyHull <= 0
            ? gameFinish('lose')
            : speak(omicronBubble, OMICRON_HIT_DIALOG);
    }
    else {
        fireLasers(omicron, 'miss');
        speak(omicronBubble, OMICRON_MISS_DIALOG);
    }
};
var attack = function () {
    if (omicronFleet.length > 0) {
        if (isHit(captainShip.accuracy)) {
            fireLasers(captain, 'hit');
            subtractDamage(captainShip, omicronFleet[omicronFleet.length - 1], omicronHull);
            speak(captainBubble, CAPTAIN_HIT_DIALOG);
            // console.log('SHIP POSITION ', ship.getBoundingClientRect());
            // ship.classList.add('retreat');
        }
        else {
            fireLasers(captain, 'miss');
            speak(captainBubble, CAPTAIN_MISS_DIALOG);
        }
        if (omicronFleet[omicronFleet.length - 1].hull > 0) {
            setTimeout(omicronAttack, 500);
        }
        else {
            omicronFleet.pop();
            if (omicronFleet.length <= 0) {
                gameFinish('win');
            }
            else {
                speak(captainBubble, CAPTAIN_DESTROY_DIALOG);
                retreatBtn.classList.remove('push--disabled');
                retreatBtn.classList.add('push--flat');
                omicronShipCount.textContent = omicronFleet.length.toString();
                setOmicronHull(omicronFleet[omicronFleet.length - 1].hull);
            }
        }
    }
};
var retreatHandler = function (e) {
    var ship = captain.children[1].firstElementChild;
    ship.classList.toggle('retreat');
    setTimeout(function () {
        ship.classList.toggle('retreat');
        gameFinish('retreat');
    }, 1500);
};
var reset = function (e) {
    if (e.target instanceof HTMLButtonElement)
        location.reload();
};
selectCaptain.addEventListener('click', selectCaptainHandler);
selectShip.addEventListener('click', selectShipHandler);
attackBtn.addEventListener('click', attack);
retreatBtn.addEventListener('click', retreatHandler);
gameFinishModal.addEventListener('click', reset);
