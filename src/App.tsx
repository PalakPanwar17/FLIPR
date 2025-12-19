import Projects from "@/components/Projects";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import routes from "./routes";
import { Header } from "@/components/common/Header";
import { Toaster } from "@/components/ui/toaster";

const App: React.FC = () => {
  const renderRoutes = (routeList: typeof routes) => {
    return routeList.map((route, index) => {
      if (route.children) {
        return (
          <Route key={index} path={route.path} element={route.element}>
            {route.children.map((child, childIndex) => (
              <Route
                key={childIndex}
                path={child.path}
                element={child.element}
                index={child.path === route.path}
              />
            ))}
          </Route>
        );
      }
      return <Route key={index} path={route.path} element={route.element} />;
    });
  };

  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                {routes.find((r) => r.path === "/")?.element}
              </>
            }
          />
          {renderRoutes(routes.filter((r) => r.path !== "/"))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Toaster />
    </Router>
  );
};

export default App;
