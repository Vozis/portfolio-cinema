import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/hooks/useAuth';

import { toastError } from '@/utils/toast-error';

import { UserService } from '@/services/user.service';

export const useFavorite = () => {
  const { user } = useAuth();

  const {
    isLoading,
    data: favoriteMovies,
    refetch,
  } = useQuery(['get-favorite-movies'], () => UserService.getFavorites(), {
    select: ({ data }) => data,
    enabled: !!user,
  });

  return { isLoading, favoriteMovies, refetch };
};
