export class FlashFloating extends HTMLElement {
  constructor() {
    super()
  }

  static get observedAttributes() {
    return ['data-payload'];
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

  attributeChangedCallback(name, oldValue, newValue) {   
    clearTimeout(window.flashTimeout)
    this.render()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    if(!this.data || this.data.length === 0) return false;
    
    const messages = this.data.reduce((prev: string, curr: string[], index: number ) => {
      const category = curr[0];
      const text = curr[1];

      const template = `
        <div 
          role="alert" 
          class="alert alert-${category} mb-3 d-flex gap-2 position-fixed start-50 translate-middle-x floating-message" 
          style="max-width: 600px; transition: all .4s ease-out; bottom: ${index * 60}px !important"
        >
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

    window.flashTimeout = setTimeout(() => {
      const messages: HTMLElement | null = this.querySelector('.floating-message');

      if(messages) {
        messages.style.cssText = messages.style.cssText + ' transform: translate(-50%, 100px) !important;';
      }
    }, 3000)
  }
}

customElements.define('flash-floating', FlashFloating)