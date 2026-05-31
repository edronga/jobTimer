'use strict'

function getTimerScreen(){
    let r = document.createElement('div')
    r.style.width = '100dvw'
    r.style.height = '100dvh'
    r.style.display = 'grid'
    r.style.gridTemplate = `
    'timer rightPanel' 75dvh
    'buttons rightPanel' 25dvh / 75dvw 25dvw
    `

    const timer = function(){
        let r = document.createElement('div')
        r.style.width = '100%'
        r.style.height = '100%'
        r.style.gridArea = 'timer'
        r.style.display = 'flex'
        r.style.justifyContent = 'center'
        r.style.alignItems = 'center'
        r.id = 'timer'
        r.style.fontSize = '20dvh'

        r.innerText = '00 : 00 : 00'

        return r;

    }()
    r.appendChild(timer)

    const buttons = function(){
        let r = document.createElement('div')
        r.style.width = '100%'
        r.style.height = '100%'
        r.style.gridArea = 'buttons'
        r.style.display = 'flex'

        const startAndStopButton = function(){
            let r = document.createElement('div')
            r.style.width = '50%'
            r.style.height = '100%'
            r.id = 'startAndStopButton'
            r.style.display = 'flex'
            r.style.justifyContent = 'center'
            r.style.alignItems = 'center'

            r.innerText = 'START'

            r.addEventListener('pointerdown', () =>{
                if (isTimerPaused){
                    restartTimer();
                }
                else {
                    pauseTimer();
                }
            })

            return r;
        }()
        r.appendChild(startAndStopButton)

        const saveButton = function(){
            let r = document.createElement('div')
            r.style.width = '50%'
            r.style.height = '100%'
            r.id = 'startAndStopButton'
            r.style.display = 'flex'
            r.style.justifyContent = 'center'
            r.style.alignItems = 'center'

            r.innerText = 'SAVE'

            return r;
        }()
        r.appendChild(saveButton)

        return r;

    }()
    r.appendChild(buttons)


    let referenceTime = Date.now()
    let isTimerPaused = true
    function convertTimeToString(timeInMs){
        if (timeInMs > 99 * 60 * 60){
            return '99 : 60 : 60'
        }
        const hours = Math.floor(timeInMs / (60 * 60 * 1000))
        const minutes = Math.floor((timeInMs - (hours * 60 * 1000)) / (60 * 1000))
        const seconds = Math.floor((timeInMs - (hours * 60 * 1000) - (minutes * 60 * 1000)) / 1000)
        const r = `${hours >= 10 ? hours : '0' + hours} : ${minutes >= 10 ? minutes : '0' + minutes} : ${seconds >= 10 ? seconds : '0' + seconds}`
        return r;
    }

    function updateTimer(){
        if (!isTimerPaused){
            const elapsedTime = Date.now() - referenceTime
            const v = convertTimeToString(elapsedTime)
            r.querySelector('#timer').innerText = v
        }
        requestAnimationFrame(updateTimer);
    }

    function pauseTimer(){
        isTimerPaused = true
        r.querySelector('#startAndStopButton').innerText = 'START'
    }

    function restartTimer(){
        referenceTime = Date.now()
        isTimerPaused = false
        r.querySelector('#startAndStopButton').innerText = 'STOP'
    }

    updateTimer();

    return r;
}