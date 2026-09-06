import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function CreateDemand() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    category: '',
    quantity: '',
    location: 'Delhi NCR',
    minPrice: '',
    maxPrice: '',
    deadline: '',
    condition: 'Any Condition',
    description: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const response = await fetch(
      'https://recylink-zt6e.onrender.com/api/demands',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wasteType: form.category,
          quantity: Number(form.quantity),
          location: form.location,
          minPrice: Number(form.minPrice),
          maxPrice: Number(form.maxPrice),
          deadline: form.deadline,
          condition: form.condition,
          description: form.description,
        }),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      throw new Error(
        result.message || 'Failed to create demand'
      )
    }

    console.log('Demand Created:', result)

    alert('Demand published successfully!')

    navigate('/recycler/demands')

  } catch (error) {
    console.error('Create Demand Error:', error)

    alert(
      error.message ||
      'Something went wrong while creating demand.'
    )
  }
}

  return (
    <div className="recycler-app">

      <Navbar />

      <main className="create-demand-page">

        {/* Header */}
        <div className="create-demand-header">

          <div>
            <Link
              to="/recycler/demands"
              className="back-link"
            >
              ← Back to Demands
            </Link>

            <span className="eyebrow">
              DEMAND MANAGEMENT
            </span>

            <h1>Create New Demand</h1>

            <p>
              Tell collectors what type of e-waste you are
              currently looking for.
            </p>
          </div>

        </div>


        {/* Form */}
        <form
          className="demand-form"
          onSubmit={handleSubmit}
        >

          {/* Step 1 */}
          <section className="form-card">

            <div className="form-card-heading">

              <div className="form-step">
                01
              </div>

              <div>
                <h2>E-Waste Requirement</h2>

                <p>
                  Select the material and quantity you need.
                </p>
              </div>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label>
                  E-Waste Category
                  <span>*</span>
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="Laptop">
                    Laptops
                  </option>

                  <option value="Desktop">
                    Desktop Computers
                  </option>

                  <option value="Mobile">
                    Mobile Phones
                  </option>

                  <option value="Printer">
                    Printers
                  </option>

                  <option value="Monitor">
                    LED Monitors
                  </option>

                  <option value="Battery">
                    UPS & Batteries
                  </option>

                  <option value="PCB">
                    PCB / Electronic Components
                  </option>

                  <option value="Other">
                    Other Electronics
                  </option>
                </select>

              </div>


              <div className="form-group">

                <label>
                  Required Quantity
                  <span>*</span>
                </label>

                <div className="input-with-unit">

                  <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    min="1"
                    placeholder="e.g. 25"
                    required
                  />

                  <span>units</span>

                </div>

              </div>


              <div className="form-group">

                <label>
                  Preferred Condition
                </label>

                <select
                  name="condition"
                  value={form.condition}
                  onChange={handleChange}
                >
                  <option>Any Condition</option>
                  <option>Working</option>
                  <option>Partially Working</option>
                  <option>Non-Working</option>
                </select>

              </div>


              <div className="form-group">

                <label>
                  Collection Location
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Noida Sector 62"
                  required
                />

              </div>

            </div>

          </section>


          {/* Step 2 */}
          <section className="form-card">

            <div className="form-card-heading">

              <div className="form-step">
                02
              </div>

              <div>
                <h2>Pricing & Deadline</h2>

                <p>
                  Set your expected price range and response deadline.
                </p>
              </div>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label>
                  Minimum Price
                  <span>*</span>
                </label>

                <div className="input-with-unit">

                  <span className="currency">
                    ₹
                  </span>

                  <input
                    type="number"
                    name="minPrice"
                    value={form.minPrice}
                    onChange={handleChange}
                    min="0"
                    placeholder="450"
                    required
                  />

                  <span>/ unit</span>

                </div>

              </div>


              <div className="form-group">

                <label>
                  Maximum Price
                  <span>*</span>
                </label>

                <div className="input-with-unit">

                  <span className="currency">
                    ₹
                  </span>

                  <input
                    type="number"
                    name="maxPrice"
                    value={form.maxPrice}
                    onChange={handleChange}
                    min="0"
                    placeholder="650"
                    required
                  />

                  <span>/ unit</span>

                </div>

              </div>


              <div className="form-group">

                <label>
                  Demand Deadline
                  <span>*</span>
                </label>

                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

          </section>


          {/* Step 3 */}
          <section className="form-card">

            <div className="form-card-heading">

              <div className="form-step">
                03
              </div>

              <div>
                <h2>Additional Details</h2>

                <p>
                  Add useful information for collectors.
                </p>
              </div>

            </div>


            <div className="form-group full-width">

              <label>
                Requirement Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe the type of e-waste you are looking for, preferred condition, collection requirements, or any other useful information..."
              />

              <small className="field-hint">
                Clear requirements help collectors submit better matches.
              </small>

            </div>

          </section>


          {/* Preview */}
          <section className="publish-preview">

            <div className="preview-icon">
              ♻
            </div>

            <div>

              <strong>
                Ready to publish?
              </strong>

              <p>
                Your demand will become visible to verified
                e-waste collectors on RecyLink.
              </p>

            </div>

          </section>


          {/* Actions */}
          <div className="form-actions">

            <Link
              to="/recycler/demands"
              className="cancel-btn"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="publish-btn"
            >
              Publish Demand →
            </button>

          </div>

        </form>

      </main>

      <Footer />

    </div>
  )
}

export default CreateDemand