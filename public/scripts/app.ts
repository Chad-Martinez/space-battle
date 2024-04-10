class App extends Component {
  static player: Player;
  static omicron: Omicron;

  static init() {
    const player = new Player();
    const omicron = new Omicron('game-area');
    this.player = player;
    this.omicron = omicron;
    new Modal('app', 'captain', this.player.captain);
  }
}

App.init();
