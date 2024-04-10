class App extends Component {
  static player: Player;

  static init() {
    const player = new Player();
    this.player = player;
    new Modal('app', 'captain', this.player.captain);
  }
}

App.init();
