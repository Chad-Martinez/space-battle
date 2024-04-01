import Component from './component';
import App from './app';
import Captain from './captain';
import Ship from './ship';

export default class Modal extends Component {
  content: Captain | Ship;

  constructor(renderHookId: string, content: Captain | Ship) {
    super(renderHookId);
    this.content = content;
    this.render();
  }

  handleSelection(e: InputEvent) {
    if (e.target instanceof HTMLButtonElement) {
      console.log('choose captain ', e.target.className);
      document.getElementById('backdrop').classList.toggle('visible');
      if (e.target.parentElement.className.includes('captain')) {
        App.handleChooseCaptain(e.target);
      }
      if (e.target.parentElement.className.includes('ship')) {
        App.handleChooseShip(e.target);
      }
      document.querySelector('.modal').classList.toggle('visible');
      document.getElementById('backdrop').classList.remove('visible');
    }
  }

  render() {
    document.getElementById('backdrop').classList.toggle('visible');
    const modal = this.createRootElement(
      'div',
      `${this.content.id} modal card visible`
    ) as HTMLDivElement;
    modal.innerHTML = `
      <div class="modal__content">
        <div class="modal__title">Select your ${
          this.content.id == 'captain' ? 'Captain' : 'Vessel'
        }</div>
        <div class="${this.content.id}__container">
          <div class="${this.content.id}__item">
            <img id="${this.content.characters[0].class}-img" src="images/${
      this.content.characters[0].image
    }" alt="${this.content.characters[0].name}" />
            <button id="${
              this.content.characters[0].class
            }-select" class="btn btn--success">${
      this.content.characters[0].name
    }</button>
          </div>
          <div class="${this.content.id}__item">
            <img id="${this.content.characters[1].class}-img" src="images/${
      this.content.characters[1].image
    }" alt="${this.content.characters[1].name}" />
            <button id="z${
              this.content.characters[1].class
            }app-select" class="btn btn--success">${
      this.content.characters[1].name
    }</button>
          </div>
        </div>
      </div>`;
    modal.addEventListener('click', this.handleSelection);
  }
}
