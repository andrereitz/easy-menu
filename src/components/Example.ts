export class Example extends HTMLElement {
  constructor() {
    super();

    console.log('this are the components children', this.children)
  }

  static get observedAttributes() {
    return ['class']
  }

  connectedCallback() {
    console.log('### connected callback called 1')
    this.innerHTML = 'this is a test component'

  }

  disconnectedCallback() {
    console.log('disconected')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }
}

customElements.define('example-cp', Example);