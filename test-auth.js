import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const testAuth = async () => {
    console.log('🧪 Testing GENWEAR Authentication System...\n');

    try {
        // Test 1: Health Check
        console.log('1. Testing API Health...');
        const health = await axios.get(`${API_URL.replace('/api', '')}/api/health`);
        console.log('✅ API Health:', health.data.message);

        // Test 2: Admin Login
        console.log('\n2. Testing Admin Login...');
        const adminLogin = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin@genwear.com',
            password: 'Admin@123'
        });
        console.log('✅ Admin Login Success:', {
            name: `${adminLogin.data.firstName} ${adminLogin.data.lastName}`,
            email: adminLogin.data.email,
            role: adminLogin.data.role,
            hasToken: !!adminLogin.data.token
        });

        // Test 3: Customer Login
        console.log('\n3. Testing Customer Login...');
        const customerLogin = await axios.post(`${API_URL}/auth/login`, {
            email: 'john@example.com',
            password: 'User@123'
        });
        console.log('✅ Customer Login Success:', {
            name: `${customerLogin.data.firstName} ${customerLogin.data.lastName}`,
            email: customerLogin.data.email,
            role: customerLogin.data.role,
            hasToken: !!customerLogin.data.token
        });

        // Test 4: Protected Route (Admin)
        console.log('\n4. Testing Admin Protected Route...');
        const adminDashboard = await axios.get(`${API_URL}/admin/dashboard`, {
            headers: { Authorization: `Bearer ${adminLogin.data.token}` }
        });
        console.log('✅ Admin Dashboard Access:', adminDashboard.data);

        // Test 5: Invalid Login
        console.log('\n5. Testing Invalid Login...');
        try {
            await axios.post(`${API_URL}/auth/login`, {
                email: 'invalid@test.com',
                password: 'wrongpassword'
            });
        } catch (error) {
            console.log('✅ Invalid Login Rejected:', error.response.data.message);
        }

        console.log('\n🎉 All authentication tests passed!');

    } catch (error) {
        console.error('❌ Test Failed:', error.response?.data?.message || error.message);
        console.error('Make sure MongoDB is running and the server is started.');
    }
};

testAuth();