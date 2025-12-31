export default function Shipping() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-16 lg:py-24 prose prose-invert prose-neutral">
        <h1 className="text-white uppercase tracking-wider">Shipping Policy</h1>

        <h2 className="text-white uppercase tracking-wider">Delivery Options</h2>
        <h3 className="text-white/90">UK Delivery</h3>
        <ul className="text-white/70">
          <li><strong>Standard Delivery (5-7 business days):</strong> £4.99 (Free on orders over £100)</li>
          <li><strong>Express Delivery (2-3 business days):</strong> £9.99</li>
        </ul>

        <h3 className="text-white/90">International Delivery</h3>
        <p className="text-white/70">We ship worldwide. Delivery times and costs vary by destination and will be calculated at checkout. International orders typically arrive within 10-15 business days.</p>

        <h2 className="text-white uppercase tracking-wider">Processing Time</h2>
        <p className="text-white/70">All orders are carefully printed and quality-checked before dispatch. Processing typically takes 2-3 business days before your order ships.</p>

        <h2 className="text-white uppercase tracking-wider">Tracking</h2>
        <p className="text-white/70">Once your order ships, you'll receive a tracking number via email. You can track your shipment and view delivery status in your account dashboard.</p>

        <h2 className="text-white uppercase tracking-wider">Customs and Duties</h2>
        <p className="text-white/70">International customers may be responsible for customs duties and taxes imposed by their country. These charges are not included in our prices and vary by location.</p>

        <h2 className="text-white uppercase tracking-wider">Delivery Issues</h2>
        <p className="text-white/70">If your order is delayed or doesn't arrive, please contact us immediately. We'll work with the carrier to locate your package and ensure you receive your order.</p>

        <h2 className="text-white uppercase tracking-wider">Packaging</h2>
        <p className="text-white/70">All prints are carefully packaged in protective materials to ensure they arrive in perfect condition. Canvas prints are rolled and shipped in sturdy tubes.</p>

        <div className="mt-12 p-6 bg-black border border-white/10 not-prose">
          <h3 className="text-lg mb-2 text-white uppercase tracking-wider">Questions?</h3>
          <p className="text-white/60 text-sm">
            Contact us at <a href="mailto:hello@jassoni.co.uk" className="underline text-[#EEFF00]">hello@jassoni.co.uk</a>
          </p>
        </div>
      </div>
    </div>
  );
}