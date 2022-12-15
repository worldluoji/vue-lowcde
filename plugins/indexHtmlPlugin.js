

function indexHtmlPlugin(appMode) {
    return {
        name: 'indexHtmlPlugin',
        enforce: 'pre',
        transform (code, id) {
            if (id.endsWith('index.html')) {
                let transformCode;
                switch (appMode) {
                    case 'APP':
                        transformCode = code.replace(/__MAIN__/, '/src/packer.js');
                        break;
                    default:
                        transformCode =  code.replace(/__MAIN__/, '/src/main.js');
                }
                return { code: transformCode, map: null };
            }
        },
    }
}

export default indexHtmlPlugin;