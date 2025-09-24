import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNavigation } from "@/components/mobile/BottomNavigation";
import Home from "./pages/Home";
import Queue from "./pages/Queue";
import VTU from "./pages/VTU";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Apollo Client
import { ApolloProvider } from "@apollo/client/react";
import client from "./lib/apolloClient";

const queryClient = new QueryClient();

const App = () => {
  // For demo purposes, we'll show the auth screen initially
  // In a real app, you'd check authentication state here
  const isAuthenticated = true; // Set to false to see auth screen

  if (!isAuthenticated) {
    return (
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Auth />
          </TooltipProvider>
        </QueryClientProvider>
      </ApolloProvider>
    );
  }

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="pb-16"> {/* Add padding for bottom navigation */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/queue" element={<Queue />} />
                <Route path="/vtu" element={<VTU />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/auth" element={<Auth />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <BottomNavigation />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
};

export default App;
