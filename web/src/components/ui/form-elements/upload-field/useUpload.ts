import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import { toastError } from '@/utils/toast-error';

import { FileService } from '@/services/file.service';

type TypeUpload = (
  onChange: (...event: any[]) => void,
  folder?: string,
) => {
  uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  isLoading: boolean;
};

export const useUpload: TypeUpload = (onChange, folder) => {
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync, data } = useMutation(
    ['upload-file'],
    (data: FormData) => FileService.upload(data, folder),
    {
      onSuccess: ({ data }) => {
        // const response = data.map(data => data.id);
        onChange(data);
      },
      onError: error => {
        toastError(error);
      },
    },
  );

  const uploadFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setIsLoading(true);
      const files = e.target.files;

      // console.log('files from useUpload: ', files);

      if (!files?.length) return;


      const formData = new FormData();

      for (const file of files) {
        formData.append('files', file)
      }

      // /* @ts-ignore */
      // for (let [key, value] of formData.entries()) {
      //   // console.log('ok');
      //   console.log(`${key}: ${value}`);
      // }

      await mutateAsync(formData);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    },
    [mutateAsync],
  );

  return useMemo(
    () => ({
      uploadFile: uploadFile,
      isLoading,
    }),
    [uploadFile, isLoading],
  );

  // return { uploadFile, isLoading }
};
