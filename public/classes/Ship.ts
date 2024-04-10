class Ship extends Component {
  ship: Vessel;
  shipType: string;

  constructor(renderHookId: string, shipType: string, ship: Vessel) {
    super(renderHookId);
    this.ship = ship;
    console.log('SHIP ', ship);
    this.shipType = shipType;
    this.render();
  }

  render() {
    const ship = this.createRootElement('div', 'box', [
      { name: 'id', value: `${this.shipType}-ship` },
    ]);
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
  }
}
