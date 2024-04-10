class Alien extends Component {
  constructor(renderHookId: string) {
    super(renderHookId);
    this.render();
  }

  render() {
    const omicron = this.createRootElement('div', 'col', [
      { name: 'id', value: 'omicron' },
    ]);
    new Dialog('omicron', 'omicron');
    // this.ship.render();
    const ship = document.createElement('div');
    ship.setAttribute('id', 'omicron-ship');
    ship.className = 'box';
    ship.innerHTML = `
          <img
            id="omicron-ship"
            src="images/omicron-ship.webp"
            alt="Omicron Ship"
          />
          <img
            id="omicron-ship-laser"
            class="laser"
            src="images/lasers-right.webp"
            alt="Omicron Laser"
          />
          <div id="omicron-explosions">
            <img
              class="explosion small"
              src="images/explosion.webp"
              alt="Explosion"
            />
            <img
              class="explosion medium"
              src="images/explosion.webp"
              alt="Explosion"
            />
            <img
              class="explosion large"
              src="images/explosion.webp"
              alt="Explosion"
            />
          </div>
    `;
    omicron?.appendChild(ship);
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
