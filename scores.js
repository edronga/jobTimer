
'use strict'

function getScoresScreen(scoreBoard){
    let r = document.createElement('div')
    r.style.width = '100%'
    r.style.height = '100%'
    r.style.display = 'flex'
   
    const sortedScores = function(){
        let r = {}
        if (scoreBoard.length === 0){
            return {}
        }
        const data = function(){
            let r = {}
            scoreBoard.forEach((obj) =>{
                const category = Object.keys(obj)[0]
                const time = obj[category]
                if (r[category] === undefined){
                    r[category] = [time]
                }
                else {
                    r[category].push(time)
                }
            })
            return r;
        }()

        const sortedData = function(){
            let r = {}
            Object.keys(data).forEach((key) =>{
                r[key] = data[key].toSorted((a, b) => a - b)
            })
            return r;
        }()

console.log(sortedData)

        const textData = function(){
            let r = {}
            Object.keys(sortedData).forEach((key) =>{
                r[key] = data[key].map((value) => convertTimeToString(value))
            })
return r;
        }()

        r = textData
        console.log(r)

        return r;
    }()



    document.addEventListener('keydown', (e) =>{
        const body = document.getElementsByTagName('body')[0]
        const html = getTimerScreen()
        body.innerHTML = ''
        body.appendChild(html)
    })



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


    return r;
}

