import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import ScrollProgress from "./components/ScrollProgress";
import AnimatedRoutes from "./components/AnimatedRoutes";
import WhatsAppButton from "./components/WhatsAppButton";
import { useVisitorTracking } from "./hooks/useVisitorTracking";

const queryClient = new QueryClient();

const AppContent = () => {
  useVisitorTracking();

  return (
    <>
      <ScrollProgress />
      <AnimatedRoutes />
      <WhatsAppButton />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SmoothScrollProvider>
          <AppContent />
        </SmoothScrollProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
