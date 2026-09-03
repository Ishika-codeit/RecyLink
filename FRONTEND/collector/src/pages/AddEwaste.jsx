import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function AddEwaste() {

  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    demand: '',
    category: '',
    deviceName: '',
    quantity: '',
    condition: '',
    weight: '',
    location: 'Delhi NCR',
    description: '',
  })

  const [images, setImages] = useState([])

  const demands = [
    {
      id: 1,
      label: 'Laptops — EcoCycle Recycling',
      category: 'Laptop',
    },
    {
      id: 2,
      label: 'Desktop Computers — GreenTech Recyclers',
      category: 'Desktop',
    },
    {
      id: 3,
      label: 'Mobile Phones — Clean Earth Recycling',
      category: 'Mobile',
    },
    {
      id: 4,
      label: 'Printers — GreenLoop India',
      category: 'Printer',
    },
  ]


  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }


  const handleDemandChange = (e) => {
    const selectedDemand = demands.find(
      (demand) => demand.id === Number(e.target.value)
    )

    setFormData((previous) => ({
      ...previous,
      demand: e.target.value,
      category: selectedDemand
        ? selectedDemand.category
        : '',
    }))
  }


  const handleImages = (e) => {
    const selectedFiles = Array.from(e.target.files)

    setImages(selectedFiles)
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    const submission = {
      ...formData,
      images,
      submittedAt: new Date().toISOString(),
    }

    console.log('E-Waste Submission:', submission)

    // Later:
    // 1. Send data to backend
    // 2. Backend stores submission
    // 3. AI service assesses repairability
    // 4. Collector receives assessment

    navigate('/ai-assessment')
  }


  return (
    <div className="add-ewaste-page">

      {/* =================================
          HEADER
      ================================= */}

      <div className="add-ewaste-header">

        <div>

          <Link
            to="/demands"
            className="back-link"
          >
            ← Back to Demands
          </Link>

          <span className="page-label">
            E-WASTE SUBMISSION
          </span>

          <h1>
            Add E-Waste
          </h1>

          <p>
            Add the e-waste you have collected and submit it
            for AI assessment and recycler matching.
          </p>

        </div>

      </div>


      {/* =================================
          FORM
      ================================= */}

      <form
        className="ewaste-form"
        onSubmit={handleSubmit}
      >

        {/* =================================
            DEMAND SELECTION
        ================================= */}

        <section className="form-card">

          <div className="form-section-heading">

            <span className="step-number">
              1
            </span>

            <div>
              <h2>
                Select Recycler Demand
              </h2>

              <p>
                Choose the demand this e-waste is intended for.
              </p>
            </div>

          </div>


          <div className="form-group">

            <label>
              Recycler Demand
              <span>*</span>
            </label>

            <select
              name="demand"
              value={formData.demand}
              onChange={handleDemandChange}
              required
            >

              <option value="">
                Select a nearby demand
              </option>

              {demands.map((demand) => (
                <option
                  key={demand.id}
                  value={demand.id}
                >
                  {demand.label}
                </option>
              ))}

            </select>

          </div>

        </section>


        {/* =================================
            DEVICE DETAILS
        ================================= */}

        <section className="form-card">

          <div className="form-section-heading">

            <span className="step-number">
              2
            </span>

            <div>
              <h2>
                E-Waste Details
              </h2>

              <p>
                Tell us about the electronic items you collected.
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
                value={formData.category}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select category
                </option>

                <option value="Laptop">
                  Laptop
                </option>

                <option value="Desktop">
                  Desktop
                </option>

                <option value="Mobile">
                  Mobile Phone
                </option>

                <option value="Printer">
                  Printer
                </option>

                <option value="Monitor">
                  Monitor
                </option>

                <option value="Battery">
                  Battery / UPS
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            <div className="form-group">

              <label>
                Device / Item Name
                <span>*</span>
              </label>

              <input
                type="text"
                name="deviceName"
                value={formData.deviceName}
                onChange={handleChange}
                placeholder="e.g. Dell Latitude 5400"
                required
              />

            </div>


            <div className="form-group">

              <label>
                Quantity
                <span>*</span>
              </label>

              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                required
              />

            </div>


            <div className="form-group">

              <label>
                Approx. Total Weight
                <span>*</span>
              </label>

              <div className="input-with-unit">

                <input
                  type="number"
                  name="weight"
                  min="0"
                  step="0.1"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 24.5"
                  required
                />

                <span>kg</span>

              </div>

            </div>

          </div>

        </section>


        {/* =================================
            CONDITION
        ================================= */}

        <section className="form-card">

          <div className="form-section-heading">

            <span className="step-number">
              3
            </span>

            <div>

              <h2>
                Item Condition
              </h2>

              <p>
                This helps our AI estimate repairability and value.
              </p>

            </div>

          </div>


          <div className="condition-options">

            <label className="condition-option">

              <input
                type="radio"
                name="condition"
                value="Working"
                checked={formData.condition === 'Working'}
                onChange={handleChange}
                required
              />

              <div>
                <strong>
                  Working
                </strong>

                <span>
                  Fully functional device
                </span>
              </div>

            </label>


            <label className="condition-option">

              <input
                type="radio"
                name="condition"
                value="Partially Working"
                checked={formData.condition === 'Partially Working'}
                onChange={handleChange}
              />

              <div>
                <strong>
                  Partially Working
                </strong>

                <span>
                  Some functions work
                </span>
              </div>

            </label>


            <label className="condition-option">

              <input
                type="radio"
                name="condition"
                value="Not Working"
                checked={formData.condition === 'Not Working'}
                onChange={handleChange}
              />

              <div>
                <strong>
                  Not Working
                </strong>

                <span>
                  Device does not function
                </span>
              </div>

            </label>


            <label className="condition-option">

              <input
                type="radio"
                name="condition"
                value="Unknown"
                checked={formData.condition === 'Unknown'}
                onChange={handleChange}
              />

              <div>
                <strong>
                  Not Sure
                </strong>

                <span>
                  Let AI assess the condition
                </span>
              </div>

            </label>

          </div>

        </section>


        {/* =================================
            PHOTOS
        ================================= */}

        <section className="form-card">

          <div className="form-section-heading">

            <span className="step-number">
              4
            </span>

            <div>

              <h2>
                Upload Photos
              </h2>

              <p>
                Add clear photos so AI can assess the device condition.
              </p>

            </div>

          </div>


          <label className="upload-area">

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImages}
            />

            <div className="upload-icon">
              ↑
            </div>

            <strong>
              Click to upload photos
            </strong>

            <span>
              PNG, JPG or JPEG · Multiple images allowed
            </span>

          </label>


          {images.length > 0 && (

            <div className="selected-images">

              <strong>
                {images.length} photo
                {images.length > 1 ? 's' : ''} selected
              </strong>

              {images.map((image, index) => (

                <span key={index}>
                  {image.name}
                </span>

              ))}

            </div>

          )}

        </section>


        {/* =================================
            ADDITIONAL INFORMATION
        ================================= */}

        <section className="form-card">

          <div className="form-section-heading">

            <span className="step-number">
              5
            </span>

            <div>

              <h2>
                Additional Information
              </h2>

              <p>
                Add any useful details about this collection.
              </p>

            </div>

          </div>


          <div className="form-grid">

            <div className="form-group">

              <label>
                Collection Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />

            </div>


            <div className="form-group full-width">

              <label>
                Description / Notes
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Mention any visible damage, missing parts, accessories, etc."
                rows="4"
              />

            </div>

          </div>

        </section>


        {/* =================================
            SUBMIT
        ================================= */}

        <div className="form-actions">

          <Link
            to="/demands"
            className="cancel-button"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="submit-ewaste-button"
          >
            Submit for AI Assessment →
          </button>

        </div>

      </form>

    </div>
  )
}

export default AddEwaste