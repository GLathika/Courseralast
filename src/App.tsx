
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Index";
import Categories from "./pages/Categories";
import Items from "./pages/Items";
import SignUp from "./pages/SignUp";
import MyInfo from "./pages/MyInfo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <nav className="bg-[#7D2E2E] p-4">
          <div className="container mx-auto flex justify-end space-x-4">
            <Link
              to="/my-info"
              className="text-white hover:text-gray-200 transition-colors"
            >
              My Info
            </Link>
            <Link
              to="/sign-up"
              className="text-white hover:text-gray-200 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/items/:categoryId" element={<Items />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/my-info" element={<MyInfo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
