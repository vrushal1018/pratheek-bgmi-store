# 🗄️ PocketBase Setup Guide for BGMI Store

## 🚀 **What This Gives You:**
- **Complete control** over your database and data
- **No external dependencies** on Google/Firebase
- **Real-time updates** with WebSocket support
- **Built-in admin panel** for managing your data
- **Authentication system** for admin access
- **Can be hosted anywhere** (local, VPS, your server)
- **Open source** and completely free

## 📋 **Step-by-Step Setup:**

### **1. Download PocketBase**
1. Go to [PocketBase Releases](https://github.com/pocketbase/pocketbase/releases)
2. Download the latest version for Windows: `pocketbase_0.22.6_windows_amd64.zip`
3. Extract the ZIP file to your project folder
4. You should now have `pocketbase.exe` in your project

### **2. Start PocketBase Server**
1. Open a new terminal/command prompt
2. Navigate to your project folder
3. Run: `.\pocketbase.exe serve`
4. PocketBase will start and show you the admin URL (usually `http://127.0.0.1:8090/_/`)

### **3. Set Up Your Database**
1. Open the admin panel in your browser: `http://127.0.0.1:8090/_/`
2. Create your first admin account
3. Create a new collection called `bgmi_ids`
4. Add these fields to your collection:

| Field Name | Type | Required | Options |
|------------|------|----------|---------|
| title | Text | Yes | - |
| description | Text | No | - |
| price | Number | Yes | - |
| image | Text | No | - |
| level | Number | No | - |
| skins | Json | No | - |
| rank | Text | No | - |
| kd | Number | No | - |
| matches | Number | No | - |
| available | Bool | Yes | Default: true |
| created | DateTime | Yes | Auto: now |

### **4. Install PocketBase Client**
Run this command in your project:
```bash
npm install pocketbase
```

### **5. Update Your Code**
The code has been updated to use PocketBase instead of Firebase!

## 🔒 **Security Features:**
- **Admin authentication** for managing data
- **API rules** to control who can read/write
- **Real-time subscriptions** for live updates
- **File uploads** for images (if needed)

## 🚀 **Next Steps:**
1. **Download PocketBase** following step 1
2. **Start the server** following step 2
3. **Set up your database** following step 3
4. **Install the client** following step 4
5. **Test your app** - it should now work with PocketBase!

## 🎯 **Benefits Over Firebase:**
- ✅ **No Google account required**
- ✅ **No external service dependencies**
- ✅ **Complete data ownership**
- ✅ **Can be hosted anywhere**
- ✅ **Open source and free forever**
- ✅ **Built-in admin panel**
- ✅ **Real-time capabilities**

Your BGMI Store will now work with your own database! 🎮✨
