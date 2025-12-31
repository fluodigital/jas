# Admin Panel Documentation

## Overview

The Jas Soni Photography website includes a complete admin panel for managing your photography portfolio and e-commerce store. The admin interface is fully designed and ready to be connected to a database backend (e.g., Supabase).

## Accessing the Admin Panel

### Admin Login
- **URL**: `/admin/login`
- **Demo Credentials**:
  - Email: `admin@jassoni.com`
  - Password: `admin123`
- **Link Location**: Footer of every page (bottom right under "Legal" section)

## Admin Pages

### 1. Dashboard (`/admin`)
- Overview of key metrics (products, orders, revenue, images)
- Quick action cards for common tasks
- Recent orders table with status tracking
- Stats widgets showing business performance

### 2. Products (`/admin/products`)
- View all products in a searchable, filterable table
- Filter by collection
- Search by product name
- Quick actions: View, Edit, Delete
- Product status indicators (in-stock, low-stock, out-of-stock)
- Featured product indicator

**Add/Edit Product** (`/admin/products/new` or `/admin/products/edit/:id`)
- Upload multiple product images (with drag & drop support)
- Basic information: title, slug, description, price
- Collections and tags management
- Availability and orientation settings
- Photo metadata: location, date, camera, lens
- Featured product toggle

### 3. Images (`/admin/images`)
- Upload and manage photography images
- Drag & drop image upload
- Grid and list view modes
- Bulk select and delete
- Search functionality
- Track which products use each image
- View image details (name, size, upload date)

### 4. Orders (`/admin/orders`)
- View and manage customer orders
- Filter by status (pending, processing, shipped, delivered, cancelled)
- Search by order number, customer name, or email
- View order details (products, shipping address, total)
- Update order status
- Export orders to CSV
- Download invoices

### 5. Collections (`/admin/collections`)
- Create and manage product collections
- Edit collection details (name, slug, description)
- View product count per collection
- Cover image preview
- Delete collections (products remain intact)

### 6. Settings (`/admin/settings`)
- **Site Settings**: Name, tagline, description
- **Contact Information**: Email, phone, address, social media
- **Business Settings**: Currency, tax rate, shipping fee
- **Email Notifications**: Toggle order confirmations, shipping notifications, low stock alerts

## Features

### Current Implementation (Frontend Only)
✅ Complete UI for all admin pages  
✅ Form validation and user feedback  
✅ Responsive design (mobile & desktop)  
✅ Dark theme matching the site aesthetic  
✅ Mock data for demonstration  
✅ Intuitive navigation with sidebar  
✅ Search and filter functionality  

### Ready for Backend Integration
🔌 All forms have submit handlers ready for API calls  
🔌 CRUD operations structured for database integration  
🔌 Image upload fields ready for storage service  
🔌 Authentication flow designed for real auth system  

## Connecting to a Database (Next Steps)

To make the admin panel fully functional, you'll need to:

1. **Set up Supabase** (or your preferred backend)
   - Create a Supabase project
   - Set up authentication
   - Create database tables for products, orders, collections, etc.
   - Set up storage buckets for images

2. **Replace Mock Data**
   - Update `/src/app/data/products.ts` to fetch from database
   - Connect forms to API endpoints
   - Implement real authentication in `AdminLogin.tsx`

3. **Add API Integration**
   - Create API service layer for CRUD operations
   - Connect image uploads to storage
   - Implement order management
   - Add real-time updates

## File Structure

```
/src/app/
├── components/
│   └── AdminLayout.tsx          # Admin sidebar layout
├── pages/
│   └── admin/
│       ├── AdminLogin.tsx       # Admin authentication
│       ├── AdminDashboard.tsx   # Dashboard overview
│       ├── ProductList.tsx      # Products listing
│       ├── ProductForm.tsx      # Add/Edit product
│       ├── ImageUpload.tsx      # Image management
│       ├── Orders.tsx           # Order management
│       ├── Collections.tsx      # Collection management
│       └── Settings.tsx         # Site settings
```

## Design Notes

- **Color Scheme**: Matches the site's editorial aesthetic with black backgrounds (#000000, #1a1a1a) and neon yellow (#EEFF00) accents
- **Typography**: Editorial style with uppercase tracking for labels and headers
- **Layout**: Sidebar navigation on desktop, hamburger menu on mobile
- **Forms**: Consistent styling with white/5 backgrounds and white/20 borders

## Security Considerations

⚠️ **Important**: This is a frontend-only implementation. For production use:
- Implement proper authentication with session management
- Add role-based access control (admin vs. customer)
- Validate all inputs on the backend
- Implement CSRF protection
- Use HTTPS only
- Add rate limiting
- Sanitize user inputs
- Implement proper file upload validation

## Demo Credentials

For development/demo purposes only:
- Email: `admin@jassoni.com`
- Password: `admin123`

**Replace this with real authentication before deploying to production!**

## Support

The admin panel is fully designed and ready to use. All TODO comments in the code indicate where you need to add your backend integration logic.
