class Dialog extends Component {
  content?: Character;
  dialogType: string;
  constructor(renderHookId: string, dialogType: string, character?: Character) {
    super(renderHookId);
    this.content = character;
    this.dialogType = dialogType;
    this.render();
  }

  static speak = (dialogType: string, dialog: string): void => {
    const dialogEl = document.getElementById(
      `${dialogType}-bubble`
    )! as HTMLDivElement;
    dialogEl.textContent = dialog;
    dialogEl.style.opacity = '1';
    setTimeout(() => {
      dialogEl.style.opacity = '0';
    }, 2800);
  };

  render() {
    const dialog = this.createRootElement('div', 'box', [
      { name: 'id', value: `${this.dialogType}-dialog` },
    ]);
    if (this.dialogType == 'captain') {
      dialog.innerHTML = `
        <img id="${this.dialogType}-img" src="images/${this.content?.image}" alt="${this.content?.name}" />
        <div>
          <div id="${this.dialogType}-bubble" class="bubble grow left">
            This is such a travesty
          </div>
        </div>`;
      if (this.content?.name == 'Zapp') {
        const image = dialog.querySelector('img')! as HTMLImageElement;
        image.style.transform = 'rotateY(180deg)';
      }
    } else {
      dialog.innerHTML = `
            <div>
              <div id="${this.dialogType}-bubble" class="bubble grow right">
                This is such a travesty. Who is going to pay for this?
              </div>
            </div>
            <img id="${this.dialogType}-img" src="images/${this.content?.image}" alt="${this.content?.name}" />
          `;
    }
  }
}
