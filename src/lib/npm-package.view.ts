import { attr$, VirtualDOM } from "@youwol/flux-view"
import { from } from "rxjs";
import { StoryView } from "./story.view";

export function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}
/**
 * Links to github, npm, developer documentation, licence, etc
 */
export class NpmPackageView extends StoryView {

    class = 'npm-package-view d-flex align-items-center my-2'
    public readonly name: string
    public readonly assetId: string
    public readonly npm?: string
    public readonly github?: string
    public readonly doc?: string
    public readonly licence?: string

    children: VirtualDOM[]

    constructor(params: {
        name: string,
        npm?: string,
        github?: string,
        doc?: string,
        licence?: string
    }) {
        super({
            defaultOptions: {
                wrapper: {
                    style: {
                        height: "60px",
                        width: "100%"
                    }
                }
            }
        })
        this.name = params.name
        this.assetId = utf8_to_b64(params.name)
        this.npm = params.npm != undefined ? params.npm : `https://www.npmjs.com/package/${params.name}`
        this.github = params.github != undefined ? params.github : `https://github.com/${params.name.replace('@', '')}`
        this.doc = params.doc != undefined ? params.doc : `/api/assets-gateway/raw/package/${this.assetId}/latest/dist/docs/index.html`
        this.licence = params.licence
        this.children = [
            this.createBadge('fab fa-github', this.github),
            this.createBadge('fab fa-npm', this.npm),
            this.createBadge('fas fa-graduation-cap', this.doc),
            this.createLicenceView(this.licence),
            this.bundleSizeView()
        ].filter(view => view != undefined)
    }

    createLicenceView(name: string): VirtualDOM {

        return {
            class: 'd-flex px-4 align-items-center',
            children: [
                {
                    tag: 'i',
                    class: 'fas fa-gavel fa-2x px-1'
                },
                {
                    innerText: name
                },
            ]
        }
    }

    createBadge(faClass, link): VirtualDOM {

        return {
            class: 'px-4',
            tag: 'a',
            href: link,
            children: [
                {
                    tag: 'i',
                    class: faClass + " fa-2x"
                }
            ]
        }
    }

    bundleSizeView(): VirtualDOM {
        let url = `/api/assets-gateway/raw/package/${this.assetId}/latest/dist/${this.name}.js`
        return {
            class: 'd-flex px-4 align-items-center',
            children: [
                {
                    tag: 'i',
                    class: 'fas fa-weight fa-2x px-1'
                },
                {
                    innerText: attr$(
                        from(fetch(new Request(url))),
                        (response) => `${response.headers.get("content-length") / 1000} KB`
                    )
                },
            ]
        }
    }

}
