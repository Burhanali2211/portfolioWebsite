import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import ScrollProgress from "./components/ScrollProgress";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { useVisitorTracking } from "./hooks/useVisitorTracking";

const queryClient = new QueryClient();

// Wrapper component to use hooks
const AppContent = () => {
  // Track visitor on app load
  useVisitorTracking();

  return (
    <>
      <ScrollProgress />
      <AnimatedRoutes />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SmoothScrollProvider>
          <AppContent />
        </SmoothScrollProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
