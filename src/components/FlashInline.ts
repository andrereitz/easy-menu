export class FlashInline extends HTMLElement {
  constructor() {
    super()
  }

  set data(value: string[][]) {
    if(value.length > 0) {
     this.setAttribute('data-payload', JSON.stringify(value))
    }
  }

  get data(): (string[][] | null) {
    const data = this.getAttribute('data-payload');
    if(!data) return null;

    return JSON.parse(data);
  }

  connectedCallback() {
    this.render()
  } 

  render() {
    if(!this.data) return false;

    const messages = this.data.reduce((prev: string, curr: string[], index: number ) => {
      const category = curr[0];
      const text = curr[1];

      const template = `
        <div class="alert alert-${category} mt-2 mb-3 d-flex gap-2" role="alert">
          ${category === 'success' 
            ? '<i class="bi bi-check-circle-fill"></i>'
            : (category === 'info' 
              ? '<i class="bi bi-info-circle-fill"></i>'
              : '<i class="bi bi-exclamation-octagon-fill ml-3"></i>'
          )}
          ${text && text}
        </div>
      `

      return prev + template
    }, '')

    this.innerHTML = messages;
  }
}

customElements.define('flash-inline', FlashInline)