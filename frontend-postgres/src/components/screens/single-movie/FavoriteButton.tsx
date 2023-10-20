import { useMutation } from '@tanstack/react-query';
import cn from 'clsx';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAuth } from '@/hooks/useAuth';

import { toastError } from '@/utils/toast-error';

import styles from './FavoriteButton.module.scss';
import { useFavorite } from '@/screens/favorites/useFavorite';
import { UserService } from '@/services/user.service';

const FavoriteButton: FC<{ movieId: number }> = ({ movieId }) => {
  const [isSmashed, setIsSmashed] = useState(false);

  const { favoriteMovies, refetch, isLoading } = useFavorite();

  useEffect(() => {
    if (!favoriteMovies) return;

    const isHasMovie = favoriteMovies.some(movie => movie.id === movieId);

    if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie);
  }, [favoriteMovies, isSmashed, movieId]);

  const { mutateAsync } = useMutation(
    ['update-favorites'],
    () => UserService.toggleFavorite(movieId),
    {
      onError: error => {
        toastError(error, 'Update favorite');
      },
      onSuccess: () => {
        setIsSmashed(!isSmashed);
        toast.success('toggle favorites successfully');
        refetch();
      },
    },
  );

  return (
    <button
      onClick={() => mutateAsync()}
      className={cn(styles.button, {
        [styles.animate]: isSmashed,
      })}
      style={{
        backgroundImage: `url('/heart.png')`,
      }}
    />
  );
};

export default FavoriteButton;
