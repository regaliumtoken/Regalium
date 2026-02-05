import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3Provider } from "@/components/Web3Provider";
import Index from "./pages/Index";
import Countdown from "./pages/Countdown";
import Buy from "./pages/Buy";
import Swap from "./pages/Swap";
import Stake from "./pages/Stake";
import Dashboard from "./pages/Dashboard";
import Team from "./pages/Team";
import Whitepaper from "./pages/Whitepaper";
import Roadmap from "./pages/Roadmap";
import FAQ from "./pages/FAQ";
import Audit from "./pages/Audit";
import Documentation from "./pages/Documentation";
import Support from "./pages/Support";
import BrandKit from "./pages/BrandKit";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const App = () => (
  <Web3Provider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/countdown" element={<Countdown />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/support" element={<Support />} />
          <Route path="/brand-kit" element={<BrandKit />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </Web3Provider>
);

export default App;
