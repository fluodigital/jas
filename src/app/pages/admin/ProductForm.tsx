import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Upload } from 'lucide-react';
import { products } from '../../data/products';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  // Find existing product if editing
  const existingProduct = isEdit ? products.find((p) => p.id === id) : null;

  // Form state
  const [formData, setFormData] = useState({
    title: existingProduct?.title || '',
    slug: existingProduct?.slug || '',
    description: existingProduct?.description || '',
    collections: existingProduct?.collections || [],
    tags: existingProduct?.tags || [],
    basePrice: existingProduct?.basePrice || 49,
    featured: existingProduct?.featured || false,
    availability: existingProduct?.availability || 'in-stock',
    orientation: existingProduct?.orientation || 'landscape',
    location: existingProduct?.metadata.location || '',
    dateTaken: existingProduct?.metadata.dateTaken || '',
    camera: existingProduct?.metadata.camera || '',
    lens: existingProduct?.metadata.lens || '',
  });

  const [images, setImages] = useState<string[]>(existingProduct?.images || []);
  const [newCollection, setNewCollection] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual save logic
    navigate('/admin/products');
  };

  const handleAddCollection = () => {
    if (newCollection && !formData.collections.includes(newCollection)) {
      setFormData({
        ...formData,
        collections: [...formData.collections, newCollection],
      });
      setNewCollection('');
    }
  };

  const handleRemoveCollection = (collection: string) => {
    setFormData({
      ...formData,
      collections: formData.collections.filter((c) => c !== collection),
    });
  };

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag],
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement actual image upload logic
    const {files} = e.target;
    if (files) {
      // Mock: just add placeholder URLs
      const newImages = Array.from(files).map(() => 
        'https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?w=800'
      );
      setImages([...images, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-white/60">
            {isEdit ? 'Update product details' : 'Add a new print to your gallery'}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-3 border border-white/30 text-white rounded-md hover:bg-white/5 transition-colors uppercase tracking-wider text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-[#EEFF00] text-black rounded-md hover:bg-[#EEFF00]/90 transition-colors uppercase tracking-wider text-sm"
          >
            <Save size={20} />
            Save Product
          </button>
        </div>
      </div>

      {/* Images */}
      <div className="bg-black border border-white/10 rounded-lg p-6">
        <h2 className="text-xl text-white mb-4">Product Images</h2>
        
        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {images.map((image, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 p-2 bg-black/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-[#EEFF00] text-black text-xs rounded">
                  Primary
                </div>
              )}
            </div>
          ))}
          
          {/* Upload Button */}
          <label className="aspect-square border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#EEFF00] transition-colors">
            <Upload className="text-white/40 mb-2" size={32} />
            <span className="text-sm text-white/60">Upload Image</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
        
        <p className="text-xs text-white/40">
          First image will be used as the primary product image
        </p>
      </div>

      {/* Basic Information */}
      <div className="bg-black border border-white/10 rounded-lg p-6 space-y-4">
        <h2 className="text-xl text-white mb-4">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm text-white/80 mb-2">
              Product Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
              placeholder="Golden Hour Landscape"
              required
            />
          </div>

          {/* Slug */}
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
              placeholder="golden-hour-landscape"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm text-white/80 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
            placeholder="Describe your photograph..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Base Price */}
          <div>
            <label htmlFor="basePrice" className="block text-sm text-white/80 mb-2">
              Base Price (£) *
            </label>
            <input
              type="number"
              id="basePrice"
              value={formData.basePrice}
              onChange={(e) => setFormData({ ...formData, basePrice: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
              min="0"
              required
            />
          </div>

          {/* Orientation */}
          <div>
            <label htmlFor="orientation" className="block text-sm text-white/80 mb-2">
              Orientation *
            </label>
            <select
              id="orientation"
              value={formData.orientation}
              onChange={(e) => setFormData({ ...formData, orientation: e.target.value as any })}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
            >
              <option value="landscape" className="bg-black">Landscape</option>
              <option value="portrait" className="bg-black">Portrait</option>
              <option value="square" className="bg-black">Square</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Availability */}
          <div>
            <label htmlFor="availability" className="block text-sm text-white/80 mb-2">
              Availability *
            </label>
            <select
              id="availability"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value as any })}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
            >
              <option value="in-stock" className="bg-black">In Stock</option>
              <option value="low-stock" className="bg-black">Low Stock</option>
              <option value="out-of-stock" className="bg-black">Out of Stock</option>
            </select>
          </div>

          {/* Featured */}
          <div>
            <label className="block text-sm text-white/80 mb-2">Options</label>
            <label className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/20 rounded-md cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 accent-[#EEFF00]"
              />
              <span className="text-white">Featured Product</span>
            </label>
          </div>
        </div>
      </div>

      {/* Collections & Tags */}
      <div className="bg-black border border-white/10 rounded-lg p-6 space-y-4">
        <h2 className="text-xl text-white mb-4">Collections & Tags</h2>

        {/* Collections */}
        <div>
          <label className="block text-sm text-white/80 mb-2">Collections</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newCollection}
              onChange={(e) => setNewCollection(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCollection())}
              className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
              placeholder="Add collection (e.g., Nature)"
            />
            <button
              type="button"
              onClick={handleAddCollection}
              className="px-6 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.collections.map((collection) => (
              <span
                key={collection}
                className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEFF00]/10 text-[#EEFF00] border border-[#EEFF00]/50 rounded-full text-sm"
              >
                {collection}
                <button
                  type="button"
                  onClick={() => handleRemoveCollection(collection)}
                  className="hover:text-white"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm text-white/80 mb-2">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
              placeholder="Add tag (e.g., sunset)"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-6 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-white"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="bg-black border border-white/10 rounded-lg p-6 space-y-4">
        <h2 className="text-xl text-white mb-4">Photo Metadata</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm text-white/80 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
              placeholder="Scottish Highlands"
            />
          </div>

          <div>
            <label htmlFor="dateTaken" className="block text-sm text-white/80 mb-2">
              Date Taken
            </label>
            <input
              type="text"
              id="dateTaken"
              value={formData.dateTaken}
              onChange={(e) => setFormData({ ...formData, dateTaken: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
              placeholder="June 2024"
            />
          </div>

          <div>
            <label htmlFor="camera" className="block text-sm text-white/80 mb-2">
              Camera
            </label>
            <input
              type="text"
              id="camera"
              value={formData.camera}
              onChange={(e) => setFormData({ ...formData, camera: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
              placeholder="Canon EOS R5"
            />
          </div>

          <div>
            <label htmlFor="lens" className="block text-sm text-white/80 mb-2">
              Lens
            </label>
            <input
              type="text"
              id="lens"
              value={formData.lens}
              onChange={(e) => setFormData({ ...formData, lens: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
              placeholder="24-70mm f/2.8"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
