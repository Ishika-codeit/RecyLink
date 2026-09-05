import { useEffect, useMemo, useState } from 'react'

function Profile() {
  const [activeTab, setActiveTab] = useState('overview')
  const [editing, setEditing] = useState(false)

  const [wastes, setWastes] = useState([])
  const [quotes, setQuotes] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loggedInUser = JSON.parse(
    localStorage.getItem('user') || 'null'
  )

  const savedProfile = JSON.parse(
    localStorage.getItem('collectorProfile') || 'null'
  )

  const [profile, setProfile] = useState(
    savedProfile || {
      name: loggedInUser?.name || 'Collector',
      email: loggedInUser?.email || '',
      phone: '',
      serviceArea: 'Delhi NCR',
      collectorType: 'Independent Collector',
    }
  )

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true)
        setError('')

        const [wasteResponse, quoteResponse] =
          await Promise.all([
            fetch('http://localhost:5000/api/waste'),
            fetch('http://localhost:5000/api/quotes'),
          ])

        const wasteResult = await wasteResponse.json()
        const quoteResult = await quoteResponse.json()

        if (!wasteResponse.ok) {
          throw new Error(
            wasteResult.message ||
              'Failed to fetch collection data'
          )
        }

        if (!quoteResponse.ok) {
          throw new Error(
            quoteResult.message ||
              'Failed to fetch offer data'
          )
        }

        setWastes(wasteResult.wastes || [])
        setQuotes(quoteResult.quotes || [])
      } catch (err) {
        console.error('Profile Data Error:', err)

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


  // -----------------------------------
  // COLLECTOR NAME
  // -----------------------------------

  const collectorName =
    profile.name ||
    loggedInUser?.name ||
    'Collector'


  // -----------------------------------
  // FILTER COLLECTOR DATA
  // -----------------------------------

  const collectorWastes = useMemo(() => {
    return wastes.filter((item) => {
      if (!item.collectorName) return false

      return (
        item.collectorName.trim().toLowerCase() ===
        collectorName.trim().toLowerCase()
      )
    })
  }, [wastes, collectorName])


  const collectorQuotes = useMemo(() => {
    return quotes.filter((quote) => {
      if (!quote.collectorId) return false

      return (
        String(quote.collectorId)
          .trim()
          .toLowerCase() ===
        collectorName.trim().toLowerCase()
      )
    })
  }, [quotes, collectorName])


  // -----------------------------------
  // COMPLETED COLLECTIONS
  // -----------------------------------

  const completedCollections = useMemo(() => {
    return collectorQuotes.filter(
      (quote) => quote.status === 'SELECTED'
    )
  }, [collectorQuotes])


  // -----------------------------------
  // TOTAL UNITS
  // -----------------------------------

  const totalUnits = useMemo(() => {
    return collectorWastes.reduce(
      (sum, item) =>
        sum + Number(item.quantity || 0),
      0
    )
  }, [collectorWastes])


  // -----------------------------------
  // UNIQUE RECYCLER ACTIVITY
  // -----------------------------------

  const recyclerConnections = useMemo(() => {
    /*
      Backend currently does not store a recycler
      user/profile identity.

      Therefore this counts quote activity rather
      than pretending to know actual recycler names.
    */

    return collectorQuotes.length
  }, [collectorQuotes])


  // -----------------------------------
  // PROFILE SAVE
  // -----------------------------------

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })
  }


  const handleSaveProfile = () => {
    localStorage.setItem(
      'collectorProfile',
      JSON.stringify(profile)
    )

    // Keep login identity in sync
    const currentUser = JSON.parse(
      localStorage.getItem('user') || '{}'
    )

    localStorage.setItem(
      'user',
      JSON.stringify({
        ...currentUser,
        name: profile.name,
        email: profile.email,
        role: 'collector',
      })
    )

    setEditing(false)

    alert('Profile updated successfully!')
  }


  // -----------------------------------
  // INITIALS
  // -----------------------------------

  const getInitials = (name) => {
    if (!name) return 'C'

    return name
      .trim()
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }


  // -----------------------------------
  // COLLECTION FORMAT
  // -----------------------------------

  const recentCollections = useMemo(() => {
    return completedCollections
      .map((quote) => {
        const waste = wastes.find(
          (item) =>
            String(item._id) ===
            String(quote.wasteId)
        )

        return {
          id: quote._id,
          material:
            waste?.category ||
            waste?.wasteType ||
            'E-Waste',
          quantity:
            Number(quote.quantity) ||
            Number(waste?.quantity) ||
            0,
          location:
            waste?.location ||
            'Location unavailable',
          date: quote.createdAt
            ? new Date(
                quote.createdAt
              ).toLocaleDateString(
                'en-IN',
                {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                }
              )
            : 'Date unavailable',
          amount:
            Number(quote.amount) || 0,
        }
      })
      .slice(0, 10)
  }, [completedCollections, wastes])


  // -----------------------------------
  // LOADING
  // -----------------------------------

  if (loading) {
    return (
      <div className="profile-page">
        <section className="profile-card">
          <p>Loading profile...</p>
        </section>
      </div>
    )
  }


  return (
    <div className="profile-page">

      {/* ERROR */}

      {error && (
        <section
          className="profile-card"
          style={{ marginBottom: '20px' }}
        >
          <p style={{ color: '#c0392b' }}>
            {error}
          </p>
        </section>
      )}


      {/* =========================
          PROFILE HEADER
      ========================= */}

      <section className="profile-hero">

        <div className="profile-main">

          <div className="profile-avatar">
            {getInitials(collectorName)}
          </div>


          <div className="profile-identity">

            <div className="profile-name-row">

              <h1>
                {collectorName}
              </h1>

              <span className="verified-profile">
                ✓ Collector Account
              </span>

            </div>


            <p>
              {profile.collectorType}
            </p>


            <div className="profile-meta">

              <span>
                📍 {profile.serviceArea}
              </span>

              <span>•</span>

              <span>
                RecyLink Collector
              </span>

            </div>

          </div>

        </div>


        <button
          className="edit-profile-button"
          onClick={() =>
            setEditing(!editing)
          }
        >
          {editing
            ? 'Cancel'
            : '✎ Edit Profile'}
        </button>

      </section>


      {/* =========================
          EDIT PROFILE
      ========================= */}

      {editing && (

        <section className="profile-card">

          <div className="profile-card-heading">

            <div>
              <h2>
                Edit Profile
              </h2>

              <p>
                Update your collector information
              </p>
            </div>

          </div>


          <div className="profile-info-list">

            <div>

              <span>
                Full Name
              </span>

              <input
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
              />

            </div>


            <div>

              <span>
                Email Address
              </span>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
              />

            </div>


            <div>

              <span>
                Phone Number
              </span>

              <input
                name="phone"
                placeholder="Enter phone number"
                value={profile.phone}
                onChange={handleProfileChange}
              />

            </div>


            <div>

              <span>
                Service Area
              </span>

              <input
                name="serviceArea"
                value={profile.serviceArea}
                onChange={handleProfileChange}
              />

            </div>

          </div>


          <button
            className="save-profile-btn"
            onClick={handleSaveProfile}
          >
            Save Changes
          </button>

        </section>

      )}


      {/* =========================
          TABS
      ========================= */}

      <div className="profile-tabs">

        <button
          className={
            activeTab === 'overview'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActiveTab('overview')
          }
        >
          Overview
        </button>


        <button
          className={
            activeTab === 'collections'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActiveTab('collections')
          }
        >
          My Collections
        </button>


        <button
          className={
            activeTab === 'settings'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActiveTab('settings')
          }
        >
          Account Settings
        </button>

      </div>


      {/* =========================
          OVERVIEW
      ========================= */}

      {activeTab === 'overview' && (

        <>

          {/* STATS */}

          <section className="profile-stats">

            <div className="profile-stat">

              <span>♻️</span>

              <div>

                <strong>
                  {totalUnits}
                </strong>

                <small>
                  E-Waste Units
                </small>

              </div>

            </div>


            <div className="profile-stat">

              <span>📦</span>

              <div>

                <strong>
                  {completedCollections.length}
                </strong>

                <small>
                  Completed Collections
                </small>

              </div>

            </div>


            <div className="profile-stat">

              <span>🏢</span>

              <div>

                <strong>
                  {recyclerConnections}
                </strong>

                <small>
                  Recycler Interactions
                </small>

              </div>

            </div>


            <div className="profile-stat">

              <span>⭐</span>

              <div>

                <strong>
                  —
                </strong>

                <small>
                  Rating unavailable
                </small>

              </div>

            </div>

          </section>


          {/* TWO COLUMNS */}

          <div className="profile-grid">


            {/* INFORMATION */}

            <section className="profile-card">

              <div className="profile-card-heading">

                <div>

                  <h2>
                    Collector Information
                  </h2>

                  <p>
                    Your current account information
                  </p>

                </div>

              </div>


              <div className="profile-info-list">

                <div>
                  <span>
                    Full Name
                  </span>

                  <strong>
                    {profile.name}
                  </strong>
                </div>


                <div>
                  <span>
                    Phone Number
                  </span>

                  <strong>
                    {profile.phone ||
                      'Not provided'}
                  </strong>
                </div>


                <div>
                  <span>
                    Email Address
                  </span>

                  <strong>
                    {profile.email ||
                      'Not provided'}
                  </strong>
                </div>


                <div>
                  <span>
                    Service Area
                  </span>

                  <strong>
                    {profile.serviceArea}
                  </strong>
                </div>


                <div>
                  <span>
                    Collector Type
                  </span>

                  <strong>
                    {profile.collectorType}
                  </strong>
                </div>


                <div>
                  <span>
                    Account Status
                  </span>

                  <strong className="active-account">
                    ● Active
                  </strong>
                </div>

              </div>

            </section>


            {/* IMPACT */}

            <section className="profile-card impact-card">

              <div className="profile-card-heading">

                <div>

                  <h2>
                    Platform Contribution
                  </h2>

                  <p>
                    Your activity on RecyLink
                  </p>

                </div>

              </div>


              <div className="impact-big">

                <strong>
                  {totalUnits}
                </strong>

                <span>
                  e-waste units submitted
                </span>

              </div>


              <div className="impact-stat-line">

                <span>
                  Collections Completed
                </span>

                <strong>
                  {completedCollections.length}
                </strong>

              </div>


              <div className="impact-bar">

                <span
                  style={{
                    width:
                      completedCollections.length > 0
                        ? '100%'
                        : '0%',
                  }}
                ></span>

              </div>


              <div className="impact-stat-line">

                <span>
                  Recycler Interactions
                </span>

                <strong>
                  {recyclerConnections}
                </strong>

              </div>


              <div className="impact-bar">

                <span
                  style={{
                    width:
                      recyclerConnections > 0
                        ? '100%'
                        : '0%',
                  }}
                ></span>

              </div>


              <div className="impact-message">

                🌱 Your submissions help connect
                collected e-waste with the formal
                recycling ecosystem.

              </div>

            </section>

          </div>


          {/* RECENT COLLECTIONS */}

          <section className="profile-card recent-collections">

            <div className="profile-card-heading">

              <div>

                <h2>
                  Recent Collections
                </h2>

                <p>
                  Your latest selected recycler offers
                </p>

              </div>


              <button
                className="view-all-button"
                onClick={() =>
                  setActiveTab('collections')
                }
              >
                View All →
              </button>

            </div>


            <div className="collection-table">

              <div className="table-header">

                <span>
                  Material
                </span>

                <span>
                  Location
                </span>

                <span>
                  Quantity
                </span>

                <span>
                  Date
                </span>

                <span>
                  Amount
                </span>

                <span>
                  Status
                </span>

              </div>


              {recentCollections.length === 0 ? (

                <div className="table-row">

                  <span>
                    No completed collections yet.
                  </span>

                </div>

              ) : (

                recentCollections.map(
                  (item) => (

                    <div
                      className="table-row"
                      key={item.id}
                    >

                      <strong>
                        {item.material}
                      </strong>

                      <span>
                        {item.location}
                      </span>

                      <span>
                        {item.quantity} units
                      </span>

                      <span>
                        {item.date}
                      </span>

                      <strong className="earning">
                        {item.amount > 0
                          ? `₹${item.amount.toLocaleString(
                              'en-IN'
                            )}`
                          : '—'}
                      </strong>

                      <span className="completed-status">
                        ✓ Selected
                      </span>

                    </div>

                  )
                )

              )}

            </div>

          </section>

        </>

      )}


      {/* =========================
          COLLECTIONS
      ========================= */}

      {activeTab === 'collections' && (

        <section className="profile-card">

          <div className="profile-card-heading">

            <div>

              <h2>
                My Collections
              </h2>

              <p>
                Collections linked to your account
              </p>

            </div>

          </div>


          <div className="full-collection-list">

            {recentCollections.length === 0 ? (

              <p>
                No completed collections available.
              </p>

            ) : (

              recentCollections.map(
                (item) => (

                  <div
                    className="full-collection-item"
                    key={item.id}
                  >

                    <div className="collection-item-icon">
                      ♻️
                    </div>


                    <div className="collection-item-main">

                      <h3>
                        {item.material}
                      </h3>

                      <p>
                        {item.quantity} units
                      </p>

                      <small>
                        📍 {item.location} •{' '}
                        {item.date}
                      </small>

                    </div>


                    <div className="collection-item-right">

                      <strong>
                        {item.amount > 0
                          ? `₹${item.amount.toLocaleString(
                              'en-IN'
                            )}`
                          : '—'}
                      </strong>

                      <span>
                        ✓ Selected
                      </span>

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </section>

      )}


      {/* =========================
          SETTINGS
      ========================= */}

      {activeTab === 'settings' && (

        <section className="profile-card settings-card">

          <div className="profile-card-heading">

            <div>

              <h2>
                Account Settings
              </h2>

              <p>
                Manage your RecyLink account preferences
              </p>

            </div>

          </div>


          <div className="settings-list">


            <div className="setting-item">

              <div>

                <strong>
                  Notification Preferences
                </strong>

                <p>
                  Receive alerts for new demands
                  and recycler offers.
                </p>

              </div>

              <button
                className="setting-action"
                onClick={() =>
                  alert(
                    'Notification preferences will be connected with the notification service.'
                  )
                }
              >
                Manage
              </button>

            </div>


            <div className="setting-item">

              <div>

                <strong>
                  Service Location
                </strong>

                <p>
                  {profile.serviceArea}
                </p>

              </div>

              <button
                className="setting-action"
                onClick={() => setEditing(true)}
              >
                Update
              </button>

            </div>


            <div className="setting-item">

              <div>

                <strong>
                  Privacy & Security
                </strong>

                <p>
                  Account security controls will be
                  available with authentication APIs.
                </p>

              </div>

              <button
                className="setting-action"
                onClick={() =>
                  alert(
                    'Security management is not available in the current backend.'
                  )
                }
              >
                Manage
              </button>

            </div>


            <div className="setting-item">

              <div>

                <strong>
                  Help & Support
                </strong>

                <p>
                  Contact the RecyLink support team.
                </p>

              </div>

              <button
                className="setting-action"
                onClick={() =>
                  alert(
                    'Support contact functionality can be connected later.'
                  )
                }
              >
                Contact
              </button>

            </div>

          </div>

        </section>

      )}

    </div>
  )
}

export default Profile