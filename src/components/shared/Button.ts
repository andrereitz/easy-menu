import _template from 'lodash.template'
import { compileCustomSlots } from '../../helpers'

const stringtemplate = `
  <%= data.icon %>
  <%= data.default %>
`

export class Button extends HTMLButtonElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
    this.registerListeners()
  }
  
  render() {
    const variant = this.getAttribute('variant');
    const size = this.getAttribute('size');
    let classes = ['btn'];

    if (variant) {
      classes.push(`btn-${variant}`)
    }
    if (size) {
      classes.push(`btn-${size}`)
    }

    this.classList.add(...classes)

    if(this.children.length > 0) {
      this.innerHTML = compileCustomSlots(this, stringtemplate);
    }
  }

  registerListeners() {
    const link = this.getAttribute('link')

    if (link) {
      this.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = link;
      })
    }
  }
}

customElements.define('btn-cp', Button, { extends: 'button' })