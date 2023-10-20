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

    array.forEach(item => {
      data.photos.push(item);
    });

    const resultArray = data.photos.map(item => item.id);

    const uploadData: IActorEditForm = {
      ...data,
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
