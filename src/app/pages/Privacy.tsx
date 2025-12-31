export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-16 lg:py-24 prose prose-invert prose-neutral">
        <h1 className="text-white uppercase tracking-wider">Privacy Policy</h1>
        <p className="text-sm text-white/60">Last updated: December 28, 2024</p>

        <h2 className="text-white uppercase tracking-wider">Information We Collect</h2>
        <p className="text-white/70">We collect information you provide directly to us, including:</p>
        <ul className="text-white/70">
          <li>Name, email address, and contact details</li>
          <li>Shipping and billing addresses</li>
          <li>Payment information (processed securely by our payment partners)</li>
          <li>Order history and preferences</li>
        </ul>

        <h2 className="text-white uppercase tracking-wider">How We Use Your Information</h2>
        <p className="text-white/70">We use the information we collect to:</p>
        <ul className="text-white/70">
          <li>Process and fulfill your orders</li>
          <li>Communicate with you about your orders</li>
          <li>Send marketing communications (with your consent)</li>
          <li>Improve our products and services</li>
          <li>Prevent fraud and protect our website</li>
        </ul>

        <h2 className="text-white uppercase tracking-wider">Information Sharing</h2>
        <p className="text-white/70">We do not sell or rent your personal information. We may share your information with:</p>
        <ul className="text-white/70">
          <li>Service providers who help us operate our business</li>
          <li>Payment processors for secure transaction processing</li>
          <li>Shipping carriers to deliver your orders</li>
          <li>Law enforcement when required by law</li>
        </ul>

        <h2 className="text-white uppercase tracking-wider">Data Security</h2>
        <p className="text-white/70">We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>

        <h2 className="text-white uppercase tracking-wider">Cookies</h2>
        <p className="text-white/70">We use cookies to improve your browsing experience and analyze website traffic. You can disable cookies in your browser settings, though this may affect site functionality.</p>

        <h2 className="text-white uppercase tracking-wider">Your Rights</h2>
        <p className="text-white/70">You have the right to:</p>
        <ul className="text-white/70">
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt out of marketing communications</li>
          <li>Object to certain data processing</li>
        </ul>

        <h2 className="text-white uppercase tracking-wider">Changes to This Policy</h2>
        <p className="text-white/70">We may update this privacy policy from time to time. We'll notify you of significant changes by email or through a notice on our website.</p>

        <h2 className="text-white uppercase tracking-wider">Contact Us</h2>
        <p className="text-white/70">If you have questions about this privacy policy, please contact us at:</p>
        <p className="text-white/70">Email: <a href="mailto:privacy@jassoni.co.uk" className="text-[#EEFF00] underline">privacy@jassoni.co.uk</a></p>
      </div>
    </div>
  );
}