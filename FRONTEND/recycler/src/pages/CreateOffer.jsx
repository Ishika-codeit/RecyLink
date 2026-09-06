import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function CreateOffer() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const ewasteId = searchParams.get('ewaste')

  const [waste, setWaste] = useState(null)
  const [loadingWaste, setLoadingWaste] = useState(true)
  const [wasteError, setWasteError] = useState('')

  const [form, setForm] = useState({
    pricePerUnit: '580',
    quantity: '1',
    pickupType: 'Recycler Pickup',
    validity: '3 days',
    notes: '',
  })

  // Fetch selected e-waste
  useEffect(() => {
    const fetchWaste = async () => {
      if (!ewasteId) {
        setWasteError('E-Waste submission ID is missing.')
        setLoadingWaste(false)
        return
      }

      try {
        setLoadingWaste(true)

        const response = await fetch(
          'https://recylink-zt6e.onrender.com/api/waste'
        )

        const result = await response.json()

        if (!response.ok) {
          throw new Error(
            result.message || 'Failed to fetch e-waste'
          )
        }

        const foundWaste = result.wastes?.find(
          (item) => item._id === ewasteId
        )

        if (!foundWaste) {
          throw new Error(
            'Selected e-waste submission was not found.'
          )
        }

        setWaste(foundWaste)

        // Automatically use collector submitted quantity
        setForm((previousForm) => ({
          ...previousForm,
          quantity: String(foundWaste.quantity || 1),
        }))

      } catch (error) {
        console.error(
          'Fetch E-Waste Error:',
          error
        )

        setWasteError(
          error.message ||
          'Unable to load e-waste details.'
        )
      } finally {
        setLoadingWaste(false)
      }
    }

    fetchWaste()
  }, [ewasteId])

  const totalValue = useMemo(() => {
    const price = Number(form.pricePerUnit) || 0
    const quantity = Number(form.quantity) || 0

    return price * quantity
  }, [form.pricePerUnit, form.quantity])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!ewasteId) {
      alert('E-Waste submission ID is missing.')
      return
    }

    if (!waste) {
      alert('E-Waste details are not available.')
      return
    }

    try {
      const response = await fetch(
        'https://recylink-zt6e.onrender.com/api/quotes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wasteId: ewasteId,

            // Temporary MVP value until recycler authentication
            // is connected with the backend.
            collectorId:
              waste.collectorName || 'collector',

            amount: totalValue,

            pricePerUnit:
              Number(form.pricePerUnit),

            quantity:
              Number(form.quantity),

            pickupType:
              form.pickupType,

            validity:
              form.validity,

            message:
              form.notes,
          }),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.message ||
          'Failed to create offer'
        )
      }

      console.log(
        'Offer Created:',
        result
      )

      alert(
        `Offer sent successfully!\n\n₹${totalValue.toLocaleString(
          'en-IN'
        )} for ${form.quantity} units`
      )

      navigate('/recycler/ewaste')

    } catch (error) {
      console.error(
        'Create Offer Error:',
        error
      )

      alert(
        error.message ||
        'Something went wrong while creating the offer.'
      )
    }
  }

  // Loading state
  if (loadingWaste) {
    return (
      <div className="recycler-app">
        <Navbar />

        <main className="create-offer-page">
          <div className="offer-info">
            <span>⏳</span>

            <div>
              <strong>
                Loading e-waste submission...
              </strong>

              <p>
                Fetching assessment details.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  // Error state
  if (wasteError || !waste) {
    return (
      <div className="recycler-app">
        <Navbar />

        <main className="create-offer-page">
          <div className="offer-info">
            <span>⚠️</span>

            <div>
              <strong>
                Unable to load submission
              </strong>

              <p>
                {wasteError ||
                  'E-Waste submission not found.'}
              </p>

              <Link
                to="/recycler/ewaste"
                className="secondary-btn"
              >
                ← Back to E-Waste
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  const category =
    waste.category ||
    waste.wasteType ||
    'E-Waste'

  const quantity =
    waste.quantity || 1

  const condition =
    waste.condition ||
    'Condition not specified'

  const location =
    waste.location ||
    'Location unavailable'

  const recommendation =
    waste.recommendation
      ? waste.recommendation.replaceAll(
          '_',
          ' '
        )
      : 'Pending'

  const collectorName =
    waste.collectorName ||
    'Unknown Collector'

  return (
    <div className="recycler-app">
      <Navbar />

      <main className="create-offer-page">

        {/* Header */}
        <div className="offer-page-header">

          <div>

            <Link
              to={`/recycler/ewaste/${ewasteId}`}
              className="back-link"
            >
              ← Back to E-Waste Assessment
            </Link>

            <span className="eyebrow">
              OFFER MANAGEMENT
            </span>

            <h1>
              Create Offer
            </h1>

            <p>
              Send a competitive price quote to the
              collector based on the submitted e-waste
              and AI-assisted assessment.
            </p>

          </div>

          <div className="offer-header-badge">
            <span>
              SUBMISSION
            </span>

            <strong>
              #{ewasteId}
            </strong>
          </div>

        </div>


        <form
          onSubmit={handleSubmit}
          className="offer-form-layout"
        >

          {/* Main Form */}
          <div className="offer-form-main">

            {/* Submission summary */}
            <section className="offer-card submission-preview">

              <div className="offer-card-heading">

                <div>

                  <span className="card-eyebrow">
                    COLLECTOR SUBMISSION
                  </span>

                  <h2>
                    E-Waste Summary
                  </h2>

                </div>

                <span className="verified-pill">
                  AI Assessed
                </span>

              </div>


              <div className="submission-preview-body">

                <div className="offer-device-icon">
                  ♻️
                </div>

                <div>

                  <h3>
                    {category}
                  </h3>

                  <p>
                    {waste.wasteType || category}
                    {' · '}
                    {quantity} unit
                    {quantity !== 1 ? 's' : ''}
                  </p>

                  <div className="summary-tags">

                    <span>
                      {condition}
                    </span>

                    <span>
                      {recommendation}
                    </span>

                    <span>
                      {location}
                    </span>

                  </div>

                </div>

              </div>

            </section>


            {/* Pricing */}
            <section className="offer-card">

              <div className="offer-card-heading">

                <div>

                  <span className="card-eyebrow">
                    PRICING
                  </span>

                  <h2>
                    Offer Details
                  </h2>

                  <p>
                    Set the price you are willing to pay
                    for this submission.
                  </p>

                </div>

              </div>


              <div className="offer-form-grid">

                <div className="form-field">

                  <label>
                    Price per Unit <span>*</span>
                  </label>

                  <div className="input-prefix">

                    <span>
                      ₹
                    </span>

                    <input
                      type="number"
                      name="pricePerUnit"
                      value={form.pricePerUnit}
                      onChange={handleChange}
                      min="1"
                      required
                    />

                  </div>

                  <small>
                    Suggested range: ₹450 – ₹650 / unit
                  </small>

                </div>


                <div className="form-field">

                  <label>
                    Quantity <span>*</span>
                  </label>

                  <div className="input-suffix">

                    <input
                      type="number"
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      min="1"
                      max={quantity}
                      required
                    />

                    <span>
                      units
                    </span>

                  </div>

                  <small>
                    Collector submitted {quantity}{' '}
                    unit
                    {quantity !== 1 ? 's' : ''}
                  </small>

                </div>

              </div>


              {/* Total */}
              <div className="offer-total-box">

                <div>

                  <span>
                    Total Offer Value
                  </span>

                  <small>
                    ₹
                    {Number(
                      form.pricePerUnit || 0
                    ).toLocaleString('en-IN')}
                    {' × '}
                    {form.quantity || 0}
                    {' units'}
                  </small>

                </div>

                <strong>
                  ₹
                  {totalValue.toLocaleString(
                    'en-IN'
                  )}
                </strong>

              </div>

            </section>


            {/* Collection */}
            <section className="offer-card">

              <div className="offer-card-heading">

                <div>

                  <span className="card-eyebrow">
                    COLLECTION
                  </span>

                  <h2>
                    Pickup Preferences
                  </h2>

                </div>

              </div>


              <div className="pickup-options">

                <label
                  className={`pickup-option ${
                    form.pickupType ===
                    'Recycler Pickup'
                      ? 'selected'
                      : ''
                  }`}
                >

                  <input
                    type="radio"
                    name="pickupType"
                    value="Recycler Pickup"
                    checked={
                      form.pickupType ===
                      'Recycler Pickup'
                    }
                    onChange={handleChange}
                  />

                  <div className="pickup-icon">
                    🚚
                  </div>

                  <div>

                    <strong>
                      Recycler Pickup
                    </strong>

                    <span>
                      We will arrange collection
                      from {location}.
                    </span>

                  </div>

                </label>


                <label
                  className={`pickup-option ${
                    form.pickupType ===
                    'Collector Drop-off'
                      ? 'selected'
                      : ''
                  }`}
                >

                  <input
                    type="radio"
                    name="pickupType"
                    value="Collector Drop-off"
                    checked={
                      form.pickupType ===
                      'Collector Drop-off'
                    }
                    onChange={handleChange}
                  />

                  <div className="pickup-icon">
                    📦
                  </div>

                  <div>

                    <strong>
                      Collector Drop-off
                    </strong>

                    <span>
                      Collector delivers the material
                      to recycler.
                    </span>

                  </div>

                </label>

              </div>

            </section>


            {/* Additional */}
            <section className="offer-card">

              <div className="offer-card-heading">

                <div>

                  <span className="card-eyebrow">
                    ADDITIONAL TERMS
                  </span>

                  <h2>
                    Offer Conditions
                  </h2>

                </div>

              </div>


              <div className="form-field">

                <label>
                  Offer Validity
                </label>

                <select
                  name="validity"
                  value={form.validity}
                  onChange={handleChange}
                >

                  <option value="1 day">
                    1 day
                  </option>

                  <option value="3 days">
                    3 days
                  </option>

                  <option value="5 days">
                    5 days
                  </option>

                  <option value="7 days">
                    7 days
                  </option>

                </select>

              </div>


              <div className="form-field">

                <label>
                  Message to Collector
                </label>

                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Add pickup instructions or additional terms..."
                  rows="4"
                />

              </div>

            </section>


            <div className="offer-actions">

              <Link
                to={`/recycler/ewaste/${ewasteId}`}
                className="secondary-btn"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="primary-btn"
              >
                Send Offer →
              </button>

            </div>

          </div>


          {/* Sidebar */}
          <aside className="offer-sidebar">

            <section className="offer-summary-card">

              <span className="card-eyebrow">
                OFFER SUMMARY
              </span>

              <h2>
                Your Quote
              </h2>


              <div className="quote-price">

                <span>
                  Total value
                </span>

                <strong>
                  ₹
                  {totalValue.toLocaleString(
                    'en-IN'
                  )}
                </strong>

              </div>


              <div className="quote-row">

                <span>
                  Price / unit
                </span>

                <strong>
                  ₹
                  {Number(
                    form.pricePerUnit || 0
                  ).toLocaleString(
                    'en-IN'
                  )}
                </strong>

              </div>


              <div className="quote-row">

                <span>
                  Quantity
                </span>

                <strong>
                  {form.quantity} units
                </strong>

              </div>


              <div className="quote-row">

                <span>
                  Pickup
                </span>

                <strong>
                  {form.pickupType}
                </strong>

              </div>


              <div className="quote-row">

                <span>
                  Validity
                </span>

                <strong>
                  {form.validity}
                </strong>

              </div>


              <div className="quote-divider" />


              <div className="collector-mini">

                <div className="profile-avatar">

                  {collectorName
                    .split(' ')
                    .map(
                      (word) =>
                        word[0]
                    )
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}

                </div>

                <div>

                  <strong>
                    {collectorName}
                  </strong>

                  <span>
                    Verified Collector
                  </span>

                </div>

              </div>

            </section>


            <div className="offer-ai-note">

              <span>
                ✦
              </span>

              <div>

                <strong>
                  AI-assisted pricing
                </strong>

                <p>
                  The suggested range is based on
                  the submission category, condition
                  and AI assessment. Final pricing is
                  decided by the recycler.
                </p>

              </div>

            </div>

          </aside>

        </form>

      </main>

      <Footer />
    </div>
  )
}

export default CreateOffer