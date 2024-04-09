class Captain extends Component {
  id: string = 'captain';
  characters: Array<Character> = [
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
  player = {
    character: this.characters[0],
    ship: {},
  };
  ship: Ship;

  set playerCaptain(captain: string) {
    if (captain == 'leela') {
      this.player.character = this.characters[0];
    } else {
      this.player.character = this.characters[1];
    }
  }

  // set playerShip(ship: string) {
  //   if (ship == 'planet-express') {
  //     this.player.ship
  //   }
  // }

  constructor(renderHookId: string, ship: Ship) {
    super(renderHookId);
    this.ship = ship;
  }

  render() {
    this.createRootElement('div', 'col', [{ name: 'id', value: 'captain' }]);
    new Dialog('captain', 'captain');
    this.ship.render();
    new Controls('captain', 'captain');
  }
}
