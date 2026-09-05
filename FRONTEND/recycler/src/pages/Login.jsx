import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/recycler')
  }

  return (
    <div className="recycler-login">

      <div className="login-brand">
        <div className="login-logo">♻</div>

        <h1>
          Recy<span>Link</span>
        </h1>

        <p>
          Recycler Portal
        </p>
      </div>

      <form className="login-card" onSubmit={handleLogin}>

        <span className="panel-label">
          RECYCLER ACCESS
        </span>

        <h2>Welcome back</h2>

        <p>
          Sign in to manage your recycling operations.
        </p>

        <label>Email</label>
        <input
          type="email"
          placeholder="recycler@example.com"
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          required
        />

        <button type="submit" className="primary-btn">
          Sign In →
        </button>

      </form>

    </div>
  )
}

export default Login