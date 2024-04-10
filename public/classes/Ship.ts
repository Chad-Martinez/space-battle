class Ship extends Component {
  ship: Vessel;
  shipType: string;

  constructor(renderHookId: string, shipType: string, ship: Vessel) {
    super(renderHookId);
    this.ship = ship;
    this.shipType = shipType;
    this.render();
  }

  animateExplosions = (e: AnimationEvent) => {
    const [shipType, hit] = e.animationName.split('-');

    const shipLaser = document.getElementById(
      `${shipType}-ship-laser`
    )! as HTMLDivElement;
    shipLaser.classList.toggle(hit);

    if (hit == 'hit') {
      if (this.shipType == 'omicron') {
        const explosions = document.querySelectorAll(
          '#captain-explosions .explosion'
        );
        explosions.forEach((explosion, i) => {
          setTimeout(() => {
            explosion.classList.toggle(`exploded`);
          }, i * 250);
        });
      } else {
        const explosions = document.querySelectorAll(
          '#omicron-explosions .explosion'
        );
        explosions.forEach((explosion, i) => {
          setTimeout(() => {
            explosion.classList.toggle(`exploded`);
          }, i * 250);
        });
      }
    }
  };

  removeExplosions = (e: AnimationEvent) => {
    const explosion = e.target as HTMLImageElement;
    explosion.classList.toggle('exploded');
  };

  static fireLasers = (shipType: string, hit: string): void => {
    const shipLaser = document.getElementById(
      `${shipType}-ship-laser`
    )! as HTMLDivElement;

    shipLaser.classList.toggle(`${hit}`);
  };

  render() {
    const ship = this.createRootElement('div', 'box', [
      { name: 'id', value: `${this.shipType}-ship` },
    ]) as HTMLDivElement;
    ship.innerHTML = `
          <img
            id="${this.shipType}-ship-img"
            class="${this.ship.class}"
            src="images/${this.ship.image}"
            alt="Planet Express"
          />
          <img
            id="${this.shipType}-ship-laser"
            class="laser"
            src="images/laser-${
              this.shipType == 'captain' ? 'left' : 'right'
            }.webp"
            alt="Captain Laser"
          />
          <div id="${this.shipType}-explosions">
            <img
              class="explosion small"
              src="images/explosion.webp"
              alt="Explosion"
            />
            <img
              class="explosion medium"
              src="images/explosion.webp"
              alt="Explosion"
            />
            <img
              class="explosion large"
              src="images/explosion.webp"
              alt="Explosion"
            />
          </div>
    `;

    const gameAreaWidth = parseInt(
      getComputedStyle(document.getElementById('game-area')! as HTMLDivElement)
        .width
    );
    const root = document.querySelector(':root')! as HTMLElement;

    if (this.shipType == 'captain') {
      const omicronPosition = gameAreaWidth - 306;
      root.style.setProperty(
        '--omicron-position',
        `translate(${omicronPosition}px, 0px)`
      );
    } else {
      const captainPosition = gameAreaWidth - 330;
      root.style.setProperty(
        '--captain-position',
        `translate(-${captainPosition}px, 0px)`
      );
    }

    const explosionsContainer = ship.querySelector(
      `#${this.shipType}-explosions`
    )! as HTMLDivElement;
    explosionsContainer.addEventListener('animationend', this.removeExplosions);

    const shipLaser = ship.querySelector(
      `#${this.shipType}-ship-laser`
    )! as HTMLDivElement;
    shipLaser.addEventListener('animationend', this.animateExplosions);
  }
}
