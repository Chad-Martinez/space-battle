import Component from './component';
import Modal from './modal';
import Captain from './captain';
import Ship from './ship';

export default class App extends Component {
  static captainModal;
  static player: Captain;
  static ship: Ship;
  static init() {
    const captain = new Captain('app');
    const vessel = new Ship(20, 4, 0.7);
    const chooseCaptain = new Modal('app', captain);
    this.player = captain;
    this.ship = vessel;
    this.captainModal = chooseCaptain;
  }

  static handleChooseShip(selection) {
    console.log('SHIP ', selection);
  }

  static handleChooseCaptain(selection) {
    if (selection.id.includes('zapp')) {
      this.player.playerCaptain = 'zapp';
    }
    const chooseShip = new Modal('app', this.ship);
  }
}

App.init();
