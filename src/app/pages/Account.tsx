import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { User, Package, Heart, MapPin, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { products } from '../../data/products';

function AccountOverview() {
  const { user } = useApp();
  return (
    <div>
      <h2 className="text-white text-2xl mb-6 uppercase tracking-wider">Welcome back, {user?.fullName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link to="/account/orders" className="p-6 border border-white/20 rounded-sm hover:border-[#EEFF00] transition-colors">
          <Package className="mb-4 text-[#EEFF00]" />
          <h3 className="text-white text-lg mb-2 uppercase tracking-wider">My Orders</h3>
          <p className="text-sm text-white/60">Track and manage your orders</p>
        </Link>
        <Link to="/account/wishlist" className="p-6 border border-white/20 rounded-sm hover:border-[#EEFF00] transition-colors">
          <Heart className="mb-4 text-[#EEFF00]" />
          <h3 className="text-white text-lg mb-2 uppercase tracking-wider">Wishlist</h3>
          <p className="text-sm text-white/60">Saved items for later</p>
        </Link>
        <Link to="/account/addresses" className="p-6 border border-white/20 rounded-sm hover:border-[#EEFF00] transition-colors">
          <MapPin className="mb-4 text-[#EEFF00]" />
          <h3 className="text-white text-lg mb-2 uppercase tracking-wider">Addresses</h3>
          <p className="text-sm text-white/60">Manage delivery addresses</p>
        </Link>
        <Link to="/account/settings" className="p-6 border border-white/20 rounded-sm hover:border-[#EEFF00] transition-colors">
          <SettingsIcon className="mb-4 text-[#EEFF00]" />
          <h3 className="text-white text-lg mb-2 uppercase tracking-wider">Settings</h3>
          <p className="text-sm text-white/60">Account preferences</p>
        </Link>
      </div>
    </div>
  );
}

function Orders() {
  return (
    <div>
      <h2 className="text-white text-2xl mb-6 uppercase tracking-wider">My Orders</h2>
      <div className="text-center py-12 bg-white/5 border border-white/10 rounded-sm">
        <Package size={48} className="mx-auto mb-4 text-white/40" />
        <p className="text-white/60">No orders yet</p>
      </div>
    </div>
  );
}

function Wishlist() {
  const { wishlist } = useApp();
  const wishlistProducts = products.filter((p: any) => wishlist.includes(p.id));

  return (
    <div>
      <h2 className="text-white text-2xl mb-6 uppercase tracking-wider">My Wishlist</h2>
      {wishlistProducts.length === 0 ? (
        <div className="text-center py-12 bg-white/5 border border-white/10 rounded-sm">
          <Heart size={48} className="mx-auto mb-4 text-white/40" />
          <p className="text-white/60">No items in your wishlist</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map((product: any) => (
            <Link key={product.id} to={`/product/${product.slug}`} className="group">
              <div className="aspect-[4/3] bg-neutral-900 rounded-sm overflow-hidden mb-3">
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="mb-1 text-white">{product.title}</h3>
              <p className="text-sm text-white/60">From £{product.basePrice}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Addresses() {
  return (
    <div>
      <h2 className="text-white text-2xl mb-6 uppercase tracking-wider">My Addresses</h2>
      <div className="text-center py-12 bg-white/5 border border-white/10 rounded-sm">
        <MapPin size={48} className="mx-auto mb-4 text-white/40" />
        <p className="text-white/60 mb-4">No saved addresses</p>
        <button className="px-6 py-2 bg-[#EEFF00] text-black rounded-sm hover:bg-[#EEFF00]/90 uppercase tracking-wider text-sm">
          Add Address
        </button>
      </div>
    </div>
  );
}

function AccountSettings() {
  const { user, logout } = useApp();
  
  return (
    <div>
      <h2 className="text-white text-2xl mb-6 uppercase tracking-wider">Account Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-white text-lg mb-4 uppercase tracking-wider">Profile Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-white/80 uppercase tracking-wider">Full Name</label>
              <input type="text" value={user?.fullName} className="w-full px-4 py-2 bg-white/5 border border-white/20 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-[#EEFF00]" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-white/80 uppercase tracking-wider">Email</label>
              <input type="email" value={user?.email} className="w-full px-4 py-2 bg-white/5 border border-white/20 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-[#EEFF00]" />
            </div>
            <button className="px-6 py-2 bg-[#EEFF00] text-black rounded-sm hover:bg-[#EEFF00]/90 uppercase tracking-wider text-sm">
              Update Profile
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <h3 className="text-white text-lg mb-4 uppercase tracking-wider">Password</h3>
          <button className="text-sm text-white/60 hover:text-[#EEFF00] underline uppercase tracking-wider">
            Change Password
          </button>
        </div>

        <div className="pt-6 border-t border-white/10">
          <button onClick={logout} className="flex items-center gap-2 text-red-400 hover:text-red-300 uppercase tracking-wider text-sm">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Account() {
  const { user } = useApp();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  const navItems = [
    { to: '/account', label: 'Dashboard', icon: User, exact: true },
    { to: '/account/orders', label: 'Orders', icon: Package },
    { to: '/account/wishlist', label: 'Wishlist', icon: Heart },
    { to: '/account/addresses', label: 'Addresses', icon: MapPin },
    { to: '/account/settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? location.pathname === item.to
                  : location.pathname.startsWith(item.to);
                
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                      isActive ? 'bg-[#EEFF00] text-black' : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            <Routes>
              <Route index element={<AccountOverview />} />
              <Route path="orders" element={<Orders />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="addresses" element={<Addresses />} />
              <Route path="settings" element={<AccountSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}