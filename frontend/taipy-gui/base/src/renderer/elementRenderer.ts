import { TaipyApp } from "../app";
import { Element } from "./elementManager";
import axios from "axios";

export class ElementRenderer {
    taipyApp: TaipyApp;

    constructor(taipyApp: TaipyApp) {
        this.taipyApp = taipyApp;
    }

    async render(elements: Element[], force: boolean = false): Promise<string> {
        const renderedElements = await Promise.all(
            elements.map(async (element) => {
                if (force || !element.jsx) {
                    element.jsx = await this.renderSingle(element);
                }
                return `${element.wrapperHtml?.[0] || ""}${element.jsx}${element.wrapperHtml?.[1] || ""}`;
            }),
        );
        return renderedElements.join("\n");
    }

    async renderSingle(element: Element): Promise<string> {
        try {
            const result = await axios.post<{ jsx: string }>(
                `${this.taipyApp.getBaseUrl()}taipy-element-jsx?client_id=${this.taipyApp.clientId}`,
                {
                    type: element.type,
                    properties: { ...element.properties, id: element.id },
                    context: this.taipyApp.getContext(),
                },
            );
            return result.data.jsx;
        } catch (error) {
            throw new Error(`Failed to render element '${element.type} - ${element.id}': ${error}`);
        }
    }
}
