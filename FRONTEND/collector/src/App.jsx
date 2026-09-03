import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Dashboard from './pages/Dashboard'
import Demands from './pages/Demands'
import DemandDetails from './pages/DemandDetails'
import AddEwaste from './pages/AddEwaste'
import AIAssessment from './pages/AIAssessment'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import './App.css'

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <main className="page-content">

        <Routes>

          {/* Dashboard */}
          <Route
            path="/"
            element={<Dashboard />}
          />

          {/* Nearby Recycler Demands */}
          <Route
            path="/demands"
            element={<Demands />}
          />

          {/* Individual Demand */}
          <Route
            path="/demands/:id"
            element={<DemandDetails />}
          />

          {/* Add E-Waste */}
          <Route
            path="/add-ewaste"
            element={<AddEwaste />}
          />

          {/* AI Assessment */}
          <Route
            path="/ai-assessment"
            element={<AIAssessment />}
          />

          {/* Offers */}
          <Route
            path="/offers"
            element={<Offers />}
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={<Profile />}
          />

        </Routes>

      </main>

      <Footer />

    </BrowserRouter>
  )
}

export default App