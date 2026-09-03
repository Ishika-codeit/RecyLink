import { Link } from 'react-router-dom'

function Dashboard() {

  // Temporary mock data
  // Later these values will come from backend APIs

  const collector = {
    name: 'Rahul Kumar',
    location: 'Delhi NCR',
    verified: true,
  }

  const stats = {
    nearbyDemands: 12,
    newOffers: 5,
    totalCollected: '248 kg',
    earnings: '₹18,450',
  }

  // Most relevant demand for this collector
  const recommendedDemand = {
    id: 1,
    recycler: 'EcoCycle Recycling',
    material: 'Laptops',
    quantity: 25,
    location: 'Noida Sector 62',
    distance: '4.2 km',
    price: '₹450–₹650 / unit',
    deadline: '12 Sep 2026',
    match: '94%',
  }

  const nearbyDemands = [
    {
      id: 1,
      recycler: 'EcoCycle Recycling',
      material: 'Laptops',
      quantity: 25,
      location: 'Noida',
      distance: '4.2 km',
      price: '₹450–₹650 / unit',
      deadline: '12 Sep 2026',
      status: 'Open',
    },
    {
      id: 2,
      recycler: 'GreenTech Recyclers',
      material: 'Desktop Computers',
      quantity: 15,
      location: 'Ghaziabad',
      distance: '8.7 km',
      price: '₹350–₹500 / unit',
      deadline: '15 Sep 2026',
      status: 'Open',
    },
    {
      id: 3,
      recycler: 'Clean Earth Recycling',
      material: 'Mobile Phones',
      quantity: 40,
      location: 'Delhi',
      distance: '6.1 km',
      price: '₹120–₹250 / unit',
      deadline: '18 Sep 2026',
      status: 'Open',
    },
    {
      id: 4,
      recycler: 'GreenLoop India',
      material: 'Printers',
      quantity: 10,
      location: 'Faridabad',
      distance: '12.3 km',
      price: '₹300–₹450 / unit',
      deadline: '20 Sep 2026',
      status: 'Open',
    },
  ]

  const activeCollections = [
    {
      id: 1,
      material: 'Desktop Computers',
      quantity: 12,
      recycler: 'GreenTech Recyclers',
      location: 'Ghaziabad',
      progress: 65,
      status: 'Collection in Progress',
    },
    {
      id: 2,
      material: 'Mobile Phones',
      quantity: 20,
      recycler: 'Clean Earth Recycling',
      location: 'Delhi',
      progress: 30,
      status: 'Awaiting Pickup',
    },
  ]

  const recentOffers = [
    {
      id: 1,
      recycler: 'EcoCycle Recycling',
      material: 'Laptops',
      quantity: 8,
      price: '₹580 / unit',
      received: '2 hours ago',
    },
    {
      id: 2,
      recycler: 'GreenTech Recyclers',
      material: 'Desktop Computers',
      quantity: 12,
      price: '₹420 / unit',
      received: 'Yesterday',
    },
    {
      id: 3,
      recycler: 'Clean Earth Recycling',
      material: 'Mobile Phones',
      quantity: 20,
      price: '₹210 / unit',
      received: '2 days ago',
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'offer',
      title: 'New recycler offer received',
      description: 'EcoCycle Recycling offered ₹580 per laptop.',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'ai',
      title: 'AI assessment completed',
      description: '8 laptops were assessed for repairability.',
      time: 'Yesterday',
    },
    {
      id: 3,
      type: 'upload',
      title: 'E-waste submitted',
      description: 'Laptop batch of 8 units submitted successfully.',
      time: 'Yesterday',
    },
    {
      id: 4,
      type: 'completed',
      title: 'Collection completed',
      description: '12 desktop computers collected successfully.',
      time: '2 days ago',
    },
  ]

  return (
    <div className="dashboard">

      {/* =================================
          WELCOME HEADER
      ================================= */}

      <section className="dashboard-header">

        <div>
          <p>Welcome back,</p>

          <h1>
            {collector.name}
          </h1>

          <span>
            📍 {collector.location}
          </span>
        </div>

        {collector.verified && (
          <div>
            <span>✓ Verified Collector</span>
          </div>
        )}

      </section>


      {/* =================================
          STATS
      ================================= */}

      <section className="stats-grid">

        <div className="stat-card">
          <span>Nearby Demands</span>
          <strong>{stats.nearbyDemands}</strong>
          <small>Open demands near you</small>
        </div>

        <div className="stat-card">
          <span>New Offers</span>
          <strong>{stats.newOffers}</strong>
          <small>Offers awaiting action</small>
        </div>

        <div className="stat-card">
          <span>E-Waste Collected</span>
          <strong>{stats.totalCollected}</strong>
          <small>Total material collected</small>
        </div>

        <div className="stat-card">
          <span>Total Earnings</span>
          <strong>{stats.earnings}</strong>
          <small>From completed collections</small>
        </div>

      </section>


      {/* =================================
          QUICK ACTIONS
      ================================= */}

      <section className="quick-actions">

        <h2>Quick Actions</h2>

        <div>

          <Link to="/demands">
            Find Nearby Demands
          </Link>

          <Link to="/add-ewaste">
            + Add E-Waste
          </Link>

          <Link to="/offers">
            View Offers
          </Link>

        </div>

      </section>


      {/* =================================
          RECOMMENDED DEMAND
      ================================= */}

      <section className="recommended-demand">

        <div className="recommended-header">

          <div>
            <span>RECOMMENDED FOR YOU</span>

            <h2>
              Best Matching Recycler Demand
            </h2>
          </div>

          <strong>
            {recommendedDemand.match} Match
          </strong>

        </div>


        <div className="recommended-content">

          <div className="recommended-main">

            <h3>
              {recommendedDemand.material}
            </h3>

            <p>
              {recommendedDemand.recycler}
            </p>

            <div className="recommended-details">

              <span>
                📦 {recommendedDemand.quantity} units
              </span>

              <span>
                📍 {recommendedDemand.location}
              </span>

              <span>
                🚗 {recommendedDemand.distance}
              </span>

            </div>

          </div>


          <div className="recommended-price">

            <small>Expected Value</small>

            <strong>
              {recommendedDemand.price}
            </strong>

            <span>
              Deadline: {recommendedDemand.deadline}
            </span>

          </div>


          <Link
            to={`/demands/${recommendedDemand.id}`}
            className="recommended-button"
          >
            View Demand →
          </Link>

        </div>

      </section>


      {/* =================================
          NEARBY DEMANDS
      ================================= */}

      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <h2>Nearby Recycler Demands</h2>

            <p>
              Demands matched to your location.
            </p>
          </div>

          <Link to="/demands">
            View All
          </Link>

        </div>


        <div className="demand-list">

          {nearbyDemands.map((demand) => (

            <div
              className="demand-item"
              key={demand.id}
            >

              <div>
                <h3>{demand.material}</h3>

                <p>{demand.recycler}</p>
              </div>

              <div>
                <span>
                  📦 {demand.quantity} units
                </span>

                <span>
                  📍 {demand.location}
                </span>
              </div>

              <div>
                <strong>
                  {demand.price}
                </strong>

                <small>
                  {demand.distance} · {demand.deadline}
                </small>
              </div>

              <div>
                <span>
                  {demand.status}
                </span>

                <Link to={`/demands/${demand.id}`}>
                  Details
                </Link>
              </div>

            </div>

          ))}

        </div>

      </section>


      {/* =================================
          ACTIVE COLLECTIONS
      ================================= */}

      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <h2>My Active Collections</h2>

            <p>
              Track the collections you have accepted.
            </p>
          </div>

        </div>


        <div className="active-collections">

          {activeCollections.map((collection) => (

            <div
              className="collection-card"
              key={collection.id}
            >

              <div className="collection-top">

                <div>
                  <h3>{collection.material}</h3>

                  <p>
                    {collection.recycler}
                  </p>
                </div>

                <span>
                  {collection.status}
                </span>

              </div>


              <div className="collection-info">

                <span>
                  📦 {collection.quantity} units
                </span>

                <span>
                  📍 {collection.location}
                </span>

              </div>


              <div className="progress-area">

                <div className="progress-label">
                  <span>Collection Progress</span>

                  <strong>
                    {collection.progress}%
                  </strong>
                </div>

                <div className="progress-bar">
                  <div
                    style={{
                      width: `${collection.progress}%`,
                    }}
                  ></div>
                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* =================================
          OFFERS + ACTIVITY
      ================================= */}

      <section className="dashboard-two-column">

        {/* OFFERS */}

        <div className="dashboard-panel">

          <div className="section-heading">

            <div>
              <h2>Recent Offers</h2>
              <p>Latest recycler offers.</p>
            </div>

            <Link to="/offers">
              View All
            </Link>

          </div>


          <div className="offer-list">

            {recentOffers.map((offer) => (

              <div
                className="offer-item"
                key={offer.id}
              >

                <div className="offer-icon">
                  ₹
                </div>

                <div className="offer-details">

                  <strong>
                    {offer.recycler}
                  </strong>

                  <span>
                    {offer.material} · {offer.quantity} units
                  </span>

                </div>

                <div className="offer-price">

                  <strong>
                    {offer.price}
                  </strong>

                  <small>
                    {offer.received}
                  </small>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* ACTIVITY */}

        <div className="dashboard-panel">

          <div className="section-heading">

            <div>
              <h2>Recent Activity</h2>
              <p>Your latest RecyLink activity.</p>
            </div>

          </div>


          <div className="activity-list">

            {recentActivity.map((activity) => (

              <div
                className="activity-item"
                key={activity.id}
              >

                <div className="activity-icon">

                  {activity.type === 'offer' && '₹'}
                  {activity.type === 'ai' && '✦'}
                  {activity.type === 'upload' && '↑'}
                  {activity.type === 'completed' && '✓'}

                </div>


                <div>

                  <strong>
                    {activity.title}
                  </strong>

                  <p>
                    {activity.description}
                  </p>

                  <small>
                    {activity.time}
                  </small>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =================================
          IMPACT
      ================================= */}

      <section className="impact-section">

        <div>
          <span>YOUR RECYCLING IMPACT</span>

          <h2>
            Making every collection count.
          </h2>

          <p>
            Your contribution helps divert electronic waste
            from informal disposal and connects it with
            responsible recycling.
          </p>
        </div>


        <div className="impact-stats">

          <div>
            <strong>248 kg</strong>
            <span>E-Waste Diverted</span>
          </div>

          <div>
            <strong>18</strong>
            <span>Collections Completed</span>
          </div>

          <div>
            <strong>7</strong>
            <span>Recyclers Connected</span>
          </div>

        </div>

      </section>

    </div>
  )
}

export default Dashboard