import { useEffect, useState } from 'react'
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'

function AddEwaste() {
  const navigate = useNavigate()
  const location = useLocation()

  // Demand ID coming from:
  // /add-ewaste?demand=DEMAND_ID
  const queryParams = new URLSearchParams(
    location.search
  )

  const selectedDemandId =
    queryParams.get('demand')


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


  const [demands, setDemands] = useState([])
  const [images, setImages] = useState([])

  const [loadingDemands, setLoadingDemands] =
    useState(true)

  const [submitting, setSubmitting] =
    useState(false)

  const [error, setError] = useState('')


  // =================================
  // FETCH DEMANDS
  // =================================

  useEffect(() => {
    const fetchDemands = async () => {
      try {
        setLoadingDemands(true)
        setError('')

        const response = await fetch(
          'http://localhost:5000/api/demands'
        )

        const result = await response.json()

        if (!response.ok) {
          throw new Error(
            result.message ||
              'Failed to fetch demands'
          )
        }

        const backendDemands =
          result.demands || []

        setDemands(backendDemands)

        // ---------------------------------
        // AUTO SELECT DEMAND FROM URL
        // ---------------------------------

        if (selectedDemandId) {
          const selectedDemand =
            backendDemands.find(
              (demand) =>
                String(demand._id) ===
                String(selectedDemandId)
            )

          if (selectedDemand) {

            const isExpired =
              selectedDemand.deadline &&
              new Date(
                selectedDemand.deadline
              ) < new Date()

            if (!isExpired) {

              setFormData((previous) => ({
                ...previous,

                demand:
                  selectedDemand._id,

                category:
                  selectedDemand.wasteType || '',

                location:
                  selectedDemand.location ||
                  'Delhi NCR',
              }))

            } else {

              setError(
                'This demand has expired.'
              )

            }
          }
        }

      } catch (err) {
        console.error(
          'Fetch Demands Error:',
          err
        )

        setError(
          err.message ||
            'Failed to load demands'
        )
      } finally {
        setLoadingDemands(false)
      }
    }

    fetchDemands()
  }, [selectedDemandId])


  // =================================
  // FORM CHANGE
  // =================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }


  // =================================
  // DEMAND CHANGE
  // =================================

  const handleDemandChange = (e) => {

    const demandId =
      e.target.value

    const selectedDemand =
      demands.find(
        (demand) =>
          String(demand._id) ===
          String(demandId)
      )

    if (!selectedDemand) {
      setFormData((previous) => ({
        ...previous,
        demand: '',
        category: '',
      }))

      return
    }


    const isExpired =
      selectedDemand.deadline &&
      new Date(
        selectedDemand.deadline
      ) < new Date()


    if (isExpired) {
      alert(
        'This demand has expired.'
      )

      return
    }


    setFormData((previous) => ({
      ...previous,

      demand: demandId,

      category:
        selectedDemand.wasteType || '',

      location:
        selectedDemand.location ||
        previous.location,
    }))
  }


  // =================================
  // IMAGE CHANGE
  // =================================

  const handleImages = (e) => {

    const selectedFiles =
      Array.from(e.target.files)

    setImages(selectedFiles)
  }


  // =================================
  // SUBMIT
  // =================================

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (images.length === 0) {
      alert(
        'Please upload at least one image.'
      )
      return
    }


    if (!formData.demand) {
      alert(
        'Please select a recycler demand.'
      )
      return
    }


    try {

      setSubmitting(true)


      const data = new FormData()


      // Backend Waste API fields

      data.append(
        'wasteType',
        formData.category
      )

      data.append(
        'quantity',
        formData.quantity
      )

      data.append(
        'location',
        formData.location
      )

      data.append(
        'condition',
        formData.condition
      )


      /// ---------------------------------
// COLLECTOR IDENTITY
// ---------------------------------

const user = JSON.parse(
  localStorage.getItem('user') || 'null'
)

const collectorName =
  user?.name?.trim() || 'Collector'

data.append(
  'collectorName',
  collectorName
)
      // ---------------------------------
      // IMAGE
      // ---------------------------------

      data.append(
        'image',
        images[0]
      )


      // ---------------------------------
      // BACKEND REQUEST
      // ---------------------------------

      const response = await fetch(
        'http://localhost:5000/api/waste',
        {
          method: 'POST',
          body: data,
        }
      )


      const result =
        await response.json()


      if (!response.ok) {
        throw new Error(
          result.message ||
            'Failed to submit e-waste'
        )
      }


      console.log(
        'AI Assessment Result:',
        result
      )


      // ---------------------------------
      // AI ASSESSMENT
      // ---------------------------------

      navigate(
        '/ai-assessment',
        {
          state: {
            waste: result.waste,

            // Demand bhi next page ko
            // available rahegi
            demandId:
              formData.demand,
          },
        }
      )

    } catch (error) {

      console.error(
        'E-Waste Submission Error:',
        error
      )

      alert(
        error.message ||
          'Something went wrong while submitting e-waste.'
      )

    } finally {

      setSubmitting(false)

    }
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
            Add the e-waste you have collected and
            submit it for AI assessment and recycler
            matching.
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
                Choose the demand this e-waste is
                intended for.
              </p>

            </div>

          </div>


          <div className="form-group">

            <label>
              Recycler Demand
              <span>*</span>
            </label>


            {loadingDemands ? (

              <p>
                Loading available demands...
              </p>

            ) : (

              <select
                name="demand"
                value={formData.demand}
                onChange={
                  handleDemandChange
                }
                required
              >

                <option value="">
                  Select a nearby demand
                </option>


                {demands.map((demand) => {

                  const expired =
                    demand.deadline &&
                    new Date(
                      demand.deadline
                    ) < new Date()


                  return (
                    <option
                      key={demand._id}
                      value={demand._id}
                      disabled={expired}
                    >
                      {demand.wasteType ||
                        'E-Waste'}{' '}
                      —{' '}
                      {demand.location ||
                        'Location unavailable'}
                      {expired
                        ? ' — Expired'
                        : ''}
                    </option>
                  )
                })}

              </select>

            )}

          </div>


          {error && (
            <p
              style={{
                color: '#c0392b',
                marginTop: '10px',
              }}
            >
              {error}
            </p>
          )}

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
                Tell us about the electronic items
                you collected.
              </p>

            </div>

          </div>


          <div className="form-grid">


            {/* CATEGORY */}

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


            {/* DEVICE NAME */}

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


            {/* QUANTITY */}

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


            {/* WEIGHT */}

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

                <span>
                  kg
                </span>

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
                This helps our AI estimate repairability
                and value.
              </p>

            </div>

          </div>


          <div className="condition-options">


            <label className="condition-option">

              <input
                type="radio"
                name="condition"
                value="Working"
                checked={
                  formData.condition ===
                  'Working'
                }
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
                checked={
                  formData.condition ===
                  'Partially Working'
                }
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
                checked={
                  formData.condition ===
                  'Not Working'
                }
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
                checked={
                  formData.condition ===
                  'Unknown'
                }
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
                Add clear photos so AI can assess
                the device condition.
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
                {images.length > 1
                  ? 's'
                  : ''}{' '}
                selected
              </strong>


              {images.map(
                (image, index) => (

                  <span key={index}>
                    {image.name}
                  </span>

                )
              )}

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
                Add any useful details about this
                collection.
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
            disabled={submitting}
          >

            {submitting
              ? 'Submitting...'
              : 'Submit for AI Assessment →'}

          </button>

        </div>

      </form>

    </div>
  )
}

export default AddEwaste