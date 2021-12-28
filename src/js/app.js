'use strict'

const minutesEl = document.getElementById('minutes')
const secondsEl = document.getElementById('seconds')
const messageEl = document.querySelector('.card__message')
const startButton = document.getElementById('start-btn')

const pauseButton = document.getElementById('pause-btn')
const resumeButton = document.getElementById('resume-btn')
const resetButton = document.getElementById('reset-btn')

const pomodoroButton = document.getElementById('pomodoro-btn')
const shortBreakButton = document.getElementById('short-btn')
const longBreakButton = document.getElementById('long-btn')

const pageTitle = document.getElementById('title')
const audioPlayer = document.getElementById('audio-player')
const cardButtons = document.querySelectorAll('.card__button')
const navigationButtons = document.querySelectorAll('.card__navigation--button')

// Declare seconds and minutes variable to manipulate later
let minutes = 24
let seconds = 59
let minutesInterval
let secondsInterval
let mode = 'pomodoro'

navigationButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        button.classList.add('active')
        if(index === 1) {
            navigationButtons[0].classList.remove('active')
            navigationButtons[2].classList.remove('active')
        } else if(index === 2) {
            navigationButtons[0].classList.remove('active')
            navigationButtons[1].classList.remove('active')
        } else {
            navigationButtons[1].classList.remove('active')
            navigationButtons[2].classList.remove('active')
        }
    })
})

pomodoroButton.addEventListener('click', () => {
    switchMode('pomodoro', 24, 59, 25, 0, 'hsl(0, 50%, 60%)')
})

shortBreakButton.addEventListener('click', () => {
    switchMode('short', 4, 59, 5, 0, 'hsl(180, 50%, 38%)')
})

longBreakButton.addEventListener('click', () => {
    switchMode('long', 14, 59, 15, 0, 'hsl(204, 70%, 55%)')
})

const switchMode = (timeMode, timeMinutes, timeSeconds, defaultMinutes, defaultSeconds, modeColor) => {
    clearIntervals()
    startButton.classList.remove('d-none')
    pauseButton.classList.add('d-none')
    resetButton.classList.add('d-none')
    resumeButton.classList.add('d-none')
    
    messageEl.textContent = timeMode === 'pomodoro' ? 'Time to Focus!' : 'Time to Break!'

    mode = timeMode
    minutes = timeMinutes
    seconds = timeSeconds
    minutesEl.textContent = twoDigits(defaultMinutes)
    secondsEl.textContent = twoDigits(defaultSeconds)
    switchTheme(modeColor)
}

const switchTheme = (color) => {
    document.body.style.backgroundColor = color
    cardButtons.forEach(button => {
        button.style.color = color
    })
}

const startTimer = () => {
    // Print seconds and minutes to DOM
    minutesEl.textContent = twoDigits(minutes)
    secondsEl.textContent = twoDigits(seconds)

    minutesInterval = window.setInterval(minutesTimer, 60000)
    secondsInterval = window.setInterval(secondsTimer, 1000)

    function minutesTimer() {
        minutes--
        // Print updated minutes
        minutesEl.textContent = twoDigits(minutes)
    }

    function secondsTimer() {
        seconds--
        // Print updated seconds
        secondsEl.textContent = twoDigits(seconds)
        
        if(seconds <= 0) {
            if(minutes <= 0) {
                // Stop timer
                clearInterval(minutesInterval)
                clearInterval(secondsInterval)
                // Reset timer to default
                if(mode === 'pomodoro') {
                    resetTimer(25)
                } else if(mode === 'short') {
                    resetTimer(5)
                } else {
                    resetTimer(15)
                }
                audioPlayer.src = '/src/audio/bell.ogg'
                audioPlayer.play()
            }
            seconds = 60
        }
    }
}

const twoDigits = number => number.toLocaleString('en-US', { minimumIntegerDigits: 2 })

const resetTimer = (duration) => {
    minutesEl.textContent = twoDigits(duration)
    secondsEl.textContent = twoDigits(0)
    seconds = 59
}

cardButtons.forEach(button => {
    button.addEventListener('click', () => {
        audioPlayer.src = '/src/audio/click.ogg'
        audioPlayer.play()
    })
})

startButton.addEventListener('click', () => {
    startButton.classList.add('d-none')
    pauseButton.classList.remove('d-none')
    resetButton.classList.remove('d-none')
    setTimeout(startTimer, 1000)
})

pauseButton.addEventListener('click', () => {
    pauseButton.classList.add('d-none')
    resumeButton.classList.remove('d-none')
    clearIntervals()
})

resumeButton.addEventListener('click', () => {
    resumeButton.classList.add('d-none')
    pauseButton.classList.remove('d-none')
    startTimer()
})

resetButton.addEventListener('click', () => {
    resetButton.classList.add('d-none')
    pauseButton.classList.add('d-none')
    resumeButton.classList.add('d-none')
    startButton.classList.remove('d-none')
    
    if(mode === 'pomodoro') {
        resetTimer(25)
    } else if(mode === 'short') {
        resetTimer(5)
    } else {
        resetTimer(15)
    }
    
    clearIntervals()
})

const clearIntervals = () => {
    window.clearInterval(minutesInterval)
    window.clearInterval(secondsInterval)
}