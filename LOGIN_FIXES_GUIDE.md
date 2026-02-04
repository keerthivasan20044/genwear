# GENWEAR Authentication Troubleshooting Guide

## 🔧 Fixed Issues

### 1. Frontend-Backend Connection
- ✅ Disabled mock API (`VITE_USE_MOCK=false`)
- ✅ Fixed API URL configuration
- ✅ Corrected auth response structure handling

### 2. Authentication Flow
- ✅ Fixed user state management in Redux
- ✅ Corrected token handling in API interceptors
- ✅ Updated login/register pages to use proper selectors

### 3. Database & Seeding
- ✅ Fixed seed data import path
- ✅ Created comprehensive startup scripts
- ✅ Added authentication test script

## 🚀 How to Start GENWEAR

### Option 1: Complete Startup (Recommended)
```bash
# Run the complete startup script
start-genwear-complete.bat
```

### Option 2: Manual Startup
```bash
# 1. Start MongoDB
mongod --dbpath "C:\data\db"

# 2. Seed Database
cd server
npm run seed

# 3. Start Backend
npm run dev

# 4. Start Frontend (new terminal)
cd ../client
npm run dev
```

## 👤 Test Credentials

### Admin Account
- **Email:** admin@genwear.com
- **Password:** Admin@123
- **Access:** Full admin dashboard, product management, customer management

### Customer Account
- **Email:** john@example.com
- **Password:** User@123
- **Access:** Shopping, cart, orders, profile

## 🧪 Testing Authentication

Run the authentication test script:
```bash
node test-auth.js
```

This will test:
- API health check
- Admin login
- Customer login
- Protected routes
- Invalid login handling

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution:**
1. Ensure MongoDB is installed
2. Create data directory: `mkdir C:\data\db`
3. Start MongoDB: `mongod --dbpath "C:\data\db"`

### Issue: "Port 5001 already in use"
**Solution:**
1. Kill existing process: `taskkill /F /IM node.exe`
2. Or change port in server/.env

### Issue: "Login returns 401 Unauthorized"
**Solution:**
1. Ensure database is seeded: `npm run seed`
2. Check credentials match seeded data
3. Verify JWT_SECRET is set in server/.env

### Issue: "Frontend shows 'Network Error'"
**Solution:**
1. Ensure backend is running on port 5001
2. Check CORS configuration in server.js
3. Verify VITE_API_URL in client/.env

## 📍 Application URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5001/api
- **Health Check:** http://localhost:5001/api/health

## 🔐 Security Features

- JWT tokens with 30-day expiry
- bcrypt password hashing (10 salt rounds)
- Role-based access control
- Protected API routes
- CORS configuration
- Helmet security headers

## 📊 Database Structure

### Users Collection
- Admin: admin@genwear.com
- Customer: john@example.com
- Fields: firstName, lastName, email, password (hashed), role, addresses, wishlist

### Products Collection
- 60+ seeded products across categories
- Men's, Women's, Kids, Accessories
- Complete with images, pricing, inventory

## 🎯 Next Steps

1. Run `start-genwear-complete.bat`
2. Wait for both servers to start
3. Navigate to http://localhost:5173
4. Test login with provided credentials
5. Explore admin dashboard and customer features

## 📞 Support

If issues persist:
1. Check console logs in both frontend and backend terminals
2. Verify all dependencies are installed
3. Ensure MongoDB is running and accessible
4. Run the authentication test script for detailed diagnostics