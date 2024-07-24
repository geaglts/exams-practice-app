import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from "react-cookie";

import { AuthRoute } from "./components/AuthRoute";

import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { NorFound } from "./pages/notFound";

export function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" Component={Login} />
          <Route Component={AuthRoute}>
            <Route path="/dash" Component={Dashboard} />
          </Route>
          <Route path="*" Component={NorFound} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}
