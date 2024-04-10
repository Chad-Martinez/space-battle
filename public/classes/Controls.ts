class Controls extends Component {
  playerShip: Vessel = App.player.player.ship;

  constructor(renderHookId: string) {
    super(renderHookId);
    this.render();
  }

  static subtractDamage = (
    offense: Vessel,
    defense: Vessel,
    shipType: string
  ): number => {
    const defenseHull = document.getElementById(
      `${shipType}-hull`
    )! as HTMLProgressElement;
    defense.stats.hull -= offense.stats.firepower;
    defenseHull.value = defense.stats.hull;
    return defense.stats.hull;
  };

  static isHit = (accuracy: number): boolean =>
    accuracy > Math.random() ? true : false;

  attack = (): void => {
    if (Omicron.fleet > 0) {
      if (Controls.isHit(this.playerShip.stats.accuracy)) {
        Ship.fireLasers('captain', 'hit');
        Controls.subtractDamage(this.playerShip, Omicron.ship, 'omicron');
        Dialog.speak('captain', Captain.CAPTAIN_HIT_DIALOG);
      } else {
        Ship.fireLasers('captain', 'miss');
        Dialog.speak('captain', Captain.CAPTAIN_MISS_DIALOG);
      }
      if (Omicron.ship.stats.hull > 0) {
        setTimeout(Omicron.attack, 500);
      } else {
        Omicron.fleet -= 1;
        if (Omicron.fleet <= 0) {
          const content: GameFinish = {
            title: Modal.GAME_WON_TITLE,
            image: {
              path: 'images/zapp-salute.webp',
              alt: 'Winner',
            },
            slogan: Modal.GAME_WON_SLOGAN,
          };
          new Modal('app', 'game-finish', content);
        } else {
          Dialog.speak('captain', Captain.CAPTAIN_DESTROY_DIALOG);
          const retreatBtn = document.getElementById(
            'retreat-btn'
          )! as HTMLButtonElement;
          retreatBtn.classList.remove('push--disabled');
          retreatBtn.classList.add('push--flat');
          const omicronShipCount = document.getElementById(
            'ship-count'
          )! as HTMLDivElement;
          omicronShipCount.textContent = Omicron.fleet.toString();
          Omicron.generateOmicronShip();
        }
      }
    }
  };

  retreatHandler() {
    const ship = document.getElementById(
      'captain-ship-img'
    )! as HTMLImageElement;
    ship.classList.add('retreat');
    setTimeout(() => {
      const app = document.querySelector('#app')! as HTMLDivElement;
      app.innerHTML = '';

      const content: GameFinish = {
        title: Modal.GAME_RETREAT_TITLE,
        image: {
          path: 'images/zapp-fish-full.webp',
          alt: 'The Wiley Fish',
        },
        slogan: Modal.GAME_RETREAT_SLOGAN,
      };
      new Modal('app', 'game-finish', content);
    }, 1500);
  }

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
              ${App.player.player.ship.name} Hull
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
