import { getUsersApi } from '@/config/api/api.config';
import { instance } from '@/config/api/axios.interceptor';

export const AdminService = {
  async getCountUsers() {
    return instance.get<number>(getUsersApi('count'));
  },
};
