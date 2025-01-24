import { nanoid } from "nanoid";
import { TaipyApp } from "../app";
import { TaipyCanvas } from "./canvas";
import { ElementRenderer } from "./elementRenderer";

export interface Element {
    type: string;
    id?: string;
    properties?: Record<string, string>;
    wrapperHtml?: [string, string];
    jsx?: string;
}

export class ElementManager {
    _elements: Element[];
    _renderer: ElementRenderer;
    _canvas: TaipyCanvas;
    taipyApp: TaipyApp;

    constructor(taipyApp: TaipyApp) {
        this.taipyApp = taipyApp;
        this._elements = [];
        this._renderer = new ElementRenderer(taipyApp);
        this._canvas = new TaipyCanvas(taipyApp);
    }

    init(domElement: HTMLElement) {
        this._canvas.init(domElement);
    }

    addElement(element: Element) {
        if (element.id === undefined) {
            element.id = nanoid(10);
        }
        this._elements.push(element);
        this._renderer.render(this._elements).then((jsx) => this._canvas.updateContent(jsx));
    }
}
