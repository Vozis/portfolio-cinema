import { useMutation, useQuery } from '@tanstack/react-query';
import { log } from 'next/dist/server/typescript/utils';
import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { toast } from 'react-toastify';

import { IFile } from '@/shared/types/movie.types';

import { getAdminUrl } from '@/config/api/url.config';

import { getKeys } from '@/utils/object/getKeys';
import { toastError } from '@/utils/toast-error';

import {
  IActorEditForm,
  IActorEditInput,
} from '@/screens/admin/actors-edit/actor-edit.interface';
import { ActorService } from '@/services/actor.service';
import { FileService } from '@/services/file.service';

export const useActorEdit = (
  setValue: UseFormSetValue<IActorEditInput>,
  array: IFile[],
  folder = 'actors',
) => {
  const { query, push } = useRouter();

  const genreId = Number(query.id);

  // console.log('array from useActorEdit:', array);

  const { isLoading } = useQuery(
    ['get-actor-by-id', genreId],
    () => ActorService.getById(genreId),
    {
      onSuccess: ({ data }) => {
        getKeys(data).forEach(key => {
          setValue(key, data[key]);
        });
      },
      onError: error => {
        toastError(error, 'Get actor');
      },
      enabled: !!query.id,
    },
  );


  const { data: files } = useQuery(
    ['get-added-files', folder],
    () => FileService.getByFolder(folder),
    {
      select: ({ data }) => data,
    },
  );

  const { mutateAsync } = useMutation(
    ['update-actor', genreId],
    (data: IActorEditForm) => ActorService.update(genreId, data),
    {
      onError: error => {
        toastError(error, 'Update actor');
      },
      onSuccess: () => {
        toast.success('Update actor successfully');
        push(getAdminUrl('actors'));
      },
    },
  );

  const onSubmit: SubmitHandler<IActorEditInput> = async data => {
    const formData = new FormData();

    const entries: [string, any][] = Object.entries(data).filter(
      entry => entry[0] !== 'photos',
    );

    data.photos =[]

    // console.log('data.photos: ', data.photos);
    //
    // console.log('array: ', array);

    // console.log('data: ', data);

    for (const photo of array) {
      if(data.photos.find(item => item.originalName === photo.originalName)) {
        return
      }
      data.photos.push(photo)
    }

    const movies = data.movies.map(item => item.id)

    // console.log(data.movies);

    const resultArray = data.photos.map(item => item.id);

    // console.log('resultArray', resultArray);

    const uploadData: IActorEditForm = {
      ...data,
      movies,
      photos: resultArray,
    };



    // console.log(uploadData);

    // entries.forEach(entry => {
    //   formData.append(entry[0], entry[1]);
    // });

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    await mutateAsync(uploadData);
  };

  return { onSubmit, isLoading, files };
};
