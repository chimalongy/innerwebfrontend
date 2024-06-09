import React from 'react'
import "../styles/footer.scss"

function Footer() {
  return (
    <footer class="footer">
    <p>&copy; 2024 Your Company Name. All rights reserved.</p>
    <p>
      <a href="/privacy-policy">Privacy Policy</a> |
      <a href="/terms-of-service">Terms of Service</a> |
      <a href="/contact">Contact Us</a>
    </p>
  </footer>
  )
}

export default Footer