
async function get(url) {
    const res = await fetch(url, {
        method: 'GET'
    }).then(response => response.json())
    
    return res
}

export default {
    install: (app, options) => {
        app.provide('$request', {
            get: get
        })
    }
}