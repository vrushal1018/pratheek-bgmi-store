# 🔐 Temporary Admin Credentials

## **⚠️ IMPORTANT: These are temporary credentials for development only!**

Until you set up PocketBase properly, you can use these credentials to test the admin panel:

### **Email:** `admin@bgmi.com`
### **Password:** `admin123`

## **🔒 How to Set Up Proper Authentication:**

### **Step 1: Download and Start PocketBase**
1. Download PocketBase from [GitHub Releases](https://github.com/pocketbase/pocketbase/releases)
2. Extract to your project folder
3. Run `start-pocketbase.bat` or `start-pocketbase.ps1`

### **Step 2: Create Admin Collection**
1. Open PocketBase admin: http://127.0.0.1:8090/_/
2. Create collection: `admins`
3. Add fields: `email` (Text), `password` (Text)
4. Create your admin user

### **Step 3: Update Authentication**
Once PocketBase is running, the code will automatically switch to real authentication.

## **🎯 Current Status:**
- ✅ **App runs without errors**
- ✅ **Admin login works with temporary credentials**
- ✅ **Ready for PocketBase setup**
- ⏳ **Waiting for database configuration**

## **🚀 Next Steps:**
1. **Set up PocketBase** following the setup guides
2. **Create your admin account** in PocketBase
3. **Replace temporary credentials** with real ones
4. **Test full functionality** with your database

Your BGMI Store is now ready for the final PocketBase setup! 🎮✨
