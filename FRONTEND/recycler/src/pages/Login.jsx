import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [organizationName, setOrganizationName] =
    useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    if (!organizationName.trim()) {
      alert(
        'Please enter your organization name.'
      )
      return
    }

    // Prototype authentication
    // Current backend does not have auth API.
    const recyclerUser = {
      organizationName:
        organizationName.trim(),

      contactPerson:
        organizationName.trim(),

      email: email.trim(),

      phone: 'Not provided',

      location: 'Delhi NCR',

      operatingRegion:
        'Delhi NCR',

      role: 'recycler',
    }

    localStorage.setItem(
      'recyclerUser',
      JSON.stringify(recyclerUser)
    )

    // Also keep common user key
    // for compatibility with other frontend flows.
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...recyclerUser,
        name: organizationName.trim(),
      })
    )

    navigate('/recycler')
  }

  return (
    <div className="recycler-login">

      {/* =================================
          BRAND
      ================================= */}

      <div className="login-brand">

        <div className="login-logo">
          ♻
        </div>

        <h1>
          Recy<span>Link</span>
        </h1>

        <p>
          Recycler Portal
        </p>

      </div>


      {/* =================================
          LOGIN CARD
      ================================= */}

      <form
        className="login-card"
        onSubmit={handleLogin}
      >

        <span className="panel-label">
          RECYCLER ACCESS
        </span>

        <h2>
          Welcome back
        </h2>

        <p>
          Sign in to manage your recycling
          operations.
        </p>


        {/* Organization */}

        <label>
          Organization Name
        </label>

        <input
          type="text"
          placeholder="Enter organization name"
          value={organizationName}
          onChange={(e) =>
            setOrganizationName(
              e.target.value
            )
          }
          required
        />


        {/* Email */}

        <label>
          Email
        </label>

        <input
          type="email"
          placeholder="recycler@example.com"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />


        {/* Password */}

        <label>
          Password
        </label>

        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />


        {/* Login */}

        <button
          type="submit"
          className="primary-btn"
        >
          Sign In →
        </button>

      </form>

    </div>
  )
}

export default Login