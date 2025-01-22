import { TaipyApp } from "../app";
import { Element } from "./elementManager";

export interface TaipyRenderer {
    render(elements: Element[]): string;
}

export class FrontendRenderer implements TaipyRenderer {
    taipyApp: TaipyApp;

    constructor(taipyApp: TaipyApp) {
        this.taipyApp = taipyApp;
    }

    render(elements: Element[]): string {
        return elements
            .map((e) => {
                const defaultValue = e.bindingEncodedVarName
                    ? this.taipyApp?.variableData?.get(e.bindingEncodedVarName)
                    : undefined;
                const bindingVarStr = defaultValue
                    ? ` defaultValue={"${defaultValue}"} updateVarName="${e.bindingEncodedVarName}" value={${e.bindingEncodedVarName}}`
                    : "";
                return `${e.wrapperHtml && e.wrapperHtml[0]}<${e.type} key="${e.id}" ${bindingVarStr} />${e.wrapperHtml && e.wrapperHtml[1]}`;
            })
            .join("/n");
    }
}
