import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

function EWasteDetails() {
  const { id } = useParams()

  const [waste, setWaste] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchWaste = async () => {
      try {
        setLoading(true)

        const response = await fetch(
          'http://localhost:5000/api/waste'
        )

        const result = await response.json()

        if (!response.ok) {
          throw new Error(
            result.message || 'Failed to fetch e-waste'
          )
        }

        const foundWaste = result.wastes?.find(
          (item) => item._id === id
        )

        if (!foundWaste) {
          throw new Error('E-waste submission not found')
        }

        setWaste(foundWaste)

      } catch (err) {
        console.error('Fetch Waste Details Error:', err)
        setError(err.message || 'Unable to load submission')
      } finally {
        setLoading(false)
      }
    }

    fetchWaste()
  }, [id])


  if (loading) {
    return (
      <div className="recycler-app">
        <Navbar />

        <main className="ewaste-details-page">
          <div className="details-card">
            <h2>Loading E-Waste Assessment...</h2>
            <p>
              Fetching submission and AI assessment from RecyLink.
            </p>
          </div>
        </main>
      </div>
    )
  }


  if (error || !waste) {
    return (
      <div className="recycler-app">
        <Navbar />

        <main className="ewaste-details-page">

          <div className="details-card">

            <h2>
              Unable to load submission
            </h2>

            <p>
              {error || 'Submission not found'}
            </p>

            <Link
              to="/recycler/ewaste"
              className="create-offer-btn"
            >
              ← Back to E-Waste
            </Link>

          </div>

        </main>
      </div>
    )
  }


  const classificationConfidence = Math.round(
    (waste.classificationConfidence || 0) * 100
  )

  const repairabilityConfidence = Math.round(
    (waste.repairabilityConfidence || 0) * 100
  )

  const recommendation =
    waste.recommendation
      ?.replaceAll('_', ' ') || 'PENDING'


  const getDeviceIcon = () => {
    switch (waste.category) {
      case 'Laptop':
        return '💻'
      case 'Desktop':
        return '🖥️'
      case 'Mobile':
        return '📱'
      case 'Mouse':
        return '🖱️'
      case 'Keyboard':
        return '⌨️'
      case 'Printer':
        return '🖨️'
      case 'Television':
        return '📺'
      case 'Battery':
        return '🔋'
      default:
        return '♻️'
    }
  }


  return (
    <div className="recycler-app">

      <Navbar />

      <main className="ewaste-details-page">

        {/* Header */}
        <div className="details-header">

          <div>

            <Link
              to="/recycler/ewaste"
              className="back-link"
            >
              ← Back to Incoming E-Waste
            </Link>

            <span className="eyebrow">
              SUBMISSION #{id.slice(-6).toUpperCase()}
            </span>

            <h1>
              E-Waste Assessment
            </h1>

            <p>
              Review the collector submission and AI-assisted
              assessment before creating an offer.
            </p>

          </div>

          <span className="details-status">
            Awaiting Offer
          </span>

        </div>


        {/* Main layout */}
        <div className="details-grid">

          {/* LEFT */}
          <div className="details-main">


            {/* E-Waste summary */}
            <section className="details-card waste-summary-card">

              <div className="waste-device-icon">
                {getDeviceIcon()}
              </div>

              <div className="waste-summary-content">

                <span className="card-eyebrow">
                  E-WASTE SUBMISSION
                </span>

                <h2>
                  {waste.category || waste.wasteType}
                </h2>

                <p>
                  {waste.wasteType} · {waste.quantity} units
                </p>

                <div className="summary-tags">

                  <span>
                    {waste.condition}
                  </span>

                  <span>
                    {waste.location}
                  </span>

                  <span>
                    Submitted{' '}
                    {new Date(waste.createdAt).toLocaleString()}
                  </span>

                </div>

              </div>

            </section>


            {/* AI Assessment */}
            <section className="details-card ai-details-card">

              <div className="details-card-heading">

                <div>

                  <span className="card-eyebrow">
                    ARTIFICIAL INTELLIGENCE
                  </span>

                  <h2>
                    AI Assessment
                  </h2>

                  <p>
                    Automated analysis based on the uploaded
                    e-waste image and condition information.
                  </p>

                </div>

                <div className="ai-powered-badge">
                  ✦ AI Powered
                </div>

              </div>


              <div className="ai-result-grid">

                {/* Score */}
                <div className="ai-score-large">

                  <div className="score-circle">

                    <strong>
                      {classificationConfidence}%
                    </strong>

                    <span>
                      Confidence
                    </span>

                  </div>

                  <p>
                    AI classification confidence
                  </p>

                </div>


                {/* Recommendation */}
                <div className="ai-recommendation-large">

                  <span>
                    RECOMMENDED ACTION
                  </span>

                  <strong>
                    {recommendation}
                  </strong>

                  <p>
                    {waste.reason ||
                      'AI assessment information is available for recycler review.'}
                  </p>

                </div>

              </div>


              {/* AI insight */}
              <div className="ai-insight">

                <div className="insight-icon">
                  ✦
                </div>

                <div>

                  <strong>
                    AI Insight
                  </strong>

                  <p>
                    Repairability confidence:{' '}
                    <strong>
                      {repairabilityConfidence}%
                    </strong>
                    {' · '}
                    Reuse potential:{' '}
                    <strong>
                      {waste.reusePotential || 'N/A'}
                    </strong>
                  </p>

                </div>

              </div>

            </section>


            {/* Device information */}
            <section className="details-card">

              <div className="details-card-heading">

                <div>

                  <span className="card-eyebrow">
                    SUBMISSION INFORMATION
                  </span>

                  <h2>
                    Device Details
                  </h2>

                </div>

              </div>


              <div className="device-info-grid">

                <div>
                  <span>
                    DEVICE / TYPE
                  </span>

                  <strong>
                    {waste.wasteType}
                  </strong>
                </div>


                <div>
                  <span>
                    AI CATEGORY
                  </span>

                  <strong>
                    {waste.category}
                  </strong>
                </div>


                <div>
                  <span>
                    QUANTITY
                  </span>

                  <strong>
                    {waste.quantity} units
                  </strong>
                </div>


                <div>
                  <span>
                    CONDITION
                  </span>

                  <strong>
                    {waste.condition}
                  </strong>
                </div>


                <div>
                  <span>
                    LOCATION
                  </span>

                  <strong>
                    {waste.location}
                  </strong>
                </div>


                <div>
                  <span>
                    REUSE POTENTIAL
                  </span>

                  <strong>
                    {waste.reusePotential || 'N/A'}
                  </strong>
                </div>

              </div>

            </section>


            {/* Suggested Actions */}
            <section className="details-card">

              <div className="details-card-heading">

                <div>

                  <span className="card-eyebrow">
                    AI RECOMMENDATIONS
                  </span>

                  <h2>
                    Suggested Actions
                  </h2>

                  <p>
                    Recommended next steps based on the AI assessment.
                  </p>

                </div>

              </div>


              <div className="component-list">

                {waste.suggestedActions?.length > 0 ? (

                  waste.suggestedActions.map(
                    (action, index) => (

                      <div
                        className="component-item"
                        key={index}
                      >

                        <span>
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <strong>
                          {action}
                        </strong>

                        <small>
                          AI Suggested
                        </small>

                      </div>

                    )
                  )

                ) : (

                  <div className="component-item">

                    <span>
                      ✓
                    </span>

                    <strong>
                      No additional actions provided
                    </strong>

                  </div>

                )}

              </div>

            </section>

          </div>


          {/* RIGHT SIDEBAR */}
          <aside className="details-sidebar">


            {/* Collector */}
            <section className="collector-profile-card">

              <span className="card-eyebrow">
                SUBMITTED BY
              </span>

              <div className="collector-profile">

                <div className="profile-avatar">
  {(waste.collectorName || 'C')
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()}
</div>

                <div>
<strong>
  {waste.collectorName || 'Unknown Collector'}
</strong>

                  <span>
                    RecyLink Collector
                  </span>

                </div>

              </div>


              <div className="collector-location">

                <span>
                  ●
                </span>

                {waste.location}

              </div>


              <div className="collector-stats">

                <div>

                  <strong>
                    {waste.quantity}
                  </strong>

                  <span>
                    Units
                  </span>

                </div>


                <div>

                  <strong>
                    {classificationConfidence}%
                  </strong>

                  <span>
                    AI Confidence
                  </span>

                </div>


                <div>

                  <strong>
                    {waste.reusePotential || 'N/A'}
                  </strong>

                  <span>
                    Reuse
                  </span>

                </div>

              </div>

            </section>


            {/* Offer card */}
            <section className="create-offer-card">

              <span className="card-eyebrow">
                NEXT STEP
              </span>

              <h2>
                Ready to make an offer?
              </h2>

              <p>
                Review the AI assessment and send a competitive
                price quote to this collector.
              </p>


              <div className="offer-preview">

                <span>
                  Suggested quantity
                </span>

                <strong>
                  {waste.quantity} units
                </strong>

              </div>


              <Link
                to={`/recycler/offers/create?ewaste=${id}`}
                className="create-offer-btn"
              >
                Create Offer →
              </Link>

            </section>


            {/* Notice */}
            <div className="details-notice">

              <span>
                ⓘ
              </span>

              <p>
                AI results are decision-support information.
                Final assessment should be verified by the recycler.
              </p>

            </div>

          </aside>

        </div>

      </main>

    </div>
  )
}

export default EWasteDetails