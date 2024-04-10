class Modal extends Component {
  content: Array<Character> | GameFinish;
  modalType: string;
  static GAME_WON_TITLE = 'Congratulations Captain';
  static GAME_WON_SLOGAN =
    "Call me cocky, but if there's an alien out there I can't kill, I haven't met him and killed him yet.";
  static GAME_LOST_TITLE = 'DOOOOOOOOMMMMMM!!!';
  static GAME_RETREAT_TITLE = 'COWARD!';
  static GAME_RETREAT_SLOGAN =
    'My instincts are to hide in the barrel like the wiley fish.';

  constructor(
    renderHookId: string,
    modalType: string,
    content: Array<Character> | GameFinish
  ) {
    super(renderHookId);
    this.content = content;
    this.modalType = modalType;
    this.render();
  }

  handleSelection(e: MouseEvent) {
    if (e.target instanceof HTMLButtonElement) {
      if (e.target.parentElement!.className.includes('captain')) {
        if (e.target.id.includes('zapp')) {
          App.player.playerCaptain = 'zapp';
        }
        document.querySelector('.captain.modal')?.remove();
        new Modal('app', 'ship', App.player.ship);
        document.getElementById('backdrop')!.classList.toggle('visible');
      }
      if (e.target.parentElement!.className.includes('ship')) {
        if (e.target.id.includes('nimbus')) {
          App.player.playerShip = 'nimbus';
        }
        document.querySelector('.ship.modal')?.remove();
        new GameBoard('app');
        document.getElementById('backdrop')!.classList.remove('visible');
      }
      if (e.target.parentElement!.className.includes('game-finish')) {
        document.querySelector('.game-finish.modal')?.remove();
        document.getElementById('backdrop')!.classList.toggle('visible');
        App.init();
      }
    }
  }

  render() {
    document.getElementById('backdrop')!.classList.toggle('visible');
    const modal = this.createRootElement(
      'div',
      `${this.modalType} modal card visible`
    ) as HTMLDivElement;
    if (this.modalType == 'game-finish') {
      const gameFinish = this.content as GameFinish;
      modal.innerHTML = `
      <div class="game-finish__content modal__content">
        <div id="game-finish-title" class="modal__title">
          ${gameFinish.title}
        </div>
        <img id="game-finish-img" src="${gameFinish.image.path}" alt="${gameFinish.image.alt}" />
        <div class="game-finish__slogan">
          "${gameFinish.slogan}"
        </div>
        <button id="start-select" class="btn btn--success">START</button>
      </div>
      `;
    } else {
      const characters = this.content as Array<Character>;
      modal.innerHTML = `
      <div class="modal__content">
        <div class="modal__title">Select your ${
          this.modalType == 'captain' ? 'Captain' : 'Vessel'
        }</div>
        <div class="${this.modalType}__container">
          <div class="${this.modalType}__item">
            <img id="${characters[0].class}-img" src="images/${
        characters[0].image
      }" alt="${characters[0].name}" />
            <button id="${
              characters[0].class
            }-select" class="btn btn--success">${characters[0].name}</button>
          </div>
          <div class="${this.modalType}__item">
            <img id="${characters[1].class}-img" src="images/${
        characters[1].image
      }" alt="${characters[1].name}" />
            <button id="${
              characters[1].class
            }-select" class="btn btn--success">${characters[1].name}</button>
          </div>
        </div>
      </div>`;
      if (characters[1].name == 'Nimbus') {
        const image = modal.querySelector(
          `#${characters[1].class}-img`
        )! as HTMLImageElement;
        image.style.transform = 'rotateY(180deg)';
      }
    }

    modal.addEventListener('click', this.handleSelection);
  }
}
