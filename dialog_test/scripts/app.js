function init() {

  const textDisplay = document.querySelector('.text-display')
  const playButton = document.querySelector('button')
  const options = document.querySelector('.options')

  const events = {
    test: {
      first: {
        texts: ['hello', 'hello2', 'hello3'],
        options: {
          'okay': 's_1',
          'not so good': 's_2',
          // 'banana': 'banana'
        }
      },
      's_1': {
        texts: ['I see', 'goodbye']
      },
      's_2': {
        texts: ['what did you say?'],
        options: {
          'urm': 'first'
        }
      }
    }
  }

  const settings = {
    count: 0,
    dialog: 'test',
    dialogKey: 'first',
    options: []
  }


  const displayTextGradual = text =>{
    textDisplay.innerHTML = text.split('').map((letter, i) => {
      return `<span style="animation-delay: ${i * 0.03}s">${letter}</span>`
    }).join('')
  }

  const displayOptions = event => {
    settings.options = event.options
    options.innerHTML = ''
    const settingsOptions =  Object.keys(settings.options)
    settingsOptions.forEach((option, i) => {
      options.appendChild(Object.assign(document.createElement('div'), 
      { className: `option${settingsOptions.length > 1 && i === 0 ? ' selected' : ''}`,
        innerHTML: option,
        onclick: () => {
          settings.dialogKey = settings.options[option]
          talk()
        }
      }))
    })
  }

  const displayEndButton = () => {
    options.innerHTML = ''
    options.appendChild(Object.assign(document.createElement('div'), 
    { className: 'end',
      innerHTML: 'end',
      onclick: () => {
        settings.dialogKey = 'first'
        textDisplay.innerHTML = ''
        options.innerHTML = ''
      }
    }))
  }

  const displayNextButton = () => {
    options.innerHTML = ''
    options.appendChild(Object.assign(document.createElement('div'), 
    { className: 'next',
      innerHTML: 'next',
      onclick: talk
    }))
  }

  const talk = () => {
    const { count, dialog, dialogKey } = settings
    const event = events[dialog][dialogKey]
    const { texts } =  event
    displayTextGradual(texts[count])
    if (count === texts.length - 1) {
      event?.options
        ? displayOptions(event)
        : displayEndButton()
      settings.count = 0
    } else {
      settings.count++
      displayNextButton()
    }
  }

  playButton.addEventListener('click', talk)

}

window.addEventListener('DOMContentLoaded', init)
