import { TaipyApp } from "../app";
import { TaipyCanvas } from "./canvas";
import { FrontendRenderer, TaipyRenderer } from "./elementRenderer";

export interface Element {
    id: string | undefined;
    type: string;
    bindingEncodedVarName: string | undefined;
    wrapperHtml: [string, string] | undefined;
}

export class ElementManager {
    _elements: Element[];
    _renderer: TaipyRenderer;
    _canvas: TaipyCanvas;
    taipyApp: TaipyApp;

    constructor(taipyApp: TaipyApp) {
        this.taipyApp = taipyApp;
        this._elements = [];
        this._renderer = new FrontendRenderer(taipyApp);
        this._canvas = new TaipyCanvas(taipyApp);
    }

    init(domElement: HTMLElement) {
        this._canvas.init(domElement);
    }

    addElement(element: Element) {
        if (element.id === undefined) {
            element.id = Math.random().toString(36).substring(10);
        }
        this._elements.push(element);
        this._canvas.updateContent(this._renderer.render(this._elements));
    }
}
