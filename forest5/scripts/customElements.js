
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




}


export default defineCustomElements