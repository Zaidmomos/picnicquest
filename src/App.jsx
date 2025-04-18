import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import Spots from "@/components/Spots";
import Packages from "@/components/Packages";
import Reviews from "@/components/Reviews";
import About from "@/components/About";
import TripPlanner from "@/components/TripPlanner";
import Events from "@/components/Events";
import Recommendations from "@/components/Recommendations";
import LoginForm from "@/components/Auth/LoginForm";
import SignupForm from "@/components/Auth/SignupForm";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
          <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/spots" element={<Spots />} />
  <Route path="/packages" element={<Packages />} />
  <Route path="/reviews" element={<Reviews />} />
  <Route path="/about" element={<About />} />
  <Route path="/planner" element={<TripPlanner />} />
  <Route path="/events" element={<Events />} />
  <Route path="/recommendations" element={<Recommendations />} />
  <Route path="/login" element={<LoginForm />} />
  <Route path="/signup" element={<SignupForm />} />
</Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;