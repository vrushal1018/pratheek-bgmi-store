# BGMI ID Store Website

A responsive website for selling BGMI (Battlegrounds Mobile India) game accounts with advanced filtering, booking system, and admin panel for store owners.

## Features

### 🎮 User Features
- **Browse BGMI IDs**: View all available game accounts with detailed information
- **Budget Filtering**: Filter IDs by your budget range (₹0 - ₹5000+)
- **Search & Filter**: Search IDs by title, description, or rank
- **Detailed View**: Comprehensive information including level, rank, K/D ratio, skins, and matches
- **Direct Booking**: Book IDs directly through the website with contact forms
- **Custom Requests**: Submit custom ID requirements via WhatsApp integration
- **Responsive Design**: Mobile-first design that works on all devices

### 🛍️ Store Owner Features
- **Admin Panel**: Complete management system for store owners
- **Add New IDs**: Upload new BGMI accounts with images, descriptions, and stats
- **Edit Existing IDs**: Modify account details, prices, and availability
- **Delete IDs**: Remove sold or unavailable accounts
- **Mobile Upload**: Upload images directly from phone camera or gallery
- **Real-time Updates**: Changes appear immediately on the website
- **Inventory Management**: Track total IDs, available count, and total value

### 📱 Mobile-First Design
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Touch-Friendly**: Large buttons and easy navigation on mobile devices
- **Image Upload**: Direct camera access for uploading ID screenshots
- **WhatsApp Integration**: Direct messaging for customer support

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Local Storage**: Persistent data storage
- **Responsive Design**: Mobile-first approach

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bgmi-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navbar.tsx     # Navigation component
├── context/            # React context for state management
│   └── IDContext.tsx  # BGMI ID data context
├── pages/              # Page components
│   ├── Home.tsx       # Home page with ID listing
│   ├── IDDetails.tsx  # Individual ID details page
│   └── AdminPanel.tsx # Admin panel for store owners
├── App.tsx            # Main app component with routing
└── index.css          # Global styles and Tailwind imports
```

## Configuration

### Contact Information
Update the following in the components:
- **Phone Number**: Change `919876543210` to your actual phone number
- **WhatsApp Link**: Update the WhatsApp integration number
- **Store Name**: Modify the store branding as needed

### Customization
- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Images**: Replace placeholder images with actual BGMI account screenshots
- **Categories**: Add more rank options or game-specific features

## Usage Guide

### For Customers
1. **Browse IDs**: Use the budget slider and search to find suitable accounts
2. **View Details**: Click on any ID card to see comprehensive information
3. **Book ID**: Use the booking form or contact buttons to purchase
4. **Custom Requests**: Submit specific requirements if you don't see what you need

### For Store Owners
1. **Access Admin Panel**: Navigate to `/admin` route
2. **Add New IDs**: Click "Add New ID" and fill in the details
3. **Upload Images**: Use the image upload feature to add account screenshots
4. **Manage Inventory**: Edit, delete, or mark IDs as sold/unavailable
5. **Monitor Stats**: View total inventory value and availability counts

## Features in Detail

### Budget Filtering System
- **Range Slider**: Interactive slider from ₹0 to ₹5000+
- **Quick Buttons**: Pre-set budget ranges for common searches
- **Real-time Results**: Instant filtering as you adjust budget
- **Clear Filters**: Easy reset to view all available IDs

### ID Details Page
- **High-Quality Images**: Large account screenshots with overlay information
- **Comprehensive Stats**: Level, rank, K/D ratio, matches, and skins
- **Action Buttons**: Direct booking, WhatsApp contact, and phone calls
- **Responsive Layout**: Optimized viewing on all device sizes

### Admin Panel Features
- **Dashboard Stats**: Total IDs, available count, total value, and premium accounts
- **Table View**: Sortable list of all IDs with quick actions
- **Form Validation**: Required field validation and error handling
- **Image Preview**: Real-time preview of uploaded images
- **Bulk Operations**: Easy management of multiple accounts

### WhatsApp Integration
- **Direct Messaging**: Pre-filled messages for quick communication
- **Custom Requests**: Structured format for customer requirements
- **Booking Confirmations**: Automated message formatting for orders
- **Customer Support**: Quick access to store owner for questions

## Mobile Optimization

### Responsive Design
- **Mobile-First**: Designed primarily for mobile devices
- **Touch Targets**: Large, easy-to-tap buttons and inputs
- **Swipe Navigation**: Smooth scrolling and navigation
- **Image Optimization**: Compressed images for fast loading

### Phone Features
- **Camera Access**: Direct photo capture for ID uploads
- **Gallery Integration**: Choose existing photos from device
- **Touch Gestures**: Intuitive mobile interactions
- **Offline Support**: Local storage for basic functionality

## Security Features

- **Input Validation**: Form validation and sanitization
- **Local Storage**: Secure data persistence
- **No Backend Required**: Client-side only for demo purposes
- **Privacy Focused**: No user data collection or tracking

## Future Enhancements

### Planned Features
- **User Authentication**: Customer accounts and order history
- **Payment Integration**: Online payment processing
- **Real-time Chat**: Live customer support
- **Analytics Dashboard**: Sales and customer insights
- **Multi-language Support**: Regional language options

### Technical Improvements
- **Backend API**: Server-side data management
- **Database Integration**: Persistent data storage
- **Image CDN**: Optimized image delivery
- **PWA Support**: Progressive web app features

## Support & Contact

For technical support or feature requests:
- **Email**: [Your Email]
- **Phone**: [Your Phone Number]
- **WhatsApp**: [Your WhatsApp Number]

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Note**: This is a demo website. For production use, implement proper backend services, database security, and user authentication.
