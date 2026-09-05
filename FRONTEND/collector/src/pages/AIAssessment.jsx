import { useLocation, useNavigate } from 'react-router-dom'

function AIAssessment() {
  const navigate = useNavigate()
  const location = useLocation()

  // Backend se AddEwaste page ke through aaya hua data
  const waste = location.state?.waste

  // Agar directly page open ho gaya
  if (!waste) {
    return (
      <div className="ai-assessment-page">
        <div className="ai-info">
          <span>⚠️</span>
          <div>
            <strong>No AI Assessment Found</strong>
            <p>
              Please submit e-waste first to generate an AI assessment.
            </p>
          </div>
        </div>

        <div className="ai-actions">
          <button
            className="primary-button"
            onClick={() => navigate('/add-ewaste')}
          >
            ← Add E-Waste
          </button>
        </div>
      </div>
    )
  }

  // Backend values
  const classificationConfidence = Math.round(
    (waste.classificationConfidence || 0) * 100
  )

  const repairabilityConfidence = Math.round(
    (waste.repairabilityConfidence || 0) * 100
  )

  const recommendation = waste.recommendation || 'NEEDS_INSPECTION'

  const recommendationText = recommendation.replaceAll('_', ' ')

  const isNotEWaste = recommendation === 'NOT_E_WASTE'

  return (
    <div className="ai-assessment-page">

      {/* Header */}
      <div className="ai-header">
        <div>
          <span className="page-label">
            AI POWERED ANALYSIS
          </span>

          <h1>
            AI Assessment
          </h1>

          <p>
            Our AI analyzes your e-waste to determine its category,
            repairability and recommended processing route.
          </p>
        </div>

        <div className="ai-status">
          <span className="status-dot"></span>
          AI Engine Ready
        </div>
      </div>


      {/* Waste Summary */}
      <section className="ai-card">

        <div className="card-title">
          <div>
            <h2>📦 E-Waste Submitted</h2>

            <p>
              Details received from your e-waste submission.
            </p>
          </div>

          <button
            className="edit-button"
            onClick={() => navigate('/add-ewaste')}
          >
            Edit Details
          </button>
        </div>


        <div className="waste-summary">

          <div className="waste-icon">
            💻
          </div>

          <div className="waste-main">
            <h3>
              {waste.category || waste.wasteType}
            </h3>

            <span>
              AI Detected Category
            </span>
          </div>


          <div className="summary-item">
            <small>Quantity</small>

            <strong>
              {waste.quantity} units
            </strong>
          </div>


          <div className="summary-item">
            <small>Condition</small>

            <strong>
              {waste.condition}
            </strong>
          </div>


          <div className="summary-item">
            <small>Location</small>

            <strong>
              {waste.location}
            </strong>
          </div>

        </div>

      </section>


      {/* AI Analysis */}
      <section className="ai-analysis-card">

        <div className="analysis-header">

          <div>
            <span className="ai-badge">
              🤖 AI INSIGHT
            </span>

            <h2>
              Repairability Assessment
            </h2>

            <p>
              AI prediction based on the uploaded image and item condition.
            </p>
          </div>

          <button
            className="analyze-button"
            onClick={() => navigate('/add-ewaste')}
          >
            ↻ Re-analyze
          </button>

        </div>


        {/* Assessment */}
        <div className="assessment-grid">

          {/* Repairability */}
          <div className="score-card">

            <div className="score-circle">
              <span>
                {repairabilityConfidence}%
              </span>

              <small>
                Repairability
              </small>
            </div>


            <div className="score-content">

              <h3>
                {isNotEWaste
                  ? 'Not E-Waste'
                  : recommendationText}
              </h3>

              <p>
                {waste.reason}
              </p>


              <div className="confidence">

                <span>
                  AI Classification Confidence
                </span>

                <strong>
                  {classificationConfidence}%
                </strong>

              </div>

            </div>

          </div>


          {/* Recommendation */}
          <div className="recommendation-card">

            <span className="recommendation-label">
              RECOMMENDED ACTION
            </span>

            <div className="recommendation-icon">
              {isNotEWaste ? '⚠️' : '🔧'}
            </div>

            <h3>
              {recommendationText}
            </h3>

            <p>
              {waste.reason}
            </p>


            <div className="recovery-value">

              <span>
                Reuse Potential
              </span>

              <strong>
                {waste.reusePotential || 'N/A'}
              </strong>

            </div>

          </div>

        </div>


        {/* Suggested Actions */}
        {!isNotEWaste &&
          waste.suggestedActions?.length > 0 && (

          <div className="components-section">

            <div className="section-heading">

              <div>
                <h3>
                  AI Suggested Actions
                </h3>

                <p>
                  Recommended next steps based on the AI assessment.
                </p>
              </div>

              <span className="component-count">
                {waste.suggestedActions.length} actions
              </span>

            </div>


            <div className="component-list">

              {waste.suggestedActions.map(
                (action, index) => (

                <div
                  className="component-item"
                  key={index}
                >
                  <span className="component-check">
                    ✓
                  </span>

                  <span>
                    {action}
                  </span>
                </div>

              ))}

            </div>

          </div>

        )}


        {/* AI Details */}
        <div className="recycling-estimate">

          <div>
            <span>
              🤖 Detected Category
            </span>

            <strong>
              {waste.category}
            </strong>
          </div>


          <div className="estimate-divider"></div>


          <div>
            <span>
              🎯 Classification Confidence
            </span>

            <strong>
              {classificationConfidence}%
            </strong>
          </div>


          <div className="estimate-divider"></div>


          <div>
            <span>
              ♻️ Reuse Potential
            </span>

            <strong>
              {waste.reusePotential || 'N/A'}
            </strong>
          </div>

        </div>

      </section>


      {/* Info */}
      <div className="ai-info">

        <span>
          💡
        </span>

        <div>

          <strong>
            Why AI Assessment?
          </strong>

          <p>
            RecyLink uses AI to identify e-waste and assess
            whether it requires repair, refurbishment or
            further inspection before formal recycling.
            This helps collectors and recyclers make better decisions.
          </p>

        </div>

      </div>


      {/* Bottom Actions */}
      <div className="ai-actions">

        <button
          className="secondary-button"
          onClick={() => navigate('/add-ewaste')}
        >
          ← Back to E-Waste
        </button>


        <button
          className="primary-button"
          onClick={() => navigate('/offers')}
        >
          Continue to Recycler Offers →
        </button>

      </div>

    </div>
  )
}

export default AIAssessment