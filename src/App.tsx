import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginModal from "./components/LoginModal";
import Home from "./pages/Home";
import MonasteriesList from "./pages/MonasteriesList";
import MonasteriesMap from "./pages/MonasteriesMap";
import MonasteryDetail from "./pages/MonasteryDetail";
import ModelViewer from "./pages/ModelViewer";
import PlanVisit from "./pages/PlanVisit";
import NotFound from "./pages/NotFound";
import './i18n';

const queryClient = new QueryClient();

const AppContent = () => {
  const { showLoginModal, login, closeLoginModal } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monasteries" element={<MonasteriesList />} />
        <Route path="/map" element={<MonasteriesMap />} />
        <Route path="/monastery/:id" element={<MonasteryDetail />} />
        <Route path="/model-viewer" element={<ModelViewer />} />
        <Route path="/plan-visit" element={<PlanVisit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={closeLoginModal}
        onLogin={login}
      />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
