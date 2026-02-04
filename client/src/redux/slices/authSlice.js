import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/api';

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const data = await authAPI.login(credentials);
        // Store the complete response for localStorage
        const userData = {
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            role: data.role,
            token: data.token
        };
        localStorage.setItem('userInfo', JSON.stringify(userData));
        return userData;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const data = await authAPI.register(userData);
        // Store the complete response for localStorage
        const userResponse = {
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            role: data.role,
            token: data.token
        };
        localStorage.setItem('userInfo', JSON.stringify(userResponse));
        return userResponse;
    } catch (error) {
        return rejectWithValue(error);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: userInfoFromStorage || null,
        token: userInfoFromStorage?.token || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.userInfo = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('userInfo');
        },
        clearError: (state) => {
            state.error = null;
        },
        updateUser: (state, action) => {
            state.userInfo = { ...state.userInfo, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;
