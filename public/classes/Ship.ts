class Ship {
  hull: number;
  firepower: number;
  accuracy: number;

  id: string = 'ship';
  characters: Array<Character> = [
    {
      name: 'Planet Express',
      class: 'planet-express',
      image: 'planet-express.webp',
    },
    {
      name: 'Nimbus',
      class: 'nimbus',
      image: 'nimbus.webp',
    },
  ];

  constructor(hull: number, firepower: number, accuracy: number) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }

  render() {
    const captain = document.getElementById('captain');
    const ship = document.createElement('div');
    ship.setAttribute('id', 'captain-ship');
    ship.className = 'box';
    ship.innerHTML = `
          <img
            id="captain-ship-img"
            src="images/planet-express.webp"
            alt="Planet Express"
          />
          <img
            id="captain-ship-laser"
            class="laser"
            src="images/laser-left.webp"
            alt="Captain Laser"
          />
          <div id="captain-explosions">
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
    captain?.appendChild(ship);
  }
}
