import { BusinessData } from './types'

export class BusinessDetails extends HTMLElement {
  constructor() {
    super()
  }

  set data(value: string | null) {
    if(value && value.length > 0) {
      this.setAttribute('data-payload', value)
     }
  }

  get data(): BusinessData | null {
    const data = this.getAttribute('data-payload');
    if(!data) return null;

    return JSON.parse(data);
  }

  connectedCallback() {
    this.data = this.querySelector('payload')?.textContent || null
    
    this.render();
  }
  
  render() {
    const template = `
      <h3 class="d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap mb-3">
        <span class="flex-sm-grow-1">
          Your business details
        </span>
        <div class="my-3 my-md-0">
          <button is="btn-cp" link="/business/edit" variant="outline-primary">Edit Information</button>
        <div>
      </h3>
      <div class="container px-0">
        <div class="row">
          <div class="col col-12 col-md-6 fs-5 d-flex flex-column">
            ${ this.data?.business_logo && `
                <div class="mt-2 d-flex align-items-center gap-2">
                  <img 
                    width="100%" height="auto"
                    class="py-2 rounded"
                    style="object-fit: contain; max-width: 200px; max-height: 76px;" 
                    src="/static/media/${this.data?.business_logo}" 
                  />
                </div>
            `}
            ${ this.data?.email && `
              <span class="mt-2">
                Your email: ${this.data.email}
              </span>
            ` }
            ${ this.data?.business_name && `
              <span class="mt-2">
                Your email: ${this.data.business_name}
              </span>
            ` }
            ${ this.data?.business_url && `
              <span class="mt-2">
                Your email: ${this.data.business_url}
              </span>
            ` }
            ${ this.data?.business_color && `
              <div class="mt-2 d-flex align-items-center gap-2">
                <span>Business Color: </span>
                <span class="w-100 d-block rounded" style="background-color: ${ this.data?.business_color }; height: 20px; max-width: 40px"></span>
              </div>
            ` }
          </div>
          ${this.data?.business_url ? `
            <a 
              href="/menu/{{data.user.business_url}}"
              class="col col-12 col-md-6 d-flex flex-column align-items-md-end mt-2"
            >
              <img 
                width="100%" height="auto"
                class="py-2 rounded"
                style="object-fit: contain; max-width: 250px;" 
                src="/static/qrcodes/${ this.data.id }.png" 
              />
            </a>
          ` : `
            <div class="col col-12 col-md-6 pt-2 px-2 pt-md-0">
              <div class="alert alert-danger my-2 d-flex gap-2" role="alert">
                <i class="bi bi-exclamation-octagon-fill ml-3"></i>
                <p class="m-0">
                  Atention, you don't have a URL for your menu. <a class="d-inline" href="/business/edit">Click here</a> to add your custom URL so you can create a qr code and share your menu!
                </p>
              </div>
            </div>
          `}
        </div>
      </div>
    `

    this.innerHTML = template;
  }
}

customElements.define('business-details', BusinessDetails)