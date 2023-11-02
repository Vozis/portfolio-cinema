import { IFile } from '@/shared/types/movie.types';

import { instance } from '@/config/api/axios.interceptor';

export const FileService = {
  async upload(image: FormData, folder?: string) {
    return instance.post<IFile[]>('/files', image, {
      params: { folder },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async getByFolder(folder: string) {
    return instance.get<IFile[]>(`/files/by-folder/${folder}`, {
      params: { folder },
    });
  },
};
