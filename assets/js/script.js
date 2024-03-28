'use strict'

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle('active')
}

// sidebar variables
const sidebar = document.querySelector('[data-sidebar]')
const sidebarBtn = document.querySelector('[data-sidebar-btn]')

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener('click', function () {
  elementToggleFunc(sidebar)
})

// testimonials variables
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]')
const modalContainer = document.querySelector('[data-modal-container]')
const formModalContainer = document.querySelector('[data-form-modal-container]')
const modalCloseBtn = document.querySelector('[data-modal-close-btn]')
const overlay = document.querySelector('[data-overlay]')
const formOverlay = document.querySelector('[data-form-overlay]')

// modal variable
const modalImg = document.querySelector('[data-modal-img]')
const modalTitle = document.querySelector('[data-modal-title]')
const modalText = document.querySelector('[data-modal-text]')

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle('active')
  overlay.classList.toggle('active')
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener('click', function () {
    modalImg.src = this.querySelector('[data-testimonials-avatar]').src
    modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt
    modalTitle.innerHTML = this.querySelector(
      '[data-testimonials-title]'
    ).innerHTML
    modalText.innerHTML = this.querySelector(
      '[data-testimonials-text]'
    ).innerHTML

    testimonialsModalFunc()
  })
}

// add click event to modal close button
modalCloseBtn.addEventListener('click', testimonialsModalFunc)
overlay.addEventListener('click', testimonialsModalFunc)

// custom select variables
const select = document.querySelector('[data-select]')
const selectItems = document.querySelectorAll('[data-select-item]')
const selectValue = document.querySelector('[data-select-value]')
const filterBtn = document.querySelectorAll('[data-filter-btn]')

select.addEventListener('click', function () {
  elementToggleFunc(this)
})

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener('click', function () {
    let selectedValue = this.innerText.toLowerCase()
    selectValue.innerText = this.innerText
    elementToggleFunc(select)
    filterFunc(selectedValue)
  })
}

// filter variables
const filterItems = document.querySelectorAll('[data-filter-item]')

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === 'all') {
      filterItems[i].classList.add('active')
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add('active')
    } else {
      filterItems[i].classList.remove('active')
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0]

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener('click', function () {
    let selectedValue = this.innerText.toLowerCase()
    selectValue.innerText = this.innerText
    filterFunc(selectedValue)

    lastClickedBtn.classList.remove('active')
    this.classList.add('active')
    lastClickedBtn = this
  })
}

// contact form variables
const form = document.querySelector('[data-form]')
const formInputs = document.querySelectorAll('[data-form-input]')
const formBtn = document.querySelector('[data-form-btn]')

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener('input', function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute('disabled')
    } else {
      formBtn.setAttribute('disabled', '')
    }
  })
}
form.addEventListener('submit', (e) => {
  e.preventDefault()

  const name = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Craft the pre-filled WhatsApp message
  const encodedMessage = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const whatsappLink = `https://wa.me/233598665863?text=${encodedMessage}`;

  // Ask for user confirmation before redirecting (optional but recommended)
  if (confirm(`This will open WhatsApp with the following pre-filled message:

  Name: ${name}
  Email: ${email}

  Message:
  ${message}

  Are you sure you want to continue?`)) {
    // Redirect to WhatsApp link
    window.location.href = whatsappLink;
    form.reset()
  } else {
    // User declined, do nothing
  }
})

const openConfirmationModal = () => {
  formModalContainer.classList.toggle('active')
  formOverlay.classList.toggle('active')
}
const submitForm = (form) => {
  function loadDoc() {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById('demo').innerHTML = this.responseText
      }
    }
    xhttp.open('POST', 'http://localhost:9090', true)
    // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send()
  }
  loadDoc()
}

// page navigation variables
const navigationLinks = document.querySelectorAll('[data-nav-link]')
const pages = document.querySelectorAll('[data-page]')

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener('click', function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add('active')
        navigationLinks[i].classList.add('active')
        window.scrollTo(0, 0)
      } else {
        pages[i].classList.remove('active')
        navigationLinks[i].classList.remove('active')
      }
    }
  })
}
