import Masonry from 'masonry-layout'

export class MenuItems extends HTMLElement {
  constructor() {
    super()
  }

  get containers(): NodeListOf<Element> | null {
    return document.querySelectorAll('[gf-masonry]')
  }

  connectedCallback() {
    this.init()
  }
  
  init() {
    if (!this.containers || this.containers.length == 0) return;
  
    Array.from(this.containers).map(container => {
      setTimeout(function(){
        new Masonry(container, {
          percentPosition: true
        })
      }, 300)
    })
  }
}

customElements.define('menu-items', MenuItems)