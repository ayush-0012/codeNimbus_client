import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { ReactNode } from "react";
import { ThemeProvider } from "./components/ui/theme-provider";
import WorkSpace from "./components/WorkSpace";

import WorkSpaceLibs from "./components/WorkSpaceLibs";

function protectRoutes(element: ReactNode) {
  return <ProtectedRoute>{element}</ProtectedRoute>;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={protectRoutes(<Dashboard />)} />
            <Route path="/workspace" element={protectRoutes(<WorkSpace />)} />
            <Route
              path="/workspace/:lib"
              element={protectRoutes(<WorkSpaceLibs />)}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
