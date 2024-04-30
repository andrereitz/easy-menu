import { BusinessData } from './types'

export class BusinessEdit extends HTMLElement {
  constructor() {
    super()
  }

  get data(): BusinessData | null {
    const data = this.getAttribute('data-payload');
    if(!data) return null

    return JSON.parse(data)
  }

  set data(value: string | null) {
    if (value) {
      this.setAttribute('data-payload', value) 
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = `
      Business edit information
    `

    this.innerHTML = template;
  }
}

customElements.define('business-edit', BusinessEdit);