import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { products } from '../../data/products';

export default function ProductList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('all');

  // Get unique collections
  const collections = ['all', ...new Set(products.flatMap((p) => p.collections))];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCollection =
      selectedCollection === 'all' || product.collections.includes(selectedCollection);
    return matchesSearch && matchesCollection;
  });

  const handleDelete = (_id: string) => {
    // TODO: Implement actual delete logic
    if (window.confirm('Are you sure you want to delete this product?')) {
      // In real implementation, call API to delete
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl text-white mb-2">Products</h1>
          <p className="text-white/60">Manage your photography prints</p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#EEFF00] text-black rounded-md hover:bg-[#EEFF00]/90 transition-colors uppercase tracking-wider text-sm"
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-black border border-white/10 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
            />
          </div>

          {/* Collection Filter */}
          <select
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
          >
            {collections.map((collection) => (
              <option key={collection} value={collection} className="bg-black">
                {collection === 'all' ? 'All Collections' : collection}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Count */}
      <div className="text-sm text-white/60">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Products Table */}
      <div className="bg-black border border-white/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">Image</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">Title</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">Collections</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">Price</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">Status</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">Featured</th>
                <th className="text-right p-4 text-xs uppercase tracking-wider text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-white font-medium">{product.title}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {product.collections.map((collection) => (
                        <span
                          key={collection}
                          className="px-2 py-1 bg-white/10 text-white/70 rounded text-xs"
                        >
                          {collection}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-white">£{product.basePrice}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider ${
                        product.availability === 'in-stock'
                          ? 'bg-green-500/10 text-green-400 border border-green-500/50'
                          : product.availability === 'low-stock'
                          ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/50'
                          : 'bg-red-500/10 text-red-400 border border-red-500/50'
                      }`}
                    >
                      {product.availability.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${
                        product.featured ? 'bg-[#EEFF00]' : 'bg-white/20'
                      }`}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/product/${product.slug}`}
                        target="_blank"
                        className="p-2 hover:bg-white/10 rounded-md text-white/60 hover:text-white transition-colors"
                        title="View"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="p-2 hover:bg-white/10 rounded-md text-white/60 hover:text-[#EEFF00] transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 hover:bg-white/10 rounded-md text-white/60 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60 mb-4">No products found</p>
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 text-[#EEFF00] hover:underline"
          >
            <Plus size={18} />
            Add your first product
          </Link>
        </div>
      )}
    </div>
  );
}
