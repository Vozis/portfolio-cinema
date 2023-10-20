import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getAdminUrl } from '@/config/api/url.config';

import { getKeys } from '@/utils/object/getKeys';
import { toastError } from '@/utils/toast-error';

import { IGenreEditInput } from '@/screens/admin/genre-edit/genre-edit.interface';
import { GenreService } from '@/services/genre.service';

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
  const { query, push } = useRouter();

  const genreId = Number(query.id);

  const { isLoading } = useQuery(
    ['get-genre-by-id', genreId],
    () => GenreService.getById(genreId),
    {
      onSuccess: ({ data }) => {
        getKeys(data).forEach(key => {
          setValue(key, data[key]);
        });
      },
      onError: error => {
        toastError(error, 'Get genre');
      },
      enabled: !!query.id,
    },
  );

  const { mutateAsync } = useMutation(
    ['update-genre', genreId],
    (data: IGenreEditInput) => GenreService.update(genreId, data),
    {
      onError: error => {
        toastError(error, 'Update genre');
      },
      onSuccess: () => {
        toast.success('Update genre successfully');
        push(getAdminUrl('genres'));
      },
    },
  );

  const onSubmit: SubmitHandler<IGenreEditInput> = async data => {
    await mutateAsync(data);
  };

  return { mutateAsync, onSubmit, isLoading };
};
