class Player {
  captain: Array<Character> = [
    {
      name: 'Leela',
      class: 'leela',
      image: 'leela.webp',
    },
    {
      name: 'Zapp',
      class: 'zapp',
      image: 'zapp.webp',
    },
  ];
  ship: Array<Vessel> = [
    {
      name: 'Planet Express',
      class: 'planet-express',
      image: 'planet-express.webp',
      stats: {
        hull: 20,
        firepower: 4,
        accuracy: 0.7,
      },
    },
    {
      name: 'Nimbus',
      class: 'nimbus',
      image: 'nimbus.webp',
      stats: {
        hull: 30,
        firepower: 6,
        accuracy: 0.5,
      },
    },
  ];
  player: {
    captain: Character;
    ship: Vessel;
  };

  constructor() {
    this.captain;
    this.ship;
    this.player = {
      captain: this.captain[0],
      ship: this.ship[0],
    };
  }

  set playerCaptain(value: string) {
    value == 'zapp'
      ? (this.player.captain = this.captain[1])
      : (this.player.captain = this.captain[0]);
  }

  set playerShip(value: string) {
    value == 'nimbus'
      ? (this.player.ship = this.ship[1])
      : (this.player.ship = this.ship[0]);
  }
}
