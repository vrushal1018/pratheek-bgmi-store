# BGMI Store Admin System

## 🔐 Admin Access

**Password:** `bgmi2024`

## 🚀 How to Access Admin Panel

1. **Click the "Admin" button** in the navigation bar
2. **Enter the admin password:** `bgmi2024`
3. **Click "Login"** to access the admin panel

## 🛡️ Security Features

- **Password Protection:** Only users with the correct password can access admin functions
- **Session Persistence:** Admin access persists across browser sessions until logout
- **Route Protection:** Admin panel is completely hidden from unauthorized users
- **Automatic Redirect:** Unauthorized users are redirected to home page

## 🎯 Admin Functions

- **Add New BGMI IDs** with full details
- **Edit existing IDs** (title, description, price, stats, etc.)
- **Delete IDs** from inventory
- **Mark IDs as Sold** (changes availability status)
- **Debug Storage** for troubleshooting
- **Force Save** to localStorage
- **Clear All IDs** (use with caution)
- **Logout** to end admin session

## 🔒 Important Notes

- **Keep the password secure** - don't share it with customers
- **Logout when done** - especially on shared devices
- **Password is stored in code** - change it in `src/context/AdminContext.tsx` if needed
- **For production:** Consider implementing server-side authentication

## 🛠️ Customization

To change the admin password, edit `src/context/AdminContext.tsx`:

```typescript
const ADMIN_PASSWORD = 'your-new-password';
```

## 📱 Mobile Access

Admin panel is fully responsive and works on all devices.
