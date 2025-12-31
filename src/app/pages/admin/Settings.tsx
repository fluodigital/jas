import { useState } from 'react';
import { Save, Globe, Mail } from 'lucide-react';

export default function Settings() {
  const [formData, setFormData] = useState({
    // Site Settings
    siteName: 'Jas Soni Photography',
    siteTagline: 'Fine Art Canvas Prints',
    siteDescription: 'Fine art photography printed on premium canvas, bringing beauty to your space.',
    
    // Contact Information
    email: 'hello@jassoni.com',
    phone: '+44 20 1234 5678',
    address: 'London, United Kingdom',
    
    // Social Media
    instagram: 'https://instagram.com/jassoni',
    twitter: 'https://twitter.com/jassoni',
    
    // Business Settings
    currency: 'GBP',
    taxRate: 20,
    shippingFee: 9.99,
    
    // Email Notifications
    orderConfirmation: true,
    shippingNotification: true,
    lowStockAlert: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual save logic
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Settings</h1>
          <p className="text-white/60">Manage your site configuration and preferences</p>
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-[#EEFF00] text-black rounded-md hover:bg-[#EEFF00]/90 transition-colors uppercase tracking-wider text-sm"
        >
          <Save size={20} />
          Save Changes
        </button>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
          <p className="text-green-400">Settings saved successfully!</p>
        </div>
      )}

      {/* Site Settings */}
      <div className="bg-black border border-white/10 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="text-[#EEFF00]" size={24} />
          <h2 className="text-xl text-white">Site Settings</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="siteName" className="block text-sm text-white/80 mb-2">
              Site Name
            </label>
            <input
              type="text"
              id="siteName"
              value={formData.siteName}
              onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
            />
          </div>

          <div>
            <label htmlFor="siteTagline" className="block text-sm text-white/80 mb-2">
              Site Tagline
            </label>
            <input
              type="text"
              id="siteTagline"
              value={formData.siteTagline}
              onChange={(e) => setFormData({ ...formData, siteTagline: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="siteDescription" className="block text-sm text-white/80 mb-2">
            Site Description
          </label>
          <textarea
            id="siteDescription"
            value={formData.siteDescription}
            onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-black border border-white/10 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="text-[#EEFF00]" size={24} />
          <h2 className="text-xl text-white">Contact Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm text-white/80 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm text-white/80 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm text-white/80 mb-2">
            Business Address
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="instagram" className="block text-sm text-white/80 mb-2">
              Instagram URL
            </label>
            <input
              type="url"
              id="instagram"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
            />
          </div>

          <div>
            <label htmlFor="twitter" className="block text-sm text-white/80 mb-2">
              Twitter URL
            </label>
            <input
              type="url"
              id="twitter"
              value={formData.twitter}
              onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
            />
          </div>
        </div>
      </div>

      {/* Business Settings */}
      <div className="bg-black border border-white/10 rounded-lg p-6 space-y-4">
        <h2 className="text-xl text-white mb-4">Business Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="currency" className="block text-sm text-white/80 mb-2">
              Currency
            </label>
            <select
              id="currency"
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
            >
              <option value="GBP" className="bg-black">GBP (£)</option>
              <option value="USD" className="bg-black">USD ($)</option>
              <option value="EUR" className="bg-black">EUR (€)</option>
            </select>
          </div>

          <div>
            <label htmlFor="taxRate" className="block text-sm text-white/80 mb-2">
              Tax Rate (%)
            </label>
            <input
              type="number"
              id="taxRate"
              value={formData.taxRate}
              onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label htmlFor="shippingFee" className="block text-sm text-white/80 mb-2">
              Shipping Fee (£)
            </label>
            <input
              type="number"
              id="shippingFee"
              value={formData.shippingFee}
              onChange={(e) => setFormData({ ...formData, shippingFee: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-black border border-white/10 rounded-lg p-6 space-y-4">
        <h2 className="text-xl text-white mb-4">Email Notifications</h2>

        <div className="space-y-3">
          <label className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/20 rounded-md cursor-pointer hover:bg-white/10 transition-colors">
            <input
              type="checkbox"
              checked={formData.orderConfirmation}
              onChange={(e) => setFormData({ ...formData, orderConfirmation: e.target.checked })}
              className="w-4 h-4 accent-[#EEFF00]"
            />
            <div className="flex-1">
              <p className="text-sm text-white">Order Confirmation</p>
              <p className="text-xs text-white/60">Send email when customer places an order</p>
            </div>
          </label>

          <label className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/20 rounded-md cursor-pointer hover:bg-white/10 transition-colors">
            <input
              type="checkbox"
              checked={formData.shippingNotification}
              onChange={(e) => setFormData({ ...formData, shippingNotification: e.target.checked })}
              className="w-4 h-4 accent-[#EEFF00]"
            />
            <div className="flex-1">
              <p className="text-sm text-white">Shipping Notification</p>
              <p className="text-xs text-white/60">Send email when order is shipped</p>
            </div>
          </label>

          <label className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/20 rounded-md cursor-pointer hover:bg-white/10 transition-colors">
            <input
              type="checkbox"
              checked={formData.lowStockAlert}
              onChange={(e) => setFormData({ ...formData, lowStockAlert: e.target.checked })}
              className="w-4 h-4 accent-[#EEFF00]"
            />
            <div className="flex-1">
              <p className="text-sm text-white">Low Stock Alert</p>
              <p className="text-xs text-white/60">Alert admin when product stock is low</p>
            </div>
          </label>
        </div>
      </div>
    </form>
  );
}
