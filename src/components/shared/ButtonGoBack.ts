export class ButtonGoBack extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    this.render()
    this.registerListeners()
  }

  render() {
    const template = `
      <button is="btn-cp" style="color: var(--link-color)">
        <i class="bi bi-arrow-left fs-4"></i>
      </buton>
    `

    this.innerHTML = template
  }

  registerListeners() {
    this.addEventListener('click', (event) => {
      history.back()
    })
  }
}

customElements.define('btn-back', ButtonGoBack)