import { Category, MenuItem } from "./types";

interface EditItemData {
  categories: Category[],
  item_data: MenuItem,
  item_image: string
}

export class MenuItemEdit extends HTMLElement {
  constructor() {
    super()
  }

  get data(): EditItemData | null {
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
    this.render()
    this.registerListeners()
  }

  getRemoveButton = () => this.querySelector('#menu-item-edit-remove-button')

  render() {
    const template = `
      ${this.data?.item_image ? `
        <div class="mb-3 d-flex justify-content-center w-100 rounded p-3 position-relative" style="background: var(--bg-fade)">
          <div class="position-absolute top-0 start-100 translate-middle">
            <div id="menu-item-edit-remove-button" class="btn btn-danger rounded-pill">
              <i class="bi bi-trash"></i>
            </div>
          </div>
          <img src="/static/media/${this.data.item_image}" style="max-width: 100%; object-fit: contain" />
        </div>
      ` : `
        <div class="mb-3">
          <label for="item_image" class="form-label">Upload image</label>
          <input class="form-control" type="file" id="item_image" name="item_image">
        </div>
      `}
      ${this.data?.categories && this.data.categories.length > 0 ? `
        <select class="form-select mb-3" name="category" aria-label="Default select example">
          <option>Uncategorized</option>
          ${this.data.categories.map((category) => {
            return `<option value="${category.id}" ${this.data?.item_data.category === category.id ? 'selected' : ''}>${category.title}</option>`
          })}
        </select>
      ` : `
        <div class="alert alert-danger mb-3 d-flex gap-2" role="alert">
          <i class="bi bi-exclamation-octagon-fill ml-3"></i>
          <p class="m-0">
            You don't have any category. <a class="d-inline" href="/category/new">Create a category</a> before adding new items to your menu!
          </p>
        </div>
      `}
      <div class="form-floating mb-3">
        <input name="title" id="title" type="text" class="form-control" placeholder="" value="${this.data?.item_data.title}">
        <label for="title">Title</label>
      </div>
      <div class="form-floating mb-3">
        <textarea name="description" id="description" class="form-control" style="height: 150px" placeholder="">${this.data?.item_data.description.trim()}</textarea>
        <label for="description">Description</label>
      </div>
      <div class="mb-3">
        <label class="mb-3" for="price">Price</label>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">$</span>
          <input name="price" id="price" type="text" class="form-control" placeholder="" value=${this.data?.item_data.price.toFixed(2)}>
        </div>
      </div>
    `

    this.innerHTML = template;
  }

  registerListeners() {
    const removeButton = this.getRemoveButton();
    if(!removeButton) return false
    if(!this.data?.item_data.media_id) return false
    if(!this.data?.item_data.id) return false

    removeButton.addEventListener('click', (e) => {
      e.preventDefault();

      fetch('/item/remove-image', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          id: this.data?.item_data.media_id,
          itemId: this.data?.item_data.id
        })
      }).then(res => res.json())
      .then(res => {
        console.log(res)
        if(res.code === 200) {
          location.reload()
        }
      })
    })
  }
}

customElements.define('menu-item-edit', MenuItemEdit)