class Controls extends Component {
  content: string;
  constructor(renderHookId: string, character: string) {
    super(renderHookId);
    this.content = character;
    this.render();
  }

  attack = (): void => {
    // if (omicronFleet.length > 0) {
    //   if (isHit(captainShip.accuracy)) {
    //     fireLasers(captain, 'hit');
    //     subtractDamage(
    //       captainShip,
    //       omicronFleet[omicronFleet.length - 1],
    //       omicronHull
    //     );
    //     speak(captainBubble, CAPTAIN_HIT_DIALOG);
    //     // console.log('SHIP POSITION ', ship.getBoundingClientRect());
    //     // ship.classList.add('retreat');
    //   } else {
    //     fireLasers(captain, 'miss');
    //     speak(captainBubble, CAPTAIN_MISS_DIALOG);
    //   }
    //   if (omicronFleet[omicronFleet.length - 1].hull > 0) {
    //     setTimeout(omicronAttack, 500);
    //   } else {
    //     omicronFleet.pop();
    //     if (omicronFleet.length <= 0) {
    //       gameFinish('win');
    //     } else {
    //       speak(captainBubble, CAPTAIN_DESTROY_DIALOG);
    //       retreatBtn.classList.remove('push--disabled');
    //       retreatBtn.classList.add('push--flat');
    //       omicronShipCount.textContent = omicronFleet.length.toString();
    //       setOmicronHull(omicronFleet[omicronFleet.length - 1].hull);
    //     }
    //   }
    // }
  };

  retreatHandler = () => {
    // const ship = captain.children[1].firstElementChild as HTMLImageElement;
    // ship.classList.toggle('retreat');
    // setTimeout(() => {
    //   ship.classList.toggle('retreat');
    //   gameFinish('retreat');
    // }, 1500);
  };

  render() {
    const controls = this.createRootElement('div', 'box');
    controls.innerHTML = `
        <div class="controls">
          <div class="button__container">
            <button id="attack-btn" class="push--flat"></button>
            <div class="button-action">Attack</div>
          </div>
          <div class="progress__container">
            <div class="progress__shell">
              <progress id="captain-hull" max="20" value="20">100%</progress>
            </div>
            <div id="captain-hull-title" class="progress__title">
              Planet Express Hull
            </div>
          </div>
          <div class="button__container">
            <button id="retreat-btn" class="push--disabled"></button>
            <div class="button-action">Retreat</div>
          </div>
        </div>`;
    const attackBtn = controls.querySelector('#attack-btn');
    attackBtn?.addEventListener('click', this.attack);
    const retreatBtn = controls.querySelector('#retreat-btn');
    retreatBtn?.addEventListener('click', this.retreatHandler);
  }
}
