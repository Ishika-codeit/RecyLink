import { Link } from 'react-router-dom'

const submissions = [
  {
    id: 101,
    collector: 'Rahul Kumar',
    initials: 'RK',
    device: 'Dell Latitude Laptop',
    category: 'Laptop',
    quantity: 5,
    weight: '11.5 kg',
    condition: 'Partially Working',
    aiScore: 94,
    recommendation: 'Repair',
    location: 'Delhi NCR',
    submitted: '2 hours ago',
    status: 'Awaiting Offer',
  },
  {
    id: 102,
    collector: 'Aman Sharma',
    initials: 'AS',
    device: 'Desktop Computer',
    category: 'Desktop',
    quantity: 8,
    weight: '24 kg',
    condition: 'Non-Working',
    aiScore: 91,
    recommendation: 'Refurbish',
    location: 'Ghaziabad',
    submitted: '5 hours ago',
    status: 'Awaiting Offer',
  },
  {
    id: 103,
    collector: 'Priya Mehta',
    initials: 'PM',
    device: 'Samsung Mobile Phones',
    category: 'Mobile',
    quantity: 12,
    weight: '4.8 kg',
    condition: 'Partially Working',
    aiScore: 96,
    recommendation: 'Repair',
    location: 'Delhi',
    submitted: 'Yesterday',
    status: 'Offer Sent',
  },
  {
    id: 104,
    collector: 'Vikash Singh',
    initials: 'VS',
    device: 'HP Laser Printer',
    category: 'Printer',
    quantity: 6,
    weight: '18 kg',
    condition: 'Non-Working',
    aiScore: 88,
    recommendation: 'Recycle',
    location: 'Faridabad',
    submitted: 'Yesterday',
    status: 'Offer Sent',
  },
]

function EWaste() {
  return (
    <div className="recycler-app">

      <div className="ewaste-content">

        {/* Header */}
        <div className="ewaste-header">

          <div>
            <Link
              to="/recycler"
              className="back-link"
            >
              ← Dashboard
            </Link>

            <span className="eyebrow">
              COLLECTOR SUBMISSIONS
            </span>

            <h1>Incoming E-Waste</h1>

            <p>
              Review collector submissions, AI assessments and
              create competitive offers.
            </p>
          </div>

        </div>


        {/* Stats */}
        <div className="ewaste-stats">

          <div className="ewaste-stat">
            <span>NEW SUBMISSIONS</span>
            <strong>12</strong>
            <small>+4 today</small>
          </div>

          <div className="ewaste-stat">
            <span>AWAITING OFFER</span>
            <strong>7</strong>
            <small>Requires action</small>
          </div>

          <div className="ewaste-stat">
            <span>AI ASSESSED</span>
            <strong>24</strong>
            <small>100% processed</small>
          </div>

          <div className="ewaste-stat">
            <span>TOTAL WEIGHT</span>
            <strong>186 kg</strong>
            <small>This month</small>
          </div>

        </div>


        {/* Toolbar */}
        <div className="ewaste-toolbar">

          <div className="ewaste-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search collector or device..."
            />
          </div>

          <select defaultValue="all">
            <option value="all">
              All Categories
            </option>

            <option>Laptops</option>
            <option>Desktop</option>
            <option>Mobile</option>
            <option>Printer</option>
          </select>

          <select defaultValue="pending">
            <option value="pending">
              Awaiting Offer
            </option>

            <option>Offer Sent</option>
            <option>All Submissions</option>
          </select>

        </div>


        {/* Submission list */}
        <div className="ewaste-list">

          {submissions.map((item) => (

            <div
              className="ewaste-card"
              key={item.id}
            >

              {/* Collector */}
              <div className="ewaste-collector">

                <div className="collector-avatar large">
                  {item.initials}
                </div>

                <div>
                  <strong>{item.collector}</strong>

                  <span>
                    {item.location}
                  </span>

                  <small>
                    Submitted {item.submitted}
                  </small>
                </div>

              </div>


              {/* Device */}
              <div className="ewaste-device">

                <div className="device-icon">
                  {item.category === 'Laptop' && '💻'}
                  {item.category === 'Desktop' && '🖥️'}
                  {item.category === 'Mobile' && '📱'}
                  {item.category === 'Printer' && '🖨️'}
                </div>

                <div>
                  <strong>{item.device}</strong>

                  <span>
                    {item.quantity} units · {item.weight}
                  </span>

                  <small>
                    Condition: {item.condition}
                  </small>
                </div>

              </div>


              {/* AI */}
              <div className="ai-assessment">

                <div className="ai-score">
                  <strong>
                    {item.aiScore}%
                  </strong>

                  <span>
                    AI Confidence
                  </span>
                </div>

                <div className="ai-recommendation">
                  <span>RECOMMENDATION</span>

                  <strong>
                    {item.recommendation}
                  </strong>
                </div>

              </div>


              {/* Status */}
              <div className="ewaste-status-area">

                <span
                  className={
                    item.status === 'Awaiting Offer'
                      ? 'ewaste-status pending'
                      : 'ewaste-status sent'
                  }
                >
                  {item.status}
                </span>

                {item.status === 'Awaiting Offer' ? (
                  <Link
                    to={`/recycler/ewaste/${item.id}`}
                    className="offer-btn"
                  >
                    Review & Offer →
                  </Link>
                ) : (
                  <Link
                    to={`/recycler/ewaste/${item.id}`}
                    className="view-btn"
                  >
                    View Details
                  </Link>
                )}

              </div>

            </div>

          ))}

        </div>


        {/* Info */}
        <div className="ewaste-info-banner">

          <div className="ewaste-info-icon">
            AI
          </div>

          <div>
            <strong>
              AI-assisted e-waste assessment
            </strong>

            <p>
              RecyLink analyzes uploaded e-waste images and
              basic condition information to help recyclers
              make faster repair, refurbish or recycle decisions.
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default EWaste