const minutesEl = document.getElementById('minutes')
const secondsEl = document.getElementById('seconds')
const startButton = document.getElementById('start-btn')
const pageTitle = document.getElementById('title')

// Declare seconds and minutes variable to manipulate later
let seconds
let minutes

const startTimer = (duration) => {
    // Set starting minutes and seconds when function running
    minutes = duration
    seconds = 59

    // Print seconds and minutes to DOM
    minutesEl.textContent = twoDigits(minutes)
    secondsEl.textContent = twoDigits(seconds)

    let minutesInterval = setInterval(minutesTimer, 60000)
    let secondsInterval = setInterval(secondsTimer, 1000)

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
                resetTimer(25)
                alert('Finish, take your break.')
            }
            seconds = 60
        }
    }
}

const twoDigits = number => number.toLocaleString('en-US', { minimumIntegerDigits: 2 })

const resetTimer = (minutes) => {
    minutesEl.textContent = minutes
    secondsEl.textContent = '00'
}

startButton.addEventListener('click', () => {
    setTimeout(() => {
        startTimer(24)
    }, 1000)
})