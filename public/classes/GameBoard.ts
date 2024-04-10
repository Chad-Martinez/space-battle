class GameBoard extends Component {
  constructor(renderHookId: string) {
    super(renderHookId);
    this.render();
  }

  render() {
    const title = this.createRootElement('div', 'title') as HTMLDivElement;
    title.textContent = 'SPACE BATTLE v3';
    const gameArea = this.createRootElement('div', '', [
      { name: 'id', value: 'game-area' },
    ]);
    new Captain('game-area');
    new Omicron('game-area');
  }
}
