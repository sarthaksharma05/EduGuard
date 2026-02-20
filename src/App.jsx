import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Header from './Header.jsx'
import Login from './Login.jsx'
import Auth from './Auth.jsx'
import EditProfile from './EditProfile.jsx'
import StudentDashboard from './StudentDashboard.jsx'
import StudentAI from './StudentAI.jsx'
import Features from './Features.jsx'
import HowItWorks from './HowItWorks.jsx'
import Pricing from './Pricing.jsx'
import Contact from './Contact.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {
  return (
    <Router>
      <Header />
      <div className="pt-16 min-h-screen font-sans text-slate-800 antialiased">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-ai"
            element={
              <ProtectedRoute>
                <StudentAI />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}
