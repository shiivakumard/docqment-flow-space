
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import Dashboard from "./pages/Dashboard";
import Files from "./pages/Files";
import Recent from "./pages/Recent";
import Starred from "./pages/Starred";
import Trash from "./pages/Trash";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/': return 'Dashboard';
      case '/files': return 'My Files';
      case '/recent': return 'Recent Files';
      case '/starred': return 'Starred Files';
      case '/trash': return 'Trash';
      case '/settings': return 'Settings';
      default: return 'DocQment';
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex w-full bg-background">
            <Sidebar 
              isCollapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
            
            <div className="flex-1 flex flex-col min-w-0">
              <Header 
                title={getPageTitle(window.location.pathname)}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
              
              <main className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/files" element={<Files />} />
                  <Route path="/recent" element={<Recent />} />
                  <Route path="/starred" element={<Starred />} />
                  <Route path="/trash" element={<Trash />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
