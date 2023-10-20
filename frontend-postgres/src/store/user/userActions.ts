import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { errorCatch } from '@/config/api/api.helper';

import { IAuthResponse, IEmailPassword } from '@/store/user/user.interface';

import { toastError } from '@/utils/toast-error';

import { AuthService } from '@/services/auth/auth.service';

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
  'auth/register',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(email, password);
      toast.success('Register success', {
        toastId: 'register-success',
      });

      return response.data;
    } catch (err) {
      toastError(err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password);
      toast.success('Login success', {
        toastId: 'login-success',
      });

      return response.data;
    } catch (err) {
      toastError(err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const logout = createAsyncThunk<void, void>(
  'auth/logout',
  async (_, thunkAPI) => {
    await AuthService.logout();
  },
);

export const checkAuth = createAsyncThunk<IAuthResponse>(
  'auth/check-auth',
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.getNewToken();
      toast.success('Check Auth success', {
        toastId: 'check-auth-success',
      });

      return response.data;
    } catch (err) {
      if (errorCatch(err) === 'jwt expired') {
        toastError(err);
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(err);
    }
  },
);
