export class Example extends HTMLElement {
  constructor() {
    super();

  }

  static get observedAttributes() {
    return ['data-test']
  }

  connectedCallback() {
    console.log('### connected callback called')

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <div>This is a shadow root content</div>
      ${this.innerHTML}
    `;
  }

  disconnectedCallback() {
    console.log('### disconected callback called')

  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }
}

customElements.define('example-cp', Example);