import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Demands from './pages/Demands'
import CreateDemand from './pages/CreateDemand'
import EWaste from './pages/EWaste'
import EWasteDetails from './pages/EWasteDetails'
import CreateOffer from './pages/CreateOffer'
import Collections from './pages/Collections'
import Profile from './pages/Profile'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Recycler */}
        <Route path="/recycler" element={<Dashboard />} />
        <Route path="/recycler/demands" element={<Demands />} />
        <Route path="/recycler/demands/create" element={<CreateDemand />} />

        <Route path="/recycler/ewaste" element={<EWaste />} />
        <Route path="/recycler/ewaste/:id" element={<EWasteDetails />} />

        <Route path="/recycler/offers/create" element={<CreateOffer />} />

        <Route path="/recycler/collections" element={<Collections />} />
        <Route path="/recycler/profile" element={<Profile />} />

        {/* Unknown route */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App