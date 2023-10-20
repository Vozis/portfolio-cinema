import { useQuery } from '@tanstack/react-query';

import { IOption } from '@/ui/select/select.interface';

import { getAdminUrl } from '@/config/api/url.config';

import { toastError } from '@/utils/toast-error';

import { ActorService } from '@/services/actor.service';

export const useAdminActors = () => {
  const queryData = useQuery(
    ['get-actors-to-movie-edit'],
    () => ActorService.getAll(),
    {
      select: ({ data: actors }) =>
        actors.map(
          (actor): IOption => ({
            label: actor.name,
            value: actor.id,
          }),
        ),
      onError: error => {
        toastError(error);
      },
    },
  );

  return queryData;
};
