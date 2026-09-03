function Footer() {
  return (
    <footer className="footer">

      <div className="footer-glow footer-glow-green"></div>
      <div className="footer-glow footer-glow-blue"></div>

      <div className="footer-main">

        {/* Brand */}
        <div className="footer-brand-section">
          <div className="footer-brand">

            <div className="footer-logo">
              <span>↻</span>
            </div>

            <div>
              <div className="footer-logo-name">
                <span className="recy">Recy</span>
                <span className="link">Link</span>
              </div>

              <small>SMART E-WASTE NETWORK</small>
            </div>

          </div>

          <p className="footer-description">
            Bridging informal collectors with the formal
            e-waste recycling ecosystem.
          </p>

          <div className="footer-tagline">
            <span>♻</span>
            Collect smarter. Recycle responsibly.
          </div>
        </div>


        {/* Platform */}
        <div className="footer-column">
          <h4>Platform</h4>

          <a href="/">Dashboard</a>
          <a href="/demands">Nearby Demands</a>
          <a href="/add-ewaste">Add E-Waste</a>
          <a href="/ai-assessment">AI Assessment</a>
          <a href="/offers">My Offers</a>
        </div>


        {/* Ecosystem */}
        <div className="footer-column">
          <h4>Ecosystem</h4>

          <a href="#">For Collectors</a>
          <a href="#">For Recyclers</a>
          <a href="#">How RecyLink Works</a>
          <a href="#">Responsible Recycling</a>
          <a href="#">Help Center</a>
        </div>


        {/* Contact */}
        <div className="footer-column contact-column">
          <h4>Stay Connected</h4>

          <p>
            Building a cleaner and more circular
            e-waste ecosystem.
          </p>

          <div className="social-links">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="Email">@</a>
          </div>
        </div>

      </div>


      {/* Bottom */}
      <div className="footer-bottom">

        <p>
          © 2026 RecyLink. All rights reserved.
        </p>

        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </div>

        <span className="footer-made">
          Made for a greener tomorrow <b>●</b>
        </span>

      </div>

    </footer>
  )
}

export default Footer