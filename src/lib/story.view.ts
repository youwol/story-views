import { render, VirtualDOM } from "@youwol/flux-view";
import * as _ from 'lodash'

export interface Options {

    wrapper?: {
        style?: { [key: string]: string },
        class?: string
    }
}


export class StoryView implements VirtualDOM {

    public readonly defaultOptions: Options

    constructor(parameters: { defaultOptions: Options }) {

        this.defaultOptions = parameters.defaultOptions
    }

    renderStoryView(dynamicOptions: Options): {
        view: HTMLElement,
        options: any
    } {
        let options = _.cloneDeep(this.defaultOptions)
        _.mergeWith(options, dynamicOptions)
        return {
            view: render(this),
            options
        }
    }
}
