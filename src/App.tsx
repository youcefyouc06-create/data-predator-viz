import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import ValidatePage from "./pages/ValidatePage";
import ExplorePage from "./pages/ExplorePage";
import ScansPage from "./pages/ScansPage";
import SettingsPage from "./pages/SettingsPage";
import TrendsPage from "./pages/TrendsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="validate" element={<ValidatePage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="scans" element={<ScansPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="trends" element={<TrendsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
