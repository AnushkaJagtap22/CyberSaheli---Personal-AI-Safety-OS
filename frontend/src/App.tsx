import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { GlobalAskSaheli } from "./components/GlobalAskSaheli";

import { ErrorBoundary } from "./components/ErrorBoundary";

// Core Modules
import { Dashboard } from "./pages/Dashboard";
import { VerifySomeone } from "./pages/VerifySomeone";
import { IncidentWorkspace as InvestigateIncident } from "./pages/IncidentWorkspace";
import { EvidenceVault } from "./pages/EvidenceVault";
import { RecoveryCenter } from "./pages/RecoveryCenter";
import { RiskRadar as AIRiskRadar } from "./pages/RiskRadar";
import { SafetyPassport } from "./pages/SafetyPassport";
import { EmergencySOS } from "./pages/EmergencySOS";
import { LearningHub } from "./pages/LearningHub";
import { ProfileSettings } from "./pages/ProfileSettings";
import { LandingPage } from "./pages/LandingPage";
import { Auth } from "./pages/Auth";

function DynamicTitleHandler() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = "CyberSaheli • AI Cyber Safety Platform";

    if (path === "/app") title = "CyberSaheli • Home";
    else if (path.startsWith("/app/verify")) title = "CyberSaheli • Trust Verification";
    else if (path.startsWith("/app/investigate")) title = "CyberSaheli • AI Investigation";
    else if (path.startsWith("/app/vault")) title = "CyberSaheli • Evidence Vault";
    else if (path.startsWith("/app/recovery")) title = "CyberSaheli • Recovery Center";
    else if (path.startsWith("/app/risk-radar")) title = "CyberSaheli • CyberSaheli Intelligence";
    else if (path.startsWith("/app/passport")) title = "CyberSaheli • Digital Identity";
    else if (path.startsWith("/app/sos")) title = "CyberSaheli • Emergency SOS";
    else if (path.startsWith("/app/learn")) title = "CyberSaheli • Learning Hub";
    else if (path.startsWith("/app/profile")) title = "CyberSaheli • Profile";

    document.title = title;
  }, [location]);

  return null;
}

function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0c0d12] font-sans text-[#f9fafb] selection:bg-[#7c3aed] selection:text-white relative">
      <DynamicTitleHandler />
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-[#0c0d12] p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>

      {/* GLOBAL PERSISTENT CYBERSAHELI CONVERSATIONAL AI ASSISTANT */}
      <GlobalAskSaheli />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Landing & Auth Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />

          {/* CyberSaheli AI Cyber Safety OS Modules */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<ErrorBoundary moduleName="Dashboard"><Dashboard /></ErrorBoundary>} />
            <Route path="verify" element={<ErrorBoundary moduleName="Verify Someone"><VerifySomeone /></ErrorBoundary>} />
            <Route path="investigate" element={<ErrorBoundary moduleName="Investigate Incident Workspace"><InvestigateIncident /></ErrorBoundary>} />
            <Route path="vault" element={<ErrorBoundary moduleName="Evidence Vault"><EvidenceVault /></ErrorBoundary>} />
            <Route path="recovery" element={<ErrorBoundary moduleName="Recovery Center"><RecoveryCenter /></ErrorBoundary>} />
            <Route path="risk-radar" element={<ErrorBoundary moduleName="AI Risk Radar"><AIRiskRadar /></ErrorBoundary>} />
            <Route path="passport" element={<ErrorBoundary moduleName="Safety Passport"><SafetyPassport /></ErrorBoundary>} />
            <Route path="sos" element={<ErrorBoundary moduleName="Emergency SOS"><EmergencySOS /></ErrorBoundary>} />
            <Route path="learn" element={<ErrorBoundary moduleName="Learning Hub"><LearningHub /></ErrorBoundary>} />
            <Route path="profile" element={<ErrorBoundary moduleName="Profile Settings"><ProfileSettings /></ErrorBoundary>} />

            {/* Clean Route Aliases */}
            <Route path="radar" element={<Navigate to="/app/risk-radar" replace />} />
            <Route path="cases" element={<Navigate to="/app/investigate" replace />} />
            <Route path="trust" element={<Navigate to="/app/verify" replace />} />
            <Route path="evidence" element={<Navigate to="/app/vault" replace />} />
            <Route path="safety" element={<Navigate to="/app/passport" replace />} />
            <Route path="legal" element={<Navigate to="/app/recovery" replace />} />
            <Route path="academy" element={<Navigate to="/app/learn" replace />} />
            <Route path="assistant" element={<Navigate to="/app/investigate" replace />} />
            <Route path="simulator" element={<Navigate to="/app/learn" replace />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
