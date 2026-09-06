import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Demands() {

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Best Match')

  const [demands, setDemands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  // Fetch actual recycler demands from backend
  useEffect(() => {

    const fetchDemands = async () => {

      try {

        setLoading(true)
        setError('')

        const response = await fetch(
          'https://recylink-zt6e.onrender.com/api/demands'
        )

        const result = await response.json()

        if (!response.ok) {
          throw new Error(
            result.message || 'Failed to fetch demands'
          )
        }


        const formattedDemands =
          (result.demands || []).map((item) => ({

            id: item._id,

            // Recycler name is not stored in current backend model
            recycler: 'Verified Recycler',

            material: item.wasteType,

            category: item.wasteType,

            quantity: item.quantity,

            location: item.location,

            // Location matching is not implemented yet
            distance: 0,

            price:
              item.minPrice !== undefined &&
              item.maxPrice !== undefined
                ? `₹${item.minPrice}–₹${item.maxPrice}`
                : 'Price not specified',

            priceUnit: '/ unit',

            deadline: item.deadline
              ? new Date(
                  item.deadline
                ).toLocaleDateString(
                  'en-IN',
                  {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }
                )
              : 'Not specified',

            // Matching service is not implemented yet
            match: 0,

            status: 'Open',

            condition:
              item.condition || 'Any Condition',

            description:
              item.description || '',

          }))


        setDemands(formattedDemands)

      } catch (err) {

        console.error(
          'Fetch Demands Error:',
          err
        )

        setError(
          err.message ||
          'Unable to load demands'
        )

      } finally {

        setLoading(false)

      }

    }


    fetchDemands()

  }, [])


  // Search + category filter
  const filteredDemands = demands
    .filter((demand) => {

      const searchText =
        search.toLowerCase()

      const matchesSearch =
        demand.material
          ?.toLowerCase()
          .includes(searchText) ||

        demand.recycler
          ?.toLowerCase()
          .includes(searchText) ||

        demand.location
          ?.toLowerCase()
          .includes(searchText)


      const matchesCategory =
        category === 'All' ||
        demand.category === category


      return (
        matchesSearch &&
        matchesCategory
      )

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


  // Loading state
  if (loading) {

    return (

      <div className="demands-page">

        <div className="no-demands">

          <div>
            ♻
          </div>

          <h2>
            Loading demands...
          </h2>

          <p>
            Fetching the latest recycler demands.
          </p>

        </div>

      </div>

    )

  }


  // Error state
  if (error) {

    return (

      <div className="demands-page">

        <div className="no-demands">

          <div>
            ⚠️
          </div>

          <h2>
            Unable to load demands
          </h2>

          <p>
            {error}
          </p>

        </div>

      </div>

    )

  }


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

          <strong>
            {filteredDemands.length}
          </strong>

          <span>
            matching demands
          </span>

        </div>

      </div>



      {/* ================================
          FILTER BAR
      ================================= */}

      <div className="demand-filters">


        {/* Search */}

        <div className="search-box">

          <span>
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search e-waste, recycler or location..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>



        {/* Category */}

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >

          <option value="All">
            All Categories
          </option>

          <option value="Laptop">
            Laptop
          </option>

          <option value="Desktop">
            Desktop
          </option>

          <option value="Mobile">
            Mobile
          </option>

          <option value="Printer">
            Printer
          </option>

          <option value="Monitor">
            Monitor
          </option>

          <option value="Battery">
            Battery
          </option>

          <option value="PCB">
            PCB
          </option>

          <option value="Other">
            Other
          </option>

        </select>



        {/* Sort */}

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >

          <option value="Best Match">
            Best Match
          </option>

          <option value="Nearest">
            Nearest First
          </option>

        </select>

      </div>



      {/* ================================
          LOCATION NOTICE
      ================================= */}

      <div className="location-notice">

        <div>

          <strong>
            📍 Your location: Delhi NCR
          </strong>

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

                    <h2>
                      {demand.material}
                    </h2>

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

                  <span>
                    Quantity Required
                  </span>

                  <strong>
                    {demand.quantity} units
                  </strong>

                </div>


                <div>

                  <span>
                    Location
                  </span>

                  <strong>
                    {demand.location}
                  </strong>

                </div>


                <div>

                  <span>
                    Distance
                  </span>

                  <strong>
                    {demand.distance > 0
                      ? `${demand.distance} km`
                      : 'Not available'}
                  </strong>

                </div>


                <div>

                  <span>
                    Expected Price
                  </span>

                  <strong className="price">

                    {demand.price}

                    <small>
                      {demand.priceUnit}
                    </small>

                  </strong>

                </div>


                <div>

                  <span>
                    Deadline
                  </span>

                  <strong>
                    {demand.deadline}
                  </strong>

                </div>

              </div>



              {/* Condition */}

              {demand.condition && (

                <div
                  style={{
                    marginTop: '12px',
                    fontSize: '13px',
                    color: '#668078',
                  }}
                >

                  Preferred condition:{' '}

                  <strong>
                    {demand.condition}
                  </strong>

                </div>

              )}



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