interface DataInterface {
  description: string,
  id: number,
  image: number,
  price: number,
  title: string
}

export class MenuItem extends HTMLElement {
  constructor() {
    super()
  }

  data: DataInterface | null = null;

  connectedCallback() {
    this.classList.add('col-12', 'col-md-6', 'col-lg-4', 'col-xl-3', 'p-2');
    const payload = this.querySelector('payload');

    if(payload) {
       this.data = JSON.parse(payload.textContent!)
    } else {
      throw new Error('payload element not provided, can\'t get item data')
    }

    this.render();
  }

  render() {
    const template = `
      <div class="rounded content-block">
        ${
          this.data?.image ? 
            `<img class="w-100" style="object-fit: cover;" src="/static/media/${this.data.image}" />`
          : '<img class="w-100" style="object-fit: cover;" src="/static/images/no-image.png" />'
        }
        <div>
          <div class="d-flex align-items-center gap-2 p-3">
            <h4 gf-content>${this.data?.title}</h4>
            <span class="ms-auto">${this.data?.price.toFixed(2)}</span>
          </div>
          ${this.data?.description && `
            <p class="px-3 pb-3">
              ${this.data.description}
            </p>
          `}
        </div>
        <div class="px-3 pb-3 d-flex justify-content-end gap-2">
          <form action="/item/delete/${this.data?.id}" method="post">
            <button is="btn-cp" type="submit" variant="primary">
              <i class="bi bi-trash"></i>
            </button>
          </form>
          <button is="btn-cp" link="/item/edit/${this.data?.id}" variant="primary">
            <i class="bi bi-pencil-square"></i>
          </button>
        </div>
      </div>
    `

    this.innerHTML = template;
  }
}

customElements.define('menu-item', MenuItem)