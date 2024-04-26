export class NavBar extends HTMLElement {
  constructor() {
    super()
  }

  get user() {
    return this.getAttribute('data-user')
  }

  get page() {
    return this.getAttribute('data-page')
  }

  connectedCallback() {
    this.render()
  }

  render() {
    const template = `
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container p-lg-0">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse mt-3 mt-lg-0" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              ${ this.user && (`
                <li class="nav-item">
                  <a class="nav-link {% if url_for(request.endpoint) == '/dashboard/'  %} active {% endif %}" aria-current="page" href="/dashboard">Your Business</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Manage
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/business/edit">Business Information</a></li>
                    <li><a class="dropdown-item" href="/category">Categories</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/item/new">Add New Item</a></li>
                  </ul>
                </li>
              `) }
            </ul>
            <ul class="navbar-nav mr-auto mb-2 mb-lg-0 d-flex justify-content-lg-end">
              ${ 
                this.user ? 
                  `
                  <li class="nav-item">
                    <a class="nav-link" href="/auth/logout">Logout</a>
                  </li>
                  `
                :
                  `
                  <li class="nav-item">
                    <a class="nav-link" href="/auth/login">Login</a>
                  </li>
                  `
              }
            </ul>
          </div>
        </div>
      </nav>
    `
    
    this.innerHTML = template;
  }
}

customElements.define('nav-bar', NavBar)