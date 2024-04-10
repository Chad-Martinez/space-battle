class Modal extends Component {
  content: Array<Character>;
  modalType: string;

  constructor(
    renderHookId: string,
    modalType: string,
    content: Array<Character>
  ) {
    super(renderHookId);
    this.content = content;
    this.modalType = modalType;
    this.render();
  }

  handleSelection(e: MouseEvent) {
    if (e.target instanceof HTMLButtonElement) {
      // document.getElementById('backdrop')!.classList.toggle('visible');
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
    }
  }

  render() {
    document.getElementById('backdrop')!.classList.toggle('visible');
    const modal = this.createRootElement(
      'div',
      `${this.modalType} modal card visible`
    ) as HTMLDivElement;
    modal.innerHTML = `
      <div class="modal__content">
        <div class="modal__title">Select your ${
          this.modalType == 'captain' ? 'Captain' : 'Vessel'
        }</div>
        <div class="${this.modalType}__container">
          <div class="${this.modalType}__item">
            <img id="${this.content[0].class}-img" src="images/${
      this.content[0].image
    }" alt="${this.content[0].name}" />
            <button id="${
              this.content[0].class
            }-select" class="btn btn--success">${this.content[0].name}</button>
          </div>
          <div class="${this.modalType}__item">
            <img id="${this.content[1].class}-img" src="images/${
      this.content[1].image
    }" alt="${this.content[1].name}" />
            <button id="${
              this.content[1].class
            }-select" class="btn btn--success">${this.content[1].name}</button>
          </div>
        </div>
      </div>`;
    modal.addEventListener('click', this.handleSelection);
  }
}
