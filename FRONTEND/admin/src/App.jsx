
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import Collectors from './pages/Collectors'
import EWaste from './pages/EWaste'
import Demands from './pages/Demands'
import Collections from './pages/Collections'
import Reports from './pages/Reports'
import AdminProfile from './pages/AdminProfile'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
    {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />
<Route path="/admin/collectors" element={<Collectors />} />
<Route path="/admin/ewaste" element={<EWaste />} />
<Route path="/admin/demands" element={<Demands />} />
<Route path="/admin/collections" element={<Collections />} />
<Route path="/admin/reports" element={<Reports />} />
<Route path="/admin/profile" element={<AdminProfile />} />
 <Route
          path="/recycler"
          element={
            <div style={{ padding: '40px' }}>
              Recycler Dashboard Coming Next...
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App