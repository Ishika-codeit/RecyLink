import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Profile() {
  const storedUser = JSON.parse(
    localStorage.getItem('recyclerUser') ||
      localStorage.getItem('user') ||
      'null'
  )

  const [wastes, setWastes] = useState([])
  const [quotes, setQuotes] = useState([])

  const [editing, setEditing] = useState(false)

  const [profile, setProfile] = useState({
    organizationName:
      storedUser?.organizationName ||
      'Recycler Organization',

    contactPerson:
      storedUser?.contactPerson ||
      storedUser?.name ||
      'Recycler',

    email:
      storedUser?.email ||
      'recycler@example.com',

    phone:
      storedUser?.phone ||
      'Not provided',

    location:
      storedUser?.location ||
      'Delhi NCR',

    operatingRegion:
      storedUser?.operatingRegion ||
      'Delhi NCR',

    description:
      storedUser?.description ||
      'E-waste recycling organization connected through RecyLink.',
  })

  const [form, setForm] = useState(profile)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  // =================================
  // FETCH BACKEND DATA
  // =================================

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true)
        setError('')

        const [
          wasteResponse,
          quoteResponse,
        ] = await Promise.all([
          fetch('https://recylink-zt6e.onrender.com/api/waste'),
          fetch('https://recylink-zt6e.onrender.com/api/quotes'),
        ])

        const wasteResult =
          await wasteResponse.json()

        const quoteResult =
          await quoteResponse.json()

        if (!wasteResponse.ok) {
          throw new Error(
            wasteResult.message ||
              'Failed to fetch e-waste'
          )
        }

        if (!quoteResponse.ok) {
          throw new Error(
            quoteResult.message ||
              'Failed to fetch quotes'
          )
        }

        setWastes(
          wasteResult.wastes || []
        )

        setQuotes(
          quoteResult.quotes || []
        )
      } catch (err) {
        console.error(
          'Profile Error:',
          err
        )

        setError(
          err.message ||
            'Failed to load profile data'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [])


  // =================================
  // RECYCLER QUOTES
  // =================================

  /*
    Current backend uses collectorId only.
    There is no recyclerId/recyclerName field
    in Quote model, so recycler-specific
    filtering is not possible yet.
  */

  const recyclerQuotes = quotes


  // =================================
  // PERFORMANCE
  // =================================

  const completedCollections =
    useMemo(() => {
      return recyclerQuotes.filter(
        (quote) =>
          quote.status === 'SELECTED'
      )
    }, [recyclerQuotes])


  const totalUnits = useMemo(() => {
    return completedCollections.reduce(
      (sum, quote) =>
        sum +
        Number(quote.quantity || 0),
      0
    )
  }, [completedCollections])


  const totalValue = useMemo(() => {
    return completedCollections.reduce(
      (sum, quote) =>
        sum +
        Number(quote.amount || 0),
      0
    )
  }, [completedCollections])


  // =================================
  // ACCEPTED MATERIALS
  // =================================

  const acceptedMaterials =
    useMemo(() => {
      return [
        ...new Set(
          wastes
            .map(
              (item) =>
                item.category ||
                item.wasteType
            )
            .filter(Boolean)
        ),
      ]
    }, [wastes])


  // =================================
  // PROFILE SAVE
  // =================================

  const handleSave = () => {
    const updatedProfile = {
      ...form,
    }

    setProfile(updatedProfile)

    localStorage.setItem(
      'recyclerProfile',
      JSON.stringify(
        updatedProfile
      )
    )

    const existingUser =
      JSON.parse(
        localStorage.getItem(
          'recyclerUser'
        ) ||
          localStorage.getItem(
            'user'
          ) ||
          'null'
      ) || {}

    localStorage.setItem(
      'recyclerUser',
      JSON.stringify({
        ...existingUser,
        ...updatedProfile,
        role: 'recycler',
      })
    )

    setEditing(false)
  }


  const handleChange = (e) => {
    const { name, value } =
      e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }


  const handleEdit = () => {
    setForm(profile)
    setEditing(true)
  }


  // =================================
  // INITIALS
  // =================================

  const initials =
    profile.organizationName
      .split(' ')
      .map(
        (word) => word[0]
      )
      .join('')
      .slice(0, 2)
      .toUpperCase()


  return (
    <div className="recycler-app">

      <Navbar />

      <main className="recycler-profile-page">

        {/* =================================
            HEADER
        ================================= */}

        <div className="profile-page-header">

          <div>

            <span className="eyebrow">
              ACCOUNT & VERIFICATION
            </span>

            <h1>
              Recycler Profile
            </h1>

            <p>
              Manage your organization details,
              verification and recycling preferences.
            </p>

          </div>


          {!editing ? (

            <button
              className="profile-edit-btn"
              onClick={handleEdit}
            >
              Edit Profile
            </button>

          ) : (

            <div
              style={{
                display: 'flex',
                gap: '10px',
              }}
            >

              <button
                className="profile-edit-btn"
                onClick={handleSave}
              >
                Save Changes
              </button>

              <button
                className="profile-edit-btn"
                onClick={() => {
                  setForm(profile)
                  setEditing(false)
                }}
              >
                Cancel
              </button>

            </div>

          )}

        </div>


        {/* =================================
            ERROR
        ================================= */}

        {error && (

          <div
            className="collections-info"
            style={{
              marginBottom: '20px',
            }}
          >

            <div className="collections-info-icon">
              !
            </div>

            <div>

              <strong>
                Profile data warning
              </strong>

              <p>
                {error}
              </p>

            </div>

          </div>

        )}


        <div className="profile-layout">

          {/* =================================
              LEFT
          ================================= */}

          <div className="profile-main">


            {/* ORGANIZATION */}

            <section className="profile-card organization-card">

              <div className="profile-cover">

                <div className="large-profile-avatar">
                  {initials}
                </div>

                <div className="verified-profile-badge">
                  ✓ Verified Recycler
                </div>

              </div>


              <div className="organization-content">

                <span className="card-eyebrow">
                  ORGANIZATION
                </span>

                <h2>
                  {profile.organizationName}
                </h2>

                <p className="profile-description">
                  {profile.description}
                </p>


                <div className="organization-meta">

                  <span>
                    ● {profile.operatingRegion}
                  </span>

                  <span>
                    ◉ {profile.email}
                  </span>

                  <span>
                    ◷ Joined —
                  </span>

                </div>

              </div>

            </section>


            {/* =================================
                BUSINESS INFORMATION
            ================================= */}

            <section className="profile-card">

              <div className="profile-card-heading">

                <div>

                  <span className="card-eyebrow">
                    BUSINESS INFORMATION
                  </span>

                  <h2>
                    Organization Details
                  </h2>

                </div>


                {!editing && (

                  <button
                    className="text-action"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>

                )}

              </div>


              {editing ? (

                <div className="profile-info-grid">

                  <div>

                    <span>
                      ORGANIZATION NAME
                    </span>

                    <input
                      name="organizationName"
                      value={
                        form.organizationName
                      }
                      onChange={handleChange}
                    />

                  </div>


                  <div>

                    <span>
                      CONTACT PERSON
                    </span>

                    <input
                      name="contactPerson"
                      value={
                        form.contactPerson
                      }
                      onChange={handleChange}
                    />

                  </div>


                  <div>

                    <span>
                      EMAIL ADDRESS
                    </span>

                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />

                  </div>


                  <div>

                    <span>
                      PHONE NUMBER
                    </span>

                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />

                  </div>


                  <div>

                    <span>
                      LOCATION
                    </span>

                    <input
                      name="location"
                      value={
                        form.location
                      }
                      onChange={handleChange}
                    />

                  </div>


                  <div>

                    <span>
                      OPERATING REGION
                    </span>

                    <input
                      name="operatingRegion"
                      value={
                        form.operatingRegion
                      }
                      onChange={handleChange}
                    />

                  </div>

                </div>

              ) : (

                <div className="profile-info-grid">

                  <div>
                    <span>
                      ORGANIZATION NAME
                    </span>

                    <strong>
                      {profile.organizationName}
                    </strong>
                  </div>


                  <div>
                    <span>
                      CONTACT PERSON
                    </span>

                    <strong>
                      {profile.contactPerson}
                    </strong>
                  </div>


                  <div>
                    <span>
                      EMAIL ADDRESS
                    </span>

                    <strong>
                      {profile.email}
                    </strong>
                  </div>


                  <div>
                    <span>
                      PHONE NUMBER
                    </span>

                    <strong>
                      {profile.phone}
                    </strong>
                  </div>


                  <div>
                    <span>
                      LOCATION
                    </span>

                    <strong>
                      {profile.location}
                    </strong>
                  </div>


                  <div>
                    <span>
                      OPERATING REGION
                    </span>

                    <strong>
                      {profile.operatingRegion}
                    </strong>
                  </div>

                </div>

              )}

            </section>


            {/* =================================
                CAPABILITIES
            ================================= */}

            <section className="profile-card">

              <div className="profile-card-heading">

                <div>

                  <span className="card-eyebrow">
                    RECYCLING CAPABILITIES
                  </span>

                  <h2>
                    Accepted E-Waste
                  </h2>

                </div>

              </div>


              <div className="accepted-materials">

                {acceptedMaterials.length === 0 ? (

                  <span>
                    No material categories
                    recorded yet
                  </span>

                ) : (

                  acceptedMaterials.map(
                    (material) => (

                      <span
                        key={material}
                      >
                        ♻️ {material}
                      </span>

                    )
                  )

                )}

              </div>

            </section>


            {/* =================================
                PREFERENCES
            ================================= */}

            <section className="profile-card">

              <div className="profile-card-heading">

                <div>

                  <span className="card-eyebrow">
                    OPERATING PREFERENCES
                  </span>

                  <h2>
                    Collection Preferences
                  </h2>

                </div>

              </div>


              <div className="preference-list">

                <div className="preference-item">

                  <div>

                    <strong>
                      Recycler Pickup
                    </strong>

                    <span>
                      Pickup workflow is available
                      through recycler offers.
                    </span>

                  </div>


                  <div className="toggle active">
                    <span />
                  </div>

                </div>


                <div className="preference-item">

                  <div>

                    <strong>
                      Demand Notifications
                    </strong>

                    <span>
                      Demand creation and
                      management are available.
                    </span>

                  </div>


                  <div className="toggle active">
                    <span />
                  </div>

                </div>


                <div className="preference-item">

                  <div>

                    <strong>
                      AI Assessment Alerts
                    </strong>

                    <span>
                      AI assessment results are
                      available with submitted e-waste.
                    </span>

                  </div>


                  <div className="toggle active">
                    <span />
                  </div>

                </div>

              </div>

            </section>

          </div>


          {/* =================================
              RIGHT SIDEBAR
          ================================= */}

          <aside className="profile-sidebar">


            {/* VERIFICATION */}

            <section className="verification-card">

              <div className="verification-icon">
                ✓
              </div>

              <span className="card-eyebrow">
                VERIFICATION STATUS
              </span>

              <h2>
                Verified Recycler
              </h2>

              <p>
                Recycler verification is currently
                represented at the prototype level.
                A dedicated verification API is not
                available in the current backend.
              </p>


              <div className="verification-items">

                <div>
                  <span>✓</span>
                  <strong>
                    Organization status
                  </strong>
                </div>

                <div>
                  <span>✓</span>
                  <strong>
                    Recycler access
                  </strong>
                </div>

                <div>
                  <span>✓</span>
                  <strong>
                    Platform access
                  </strong>
                </div>

              </div>


              <small>
                Verification date unavailable
              </small>

            </section>


            {/* =================================
                PERFORMANCE
            ================================= */}

            <section className="profile-performance">

              <span className="card-eyebrow">
                PERFORMANCE
              </span>

              <h2>
                Recycler Overview
              </h2>


              <div className="performance-stat">

                <strong>
                  —
                </strong>

                <span>
                  Average Rating
                </span>

              </div>


              <div className="performance-stat">

                <strong>
                  {completedCollections.length}
                </strong>

                <span>
                  Selected Collections
                </span>

              </div>


              <div className="performance-stat">

                <strong>
                  {totalUnits}
                </strong>

                <span>
                  Units in Selected Collections
                </span>

              </div>


              <div className="performance-stat">

                <strong>
                  {totalValue > 0
                    ? `₹${totalValue.toLocaleString(
                        'en-IN'
                      )}`
                    : '—'}
                </strong>

                <span>
                  Selected Offer Value
                </span>

              </div>

            </section>


            {/* =================================
                CTA
            ================================= */}

            <Link
              to="/recycler/demands/create"
              className="profile-cta"
            >
              + Create New Demand
            </Link>

          </aside>

        </div>

      </main>


      <Footer />

    </div>
  )
}

export default Profile