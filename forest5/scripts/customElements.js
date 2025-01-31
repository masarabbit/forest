
import { elements, settings } from './elements.js'
import { Ui } from './classes.js'

import { dialogData } from './data.js'

const defineCustomElements = () => {

  customElements.define('dialog-window',
    class extends HTMLElement {
      constructor() {
        super()
        this.innerHTML = `
          <div class="dialog-window">
            <div class="inner-dialog-wrapper">
              <div class="inner-dialog">
                <npc-text></npc-text>
              </div>  
            </div>  
            <div class="dialog-nav">
              <next-btn></next-btn>
            </div>
          </div>
        `
        this.className = 'dialog-wrapper'
      }
      connectedCallback() {
        elements.dialogContainer = this.querySelector('.inner-dialog')
        elements.dialogWindow = this
      }
    })


  customElements.define('npc-text',
    class extends Ui {
      constructor() {
        super()
        this.innerHTML = `
          <character-icon></character-icon>
          <div class="text-wrapper">
            <div class="npc text">${this.displayTextGradual(dialogData[settings.dialogIndex] || 'test test')}</div>
          </div>
        `
        this.className = 'npc-text'
    }
  })

  customElements.define('option-texts',
    class extends Ui {
      constructor() {
        super()
        this.innerHTML = `
          ${['yes', 'no'].map((option, i) => `<button class="btn option-${i + 1}">${option}</button>`).join('')}
        `
        this.className = 'option-texts'
    }
    connectedCallback () {
      this.querySelector('.option-1').addEventListener('click', e => {
        settings.dialogOption = 'option-1'
        console.log('yes')
        this.showNextNpcText()
        e.target.classList.add('selected')
      })

      this.querySelector('.option-2').addEventListener('click', e => {
        settings.dialogOption = 'option-2'
        console.log('no')
        this.showNextNpcText()
        e.target.classList.add('selected')
      })
    }
  })

  customElements.define('character-icon',
    class extends HTMLElement {
      constructor() {
        super()
        this.innerHTML = `
        :)
        `
        this.className = 'character-icon'
    }
  })

  customElements.define('next-btn',
    class extends Ui {
      constructor() {
        super()
        this.innerHTML = 'next'
        this.className = 'next btn'
    }
    connectedCallback () {
      this.addEventListener('click', this.showNextNpcText)
    }
  })


  customElements.define('slide-carousel',
    class extends HTMLElement {
      constructor() {
        super()
        this.className = 'slide-carousel'
        this.innerHTML = `
          <div class="slides">
            ${['img1.jpg', 'img2.jpg', 'img3.jpg'].map((img, i) => {
              return ` <img class="slide${i ? '' : ' show'}" src='./assets/${img}' />`
            }).join('')}
            <div class="slide-nav">
              <button class="prev arrow" data-dir="-1" >&#10229;</button>
              <button class="next arrow" data-dir="1">&#10230;</button>
            </div>
            <div class="pagination">
            </div>
          </div>
        `
    }
    updatePagination() {
      this.slideDots.forEach(dot => dot.classList.remove('active'))
      this.slideDots[this.activeSlide].classList.add('active')
    }
    adjustActiveNo() {
      if (this.activeSlide === this.slides.length) {
        this.activeSlide = 0
      }
      if (this.activeSlide < 0) {
        this.activeSlide = this.slides.length - 1
      }
    }
    handleArrow(e) {
      clearInterval(this.slideInterval)
      const dir = +e.target.dataset.dir
      this.slides[this.activeSlide].classList.remove('show')
      this.activeSlide += dir
      this.adjustActiveNo()
      this.slides[this.activeSlide].classList.add('show')
      this.updatePagination()
    }
    connectedCallback () {
      this.slides = this.querySelectorAll('.slide')
      this.pagination = this.querySelector('.pagination').innerHTML = new Array(this.slides.length).fill('').map((_, i) => `<div class="dot${i ? '' : ' active'}"></div>`).join('')
      this.slideDots = this.querySelectorAll('.dot')
      this.activeSlide = 0
      this.slideInterval = setInterval(()=> {
        this.slides[this.activeSlide].classList.remove('show')
        this.activeSlide++
        this.adjustActiveNo()
        this.slides[this.activeSlide].classList.add('show')
        this.updatePagination()
      }, 4000)

      this.querySelectorAll('.arrow').forEach(btn => {
        btn.addEventListener('click', e => this.handleArrow(e, this))
      })
    }
  })
}


export default defineCustomElements