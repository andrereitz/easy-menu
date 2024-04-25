export class FlashFloating extends HTMLElement {
  constructor() {
    super()
  }

  static get observedAttributes() {
    return ['data-payload'];
  }

  set payload(value: string[][]) {
    if(value.length > 0) {
     this.setAttribute('data-payload', JSON.stringify(value))
    }
  }

  get payload(): (string[][] | null) {
    const data = this.getAttribute('data-payload');
    if(!data) return null;

    return JSON.parse(data);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
    
    clearTimeout(window.flashTimeout)
    this.render()
  }

  connectedCallback() {
    if(this.payload) {
      this.render()
    }
  }

  render() {
    if(!this.payload) return false;
    const messages = this.payload.reduce((prev: string, curr: string[], index: number ) => {
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