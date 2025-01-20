import { TaipyApp, createApp, OnChangeHandler, OnInitHandler } from "./app";
import { WsAdapter } from "./wsAdapter";
import { ModuleData } from "./dataManager";
import TaipyRendered from "./components/Taipy/TaipyRendered";
import Slider from "../../src/components/Taipy/Slider";

export default TaipyApp;
export { TaipyApp, createApp, WsAdapter };
export { TaipyRendered, Slider };
export type { OnChangeHandler, OnInitHandler, ModuleData };
