class GameBoard extends Component {
  player: Captain;
  constructor(renderHookId: string, player: Captain) {
    super(renderHookId);
    this.player = player;
    this.render();
  }

  render() {
    const title = this.createRootElement('div', 'title') as HTMLDivElement;
    title.textContent = 'SPACE BATTLE v3';
    const gameArea = this.createRootElement('div', '', [
      { name: 'id', value: 'game-area' },
    ]);
    this.player.render();
  }
}
