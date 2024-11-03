declare module "@textea/json-viewer" {
  import { ComponentType } from "react";

  interface JsonViewerProps {
    value: any; 
  }

  export const JsonViewer: ComponentType<JsonViewerProps>;
}
