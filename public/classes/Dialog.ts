class Dialog extends Component {
  content: string;
  constructor(renderHookId: string, character: string) {
    super(renderHookId);
    this.content = character;
    this.render();
  }

  speak = (element: HTMLElement, dialog: string): void => {
    element.textContent = dialog;
    element.style.opacity = '1';
    setTimeout(() => {
      element.style.opacity = '0';
    }, 2800);
  };

  render() {
    const dialog = this.createRootElement('div', 'box', [
      { name: 'id', value: `${this.content}-dialog` },
    ]);
    if (this.content == 'captain') {
      dialog.innerHTML = `
        <img id="${this.content}-img" src="images/leela.webp" alt="Leela" />
        <div>
          <div id="${this.content}-bubble" class="bubble grow left">
            This is such a travesty
          </div>
        </div>`;
    } else {
      dialog.innerHTML = `
            <div>
              <div id="omicron-bubble" class="bubble grow right">
                This is such a travesty. Who is going to pay for this?
              </div>
            </div>
            <img id="omicron-lrrrr" src="images/lrrrr.webp" alt="Lrrrr" />
          `;
    }
  }
}
