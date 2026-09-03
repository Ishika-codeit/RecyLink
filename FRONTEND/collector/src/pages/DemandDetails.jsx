import { Link, useParams } from 'react-router-dom'

function DemandDetails() {

  const { id } = useParams()

  // Temporary mock data
  // Later backend se specific demand fetch hogi
  const demand = {
    id,
    recycler: 'EcoCycle Recycling',
    verified: true,

    material: 'Laptops',
    category: 'Laptop',

    quantity: 25,
    price: '₹450–₹650',
    priceUnit: 'per unit',

    location: 'Noida Sector 62',
    distance: '4.2 km',

    deadline: '12 Sep 2026',

    match: 94,

    condition: 'Working / Non-working',
    preferredCondition: 'Any condition',

    pickup: 'Recycler pickup available',

    description:
      'Looking for used and discarded laptops for responsible recycling and component recovery. Both working and non-working units are accepted.',

    requirements: [
      'Laptop should be complete with major components',
      'Damaged or non-working devices are also accepted',
      'Minimum quantity preferred: 5 units',
      'Devices should be available for physical verification',
    ],

    recyclerDetails: {
      name: 'EcoCycle Recycling',
      location: 'Noida, Uttar Pradesh',
      rating: '4.8 / 5',
      completed: 126,
    },
  }


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
            {demand.material}
          </h1>

          <p>
            {demand.recycler}
            {demand.verified && (
              <span className="verified-badge">
                ✓ Verified Recycler
              </span>
            )}
          </p>

        </div>


        <div className="match-badge">

          <strong>
            {demand.match}%
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


          {/* Key information */}

          <section className="detail-card">

            <h2>
              Demand Information
            </h2>

            <div className="detail-info-grid">

              <div>
                <span>Category</span>
                <strong>{demand.category}</strong>
              </div>

              <div>
                <span>Quantity Required</span>
                <strong>{demand.quantity} units</strong>
              </div>

              <div>
                <span>Expected Price</span>
                <strong className="green-text">
                  {demand.price}
                </strong>
                <small>{demand.priceUnit}</small>
              </div>

              <div>
                <span>Deadline</span>
                <strong>{demand.deadline}</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>{demand.location}</strong>
              </div>

              <div>
                <span>Distance</span>
                <strong>{demand.distance}</strong>
              </div>

              <div>
                <span>Condition</span>
                <strong>{demand.preferredCondition}</strong>
              </div>

              <div>
                <span>Pickup</span>
                <strong>{demand.pickup}</strong>
              </div>

            </div>

          </section>


          {/* Description */}

          <section className="detail-card">

            <h2>
              About This Demand
            </h2>

            <p className="detail-description">
              {demand.description}
            </p>

          </section>


          {/* Requirements */}

          <section className="detail-card">

            <h2>
              Recycler Requirements
            </h2>

            <ul className="requirements-list">

              {demand.requirements.map(
                (requirement, index) => (
                  <li key={index}>
                    <span>✓</span>
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
              {demand.price}
            </strong>

            <span className="action-unit">
              {demand.priceUnit}
            </span>


            <div className="action-divider"></div>


            <div className="action-row">
              <span>Quantity</span>
              <strong>
                {demand.quantity} units
              </strong>
            </div>

            <div className="action-row">
              <span>Deadline</span>
              <strong>
                {demand.deadline}
              </strong>
            </div>


            <Link
              to="/add-ewaste"
              className="primary-action"
            >
              Add E-Waste for This Demand →
            </Link>


            <button className="secondary-action">
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
              {demand.location}
            </strong>

            <span>
              {demand.distance} from your location
            </span>

            <button>
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
                E
              </div>

              <div>
                <strong>
                  {demand.recyclerDetails.name}
                </strong>

                <span>
                  ✓ Verified Recycler
                </span>
              </div>

            </div>

            <div className="recycler-stats">

              <div>
                <strong>
                  {demand.recyclerDetails.rating}
                </strong>
                <span>Rating</span>
              </div>

              <div>
                <strong>
                  {demand.recyclerDetails.completed}
                </strong>
                <span>Collections</span>
              </div>

            </div>

          </section>

        </aside>

      </div>

    </div>
  )
}

export default DemandDetails