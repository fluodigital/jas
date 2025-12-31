import { useState } from 'react';
import { Search, Eye, Download } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
  };
  products: {
    name: string;
    size: string;
    quantity: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  shippingAddress: string;
}

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock orders - TODO: Replace with real data
  const orders: Order[] = [
    {
      id: '1',
      orderNumber: '#1234',
      customer: { name: 'John Smith', email: 'john@example.com' },
      products: [{ name: 'Golden Hour Landscape', size: '16x20', quantity: 1 }],
      total: 129,
      status: 'delivered',
      date: '2024-12-20',
      shippingAddress: '123 Main St, London, UK',
    },
    {
      id: '2',
      orderNumber: '#1233',
      customer: { name: 'Sarah Johnson', email: 'sarah@example.com' },
      products: [
        { name: 'City Lights', size: '12x16', quantity: 1 },
        { name: 'Mountain Vista', size: '24x36', quantity: 1 },
      ],
      total: 278,
      status: 'shipped',
      date: '2024-12-18',
      shippingAddress: '456 Oak Ave, Manchester, UK',
    },
    {
      id: '3',
      orderNumber: '#1232',
      customer: { name: 'Mike Wilson', email: 'mike@example.com' },
      products: [{ name: 'Abstract Sunset', size: '24x36', quantity: 2 }],
      total: 398,
      status: 'processing',
      date: '2024-12-15',
      shippingAddress: '789 Pine Rd, Birmingham, UK',
    },
    {
      id: '4',
      orderNumber: '#1231',
      customer: { name: 'Emma Davis', email: 'emma@example.com' },
      products: [{ name: 'Urban Street', size: '8x10', quantity: 3 }],
      total: 147,
      status: 'pending',
      date: '2024-12-14',
      shippingAddress: '321 Elm St, Liverpool, UK',
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/10 text-green-400 border-green-500/50';
      case 'shipped':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/50';
      case 'processing':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50';
      case 'pending':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/50';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/50';
      default:
        return 'bg-white/10 text-white/60 border-white/30';
    }
  };

  const updateStatus = (orderId: string, newStatus: Order['status']) => 
    // TODO: Implement actual status update
     ({ orderId, newStatus })
  ;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-white mb-2">Orders</h1>
        <p className="text-white/60">Manage customer orders and fulfillment</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {['all', 'pending', 'processing', 'shipped', 'delivered'].map((status) => {
          const count = status === 'all' ? orders.length : orders.filter((o) => o.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`p-4 rounded-lg border transition-colors ${
                statusFilter === status
                  ? 'bg-[#EEFF00] border-[#EEFF00] text-black'
                  : 'bg-black border-white/10 text-white hover:border-white/30'
              }`}
            >
              <p className="text-2xl font-semibold mb-1">{count}</p>
              <p className="text-sm capitalize opacity-80">{status}</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-black border border-white/10 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders, customers..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
            />
          </div>

          {/* Export */}
          <button className="flex items-center gap-2 px-6 py-2 border border-white/30 text-white rounded-md hover:bg-white/5 transition-colors">
            <Download size={18} />
            <span className="text-sm">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Orders Count */}
      <div className="text-sm text-white/60">
        Showing {filteredOrders.length} of {orders.length} orders
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-black border border-white/10 rounded-lg overflow-hidden">
            {/* Order Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg text-white font-semibold">{order.orderNumber}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/60">
                    {order.customer.name} • {order.customer.email}
                  </p>
                  <p className="text-xs text-white/40 mt-1">{order.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-2xl text-white font-semibold">£{order.total}</p>
                    <p className="text-xs text-white/60">{order.products.length} item(s)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Products */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white/60 mb-3">Products</h4>
                  <div className="space-y-2">
                    {order.products.map((product, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-white/80">
                          {product.name} ({product.size})
                        </span>
                        <span className="text-white/60">×{product.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-white/60 mb-3">Shipping Address</h4>
                  <p className="text-sm text-white/80">{order.shippingAddress}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 text-white rounded-md hover:bg-white/10 transition-colors text-sm">
                  <Eye size={16} />
                  View Details
                </button>
                
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value as Order['status'])}
                    className="px-4 py-2 bg-white/5 border border-white/20 text-white rounded-md hover:bg-white/10 transition-colors text-sm"
                  >
                    <option value="pending" className="bg-black">Pending</option>
                    <option value="processing" className="bg-black">Processing</option>
                    <option value="shipped" className="bg-black">Shipped</option>
                    <option value="delivered" className="bg-black">Delivered</option>
                    <option value="cancelled" className="bg-black">Cancelled</option>
                  </select>
                )}

                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 text-white rounded-md hover:bg-white/10 transition-colors text-sm ml-auto">
                  <Download size={16} />
                  Invoice
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12 bg-black border border-white/10 rounded-lg">
          <p className="text-white/60 mb-2">No orders found</p>
          <p className="text-sm text-white/40">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
