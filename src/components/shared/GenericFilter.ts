import Masonry from 'masonry-layout'

/**
  Generic Elements Filter

  Layout element attributes:
  - gf-input: the input field for the query, no value
  - gf-match: the text that should be checked, the value 
    must be the original text to be matched
  - gf-content: Where the results must replace content, no value
**/
export class GenericFilter extends HTMLElement {
  constructor() {
    super()

    this.init()
  }

  init() {
    if(!this.queryInput || this.matchElements?.length == 0) {
      throw new Error('Layout is missing gf-* attributes')
    }
    
    this.queryInput.addEventListener('input', this.handleChange.bind(this))
  }
  
  get queryInput(): HTMLInputElement | null {
    return document.querySelector('[gf-input]');
  }

  get matchElements(): ArrayLike<Element> | null {
    return document.querySelectorAll('[gf-match]');
  }

  get matchArray() {
    if(!this.matchElements) return null;

    return Array.from(this.matchElements);
  }

  handleChange(e): void {
    if(!this.queryInput || !this.matchArray) return;

    const regex = new RegExp(`(${this.queryInput.value})`, 'i');

    this.matchArray.map((item) => {
      item.classList.remove('d-none');
      const content = item.querySelector("[gf-content]")
      const originalText = item.getAttribute('gf-match')

      const match = regex.exec(originalText.toLowerCase())

      if(!match || !content) {
        item.classList.add('d-none')
      } else {
        content.innerHTML = originalText.replace(regex, '<strong>$&</strong>')
      }
    })

    this.reinitMasonry()
  }

  reinitMasonry() {
    const containers = document.querySelectorAll('[gf-masonry]')
    if (containers.length == 0) return;

    Array.from(containers).map(container => {
      new Masonry(container, {
        percentPosition: true 
      })
    })
  }
}

customElements.define('generic-filter', GenericFilter)