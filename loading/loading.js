function Loading() {
    const loaderBG = document.createElement('div')
    loaderBG.classList.add('loaderBG')
    
    const loaderCentralizer = document.createElement('div')
    loaderCentralizer.classList.add('loaderCentralizer')
    
    const div = document.createElement('div')
    div.classList.add("loader")

    
    loaderCentralizer.appendChild(div)
    loaderBG.appendChild(loaderCentralizer)
    const body = document.body
    body.appendChild(loaderBG)
}

function removeLoading() {
    const loaderCentralizer = document.querySelector('.loader-Centralizer')

    if (loaderCentralizer) {
        const body = document.body

        body.removeChild(loaderCentralizer)
    }
}