class App extends Component {
  static captainModal: Modal;
  static player: Captain;
  static ship: Ship;
  static init() {
    console.log('init firing');
    const captain = new Captain('app');
    const vessel = new Ship(20, 4, 0.7);
    const chooseCaptain = new Modal('app', captain);
    this.player = captain;
    this.ship = vessel;
    this.captainModal = chooseCaptain;
  }

  static handleChooseShip(selection: { id: string }) {
    console.log('SHIP ', selection);
  }

  static handleChooseCaptain(selection: { id: string }) {
    console.log('handle firing');
    if (selection.id.includes('zapp')) {
      this.player.playerCaptain = 'zapp';
    }
    const chooseShip = new Modal('app', this.ship);
  }
}

App.init();
