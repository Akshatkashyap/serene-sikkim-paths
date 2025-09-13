import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MonasteriesList from "./pages/MonasteriesList";
import MonasteriesMap from "./pages/MonasteriesMap";
import MonasteryDetail from "./pages/MonasteryDetail";
import ModelViewer from "./pages/ModelViewer";
import NotFound from "./pages/NotFound";
import './i18n';

const queryClient = new QueryClient();




const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/monasteries" element={<MonasteriesList />} />
          <Route path="/map" element={<MonasteriesMap />} />
          <Route path="/monastery/:id" element={<MonasteryDetail />} />
          <Route path="/model-viewer" element={<ModelViewer />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
