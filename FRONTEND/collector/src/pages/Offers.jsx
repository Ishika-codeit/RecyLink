import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Offers() {
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState('best')
  const [selectedOffer, setSelectedOffer] = useState(null)

  const offers = [
    {
      id: 1,
      recycler: 'EcoCycle Recycling',
      verified: true,
      rating: 4.8,
      collections: 126,
      price: 580,
      quantity: 8,
      total: 4640,
      location: 'Noida Sector 62',
      distance: '4.2 km',
      pickup: 'Recycler Pickup',
      received: '2 hours ago',
      match: 96,
      tag: 'Best Match',
    },
    {
      id: 2,
      recycler: 'GreenTech Recyclers',
      verified: true,
      rating: 4.7,
      collections: 98,
      price: 545,
      quantity: 8,
      total: 4360,
      location: 'Ghaziabad',
      distance: '8.7 km',
      pickup: 'Recycler Pickup',
      received: '5 hours ago',
      match: 91,
      tag: '',
    },
    {
      id: 3,
      recycler: 'Clean Earth Recycling',
      verified: true,
      rating: 4.6,
      collections: 84,
      price: 520,
      quantity: 8,
      total: 4160,
      location: 'Delhi',
      distance: '6.1 km',
      pickup: 'Drop-off Available',
      received: 'Yesterday',
      match: 87,
      tag: '',
    },
    {
      id: 4,
      recycler: 'GreenLoop India',
      verified: true,
      rating: 4.5,
      collections: 72,
      price: 495,
      quantity: 8,
      total: 3960,
      location: 'Faridabad',
      distance: '12.3 km',
      pickup: 'Recycler Pickup',
      received: 'Yesterday',
      match: 82,
      tag: '',
    },
  ]

  const sortedOffers = [...offers].sort((a, b) => {
    if (sortBy === 'price') return b.price - a.price
    if (sortBy === 'distance') {
      return parseFloat(a.distance) - parseFloat(b.distance)
    }
    return b.match - a.match
  })

  const handleAccept = (offer) => {
    setSelectedOffer(offer)
  }

  return (
    <div className="offers-page">

      {/* Header */}
      <div className="offers-header">
        <div>
          <span className="page-label">RECYCLER QUOTES</span>
          <h1>My Offers</h1>
          <p>
            Compare offers from verified recyclers and choose the one
            that works best for you.
          </p>
        </div>

        <div className="offer-count">
          <strong>{offers.length}</strong>
          <span>Offers Received</span>
        </div>
      </div>

      {/* Submission Summary */}
      <section className="offer-summary">
        <div className="summary-device">
          <div className="summary-device-icon">💻</div>

          <div>
            <span>YOUR E-WASTE</span>
            <h3>Dell Latitude Laptop</h3>
            <p>8 units • 18.4 kg • Partially Working</p>
          </div>
        </div>

        <div className="summary-detail">
          <span>AI ASSESSMENT</span>
          <strong className="ai-score">72% Repairable</strong>
        </div>

        <div className="summary-detail">
          <span>DEMAND</span>
          <strong>EcoCycle Recycling</strong>
          <small>Noida Sector 62</small>
        </div>

        <button
          className="view-assessment"
          onClick={() => navigate('/ai-assessment')}
        >
          View AI Result
        </button>
      </section>

      {/* Toolbar */}
      <div className="offers-toolbar">
        <div>
          <h2>Available Offers</h2>
          <p>{offers.length} recyclers have submitted quotes</p>
        </div>

        <div className="sort-control">
          <label>Sort by</label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="best">Best Match</option>
            <option value="price">Highest Price</option>
            <option value="distance">Nearest</option>
          </select>
        </div>
      </div>

      {/* Offers */}
      <div className="offers-list">
        {sortedOffers.map((offer, index) => (
          <div
            className={`offer-card ${index === 0 && sortBy === 'best' ? 'best-offer' : ''}`}
            key={offer.id}
          >

            {/* Top */}
            <div className="offer-card-top">

              <div className="recycler-info">
                <div className="recycler-logo">
                  {offer.recycler.charAt(0)}
                </div>

                <div>
                  <div className="recycler-name">
                    <h3>{offer.recycler}</h3>

                    {offer.verified && (
                      <span className="verified-badge">
                        ✓ Verified
                      </span>
                    )}
                  </div>

                  <div className="recycler-rating">
                    ⭐ {offer.rating}
                    <span>•</span>
                    <span>{offer.collections} collections</span>
                  </div>
                </div>
              </div>

              <div className="offer-right">
                {offer.tag && (
                  <span className="best-badge">
                    ✦ {offer.tag}
                  </span>
                )}

                <div className="match-badge">
                  {offer.match}% Match
                </div>
              </div>

            </div>

            {/* Main Offer Data */}
            <div className="offer-data">

              <div className="offer-price">
                <span>OFFER PRICE</span>
                <strong>₹{offer.price}</strong>
                <small>per unit</small>
              </div>

              <div className="offer-data-item">
                <span>QUANTITY</span>
                <strong>{offer.quantity} units</strong>
              </div>

              <div className="offer-data-item">
                <span>ESTIMATED VALUE</span>
                <strong className="total-value">
                  ₹{offer.total.toLocaleString()}
                </strong>
              </div>

              <div className="offer-data-item">
                <span>RECEIVED</span>
                <strong>{offer.received}</strong>
              </div>

            </div>

            {/* Details */}
            <div className="offer-details">

              <div>
                <span>📍</span>
                {offer.location}
                <small>({offer.distance})</small>
              </div>

              <div>
                <span>🚚</span>
                {offer.pickup}
              </div>

              <div className="offer-actions">
                <button className="details-button">
                  View Details
                </button>

                <button
                  className="accept-button"
                  onClick={() => handleAccept(offer)}
                >
                  Accept Offer →
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Compare Note */}
      <div className="offer-info">
        <span>💡</span>

        <div>
          <strong>Compare before accepting</strong>
          <p>
            Check the offered price, pickup method, recycler rating and
            distance before selecting an offer. Once accepted, the
            recycler can proceed with the collection.
          </p>
        </div>
      </div>

      {/* Confirmation */}
      {selectedOffer && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">

            <div className="confirmation-icon">✓</div>

            <h2>Accept this offer?</h2>

            <p>
              You are about to accept the offer from
              <strong> {selectedOffer.recycler}</strong>.
            </p>

            <div className="confirmation-value">
              <span>Offer Value</span>
              <strong>
                ₹{selectedOffer.total.toLocaleString()}
              </strong>
            </div>

            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => setSelectedOffer(null)}
              >
                Cancel
              </button>

              <button
                className="confirm-button"
                onClick={() => {
                  setSelectedOffer(null)
                  alert(
                    `Offer from ${selectedOffer.recycler} accepted!`
                  )
                }}
              >
                Confirm & Accept
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default Offers