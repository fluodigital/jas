import { useState } from 'react';
import { Plus, Edit, Trash2, Image } from 'lucide-react';
import { products } from '../../data/products';

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  coverImage?: string;
}

export default function Collections() {
  // Get unique collections from products
  const collectionsFromProducts = [...new Set(products.flatMap((p) => p.collections))];
  
  const [collections, setCollections] = useState<Collection[]>(
    collectionsFromProducts.map((name, index) => ({
      id: `${index + 1}`,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      description: `Beautiful ${name.toLowerCase()} photography prints`,
      productCount: products.filter((p) => p.collections.includes(name)).length,
      coverImage: products.find((p) => p.collections.includes(name))?.images[0],
    }))
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing
      setCollections(collections.map((c) =>
        c.id === editingId ? { ...c, ...formData } : c
      ));
    } else {
      // Create new
      const newCollection: Collection = {
        id: `${collections.length + 1}`,
        ...formData,
        productCount: 0,
      };
      setCollections([...collections, newCollection]);
    }
    
    // Reset form
    setFormData({ name: '', slug: '', description: '' });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEdit = (collection: Collection) => {
    setFormData({
      name: collection.name,
      slug: collection.slug,
      description: collection.description,
    });
    setEditingId(collection.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this collection? Products will not be deleted.')) {
      setCollections(collections.filter((c) => c.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', slug: '', description: '' });
    setEditingId(null);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Collections</h1>
          <p className="text-white/60">Organize your products into collections</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#EEFF00] text-black rounded-md hover:bg-[#EEFF00]/90 transition-colors uppercase tracking-wider text-sm"
        >
          <Plus size={20} />
          Add Collection
        </button>
      </div>

      {/* Form */}
      {isFormOpen && (
        <div className="bg-black border border-white/10 rounded-lg p-6">
          <h2 className="text-xl text-white mb-4">
            {editingId ? 'Edit Collection' : 'New Collection'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm text-white/80 mb-2">
                  Collection Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                  placeholder="Nature"
                  required
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm text-white/80 mb-2">
                  URL Slug *
                </label>
                <input
                  type="text"
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                  placeholder="nature"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm text-white/80 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                placeholder="Describe this collection..."
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-[#EEFF00] text-black rounded-md hover:bg-[#EEFF00]/90 transition-colors uppercase tracking-wider text-sm"
              >
                {editingId ? 'Update' : 'Create'} Collection
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-white/30 text-white rounded-md hover:bg-white/5 transition-colors uppercase tracking-wider text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <div key={collection.id} className="bg-black border border-white/10 rounded-lg overflow-hidden group hover:border-white/30 transition-colors">
            {/* Cover Image */}
            <div className="aspect-video bg-white/5 relative overflow-hidden">
              {collection.coverImage ? (
                <img
                  src={collection.coverImage}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="text-white/20" size={48} />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleEdit(collection)}
                  className="p-2 bg-white/20 rounded-md hover:bg-white/30 text-white"
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(collection.id)}
                  className="p-2 bg-white/20 rounded-md hover:bg-white/30 text-white"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="p-6">
              <h3 className="text-lg text-white font-semibold mb-2">{collection.name}</h3>
              <p className="text-sm text-white/60 mb-4 line-clamp-2">{collection.description}</p>
              <div className="flex items-center justify-between text-xs text-white/40">
                <span>{collection.productCount} products</span>
                <span>/{collection.slug}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {collections.length === 0 && (
        <div className="text-center py-12 bg-black border border-white/10 rounded-lg">
          <Image className="mx-auto mb-4 text-white/20" size={48} />
          <p className="text-white/60 mb-4">No collections yet</p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 text-[#EEFF00] hover:underline"
          >
            <Plus size={18} />
            Create your first collection
          </button>
        </div>
      )}
    </div>
  );
}
