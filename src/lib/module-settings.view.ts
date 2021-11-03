import { flattenSchemaWithValue, Factory } from "@youwol/flux-core"
import { child$, HTMLElement$, render, VirtualDOM } from "@youwol/flux-view"
import { AutoForm } from '@youwol/flux-fv-widgets'
import { from, ReplaySubject } from "rxjs"
import { map } from "rxjs/operators"
import { StoryView } from "./story.view"

/**
 * Module's settings view.
 * 
 * It displays an automatically generated form based on the schema defined for the persistent data.
 * 
 */
export class ModuleSettingsView extends StoryView {

    public readonly toolboxName: string
    public readonly brickId: string
    public readonly version = "latest"
    public readonly bundleLoaded$ = new ReplaySubject<boolean>(1)
    public readonly class = 'flux-module-settings-view'
    public readonly style: { [key: string]: string } = {}
    public readonly children: VirtualDOM[]
    public readonly renderedElement$ = new ReplaySubject<HTMLDivElement>(1)

    connectedCallback: (elem: HTMLElement$ & HTMLDivElement) => void

    constructor(params: {
        toolboxName: string,
        brickId: string,
        version?: string
    }) {
        super({
            defaultOptions: {
                wrapper: {
                    style: {
                        height: "500px",
                        'max-width': '500px',
                        width: "100%"
                    }
                }
            }
        })

        Object.assign(this, params)

        this.children = [
            child$(
                from(
                    // to allow mocking :/ (should have been import { install } from '@youwol/cdn-client')
                    window['@youwol/cdn-client'].install({
                        modules: [{
                            name: this.toolboxName,
                            version: this.version
                        }]
                    })).pipe(
                        map(() => window[this.toolboxName][this.brickId]),
                        map((mdleFactory: Factory) => new mdleFactory.PersistentData())
                    ),
                (persistentData) => {
                    return this.autoFormView(persistentData)
                }
            )
        ]
    }

    autoFormView(persistentData: unknown) {

        let schemaWithValue = flattenSchemaWithValue(persistentData)
        let input = Object.keys(schemaWithValue)
            .map(k => ({ [k]: schemaWithValue[k][0] }))
            .reduce((acc, e) => ({ ...acc, ...e }), {})

        let state = new AutoForm.State(
            persistentData,
            input,
            () => true
        )

        return {
            class: 'fv-bg-background fv-text-primary h-100 d-flex flex-column',
            children: [
                new AutoForm.View({
                    state,
                    class: 'flex-grow-1 overflow-auto',
                    style: { 'min-height': '0px' }
                } as any)
            ],
            connectedCallback: (autoFormView: HTMLDivElement) => {
                this.renderedElement$.next(autoFormView)
            }
        }
    }

}
