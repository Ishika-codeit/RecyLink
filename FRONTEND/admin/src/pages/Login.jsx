import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [role, setRole] = useState('admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    if (role === 'admin') {
      navigate('/admin')
    } else if (role === 'recycler') {
      navigate('/recycler')
    } else {
      // Collector ka frontend separate project hai
      window.location.href = 'http://localhost:5174/'
    }
  }

  return (
    <div className="login-page">

      {/* LEFT SECTION */}
      <div className="login-info">
        <div className="brand">
          <div className="brand-logo">♻</div>
          <div>
            <h1>
              <span>Recy</span>Link
            </h1>
            <p>SMART E-WASTE NETWORK</p>
          </div>
        </div>

        <div className="intro">
          <h2>
            Building a cleaner,
            <br />
            circular future.
          </h2>

          <p>
            Connecting informal collectors, authorized recyclers
            and administrators to create a smarter e-waste
            recycling ecosystem.
          </p>
        </div>

        <div className="info-points">
          <div>
            <span>♻</span>
            <p>Responsible<br />Recycling</p>
          </div>

          <div>
            <span>🔗</span>
            <p>Connected<br />Ecosystem</p>
          </div>

          <div>
            <span>🌱</span>
            <p>Greener<br />Future</p>
          </div>
        </div>
      </div>

      {/* LOGIN SECTION */}
      <div className="login-section">
        <div className="login-card">

          <div className="login-heading">
            <h2>Welcome back</h2>
            <p>Sign in to your RecyLink account</p>
          </div>

          <form onSubmit={handleLogin}>

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label className="role-label">Login as</label>

            <div className="role-options">

              <button
                type="button"
                className={role === 'collector' ? 'role active' : 'role'}
                onClick={() => setRole('collector')}
              >
                <span>♻</span>
                <div>
                  <strong>Collector</strong>
                  <small>Collect & submit e-waste</small>
                </div>
              </button>

              <button
                type="button"
                className={role === 'recycler' ? 'role active' : 'role'}
                onClick={() => setRole('recycler')}
              >
                <span>🏭</span>
                <div>
                  <strong>Recycler</strong>
                  <small>Manage recycling operations</small>
                </div>
              </button>

              <button
                type="button"
                className={role === 'admin' ? 'role active' : 'role'}
                onClick={() => setRole('admin')}
              >
                <span>🛡</span>
                <div>
                  <strong>Admin</strong>
                  <small>Manage the RecyLink ecosystem</small>
                </div>
              </button>

            </div>

            <div className="login-options">
              <label className="remember">
                <input type="checkbox" />
                Remember me
              </label>

              <button type="button" className="forgot">
                Forgot password?
              </button>
            </div>

            <button className="sign-in-btn" type="submit">
              Sign In <span>→</span>
            </button>

          </form>

          <p className="login-footer">
            RecyLink • Bridging informal collectors with formal recycling
          </p>

        </div>
      </div>

    </div>
  )
}

export default Login