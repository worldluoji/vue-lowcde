

function indexHtmlPlugin(appMode) {
    return {
        name: 'indexHtmlPlugin',
        enforce: 'pre',
        transform (code, id) {
            if (id.endsWith('index.html')) {
                let transformCode;
                switch (appMode) {
                    case 'APP':
                        transformCode = code.replace(/__MAIN__/, '/src/main-apppacker.js');
                        break;
                    default:
                        transformCode =  code.replace(/__MAIN__/, '/src/main-platform.js');
                }
                console.log(transformCode)
                return { code: transformCode, map: null };
            }
        },
    }
}

export default indexHtmlPlugin;