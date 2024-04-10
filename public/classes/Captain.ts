class Captain extends Component {
  captain: Character;
  ship: Vessel;
  CAPTAIN_HIT_DIALOG: string = 'Yes! Direct Hit!';
  CAPTAIN_MISS_DIALOG: string = 'Rats! We missed!';
  CAPTAIN_DESTROY_DIALOG: string = 'Another one bites the dust!';

  constructor(renderHookId: string) {
    super(renderHookId);
    this.captain = App.player.player.captain;
    this.ship = App.player.player.ship;
    this.render();
  }

  render() {
    this.createRootElement('div', 'col', [{ name: 'id', value: 'captain' }]);
    new Dialog('captain', 'captain', this.captain);
    new Ship('captain', 'captain', this.ship);
    new Controls('captain', 'captain');
  }
}
