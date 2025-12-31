import { useState } from 'react';
import { Upload, Search, Grid, List, Download, Trash2 } from 'lucide-react';

interface ImageFile {
  id: string;
  url: string;
  name: string;
  size: string;
  uploadedAt: string;
  usedIn: number;
}

export default function ImageUpload() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // Mock images - TODO: Replace with real data from storage
  const [images, setImages] = useState<ImageFile[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?w=800',
      name: 'golden-hour-landscape.jpg',
      size: '2.4 MB',
      uploadedAt: '2024-12-20',
      usedIn: 3,
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      name: 'mountain-vista.jpg',
      size: '3.1 MB',
      uploadedAt: '2024-12-18',
      usedIn: 2,
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=800',
      name: 'city-lights.jpg',
      size: '1.8 MB',
      uploadedAt: '2024-12-15',
      usedIn: 1,
    },
  ]);

  const filteredImages = images.filter((img) =>
    img.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    if (files) {
      // TODO: Implement actual upload to storage
      // Mock: Add placeholder images
      const newImages = Array.from(files).map((file, index) => ({
        id: `new-${Date.now()}-${index}`,
        url: 'https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?w=800',
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadedAt: new Date().toISOString().split('T')[0],
        usedIn: 0,
      }));
      setImages([...newImages, ...images]);
    }
  };

  const handleDelete = (ids: string[]) => {
    if (window.confirm(`Delete ${ids.length} image(s)?`)) {
      setImages(images.filter((img) => !ids.includes(img.id)));
      setSelectedImages([]);
    }
  };

  const toggleSelectImage = (id: string) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedImages(filteredImages.map((img) => img.id));
  };

  const deselectAll = () => {
    setSelectedImages([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-white mb-2">Image Library</h1>
        <p className="text-white/60">Upload and manage your photography images</p>
      </div>

      {/* Upload Area */}
      <div className="bg-black border-2 border-dashed border-white/20 rounded-lg p-12 text-center hover:border-[#EEFF00] transition-colors">
        <label className="cursor-pointer">
          <Upload className="mx-auto mb-4 text-white/40" size={48} />
          <p className="text-white mb-2">
            <span className="text-[#EEFF00]">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm text-white/60">PNG, JPG, WEBP up to 10MB</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Toolbar */}
      <div className="bg-black border border-white/10 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {selectedImages.length > 0 && (
              <>
                <button
                  onClick={deselectAll}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Deselect All
                </button>
                <button
                  onClick={() => handleDelete(selectedImages)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-400 rounded-md hover:bg-red-500/20 transition-colors text-sm"
                >
                  <Trash2 size={16} />
                  Delete ({selectedImages.length})
                </button>
              </>
            )}
            {selectedImages.length === 0 && (
              <button
                onClick={selectAll}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Select All
              </button>
            )}
            <div className="flex gap-1 border border-white/20 rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid' ? 'bg-[#EEFF00] text-black' : 'text-white/60 hover:bg-white/5'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list' ? 'bg-[#EEFF00] text-black' : 'text-white/60 hover:bg-white/5'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="text-sm text-white/60">
        {filteredImages.length} images • {selectedImages.length} selected
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => {
            const isSelected = selectedImages.includes(image.id);
            return (
              <div
                key={image.id}
                className={`relative group bg-black border rounded-lg overflow-hidden cursor-pointer transition-all ${
                  isSelected ? 'border-[#EEFF00] ring-2 ring-[#EEFF00]' : 'border-white/10 hover:border-white/30'
                }`}
                onClick={() => toggleSelectImage(image.id)}
              >
                <div className="aspect-square">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(image.url, '_blank');
                    }}
                    className="p-2 bg-white/20 rounded-md hover:bg-white/30 text-white"
                    title="Download"
                  >
                    <Download size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete([image.id]);
                    }}
                    className="p-2 bg-white/20 rounded-md hover:bg-white/30 text-white"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Checkbox */}
                <div className="absolute top-2 left-2">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected ? 'bg-[#EEFF00] border-[#EEFF00]' : 'bg-black/50 border-white/50'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Used Badge */}
                {image.usedIn > 0 && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-[#EEFF00] text-black text-xs rounded">
                    Used in {image.usedIn}
                  </div>
                )}

                {/* Info */}
                <div className="p-3 border-t border-white/10">
                  <p className="text-xs text-white truncate mb-1">{image.name}</p>
                  <p className="text-xs text-white/40">{image.size}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-black border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    checked={selectedImages.length === filteredImages.length}
                    onChange={(e) => (e.target.checked ? selectAll() : deselectAll())}
                    className="w-4 h-4 accent-[#EEFF00]"
                  />
                </th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">Preview</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">Name</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">Size</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">Uploaded</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-white/60">Used In</th>
                <th className="text-right p-4 text-xs uppercase tracking-wider text-white/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredImages.map((image) => (
                <tr key={image.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      onChange={() => toggleSelectImage(image.id)}
                      className="w-4 h-4 accent-[#EEFF00]"
                    />
                  </td>
                  <td className="p-4">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-4 text-sm text-white">{image.name}</td>
                  <td className="p-4 text-sm text-white/60">{image.size}</td>
                  <td className="p-4 text-sm text-white/60">{image.uploadedAt}</td>
                  <td className="p-4 text-sm text-white/60">{image.usedIn} products</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => window.open(image.url, '_blank')}
                        className="p-2 hover:bg-white/10 rounded-md text-white/60 hover:text-white transition-colors"
                        title="Download"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete([image.id])}
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
      )}

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12 text-white/60">
          <p>No images found</p>
        </div>
      )}
    </div>
  );
}
