import { useState } from 'react'
import { Link } from 'react-router-dom'

function Demands() {

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Best Match')

  // Temporary mock data
  // Later this will come from backend + location matching service
  const demands = [
    {
      id: 1,
      recycler: 'EcoCycle Recycling',
      material: 'Laptops',
      category: 'Laptop',
      quantity: 25,
      location: 'Noida Sector 62',
      distance: 4.2,
      price: '₹450–₹650',
      priceUnit: '/ unit',
      deadline: '12 Sep 2026',
      match: 94,
      status: 'Open',
    },
    {
      id: 2,
      recycler: 'GreenTech Recyclers',
      material: 'Desktop Computers',
      category: 'Desktop',
      quantity: 15,
      location: 'Ghaziabad',
      distance: 8.7,
      price: '₹350–₹500',
      priceUnit: '/ unit',
      deadline: '15 Sep 2026',
      match: 89,
      status: 'Open',
    },
    {
      id: 3,
      recycler: 'Clean Earth Recycling',
      material: 'Mobile Phones',
      category: 'Mobile',
      quantity: 40,
      location: 'Delhi',
      distance: 6.1,
      price: '₹120–₹250',
      priceUnit: '/ unit',
      deadline: '18 Sep 2026',
      match: 86,
      status: 'Open',
    },
    {
      id: 4,
      recycler: 'GreenLoop India',
      material: 'Printers',
      category: 'Printer',
      quantity: 10,
      location: 'Faridabad',
      distance: 12.3,
      price: '₹300–₹450',
      priceUnit: '/ unit',
      deadline: '20 Sep 2026',
      match: 78,
      status: 'Open',
    },
    {
      id: 5,
      recycler: 'ReNew E-Waste Solutions',
      material: 'LED Monitors',
      category: 'Monitor',
      quantity: 18,
      location: 'Greater Noida',
      distance: 15.4,
      price: '₹250–₹400',
      priceUnit: '/ unit',
      deadline: '22 Sep 2026',
      match: 75,
      status: 'Open',
    },
    {
      id: 6,
      recycler: 'EcoRecover India',
      material: 'UPS & Batteries',
      category: 'Battery',
      quantity: 30,
      location: 'Delhi',
      distance: 10.8,
      price: '₹180–₹320',
      priceUnit: '/ unit',
      deadline: '24 Sep 2026',
      match: 71,
      status: 'Open',
    },
  ]


  // Search + category filter
  const filteredDemands = demands
    .filter((demand) => {

      const matchesSearch =
        demand.material
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        demand.recycler
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        demand.location
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesCategory =
        category === 'All' ||
        demand.category === category

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {

      if (sortBy === 'Best Match') {
        return b.match - a.match
      }

      if (sortBy === 'Nearest') {
        return a.distance - b.distance
      }

      return 0
    })


  return (
    <div className="demands-page">

      {/* ================================
          PAGE HEADER
      ================================= */}

      <div className="demands-header">

        <div>
          <span className="page-label">
            COLLECTOR MARKETPLACE
          </span>

          <h1>
            Nearby Recycler Demands
          </h1>

          <p>
            Find e-waste demands from verified recyclers
            near your location.
          </p>
        </div>

        <div className="demand-count">
          <strong>{filteredDemands.length}</strong>
          <span>matching demands</span>
        </div>

      </div>


      {/* ================================
          FILTER BAR
      ================================= */}

      <div className="demand-filters">

        {/* Search */}

        <div className="search-box">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search e-waste, recycler or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Laptop">Laptop</option>
          <option value="Desktop">Desktop</option>
          <option value="Mobile">Mobile</option>
          <option value="Printer">Printer</option>
          <option value="Monitor">Monitor</option>
          <option value="Battery">Battery</option>
          <option value="Other">Other</option>
        </select>


        {/* Sort */}

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="Best Match">Best Match</option>
          <option value="Nearest">Nearest First</option>
        </select>

      </div>


      {/* ================================
          LOCATION NOTICE
      ================================= */}

      <div className="location-notice">

        <div>
          <strong>📍 Your location: Delhi NCR</strong>

          <span>
            Showing demands within your nearby service area.
          </span>
        </div>

        <button>
          Update Location
        </button>

      </div>


      {/* ================================
          DEMANDS LIST
      ================================= */}

      <div className="demands-list">

        {filteredDemands.length > 0 ? (

          filteredDemands.map((demand) => (

            <div
              className="demand-card"
              key={demand.id}
            >

              {/* Top */}

              <div className="demand-card-top">

                <div className="demand-material">

                  <div className="material-icon">
                    ♻
                  </div>

                  <div>
                    <h2>{demand.material}</h2>

                    <p>
                      {demand.recycler}
                    </p>
                  </div>

                </div>


                <div className="match-score">
                  <strong>
                    {demand.match}%
                  </strong>

                  <span>
                    Match
                  </span>
                </div>

              </div>


              {/* Details */}

              <div className="demand-card-details">

                <div>
                  <span>Quantity Required</span>
                  <strong>
                    {demand.quantity} units
                  </strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>
                    {demand.location}
                  </strong>
                </div>

                <div>
                  <span>Distance</span>
                  <strong>
                    {demand.distance} km
                  </strong>
                </div>

                <div>
                  <span>Expected Price</span>
                  <strong className="price">
                    {demand.price}
                    <small>{demand.priceUnit}</small>
                  </strong>
                </div>

                <div>
                  <span>Deadline</span>
                  <strong>
                    {demand.deadline}
                  </strong>
                </div>

              </div>


              {/* Bottom */}

              <div className="demand-card-bottom">

                <span className="open-status">
                  ● {demand.status}
                </span>

                <Link
                  to={`/demands/${demand.id}`}
                >
                  View Demand →
                </Link>

              </div>

            </div>

          ))

        ) : (

          <div className="no-demands">

            <div>
              🔍
            </div>

            <h2>
              No matching demands
            </h2>

            <p>
              Try changing your search or category filter.
            </p>

          </div>

        )}

      </div>

    </div>
  )
}

export default Demands