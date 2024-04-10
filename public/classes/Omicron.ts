class Omicron extends Component {
  lrrr: Character = {
    name: 'Lrrr',
    class: 'lrrr',
    image: 'lrrr.webp',
  };
  static ship: Vessel = {
    name: 'Omicron Ship',
    class: 'omicron-ship',
    image: 'omicron-ship.webp',
    stats: {
      hull: Number(Math.floor(Math.random() * (7 - 5 + 1) + 5).toFixed(3)),
      firepower: Math.floor(Math.random() * (4 - 2 + 1) + 2),
      accuracy: (Math.random() * (8 - 6 + 1) + 6) / 10,
    },
  };
  static fleet: number = 5;
  static OMICRON_HIT_DIALOG: string = 'Hit!! Soon you will meet your fate!';
  static OMICRON_MISS_DIALOG: string =
    'Miss? Unacceptable! Recalibrate lasers!';
  static OMICRON_DESTROY_DIALOG: string = 'MUAH AHAH AH! Doooom!';

  constructor(renderHookId: string) {
    super(renderHookId);
  }
  static generateOmicronShip() {
    const omicronShipCount = document.getElementById(
      'ship-count'
    )! as HTMLDivElement;
    omicronShipCount.textContent = Omicron.fleet.toString();

    Omicron.ship.stats = {
      hull: Number(Math.floor(Math.random() * (7 - 5 + 1) + 5).toFixed(3)),
      firepower: Math.floor(Math.random() * (4 - 2 + 1) + 2),
      accuracy: (Math.random() * (8 - 6 + 1) + 6) / 10,
    };
    console.log(Omicron.ship.stats);
    const omicronHull = document.getElementById(
      'omicron-hull'
    )! as HTMLProgressElement;
    omicronHull.max = Omicron.ship.stats.hull;
    omicronHull.value = Omicron.ship.stats.hull;
  }

  static attack = (): void => {
    if (Controls.isHit(Omicron.ship.stats.accuracy)) {
      Ship.fireLasers('omicron', 'hit');
      const enemyHull: number = Controls.subtractDamage(
        Omicron.ship,
        App.player.player.ship,
        'captain'
      );
      if (enemyHull <= 0) {
        const content: GameFinish = {
          title: Modal.GAME_LOST_TITLE,
          image: {
            path: 'images/lrrr-doom.webp',
            alt: 'Dooooom!',
          },
          slogan: '',
        };
        new Modal('app', 'game-finish', content);
      } else {
        Dialog.speak('omicron', Omicron.OMICRON_HIT_DIALOG);
      }
    } else {
      Ship.fireLasers('omicron', 'miss');
      Dialog.speak('omicron', Omicron.OMICRON_MISS_DIALOG);
    }
  };

  render() {
    const omicron = this.createRootElement('div', 'col', [
      { name: 'id', value: 'omicron' },
    ]);
    new Dialog('omicron', 'omicron', this.lrrr);
    new Ship('omicron', 'omicron', Omicron.ship);
    const controls = this.createRootElement('div', 'box');
    controls.innerHTML = `
          <div class="controls">
            <div class="control-info"></div>
            <div class="progress__container">
              <div class="progress__shell">
                <progress id="omicron-hull" max="5" value="5">100%</progress>
              </div>
              <div id="omicron-hull-title" class="progress__title">
                Omicron Hull
              </div>
            </div>
            <div class="control-info">
              <div id="ship-count" class="ship-count">5</div>
              <div class="button-action">Ships</div>
            </div>
          </div>
    `;
    omicron.appendChild(controls);
  }
}
