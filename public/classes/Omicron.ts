class Omicron extends Component {
  lrrr: Character = {
    name: 'Lrrr',
    class: 'lrrr',
    image: 'lrrr.webp',
  };
  ship: Vessel = {
    name: 'Omicron Ship',
    class: 'omicron-ship',
    image: 'omicron-ship.webp',
    stats: {
      hull: Number(Math.floor(Math.random() * (7 - 5 + 1) + 5).toFixed(3)),
      firepower: Math.floor(Math.random() * (4 - 2 + 1) + 2),
      accuracy: (Math.random() * (8 - 6 + 1) + 6) / 10,
    },
  };
  constructor(renderHookId: string) {
    super(renderHookId);
    this.render();
  }

  render() {
    const omicron = this.createRootElement('div', 'col', [
      { name: 'id', value: 'omicron' },
    ]);
    new Dialog('omicron', 'omicron', this.lrrr);
    new Ship('omicron', 'omicron', this.ship);
    const controls = this.createRootElement('div', 'box');
    controls.innerHTML = `
          <div class="controls">
            <div class="control-info"></div>
            <div class="progress__container">
              <div class="progress__shell">
                <progress id="omicron-hull" max="5" value="5">100%</progress>
              </div>
              <div id="omicron-hull-title" class="progress__title">
                Omicron Hull
              </div>
            </div>
            <div class="control-info">
              <div id="ship-count" class="ship-count">5</div>
              <div class="button-action">Ships</div>
            </div>
          </div>
    `;
    omicron.appendChild(controls);
  }
}
