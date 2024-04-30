export class Badge extends HTMLElement {
  constructor() {
    super();
  }

  categoryTitle: string | null = null
  categoryID: string | null = null

  connectedCallback() {
    this.categoryTitle = this.getAttribute('data-title');
    this.categoryID = this.getAttribute('data-id') || null;

    this.render()
  }

  render() {
    const template = `
      <a 
        href="/category/edit/${this.categoryID}" 
        class="btn rounded px-3 py-1 text-nowrap" 
        style="background: var(--color-primary); color: var(--color-text-inverted)"
        gf-match="${this.categoryTitle}" 
      >
        <span gf-content>
          ${this.categoryTitle}
        </span>
      </a>
    `

    this.innerHTML = template;
  }
}

customElements.define('category-badge', Badge)