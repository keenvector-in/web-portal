import { Analytics } from "@vercel/analytics/react";
import { Route, Routes, useLocation } from "@keenvector/kvcl";
import { useEffect } from "react";
import { env } from "./config/env";
import { AuthLayout } from "./layouts/AuthLayout";
import { MarketingLayout } from "./layouts/MarketingLayout";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { AcceptableUse } from "./pages/legal/AcceptableUse";
import { DataDeletion } from "./pages/legal/DataDeletion";
import { Privacy } from "./pages/legal/Privacy";
import { Terms } from "./pages/legal/Terms";
import { WhatsAppPolicy } from "./pages/legal/WhatsAppPolicy";
import { About } from "./pages/marketing/About";
import { Contact } from "./pages/marketing/Contact";
import { Features } from "./pages/marketing/Features";
import { Home } from "./pages/marketing/Home";
import { Pricing } from "./pages/marketing/Pricing";
import { NotFound } from "./pages/NotFound";

// The old logged-in product shell had no login guard (S-10). That surface lives in
// business-admin-portal now, so its paths hand off there (its ProtectedRoute
// does the auth); with no portal configured they are simply not found.
const LEGACY_PRODUCT_PATHS = ["/onboarding", "/dashboard", "/inbox", "/contacts", "/templates", "/analytics", "/settings/*"];

function ToBusinessAdmin() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (env.businessAdminBaseUrl) window.location.replace(`${env.businessAdminBaseUrl}${pathname}`);
  }, [pathname]);
  return env.businessAdminBaseUrl ? null : <NotFound />;
}

function App() {
  return (
    <>
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/acceptable-use" element={<AcceptableUse />} />
          <Route path="/data-deletion" element={<DataDeletion />} />
          <Route path="/whatsapp" element={<WhatsAppPolicy />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {LEGACY_PRODUCT_PATHS.map((path) => (
          <Route key={path} path={path} element={<ToBusinessAdmin />} />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
      {env.enableAnalytics ? <Analytics /> : null}
    </>
  );
}

export default App;
