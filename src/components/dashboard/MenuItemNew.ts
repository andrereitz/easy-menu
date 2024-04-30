import { Category } from "./types";

interface NewItemData {
  categories: Category[]
}

export class MenuItemNew extends HTMLElement {
  constructor() {
    super()
  }

  get data(): NewItemData | null {
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
  }

  render() {
    const template = `
      <div class="mb-3">
        <label for="item_image" class="form-label">Item Image</label>
        <input class="form-control" type="file" id="item_image" name="item_image">
      </div> 
      ${ this.data?.categories && this.data?.categories.length > 0 ? `
        <select class="form-select mb-3" name="category" aria-label="Default select example">
          <option selected>Category</option>
          ${this.data.categories.map(category => {
            return `<option value="${category.id }">${category.title}</option>`
          })}
        </select>
      ` : `
        <div class="alert alert-danger mb-3 d-flex gap-2" role="alert">
          <i class="bi bi-exclamation-octagon-fill ml-3"></i>
          <p class="m-0">
            You don't have any category. <a class="d-inline" href="/category/new">Create a category</a> to organize your menu!
          </p>
        </div>
      ` }
      <div class="form-floating mb-3">
        <input name="title" id="title" type="text" class="form-control" placeholder="">
        <label for="title">Title</label>
      </div>
      <div class="form-floating mb-3">
        <textarea name="description" id="description" class="form-control" style="height: 150px" placeholder=""></textarea>
        <label for="description">Description</label>
      </div>
      <div class="mb-3">
        <label class="mb-3" for="price">Price</label>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">$</span>
          <input name="price" id="price" type="number" step='0.01' value='0.00' class="form-control" placeholder="">
        </div>
      </div>
    `

    this.innerHTML = template;
  }
}

customElements.define('menu-item-new', MenuItemNew)