import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AIAssessment() {
  const navigate = useNavigate()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(true)

  const wasteData = {
    device: 'Dell Latitude Laptop',
    category: 'Laptop',
    quantity: 5,
    weight: '11.5 kg',
    condition: 'Partially Working',
    location: 'Delhi NCR',
  }

  const assessment = {
    repairability: 72,
    condition: 'Partially Repairable',
    confidence: 91,
    reusableComponents: [
      'LCD Display',
      'RAM Module',
      'Keyboard',
      'Battery',
      'Charger',
    ],
    recyclableWeight: '7.8 kg',
    estimatedRecovery: '68%',
    recommendation: 'Repair / Refurbish',
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setAnalyzed(false)

    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalyzed(true)
    }, 1800)
  }

  return (
    <div className="ai-assessment-page">

      {/* Header */}
      <div className="ai-header">
        <div>
          <span className="page-label">AI POWERED ANALYSIS</span>
          <h1>AI Assessment</h1>
          <p>
            Our AI analyzes your e-waste to determine repairability,
            reusable components and recycling potential.
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
            <p>Review the details before AI analysis.</p>
          </div>

          <button
            className="edit-button"
            onClick={() => navigate('/add-ewaste')}
          >
            Edit Details
          </button>
        </div>

        <div className="waste-summary">
          <div className="waste-icon">💻</div>

          <div className="waste-main">
            <h3>{wasteData.device}</h3>
            <span>{wasteData.category}</span>
          </div>

          <div className="summary-item">
            <small>Quantity</small>
            <strong>{wasteData.quantity} units</strong>
          </div>

          <div className="summary-item">
            <small>Total Weight</small>
            <strong>{wasteData.weight}</strong>
          </div>

          <div className="summary-item">
            <small>Condition</small>
            <strong>{wasteData.condition}</strong>
          </div>
        </div>
      </section>

      {/* AI Analysis */}
      <section className="ai-analysis-card">

        <div className="analysis-header">
          <div>
            <span className="ai-badge">🤖 AI INSIGHT</span>
            <h2>Repairability Assessment</h2>
            <p>
              AI prediction based on device condition and submitted details.
            </p>
          </div>

          <button
            className="analyze-button"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : '↻ Re-analyze'}
          </button>
        </div>

        {isAnalyzing ? (
          <div className="analyzing-box">
            <div className="loader"></div>
            <h3>AI is analyzing your e-waste...</h3>
            <p>
              Checking repairability, component recovery and recycling
              potential.
            </p>
          </div>
        ) : analyzed ? (
          <>
            {/* Score */}
            <div className="assessment-grid">

              <div className="score-card">
                <div className="score-circle">
                  <span>{assessment.repairability}%</span>
                  <small>Repairable</small>
                </div>

                <div className="score-content">
                  <h3>{assessment.condition}</h3>
                  <p>
                    This device has good potential for repair or
                    refurbishment.
                  </p>

                  <div className="confidence">
                    <span>AI Confidence</span>
                    <strong>{assessment.confidence}%</strong>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="recommendation-card">
                <span className="recommendation-label">
                  RECOMMENDED ACTION
                </span>

                <div className="recommendation-icon">🔧</div>

                <h3>{assessment.recommendation}</h3>

                <p>
                  Repairing or refurbishing this device could recover
                  valuable components before final recycling.
                </p>

                <div className="recovery-value">
                  <span>Estimated recovery</span>
                  <strong>{assessment.estimatedRecovery}</strong>
                </div>
              </div>
            </div>

            {/* Components */}
            <div className="components-section">
              <div className="section-heading">
                <div>
                  <h3>Reusable Components</h3>
                  <p>Components that may have recovery value.</p>
                </div>

                <span className="component-count">
                  {assessment.reusableComponents.length} detected
                </span>
              </div>

              <div className="component-list">
                {assessment.reusableComponents.map((component, index) => (
                  <div className="component-item" key={index}>
                    <span className="component-check">✓</span>
                    <span>{component}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recycling estimate */}
            <div className="recycling-estimate">
              <div>
                <span>♻️ Estimated Recyclable Material</span>
                <strong>{assessment.recyclableWeight}</strong>
              </div>

              <div className="estimate-divider"></div>

              <div>
                <span>📍 Collection Location</span>
                <strong>{wasteData.location}</strong>
              </div>

              <div className="estimate-divider"></div>

              <div>
                <span>⚡ Processing Route</span>
                <strong>Repair → Recycle</strong>
              </div>
            </div>
          </>
        ) : null}
      </section>

      {/* Info */}
      <div className="ai-info">
        <span>💡</span>
        <div>
          <strong>Why AI Assessment?</strong>
          <p>
            RecyLink uses AI to identify whether e-waste can be repaired,
            refurbished or should directly move to formal recycling.
            This helps collectors get better-value offers from recyclers.
          </p>
        </div>
      </div>

      {/* Bottom Action */}
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