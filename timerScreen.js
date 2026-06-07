'use strict'

function getTimerScreen(){
    let r = document.createElement('div')
    r.style.width = '100dvw'
    r.style.height = '100dvh'
    r.style.margin = 0
    r.style.display = 'grid'
    r.style.gridTemplate = `
    'timer rightPanel' 75dvh
    'buttons rightPanel' 25dvh / 75dvw 25dvw
    `

    const timer = function(){
        let r = document.createElement('div')
        r.style.width = '95%'
        r.style.height = '95%'
        r.style.gridArea = 'timer'
        r.style.alignSelf = 'center'
        r.style.justifySelf = 'center'
        r.style.display = 'flex'
        r.style.justifyContent = 'center'
        r.style.alignItems = 'center'
        r.id = 'timer'

        r.style.fontSize = '20dvh'
        r.style.border = 'solid black 2px'
        r.style.borderRadius = '20px'

        r.style.backgroundColor = 'lightGrey'

        r.innerText = '00 : 00 : 00'

        return r;

    }()
    r.appendChild(timer)

    const buttons = function(){
        let r = document.createElement('div')
        r.style.width = '100%'
        r.style.height = '100%'
        r.style.gridArea = 'buttons'
        r.style.alignSelf = 'center'
        r.style.justifySelf = 'center'
        r.style.display = 'grid'
        r.style.gridTemplate = `
        'startAndStopButton saveButton' 100% / 50% 50%
        `

        const startAndStopButton = function(){
            let r = document.createElement('div')
            r.style.width = '45%'
            r.style.height = '95%'
            r.id = 'startAndStopButton'
            r.style.gridArea = 'startAndStopButton'
            r.style.alignSelf = 'center'
            r.style.justifySelf = 'center'
            r.style.display = 'flex'
            r.style.justifyContent = 'center'
            r.style.alignItems = 'center'

            r.style.border = 'solid black 2px'
            r.style.borderRadius = '20px'

            r.style.backgroundColor = 'lightGreen'

            r.innerText = 'START'

            r.addEventListener('pointerdown', () =>{
                if (isTimerPaused){
                    restartTimer();
                }
                else {
                    pauseTimer();
                }
            })
            document.addEventListener('keydown', (e) => {
                if (e.key === ' '){
                    if (isTimerPaused){
                        restartTimer();
                    }
                    else {
                        pauseTimer();
                    }
                }
            })

            return r;
        }()
        r.appendChild(startAndStopButton)

        const saveButton = function(){
            let r = document.createElement('div')
            r.style.width = '45%'
            r.style.height = '95%'
            r.id = 'saveButton'
            r.style.gridArea = 'saveButton'
            r.style.alignSelf = 'center'
            r.style.justifySelf = 'center'
            r.style.display = 'flex'
            r.style.justifyContent = 'center'
            r.style.alignItems = 'center'

            r.style.border = 'solid black 2px'
            r.style.borderRadius = '20px'

            r.style.backgroundColor = 'lightGrey'

            r.innerText = 'SAVE'

            r.addEventListener('pointerdown', (e) =>{
                if (!isTimerPaused){
                    return;
                }
                if (hasAlreadySaved){
                    return;
                }
                const category = document.querySelector('#categoryInput').value
                const time = currentTime
                let o = {}
                o[category] = currentTime
                scoreBoard.push(o)

                document.querySelector('#scoreBoardVisualizer').innerText = function(){
                    let r = ''
                    scoreBoard.forEach((value) =>{
                        const key = Object.keys(value)[0]
                        const time = convertTimeToString(value[key])
                        r = r + key + '\n'
                        r = r + time + `\n\n`
                    })

                    return r;
                }()

                hasAlreadySaved = true;

                document.querySelector('#saveButton').style.backgroundColor = 'lightGrey'
                document.querySelector('#startAndStopButton').style.backgroundColor = 'lightGreen'
            })

            return r;
        }()
        r.appendChild(saveButton)

        return r;

    }()
    r.appendChild(buttons)

    const rightPanel = function(){
        let r = document.createElement('div')
        r.style.width = '95%'
        r.style.height = '95%'
        r.style.gridArea = 'rightPanel'
        r.style.display = 'grid'
        r.style.gridTemplate = `
        'input' 20%
        'text'60%
        'scores' 20%
        `

        r.style.border = 'solid black 2px'
       
        const categoryInput = function(){
            let r = document.createElement('input')
            r.id = 'categoryInput'
            r.type = 'text'
            r.style.width = '95%'
            r.style.gridArea = 'input'
            r.style.alignSelf = 'center'
            r.style.justifySelf = 'center'

            r.value = 'outpatientFollowUp'

            return r;
        }()
        r.appendChild(categoryInput)

        const text = function(){
            let r = document.createElement('div')
            r.style.width = '95%'
            r.style.height = '95%'
            r.style.gridArea = 'text'
            r.id = 'scoreBoardVisualizer'
            r.style.alignSelf = 'center'
            r.style.justifySelf = 'center'
            r.style.display = 'flex'
            r.style.alignItems = 'start'
            r.style.justifyContent = 'center'

            r.style.overflowY = 'auto'
            r.style.border = 'solid black 2px'

            r.innerText = ''

            return r;
        }()
        r.appendChild(text)

        const goToScoresButton = function(){
            let r = document.createElement('div')
            r.style.width = '95%'
            r.style.height = '95%'
            r.style.gridArea = 'scores'
            r.style.alignSelf = 'center'
            r.style.justifySelf = 'center'
            r.style.display = 'flex'
            r.style.alignItems = 'center'
            r.style.justifyContent = 'center'

            r.style.border = 'solid black 2px'

            r.innerText = 'SCORES'

            r.addEventListener('pointerdown', () =>{
                const body = document.getElementsByTagName('body')[0]
                const html = getScoresScreen(scoreBoard)
                body.innerHTML = ''
                body.appendChild(html)
            })

            return r;
        }()
        r.appendChild(goToScoresButton)


        return r;
    }()
    r.appendChild(rightPanel)


    let referenceTime = Date.now()
    let isTimerPaused = true
    let currentTime = 0
    let hasAlreadySaved = false
    function convertTimeToString(timeInMs){
        if (timeInMs > 99 * 60 * 60 * 1000){
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
            currentTime = elapsedTime
        }
        requestAnimationFrame(updateTimer);
    }

    function pauseTimer(){
        isTimerPaused = true
        r.querySelector('#startAndStopButton').innerText = 'START'
        r.querySelector('#timer').style.backgroundColor = 'lightGrey'
        r.querySelector('#saveButton').style.backgroundColor = 'lightGreen'
        r.querySelector('#startAndStopButton').style.backgroundColor = 'lightBlue'
    }

    function restartTimer(){
        referenceTime = Date.now()
        isTimerPaused = false
        r.querySelector('#startAndStopButton').innerText = 'STOP'
        hasAlreadySaved = false
        r.querySelector('#timer').style.backgroundColor = 'lightGreen'
        r.querySelector('#saveButton').style.backgroundColor = 'lightGrey'
        r.querySelector('#startAndStopButton').style.backgroundColor = 'lightGreen'
    }

    updateTimer();

    return r;
}

