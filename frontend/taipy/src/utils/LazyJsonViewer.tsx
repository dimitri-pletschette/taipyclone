import { lazy, Suspense } from "react";

// Lazy-load JsonViewer
const JsonViewer = lazy(() => import("@textea/json-viewer").then(module => ({ default: module.JsonViewer })));

interface LazyJsonViewerProps {
  value: any;
  collapsed?: boolean | number | ((keyPath: (string | number)[], value: any) => boolean);
  groupArraysAfterLength?: number;
}

const LazyJsonViewer: React.FC<LazyJsonViewerProps> = ({ value, collapsed = 1, groupArraysAfterLength = 5 }) => (
  <Suspense fallback={<div>Loading JSON Viewer...</div>}>
    <JsonViewer 
      value={value} 
      collapsed={collapsed} 
      groupArraysAfterLength={groupArraysAfterLength} 
    />
  </Suspense>
);

export default LazyJsonViewer;
