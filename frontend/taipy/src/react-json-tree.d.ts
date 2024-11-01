// For Import of React Json Tree Lib

declare module "react-json-tree" {
  import { ComponentType } from "react";

  interface JSONTreeProps {
    data: any; 
    shouldExpandNode?: (keyPath: (string | number)[], data: any, level: number) => boolean;
    hideRoot?: boolean;
  }

  const JSONTree: ComponentType<JSONTreeProps>;
  export = JSONTree;
}
