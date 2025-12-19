import LandingPage from "./pages/LandingPage";
import { AdminLayout } from "./components/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import ProjectsPage from "./pages/admin/ProjectsPage";
import ClientsPage from "./pages/admin/ClientsPage";
import ContactsPage from "./pages/admin/ContactsPage";
import NewsletterPage from "./pages/admin/NewsletterPage";
import type { ReactNode } from "react";

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    name: "Landing Page",
    path: "/",
    element: <LandingPage />,
  },
  {
    name: "Admin",
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        name: "Dashboard",
        path: "/admin",
        element: <DashboardPage />,
      },
      {
        name: "Projects",
        path: "/admin/projects",
        element: <ProjectsPage />,
      },
      {
        name: "Clients",
        path: "/admin/clients",
        element: <ClientsPage />,
      },
      {
        name: "Contacts",
        path: "/admin/contacts",
        element: <ContactsPage />,
      },
      {
        name: "Newsletter",
        path: "/admin/newsletter",
        element: <NewsletterPage />,
      },
    ],
  },
];

export default routes;
