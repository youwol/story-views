import { render } from "@youwol/flux-view"
import { NpmPackageView, utf8_to_b64 } from ".."



(window as any).fetch = () => {
    return Promise.resolve({
        headers: {
            get: (name) => {
                if (name == 'content-length')
                    return 100
                throw Error("unknown header in mock")
            }
        }
    })
}
class RequestMock { }
(window as any).Request = RequestMock


test('NpmPackageView default', (done) => {

    document.body.innerHTML = ""
    let name = "library"
    let vDom = new NpmPackageView({
        name
    })
    document.body.appendChild(vDom.renderStoryView({}).view)
    // WHEN an instance of FluxAppView is inserted
    let view = document.querySelector(".npm-package-view") as any as NpmPackageView
    // EXPECT - 1 : the view is in the document
    expect(view).toBeTruthy()

    expect(view.npm).toEqual(`https://www.npmjs.com/package/${name}`)
    expect(view.github).toEqual(`https://github.com/${name}`)
    expect(view.doc).toEqual(`/api/assets-gateway/raw/package/${utf8_to_b64(name)}/latest/dist/docs/index.html`)
    expect(view.licence).toBeFalsy

    done()
})

test('NpmPackageView with options', (done) => {

    document.body.innerHTML = ""
    let vDom = new NpmPackageView({
        name: 'library',
        npm: "https://npm",
        github: "https://github",
        doc: "https://doc",
        licence: "MIT"
    })
    document.body.appendChild(vDom.renderStoryView({}).view)
    // WHEN an instance of FluxAppView is inserted
    let view = document.querySelector(".npm-package-view") as any as NpmPackageView
    // EXPECT - 1 : the view is in the document
    expect(view).toBeTruthy()
    expect(view.npm).toEqual(`https://npm`)
    expect(view.github).toEqual(`https://github`)
    expect(view.doc).toEqual(`https://doc`)
    expect(view.licence).toEqual(`MIT`)

    done()
})

