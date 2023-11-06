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
import { ActorService } from "@/services/actor.service";

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
  const { query, push } = useRouter();

  const movieId = Number(query.id);

  const { isLoading } = useQuery(
    ['get-movie-by-id', movieId],
    () => MovieService.getById(movieId),
    {
      onSuccess: ({ data }) => {
        getKeys(data).forEach(key => {
          setValue(key, data[key]);
        });
      },
      onError: error => {
        toastError(error, 'Get Movie');
      },
      enabled: !!query.id,
    },
  );

  const { mutateAsync } = useMutation(
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
    const resultGenres = data.genres.map(item => item.id);
    const resultActors = data.actors.map(item => item.id);

    const uploadData: IMovieEditForm = {
      ...data,
      year: +data.year,
      duration: +data.duration,
      posters: resultPosters,
      bigPosters: resultBigPosters,
      videos: resultVideos,
      genres: resultGenres,
      actors: resultActors,
    };

    await mutateAsync(uploadData);

    // await mutateAsync(data);
  };

  return { mutateAsync, onSubmit, isLoading };
};
