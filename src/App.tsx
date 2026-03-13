import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import DashboardLayout from "./components/DashboardLayout.tsx";
import DashboardHome from "./pages/DashboardHome.tsx";
import ValidatePage from "./pages/ValidatePage.tsx";
import ExplorePage from "./pages/ExplorePage.tsx";
import ScansPage from "./pages/ScansPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import TrendsPage from "./pages/TrendsPage.tsx";
import WTPPage from "./pages/WTPPage.tsx";
import CompetitorsPage from "./pages/CompetitorsPage.tsx";
import SourcesPage from "./pages/SourcesPage.tsx";
import ReportsPage from "./pages/ReportsPage.tsx";
import SavedPage from "./pages/SavedPage.tsx";
import DigestPage from "./pages/DigestPage.tsx";
import WatchlistPage from "./pages/WatchlistPage.tsx";

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
            <Route path="wtp" element={<WTPPage />} />
            <Route path="competitors" element={<CompetitorsPage />} />
            <Route path="sources" element={<SourcesPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="saved" element={<SavedPage />} />
            <Route path="digest" element={<DigestPage />} />
            <Route path="watchlist" element={<WatchlistPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
