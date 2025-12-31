import { Package, ShoppingBag, Image, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';

export default function AdminDashboard() {
  // Mock stats - TODO: Replace with real data from database
  const stats = [
    {
      label: 'Total Products',
      value: products.length.toString(),
      change: '+3 this month',
      icon: Package,
      color: 'text-blue-400',
    },
    {
      label: 'Total Orders',
      value: '127',
      change: '+12 this week',
      icon: ShoppingBag,
      color: 'text-green-400',
    },
    {
      label: 'Total Images',
      value: '48',
      change: '+8 this month',
      icon: Image,
      color: 'text-purple-400',
    },
    {
      label: 'Revenue',
      value: '£12,450',
      change: '+18% this month',
      icon: TrendingUp,
      color: 'text-[#EEFF00]',
    },
  ];

  // Mock recent orders - TODO: Replace with real data
  const recentOrders = [
    { id: '#1234', customer: 'John Smith', product: 'Golden Hour Landscape', amount: '£129', status: 'completed' },
    { id: '#1233', customer: 'Sarah Johnson', product: 'City Lights', amount: '£79', status: 'processing' },
    { id: '#1232', customer: 'Mike Wilson', product: 'Abstract Sunset', amount: '£199', status: 'completed' },
    { id: '#1231', customer: 'Emma Davis', product: 'Mountain Vista', amount: '£129', status: 'pending' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-white mb-2">Dashboard</h1>
        <p className="text-white/60">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-black border border-white/10 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-2xl text-white font-semibold mb-1">{stat.value}</p>
              <p className="text-sm text-white/60 mb-2">{stat.label}</p>
              <p className="text-xs text-green-400">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/products/new"
          className="bg-black border border-white/10 rounded-lg p-6 hover:border-[#EEFF00] transition-colors group"
        >
          <Package className="text-[#EEFF00] mb-4" size={32} />
          <h3 className="text-lg text-white mb-2 group-hover:text-[#EEFF00] transition-colors">
            Add New Product
          </h3>
          <p className="text-sm text-white/60">Upload a new print to your gallery</p>
        </Link>

        <Link
          to="/admin/images"
          className="bg-black border border-white/10 rounded-lg p-6 hover:border-[#EEFF00] transition-colors group"
        >
          <Image className="text-[#EEFF00] mb-4" size={32} />
          <h3 className="text-lg text-white mb-2 group-hover:text-[#EEFF00] transition-colors">
            Manage Images
          </h3>
          <p className="text-sm text-white/60">Upload and organize your photos</p>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-black border border-white/10 rounded-lg p-6 hover:border-[#EEFF00] transition-colors group"
        >
          <ShoppingBag className="text-[#EEFF00] mb-4" size={32} />
          <h3 className="text-lg text-white mb-2 group-hover:text-[#EEFF00] transition-colors">
            View Orders
          </h3>
          <p className="text-sm text-white/60">Manage customer orders</p>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-black border border-white/10 rounded-lg">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl text-white">Recent Orders</h2>
          <Link
            to="/admin/orders"
            className="text-sm text-[#EEFF00] hover:underline flex items-center gap-1"
          >
            View All <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">Order</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">Customer</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">Product</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">Amount</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 text-sm text-white">{order.id}</td>
                  <td className="p-4 text-sm text-white/80">{order.customer}</td>
                  <td className="p-4 text-sm text-white/80">{order.product}</td>
                  <td className="p-4 text-sm text-white">{order.amount}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider ${
                        order.status === 'completed'
                          ? 'bg-green-500/10 text-green-400 border border-green-500/50'
                          : order.status === 'processing'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/50'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/50'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
