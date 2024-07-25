import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from "react-cookie";

import { GlobalProvider } from "./contexts/globalContext";

import { AuthRoute } from "./components/AuthRoute";

import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { NorFound } from "./pages/notFound";
import { Exam } from "./pages/exam";

export function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <GlobalProvider>
          <Toaster />
          <Routes>
            <Route path="/" Component={Login} />
            <Route element={<AuthRoute />}>
              <Route path="/dash" Component={Dashboard} />
            </Route>
            <Route path="/exam/:examId" Component={Exam} />
            <Route path="*" Component={NorFound} />
          </Routes>
        </GlobalProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}
