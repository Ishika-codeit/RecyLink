import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

function EWasteDetails() {
  const { id } = useParams()

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
              SUBMISSION #{id}
            </span>

            <h1>E-Waste Assessment</h1>

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
                💻
              </div>

              <div className="waste-summary-content">

                <span className="card-eyebrow">
                  E-WASTE SUBMISSION
                </span>

                <h2>
                  Dell Latitude Laptop
                </h2>

                <p>
                  Laptop · 5 units · 11.5 kg total
                </p>

                <div className="summary-tags">

                  <span>
                    Partially Working
                  </span>

                  <span>
                    Delhi NCR
                  </span>

                  <span>
                    Submitted 2 hours ago
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
                    Automated analysis based on uploaded
                    e-waste images and condition information.
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
                    <strong>94%</strong>
                    <span>Confidence</span>
                  </div>

                  <p>
                    High confidence classification
                  </p>

                </div>


                {/* Recommendation */}
                <div className="ai-recommendation-large">

                  <span>
                    RECOMMENDED ACTION
                  </span>

                  <strong>
                    Repair
                  </strong>

                  <p>
                    The device appears suitable for repair
                    or refurbishment based on its condition
                    and detected components.
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
                    Key components appear potentially reusable.
                    Recycler review is recommended before final
                    processing.
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
                  <span>DEVICE</span>
                  <strong>Dell Latitude Laptop</strong>
                </div>

                <div>
                  <span>CATEGORY</span>
                  <strong>Laptop</strong>
                </div>

                <div>
                  <span>QUANTITY</span>
                  <strong>5 units</strong>
                </div>

                <div>
                  <span>TOTAL WEIGHT</span>
                  <strong>11.5 kg</strong>
                </div>

                <div>
                  <span>CONDITION</span>
                  <strong>Partially Working</strong>
                </div>

                <div>
                  <span>LOCATION</span>
                  <strong>Delhi NCR</strong>
                </div>

              </div>

            </section>


            {/* Components */}
            <section className="details-card">

              <div className="details-card-heading">

                <div>
                  <span className="card-eyebrow">
                    AI-DETECTED
                  </span>

                  <h2>
                    Potentially Reusable Components
                  </h2>
                </div>

              </div>


              <div className="component-list">

                <div className="component-item">
                  <span>01</span>
                  <strong>LCD Display</strong>
                  <small>Reusable</small>
                </div>

                <div className="component-item">
                  <span>02</span>
                  <strong>RAM Module</strong>
                  <small>Reusable</small>
                </div>

                <div className="component-item">
                  <span>03</span>
                  <strong>Keyboard</strong>
                  <small>Reusable</small>
                </div>

                <div className="component-item">
                  <span>04</span>
                  <strong>Battery</strong>
                  <small>Inspect</small>
                </div>

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
                  RK
                </div>

                <div>
                  <strong>
                    Rahul Kumar
                  </strong>

                  <span>
                    Verified Collector
                  </span>
                </div>

              </div>


              <div className="collector-location">
                <span>●</span>
                Delhi NCR
              </div>


              <div className="collector-stats">

                <div>
                  <strong>4.8</strong>
                  <span>Rating</span>
                </div>

                <div>
                  <strong>18</strong>
                  <span>Collections</span>
                </div>

                <div>
                  <strong>248kg</strong>
                  <span>Collected</span>
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
                  5 units
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

              <span>ⓘ</span>

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