import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function DemandDetails() {
  const { id } = useParams()

  const [demand, setDemand] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDemand = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          'http://localhost:5000/api/demands'
        )

        const result = await response.json()

        if (!response.ok) {
          throw new Error(
            result.message || 'Failed to fetch demands'
          )
        }

        const foundDemand = (result.demands || []).find(
          (item) => String(item._id) === String(id)
        )

        if (!foundDemand) {
          throw new Error('Demand not found')
        }

        setDemand(foundDemand)
      } catch (err) {
        console.error('Demand Details Error:', err)
        setError(
          err.message || 'Failed to load demand details'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchDemand()
  }, [id])


  // -----------------------------------
  // LOADING
  // -----------------------------------

  if (loading) {
    return (
      <div className="demand-details-page">
        <div className="detail-card">
          <p>Loading demand details...</p>
        </div>
      </div>
    )
  }


  // -----------------------------------
  // ERROR
  // -----------------------------------

  if (error || !demand) {
    return (
      <div className="demand-details-page">

        <Link
          to="/demands"
          className="back-link"
        >
          ← Back to Nearby Demands
        </Link>

        <div className="detail-card">
          <h2>Demand Not Found</h2>

          <p className="detail-description">
            {error || 'This demand could not be found.'}
          </p>
        </div>

      </div>
    )
  }


  // -----------------------------------
  // DYNAMIC VALUES
  // -----------------------------------

  const category =
    demand.wasteType || 'E-Waste'

  const quantity =
    Number(demand.quantity || 0)

  const price =
    demand.minPrice !== undefined &&
    demand.maxPrice !== undefined
      ? `₹${Number(demand.minPrice).toLocaleString(
          'en-IN'
        )}–₹${Number(demand.maxPrice).toLocaleString(
          'en-IN'
        )}`
      : 'Price not specified'

  const priceUnit = 'per unit'

  const deadline = demand.deadline
    ? new Date(demand.deadline).toLocaleDateString(
        'en-IN',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }
      )
    : 'Not specified'

  const condition =
    demand.condition || 'Any Condition'

  const description =
    demand.description ||
    'No additional description provided by the recycler.'

  const requirements = [
    `Required quantity: ${quantity} units`,
    `Preferred condition: ${condition}`,
    'Devices may be subject to physical verification',
  ]

  const isExpired = demand.deadline
    ? new Date(demand.deadline) < new Date()
    : false


  return (
    <div className="demand-details-page">

      {/* =========================
          BACK
      ========================= */}

      <Link
        to="/demands"
        className="back-link"
      >
        ← Back to Nearby Demands
      </Link>


      {/* =========================
          HEADER
      ========================= */}

      <section className="demand-detail-header">

        <div>

          <span className="detail-label">
            RECYCLER DEMAND
          </span>

          <h1>
            {category}
          </h1>

          <p>
            Verified Recycler
            <span className="verified-badge">
              ✓ Demand
            </span>
          </p>

        </div>


        <div className="match-badge">

          <strong>
            —
          </strong>

          <span>
            Match
          </span>

        </div>

      </section>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="demand-detail-grid">


        {/* LEFT */}

        <div className="demand-detail-main">


          {/* Demand Information */}

          <section className="detail-card">

            <h2>
              Demand Information
            </h2>

            <div className="detail-info-grid">

              <div>
                <span>Category</span>

                <strong>
                  {category}
                </strong>
              </div>


              <div>
                <span>Quantity Required</span>

                <strong>
                  {quantity} units
                </strong>
              </div>


              <div>
                <span>Expected Price</span>

                <strong className="green-text">
                  {price}
                </strong>

                <small>
                  {priceUnit}
                </small>
              </div>


              <div>
                <span>Deadline</span>

                <strong>
                  {deadline}
                </strong>
              </div>


              <div>
                <span>Location</span>

                <strong>
                  {demand.location || 'Not specified'}
                </strong>
              </div>


              <div>
                <span>Distance</span>

                <strong>
                  —
                </strong>

                <small>
                  Location matching not available
                </small>
              </div>


              <div>
                <span>Condition</span>

                <strong>
                  {condition}
                </strong>
              </div>


              <div>
                <span>Status</span>

                <strong
                  className={
                    isExpired
                      ? ''
                      : 'green-text'
                  }
                >
                  {isExpired
                    ? 'Expired'
                    : 'Open'}
                </strong>
              </div>

            </div>

          </section>


          {/* Description */}

          <section className="detail-card">

            <h2>
              About This Demand
            </h2>

            <p className="detail-description">
              {description}
            </p>

          </section>


          {/* Requirements */}

          <section className="detail-card">

            <h2>
              Recycler Requirements
            </h2>

            <ul className="requirements-list">

              {requirements.map(
                (requirement, index) => (

                  <li key={index}>

                    <span>
                      ✓
                    </span>

                    {requirement}

                  </li>

                )
              )}

            </ul>

          </section>

        </div>


        {/* RIGHT */}

        <aside className="demand-detail-sidebar">


          {/* Action */}

          <section className="action-card">

            <span className="action-label">
              EXPECTED VALUE
            </span>

            <strong className="action-price">
              {price}
            </strong>

            <span className="action-unit">
              {priceUnit}
            </span>


            <div className="action-divider"></div>


            <div className="action-row">

              <span>
                Quantity
              </span>

              <strong>
                {quantity} units
              </strong>

            </div>


            <div className="action-row">

              <span>
                Deadline
              </span>

              <strong>
                {deadline}
              </strong>

            </div>


            {isExpired ? (

              <button
                className="primary-action"
                disabled
                style={{
                  opacity: 0.55,
                  cursor: 'not-allowed',
                }}
              >
                Demand Expired
              </button>

            ) : (

              <Link
                to={`/add-ewaste?demand=${demand._id}`}
                className="primary-action"
              >
                Add E-Waste for This Demand →
              </Link>

            )}


            <button
              className="secondary-action"
              onClick={() =>
                alert(
                  'Save Demand will be connected with user preferences later.'
                )
              }
            >
              ♡ Save Demand
            </button>

          </section>


          {/* Location */}

          <section className="detail-card location-card">

            <h2>
              Collection Location
            </h2>

            <div className="location-placeholder">
              📍
            </div>

            <strong>
              {demand.location || 'Not specified'}
            </strong>

            <span>
              Exact distance is not available
            </span>

            <button
              onClick={() =>
                alert(
                  'Map integration will be added with location matching.'
                )
              }
            >
              View on Map
            </button>

          </section>


          {/* Recycler */}

          <section className="detail-card recycler-card">

            <h2>
              Recycler
            </h2>

            <div className="recycler-profile">

              <div className="recycler-avatar">
                R
              </div>

              <div>

                <strong>
                  Verified Recycler
                </strong>

                <span>
                  ✓ Demand posted
                </span>

              </div>

            </div>


            <div className="recycler-stats">

              <div>

                <strong>
                  —
                </strong>

                <span>
                  Rating
                </span>

              </div>


              <div>

                <strong>
                  —
                </strong>

                <span>
                  Collections
                </span>

              </div>

            </div>

          </section>

        </aside>

      </div>

    </div>
  )
}

export default DemandDetails