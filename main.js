'use strict'


function main(){
    const body = document.getElementsByTagName('body')[0]
    const html = getTimerScreen()
    body.innerHTML = ''
    body.appendChild(html)
}

let scoreBoard = []
main();