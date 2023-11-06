import { IFile } from '@/shared/types/movie.types';

import { instance } from '@/config/api/axios.interceptor';

export const FileService = {
  async upload(files: FormData, folder?: string) {
    // console.log('files from web FileService.upload: ', files);

    /* @ts-ignore */
    // for (let [key, value] of files.entries()) {
    //   console.log(`${key}: ${value}`);
    // }


    return instance.post<IFile[]>('/files', files, {
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
