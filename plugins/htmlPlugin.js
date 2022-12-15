
function htmlPlugin() {
    return {
        name: 'htmlPlugin',
        apply: 'serve',
        transformIndexHtml(html) {
            return html.replace(
              /__MAIN__/,
              `/src/main.js`
            )
        }
    }
}

export default htmlPlugin;