import { Suspense, lazy } from "react";

const LazyHome = lazy(() => import("./Home"));

export const Home = (props) => (
  <Suspense fallback={<>Loading...</>}>
    <LazyHome {...props} />
  </Suspense>
);
