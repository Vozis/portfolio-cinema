import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getAdminUrl } from '@/config/api/url.config';

import { useAuth } from '@/hooks/useAuth';

import { toastError } from '@/utils/toast-error';

import { RatingService } from '@/services/rating.service';

export const useRateMovie = (movieId: number) => {
  const [rating, setRating] = useState(0);
  const [isSended, setIsSended] = useState(false);

  const { user } = useAuth();

  const { refetch, isLoading } = useQuery(
    ['your-movie-rating', movieId],
    () => RatingService.getByUserMovie(movieId),
    {
      onSuccess: ({ data }) => {
        setRating(data);
      },
      onError: error => {
        toastError(error, 'Get rating');
      },
      enabled: !!movieId && !!user,
    },
  );

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(
    ['set-rating-movie'],
    ({ value }: { value: number }) => RatingService.setRating(movieId, value),
    {
      onError: error => {
        toastError(error, 'Update user');
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['popular-movies-sidebar']);
        toast.success('You have successfully updated your rating');

        setIsSended(true);
        refetch();

        setTimeout(() => {
          setIsSended(false);
        }, 2400);
      },
    },
  );

  const handleClick = async (nextValue: number) => {
    await mutateAsync({ value: nextValue });
  };

  return { isSended, rating, handleClick };
};
