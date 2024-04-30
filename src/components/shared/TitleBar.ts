export class TitleBar extends HTMLElement {
  constructor() {
    super();
  }

  barTitle: string | null = null;

  connectedCallback() {
    this.barTitle = this.getAttribute('data-title') || null;
    this.classList.add('d-flex', 'gap-3', 'p-2', 'mb-2', 'align-items-center', 'w-100', 'rounded');
    this.style.background = 'var(--color-primary)';
    this.style.color = 'white';

    this.render();
  }

  render() {
    const template = `
      <btn-back></btn-back>
      ${this.barTitle ? (`
        <h2 class="fs-4 m-0 me-auto">${this.barTitle}</h2>
      `) : ''}
      ${this.innerHTML}
    `

    this.innerHTML = template
  }
}

customElements.define('title-bar', TitleBar)