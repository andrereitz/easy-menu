export class MenuActions extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    const template = `
      <div class="d-flex justify-content-center justify-content-lg-between align-items-center flex-wrap my-3">
        <div class="form-floating ml-md-auto w-100" style="max-width: 450px">
          <input type="text" class="form-control" id="filter" placeholder="Filter..." gf-input />
          <label for="filter">Filter</label>
        </div>
        <div>
          <button is="btn-cp" class="me-2 mt-3 mt-lg-0" link="/category" variant="outline-primary">Categories</button>
          <button is="btn-cp" class="me-2 mt-3 mt-lg-0" link="/category/new" variant="outline-primary">Add Category</button>
          <button is="btn-cp" class="mt-3 mt-lg-0" link="/item/new" variant="outline-primary">Add New</button>
        </div>
      </div>
    `

    this.innerHTML = template;
  }
}

customElements.define('menu-actions', MenuActions)