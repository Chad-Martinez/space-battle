class App extends Component {
  static captainModal: Modal;
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

  static handleChooseShip(selection: string) {
    if (selection.includes('zapp')) {
      this.ship = new Ship(30, 6, 0.5);
    }
    document.querySelector('.ship.modal')?.remove();
    new GameBoard('app');
  }

  static handleChooseCaptain(selection: string) {
    if (selection.includes('zapp')) {
      this.player.playerCaptain = 'zapp';
    }
    document.querySelector('.captain.modal')?.remove();
    new Modal('app', this.ship);
  }
}

App.init();
