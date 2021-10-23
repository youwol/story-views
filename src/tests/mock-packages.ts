

export function installMockPackages() {

    window['@youwol/cdn-client'] = {
        fetchBundles: () => {
            return Promise.resolve({})
        },
        fetchStyleSheets: () => {
            return Promise.resolve({})
        },
        fetchJavascriptAddOn: () => {
            return Promise.resolve({})
        },
        install: () => {
            return Promise.resolve({})
        },
    }

}
