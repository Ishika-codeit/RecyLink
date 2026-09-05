import { Link } from 'react-router-dom'

const demands = [
  {
    id: 1,
    material: 'Laptops',
    category: 'Laptop',
    quantity: 25,
    location: 'Noida Sector 62',
    price: '₹450 – ₹650',
    deadline: '12 Sep 2026',
    status: 'Open',
  },
  {
    id: 2,
    material: 'Desktop Computers',
    category: 'Desktop',
    quantity: 15,
    location: 'Ghaziabad',
    price: '₹350 – ₹500',
    deadline: '15 Sep 2026',
    status: 'Open',
  },
  {
    id: 3,
    material: 'Mobile Phones',
    category: 'Mobile',
    quantity: 40,
    location: 'Delhi NCR',
    price: '₹120 – ₹250',
    deadline: '18 Sep 2026',
    status: 'Open',
  },
  {
    id: 4,
    material: 'Printers',
    category: 'Printer',
    quantity: 10,
    location: 'Faridabad',
    price: '₹300 – ₹450',
    deadline: '20 Sep 2026',
    status: 'Open',
  },
]

function Demands() {
  return (
    <div className="recycler-page demands-page">

      {/* Header */}
      <div className="page-header demands-header">

        <div>
          <span className="eyebrow">
            DEMAND MANAGEMENT
          </span>

          <h1>My Demands</h1>

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
          <span>ACTIVE DEMANDS</span>
          <strong>8</strong>
        </div>

        <div>
          <span>COLLECTOR RESPONSES</span>
          <strong>24</strong>
        </div>

        <div>
          <span>EXPIRING SOON</span>
          <strong>2</strong>
        </div>

      </div>


      {/* Toolbar */}
      <div className="demand-toolbar">

        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search demands..."
          />
        </div>

        <select defaultValue="all">
          <option value="all">All Categories</option>
          <option value="laptop">Laptops</option>
          <option value="desktop">Desktop</option>
          <option value="mobile">Mobile</option>
          <option value="printer">Printer</option>
        </select>

        <select defaultValue="active">
          <option value="active">Active</option>
          <option value="closed">Closed</option>
          <option value="all">All Status</option>
        </select>

      </div>


      {/* Demand cards */}
      <div className="recycler-demand-list">

        {demands.map((demand) => (

          <div
            className="recycler-demand-card"
            key={demand.id}
          >

            {/* Material */}
            <div className="recycler-material-icon">
              {demand.category === 'Laptop' && '💻'}
              {demand.category === 'Desktop' && '🖥️'}
              {demand.category === 'Mobile' && '📱'}
              {demand.category === 'Printer' && '🖨️'}
            </div>


            {/* Main */}
            <div className="recycler-demand-main">

              <div className="demand-title-row">

                <div>
                  <h2>{demand.material}</h2>

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
                  <span>QUANTITY</span>
                  <strong>{demand.quantity} units</strong>
                </div>

                <div>
                  <span>LOCATION</span>
                  <strong>{demand.location}</strong>
                </div>

                <div>
                  <span>PRICE RANGE</span>
                  <strong className="price-value">
                    {demand.price}
                  </strong>
                  <small>/ unit</small>
                </div>

                <div>
                  <span>DEADLINE</span>
                  <strong>{demand.deadline}</strong>
                </div>

              </div>

            </div>


            {/* Actions */}
            <div className="demand-actions">

              <button className="outline-btn">
                View
              </button>

              <button className="edit-btn">
                Edit
              </button>

            </div>

          </div>

        ))}

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