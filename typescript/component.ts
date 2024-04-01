export default class Component {
  hookId: string;

  constructor(renderHookId: string) {
    this.hookId = renderHookId;
  }

  createRootElement(tag: string, cssClasses: string, attributes?): HTMLElement {
    const rootElement: HTMLElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}
