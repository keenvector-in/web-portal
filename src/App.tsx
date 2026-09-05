import { Analytics } from "@vercel/analytics/react";
import { Route, Routes } from "react-router-dom";
import { AnalyticsPage } from "./features/analytics/AnalyticsPage";
import { ContactsPage } from "./features/contacts/ContactsPage";
import { InboxPage } from "./features/inbox/InboxPage";
import { TemplatesPage } from "./features/templates/TemplatesPage";
import { WhatsAppSettings } from "./features/whatsapp/WhatsAppSettings";
import { AuthLayout } from "./layouts/AuthLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { MarketingLayout } from "./layouts/MarketingLayout";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { DashboardHome } from "./pages/dashboard/DashboardHome";
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
import { Onboarding } from "./pages/Onboarding";
import { PlaceholderSettings } from "./pages/settings/PlaceholderSettings";

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

        <Route path="/onboarding" element={<Onboarding />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<PlaceholderSettings title="Settings" />} />
          <Route path="/settings/whatsapp" element={<WhatsAppSettings />} />
          <Route path="/settings/team" element={<PlaceholderSettings title="Team" />} />
          <Route path="/settings/integrations" element={<PlaceholderSettings title="Integrations" />} />
          <Route path="/settings/billing" element={<PlaceholderSettings title="Billing" />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
