
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { CollaborationRequests } from "./pages/CollaborationRequests";
import { IncidentQueue } from "./pages/IncidentQueue";
import { NgoTrustMonitor } from "./pages/NgoTrustMonitor";
import { OpsDashboard } from "./pages/OpsDashboard";
import { ProblemHeatmap } from "./pages/ProblemHeatmap";
import { ProposalReview } from "./pages/ProposalReview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/ops" replace />,
  },
  {
    path: "/ops",
    element: <OpsDashboard />,
  },
  {
    path: "/collaboration",
    element: <CollaborationRequests />,
  },
  {
    path: "/incidents",
    element: <IncidentQueue />,
  },
  {
    path: "/ngo-trust",
    element: <NgoTrustMonitor />,
  },
  {
    path: "/heatmap",
    element: <ProblemHeatmap />,
  },
  {
    path: "/proposals",
    element: <ProposalReview />,
  },
]);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("ReadyCheck admin root element not found.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
