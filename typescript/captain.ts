import Component from './component';
import { Character } from './types';

export default class Captain extends Component {
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

  constructor(renderHookId: string) {
    super(renderHookId);
  }

  render() {
    const captain = this.createRootElement('div', 'col', [
      { name: 'id', value: 'captain' },
    ]) as HTMLDivElement;
    captain.innerHTML = `<h1>Hello from ${this.characters[0].name}</h1>`;
  }
}
