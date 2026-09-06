import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Demands() {

  const [demands, setDemands] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('active')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  // Fetch demands from backend
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

            material: item.wasteType,

            category: item.wasteType,

            quantity: item.quantity,

            location: item.location,

            minPrice: item.minPrice,

            maxPrice: item.maxPrice,

            price:
              item.minPrice !== undefined &&
              item.maxPrice !== undefined
                ? `₹${item.minPrice} – ₹${item.maxPrice}`
                : 'Price not specified',

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

            condition:
              item.condition || 'Any Condition',

            description:
              item.description || '',

            status: 'Open',

          }))


        setDemands(formattedDemands)

      } catch (err) {

        console.error(
          'Fetch Recycler Demands Error:',
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


  // Search + filters
  const filteredDemands = demands.filter(
    (demand) => {

      const searchText =
        search.toLowerCase()

      const matchesSearch =
        demand.material
          ?.toLowerCase()
          .includes(searchText) ||

        demand.location
          ?.toLowerCase()
          .includes(searchText) ||

        demand.condition
          ?.toLowerCase()
          .includes(searchText)


      const matchesCategory =
        category === 'all' ||
        demand.category?.toLowerCase() === category


      const matchesStatus =
        status === 'all' ||
        (
          status === 'active' &&
          demand.status === 'Open'
        ) ||
        (
          status === 'closed' &&
          demand.status === 'Closed'
        )


      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      )

    }
  )


  // Loading
  if (loading) {

    return (

      <div className="recycler-page demands-page">

        <div className="no-demands">

          <h2>
            Loading demands...
          </h2>

          <p>
            Fetching your latest demands.
          </p>

        </div>

      </div>

    )

  }


  // Error
  if (error) {

    return (

      <div className="recycler-page demands-page">

        <div className="no-demands">

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

    <div className="recycler-page demands-page">


      {/* Header */}

      <div className="page-header demands-header">

        <div>

          <span className="eyebrow">
            DEMAND MANAGEMENT
          </span>

          <h1>
            My Demands
          </h1>

          <p>
            Create and manage your e-waste requirements
            for verified collectors.
          </p>

        </div>


        <Link
          to="/recycler/demands/create"
          className="primary-btn"
        >
          + Create Demand
        </Link>

      </div>



      {/* Summary */}

      <div className="demand-summary">

        <div>

          <span>
            ACTIVE DEMANDS
          </span>

          <strong>
            {demands.filter(
              (demand) =>
                demand.status === 'Open'
            ).length}
          </strong>

        </div>


        <div>

          <span>
            COLLECTOR RESPONSES
          </span>

          <strong>
            0
          </strong>

        </div>


        <div>

          <span>
            EXPIRING SOON
          </span>

          <strong>
            0
          </strong>

        </div>

      </div>



      {/* Toolbar */}

      <div className="demand-toolbar">

        <div className="search-box">

          <span>
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search demands..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >

          <option value="all">
            All Categories
          </option>

          <option value="laptop">
            Laptops
          </option>

          <option value="desktop">
            Desktop
          </option>

          <option value="mobile">
            Mobile
          </option>

          <option value="printer">
            Printer
          </option>

          <option value="monitor">
            Monitor
          </option>

          <option value="battery">
            Battery
          </option>

          <option value="pcb">
            PCB
          </option>

          <option value="other">
            Other
          </option>

        </select>


        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >

          <option value="active">
            Active
          </option>

          <option value="closed">
            Closed
          </option>

          <option value="all">
            All Status
          </option>

        </select>

      </div>



      {/* Demand cards */}

      <div className="recycler-demand-list">

        {filteredDemands.length > 0 ? (

          filteredDemands.map(
            (demand) => (

              <div
                className="recycler-demand-card"
                key={demand.id}
              >


                {/* Material Icon */}

                <div className="recycler-material-icon">

                  {demand.category === 'Laptop' && '💻'}

                  {demand.category === 'Desktop' && '🖥️'}

                  {demand.category === 'Mobile' && '📱'}

                  {demand.category === 'Printer' && '🖨️'}

                  {demand.category === 'Monitor' && '🖥️'}

                  {demand.category === 'Battery' && '🔋'}

                  {demand.category === 'PCB' && '🔌'}

                  {demand.category === 'Other' && '♻️'}

                </div>



                {/* Main */}

                <div className="recycler-demand-main">

                  <div className="demand-title-row">

                    <div>

                      <h2>
                        {demand.material}
                      </h2>

                      <span className="category-label">
                        {demand.category}
                      </span>

                    </div>


                    <span className="demand-status">

                      <i></i>

                      {demand.status}

                    </span>

                  </div>



                  <div className="demand-meta">


                    <div>

                      <span>
                        QUANTITY
                      </span>

                      <strong>
                        {demand.quantity} units
                      </strong>

                    </div>


                    <div>

                      <span>
                        LOCATION
                      </span>

                      <strong>
                        {demand.location}
                      </strong>

                    </div>


                    <div>

                      <span>
                        PRICE RANGE
                      </span>

                      <strong className="price-value">
                        {demand.price}
                      </strong>

                      <small>
                        / unit
                      </small>

                    </div>


                    <div>

                      <span>
                        DEADLINE
                      </span>

                      <strong>
                        {demand.deadline}
                      </strong>

                    </div>

                  </div>



                  <div
                    style={{
                      marginTop: '10px',
                      fontSize: '13px',
                      color: '#668078',
                    }}
                  >

                    Preferred condition:{' '}

                    <strong>
                      {demand.condition}
                    </strong>

                  </div>

                </div>



                {/* Actions */}

                <div className="demand-actions">

                  <button
                    className="outline-btn"
                    type="button"
                  >
                    View
                  </button>

                  <button
                    className="edit-btn"
                    type="button"
                  >
                    Edit
                  </button>

                </div>

              </div>

            )
          )

        ) : (

          <div className="no-demands">

            <div>
              🔍
            </div>

            <h2>
              No demands found
            </h2>

            <p>
              Try changing your search or filters,
              or create a new demand.
            </p>

          </div>

        )}

      </div>



      {/* Bottom info */}

      <div className="demand-info-banner">

        <div className="info-banner-icon">
          ♻
        </div>

        <div>

          <strong>
            Your demands reach verified collectors
          </strong>

          <p>
            Collectors can discover your requirements,
            submit matching e-waste and receive your offers.
          </p>

        </div>

      </div>

    </div>

  )
}

export default Demands