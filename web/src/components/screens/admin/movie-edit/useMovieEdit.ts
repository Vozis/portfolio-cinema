import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getAdminUrl } from '@/config/api/url.config';

import { getKeys } from '@/utils/object/getKeys';
import { toastError } from '@/utils/toast-error';

import { IActorEditForm } from '@/screens/admin/actors-edit/actor-edit.interface';
import {
  IMovieEditForm,
  IMovieEditInput,
} from '@/screens/admin/movie-edit/movie-edit.interface';
import { MovieService } from '@/services/movie.service';

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
  const { query, push } = useRouter();

  const movieId = Number(query.id);




  const { mutateAsync, isLoading } = useMutation(
    ['update-movie', movieId],
    (data: IMovieEditForm) => MovieService.update(movieId, data),
    {
      onError: error => {
        toastError(error, 'Update movie');
      },
      onSuccess: () => {
        toast.success('Update movie successfully');
        push(getAdminUrl('movies'));
      },
    }
  );

  const onSubmit: SubmitHandler<IMovieEditInput> = async data => {
    const formData = new FormData();

    const resultPosters = data.posters.map(item => item.id);
    const resultBigPosters = data.bigPosters.map(item => item.id);
    const resultVideos = data.videos.map(item => item.id);

    const uploadData: IMovieEditForm = {
      ...data,
      year: +data.year,
      duration: +data.duration,
      posters: resultPosters,
      bigPosters: resultBigPosters,
      videos: resultVideos,
    };

    await mutateAsync(uploadData);

    // await mutateAsync(data);
  };

  return { mutateAsync, onSubmit, isLoading };
};
