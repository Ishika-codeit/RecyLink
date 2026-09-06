import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Offers() {
  const navigate = useNavigate()

  const [sortBy, setSortBy] = useState('best')
  const [selectedOffer, setSelectedOffer] = useState(null)

  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch real quotes
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true)

        const response = await fetch(
          'https://recylink-zt6e.onrender.com/api/quotes'
        )

        const result = await response.json()

        if (!response.ok) {
          throw new Error(
            result.message || 'Failed to fetch offers'
          )
        }

        const quotes = result.quotes || []

       const formattedOffers = quotes.map((quote) => ({
  id: quote._id,

  // Recycler identity will be dynamic later
  recycler: quote.recyclerName || 'Verified Recycler',
  verified: true,

  price: Number(quote.pricePerUnit) || 0,
  quantity: Number(quote.quantity) || 0,
  total: Number(quote.amount) || 0,

  pickup:
    quote.pickupType ||
    'Pickup details unavailable',

  validity:
    quote.validity ||
    '3 days',

  message:
    quote.message ||
    '',

  status:
    quote.status ||
    'PENDING',

  received: quote.createdAt
    ? new Date(
        quote.createdAt
      ).toLocaleString()
    : 'Recently',

  match: 0,
}))

        setOffers(formattedOffers)

      } catch (err) {
        console.error('Fetch Offers Error:', err)

        setError(
          err.message || 'Unable to load offers'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchOffers()
  }, [])


  const sortedOffers = useMemo(() => {
    return [...offers].sort((a, b) => {
      if (sortBy === 'price') {
        return b.price - a.price
      }

      return b.total - a.total
    })
  }, [offers, sortBy])


  const handleAccept = (offer) => {
    setSelectedOffer(offer)
  }


  const confirmAccept = async () => {
    if (!selectedOffer) return

    try {
      const response = await fetch(
        `https://recylink-zt6e.onrender.com/api/quotes/${selectedOffer.id}/select`,
        {
          method: 'PATCH',
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.message || 'Failed to accept offer'
        )
      }

      setOffers((previousOffers) =>
        previousOffers.map((offer) =>
          offer.id === selectedOffer.id
            ? {
                ...offer,
                status: 'SELECTED',
              }
            : offer
        )
      )

      setSelectedOffer(null)

      alert(
        'Offer accepted successfully!'
      )

    } catch (err) {
      console.error('Accept Offer Error:', err)

      alert(
        err.message ||
        'Unable to accept offer.'
      )
    }
  }


  return (
    <div className="offers-page">

      {/* Header */}
      <div className="offers-header">

        <div>

          <span className="page-label">
            RECYCLER QUOTES
          </span>

          <h1>
            My Offers
          </h1>

          <p>
            Compare offers from recyclers and choose the
            one that works best for you.
          </p>

        </div>


        <div className="offer-count">

          <strong>
            {offers.length}
          </strong>

          <span>
            Offers Received
          </span>

        </div>

      </div>


      {/* Loading */}
      {loading && (

        <div className="offer-info">

          <span>
            ⏳
          </span>

          <div>
            <strong>
              Loading offers...
            </strong>

            <p>
              Fetching recycler quotes from RecyLink.
            </p>
          </div>

        </div>

      )}


      {/* Error */}
      {!loading && error && (

        <div className="offer-info">

          <span>
            ⚠️
          </span>

          <div>
            <strong>
              Unable to load offers
            </strong>

            <p>
              {error}
            </p>
          </div>

        </div>

      )}


      {/* Submission Summary */}
      {!loading && !error && offers.length > 0 && (

        <section className="offer-summary">

          <div className="summary-device">

            <div className="summary-device-icon">
              ♻️
            </div>

            <div>

              <span>
                YOUR E-WASTE
              </span>

              <h3>
                Submitted E-Waste
              </h3>

              <p>
                Recycler offers received
              </p>

            </div>

          </div>


          <div className="summary-detail">

            <span>
              OFFERS
            </span>

            <strong className="ai-score">
              {offers.length} Received
            </strong>

          </div>


          <button
            className="view-assessment"
            onClick={() => navigate('/ai-assessment')}
          >
            View AI Result
          </button>

        </section>

      )}


      {/* Toolbar */}
      {!loading && !error && offers.length > 0 && (

        <div className="offers-toolbar">

          <div>

            <h2>
              Available Offers
            </h2>

            <p>
              {offers.length} recycler
              {offers.length !== 1 ? 's have' : ' has'}
              {' '}submitted quotes
            </p>

          </div>


          <div className="sort-control">

            <label>
              Sort by
            </label>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >

              <option value="best">
                Highest Value
              </option>

              <option value="price">
                Highest Price / Unit
              </option>

            </select>

          </div>

        </div>

      )}


      {/* Empty */}
      {!loading &&
        !error &&
        offers.length === 0 && (

        <div className="offer-info">

          <span>
            💬
          </span>

          <div>

            <strong>
              No offers received yet
            </strong>

            <p>
              Recycler quotes will appear here once
              recyclers submit their offers.
            </p>

          </div>

        </div>

      )}


      {/* Offers */}
      {!loading &&
        !error &&
        sortedOffers.length > 0 && (

        <div className="offers-list">

          {sortedOffers.map((offer, index) => (

            <div
              className={`offer-card ${
                index === 0 && sortBy === 'best'
                  ? 'best-offer'
                  : ''
              }`}
              key={offer.id}
            >

              {/* Top */}
              <div className="offer-card-top">

                <div className="recycler-info">

                  <div className="recycler-logo">
                    R
                  </div>

                  <div>

                    <div className="recycler-name">

                      <h3>
                        {offer.recycler}
                      </h3>

                      {offer.verified && (
                        <span className="verified-badge">
                          ✓ Verified
                        </span>
                      )}

                    </div>

                    <div className="recycler-rating">
                      RecyLink Partner
                    </div>

                  </div>

                </div>


                <div className="offer-right">

                  {index === 0 && sortBy === 'best' && (

                    <span className="best-badge">
                      ✦ Best Value
                    </span>

                  )}

                  <div className="match-badge">
                    {offer.status}
                  </div>

                </div>

              </div>


              {/* Main Offer Data */}
              <div className="offer-data">

                <div className="offer-price">

                  <span>
                    OFFER PRICE
                  </span>

                  <strong>
                    ₹{offer.price.toLocaleString('en-IN')}
                  </strong>

                  <small>
                    per unit
                  </small>

                </div>


                <div className="offer-data-item">

                  <span>
                    QUANTITY
                  </span>

                  <strong>
                    {offer.quantity} units
                  </strong>

                </div>


                <div className="offer-data-item">

                  <span>
                    ESTIMATED VALUE
                  </span>

                  <strong className="total-value">
                    ₹{offer.total.toLocaleString('en-IN')}
                  </strong>

                </div>


                <div className="offer-data-item">

                  <span>
                    VALIDITY
                  </span>

                  <strong>
                    {offer.validity}
                  </strong>

                </div>

              </div>


              {/* Details */}
              <div className="offer-details">

                <div>
                  <span>🚚</span>
                  {offer.pickup}
                </div>


                <div>
                  <span>🕒</span>
                  {offer.received}
                </div>


                <div className="offer-actions">

                  {offer.status === 'PENDING' ? (

                    <button
                      className="accept-button"
                      onClick={() =>
                        handleAccept(offer)
                      }
                    >
                      Accept Offer →
                    </button>

                  ) : (

                    <span className="verified-badge">
                      ✓ Offer Accepted
                    </span>

                  )}

                </div>

              </div>


              {/* Message */}
              {offer.message && (

                <div className="offer-message">

                  <strong>
                    Recycler Message:
                  </strong>

                  <p>
                    {offer.message}
                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      )}


      {/* Compare Note */}
      <div className="offer-info">

        <span>
          💡
        </span>

        <div>

          <strong>
            Compare before accepting
          </strong>

          <p>
            Check the offered price, quantity, pickup method
            and offer validity before selecting an offer.
            Once accepted, the recycler can proceed with collection.
          </p>

        </div>

      </div>


      {/* Confirmation */}
      {selectedOffer && (

        <div className="confirmation-overlay">

          <div className="confirmation-modal">

            <div className="confirmation-icon">
              ✓
            </div>

            <h2>
              Accept this offer?
            </h2>

            <p>
              You are about to accept this recycler's offer.
            </p>


            <div className="confirmation-value">

              <span>
                Offer Value
              </span>

              <strong>
                ₹{selectedOffer.total.toLocaleString('en-IN')}
              </strong>

            </div>


            <div className="modal-actions">

              <button
                className="cancel-button"
                onClick={() =>
                  setSelectedOffer(null)
                }
              >
                Cancel
              </button>


              <button
                className="confirm-button"
                onClick={confirmAccept}
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