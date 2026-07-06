import { createBrowserRouter, Navigate } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "../pages/HomePage";
import { InspirationPage } from "../pages/InspirationPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PacomeGalleryDemoPage } from "../pages/PacomeGalleryDemoPage";
import { WorkbenchPage } from "../pages/WorkbenchPage";
import { firstEffectByCategory } from "../registry/getEffect";

const defaultEffect = firstEffectByCategory("backgrounds");

export const router = createBrowserRouter([
  { path: "/pacome-gallery-demo", element: <PacomeGalleryDemoPage /> },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "workbench",
        element: defaultEffect ? (
          <Navigate to={`/workbench/backgrounds/${defaultEffect.slug}`} replace />
        ) : (
          <NotFoundPage />
        )
      },
      { path: "workbench/:category/:effect", element: <WorkbenchPage /> },
      { path: "inspiration", element: <InspirationPage /> },
      { path: "*", element: <NotFoundPage /> }
    ]
  }
]);
