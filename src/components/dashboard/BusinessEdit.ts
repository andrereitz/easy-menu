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

  getRemoveButton = () => this.querySelector('#business-edit-remove-image')

  connectedCallback() {
    this.render();
    console.log(this.getRemoveButton())

    this.registerListeners();
  }

  render() {
    const template = `
      ${this.data?.business_logo ? `
        <div class="mb-3 d-flex justify-content-center w-100 rounded p-3 position-relative" style="background: var(--bg-fade)">
          <div class="position-absolute top-0 start-100 translate-middle">
            <div id="business-edit-remove-image" class="btn btn-danger rounded-pill">
              <i class="bi bi-trash"></i>
            </div>
          </div>
          <img src="/static/media/${this.data.business_logo}" style="max-width: 100%; object-fit: contain" />
        </div>      
      ` : `
          <div class="mb-3">
            <label for="business_logo" class="form-label">Upload Business Logo</label>
            <input class="form-control" type="file" id="business_logo" name="business_logo">
          </div>
          <div id="passwordHelpBlock" class="form-text">
            For better results use a 200x80 image (or viewport).
          </div>
      `}
      <div class="mb-3">
        <label for="business_color" class="form-label">Accent Color</label>
        <input 
          type="color" 
          class="form-control form-control-color" 
          id="business_color" 
          name="business_color" 
          value="${ this.data?.business_color ? this.data.business_color : '#404040' }" 
          title="Choose your color"
        >
      </div>
      <div class="form-floating mb-3">
        <input name="email" id="email" type="email" class="form-control" value="${this.data?.email}" placeholder="">
        <label for="email">Email address</label>
      </div>
      <div class="form-floating mb-3">
        <input name="business_name" id="business_name" type="text" class="form-control" value="${this.data?.business_name}"  placeholder="">
        <label for="business_name">Business name</label>
      </div>
      <div class="form-floating mb-3">
        <input name="business_url" id="business_url" type="text" class="form-control" value="${this.data?.business_url}"  placeholder="">
        <label for="business_url">Business URL</label>
        <div id="businessUrlHelpBlock" class="form-text">
          Business URL is where you menu will be acessible in the browser. Ex: /business-url
        </div>
      </div>
    `

    this.innerHTML = template;
  }

  registerListeners() {
    const removeButton = this.getRemoveButton();
    if(!removeButton || !this.data?.business_logo) return false

    removeButton.addEventListener('click', (e) => {
      e.preventDefault();

      fetch('/business/remove-image', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          url: this.data?.business_logo,
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

customElements.define('business-edit', BusinessEdit);